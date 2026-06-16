import {
    Router
} from 'express'

export const agentsRouter = Router()

const agents = [{
        id: 'agent_001',
        name: 'KFC Support Assistant',
        clientId: 'client_001',
        clientName: 'KFC Ghana',
        clientPlan: 'Enterprise',
        type: 'Customer Support',
        status: 'Live',
        channels: ['WhatsApp', 'Web Chat'],
        language: 'English',
        model: 'GPT-4o',
        knowledgeBaseItems: 12,
        knowledgeBaseStatus: 'Published',
        conversationsHandled: 1240,
        resolutionRate: 87,
        lastTested: 'Jun 14, 2026',
        createdAt: 'Jun 3, 2026',
        createdBy: 'Client Admin',
        agentUsage: '3 of 5'
    },
    {
        id: 'agent_002',
        name: 'KFC Order Bot',
        clientId: 'client_001',
        clientName: 'KFC Ghana',
        clientPlan: 'Enterprise',
        type: 'Sales',
        status: 'Submitted for Review',
        channels: ['WhatsApp'],
        language: 'English',
        model: 'GPT-4o',
        knowledgeBaseItems: 5,
        knowledgeBaseStatus: 'Published',
        conversationsHandled: 45,
        resolutionRate: 72,
        lastTested: 'Jun 15, 2026',
        createdAt: 'Jun 10, 2026',
        createdBy: 'Client Admin',
        agentUsage: '3 of 5'
    },
    {
        id: 'agent_003',
        name: 'RightShop Assistant',
        clientId: 'client_002',
        clientName: 'RightShop',
        clientPlan: 'Standard',
        type: 'Customer Support',
        status: 'Live',
        channels: ['WhatsApp', 'Web Chat'],
        language: 'English',
        model: 'GPT-4o',
        knowledgeBaseItems: 8,
        knowledgeBaseStatus: 'Published',
        conversationsHandled: 680,
        resolutionRate: 91,
        lastTested: 'Jun 14, 2026',
        createdAt: 'Jun 5, 2026',
        createdBy: 'Ama Serwaa',
        agentUsage: '2 of 3'
    },
]

// GET /api/v1/admin/agents (all agents across all clients)
agentsRouter.get('/agents', (req, res) => {
    res.json(agents)
})

// GET /api/v1/admin/agents/summary
agentsRouter.get('/agents/summary', (req, res) => {
    res.json({
        totalAgents: agents.length,
        live: agents.filter(a => a.status === 'Live').length,
        testing: agents.filter(a => a.status === 'Testing').length,
        submittedForReview: agents.filter(a => a.status === 'Submitted for Review').length,
        paused: 0,
        needsChanges: 0,
        totalConversations: agents.reduce((s, a) => s + a.conversationsHandled, 0),
        avgResolutionRate: 84,
    })
})

// GET /api/v1/admin/clients/:clientId/agents
agentsRouter.get('/clients/:clientId/agents', (req, res) => {
    res.json(agents.filter(a => a.clientId === req.params.clientId))
})

// GET /api/v1/admin/clients/:clientId/agents/:agentId
agentsRouter.get('/clients/:clientId/agents/:agentId', (req, res) => {
    const agent = agents.find(a => a.id === req.params.agentId)
    if (!agent) return res.status(404).json({
        error: 'Agent not found'
    })
    res.json(agent)
})

// POST /api/v1/admin/clients/:clientId/agents/:agentId/approve
agentsRouter.post('/clients/:clientId/agents/:agentId/approve', (req, res) => {
    const agent = agents.find(a => a.id === req.params.agentId)
    if (!agent) return res.status(404).json({
        error: 'Agent not found'
    })
    agent.status = 'Approved'
    res.json(agent)
})

// POST /api/v1/admin/clients/:clientId/agents/:agentId/publish
agentsRouter.post('/clients/:clientId/agents/:agentId/publish', (req, res) => {
    const agent = agents.find(a => a.id === req.params.agentId)
    if (!agent) return res.status(404).json({
        error: 'Agent not found'
    })
    agent.status = 'Live'
    res.json(agent)
})

// POST /api/v1/admin/clients/:clientId/agents/:agentId/pause
agentsRouter.post('/clients/:clientId/agents/:agentId/pause', (req, res) => {
    const agent = agents.find(a => a.id === req.params.agentId)
    if (!agent) return res.status(404).json({
        error: 'Agent not found'
    })
    agent.status = 'Paused'
    res.json(agent)
})