import React from 'react';
import { ChefHat, CheckCircle2, Bike, CheckCircle, XCircle } from 'lucide-react';
import DataTable, { type Column } from '../common/DataTable';

import { type RecentOrderData } from '../../services/dashboardService';

interface RecentOrdersProps {
  orders: RecentOrderData[];
}

const RecentOrders: React.FC<RecentOrdersProps> = ({ orders }) => {

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending_payment':
        return <span className="flex items-center w-fit gap-1.5 px-2.5 py-1 rounded-full bg-yellow-50 text-yellow-600 text-xs font-semibold">Pending Payment</span>;
      case 'confirmed':
        return <span className="flex items-center w-fit gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 text-orange-500 text-xs font-semibold"><CheckCircle2 className="w-3.5 h-3.5" /> Confirmed</span>;
      case 'preparing':
        return <span className="flex items-center w-fit gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-500 text-xs font-semibold"><ChefHat className="w-3.5 h-3.5" /> Preparing</span>;
      case 'ready':
        return <span className="flex items-center w-fit gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-500 text-xs font-semibold">Ready</span>;
      case 'completed':
        return <span className="flex items-center w-fit gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-600 text-xs font-semibold"><CheckCircle className="w-3.5 h-3.5" /> Completed</span>;
      case 'cancelled':
        return <span className="flex items-center w-fit gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-500 text-xs font-semibold"><XCircle className="w-3.5 h-3.5" /> Cancelled</span>;
      default:
        return <span className="flex items-center w-fit gap-1.5 px-2.5 py-1 rounded-full bg-gray-50 text-gray-600 text-xs font-semibold">{status}</span>;
    }
  };

  const getPaymentBadge = (payment: string) => {
    if (payment.toLowerCase() === 'captured' || payment.toLowerCase() === 'paid') {
      return <span className="text-green-500 bg-green-50 px-2 py-0.5 rounded text-xs font-bold w-fit block">Paid</span>;
    }
    return <span className="text-red-500 bg-red-50 px-2 py-0.5 rounded text-xs font-bold w-fit block">{payment}</span>;
  };

  const columns: Column<RecentOrderData>[] = [
    { header: 'Order ID', cell: (item) => <span className="text-sm font-semibold text-gray-600">#{item.id.substring(0, 8)}</span>, headerClassName: 'text-gray-500' },
    { header: 'Customer', cell: (item) => <span className="text-sm font-bold text-gray-800">{item.customer}</span>, headerClassName: 'text-gray-500' },
    { header: 'Items', cell: (item) => <span className="text-sm font-medium text-gray-600 truncate max-w-[200px] block">{item.items}</span>, headerClassName: 'text-gray-500' },
    { header: 'Amount', cell: (item) => <span className="text-sm font-bold text-gray-800">₹{item.amount}</span>, headerClassName: 'text-gray-500' },
    { header: 'Payment', cell: (item) => getPaymentBadge(item.payment), headerClassName: 'text-gray-500' },
    { header: 'Status', cell: (item) => getStatusBadge(item.status), headerClassName: 'text-gray-500' },
    { header: 'Time', cell: (item) => <span className="text-sm font-semibold text-gray-600">{new Date(item.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>, headerClassName: 'text-gray-500' },
    { 
      header: 'Action', 
      cell: () => (
        <button className="text-xs font-bold text-[#E85D21] border border-[#E85D21] rounded px-3 py-1 hover:bg-orange-50 transition-colors">
          View
        </button>
      ),
      headerClassName: 'text-gray-500 text-center',
      cellClassName: 'text-center'
    },
  ];

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-gray-800">Recent Orders</h2>
        <button className="text-sm font-semibold text-[#E85D21] hover:underline">
          View All
        </button>
      </div>

      <DataTable 
        columns={columns} 
        data={orders} 
        keyExtractor={(item) => item.id} 
        minWidth="100%" 
      />
    </div>
  );
};

export default RecentOrders;
