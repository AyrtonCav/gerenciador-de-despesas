import './ExpenseForm.css'
import { Plus } from 'lucide-react'
import { useMemo, useState, type FormEvent } from 'react'
import { CATEGORY_LABELS, EXPENSE_CATEGORIES, type ExpenseCategory, type ExpenseInput } from '../../../models/Expense'

interface ExpenseFormProps {
  onSubmit: (input: ExpenseInput) => void
}

const normalizeNumber = (value: string) => Number(value.replace(',', '.')) || 0

function ExpenseForm({ onSubmit }: ExpenseFormProps) {
  const today = useMemo(() => new Date().toISOString().split('T')[0], [])
  const defaultCategory = 'outros' as ExpenseCategory

  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<ExpenseCategory>(defaultCategory)
  const [value, setValue] = useState('')
  const [date, setDate] = useState(today)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    onSubmit({ description, category, value: normalizeNumber(value), date })
    setDescription('')
    setValue('')
    setCategory(defaultCategory)
    setDate(today)
  }

  return (
    <section className="expense-card" aria-labelledby="expense-card-title">
      <div className="expense-card__header">
        <p id="expense-card-title" className="expense-card__title">Nova Despesa</p>
      </div>

      <form className="expense-card__form" onSubmit={handleSubmit}>
        <label className="expense-card__field">
          <span className="expense-card__label">Descrição</span>
          <input
            className="expense-card__input"
            type="text"
            placeholder="Ex: Almoço"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </label>

        <label className="expense-card__field">
          <span className="expense-card__label">Categoria</span>
          <select
            className="expense-card__input expense-card__select"
            value={category}
            onChange={(event) => setCategory(event.target.value as ExpenseCategory)}
          >
            {EXPENSE_CATEGORIES.map((value) => (
              <option key={value} value={value}>
                {CATEGORY_LABELS[value]}
              </option>
            ))}
          </select>
        </label>

        <label className="expense-card__field expense-card__field--short">
          <span className="expense-card__label">Valor (R$)</span>
          <input
            className="expense-card__input"
            type="text"
            inputMode="decimal"
            placeholder="0,00"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            required
          />
        </label>

        <label className="expense-card__field expense-card__field--short">
          <span className="expense-card__label">Data</span>
          <input
            className="expense-card__input"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
          />
        </label>

        <button type="submit" className="expense-card__submit">
          <Plus size={14} />
          Adicionar
        </button>
      </form>
    </section>
  )
}
export default ExpenseForm
