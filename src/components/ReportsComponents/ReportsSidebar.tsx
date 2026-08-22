import React from 'react';
import DonutChartCard from './DonutChartCard';

const ReportsSidebar: React.FC = () => {
  const salesByChannelData = [
    { label: 'Delivery', value: '₹2,46,654', percentage: 72, color: '#E85D21' }, // Orange
    { label: 'Pickup', value: '₹82,120', percentage: 24, color: '#3B82F6' }, // Blue
    { label: 'Dine-in', value: '₹13,806', percentage: 4, color: '#10B981' }, // Green
  ];

  const paymentMethods = [
    { label: 'UPI', value: '₹1,45,230', percentage: 42, color: 'bg-green-500' },
    { label: 'Credit / Debit Card', value: '₹1,10,450', percentage: 32, color: 'bg-blue-500' },
    { label: 'Cash on Delivery', value: '₹68,320', percentage: 20, color: 'bg-orange-500' },
    { label: 'Wallet', value: '₹18,580', percentage: 6, color: 'bg-purple-500' },
  ];

  const topProducts = [
    { product: 'Nutella Overload Waffle', orders: 352, revenue: '₹70,400' },
    { product: 'Belgian Chocolate Waffle', orders: 284, revenue: '₹56,800' },
    { product: 'Red Velvet Waffle', orders: 198, revenue: '₹39,600' },
    { product: 'KitKat Waffle', orders: 176, revenue: '₹35,200' },
    { product: 'Oreo Shake', orders: 162, revenue: '₹24,300' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <DonutChartCard 
        title="Sales by Channel"
        data={salesByChannelData}
        centerLabel="Total"
        centerValue="₹3,42,580"
      />

      {/* Payment Method */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-sm font-bold text-gray-800 mb-6">Payment Method</h3>
        <div className="space-y-4">
          {paymentMethods.map((method, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-center text-[10px] font-semibold text-gray-800 mb-1.5">
                <span>{method.label}</span>
                <div className="flex gap-2">
                  <span>{method.value}</span>
                  <span className="text-gray-400 w-6 text-right">{method.percentage}%</span>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div className={`${method.color} h-1.5 rounded-full`} style={{ width: `${method.percentage}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top 5 Best Selling Products */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-sm font-bold text-gray-800 mb-4">Top 5 Best Selling Products</h3>
        
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="pb-2 text-[10px] font-bold text-gray-500 font-sans">Product</th>
              <th className="pb-2 text-[10px] font-bold text-gray-500 font-sans text-right">Orders</th>
              <th className="pb-2 text-[10px] font-bold text-gray-500 font-sans text-right">Revenue</th>
            </tr>
          </thead>
          <tbody className="text-xs font-semibold text-gray-800">
            {topProducts.map((prod, idx) => (
              <tr key={idx}>
                <td className="py-2.5 truncate max-w-[120px]">{prod.product}</td>
                <td className="py-2.5 text-right text-gray-500">{prod.orders}</td>
                <td className="py-2.5 text-right">{prod.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="w-full py-2.5 border border-orange-200 text-[#E85D21] hover:bg-orange-50 rounded-lg text-sm font-bold transition-colors">
        View Full Report
      </button>
    </div>
  );
};

export default ReportsSidebar;
