import {
    Router
} from 'express'

export const ticketsRouter = Router()

const tickets = [{
        id: 'TCK-2026-000124',
        clientId: 'client_002',
        clientName: 'RightShop Ghana',
        subject: 'WhatsApp channel not connecting',
        category: 'Channel Issue',
        priority: 'High',
        status: 'New',
        source: 'Client Platform',
        assignedTo: 'Unassigned',
        createdAt: 'Jun 16, 2026',
        lastUpdated: 'Jun 16, 2026',
        description: 'Our WhatsApp channel stopped sending messages this morning.',
        relatedModule: 'Channel',
        relatedRecordId: 'channel_123'
    },
    {
        id: 'TCK-2026-000123',
        clientId: 'client_001',
        clientName: 'KFC Ghana',
        subject: 'AI agent giving incorrect answers about menu',
        category: 'AI Agent Issue',
        priority: 'High',
        status: 'In Progress',
        source: 'Client Platform',
        assignedTo: 'David Mensah',
        createdAt: 'Jun 15, 2026',
        lastUpdated: 'Jun 16, 2026',
        description: 'The AI agent is providing outdated menu pricing.'
    },
    {
        id: 'TCK-2026-000122',
        clientId: 'client_003',
        clientName: 'Bloom Advisors',
        subject: 'Cannot access billing dashboard',
        category: 'Account Issue',
        priority: 'Medium',
        status: 'Waiting for Client',
        source: 'Client Platform',
        assignedTo: 'Sarah Osei',
        createdAt: 'Jun 15, 2026',
        lastUpdated: 'Jun 15, 2026',
        description: 'I cannot see the billing page when I log in.'
    },
    {
        id: 'TCK-2026-000121',
        clientId: 'client_004',
        clientName: 'Caddyman Logistics',
        subject: 'Knowledge base upload fails for large PDF',
        category: 'Knowledge Base Issue',
        priority: 'Medium',
        status: 'Open',
        source: 'Client Platform',
        assignedTo: 'Unassigned',
        createdAt: 'Jun 14, 2026',
        lastUpdated: 'Jun 14, 2026',
        description: 'PDF files over 10MB fail to upload with no error message.'
    },
    {
        id: 'TCK-2026-000120',
        clientId: 'client_005',
        clientName: 'Jumia Support',
        subject: 'Request for custom API integration',
        category: 'Technical Issue',
        priority: 'Low',
        status: 'Escalated',
        source: 'Client Platform',
        assignedTo: 'Emmanuel Adu',
        createdAt: 'Jun 13, 2026',
        lastUpdated: 'Jun 15, 2026',
        description: 'We need a custom webhook for our internal CRM system.'
    },
]

const ticketMessages = {
    'TCK-2026-000124': [{
        id: 'msg_001',
        ticketId: 'TCK-2026-000124',
        senderId: 'user_002',
        senderName: 'Ama Serwaa',
        senderType: 'client_user',
        message: 'Our WhatsApp channel stopped sending messages this morning. Customers are complaining.',
        visibility: 'client_visible',
        createdAt: 'Jun 16, 2026 · 10:30 AM'
    }, ],
    'TCK-2026-000123': [{
            id: 'msg_002',
            ticketId: 'TCK-2026-000123',
            senderId: 'user_001',
            senderName: 'Kwame Asante',
            senderType: 'client_user',
            message: 'The AI agent is telling customers the chicken bucket is GHS 80 but it should be GHS 120.',
            visibility: 'client_visible',
            createdAt: 'Jun 15, 2026 · 2:15 PM'
        },
        {
            id: 'msg_003',
            ticketId: 'TCK-2026-000123',
            senderId: 'admin_001',
            senderName: 'David Mensah',
            senderType: 'admin_user',
            message: 'We are checking the knowledge base for outdated pricing. Will update shortly.',
            visibility: 'client_visible',
            createdAt: 'Jun 15, 2026 · 3:00 PM'
        },
        {
            id: 'msg_004',
            ticketId: 'TCK-2026-000123',
            senderId: 'admin_001',
            senderName: 'David Mensah',
            senderType: 'admin_user',
            message: 'Internal: KB item "Menu & Pricing" needs republishing after client uploaded new doc.',
            visibility: 'internal_only',
            createdAt: 'Jun 15, 2026 · 3:05 PM'
        },
    ],
}

const ticketActivityLogs = {
    'TCK-2026-000124': [{
        id: 'log_001',
        ticketId: 'TCK-2026-000124',
        actorName: 'Ama Serwaa',
        actorType: 'client_user',
        action: 'Ticket created',
        createdAt: 'Jun 16, 2026 · 10:30 AM'
    }, ],
    'TCK-2026-000123': [{
            id: 'log_002',
            ticketId: 'TCK-2026-000123',
            actorName: 'Kwame Asante',
            actorType: 'client_user',
            action: 'Ticket created',
            createdAt: 'Jun 15, 2026 · 2:15 PM'
        },
        {
            id: 'log_003',
            ticketId: 'TCK-2026-000123',
            actorName: 'System',
            actorType: 'system',
            action: 'Assigned to David Mensah',
            createdAt: 'Jun 15, 2026 · 2:45 PM'
        },
        {
            id: 'log_004',
            ticketId: 'TCK-2026-000123',
            actorName: 'David Mensah',
            actorType: 'admin_user',
            action: 'Status changed',
            oldValue: 'New',
            newValue: 'In Progress',
            createdAt: 'Jun 15, 2026 · 3:00 PM'
        },
        {
            id: 'log_005',
            ticketId: 'TCK-2026-000123',
            actorName: 'David Mensah',
            actorType: 'admin_user',
            action: 'Replied to client',
            createdAt: 'Jun 15, 2026 · 3:00 PM'
        },
    ],
}

// GET /api/v1/admin/tickets
ticketsRouter.get('/tickets', (req, res) => {
    let result = [...tickets]
    const {
        status,
        priority,
        category,
        clientId,
        search
    } = req.query
    if (status) result = result.filter(t => t.status === status)
    if (priority) result = result.filter(t => t.priority === priority)
    if (category) result = result.filter(t => t.category === category)
    if (clientId) result = result.filter(t => t.clientId === clientId)
    if (search) result = result.filter(t => t.subject.toLowerCase().includes(String(search).toLowerCase()) || t.clientName.toLowerCase().includes(String(search).toLowerCase()))
    res.json(result)
})

// GET /api/v1/admin/tickets/:ticketId
ticketsRouter.get('/tickets/:ticketId', (req, res) => {
    const ticket = tickets.find(t => t.id === req.params.ticketId)
    if (!ticket) return res.status(404).json({
        error: 'Ticket not found'
    })
    res.json(ticket)
})

// GET /api/v1/admin/tickets/:ticketId/messages
ticketsRouter.get('/tickets/:ticketId/messages', (req, res) => {
    res.json(ticketMessages[req.params.ticketId] || [])
})

// GET /api/v1/admin/tickets/:ticketId/attachments
ticketsRouter.get('/tickets/:ticketId/attachments', (req, res) => {
    res.json([])
})

// GET /api/v1/admin/tickets/:ticketId/activity-logs
ticketsRouter.get('/tickets/:ticketId/activity-logs', (req, res) => {
    res.json(ticketActivityLogs[req.params.ticketId] || [])
})

// PATCH /api/v1/admin/tickets/:ticketId
ticketsRouter.patch('/tickets/:ticketId', (req, res) => {
    const ticket = tickets.find(t => t.id === req.params.ticketId)
    if (!ticket) return res.status(404).json({
        error: 'Ticket not found'
    })
    Object.assign(ticket, req.body, {
        lastUpdated: new Date().toISOString()
    })
    res.json(ticket)
})

// POST /api/v1/admin/tickets/:ticketId/assign
ticketsRouter.post('/tickets/:ticketId/assign', (req, res) => {
    const ticket = tickets.find(t => t.id === req.params.ticketId)
    if (!ticket) return res.status(404).json({
        error: 'Ticket not found'
    })
    ticket.assignedTo = req.body.assignedAdminId || req.body.assignedTo
    if (ticket.status === 'New') ticket.status = 'Open'
    ticket.lastUpdated = new Date().toISOString()
    res.json(ticket)
})

// POST /api/v1/admin/tickets/:ticketId/messages
ticketsRouter.post('/tickets/:ticketId/messages', (req, res) => {
    const msgs = ticketMessages[req.params.ticketId] || []
    const newMsg = {
        id: `msg_${Date.now()}`,
        ticketId: req.params.ticketId,
        senderId: 'admin_001',
        senderName: 'Support Admin',
        senderType: 'admin_user',
        message: req.body.message,
        visibility: req.body.visibility || 'client_visible',
        createdAt: new Date().toISOString(),
    }
    msgs.push(newMsg)
    ticketMessages[req.params.ticketId] = msgs
    res.status(201).json(newMsg)
})

// POST /api/v1/admin/tickets/:ticketId/internal-notes
ticketsRouter.post('/tickets/:ticketId/internal-notes', (req, res) => {
    const msgs = ticketMessages[req.params.ticketId] || []
    const note = {
        id: `msg_${Date.now()}`,
        ticketId: req.params.ticketId,
        senderId: 'admin_001',
        senderName: 'Support Admin',
        senderType: 'admin_user',
        message: req.body.note,
        visibility: 'internal_only',
        createdAt: new Date().toISOString(),
    }
    msgs.push(note)
    ticketMessages[req.params.ticketId] = msgs
    res.status(201).json(note)
})

// POST /api/v1/admin/tickets/:ticketId/escalate
ticketsRouter.post('/tickets/:ticketId/escalate', (req, res) => {
    const ticket = tickets.find(t => t.id === req.params.ticketId)
    if (!ticket) return res.status(404).json({
        error: 'Ticket not found'
    })
    ticket.status = 'Escalated'
    ticket.lastUpdated = new Date().toISOString()
    res.json(ticket)
})

// POST /api/v1/admin/tickets/:ticketId/resolve
ticketsRouter.post('/tickets/:ticketId/resolve', (req, res) => {
    const ticket = tickets.find(t => t.id === req.params.ticketId)
    if (!ticket) return res.status(404).json({
        error: 'Ticket not found'
    })
    ticket.status = 'Resolved'
    ticket.lastUpdated = new Date().toISOString()
    res.json(ticket)
})

// POST /api/v1/admin/tickets/:ticketId/close
ticketsRouter.post('/tickets/:ticketId/close', (req, res) => {
    const ticket = tickets.find(t => t.id === req.params.ticketId)
    if (!ticket) return res.status(404).json({
        error: 'Ticket not found'
    })
    ticket.status = 'Closed'
    ticket.lastUpdated = new Date().toISOString()
    res.json(ticket)
})

// POST /api/v1/admin/tickets/:ticketId/acknowledge
ticketsRouter.post('/tickets/:ticketId/acknowledge', (req, res) => {
    const ticket = tickets.find(t => t.id === req.params.ticketId)
    if (!ticket) return res.status(404).json({
        error: 'Ticket not found'
    })
    ticket.status = 'Open'
    ticket.lastUpdated = new Date().toISOString()
    res.json(ticket)
})

// POST /api/v1/admin/tickets/:ticketId/request-info
ticketsRouter.post('/tickets/:ticketId/request-info', (req, res) => {
    const ticket = tickets.find(t => t.id === req.params.ticketId)
    if (!ticket) return res.status(404).json({
        error: 'Ticket not found'
    })
    ticket.status = 'Waiting for Client'
    ticket.lastUpdated = new Date().toISOString()
    // Save the message as client-visible
    const msgs = ticketMessages[req.params.ticketId] || []
    msgs.push({
        id: `msg_${Date.now()}`,
        ticketId: req.params.ticketId,
        senderId: 'admin_001',
        senderName: 'Support Admin',
        senderType: 'admin_user',
        message: req.body.message,
        visibility: 'client_visible',
        createdAt: new Date().toISOString(),
    })
    ticketMessages[req.params.ticketId] = msgs
    res.json(ticket)
})

// POST /api/v1/admin/tickets/:ticketId/reopen
ticketsRouter.post('/tickets/:ticketId/reopen', (req, res) => {
    const ticket = tickets.find(t => t.id === req.params.ticketId)
    if (!ticket) return res.status(404).json({
        error: 'Ticket not found'
    })
    ticket.status = 'In Progress'
    ticket.lastUpdated = new Date().toISOString()
    res.json(ticket)
})