# Gerenciamento Financeiro
Uma Single Page Application (SPA) para cadastro, edição, listagem e exclusão de despesas pessoais

Django DRF React TypeScript Vite SQLite

## 📋 Visão Geral
O Gerenciamento Financeiro é uma plataforma web para controle de despesas, com foco em simplicidade e clareza arquitetural.

A aplicação permite registrar gastos por categoria, visualizar o total acumulado e manter os dados atualizados em tempo real, sem recarregar a página.

- Frontend: React + TypeScript com Vite
- Backend: Django + Django REST Framework
- Banco: SQLite
- Arquitetura: MVC separação clara entre frontend e backend, com comunicação via API REST

Este projeto é ideal para fins educacionais, demonstrando:

✅ Comunicação cliente-servidor via REST API
✅ Estrutura MVC adaptada para backend e frontend
✅ Requisições assíncronas com atualização reativa de tela
✅ Validações no cliente e no servidor
✅ Integração React + DRF com CORS

## 🎯 Funcionalidades Principais

### Operações com Despesas
- ➕ Criar despesa
- 📋 Listar despesas
- ✏️ Editar despesa
- 🗑️ Excluir despesa

### Regras de Validação
- Descrição obrigatória
- Categoria obrigatória
- Valor obrigatório e maior que zero
- Data obrigatória
- Data não pode ser no futuro
- Data não pode ser mais antiga que 5 anos

### Interface
- 💰 Card com total acumulado
- 🧾 Lista de despesas ordenada por data
- 🧠 Feedback de erro para validações e chamadas de API
- ⚡ Atualização imediata da interface após ações de CRUD

## 🏗️ Arquitetura do Projeto

### Estrutura de Diretórios
```text
Gerenciamento Financeiro/                      ← Raiz do projeto
│
├── ARQUITETURA_MVC.md                        ← Explica a arquitetura MVC adotada
├── GUIA_RAPIDO.md                            ← Guia resumido de uso e manutenção
├── IMPLEMENTACAO_COMPLETA.md                 ← Documentação técnica detalhada
│
├── backend/                                  ← Aplicação Django e API REST
│   ├── manage.py                             ← CLI do Django (runserver, migrate, test)
│   ├── db.sqlite3                            ← Banco de dados SQLite local
│   ├── requirements.txt                      ← Dependências Python do backend
│   ├── run_migrations.bat                    ← Script para executar migrações no Windows
│   │
│   ├── core/                                 ← Configuração principal do projeto Django
│   │   ├── settings.py                       ← Configurações gerais (apps, CORS, DB)
│   │   ├── urls.py                           ← Roteamento raiz da API e admin
│   │   ├── wsgi.py                           ← Entrada WSGI para deploy tradicional
│   │   └── asgi.py                           ← Entrada ASGI para servidores assíncronos
│   │
│   └── expenses/                             ← App de domínio das despesas
│       ├── models.py                         ← Model Expense e regras de validação
│       ├── serializers.py                    ← Conversão entre Model e JSON
│       ├── views.py                          ← ViewSet com endpoints CRUD
│       ├── urls.py                           ← Rotas da app expenses
│       ├── admin.py                          ← Registro do model no Django Admin
│       ├── tests.py                          ← Testes automatizados da app
│       └── migrations/                       ← Histórico de migrações do banco
│
└── frontend/                                 ← Camada cliente em React
    └── gerenciador-financeiro/              ← Projeto frontend com Vite
        ├── package.json                      ← Scripts e dependências Node
        ├── vite.config.ts                    ← Configuração do build e dev server
        ├── index.html                        ← HTML base da SPA
        ├── eslint.config.js                  ← Regras de lint do frontend
        │
        ├── src/                              ← Código-fonte TypeScript/React
        │   ├── main.tsx                      ← Ponto de entrada e renderização do App
        │   ├── App.tsx                       ← Componente principal e fluxo da tela
        │   ├── App.css                       ← Estilos principais da aplicação
        │   ├── index.css                     ← Estilos globais e base visual
        │   │
        │   ├── models/                       ← Modelos e validações do frontend
        │   │   └── Expense.ts                ← Classe/tipos de despesa e validações
        │   │
        │   ├── services/                     ← Serviços de integração com a API
        │   │   └── expenseService.ts         ← CRUD HTTP para despesas
        │   │
        │   └── views/components/             ← Componentes visuais reutilizáveis
        │       ├── Header/                   ← Cabeçalho da aplicação
        │       ├── CardTotal/                ← Card com total de despesas
        │       ├── ExpenseForm/              ← Formulário de cadastro
        │       ├── ExpenseList/              ← Lista de despesas cadastradas
        │       ├── ExpenseEditCard/          ← Card/formulário de edição
        │       └── ExpenseFilters/           ← Componente de filtros (apoio de UI)
        │
        └── public/                           ← Arquivos estáticos públicos
```

## 🚀 Início Rápido

### Pré-requisitos
- Python 3.10+
- Node.js 18+
- npm

### 1️⃣ Configurar Backend (Django)
```bash
cd backend

# criar e ativar ambiente virtual (Windows PowerShell)
python -m venv .venv
.\.venv\Scripts\Activate.ps1

# instalar dependências
pip install -r requirements.txt

# aplicar migrações
python manage.py migrate

# iniciar servidor
python manage.py runserver
```
Backend disponível em: http://127.0.0.1:8000

### 2️⃣ Configurar Frontend (React + Vite)
```bash
cd frontend/gerenciador-financeiro

# instalar dependências
npm install

# iniciar servidor de desenvolvimento
npm run dev
```
Frontend disponível em: http://localhost:5173

## 🔌 Endpoints da API
Base URL: http://127.0.0.1:8000/api

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /expenses/ | Listar despesas |
| POST | /expenses/ | Criar despesa |
| GET | /expenses/{id}/ | Detalhar despesa |
| PUT | /expenses/{id}/ | Atualizar despesa |
| PATCH | /expenses/{id}/ | Atualização parcial |
| DELETE | /expenses/{id}/ | Excluir despesa |

## 🔄 Fluxo da Aplicação (SPA)
1. Usuário preenche o formulário no frontend.
2. Frontend valida os dados localmente.
3. Frontend envia requisição para API REST.
4. Backend valida novamente e persiste no SQLite.
5. Frontend recebe resposta e atualiza estado.
6. Interface é re-renderizada sem refresh completo da página.

## 🧠 Arquitetura MVC Aplicada

### Backend (MVC clássico no Django)
- Model: Expense em expenses/models.py
- View: ExpenseViewSet em expenses/views.py
- Serializer: ExpenseSerializer em expenses/serializers.py

### Frontend (MVC adaptado)
- Model: classe Expense, tipos e validações em src/models/Expense.ts
- View: componentes React em src/views/components
- Controller/Service: chamadas de API em src/services/expenseService.ts

## 📚 Tecnologias Utilizadas

### Backend
| Tecnologia | Versão |
|------------|--------|
| Python | 3.10+ |
| Django | 5.2.12 |
| Django REST Framework | 3.17.1 |
| django-cors-headers | 4.9.0 |
| SQLite | padrão do Django |

### Frontend
| Tecnologia | Versão |
|------------|--------|
| React | 19.2.4 |
| TypeScript | 5.9.3 |
| Vite | 8.0.1 |
| ESLint | 9.39.4 |
| lucide-react | 1.7.0 |

## 🛠️ Scripts Úteis

### Backend
```bash
python manage.py runserver
python manage.py makemigrations
python manage.py migrate
python manage.py test
```

### Frontend
```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## ⚠️ Observação de CORS
No backend, o CORS está configurado para http://localhost:3000.
Se você estiver rodando o Vite na porta padrão 5173, ajuste CORS_ALLOWED_ORIGINS em core/settings.py para incluir http://localhost:5173.

