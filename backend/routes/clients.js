import {
    Router
} from 'express'

export const clientsRouter = Router()

const clients = [{
        id: 'client_001',
        businessName: 'KFC Ghana',
        industry: 'Food & Beverage',
        contactPerson: 'Kwame Asante',
        email: 'kwame@kfcghana.com',
        phone: '+233 24 555 1234',
        website: 'https://kfcghana.com',
        country: 'Ghana',
        city: 'Accra',
        package: 'Enterprise',
        paymentStatus: 'Paid',
        status: 'Active',
        aiAgentsCount: 3,
        channelsCount: 4,
        accountManager: 'David Mensah',
        dateAdded: '2026-01-15'
    },
    {
        id: 'client_002',
        businessName: 'RightShop',
        industry: 'E-Commerce',
        contactPerson: 'Ama Serwaa',
        email: 'ama@rightshop.io',
        phone: '+233 20 444 5678',
        website: 'https://rightshop.io',
        country: 'Ghana',
        city: 'Kumasi',
        package: 'Standard',
        paymentStatus: 'Paid',
        status: 'Active',
        aiAgentsCount: 2,
        channelsCount: 2,
        accountManager: 'Sarah Osei',
        dateAdded: '2026-02-03'
    },
    {
        id: 'client_003',
        businessName: 'Bloom Advisors',
        industry: 'Finance',
        contactPerson: 'Yaw Boateng',
        email: 'yaw@bloomadvisors.com',
        phone: '+233 27 333 9012',
        country: 'Ghana',
        city: 'Accra',
        package: 'Starter',
        paymentStatus: 'Pending',
        status: 'Pending Setup',
        aiAgentsCount: 1,
        channelsCount: 0,
        accountManager: 'David Mensah',
        dateAdded: '2026-03-20'
    },
    {
        id: 'client_004',
        businessName: 'Caddyman Logistics',
        industry: 'Logistics',
        contactPerson: 'Kofi Appiah',
        email: 'kofi@caddyman.com',
        phone: '+233 55 222 3456',
        website: 'https://caddyman.com',
        country: 'Ghana',
        city: 'Tema',
        package: 'Premium',
        paymentStatus: 'Paid',
        status: 'Active',
        aiAgentsCount: 2,
        channelsCount: 3,
        accountManager: 'Sarah Osei',
        dateAdded: '2026-01-28'
    },
    {
        id: 'client_005',
        businessName: 'Jumia Support',
        industry: 'E-Commerce',
        contactPerson: 'Abena Owusu',
        email: 'abena@jumia.com.gh',
        phone: '+233 50 111 7890',
        website: 'https://jumia.com.gh',
        country: 'Ghana',
        city: 'Accra',
        package: 'Enterprise',
        paymentStatus: 'Paid',
        status: 'Active',
        aiAgentsCount: 4,
        channelsCount: 5,
        accountManager: 'David Mensah',
        dateAdded: '2025-11-10'
    },
]

// GET /api/v1/admin/clients
clientsRouter.get('/clients', (req, res) => {
    res.json(clients)
})

// GET /api/v1/admin/clients/:clientId
clientsRouter.get('/clients/:clientId', (req, res) => {
    const client = clients.find(c => c.id === req.params.clientId)
    if (!client) return res.status(404).json({
        error: 'Client not found'
    })
    res.json(client)
})

// POST /api/v1/admin/clients
clientsRouter.post('/clients', (req, res) => {
    const newClient = {
        id: `client_${Date.now()}`,
        ...req.body,
        package: 'Starter',
        paymentStatus: 'None',
        status: 'Pending Setup',
        aiAgentsCount: 0,
        channelsCount: 0,
        dateAdded: new Date().toISOString().split('T')[0],
    }
    clients.unshift(newClient)
    res.status(201).json(newClient)
})

// PATCH /api/v1/admin/clients/:clientId
clientsRouter.patch('/clients/:clientId', (req, res) => {
    const client = clients.find(c => c.id === req.params.clientId)
    if (!client) return res.status(404).json({
        error: 'Client not found'
    })
    Object.assign(client, req.body)
    res.json(client)
})

// PATCH /api/v1/admin/clients/:clientId/status
clientsRouter.patch('/clients/:clientId/status', (req, res) => {
    const client = clients.find(c => c.id === req.params.clientId)
    if (!client) return res.status(404).json({
        error: 'Client not found'
    })
    client.status = req.body.status
    res.json(client)
})

// GET /api/v1/admin/clients/:clientId/summary
clientsRouter.get('/clients/:clientId/summary', (req, res) => {
    const client = clients.find(c => c.id === req.params.clientId)
    if (!client) return res.status(404).json({
        error: 'Client not found'
    })
    res.json({
        ...client,
        onboardingProgress: 63,
        openTickets: 3,
        conversationsThisMonth: 142
    })
})