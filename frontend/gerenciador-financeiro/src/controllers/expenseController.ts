import { type Expense } from '../models/Expense'

export type ExpenseInput = Omit<Expense, 'id'>

const STORAGE_KEY = 'expenses'

const generateId = () => (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`)

const readStorage = (): Expense[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch (error) {
    console.error('Erro ao ler despesas', error)
    return []
  }
}

const writeStorage = (expenses: Expense[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
  } catch (error) {
    console.error('Erro ao salvar despesas', error)
  }
}

export const listExpenses = async (): Promise<Expense[]> => readStorage()

export const createExpense = async (input: ExpenseInput): Promise<Expense> => {
  const expenses = readStorage()
  const newExpense: Expense = { ...input, id: generateId() }
  const updated = [...expenses, newExpense]
  writeStorage(updated)
  return newExpense
}

export const updateExpense = async (updated: Expense): Promise<Expense> => {
  const expenses = readStorage()
  const exists = expenses.some((expense) => expense.id === updated.id)
  if (!exists) throw new Error('Despesa não encontrada')
  const merged = expenses.map((expense) => (expense.id === updated.id ? updated : expense))
  writeStorage(merged)
  return updated
}

export const deleteExpense = async (id: string): Promise<void> => {
  const expenses = readStorage()
  const filtered = expenses.filter((expense) => expense.id !== id)
  writeStorage(filtered)
}
