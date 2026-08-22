import React from 'react';
import DataTable from '../common/DataTable';
import type { Column } from '../common/DataTable';
import { Search, ChevronDown, Filter, Download, ChevronLeft, ChevronRight, Eye, Pencil, MoreVertical, Loader2 } from 'lucide-react';
import type { Pagination } from '../../services/productService';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  avatarImage?: string; // Optional image URL
  orders: number;
  totalSpent: string;
  points: string;
  joinDate: string;
  status: 'Active' | 'Inactive';
}

interface CustomersTableProps {
  customers: Customer[];
  isLoading: boolean;
  pagination: Pagination | null;
  filters: { search: string; page: number; limit: number };
  onFilterChange: (filters: Partial<{ search: string; page: number; limit: number }>) => void;
  onSelectCustomer?: (customer: Customer) => void;
}

const CustomersTable: React.FC<CustomersTableProps> = ({
  customers,
  isLoading,
  pagination,
  filters,
  onFilterChange,
  onSelectCustomer
}) => {

  const getAvatarColor = (name: string) => {
    const colors = ['bg-blue-50 text-blue-500', 'bg-yellow-50 text-yellow-600', 'bg-pink-50 text-pink-500', 'bg-purple-50 text-purple-500', 'bg-green-50 text-green-500'];
    return colors[name.length % colors.length];
  };

  const columns: Column<Customer>[] = [
    {
      header: 'Customer',
      cell: (item) => (
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => onSelectCustomer && onSelectCustomer(item)}
        >
          {item.avatarImage ? (
            <img src={item.avatarImage} alt={item.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
          ) : (
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${getAvatarColor(item.name)}`}>
              {item.avatar}
            </div>
          )}
          <div>
            <p className="font-semibold text-gray-900 text-sm hover:text-[#E85D21] transition-colors">{item.name}</p>
            <p className="text-[10px] text-gray-500">{item.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Phone',
      accessorKey: 'phone',
      cellClassName: 'text-gray-600 font-medium text-xs',
    },
    {
      header: 'Orders',
      accessorKey: 'orders',
      cellClassName: 'font-semibold text-gray-900',
    },
    {
      header: 'Total Spent',
      accessorKey: 'totalSpent',
      cellClassName: 'font-semibold text-gray-900',
    },
    {
      header: 'Points',
      accessorKey: 'points',
      cellClassName: 'font-semibold text-gray-900',
    },
    {
      header: 'Join Date',
      accessorKey: 'joinDate',
      cellClassName: 'text-gray-600 font-medium text-xs',
    },
    {
      header: 'Status',
      cell: (item) => (
        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${item.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
          }`}>
          <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`} />
          {item.status}
        </span>
      ),
    },
    {
      header: 'Actions',
      cell: (item) => (
        <div className="flex items-center gap-1">
          <button
            className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors"
            onClick={() => onSelectCustomer && onSelectCustomer(item)}
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors">
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors">
            <MoreVertical className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email or phone..."
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E85D21]/20 focus:border-[#E85D21] transition-all"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <select className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#E85D21]/20 focus:border-[#E85D21] bg-white min-w-[130px]">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>

          <div className="relative">
            <select className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#E85D21]/20 focus:border-[#E85D21] bg-white min-w-[130px]">
              <option>All Cities</option>
              <option>Mumbai</option>
              <option>Pune</option>
              <option>Delhi</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>

          <div className="relative">
            <select className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#E85D21]/20 focus:border-[#E85D21] bg-white min-w-[130px]">
              <option>Join Date</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>

          <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            Filters
          </button>

          <button className="ml-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6 relative min-h-[400px]">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
            <Loader2 className="w-8 h-8 text-[#E85D21] animate-spin" />
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={customers}
            keyExtractor={(item) => item.id}
            selectable={true}
          />
        )}
      </div>

      {pagination && (
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-500">
            Showing {((pagination.currentPage - 1) * pagination.limit) + (customers.length > 0 ? 1 : 0)} to {((pagination.currentPage - 1) * pagination.limit) + customers.length} of {(pagination as any).totalUsers || pagination.totalProducts} customers
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onFilterChange({ page: pagination.currentPage - 1 })}
              disabled={!pagination.hasPreviousPage}
              className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: pagination.totalPages }).map((_, idx) => {
              const page = idx + 1;
              if (
                page === 1 ||
                page === pagination.totalPages ||
                (page >= pagination.currentPage - 1 && page <= pagination.currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => onFilterChange({ page })}
                    className={`w-8 h-8 flex items-center justify-center rounded border font-semibold text-sm ${page === pagination.currentPage
                        ? 'border-[#E85D21] text-[#E85D21]'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                  >
                    {page}
                  </button>
                );
              }

              if (
                (page === 2 && pagination.currentPage > 3) ||
                (page === pagination.totalPages - 1 && pagination.currentPage < pagination.totalPages - 2)
              ) {
                return <span key={page} className="text-gray-400 mx-1">...</span>;
              }
              return null;
            })}

            <button
              onClick={() => onFilterChange({ page: pagination.currentPage + 1 })}
              disabled={!pagination.hasNextPage}
              className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <div className="relative ml-4">
              <select
                value={filters.limit || 10}
                onChange={(e) => onFilterChange({ limit: Number(e.target.value), page: 1 })}
                className="appearance-none pl-3 pr-8 py-1.5 border border-gray-200 rounded text-sm font-medium focus:outline-none focus:border-[#E85D21] bg-white text-gray-600 cursor-pointer"
              >
                <option value={10}>Records Per Page 10 </option>
                <option value={20}>Records Per Page 20 </option>
                <option value={50}>Records Per Page 50 </option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomersTable;
