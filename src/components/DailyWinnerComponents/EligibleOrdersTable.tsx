import React, { useState } from 'react';
import DataTable from '../common/DataTable';
import type { Column } from '../common/DataTable';
import { Search, ChevronDown, RefreshCw, Trophy, Truck, ShoppingBag, Check } from 'lucide-react';

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  avatar: string;
  items: string[];
  orderValue: string;
  time: string;
  deliveryType: 'Delivery' | 'Pickup';
  status: string;
  included: boolean;
}

const mockOrders: Order[] = [
  { id: '#10345', customerName: 'Vivek Sharma', customerPhone: '9876543210', avatar: 'VS', items: ['Nutella Waffle', 'KitKat Waffle', '+2 more'], orderValue: '₹473', time: '10:30 AM', deliveryType: 'Delivery', status: 'Completed', included: true },
  { id: '#10344', customerName: 'Sneha Patil', customerPhone: '9876543211', avatar: 'SP', items: ['Red Velvet Waffle', 'Chocolate Shake'], orderValue: '₹320', time: '10:18 AM', deliveryType: 'Pickup', status: 'Completed', included: false },
  { id: '#10343', customerName: 'Rahul Verma', customerPhone: '9876543212', avatar: 'RV', items: ['Chocolate Blast Waffle', 'Cold Coffee'], orderValue: '₹358', time: '09:55 AM', deliveryType: 'Delivery', status: 'Completed', included: false },
  { id: '#10342', customerName: 'Priya Mehta', customerPhone: '9876543213', avatar: 'PM', items: ['Classic Butter Waffle'], orderValue: '₹289', time: '09:40 AM', deliveryType: 'Delivery', status: 'Completed', included: false },
  { id: '#10341', customerName: 'Amit Singh', customerPhone: '9876543214', avatar: 'AS', items: ['KitKat Waffle', 'Ice Cream'], orderValue: '₹410', time: '09:25 AM', deliveryType: 'Pickup', status: 'Completed', included: false },
  { id: '#10340', customerName: 'Kavya Joshi', customerPhone: '9876543215', avatar: 'KJ', items: ['Nutella Overload', 'Strawberry Shake'], orderValue: '₹489', time: '09:10 AM', deliveryType: 'Delivery', status: 'Completed', included: false },
  { id: '#10339', customerName: 'Rohan Gupta', customerPhone: '9876543216', avatar: 'RG', items: ['Red Velvet Waffle'], orderValue: '₹299', time: '08:55 AM', deliveryType: 'Delivery', status: 'Completed', included: false },
  { id: '#10338', customerName: 'Manish Yadav', customerPhone: '9876543217', avatar: 'MY', items: ['Chocolate Waffle', 'Cold Coffee'], orderValue: '₹325', time: '08:40 AM', deliveryType: 'Pickup', status: 'Completed', included: false },
];

const EligibleOrdersTable: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const toggleInclude = (id: string) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, included: !order.included } : order
    ));
  };

  const columns: Column<Order>[] = [
    {
      header: 'Order ID',
      accessorKey: 'id',
      cellClassName: 'font-semibold text-gray-900',
    },
    {
      header: 'Customer',
      cell: (order) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-xs font-bold text-orange-600 shrink-0">
            {order.avatar}
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{order.customerName}</p>
            <p className="text-xs text-gray-500">{order.customerPhone}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Items',
      cell: (order) => (
        <div className="flex flex-col gap-0.5">
          {order.items.map((item, i) => (
            <span key={i} className={`text-xs ${i === order.items.length - 1 && item.startsWith('+') ? 'text-gray-400 font-medium' : 'text-gray-700 font-medium'}`}>
              {item}
            </span>
          ))}
        </div>
      ),
    },
    {
      header: 'Order Value',
      accessorKey: 'orderValue',
      cellClassName: 'font-semibold text-gray-900',
    },
    {
      header: 'Time',
      accessorKey: 'time',
      cellClassName: 'text-gray-600 font-medium text-xs',
    },
    {
      header: 'Delivery Type',
      cell: (order) => (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
          order.deliveryType === 'Delivery' 
            ? 'bg-orange-50 text-[#E85D21]' 
            : 'bg-blue-50 text-blue-600'
        }`}>
          {order.deliveryType === 'Delivery' ? <Truck className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
          {order.deliveryType}
        </span>
      ),
    },
    {
      header: 'Status',
      cell: (order) => (
        <span className="text-green-500 text-xs font-semibold">
          {order.status}
        </span>
      ),
    },
    {
      header: 'Include',
      cell: (order) => (
        <button 
          onClick={() => toggleInclude(order.id)}
          className={`w-5 h-5 rounded flex items-center justify-center transition-colors border ${
            order.included 
              ? 'bg-[#E85D21] border-[#E85D21] text-white' 
              : 'border-gray-300 hover:border-[#E85D21]'
          }`}
        >
          {order.included && <Check className="w-3.5 h-3.5" />}
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Eligible Orders for Today (21 Aug 2025)</h2>
        </div>
        <p className="text-sm font-semibold text-gray-500">Total Eligible: 142 orders</p>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by order ID, customer name or phone..." 
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E85D21]/20 focus:border-[#E85D21] transition-all"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Min Order Value</label>
            <div className="relative">
              <select className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#E85D21]/20 focus:border-[#E85D21] bg-white min-w-[140px]">
                <option>All Orders</option>
                <option>₹100+</option>
                <option>₹200+</option>
                <option>₹500+</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Delivery Type</label>
            <div className="relative">
              <select className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#E85D21]/20 focus:border-[#E85D21] bg-white min-w-[140px]">
                <option>All Types</option>
                <option>Delivery</option>
                <option>Pickup</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>

          <button className="mt-5 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-gray-50 transition-colors">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
        <DataTable 
          columns={columns} 
          data={orders} 
          keyExtractor={(order) => order.id} 
          rowClassName={(order) => order.included ? 'bg-orange-50/50' : ''}
        />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">
          Showing 1 to 8 of 142 eligible orders
        </p>
        <button className="bg-[#E85D21] hover:bg-[#D9551E] text-white px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 shadow-md shadow-[#E85D21]/20 transition-colors">
          <Trophy className="w-4 h-4" />
          Select Winner
        </button>
      </div>
    </div>
  );
};

export default EligibleOrdersTable;
