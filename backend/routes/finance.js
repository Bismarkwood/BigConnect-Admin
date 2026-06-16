import {
    Router
} from 'express'

export const financeRouter = Router()

const payments = [{
        id: 'PAY-00128',
        clientName: 'KFC Ghana',
        planName: 'Enterprise',
        invoiceId: 'INV-00128',
        gateway: 'Paystack',
        amount: 'GHS 2,500',
        method: 'Mobile Money',
        status: 'Successful',
        gatewayReference: 'PSK_A2X929',
        paymentDate: 'Jun 16, 2026',
        subscriptionStatus: 'Activated'
    },
    {
        id: 'PAY-00127',
        clientName: 'RightShop',
        planName: 'Standard',
        invoiceId: 'INV-00127',
        gateway: 'Paystack',
        amount: 'GHS 2,100',
        method: 'Mobile Money',
        status: 'Successful',
        gatewayReference: 'PSK_B3Y830',
        paymentDate: 'Jun 16, 2026',
        subscriptionStatus: 'Activated'
    },
    {
        id: 'PAY-00126',
        clientName: 'Caddyman Logistics',
        planName: 'Premium',
        invoiceId: 'INV-00126',
        gateway: 'Hubtel',
        amount: 'GHS 2,500',
        method: 'Mobile Money',
        status: 'Successful',
        gatewayReference: 'HBT_C4Z731',
        paymentDate: 'Jun 15, 2026',
        subscriptionStatus: 'Activated'
    },
    {
        id: 'PAY-00125',
        clientName: 'Bloom Advisors',
        planName: 'Starter',
        invoiceId: 'INV-00125',
        gateway: 'Paystack',
        amount: 'GHS 1,500',
        method: 'Bank Transfer',
        status: 'Pending',
        gatewayReference: 'PSK_D5A632',
        paymentDate: 'Jun 15, 2026',
        subscriptionStatus: 'Pending Payment'
    },
    {
        id: 'PAY-00124',
        clientName: 'Hubtel Payments',
        planName: 'Standard',
        invoiceId: 'INV-00124',
        gateway: 'Paystack',
        amount: 'GHS 2,100',
        method: 'Mobile Money',
        status: 'Failed',
        gatewayReference: 'PSK_E6B533',
        paymentDate: 'Jun 14, 2026',
        subscriptionStatus: 'Suspended'
    },
]

const invoices = [{
        id: 'INV-00128',
        invoiceNumber: 'INV-2026-00128',
        clientName: 'KFC Ghana',
        amount: 'GHS 2,500',
        currency: 'GHS',
        status: 'Paid',
        issuedDate: 'Jun 1, 2026',
        dueDate: 'Jun 15, 2026',
        paidDate: 'Jun 1, 2026'
    },
    {
        id: 'INV-00127',
        invoiceNumber: 'INV-2026-00127',
        clientName: 'RightShop',
        amount: 'GHS 9,400',
        currency: 'GHS',
        status: 'Paid',
        issuedDate: 'Jun 16, 2026',
        dueDate: 'Jul 16, 2026',
        paidDate: 'Jun 16, 2026'
    },
    {
        id: 'INV-00125',
        invoiceNumber: 'INV-2026-00125',
        clientName: 'Bloom Advisors',
        amount: 'GHS 1,500',
        currency: 'GHS',
        status: 'Sent',
        issuedDate: 'Jun 15, 2026',
        dueDate: 'Jun 30, 2026',
        paidDate: null
    },
]

const webhookLogs = [{
        id: 'WH-00195',
        gateway: 'Paystack',
        reference: 'PSK_A2X929',
        eventType: 'charge.success',
        status: 'Processed',
        receivedAt: 'Jun 16, 2026 · 2:15 PM',
        processedAt: 'Jun 16, 2026 · 2:15 PM'
    },
    {
        id: 'WH-00194',
        gateway: 'Paystack',
        reference: 'PSK_B3Y830',
        eventType: 'charge.success',
        status: 'Processed',
        receivedAt: 'Jun 16, 2026 · 1:42 PM',
        processedAt: 'Jun 16, 2026 · 1:42 PM'
    },
    {
        id: 'WH-00192',
        gateway: 'Paystack',
        reference: 'PSK_E6B533',
        eventType: 'charge.failed',
        status: 'Processed',
        receivedAt: 'Jun 14, 2026 · 11:30 AM',
        processedAt: 'Jun 14, 2026 · 11:30 AM'
    },
]

// GET /api/v1/admin/finance/overview
financeRouter.get('/finance/overview', (req, res) => {
    const successful = payments.filter(p => p.status === 'Successful')
    res.json({
        totalRevenue: `GHS ${successful.reduce((s, p) => s + parseInt(p.amount.replace(/[^\d]/g, '')), 0).toLocaleString()}`,
        successfulPayments: successful.length,
        pendingPayments: payments.filter(p => p.status === 'Pending').length,
        failedPayments: payments.filter(p => p.status === 'Failed').length,
        activeSubscriptions: 5,
        expiredSubscriptions: 1,
        gatewayErrors: 1,
        webhookFailures: 0,
    })
})

// GET /api/v1/admin/payments
financeRouter.get('/payments', (req, res) => res.json(payments))

// GET /api/v1/admin/payments/:paymentId
financeRouter.get('/payments/:paymentId', (req, res) => {
    const payment = payments.find(p => p.id === req.params.paymentId)
    if (!payment) return res.status(404).json({
        error: 'Payment not found'
    })
    res.json(payment)
})

// GET /api/v1/admin/invoices
financeRouter.get('/invoices', (req, res) => res.json(invoices))

// GET /api/v1/admin/invoices/:invoiceId
financeRouter.get('/invoices/:invoiceId', (req, res) => {
    const invoice = invoices.find(i => i.id === req.params.invoiceId)
    if (!invoice) return res.status(404).json({
        error: 'Invoice not found'
    })
    res.json(invoice)
})

// GET /api/v1/admin/payment-webhook-logs
financeRouter.get('/payment-webhook-logs', (req, res) => res.json(webhookLogs))

// GET /api/v1/admin/finance/reconciliation
financeRouter.get('/finance/reconciliation', (req, res) => {
    res.json([{
            gatewayRef: 'PSK_A2X929',
            systemPaymentId: 'PAY-00128',
            invoiceAmount: 'GHS 2,500',
            status: 'Matched'
        },
        {
            gatewayRef: 'PSK_B3Y830',
            systemPaymentId: 'PAY-00127',
            invoiceAmount: 'GHS 2,100',
            status: 'Matched'
        },
        {
            gatewayRef: 'PSK_E6B533',
            systemPaymentId: 'PAY-00124',
            invoiceAmount: 'GHS 2,100',
            status: 'Gateway Paid / System Pending'
        },
    ])
})