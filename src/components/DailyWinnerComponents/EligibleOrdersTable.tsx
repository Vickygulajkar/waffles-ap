import React, { useState } from 'react';
import DataTable from '../common/DataTable';
import type { Column } from '../common/DataTable';
import { Search, ChevronDown, RefreshCw } from 'lucide-react';

interface Winner {
  _id: string;
  date: string;
  winnerName: string;
  orderNumber: number;
  orderDate: string;
  wonBackAmount: number;
  userId: {
    mobile: string;
    name: string;
    email: string;
  };
}

interface EligibleOrdersTableProps {
  winners?: Winner[];
  loading?: boolean;
  onRefresh?: () => void;
}

const EligibleOrdersTable: React.FC<EligibleOrdersTableProps> = ({ winners = [], loading, onRefresh }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredWinners = winners.filter(w =>
    w.winnerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    w.userId?.mobile?.includes(searchTerm) ||
    w.orderNumber?.toString().includes(searchTerm)
  );

  const getInitials = (name: string) => {
    return name?.substring(0, 2).toUpperCase() || 'W';
  };

  const columns: Column<Winner>[] = [
    {
      header: 'Order ID',
      cell: (winner) => `#${winner.orderNumber}`,
      cellClassName: 'font-semibold text-gray-900',
    },
    {
      header: 'Customer',
      cell: (winner) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-xs font-bold text-orange-600 shrink-0">
            {getInitials(winner.winnerName)}
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{winner.winnerName}</p>
            <p className="text-xs text-gray-500">{winner.userId?.mobile}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Date',
      cell: (winner) => (
        <span className="text-gray-700 font-medium text-sm">
          {new Date(winner.date).toLocaleDateString()}
        </span>
      ),
    },
    {
      header: 'Won Amount',
      cell: (winner) => `₹${winner.wonBackAmount}`,
      cellClassName: 'font-semibold text-green-600',
    },
    {
      header: 'Order Date',
      cell: (winner) => (
        <span className="text-gray-600 font-medium text-xs">
          {new Date(winner.orderDate).toLocaleString()}
        </span>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900">All Winners</h2>
        </div>
        <p className="text-sm font-semibold text-gray-500">Total Winners: {winners.length}</p>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by order ID, customer name or phone..."
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
          data={filteredWinners}
          keyExtractor={(winner) => winner._id}
        />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">
          Showing {filteredWinners.length} of {winners.length} winners
        </p>
      </div>
    </div>
  );
};

export default EligibleOrdersTable;
