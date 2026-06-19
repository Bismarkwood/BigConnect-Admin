# BigConnect AI — SaaS Backend API

Express.js backend serving the Admin Platform and (future) Client Platform.

## Running

```bash
npm install
node server.js
# or with auto-reload:
npm run dev
```

Server starts on `http://localhost:3000`

## API Routes

All admin endpoints are under `/api/v1/admin/`:

| Route File | Endpoints |
|------------|-----------|
| `routes/clients.js` | `/clients` CRUD, `/clients/:id/summary`, `/clients/:id/status` |
| `routes/agents.js` | `/agents`, `/clients/:id/agents`, approve/publish/pause |
| `routes/subscriptions.js` | `/subscription-plans`, `/client-subscriptions`, entitlements |
| `routes/finance.js` | `/payments`, `/invoices`, `/payment-webhook-logs`, `/finance/overview` |
| `routes/tickets.js` | `/tickets` CRUD, assign/messages/escalate/resolve/close/reopen |

## Health Check

```
GET /api/v1/health
```

## Notes

- Currently uses in-memory mock data
- CORS enabled for frontend connection
- Ready to connect to PostgreSQL/MongoDB when needed
- JWT auth middleware to be added
