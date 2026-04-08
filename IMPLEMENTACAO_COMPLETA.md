# Implementação Completa

### Backend

- model com validação básica de valor, data e descrição
- serializer com campos essenciais da despesa
- view com CRUD completo via API
- banco SQLite para persistência local

### Frontend

- SPA em React + TypeScript
- formulário para criar despesas
- lista para visualizar despesas
- edição e exclusão por item
- chamada HTTP tratada diretamente na tela principal
- estado controlado no próprio [App.tsx](frontend/gerenciador-financeiro/src/App.tsx)

## Estrutura final

- [backend/expenses/models.py](backend/expenses/models.py)
- [backend/expenses/serializers.py](backend/expenses/serializers.py)
- [backend/expenses/views.py](backend/expenses/views.py)
- [frontend/gerenciador-financeiro/src/models/Expense.ts](frontend/gerenciador-financeiro/src/models/Expense.ts)
- [frontend/gerenciador-financeiro/src/App.tsx](frontend/gerenciador-financeiro/src/App.tsx)

## Como funciona

1. O usuário cria ou edita uma despesa na interface.
2. A tela principal valida os dados básicos.
3. A própria tela principal envia a requisição para a API.
4. O backend valida no model e salva.
5. A resposta volta e a lista é atualizada.

## Resultado prático

A aplicação agora está alinhada com a proposta da atividade:

- MVC simples
- SPA como visão
- CRUD de despesas
- sem relatórios desnecessários
- sem excesso de abstração

## Observação

As versões anteriores dessas documentações continham recursos extras como filtros, relatórios e ações customizadas. Eles foram removidos do código para deixar o projeto compatível com a atividade e a documentação foi reduzida para refletir isso.
