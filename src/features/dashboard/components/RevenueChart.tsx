import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { date: '1 Jan', revenue: 32, prev: 28 },
  { date: '5 Jan', revenue: 40, prev: 30 },
  { date: '8 Jan', revenue: 35, prev: 33 },
  { date: '12 Jan', revenue: 55, prev: 38 },
  { date: '15 Jan', revenue: 48, prev: 42 },
  { date: '18 Jan', revenue: 70, prev: 45 },
  { date: '22 Jan', revenue: 62, prev: 50 },
  { date: '26 Jan', revenue: 85, prev: 55 },
  { date: '29 Jan', revenue: 78, prev: 60 },
]

interface TooltipProps {
  active?: boolean
  payload?: Array<{ value: number }>
  label?: string
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload || !payload.length) return null
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-lg">
      <p className="text-[11px] font-medium text-slate-400">{label}, 2026</p>
      <p className="mt-1 flex items-center gap-1.5 text-[13px] font-semibold text-slate-900">
        <span className="h-2 w-2 rounded-full bg-blue-500" />
        GHS {payload[0].value}K this month
      </p>
      {payload[1] && (
        <p className="mt-0.5 flex items-center gap-1.5 text-[13px] font-medium text-slate-400">
          <span className="h-2 w-2 rounded-full bg-slate-300" />
          GHS {payload[1].value}K last month
        </p>
      )}
    </div>
  )
}

function RevenueChart() {
  return (
    <div className="h-52 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            dy={8}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            tickFormatter={(v) => `${v}K`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#cbd5e1', strokeDasharray: '4 4' }} />
          <Area
            type="monotone"
            dataKey="prev"
            stroke="#cbd5e1"
            strokeWidth={2}
            strokeDasharray="4 4"
            fill="none"
            dot={false}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#2563eb"
            strokeWidth={2.5}
            fill="url(#revenueGradient)"
            dot={false}
            activeDot={{ r: 5, fill: '#2563eb', stroke: '#fff', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default RevenueChart
