import express from 'express'
import cors from 'cors'
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

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

// Admin API routes
app.use('/api/v1/admin', clientsRouter)
app.use('/api/v1/admin', agentsRouter)
app.use('/api/v1/admin', subscriptionsRouter)
app.use('/api/v1/admin', financeRouter)

// Health check
app.get('/api/v1/health', (req, res) => {
    res.json({
        status: 'ok',
        service: 'BigConnect AI SaaS Backend',
        timestamp: new Date().toISOString()
    })
})

app.listen(PORT, () => {
    console.log(`BigConnect AI Backend running on http://localhost:${PORT}`)
    console.log(`Admin API: http://localhost:${PORT}/api/v1/admin`)
})