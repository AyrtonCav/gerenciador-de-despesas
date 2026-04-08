import './Header.css'
import { Wallet } from 'lucide-react'

function Header() {
    return (
        <header>
            <div className="header-content">
                <div className="logo-card">
                    <Wallet size={22} color="#fff" />
                </div>

                <div className="title-content">
                    <h1 className="title">Controle de despesas</h1>
                    <p className="sub-title">Organize seus gastos do dia a dia</p>
                </div>
            </div>
        </header>
    )
}

export default Header