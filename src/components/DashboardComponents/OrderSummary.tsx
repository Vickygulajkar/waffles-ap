import React from 'react';
import { Clock, CheckCircle2, ChefHat, ShoppingBag, Bike, CheckCircle, XCircle } from 'lucide-react';

const OrderSummary: React.FC = () => {
  const summaryItems = [
    { label: 'Pending', count: 12, icon: <Clock className="w-4 h-4 text-orange-500" />, bg: 'bg-orange-50' },
    { label: 'Confirmed', count: 18, icon: <CheckCircle2 className="w-4 h-4 text-orange-500" />, bg: 'bg-orange-50' },
    { label: 'Preparing', count: 25, icon: <ChefHat className="w-4 h-4 text-blue-500" />, bg: 'bg-blue-50' },
    { label: 'Ready', count: 10, icon: <ShoppingBag className="w-4 h-4 text-purple-500" />, bg: 'bg-purple-50' },
    { label: 'Out for Delivery', count: 8, icon: <Bike className="w-4 h-4 text-green-500" />, bg: 'bg-green-50' },
    { label: 'Delivered', count: 86, icon: <CheckCircle className="w-4 h-4 text-green-600" />, bg: 'bg-green-100' },
    { label: 'Cancelled', count: 5, icon: <XCircle className="w-4 h-4 text-red-500" />, bg: 'bg-red-50' },
  ];

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-gray-800">Order Summary</h2>
        <select className="text-xs bg-gray-50 border-none rounded-md px-2 py-1 text-gray-600 outline-none cursor-pointer font-medium">
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
        </select>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div className="space-y-4 mt-2">
          {summaryItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${item.bg}`}>
                  {item.icon}
                </div>
                <span className="text-sm font-semibold text-gray-700">{item.label}</span>
              </div>
              <span className="text-sm font-bold text-gray-900">{item.count}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-sm font-bold text-gray-800">Total Orders</span>
          <span className="text-sm font-bold text-[#E85D21]">164</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
