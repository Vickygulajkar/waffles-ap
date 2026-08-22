import React, { useState } from 'react';
import { Search, Calendar, Filter, MoreHorizontal, ChefHat, CheckCircle2, Bike, CheckCircle, XCircle } from 'lucide-react';
import DataTable, { type Column } from '../common/DataTable';

type OrderItem = {
  id: string;
  customerInitial: string;
  customerName: string;
  customerPhone: string;
  items: string;
  amount: string;
  status: string;
  time: string;
  active?: boolean;
};

const OrdersList: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');
  
  const tabs = ['All', 'Pending', 'Confirmed', 'Preparing', 'Ready', 'Out for Delivery', 'Delivered', 'Cancelled'];

  const orders: OrderItem[] = [
    { id: '#10345', customerInitial: 'V', customerName: 'Vivek Sharma', customerPhone: '+91 98765 43210', items: '2 items', amount: '₹473', status: 'Preparing', time: '10:30 AM', active: true },
    { id: '#10344', customerInitial: 'R', customerName: 'Rahul Verma', customerPhone: '+91 98765 43211', items: '1 item', amount: '₹289', status: 'Confirmed', time: '10:18 AM' },
    { id: '#10343', customerInitial: 'S', customerName: 'Sneha Patil', customerPhone: '+91 98765 43212', items: '3 items', amount: '₹358', status: 'Out for Delivery', time: '10:05 AM' },
    { id: '#10342', customerInitial: 'A', customerName: 'Amit Singh', customerPhone: '+91 98765 43213', items: '1 item', amount: '₹149', status: 'Delivered', time: '09:52 AM' },
    { id: '#10341', customerInitial: 'P', customerName: 'Priya Mehta', customerPhone: '+91 98765 43214', items: '2 items', amount: '₹189', status: 'Cancelled', time: '09:41 AM' },
    { id: '#10340', customerInitial: 'K', customerName: 'Karan Joshi', customerPhone: '+91 98765 43215', items: '1 item', amount: '₹320', status: 'Delivered', time: '09:20 AM' },
    { id: '#10339', customerInitial: 'N', customerName: 'Neha Kulkarni', customerPhone: '+91 98765 43216', items: '4 items', amount: '₹612', status: 'Delivered', time: '09:15 AM' },
    { id: '#10338', customerInitial: 'A', customerName: 'Akash Yadav', customerPhone: '+91 98765 43217', items: '2 items', amount: '₹398', status: 'Confirmed', time: '09:05 AM' },
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

  const getAvatarColor = (name: string) => {
    const colors = ['bg-orange-100 text-orange-600', 'bg-blue-100 text-blue-600', 'bg-green-100 text-green-600', 'bg-purple-100 text-purple-600', 'bg-pink-100 text-pink-600'];
    // Simple hash to consistently pick a color based on name length
    const index = name.length % colors.length;
    return colors[index];
  };

  const columns: Column<OrderItem>[] = [
    { header: 'Order ID', cell: (item) => <span className="text-sm font-semibold text-gray-800">{item.id}</span> },
    { 
      header: 'Customer', 
      cell: (item) => (
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${getAvatarColor(item.customerName)}`}>
            {item.customerInitial}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-800">{item.customerName}</p>
            <p className="text-xs text-gray-500">{item.customerPhone}</p>
          </div>
        </div>
      )
    },
    { header: 'Items', cell: (item) => <span className="text-sm font-medium text-gray-600">{item.items}</span> },
    { header: 'Amount', cell: (item) => <span className="text-sm font-bold text-gray-800">{item.amount}</span> },
    { header: 'Status', cell: (item) => getStatusBadge(item.status) },
    { header: 'Time', cell: (item) => <span className="text-sm font-semibold text-gray-600">{item.time}</span> },
    { 
      header: 'Action', 
      cell: () => (
        <button className="text-gray-400 hover:text-gray-600 transition-colors p-1">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      ),
      headerClassName: 'text-center',
      cellClassName: 'text-center'
    },
  ];

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">All Orders (1,248)</h2>
        <button className="flex items-center gap-2 px-4 py-2 border border-[#E85D21] text-[#E85D21] text-sm font-semibold rounded-lg hover:bg-orange-50 transition-colors">
          <span className="text-lg leading-none">+</span> Export
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
              activeTab === tab
                ? 'bg-[#E85D21] text-white border-[#E85D21]'
                : 'bg-white text-gray-600 border-gray-200 hover:border-[#E85D21] hover:text-[#E85D21]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Order ID, customer name or phone..."
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#E85D21] focus:ring-1 focus:ring-[#E85D21] transition-all"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors w-full md:w-auto justify-center">
            <Calendar className="w-4 h-4" />
            20 Aug - 21 Aug
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors w-full md:w-auto justify-center">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      <DataTable 
        columns={columns}
        data={orders}
        keyExtractor={(item) => item.id}
        selectable={true}
        rowClassName={(item) => (item.active ? 'bg-orange-50/50 border-orange-200 cursor-pointer' : 'cursor-pointer')}
        minWidth="800px"
      />

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
        <span className="text-sm text-gray-500">Showing 1-8 of 1,248 orders</span>
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50">&lt;</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#E85D21] text-white font-medium">1</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50">2</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50">3</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50">4</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50">5</button>
          <span className="w-8 h-8 flex items-center justify-center text-gray-500">...</span>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50">156</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50">&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default OrdersList;
