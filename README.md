# 🐂 TrackAgro - Sistema de Gestão de Pecuária

MVP completo para gerenciamento de bovinos, controle de saúde e reprodução.

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- Node.js instalado
- MongoDB rodando localmente (`mongodb://localhost:27017/trackagro`)

### 1. Backend
```bash
cd backend
npm install
npm run dev
```
*O servidor rodará em `http://localhost:5000`*

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```
*Acesse em `http://localhost:5173`*

---

## 🛠️ Tecnologias Utilizadas
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT, Multer.
- **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Lucide React, Recharts.

---

## 📋 Funcionalidades
- [x] Autenticação Completa (Login/Register)
- [x] Dashboard de Monitoramento
- [x] CRUD de Animais com Foto
- [x] Histórico de Vacinas e Doenças
- [x] Controle de Status (Ativo, Vendido, Morto)
- [x] Design Premium e Responsivo

---

## 📂 Estrutura de Pastas
- `backend/src/models`: Schemas do MongoDB.
- `backend/src/controllers`: Lógica das rotas.
- `frontend/src/pages`: Páginas da aplicação.
- `frontend/src/components`: Componentes reutilizáveis.
