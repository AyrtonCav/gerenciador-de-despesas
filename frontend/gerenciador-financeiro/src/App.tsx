import './App.css'
import { useEffect, useMemo, useState } from 'react'
import Header from './views/components/Header/Header'
import CardTotal from './views/components/CardTotal/CardTotal'
import ExpenseForm from './views/components/ExpenseForm/ExpenseForm'
import ExpenseFilters from './views/components/ExpenseFilters/ExpenseFilters'
import ExpenseList from './views/components/ExpenseList/ExpenseList'
import ExpenseEditCard from './views/components/ExpenseEditCard/ExpenseEditCard'
import { type Expense } from './models/Expense'
import {
  createExpense,
  deleteExpense,
  listExpenses,
  updateExpense,
  type ExpenseInput,
} from './controllers/expenseController'

function App() {
  const categories = [
    { value: 'todas', label: 'Todas' },
    { value: 'alimentacao', label: 'Alimentação' },
    { value: 'transporte', label: 'Transporte' },
    { value: 'lazer', label: 'Lazer' },
    { value: 'contas', label: 'Contas' },
    { value: 'saude', label: 'Saúde' },
    { value: 'educacao', label: 'Educação' },
    { value: 'outros', label: 'Outros' },
  ] as const

  const [expenses, setExpenses] = useState<Expense[]>([])

  const [filterCategory, setFilterCategory] = useState<string>('todas')
  const [filterDate, setFilterDate] = useState<string>('')
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    const loadExpenses = async () => {
      const stored = await listExpenses()
      setExpenses(stored)
    }
    loadExpenses()
  }, [])

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const matchCategory = filterCategory === 'todas' || expense.category === filterCategory
      const matchDate = !filterDate || expense.date === filterDate
      return matchCategory && matchDate
    })
  }, [expenses, filterCategory, filterDate])

  const editingExpense = editingId ? expenses.find((exp) => exp.id === editingId) ?? null : null

  const handleAdd = async (input: ExpenseInput) => {
    const created = await createExpense(input)
    setExpenses((prev) => [created, ...prev])
  }

  const handleDelete = async (id: string) => {
    await deleteExpense(id)
    setExpenses((prev) => prev.filter((expense) => expense.id !== id))
    if (editingId === id) {
      setEditingId(null)
    }
  }

  const handleSave = async (updated: Expense) => {
    const saved = await updateExpense(updated)
    setExpenses((prev) => prev.map((expense) => (expense.id === saved.id ? saved : expense)))
    setEditingId(null)
  }

  const totalValue = useMemo(
    () => filteredExpenses.reduce((acc, expense) => acc + expense.value, 0),
    [filteredExpenses],
  )

  return (
    <>
      <Header />
      <main className="page">
        <CardTotal totalValue={totalValue} itemCount={filteredExpenses.length} />
        <ExpenseForm categories={categories} onSubmit={handleAdd} />
        <ExpenseFilters
          categories={categories}
          category={filterCategory}
          date={filterDate}
          onCategoryChange={setFilterCategory}
          onDateChange={setFilterDate}
        />

        {editingExpense && (
          <ExpenseEditCard
            expense={editingExpense}
            categories={categories}
            onCancel={() => setEditingId(null)}
            onSave={handleSave}
          />
        )}

        <ExpenseList
          expenses={filteredExpenses}
          categories={categories}
          onEdit={setEditingId}
          onDelete={handleDelete}
        />
      </main>
    </>
  )
}

export default App



