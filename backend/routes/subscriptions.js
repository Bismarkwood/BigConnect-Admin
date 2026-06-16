import {
    Router
} from 'express'

export const subscriptionsRouter = Router()

const plans = [{
        id: 'plan_001',
        name: 'Starter',
        monthlyFee: 'GHS 1,500',
        setupFee: 'GHS 2,500',
        perMinuteRate: 'GHS 2.50',
        volume: '< 1,000 mins',
        aiAgentLimit: 5,
        knowledgeBaseLimit: 3,
        storage: '5GB',
        phoneNumbers: '1',
        status: 'Active',
        clientsOnPlan: 3
    },
    {
        id: 'plan_002',
        name: 'Standard',
        monthlyFee: 'GHS 2,100',
        setupFee: 'GHS 2,500',
        perMinuteRate: 'GHS 2.40',
        volume: '1,000 – 5,000 mins',
        aiAgentLimit: 10,
        knowledgeBaseLimit: 10,
        storage: '10GB',
        phoneNumbers: 'Multiple',
        status: 'Active',
        clientsOnPlan: 4
    },
    {
        id: 'plan_003',
        name: 'Premium',
        monthlyFee: 'GHS 2,500',
        setupFee: 'GHS 2,500',
        perMinuteRate: 'GHS 2.30',
        volume: '5,000 – 10,000 mins',
        aiAgentLimit: 15,
        knowledgeBaseLimit: 15,
        storage: '15GB',
        phoneNumbers: 'Multiple',
        status: 'Active',
        clientsOnPlan: 3
    },
    {
        id: 'plan_004',
        name: 'Enterprise',
        monthlyFee: 'Custom',
        setupFee: 'Custom',
        perMinuteRate: 'Custom',
        volume: '> 10,000 mins',
        aiAgentLimit: -1,
        knowledgeBaseLimit: -1,
        storage: 'Unlimited',
        phoneNumbers: 'Unlimited',
        status: 'Active',
        clientsOnPlan: 2
    },
]

const clientSubscriptions = [{
        id: 'sub_001',
        clientId: 'client_001',
        clientName: 'KFC Ghana',
        planName: 'Enterprise',
        status: 'Active',
        agentsUsed: '3 / Unlimited',
        kbUsed: '5 / Unlimited',
        minutesUsed: '12,400',
        rate: 'Custom',
        billingCycle: 'Monthly',
        renewalDate: 'Jul 15, 2026'
    },
    {
        id: 'sub_002',
        clientId: 'client_002',
        clientName: 'RightShop',
        planName: 'Standard',
        status: 'Active',
        agentsUsed: '2 / 10',
        kbUsed: '4 / 10',
        minutesUsed: '2,400',
        rate: 'GHS 2.40/min',
        billingCycle: 'Monthly',
        renewalDate: 'Jul 16, 2026'
    },
]

// GET /api/v1/admin/subscription-plans
subscriptionsRouter.get('/subscription-plans', (req, res) => {
    res.json(plans)
})

// POST /api/v1/admin/subscription-plans
subscriptionsRouter.post('/subscription-plans', (req, res) => {
    const plan = {
        id: `plan_${Date.now()}`,
        ...req.body,
        status: 'Active',
        clientsOnPlan: 0
    }
    plans.push(plan)
    res.status(201).json(plan)
})

// PATCH /api/v1/admin/subscription-plans/:planId
subscriptionsRouter.patch('/subscription-plans/:planId', (req, res) => {
    const plan = plans.find(p => p.id === req.params.planId)
    if (!plan) return res.status(404).json({
        error: 'Plan not found'
    })
    Object.assign(plan, req.body)
    res.json(plan)
})

// GET /api/v1/admin/client-subscriptions
subscriptionsRouter.get('/client-subscriptions', (req, res) => {
    res.json(clientSubscriptions)
})

// GET /api/v1/admin/clients/:clientId/subscription
subscriptionsRouter.get('/clients/:clientId/subscription', (req, res) => {
    const sub = clientSubscriptions.find(s => s.clientId === req.params.clientId)
    if (!sub) return res.status(404).json({
        error: 'Subscription not found'
    })
    res.json(sub)
})

// GET /api/v1/admin/clients/:clientId/subscription/entitlements
subscriptionsRouter.get('/clients/:clientId/subscription/entitlements', (req, res) => {
    res.json({
        aiAgentLimit: 10,
        aiAgentsUsed: 2,
        knowledgeBaseLimit: 10,
        knowledgeBasesUsed: 4,
        storageLimit: '10GB',
        storageUsed: '3.2GB',
        callMinuteLimit: 5000,
        callMinutesUsed: 2400
    })
})