import './CardTotal.css'
import { TrendingDown } from 'lucide-react'

interface CardTotalProps {
    totalValue: number
    itemCount: number
}

const formatCurrency = (value: number) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

function CardTotal({ totalValue, itemCount }: CardTotalProps) {
    return (
        <>
            <div className="container">
                <div className="trending-icon">
                    <TrendingDown size={24} color="#389475" />
                </div>

                <div className="title-content">
                    <p className="title-despesas">Total de despesas</p>
                    <p className="value-total">{formatCurrency(totalValue)}</p>
                </div>

                <div className="count-items-content">
                    <p className="count-items">{itemCount} itens</p>
                </div>
            </div>
        </>
    )
}

export default CardTotal