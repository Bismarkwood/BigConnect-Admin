# BigConnect AI — API Architecture

## Overview

The BigConnect AI system uses a **modular REST API** with the SaaS backend as the single source of truth. All platforms (Admin, Client, Runtime) connect through protected API routes.

```
BigConnect Admin Platform → /api/v1/admin/...  → SaaS Backend → Database
Client SaaS Platform     → /api/v1/client/... → SaaS Backend → Database
AI Runtime               → /api/v1/runtime/...→ SaaS Backend → AI Engine
External Systems         → /api/v1/webhooks/..→ SaaS Backend → Processing
Website Chat Widget      → /api/v1/widget/... → SaaS Backend → AI Engine
```

## API Groups

### 1. Admin API (`/api/v1/admin/...`)
Used by the BigConnect internal team (this platform).

### 2. Client API (`/api/v1/client/...`)
Used by client's own SaaS dashboard. Clients only see their own data.

### 3. Runtime API (`/api/v1/runtime/...`)
Used by the AI engine when responding to customers. Not exposed publicly.

### 4. Webhook API (`/api/v1/webhooks/...`)
Used by external systems (WhatsApp, SMS, Voice, Payments).

### 5. Widget API (`/api/v1/widget/...`)
Used by client websites where the chat widget is installed.

---

## Admin API Endpoints (This Platform)

### Authentication
```
POST /api/v1/auth/login
POST /api/v1/auth/forgot-password
POST /api/v1/auth/verify-reset-pin
POST /api/v1/auth/reset-password
```

### Clients
```
GET    /api/v1/admin/clients
POST   /api/v1/admin/clients
GET    /api/v1/admin/clients/{clientId}
PATCH  /api/v1/admin/clients/{clientId}
PATCH  /api/v1/admin/clients/{clientId}/status
GET    /api/v1/admin/clients/{clientId}/summary
```

### AI Agents
```
GET    /api/v1/admin/clients/{clientId}/agents/summary
GET    /api/v1/admin/clients/{clientId}/agents
POST   /api/v1/admin/clients/{clientId}/agents
GET    /api/v1/admin/clients/{clientId}/agents/{agentId}
PATCH  /api/v1/admin/clients/{clientId}/agents/{agentId}
POST   /api/v1/admin/clients/{clientId}/agents/{agentId}/test
POST   /api/v1/admin/clients/{clientId}/agents/{agentId}/publish
POST   /api/v1/admin/clients/{clientId}/agents/{agentId}/pause
POST   /api/v1/admin/clients/{clientId}/agents/{agentId}/archive
```

### Knowledge Base
```
# Admin viewing endpoints
GET    /api/v1/admin/clients/{clientId}/knowledge-base/summary
GET    /api/v1/admin/clients/{clientId}/knowledge-base
GET    /api/v1/admin/clients/{clientId}/knowledge-base/{kbId}

# Admin action endpoints
POST   /api/v1/admin/clients/{clientId}/knowledge-base/{kbId}/approve
POST   /api/v1/admin/clients/{clientId}/knowledge-base/{kbId}/publish
POST   /api/v1/admin/clients/{clientId}/knowledge-base/{kbId}/reprocess
POST   /api/v1/admin/clients/{clientId}/knowledge-base/{kbId}/archive

# Admin testing endpoint
POST   /api/v1/admin/clients/{clientId}/knowledge-base/test-query
```

> **Note:** The client platform creates KB content via `/api/v1/client/knowledge-base`.
> The admin platform only views, approves, publishes, reprocesses, archives, and tests.
> The AI runtime only uses KB items with status `Published`.

### Call Logs
```
# Viewing endpoints
GET    /api/v1/admin/clients/{clientId}/call-logs/summary
GET    /api/v1/admin/clients/{clientId}/call-logs
GET    /api/v1/admin/clients/{clientId}/call-logs/{callId}
GET    /api/v1/admin/clients/{clientId}/call-logs/{callId}/recording
GET    /api/v1/admin/clients/{clientId}/call-logs/{callId}/transcript
GET    /api/v1/admin/clients/{clientId}/call-logs/{callId}/summary

# Admin action endpoints
POST   /api/v1/admin/clients/{clientId}/call-logs/{callId}/flag
POST   /api/v1/admin/clients/{clientId}/call-logs/{callId}/notes
POST   /api/v1/admin/clients/{clientId}/call-logs/{callId}/escalate
POST   /api/v1/admin/clients/{clientId}/call-logs/{callId}/archive
```

> **Data source:** Voice Provider → Webhook → SaaS Backend → Admin API
> The admin platform never fetches from the voice provider directly.

### Voice Webhooks (received by SaaS Backend)
```
POST   /api/v1/webhooks/voice/incoming-call
POST   /api/v1/webhooks/voice/call-started
POST   /api/v1/webhooks/voice/call-ended
POST   /api/v1/webhooks/voice/transcript-ready
POST   /api/v1/webhooks/voice/recording-ready
POST   /api/v1/webhooks/voice/call-failed
```

### Billing & Subscription
```
GET    /api/v1/admin/clients/{clientId}/billing/summary
GET    /api/v1/admin/clients/{clientId}/billing/subscription
GET    /api/v1/admin/clients/{clientId}/billing/invoices
GET    /api/v1/admin/clients/{clientId}/billing/invoices/{invoiceId}
```

### Channels
```
GET    /api/v1/admin/clients/{clientId}/channels
GET    /api/v1/admin/clients/{clientId}/channels/{channelId}
PATCH  /api/v1/admin/clients/{clientId}/channels/{channelId}/status
```

### Usage
```
GET    /api/v1/admin/clients/{clientId}/usage
GET    /api/v1/admin/clients/{clientId}/usage/summary
```

### Client Users
```
GET    /api/v1/admin/clients/{clientId}/users
POST   /api/v1/admin/clients/{clientId}/users/{userId}/password-reset
```

---

## Client Platform API Endpoints (Reference)

These are used by the client's own SaaS dashboard, not this admin platform.

### Knowledge Base (Client Side)
```
GET    /api/v1/client/knowledge-base
POST   /api/v1/client/knowledge-base
GET    /api/v1/client/knowledge-base/{kbId}
PATCH  /api/v1/client/knowledge-base/{kbId}
DELETE /api/v1/client/knowledge-base/{kbId}
POST   /api/v1/client/knowledge-base/upload-url
POST   /api/v1/client/knowledge-base/{kbId}/submit
```

Upload flow:
```
Client uploads file → SaaS stores & processes → Status: Processing
→ Processing complete → Status: Ready for Review / Published
→ Admin approves → Status: Approved → Admin publishes → Status: Published
→ AI agent uses Published content only
```

---

## HTTP Methods

| Action | Method |
|--------|--------|
| Fetch data | GET |
| Create record | POST |
| Update record | PATCH |
| Delete/archive | DELETE or POST archive |
| Trigger action | POST |
| Change status | PATCH |

---

## Security

- **JWT authentication** for all API calls
- **Role-based access control** (Admin vs Client vs Runtime)
- **Client-based data isolation** — clientId scopes all data
- **Audit logs** on all admin actions
- **Webhook signature verification** for external providers
- **Rate limiting** on all endpoints
- **Request validation** on all inputs

---

## Data Relationships

Every record belongs to a `clientId`:

```
clientId
  ├── AI Agents
  ├── Knowledge Base
  ├── Channels
  ├── Conversations
  ├── Call Logs
  ├── Tickets
  ├── Usage
  ├── Invoices
  ├── Payments
  ├── Users
  └── Reports
```

### Knowledge Base Statuses
```
Draft → Processing → Ready for Review → Approved → Published
                                                  ↘ Failed
                                                  ↘ Archived
```
Only `Published` items are used by the AI runtime.

### AI Agent Statuses
```
Draft → Testing → Live
              ↘ Paused
              ↘ Archived
```

---

## Permission Rules

| Platform | Access |
|----------|--------|
| Admin Platform | Can manage multiple clients |
| Client Platform | Can only access own workspace |
| Runtime API | Can only process assigned conversations |
| Webhook API | Accepts only verified external events |
