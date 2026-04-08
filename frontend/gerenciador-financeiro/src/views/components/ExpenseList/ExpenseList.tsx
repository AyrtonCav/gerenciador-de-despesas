import './ExpenseList.css'
import { Receipt, PencilLine, Trash2 } from 'lucide-react'
import { type Expense } from '../../../models/Expense'

interface ExpenseListProps {
  expenses: Expense[]
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

function ExpenseList({ expenses, onEdit, onDelete }: ExpenseListProps) {
  if (!expenses.length) {
    return (
      <div className="expense-list__empty">
        <Receipt size={52} />
        <p>Nenhuma despesa encontrada.</p>
      </div>
    )
  }

  return (
    <div className="expense-list">
      {expenses.map((expense) => (
        <article className="expense-item" key={expense.id}>
          <div className="expense-item__info">
            <div className="expense-item__title-line">
              <p className="expense-item__title">{expense.description}</p>
              <span className="expense-item__pill">
                {expense.getCategoryLabel()}
              </span>
            </div>
            <p className="expense-item__date">{expense.formatDate()}</p>
          </div>

          <div className="expense-item__actions">
            <p className="expense-item__value">{expense.formatValue()}</p>
            <button className="expense-item__icon" type="button" onClick={() => onEdit(expense.id)}>
              <PencilLine size={16} />
            </button>
            <button
              className="expense-item__icon expense-item__icon--danger"
              type="button"
              onClick={() => onDelete(expense.id)}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </article>
      ))}
    </div>
  )
}

export default ExpenseList
