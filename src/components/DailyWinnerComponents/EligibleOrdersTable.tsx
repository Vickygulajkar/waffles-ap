import React, { useState } from 'react';
import DataTable from '../common/DataTable';
import type { Column } from '../common/DataTable';
import { Search, ChevronDown, RefreshCw, Trophy } from 'lucide-react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { dailyWinnerService } from '../../services/dailyWinnerService';

export interface EligibleOrder {
  _id: string;
  ticketId: string;
  date: string;
  status: string;
  isWinner: boolean;
  scratched: boolean;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  order: {
    _id: string;
    orderNumber: string;
    totalAmount: number;
    createdAt: string;
    orderStatus: string;
    paymentStatus: string;
  };
  createdAt: string;
}

interface EligibleOrdersTableProps {
  orders?: EligibleOrder[];
  loading?: boolean;
  onRefresh?: () => void;
}

const EligibleOrdersTable: React.FC<EligibleOrdersTableProps> = ({ orders = [], loading, onRefresh }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders.filter(o =>
    o.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.order?.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.ticketId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name?.substring(0, 2).toUpperCase() || 'W';
  };

  const columns: Column<EligibleOrder>[] = [
    {
      header: 'Ticket ID',
      cell: (order) => order.ticketId,
      cellClassName: 'font-semibold text-gray-900',
    },
    {
      header: 'Customer',
      cell: (order) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-xs font-bold text-orange-600 shrink-0">
            {getInitials(order.user.name)}
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{order.user.name}</p>
            <p className="text-xs text-gray-500">{order.user.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Date',
      cell: (order) => (
        <span className="text-gray-700 font-medium text-sm">
          {new Date(order.date).toLocaleDateString()}
        </span>
      ),
    },
    {
      header: 'Order Amount',
      cell: (order) => `₹${order.order.totalAmount}`,
      cellClassName: 'font-semibold text-gray-900',
    },
    {
      header: 'Status',
      cell: (order) => (
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
          order.order.orderStatus === 'completed' || order.order.orderStatus === 'confirmed' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-700'
        }`}>
          {order.order.orderStatus.charAt(0).toUpperCase() + order.order.orderStatus.slice(1)}
        </span>
      ),
    },
    {
      header: 'Action',
      cell: (order) => (
        order.isWinner ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-lg whitespace-nowrap shadow-sm border border-yellow-200">
            <Trophy className="w-3.5 h-3.5" />
            Winner
          </span>
        ) : (
          <button 
            className="px-3 py-1.5 bg-[#E85D21] text-white text-xs font-semibold rounded-lg shadow-sm hover:bg-[#d0531e] transition-colors whitespace-nowrap"
            onClick={async () => {
              const result = await Swal.fire({
                title: 'Are you sure?',
                text: `You want to reveal winner for order #${order.order.orderNumber}?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#E85D21',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, reveal it!'
              });
              
              if (result.isConfirmed) {
                try {
                  const res = await dailyWinnerService.makeWinner(order._id);
                  if (res.success) {
                    toast.success('Winner revealed successfully!');
                    if (onRefresh) onRefresh();
                  } else {
                    toast.error(res.message || 'Failed to reveal winner');
                  }
                } catch (error: any) {
                  toast.error(error.response?.data?.message || 'Error revealing winner');
                }
              }
            }}
          >
            Reveal Winner
          </button>
        )
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Eligible Orders</h2>
        </div>
        <p className="text-sm font-semibold text-gray-500">Total Eligible: {orders.length}</p>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by ticket ID, order ID, or customer name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E85D21]/20 focus:border-[#E85D21] transition-all"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Sort By</label>
            <div className="relative">
              <select className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#E85D21]/20 focus:border-[#E85D21] bg-white min-w-[140px]">
                <option>Newest First</option>
                <option>Oldest First</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>

          <button onClick={onRefresh} className="mt-5 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-gray-50 transition-colors">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
        <DataTable
          columns={columns}
          data={filteredOrders}
          keyExtractor={(order) => order._id}
        />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">
          Showing {filteredOrders.length} of {orders.length} orders
        </p>
      </div>
    </div>
  );
};

export default EligibleOrdersTable;
