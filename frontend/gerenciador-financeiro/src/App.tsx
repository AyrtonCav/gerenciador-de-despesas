import './App.css'
import { useEffect, useState } from 'react'
import Header from './views/components/Header/Header'
import CardTotal from './views/components/CardTotal/CardTotal'
import ExpenseForm from './views/components/ExpenseForm/ExpenseForm'
import ExpenseList from './views/components/ExpenseList/ExpenseList'
import ExpenseEditCard from './views/components/ExpenseEditCard/ExpenseEditCard'
import { Expense, type ExpenseInput, type IExpense } from './models/Expense'

const API_BASE_URL = 'http://127.0.0.1:8000/api'
const EXPENSES_ENDPOINT = `${API_BASE_URL}/expenses/`

class APIError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'APIError'
    this.status = status
  }
}

async function fetchAPI<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new APIError(errorData.message || `Erro HTTP ${response.status}`, response.status)
  }

  if (response.status === 204) {
    return {} as T
  }

  return response.json() as Promise<T>
}

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    loadExpenses()
  }, [])

  const editingExpense = editingId
    ? expenses.find((exp) => exp.id === editingId) ?? null
    : null

  const totalValue = expenses.reduce((accumulator, expense) => accumulator + expense.value, 0)

  const loadExpenses = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchAPI<IExpense[]>(EXPENSES_ENDPOINT)
      setExpenses(data.map((item) => Expense.fromAPI(item)))
    } catch (err) {
      const message = err instanceof APIError ? err.message : 'Erro ao carregar despesas'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const addExpense = async (input: ExpenseInput): Promise<boolean> => {
    const validationErrors = Expense.validate(input)
    if (Expense.hasErrors(validationErrors)) {
      setError(Object.values(validationErrors)[0])
      return false
    }

    try {
      setError(null)
      const created = await fetchAPI<IExpense>(EXPENSES_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(input),
      })
      setExpenses((prev) => [Expense.fromAPI(created), ...prev])
      return true
    } catch (err) {
      const message = err instanceof APIError ? err.message : 'Erro ao adicionar despesa'
      setError(message)
      return false
    }
  }

  const updateExpense = async (expense: Expense): Promise<boolean> => {
    const validationErrors = Expense.validate(expense)
    if (Expense.hasErrors(validationErrors)) {
      setError(Object.values(validationErrors)[0])
      return false
    }

    try {
      setError(null)
      const updated = await fetchAPI<IExpense>(`${EXPENSES_ENDPOINT}${expense.id}/`, {
        method: 'PUT',
        body: JSON.stringify(expense.toAPI()),
      })
      setExpenses((prev) => prev.map((item) => (item.id === updated.id ? Expense.fromAPI(updated) : item)))
      return true
    } catch (err) {
      const message = err instanceof APIError ? err.message : 'Erro ao atualizar despesa'
      setError(message)
      return false
    }
  }

  const deleteExpense = async (id: string): Promise<boolean> => {
    try {
      setError(null)
      await fetchAPI<void>(`${EXPENSES_ENDPOINT}${id}/`, {
        method: 'DELETE',
      })
      setExpenses((prev) => prev.filter((item) => item.id !== id))
      return true
    } catch (err) {
      const message = err instanceof APIError ? err.message : 'Erro ao deletar despesa'
      setError(message)
      return false
    }
  }

  const clearError = () => setError(null)

  const handleAdd = async (input: ExpenseInput) => {
    const success = await addExpense(input)
    if (!success && error) {
      alert(error)
      clearError()
    }
  }

  const handleDelete = async (id: string) => {
    const success = await deleteExpense(id)
    if (editingId === id) {
      setEditingId(null)
    }
    if (!success && error) {
      alert(error)
      clearError()
    }
  }

  const handleSave = async (updated: Expense) => {
    const success = await updateExpense(updated)
    if (success) {
      setEditingId(null)
    } else if (error) {
      alert(error)
      clearError()
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <main className="page">
          <p style={{ textAlign: 'center', padding: '2rem' }}>
            Carregando despesas...
          </p>
        </main>
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="page">
        {error && <div className="page__error">{error}</div>}

        <CardTotal totalValue={totalValue} itemCount={expenses.length} />
        <ExpenseForm onSubmit={handleAdd} />

        {editingExpense && (
          <ExpenseEditCard
            expense={editingExpense}
            onCancel={() => setEditingId(null)}
            onSave={handleSave}
          />
        )}

        <ExpenseList
          expenses={expenses}
          onEdit={setEditingId}
          onDelete={handleDelete}
        />
      </main>
    </>
  )
}

export default App




