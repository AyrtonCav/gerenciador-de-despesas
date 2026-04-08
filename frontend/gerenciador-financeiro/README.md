# Gerenciador Financeiro – Frontend (React + TS + Vite)

SPA para registrar e gerenciar despesas com cadastro, listagem, edição e exclusão. O frontend conversa diretamente com a API Django REST do projeto.

## Requisitos
- Node.js 18.18+ (recomendado 20+) e npm

## Como rodar
```bash
git clone <repo>
cd frontend/gerenciador-financeiro
npm install
npm run dev
```
Abra a URL exibida pelo Vite (por padrão http://localhost:5173).

## Scripts
- `npm run dev` – modo desenvolvimento com HMR
- `npm run build` – build de produção (tsc + vite build)
- `npm run preview` – serve o build gerado
- `npm run lint` – analisa o código com ESLint

## Estrutura breve
- [src/App.tsx](src/App.tsx): composição da página, estado e integração com a API
- [src/models/Expense.ts](src/models/Expense.ts): modelo de despesa e validações de entrada
- [src/views/components](src/views/components): componentes da UI (formulário, lista, edição, header, cards)

## Notas sobre dados/API
- A API esperada é a do backend Django REST deste projeto, em `http://127.0.0.1:8000/api/expenses/`.
- O contrato de dados da despesa deve manter `id`, `description`, `category`, `value` e `date` em formato ISO `yyyy-mm-dd`.
