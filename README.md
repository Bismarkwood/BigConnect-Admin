# BigConnect AI — Admin Platform

Internal admin platform for managing clients, AI agents, subscriptions, billing, and support operations.

## Project Structure

```
BigConnect-Admin/
│
├── src/                          ← FRONTEND (React + Vite + TypeScript)
│   ├── core/                     ← Shared infrastructure
│   │   ├── api/client.ts         ← Centralized HTTP client
│   │   ├── components/           ← Reusable UI components
│   │   ├── config/               ← Environment config
│   │   ├── hooks/                ← Shared hooks
│   │   ├── types/                ← Global types
│   │   └── utils/                ← Utility functions
│   ├── features/                 ← Feature modules (microservices-style)
│   │   ├── ai-agents/            ← AI Agent management
│   │   ├── auth/                 ← Login, forgot password
│   │   ├── billing/              ← Client billing tab
│   │   ├── call-logs/            ← Call log monitoring
│   │   ├── clients/              ← Client CRUD + profile modal
│   │   ├── dashboard/            ← Dashboard with charts
│   │   ├── finance/              ← Payments, invoices, exports
│   │   ├── knowledge-base/       ← KB monitoring
│   │   ├── subscriptions/        ← Plans & subscription management
│   │   └── tickets/              ← Support ticket resolution
│   ├── layouts/                  ← Sidebar, Topbar, MainLayout
│   ├── router/                   ← Route definitions
│   ├── styles/                   ← Global CSS + Tailwind
│   ├── App.tsx
│   └── main.tsx
│
├── backend/                      ← BACKEND (Node.js + Express)
│   ├── routes/
│   │   ├── agents.js             ← /api/v1/admin/agents
│   │   ├── clients.js            ← /api/v1/admin/clients
│   │   ├── finance.js            ← /api/v1/admin/payments, invoices
│   │   ├── subscriptions.js      ← /api/v1/admin/subscription-plans
│   │   └── tickets.js            ← /api/v1/admin/tickets
│   ├── server.js                 ← Express app entry point
│   └── package.json
│
├── docs/                         ← DOCUMENTATION
│   ├── API_ARCHITECTURE.md       ← Full API endpoint reference
│   └── FINANCE_REPORT_PDF_SPEC.md
│
├── public/                       ← Static assets
├── package.json                  ← Frontend dependencies
├── vite.config.ts                ← Vite configuration
├── tsconfig.json                 ← TypeScript config
├── tailwind.config.*             ← Tailwind (via @tailwindcss/vite)
├── .env.example                  ← Environment variables template
└── .gitignore
```

## Getting Started

### Frontend (Admin Platform UI)

```bash
npm install
npm run dev
```

Runs on `http://localhost:5173`

### Backend (SaaS API)

```bash
cd backend
npm install
node server.js
```

Runs on `http://localhost:3000`

### Environment Variables

Copy `.env.example` to `.env`:

```
VITE_API_BASE_URL=http://localhost:3000/api/v1/admin
VITE_APP_NAME=BigConnect Admin
```

## Architecture

- **Frontend** connects to the backend via REST API
- **Backend** is the single source of truth (SaaS platform)
- Admin Platform only displays and manages data through protected API endpoints
- No data is owned by the frontend

## API Groups

| Group | Base Path | Used By |
|-------|-----------|---------|
| Admin API | `/api/v1/admin/...` | This platform |
| Client API | `/api/v1/client/...` | Client SaaS dashboard |
| Runtime API | `/api/v1/runtime/...` | AI engine |
| Webhook API | `/api/v1/webhooks/...` | Payment/voice providers |
| Widget API | `/api/v1/widget/...` | Website chat widget |

## Tech Stack

**Frontend:** React 19, TypeScript, Vite, Tailwind CSS, Recharts, Lucide Icons, jsPDF, SheetJS

**Backend:** Node.js, Express, CORS

## Key Features

- Client management with profile modal
- AI Agent monitoring (client-created, admin-managed)
- Subscription plans with hybrid pricing (setup + monthly + per-minute)
- Finance: payments, invoices, webhook logs, PDF/Excel export
- Ticket resolution workflow
- Knowledge base monitoring
- Call log tracking
- 30-day subscription validity with auto-disable
