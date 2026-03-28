# Gerenciador Financeiro – Frontend (React + TS + Vite)

SPA para registrar e gerenciar despesas (criar, listar, filtrar, editar, excluir) usando um controlador local baseado em localStorage. Pronta para ser apontada para uma API externa (ex.: Django REST) apenas substituindo o controlador.

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
- [src/App.tsx](src/App.tsx): composição da página, estado e integração com controlador
- [src/controllers/expenseController.ts](src/controllers/expenseController.ts): CRUD em localStorage; trocar por chamadas HTTP para backend
- [src/models/Expense.ts](src/models/Expense.ts): modelo de despesa
- [src/views/components](src/views/components): componentes da UI (formulário, filtros, lista, edição, header, cards)

## Notas sobre dados/API
- Hoje os dados persistem em localStorage. Para usar uma API, reimplemente as funções do controlador (`listExpenses`, `createExpense`, `updateExpense`, `deleteExpense`) com HTTP e mantenha o mesmo contrato do modelo (id, description, category, value, date ISO yyyy-mm-dd).
- Considere adicionar feedback de carregamento/erro ao integrar com rede.
