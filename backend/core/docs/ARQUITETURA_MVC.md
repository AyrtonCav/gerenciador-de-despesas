# Arquitetura MVC

Esta aplicação segue uma versão simples de MVC para cadastro de despesas.

## Visão Geral

O projeto está dividido em duas partes:

- Backend com Django REST Framework
- Frontend com React + TypeScript

O objetivo da atividade é apenas cadastrar, listar, editar e excluir despesas.

## Backend

### Model

O model fica em [backend/expenses/models.py](backend/expenses/models.py).

Ele concentra os dados e as regras de negócio da despesa:

- descrição obrigatória
- valor maior que zero
- data válida
- persistência no banco

### View

A view fica em [backend/expenses/views.py](backend/expenses/views.py).

Ela expõe o CRUD da API:

- `GET /api/expenses/`
- `POST /api/expenses/`
- `GET /api/expenses/{id}/`
- `PUT /api/expenses/{id}/`
- `DELETE /api/expenses/{id}/`

### Serializer

O serializer fica em [backend/expenses/serializers.py](backend/expenses/serializers.py) e faz a ponte entre o model e o JSON.

## Frontend

### Model

O model do frontend fica em [frontend/gerenciador-financeiro/src/models/Expense.ts](frontend/gerenciador-financeiro/src/models/Expense.ts).

Ele serve para:

- representar uma despesa no cliente
- formatar valor e data
- validar os dados antes do envio

### View

A interface fica em [frontend/gerenciador-financeiro/src/App.tsx](frontend/gerenciador-financeiro/src/App.tsx) e nos componentes dentro de [frontend/gerenciador-financeiro/src/views/components](frontend/gerenciador-financeiro/src/views/components).

Esses componentes cuidam de:

- mostrar o formulário
- listar despesas
- editar despesas
- excluir despesas

## Fluxo da aplicação

1. O usuário preenche o formulário na SPA.
2. A tela principal envia os dados para a API.
3. O backend valida no model e salva no banco.
4. A resposta volta para o frontend e a lista é atualizada.

## Resumo

- Model: dados e regras básicas
- View: operações CRUD e interface
- Serializer: ponte entre model e JSON

## Observação

A versão atual foi enxugada para ficar de acordo com a proposta da atividade. Filtros avançados, relatórios e outras camadas extras foram removidos para manter o sistema focado no cadastro de despesas.
