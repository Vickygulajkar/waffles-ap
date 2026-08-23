import React from 'react';
import DataTable from '../common/DataTable';
import type { Column } from '../common/DataTable';
import { Search, ChevronDown, Filter, ChevronLeft, ChevronRight, Pencil, MoreVertical, Plus, ArrowUp, ArrowDown } from 'lucide-react';

import type { Banner } from '../../services/bannerService';

interface BannersTableProps {
  banners?: Banner[];
  pagination?: {
    currentPage: number;
    limit: number;
    totalBanners: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  filters?: {
    search: string;
    bannerType: string;
    status: string;
  };
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  onFilterChange?: (key: string, value: string) => void;
  onAddBanner: () => void;
  onEditBanner?: (banner: Banner) => void;
}

const BannersTable: React.FC<BannersTableProps> = ({
  banners = [],
  pagination,
  filters,
  onPageChange,
  onLimitChange,
  onFilterChange,
  onAddBanner,
  onEditBanner
}) => {
  const filterVals = filters || { search: '', bannerType: 'All Types', status: 'All Status' };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-green-600 bg-green-500';
      case 'Scheduled': return 'text-yellow-600 bg-yellow-500';
      case 'Expired': return 'text-gray-500 bg-gray-400';
      default: return 'text-gray-500 bg-gray-400';
    }
  };

  const columns: Column<Banner>[] = [
    {
      header: 'Banner',
      cell: (item) => (
        <div className="flex items-center gap-3">
          <img src={item.image} alt={item.title} className="w-12 h-12 rounded-lg object-cover shrink-0 border border-gray-100 shadow-sm" />
          <div>
            <p className="font-bold text-gray-900 text-xs hover:text-[#E85D21] transition-colors cursor-pointer" onClick={() => onEditBanner && onEditBanner(item)}>{item.title}</p>
            <p className="text-[10px] text-gray-500 mt-0.5">{item.subtitle}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Type',
      cell: (item) => (
        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-50 text-[#E85D21] capitalize">
          {item.bannerType || 'Carousel'}
        </span>
      ),
    },
    {
      header: 'Position',
      cell: () => (
        <span className="font-semibold text-gray-800 text-xs">
          Home Carousel
        </span>
      ),
    },
    {
      header: 'Status',
      cell: (item) => {
        const statusText = item.isActive ? 'Active' : 'Inactive';
        const [textColor, dotColor] = getStatusColor(statusText).split(' ');
        return (
          <span className={`inline-flex items-center gap-1.5 text-xs font-bold ${textColor}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
            {statusText}
          </span>
        );
      },
    },
    {
      header: 'Publish Date',
      cell: (item) => {
        const dateObj = new Date(item.createdAt);
        return (
          <div>
            <p className="text-xs font-bold text-gray-800">{dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
            <p className="text-[10px] text-gray-500">{dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
        );
      },
    },
    {
      header: 'End Date',
      cell: (item) => {
        if (!item.endDate) return <span className="text-xs font-bold text-gray-400">N/A</span>;
        const dateObj = new Date(item.endDate);
        return (
          <div>
            <p className="text-xs font-bold text-gray-800">{dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
            <p className="text-[10px] text-gray-500">{dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
        );
      }
    },
    {
      header: 'Priority',
      cell: (item) => (
        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800">
          {(item.sortOrder || 1) <= 3 ? (
            <ArrowUp className="w-3.5 h-3.5 text-[#E85D21]" />
          ) : (
            <ArrowDown className="w-3.5 h-3.5 text-[#E85D21]" />
          )}
          {item.sortOrder || 1}
        </div>
      ),
    },
    {
      header: 'Actions',
      cell: (item) => (
        <div className="flex items-center gap-1">
          <button
            className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors"
            onClick={() => onEditBanner && onEditBanner(item)}
          >
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
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
      {/* Top Bar: Search & Filters */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            value={filterVals.search}
            onChange={(e) => onFilterChange?.('search', e.target.value)}
            placeholder="Search banner title..." 
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#E85D21] focus:ring-1 focus:ring-[#E85D21] transition-all"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <span className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-gray-500 font-medium">Banner Type</span>
            <select 
              value={filterVals.bannerType}
              onChange={(e) => onFilterChange?.('bannerType', e.target.value)}
              className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 pl-3 pr-8 rounded-lg outline-none focus:border-[#E85D21] text-sm font-semibold cursor-pointer h-[38px] min-w-[130px]"
            >
              <option>All Types</option>
              <option>Carousel</option>
              <option>Offer</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative">
            <span className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-gray-500 font-medium">Status</span>
            <select 
              value={filterVals.status}
              onChange={(e) => onFilterChange?.('status', e.target.value)}
              className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 pl-3 pr-8 rounded-lg outline-none focus:border-[#E85D21] text-sm font-semibold cursor-pointer h-[38px] min-w-[120px]"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Scheduled</option>
              <option>Inactive</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors h-[38px]">
            <Filter className="w-4 h-4" /> Filters
          </button>
          
          <button 
            onClick={onAddBanner}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-[#E85D21] text-white text-sm font-semibold rounded-lg hover:bg-[#d6511a] transition-colors h-[38px] shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add Banner
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <DataTable 
          columns={columns} 
          data={banners} 
          keyExtractor={(item) => item._id}
          minWidth="900px"
        />
      </div>
      {/* Pagination */}
      {pagination && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
          <span className="text-sm text-gray-500">
            Showing {banners.length === 0 ? 0 : (pagination.currentPage - 1) * pagination.limit + 1} to {Math.min(pagination.currentPage * pagination.limit, pagination.totalBanners)} of {pagination.totalBanners} banners
          </span>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <button 
                onClick={() => onPageChange?.(pagination.currentPage - 1)}
                disabled={!pagination.hasPreviousPage}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
                <button 
                  key={page}
                  onClick={() => onPageChange?.(page)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg font-medium ${pagination.currentPage === page ? 'bg-[#E85D21] text-white' : 'border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                >
                  {page}
                </button>
              ))}

              <button 
                onClick={() => onPageChange?.(pagination.currentPage + 1)}
                disabled={!pagination.hasNextPage}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="relative">
              <select 
                value={pagination.limit}
                onChange={(e) => onLimitChange?.(Number(e.target.value))}
                className="appearance-none bg-white border border-gray-200 text-gray-700 py-1.5 pl-3 pr-8 rounded-lg outline-none focus:border-[#E85D21] text-sm font-medium cursor-pointer"
              >
                <option value="10">10 / page</option>
                <option value="20">20 / page</option>
                <option value="50">50 / page</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannersTable;
