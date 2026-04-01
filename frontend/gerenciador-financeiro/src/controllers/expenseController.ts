import { type Expense } from '../models/Expense'

export type ExpenseInput = Omit<Expense, 'id'>

const API_URL = 'http://127.0.0.1:8000/api/expenses/'

// GET
export const listExpenses = async (): Promise<Expense[]> => {
  const response = await fetch(API_URL)
  const data = await response.json()

  return data.map((item: any) => ({
    ...item,
    id: item.id.toString(),
    value: Number(item.value), // 🔥 AQUI
  }))
}

// POST
export const createExpense = async (input: ExpenseInput): Promise<Expense> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  })

  const data = await response.json()

  return {
  ...data,
  id: data.id.toString(),
  value: Number(data.value), // 🔥
  }
}

// PUT
export const updateExpense = async (updated: Expense): Promise<Expense> => {
  const response = await fetch(`${API_URL}${updated.id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updated),
  })

  const data = await response.json()

  return {
  ...data,
  id: data.id.toString(),
  value: Number(data.value), // 🔥
  }
}

// DELETE
export const deleteExpense = async (id: string): Promise<void> => {
  await fetch(`${API_URL}${id}/`, {
    method: 'DELETE',
  })
}