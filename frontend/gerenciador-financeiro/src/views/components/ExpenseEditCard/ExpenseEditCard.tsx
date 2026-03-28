import './ExpenseEditCard.css'
import { X, Save } from 'lucide-react'
import { useEffect, useState, type FormEvent } from 'react'
import { type Expense } from '../../../models/Expense'

interface CategoryOption {
  value: string
  label: string
}

interface ExpenseEditCardProps {
  expense: Expense
  categories: readonly CategoryOption[]
  onSave: (updated: Expense) => void
  onCancel: () => void
}

function ExpenseEditCard({ expense, categories, onSave, onCancel }: ExpenseEditCardProps) {
  const [draft, setDraft] = useState<Expense>(expense)

  useEffect(() => {
    setDraft(expense)
  }, [expense])

  const handleChange = (field: keyof Expense, value: string) => {
    setDraft((prev) => ({ ...prev, [field]: field === 'value' ? Number(value) || 0 : value }))
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    onSave(draft)
  }

  return (
    <section className="expense-edit" aria-labelledby="expense-edit-title">
      <form className="expense-edit__form" onSubmit={handleSubmit}>
        <label className="expense-edit__field">
          <span className="expense-edit__label">Descrição</span>
          <input
            className="expense-edit__input"
            type="text"
            value={draft.description}
            onChange={(event) => handleChange('description', event.target.value)}
            required
          />
        </label>

        <label className="expense-edit__field">
          <span className="expense-edit__label">Categoria</span>
          <select
            className="expense-edit__input expense-edit__select"
            value={draft.category}
            onChange={(event) => handleChange('category', event.target.value)}
          >
            {categories
              .filter((option) => option.value !== 'todas')
              .map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
          </select>
        </label>

        <label className="expense-edit__field expense-edit__field--short">
          <span className="expense-edit__label">Valor (R$)</span>
          <input
            className="expense-edit__input"
            type="number"
            step="0.01"
            value={draft.value}
            onChange={(event) => handleChange('value', event.target.value)}
            required
          />
        </label>

        <label className="expense-edit__field expense-edit__field--short">
          <span className="expense-edit__label">Data</span>
          <input
            className="expense-edit__input"
            type="date"
            value={draft.date}
            onChange={(event) => handleChange('date', event.target.value)}
            required
          />
        </label>

        <div className="expense-edit__actions">
          <button type="submit" className="expense-edit__save">
            <Save size={16} />
            Salvar
          </button>
          <button type="button" className="expense-edit__cancel" onClick={onCancel}>
            <X size={16} />
          </button>
        </div>
      </form>
    </section>
  )
}

export default ExpenseEditCard
