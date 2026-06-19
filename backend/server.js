import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import {
    authRouter
} from './routes/auth.js'
import {
    clientsRouter
} from './routes/clients.js'
import {
    agentsRouter
} from './routes/agents.js'
import {
    subscriptionsRouter
} from './routes/subscriptions.js'
import {
    financeRouter
} from './routes/finance.js'
import {
    ticketsRouter
} from './routes/tickets.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// Auth routes (public - no auth middleware)
app.use('/api/v1/auth', authRouter)

// Admin API routes (will add auth middleware when ready)
app.use('/api/v1/admin', clientsRouter)
app.use('/api/v1/admin', agentsRouter)
app.use('/api/v1/admin', subscriptionsRouter)
app.use('/api/v1/admin', financeRouter)
app.use('/api/v1/admin', ticketsRouter)

// Health check
app.get('/api/v1/health', (req, res) => {
    res.json({
        status: 'ok',
        service: 'BigConnect AI SaaS Backend',
        timestamp: new Date().toISOString(),
        database: 'PostgreSQL',
        auth: 'JWT',
    })
})

app.listen(PORT, () => {
    console.log(`BigConnect AI Backend running on http://localhost:${PORT}`)
    console.log(`Auth API: http://localhost:${PORT}/api/v1/auth`)
    console.log(`Admin API: http://localhost:${PORT}/api/v1/admin`)
})