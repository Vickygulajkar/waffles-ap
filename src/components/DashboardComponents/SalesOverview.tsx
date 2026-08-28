import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { type SalesOverviewData } from '../../services/dashboardService';

interface SalesOverviewProps {
  data: SalesOverviewData;
}

const SalesOverview: React.FC<SalesOverviewProps> = ({ data }) => {

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-md border border-gray-100 text-center">
          <p className="text-sm font-bold text-gray-800">{`₹${payload[0].value.toLocaleString()}`}</p>
          <p className="text-xs text-gray-500 font-medium">{label}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base font-bold text-gray-800">Sales Overview</h2>
        <select className="text-xs bg-gray-50 border-none rounded-md px-2 py-1 text-gray-600 outline-none cursor-pointer font-medium">
          <option>This Week</option>
          <option>Last Week</option>
          <option>This Month</option>
        </select>
      </div>

      <div className="flex-1 w-full min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data.chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#E85D21" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#E85D21" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} tickFormatter={(value) => `${value / 1000}K`} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="sales" stroke="#E85D21" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" activeDot={{ r: 6, fill: "#E85D21", stroke: "#fff", strokeWidth: 2 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 flex items-center justify-between bg-orange-50/50 p-4 rounded-xl">
        <div>
          <p className="text-xs font-semibold text-gray-500 mb-1">This Week Sales</p>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900">₹{data.thisWeekSales.toLocaleString()}</span>
            <span className="text-xs font-semibold text-green-600 bg-green-100 px-1.5 py-0.5 rounded flex items-center">↑ 24.5%</span>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 mb-1">This Week Orders</p>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900">{data.thisWeekOrders}</span>
            <span className="text-xs font-semibold text-green-600 bg-green-100 px-1.5 py-0.5 rounded flex items-center">↑ 20.1%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesOverview;
