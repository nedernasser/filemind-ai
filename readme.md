# FileMind AI 📄🤖

An AI-powered document analysis app. Upload documents and search their content intelligently.

📄 [Technical Design Document](./docs/DESIGN.md)

---

## 🧱 Tech Stack

- Frontend: React + TypeScript + Vite
- Backend: NestJS + TypeScript
- DB: MongoDB with Mongoose
- Search: Elasticsearch (via custom FileSearchService)

---

## 📂 Project Structure

```bash
filemind-ai/
├── client/                 # React frontend
│   ├── src/components/     # FileUploader, SearchBox, etc.
│   └── tests/              # Vitest component tests
├── server/                 # NestJS backend
│   ├── src/file/           # File module (controller, service, schema)
│   ├── src/search/         # Search module (Elasticsearch service)
│   └── test/               # Unit tests (Jest)
├── docker-compose.yml      # Starts backend, MongoDB, and Elasticsearch
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- Docker
- Yarn

---

### 📦 Frontend Setup

```bash
cd client
npm install

# Run the frontend
npm run dev
```

### 📦 Backend Setup

```bash
cd server
npm install

# Create .env
cp .env.example .env

# Run the backend
npm start
```

### 📦 Running with Docker

```bash
docker-compose up --build
```

---

## ✅ Running Tests

### Frontend (Vitest + Testing Library)

```bash
cd client
npm run test
```

### Backend (Jest)

```bash
cd server
npm run test
```

---

## 🔍 Features

- Upload documents via drag-and-drop
- Full-text search across uploaded files
- Elasticsearch-backed search index
- Unit-tested frontend and backend
- Runs fully local via Docker

---

## 🧪 Example API Endpoints

### Upload File

```bash
POST /file/upload
Content-Type: multipart/form-data
```

### Search Files

```bash
GET /file/search?q=example
```
