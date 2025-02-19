import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Mon', revenue: 35000, orders: 320 },
  { day: 'Tues', revenue: 42000, orders: 350 },
  { day: 'Wed', revenue: 38000, orders: 380 },
  { day: 'Thur', revenue: 82347, orders: 280 },
  { day: 'Fri', revenue: 45000, orders: 320 },
  { day: 'Sat', revenue: 40000, orders: 290 },
  { day: 'Sun', revenue: 38000, orders: 350 },
];

export default function RevenueChart() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Order/Revenue</h3>
        <div className="flex space-x-6">
          <div className="flex items-center">
            <span className="text-sm text-gray-500">RECEIVED ORDERS</span>
            <span className="ml-2 font-semibold">845</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-500">RECEIVED PAYMENT</span>
            <span className="ml-2 font-semibold">₨ 2,39,600</span>
          </div>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280' }}
            />
            <YAxis 
              yAxisId="left"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280' }}
              domain={[0, 100000]}
              orientation="left"
            />
            <YAxis 
              yAxisId="right"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280' }}
              domain={[0, 500]}
              orientation="right"
            />
            <Tooltip />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="revenue"
              stroke="#60A5FA"
              strokeWidth={2}
              dot={false}
              fill="url(#colorRevenue)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="orders"
              stroke="#1E40AF"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
