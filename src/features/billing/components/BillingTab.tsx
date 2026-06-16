import React, { useEffect, useRef } from 'react'
import {
  CreditCard,
  CheckCircle2,
  CalendarDays,
  FileText,
  DollarSign,
  AlertCircle,
  Bot,
  Radio,
  HeadphonesIcon,
  Zap,
  BookOpen,
  Mic,
} from 'lucide-react'
import type { PaymentStatus } from '../types'

// Mock data — will be replaced with fetchSubscription + fetchInvoices
const mockSubscription = {
  plan: 'Enterprise',
  billingCycle: 'Monthly' as const,
  amount: 'GHS 2,500',
  status: 'Active' as const,
  startDate: 'Jan 15, 2026',
  nextBillingDate: 'Jul 15, 2026',
  features: ['Unlimited AI Agents', 'All Channels', 'Priority Support', '10,000 API calls/mo', 'Custom Knowledge Base', 'Call Recording'],
}

const featureMeta: Record<string, { icon: React.ReactNode; color: string; bg: string; border: string }> = {
  'Unlimited AI Agents': {
    icon: <Bot className="h-3.5 w-3.5" />,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
  },
  'All Channels': {
    icon: <Radio className="h-3.5 w-3.5" />,
    color: 'text-sky-600',
    bg: 'bg-sky-50',
    border: 'border-sky-200',
  },
  'Priority Support': {
    icon: <HeadphonesIcon className="h-3.5 w-3.5" />,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
  },
  '10,000 API calls/mo': {
    icon: <Zap className="h-3.5 w-3.5" />,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
  },
  'Custom Knowledge Base': {
    icon: <BookOpen className="h-3.5 w-3.5" />,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
  },
  'Call Recording': {
    icon: <Mic className="h-3.5 w-3.5" />,
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
  },
}

const mockInvoices = [
  { id: 'inv_006', invoiceNumber: 'INV-00128', amount: 'GHS 2,500', status: 'Paid' as PaymentStatus, issuedDate: 'Jun 1, 2026', dueDate: 'Jun 15, 2026', paidDate: 'Jun 1, 2026', paymentMethod: 'Mobile Money' },
  { id: 'inv_005', invoiceNumber: 'INV-00119', amount: 'GHS 2,500', status: 'Paid' as PaymentStatus, issuedDate: 'May 1, 2026', dueDate: 'May 15, 2026', paidDate: 'May 2, 2026', paymentMethod: 'Mobile Money' },
  { id: 'inv_004', invoiceNumber: 'INV-00110', amount: 'GHS 2,500', status: 'Paid' as PaymentStatus, issuedDate: 'Apr 1, 2026', dueDate: 'Apr 15, 2026', paidDate: 'Apr 1, 2026', paymentMethod: 'Mobile Money' },
  { id: 'inv_003', invoiceNumber: 'INV-00101', amount: 'GHS 2,500', status: 'Paid' as PaymentStatus, issuedDate: 'Mar 1, 2026', dueDate: 'Mar 15, 2026', paidDate: 'Mar 3, 2026', paymentMethod: 'Bank Transfer' },
  { id: 'inv_002', invoiceNumber: 'INV-00092', amount: 'GHS 2,500', status: 'Paid' as PaymentStatus, issuedDate: 'Feb 1, 2026', dueDate: 'Feb 15, 2026', paidDate: 'Feb 1, 2026', paymentMethod: 'Mobile Money' },
  { id: 'inv_001', invoiceNumber: 'INV-00083', amount: 'GHS 2,500', status: 'Paid' as PaymentStatus, issuedDate: 'Jan 15, 2026', dueDate: 'Jan 30, 2026', paidDate: 'Jan 15, 2026', paymentMethod: 'Mobile Money' },
]

const paymentStatusConfig: Record<PaymentStatus, { color: string; dot: string; bg: string }> = {
  'Paid': { color: 'text-emerald-700', dot: 'bg-emerald-500', bg: 'bg-emerald-50' },
  'Pending': { color: 'text-amber-700', dot: 'bg-amber-500', bg: 'bg-amber-50' },
  'Overdue': { color: 'text-red-700', dot: 'bg-red-500', bg: 'bg-red-50' },
  'Failed': { color: 'text-red-700', dot: 'bg-red-500', bg: 'bg-red-50' },
  'Refunded': { color: 'text-slate-600', dot: 'bg-slate-400', bg: 'bg-slate-100' },
}

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      alpha: number
    }> = []

    // Initialize particles
    const particleCount = 22
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.4 + 0.2,
      })
    }

    const mouse = { x: -1000, y: -1000, active: false }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.active = true
    }

    const handleMouseLeave = () => {
      mouse.active = false
    }

    const parent = canvas.parentElement
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove)
      parent.addEventListener('mouseleave', handleMouseLeave)
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = canvas.width = entry.contentRect.width
        height = canvas.height = entry.contentRect.height
      }
    })
    resizeObserver.observe(canvas)

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      // Update and draw particles
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        // Wrap around edges
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        // Mouse interaction: push away gently
        if (mouse.active) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 75) {
            const force = (75 - dist) / 75
            p.x += (dx / dist) * force * 1.2
            p.y += (dy / dist) * force * 1.2
          }
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`
        ctx.fill()
      })

      // Draw subtle connecting lines (constellation effect)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const pi = particles[i]
          const pj = particles[j]
          const dx = pi.x - pj.x
          const dy = pi.y - pj.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 60) {
            const alpha = (1 - dist / 60) * 0.12
            ctx.beginPath()
            ctx.moveTo(pi.x, pi.y)
            ctx.lineTo(pj.x, pj.y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      resizeObserver.disconnect()
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove)
        parent.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none w-full h-full"
    />
  )
}

interface BillingTabProps {
  clientId: string
}

function BillingTab({ clientId }: BillingTabProps) {
  void clientId
  const totalPaid = mockInvoices.filter((i) => i.status === 'Paid').length
  const totalAmount = totalPaid * 2500

  return (
    <div className="space-y-5">
      {/* Subscription card + summary */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_340px]">
        {/* Subscription details */}
        <div className="rounded-xl border border-[#DDE6F5] overflow-hidden">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#DDE6F5]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                  <CreditCard className="h-5 w-5 text-blue-600" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-[#07152F]">Current Subscription</h4>
                  <p className="text-[11px] text-[#6B7A99] mt-0.5">Active since {mockSubscription.startDate}</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {mockSubscription.status}
              </span>
            </div>

            {/* Plan name + price hero */}
            <div className="rounded-xl border border-[#DDE6F5] bg-[#F3F7FF] p-5 mt-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-blue-600 font-semibold">{mockSubscription.plan} Plan</p>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-[32px] font-bold text-[#07152F] tracking-tight">{mockSubscription.amount}</span>
                    <span className="text-[13px] text-[#6B7A99]">/ month</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] text-[#6B7A99]">Billing cycle</span>
                  <span className="rounded-md bg-white border border-[#DDE6F5] px-2.5 py-1 text-[11px] font-medium text-[#07152F]">{mockSubscription.billingCycle}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Details grid */}
          <div className="px-6 py-5">
            <div className="grid grid-cols-3 gap-5 mb-5">
              <div className="rounded-lg border border-[#DDE6F5] p-3.5">
                <p className="text-[10px] text-[#6B7A99] uppercase tracking-wide mb-1">Next Billing</p>
                <p className="text-[14px] font-semibold text-[#07152F]">{mockSubscription.nextBillingDate}</p>
              </div>
              <div className="rounded-lg border border-[#DDE6F5] p-3.5">
                <p className="text-[10px] text-[#6B7A99] uppercase tracking-wide mb-1">Total Paid</p>
                <p className="text-[14px] font-semibold text-emerald-600">GHS {totalAmount.toLocaleString()}</p>
              </div>
              <div className="rounded-lg border border-[#DDE6F5] p-3.5">
                <p className="text-[10px] text-[#6B7A99] uppercase tracking-wide mb-1">Invoices</p>
                <p className="text-[14px] font-semibold text-[#07152F]">{mockInvoices.length} issued</p>
              </div>
            </div>

            {/* Features */}
            <div className="border-t border-[#DDE6F5] pt-5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[11px] uppercase tracking-widest text-[#6B7A99] font-bold">Plan Features</p>
                <span className="rounded-full bg-blue-50 border border-blue-200 px-2 py-0.5 text-[10px] font-semibold text-blue-600">{mockSubscription.features.length} included</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {mockSubscription.features.map((feature) => {
                  const meta = featureMeta[feature]
                  return (
                    <div
                      key={feature}
                      className={`group flex items-center gap-2.5 rounded-xl border px-3 py-2.5 transition-all duration-200 hover:scale-[1.02] hover:shadow-sm ${
                        meta ? `${meta.bg} ${meta.border}` : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm ${
                        meta ? meta.color : 'text-slate-500'
                      }`}>
                        {meta ? meta.icon : <CheckCircle2 className="h-3.5 w-3.5" />}
                      </span>
                      <span className={`text-[11px] font-semibold leading-tight ${
                        meta ? meta.color.replace('text-', 'text-').replace('-600', '-700') : 'text-slate-700'
                      }`}>
                        {feature}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Billing Summary Sidebar */}
        <div className="space-y-4">

          {/* ── Billing Summary Card ── */}
          <div className="rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(145deg, #0f172a 0%, #1e293b 100%)', boxShadow: '0 20px 60px rgba(0,0,0,0.25), 0 1px 0 rgba(255,255,255,0.06) inset' }}>
            {/* Card header */}
            <div className="px-5 pt-5 pb-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}>
                  <CreditCard className="h-4 w-4 text-white" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-white leading-none">Billing Summary</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Current period overview</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold text-emerald-300" style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)' }}>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                All Clear
              </span>
            </div>

            {/* Stat tiles grid */}
            <div className="grid grid-cols-2 gap-px p-px" style={{ background: 'rgba(255,255,255,0.05)' }}>
              {/* Tile 1 — Total Invoices */}
              <div className="flex flex-col gap-1 p-4" style={{ background: '#0f172a' }}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">Invoices</span>
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg" style={{ background: 'rgba(99,102,241,0.15)' }}>
                    <FileText className="h-3 w-3 text-indigo-400" strokeWidth={2} />
                  </div>
                </div>
                <p className="text-[26px] font-black text-white leading-none mt-1">{mockInvoices.length}</p>
                <p className="text-[10px] text-slate-500">Total issued</p>
                <div className="mt-2 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(99,102,241,0.15)' }}>
                  <div className="h-full rounded-full" style={{ width: '100%', background: 'linear-gradient(90deg, #6366f1, #818cf8)' }} />
                </div>
              </div>

              {/* Tile 2 — Paid */}
              <div className="flex flex-col gap-1 p-4" style={{ background: '#0f172a' }}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">Paid</span>
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg" style={{ background: 'rgba(16,185,129,0.15)' }}>
                    <CheckCircle2 className="h-3 w-3 text-emerald-400" strokeWidth={2} />
                  </div>
                </div>
                <p className="text-[26px] font-black text-emerald-400 leading-none mt-1">{mockInvoices.filter(i => i.status === 'Paid').length}</p>
                <p className="text-[10px] text-slate-500">Invoices paid</p>
                <div className="mt-2 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(16,185,129,0.15)' }}>
                  <div className="h-full rounded-full" style={{ width: `${(mockInvoices.filter(i => i.status === 'Paid').length / mockInvoices.length) * 100}%`, background: 'linear-gradient(90deg, #10b981, #34d399)' }} />
                </div>
              </div>

              {/* Tile 3 — Total Paid Amount */}
              <div className="col-span-2 flex items-center justify-between p-4" style={{ background: '#0f172a' }}>
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">Total Collected</span>
                  <p className="text-[22px] font-black text-white mt-1 leading-none">GHS {(mockInvoices.filter(i => i.status === 'Paid').length * 2500).toLocaleString()}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: 'linear-gradient(135deg, rgba(251,191,36,0.2), rgba(251,191,36,0.05))', border: '1px solid rgba(251,191,36,0.2)' }}>
                  <DollarSign className="h-5 w-5 text-amber-400" strokeWidth={2} />
                </div>
              </div>

              {/* Tile 4 — Outstanding */}
              <div className="flex flex-col gap-1 p-4" style={{ background: '#0f172a' }}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">Outstanding</span>
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg" style={{ background: 'rgba(239,68,68,0.12)' }}>
                    <AlertCircle className="h-3 w-3 text-rose-400" strokeWidth={2} />
                  </div>
                </div>
                <p className="text-[26px] font-black text-white leading-none mt-1">GHS 0</p>
                <p className="text-[10px] text-emerald-400 font-medium">✓ Nothing owed</p>
              </div>

              {/* Tile 5 — Payment Method */}
              <div className="flex flex-col gap-1 p-4" style={{ background: '#0f172a' }}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">Method</span>
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg" style={{ background: 'rgba(59,130,246,0.15)' }}>
                    <CalendarDays className="h-3 w-3 text-blue-400" strokeWidth={2} />
                  </div>
                </div>
                <p className="text-[13px] font-bold text-white mt-1 leading-snug">Mobile<br/>Money</p>
                <p className="text-[10px] text-slate-500">Primary method</p>
              </div>
            </div>
          </div>

          {/* ── Next Payment Card ── */}
          <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-primary-hover via-[#1e40af] to-[#1e3a8a] p-5 text-white shadow-[0_8px_30px_rgb(29,78,216,0.25)] border border-blue-500/30 transition-all duration-300 hover:shadow-[0_12px_40px_rgb(29,78,216,0.35)] hover:scale-[1.01]">
            <ParticleBackground />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-100">Next Payment</span>
                <span className="inline-flex items-center rounded-full bg-blue-500/30 border border-blue-400/20 px-2.5 py-0.5 text-[9px] font-semibold text-blue-100 backdrop-blur-sm">Upcoming</span>
              </div>
              <p className="text-[28px] font-black text-white tracking-tight drop-shadow-md">{mockSubscription.amount}</p>
              <div className="mt-3 flex items-center gap-2">
                <CalendarDays className="h-3.5 w-3.5 text-blue-200" strokeWidth={1.5} />
                <span className="text-[12px] text-blue-100">Due on <span className="font-bold text-white">{mockSubscription.nextBillingDate}</span></span>
              </div>
              <div className="mt-4 h-px bg-white/10" />
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[10px] text-blue-200">Billing cycle</span>
                <span className="text-[11px] font-semibold text-white">{mockSubscription.billingCycle}</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Invoices table */}
      <div className="rounded-xl border border-[#DDE6F5] overflow-hidden">
        <div className="flex items-center justify-between bg-[#F3F7FF] px-5 py-3.5 border-b border-[#DDE6F5]">
          <h4 className="text-[13px] font-semibold text-[#07152F]">Invoice History</h4>
          <span className="text-[11px] text-[#6B7A99]">{mockInvoices.length} invoices</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#DDE6F5]">
                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#6B7A99]">Invoice</th>
                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#6B7A99]">Amount</th>
                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#6B7A99]">Status</th>
                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#6B7A99]">Issued</th>
                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#6B7A99]">Paid Date</th>
                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#6B7A99]">Method</th>
              </tr>
            </thead>
            <tbody>
              {mockInvoices.map((invoice) => {
                const sc = paymentStatusConfig[invoice.status]
                return (
                  <tr key={invoice.id} className="border-b border-[#F3F7FF] last:border-0 hover:bg-[#F3F7FF]/50 transition">
                    <td className="px-5 py-3.5">
                      <span className="text-[12px] font-medium text-blue-600">{invoice.invoiceNumber}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-[12px] font-semibold text-[#07152F]">{invoice.amount}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-medium ${sc.bg} ${sc.color}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${sc.dot}`} />
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-[11px] text-[#6B7A99]">{invoice.issuedDate}</td>
                    <td className="px-5 py-3.5 text-[11px] text-[#07152F]">{invoice.paidDate || '—'}</td>
                    <td className="px-5 py-3.5 text-[11px] text-[#6B7A99]">{invoice.paymentMethod || '—'}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default BillingTab
