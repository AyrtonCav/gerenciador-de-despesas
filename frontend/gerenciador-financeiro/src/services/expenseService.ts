import { Expense, type ExpenseInput, type IExpense } from '../models/Expense'

const API_BASE_URL = 'http://127.0.0.1:8000/api'
const EXPENSES_ENDPOINT = `${API_BASE_URL}/expenses/`

export class APIError extends Error {
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

export const expenseService = {
  async listExpenses(): Promise<Expense[]> {
    const data = await fetchAPI<IExpense[]>(EXPENSES_ENDPOINT)
    return data.map((item) => Expense.fromAPI(item))
  },

  async createExpense(input: ExpenseInput): Promise<Expense> {
    const data = await fetchAPI<IExpense>(EXPENSES_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(input),
    })
    return Expense.fromAPI(data)
  },

  async updateExpense(expense: Expense): Promise<Expense> {
    const data = await fetchAPI<IExpense>(`${EXPENSES_ENDPOINT}${expense.id}/`, {
      method: 'PUT',
      body: JSON.stringify(expense.toAPI()),
    })
    return Expense.fromAPI(data)
  },

  async deleteExpense(id: string): Promise<void> {
    await fetchAPI<void>(`${EXPENSES_ENDPOINT}${id}/`, {
      method: 'DELETE',
    })
  },
}