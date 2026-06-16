import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from 'recharts'

const data = [
  { day: 'Sun', value: 40 },
  { day: 'Mon', value: 65 },
  { day: 'Tue', value: 92 },
  { day: 'Wed', value: 55 },
  { day: 'Thu', value: 70 },
  { day: 'Fri', value: 50 },
  { day: 'Sat', value: 32 },
]

function ActivityBarChart() {
  const maxValue = Math.max(...data.map((d) => d.value))

  return (
    <div className="h-32 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 0 }} barCategoryGap="30%">
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#94a3b8' }}
            dy={4}
          />
          <Bar dataKey="value" radius={[6, 6, 6, 6]} maxBarSize={20}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.value === maxValue ? '#2563eb' : '#e2e8f0'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ActivityBarChart
