export type ExpenseCategory =
  | 'alimentacao'
  | 'transporte'
  | 'lazer'
  | 'contas'
  | 'saude'
  | 'educacao'
  | 'outros'

export interface IExpense {
  id: string
  description: string
  category: ExpenseCategory
  value: number
  date: string // ISO yyyy-mm-dd
  created_at?: string
  updated_at?: string
}

type ExpenseApiData = Omit<IExpense, 'id' | 'value'> & {
  id: string | number
  value: string | number
}

export type ExpensePayload = {
  description: string
  category: ExpenseCategory
  value: number
  date: string
}

/**
 * Classe Expense - MODEL no padrão MVC
 * 
 * Responsabilidades:
 * - Encapsular dados da despesa
 * - Validações de frontend (UX)
 * - Formatações e apresentação
 * - Métodos auxiliares
 */
export class Expense implements IExpense {
  id: string
  description: string
  category: ExpenseCategory
  value: number
  date: string
  created_at?: string
  updated_at?: string

  constructor(data: IExpense) {
    this.id = data.id
    this.description = data.description
    this.category = data.category
    this.value = parseFloat(String(data.value))
    this.date = data.date
    this.created_at = data.created_at
    this.updated_at = data.updated_at
  }


  // Formatação de dados:

  formatValue(): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(this.value)
  }

  formatDate(): string {
    const [year, month, day] = this.date.split('-')
    return `${day}/${month}/${year}`
  }

  getCategoryLabel(): string {
    return CATEGORY_LABELS[this.category]
  }

  static validate(data: Partial<IExpense>): Record<string, string> {
    const errors: Record<string, string> = {}

    if (!data.description || data.description.trim().length === 0) {
      errors.description = 'A descrição é obrigatória'
    } else if (data.description.length > 255) {
      errors.description = 'A descrição deve ter no máximo 255 caracteres'
    }

    if (!data.category) {
      errors.category = 'A categoria é obrigatória'
    }

    if (data.value === undefined || data.value === null) {
      errors.value = 'O valor é obrigatório'
    } else if (data.value <= 0) {
      errors.value = 'O valor deve ser maior que zero'
    } else if (data.value > 1000000) {
      errors.value = 'O valor é muito alto. Verifique se digitou corretamente'
    }

    if (!data.date) {
      errors.date = 'A data é obrigatória'
    } else {
      const expenseDate = new Date(data.date + 'T00:00:00')
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (expenseDate > today) {
        errors.date = 'A data não pode ser no futuro'
      }

      const fiveYearsAgo = new Date()
      fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5)
      if (expenseDate < fiveYearsAgo) {
        errors.date = 'A data é muito antiga (mais de 5 anos)'
      }
    }

    return errors
  }

  /**
   * Valida se há erros
   */
  static hasErrors(errors: Record<string, string>): boolean {
    return Object.keys(errors).length > 0
  }

  // ============================================
  // MÉTODOS ESTÁTICOS - UTILITÁRIOS
  // ============================================

  /**
   * Converte dados brutos da API em instância de Expense
   */
  static fromAPI(data: ExpenseApiData): Expense {
    return new Expense({
      id: String(data.id),
      description: data.description,
      category: data.category,
      value: parseFloat(String(data.value)),
      date: data.date,
      created_at: data.created_at,
      updated_at: data.updated_at,
    })
  }

  /**
   * Converte instância para formato de envio à API
   */
  toAPI(): ExpensePayload {
    return {
      description: this.description,
      category: this.category,
      value: this.value,
      date: this.date,
    }
  }
}

/**
 * Tipo para criação de nova despesa (sem ID)
 */
export type ExpenseInput = ExpensePayload

/**
 * Constantes úteis
 */
export const EXPENSE_CATEGORIES: readonly ExpenseCategory[] = [
  'alimentacao',
  'transporte',
  'lazer',
  'contas',
  'saude',
  'educacao',
  'outros',
] as const

export const CATEGORY_LABELS: Record<ExpenseCategory, string> = {
  alimentacao: 'Alimentação',
  transporte: 'Transporte',
  lazer: 'Lazer',
  contas: 'Contas',
  saude: 'Saúde',
  educacao: 'Educação',
  outros: 'Outros',
}

