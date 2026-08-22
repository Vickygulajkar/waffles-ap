import React from 'react';
import { ChefHat, CheckCircle2, Bike, CheckCircle, XCircle } from 'lucide-react';
import DataTable, { type Column } from '../common/DataTable';

type Order = {
  id: string;
  customer: string;
  items: string;
  amount: string;
  payment: string;
  status: string;
  time: string;
};

const RecentOrders: React.FC = () => {
  const orders: Order[] = [
    { id: '#10345', customer: 'Vivek Sharma', items: 'Nutella Overload, KitKat Waffle', amount: '₹473', payment: 'Paid', status: 'Preparing', time: '10:30 AM' },
    { id: '#10344', customer: 'Rahul Verma', items: 'Red Velvet Waffle', amount: '₹289', payment: 'Paid', status: 'Confirmed', time: '10:18 AM' },
    { id: '#10343', customer: 'Sneha Patil', items: 'Chocolate Blast, Cold Coffee', amount: '₹358', payment: 'Paid', status: 'Out for Delivery', time: '10:05 AM' },
    { id: '#10342', customer: 'Amit Singh', items: 'Classic Butter Waffle', amount: '₹149', payment: 'Paid', status: 'Delivered', time: '09:52 AM' },
    { id: '#10341', customer: 'Priya Mehta', items: 'KitKat Waffle', amount: '₹189', payment: 'Failed', status: 'Cancelled', time: '09:41 AM' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Preparing':
        return <span className="flex items-center w-fit gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-500 text-xs font-semibold"><ChefHat className="w-3.5 h-3.5" /> Preparing</span>;
      case 'Confirmed':
        return <span className="flex items-center w-fit gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 text-orange-500 text-xs font-semibold"><CheckCircle2 className="w-3.5 h-3.5" /> Confirmed</span>;
      case 'Out for Delivery':
        return <span className="flex items-center w-fit gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 text-purple-500 text-xs font-semibold"><Bike className="w-3.5 h-3.5" /> Out for Delivery</span>;
      case 'Delivered':
        return <span className="flex items-center w-fit gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-600 text-xs font-semibold"><CheckCircle className="w-3.5 h-3.5" /> Delivered</span>;
      case 'Cancelled':
        return <span className="flex items-center w-fit gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-500 text-xs font-semibold"><XCircle className="w-3.5 h-3.5" /> Cancelled</span>;
      default:
        return <span>{status}</span>;
    }
  };

  const getPaymentBadge = (payment: string) => {
    if (payment === 'Paid') {
      return <span className="text-green-500 bg-green-50 px-2 py-0.5 rounded text-xs font-bold w-fit block">{payment}</span>;
    }
    return <span className="text-red-500 bg-red-50 px-2 py-0.5 rounded text-xs font-bold w-fit block">{payment}</span>;
  };

  const columns: Column<Order>[] = [
    { header: 'Order ID', cell: (item) => <span className="text-sm font-semibold text-gray-600">{item.id}</span>, headerClassName: 'text-gray-500' },
    { header: 'Customer', cell: (item) => <span className="text-sm font-bold text-gray-800">{item.customer}</span>, headerClassName: 'text-gray-500' },
    { header: 'Items', cell: (item) => <span className="text-sm font-medium text-gray-600 truncate max-w-[200px] block">{item.items}</span>, headerClassName: 'text-gray-500' },
    { header: 'Amount', cell: (item) => <span className="text-sm font-bold text-gray-800">{item.amount}</span>, headerClassName: 'text-gray-500' },
    { header: 'Payment', cell: (item) => getPaymentBadge(item.payment), headerClassName: 'text-gray-500' },
    { header: 'Status', cell: (item) => getStatusBadge(item.status), headerClassName: 'text-gray-500' },
    { header: 'Time', cell: (item) => <span className="text-sm font-semibold text-gray-600">{item.time}</span>, headerClassName: 'text-gray-500' },
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
