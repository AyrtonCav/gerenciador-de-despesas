export type ExpenseCategory =
  | 'alimentacao'
  | 'transporte'
  | 'lazer'
  | 'contas'
  | 'saude'
  | 'educacao'
  | 'outros'

export interface Expense {
  id: string
  description: string
  category: ExpenseCategory
  value: number
  date: string // ISO yyyy-mm-dd
}
