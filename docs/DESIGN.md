# 📄 Design Document – File Insight & Search Platform

---

## ✅ Overview

This project enables users to **upload**, **analyze**, and **search** documents (PDF, DOCX, TXT). It combines a **React SPA** frontend with a **NestJS + MongoDB + Elasticseach** backend to deliver a fast and scalable solution.

---

## ✅ Functional Requirements

| Feature              | Description                                                           | Rationale                                                                  |
| -------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| **File Upload**      | Users can upload `.pdf`, `.docx`, or `.txt` files.                    | Enables document ingestion for analysis.                                   |
| **Text Extraction**  | Extract text using libraries like `pdf-parse`, `mammoth`, `textract`. | Core for enabling search and data extraction.                              |
| **Metadata Storage** | Store filename, size, upload date, extracted content.                 | Enables filtering, performance optimization, and logging.                  |
| **Full-Text Search** | Users can search for keywords across documents.                       | Delivers fast insights over uploaded content.                              |
| **Responsive SPA**   | React + Vite + Tailwind.                                              | Provides a fast, clean UI with instant feedback.                           |
| **Modular API**      | NestJS with services, controllers, and providers.                     | Easy to scale and extend with new features (summarization, preview, etc.). |
| **Elastic Indexing** | Index extracted content into Elasticsearch.                           | Enables scalable, fast, and powerful full-text search capabilities.        |

---

## ✅ Non-Functional Requirements

- **Scalability**: MongoDB and NestJS allow horizontal scaling.
- **Extensibility**: Easy to add features like AI summary, tagging, semantic search.
- **Performance**: Elasticsearch ensures high-speed search with relevance scoring.
- **Developer Experience**: TypeScript across frontend and backend for consistency.
- **Containerization**: Docker ensures consistent environments for all services.

---

## ✅ Architecture Overview

```bash
+----------------+               +------------------+
| React Frontend | <----HTTP---->| NestJS Backend   |
| (SPA, TS)      |               | (REST + ES)      |
+----------------+               +------------------+
         |                                |
         |                                |
         |                        +----------------+
         |                        | MongoDB +      |
         |                        | Mongoose       |
         |                        +----------------+
         |                                |
         |                        +----------------+
         |                        | Elasticsearch  |
         |                        +----------------+

Docker containers for:
- Frontend (React + Vite)
- Backend (NestJS)
- MongoDB
- Elasticsearch
```

---

## ✅ API Endpoints

### POST `/upload`

- Accepts: `multipart/form-data`
- Flow:
  1. Validates file type/size
  2. Saves file (local or S3)
  3. Parses text
  4. Stores metadata + content in MongoDB

### GET `/search?q=term`

- Accepts: `q` (search query)
- Returns: List of matched documents and relevance

---

## ✅ Docker Setup

Each service runs in its own container for modularity and isolation.

### Services

- Frontend: React app served via nginx or vite preview
- Backend: NestJS API with environment configs and service dependencies
- MongoDB: Document-based primary data store
- Elasticsearch: Full-text search engine

---

## ✅ Implementation Plan (PoC)

### 🔹 MVP

- [x] Upload `.pdf` and `.txt` files
- [x] Extract and store text
- [x] Store metadata in MongoDB
- [x] Full-text search API
- [x] React UI for upload and search

---

## ✅ Design Decisions & Justifications

### Requirements You Came Up With:

- **Text Extraction + Indexing:** This makes uploaded documents searchable and useful.
- **Metadata Storage:** Essential for tracking files and enabling sorting/filtering later.
- **Fast, Clean UI:** Boosts UX and showcases technical polish.
- **Modular API:** Allows company to evolve this into a larger document platform.

### Technical Choices:

- MongoDB over SQL: Schema flexibility for unstructured parsed text.
- NestJS: Future-ready backend—easy to plug in auth, queues, and advanced logic.
- React + Tailwind + Vite: Developer speed + modern UI + great performance.

These decisions balance developer velocity, user experience, and technical scalability—the key ingredients for a successful MVP and foundation for long-term growth.

---

📎 See project root `README.md` for setup instructions.
