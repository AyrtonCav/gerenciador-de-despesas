# Guia Rápido

## O que este projeto faz

Sistema simples de cadastro de despesas com:

- adicionar despesa
- listar despesas
- editar despesa
- excluir despesa

## Backend

### Model

Use [backend/expenses/models.py](backend/expenses/models.py) quando precisar mexer nas regras da despesa:

- descrição obrigatória
- valor maior que zero
- data válida
- salvar no banco

### View

Use [backend/expenses/views.py](backend/expenses/views.py) para controlar a API CRUD.

### Serializer

Use [backend/expenses/serializers.py](backend/expenses/serializers.py) para definir quais campos a API envia e recebe.

## Frontend

### Model

Use [frontend/gerenciador-financeiro/src/models/Expense.ts](frontend/gerenciador-financeiro/src/models/Expense.ts) para:

- representar uma despesa no cliente
- formatar valor e data
- validar os dados antes do envio

### Components

Use os componentes em [frontend/gerenciador-financeiro/src/views/components](frontend/gerenciador-financeiro/src/views/components) para a interface.

## Fluxo normal

1. O usuário preenche o formulário.
2. A tela principal envia a requisição para a API.
3. O backend valida no model e salva.
4. A lista é atualizada no frontend.

## Regra principal da atividade

- Model: dados e validação
- Controller/View: operações CRUD
- View do cliente: interface da SPA

## O que foi removido por ser desnecessário para a atividade

- filtros avançados
- relatórios e estatísticas
- ações extras na API
- camadas extras no frontend

## Como rodar

Backend:

1. entrar na pasta `backend`
2. ativar a virtualenv
3. executar `python manage.py runserver`

Frontend:

1. entrar em `frontend/gerenciador-financeiro`
2. executar `npm install`
3. executar `npm run dev`
