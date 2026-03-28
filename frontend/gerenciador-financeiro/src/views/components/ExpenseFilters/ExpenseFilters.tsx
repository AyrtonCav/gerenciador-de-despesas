import './ExpenseFilters.css'
import { Filter } from 'lucide-react'

interface CategoryOption {
  value: string
  label: string
}

interface ExpenseFiltersProps {
  categories: readonly CategoryOption[]
  category: string
  date: string
  onCategoryChange: (value: string) => void
  onDateChange: (value: string) => void
}

function ExpenseFilters({ categories, category, date, onCategoryChange, onDateChange }: ExpenseFiltersProps) {
  return (
    <section className="expense-filters" aria-label="Filtros de despesas">
      <div className="expense-filters__icon" aria-hidden>
        <Filter size={18} />
      </div>

      <label className="expense-filters__field">
        <span className="expense-filters__label">Categoria</span>
        <select
          className="expense-filters__input expense-filters__select"
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          {categories.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="expense-filters__field expense-filters__field--short">
        <span className="expense-filters__label">Data</span>
        <input
          className="expense-filters__input"
          type="date"
          value={date}
          onChange={(event) => onDateChange(event.target.value)}
          placeholder="dd/mm/aaaa"
        />
      </label>
    </section>
  )
}

export default ExpenseFilters
