import React, { useState, useEffect } from 'react';
import { Search, Calendar, Filter, MoreHorizontal, ChefHat, CheckCircle2, Bike, CheckCircle, XCircle } from 'lucide-react';
import DataTable, { type Column } from '../common/DataTable';
import { orderService, type Order } from '../../services/orderService';

type OrderItem = {
  id: string;
  _id: string;
  customerInitial: string;
  customerName: string;
  customerPhone: string;
  items: string;
  amount: string;
  status: string;
  time: string;
  active?: boolean;
};

interface OrdersListProps {
  onOrderSelect: (id: string) => void;
  selectedOrderId: string | null;
  refreshTrigger?: number;
}

const OrdersList: React.FC<OrdersListProps> = ({ onOrderSelect, selectedOrderId, refreshTrigger = 0 }) => {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchOrders();
  }, [currentPage, search, refreshTrigger]);

  const fetchOrders = async () => {
    try {
      const res = await orderService.getAllOrders(currentPage, 10, 'All', search);
      if (res.success && res.data) {
        setTotalOrders(res.data.pagination.totalOrders);
        setTotalPages(res.data.pagination.totalPages);
        
        const formattedOrders = res.data.orders.map((o: Order) => ({
          id: o.orderNumber.substring(0, 8), // shorten for display or use full
          _id: o._id,
          customerInitial: o.user?.name ? o.user.name.charAt(0).toUpperCase() : 'U',
          customerName: o.user?.name || 'Unknown',
          customerPhone: o.user?.email || 'N/A', // using email since phone isn't in user object
          items: `${o.items.length} item${o.items.length > 1 ? 's' : ''}`,
          amount: `₹${o.totalAmount}`,
          status: o.orderStatus,
          time: new Date(o.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          active: o._id === selectedOrderId
        }));
        
        setOrders(formattedOrders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

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
        <h2 className="text-xl font-bold text-gray-800">All Orders ({totalOrders})</h2>
        <button className="flex items-center gap-2 px-4 py-2 border border-[#E85D21] text-[#E85D21] text-sm font-semibold rounded-lg hover:bg-orange-50 transition-colors">
          <span className="text-lg leading-none">+</span> Export
        </button>
      </div>



      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Order ID, customer name or phone..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
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
        keyExtractor={(item) => item._id}
        selectable={true}
        onRowClick={(item) => onOrderSelect(item._id)}
        rowClassName={(item) => (item._id === selectedOrderId ? 'bg-orange-50/50 border-orange-200 cursor-pointer' : 'cursor-pointer')}
        minWidth="800px"
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
          <span className="text-sm text-gray-500">Showing {(currentPage - 1) * 10 + 1}-{Math.min(currentPage * 10, totalOrders)} of {totalOrders} orders</span>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >&lt;</button>
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg ${currentPage === idx + 1 ? 'bg-[#E85D21] text-white font-medium' : 'border border-gray-200 text-gray-700 font-medium hover:bg-gray-50'}`}
              >
                {idx + 1}
              </button>
            ))}
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >&gt;</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersList;
