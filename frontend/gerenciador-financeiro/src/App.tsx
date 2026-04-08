import './App.css'
import { useEffect, useState } from 'react'
import Header from './views/components/Header/Header'
import CardTotal from './views/components/CardTotal/CardTotal'
import ExpenseForm from './views/components/ExpenseForm/ExpenseForm'
import ExpenseList from './views/components/ExpenseList/ExpenseList'
import ExpenseEditCard from './views/components/ExpenseEditCard/ExpenseEditCard'
import { Expense, type ExpenseInput } from './models/Expense'
import { APIError, expenseService } from './services/expenseService'

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

  const showError = (message: string) => {
    setError(message)
    alert(message)
  }

  const loadExpenses = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await expenseService.listExpenses()
      setExpenses(data)
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
      showError(Object.values(validationErrors)[0])
      return false
    }

    try {
      setError(null)
      const created = await expenseService.createExpense(input)
      setExpenses((prev) => [created, ...prev])
      return true
    } catch (err) {
      const message = err instanceof APIError ? err.message : 'Erro ao adicionar despesa'
      showError(message)
      return false
    }
  }

  const updateExpense = async (expense: Expense): Promise<boolean> => {
    const validationErrors = Expense.validate(expense)
    if (Expense.hasErrors(validationErrors)) {
      showError(Object.values(validationErrors)[0])
      return false
    }

    try {
      setError(null)
      const updated = await expenseService.updateExpense(expense)
      setExpenses((prev) => prev.map((item) => (item.id === updated.id ? updated : item)))
      return true
    } catch (err) {
      const message = err instanceof APIError ? err.message : 'Erro ao atualizar despesa'
      showError(message)
      return false
    }
  }

  const deleteExpense = async (id: string): Promise<boolean> => {
    try {
      setError(null)
      await expenseService.deleteExpense(id)
      setExpenses((prev) => prev.filter((item) => item.id !== id))
      return true
    } catch (err) {
      const message = err instanceof APIError ? err.message : 'Erro ao deletar despesa'
      showError(message)
      return false
    }
  }

  const handleAdd = async (input: ExpenseInput) => {
    await addExpense(input)
  }

  const handleDelete = async (id: string) => {
    await deleteExpense(id)
    if (editingId === id) {
      setEditingId(null)
    }
  }

  const handleSave = async (updated: Expense) => {
    const success = await updateExpense(updated)
    if (success) {
      setEditingId(null)
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




