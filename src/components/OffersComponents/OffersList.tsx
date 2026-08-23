import React, { useState } from 'react';
import { Search, Filter, Plus, Edit2, MoreVertical, ChevronDown } from 'lucide-react';
import DataTable, { type Column } from '../common/DataTable';
import type { Offer } from '../../services/offerService';

interface OffersListProps {
  offers?: Offer[];
  pagination?: {
    currentPage: number;
    limit: number;
    totalOffers: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  filters?: {
    search: string;
    offerType: string;
    status: string;
    startDate: string;
    endDate: string;
  };
  onFilterChange?: (key: string, value: string) => void;
  onAddOfferClick?: () => void;
  onEditOfferClick?: (offer: Offer) => void;
}

const OffersList: React.FC<OffersListProps> = ({ 
  offers = [], 
  pagination,
  filters,
  onPageChange,
  onLimitChange,
  onFilterChange,
  onAddOfferClick, 
  onEditOfferClick 
}) => {
  const filterVals = filters || { search: '', offerType: 'All Types', status: 'All Status', startDate: '', endDate: '' };
  const [activeTab, setActiveTab] = useState('All Offers');
  const tabs = ['All Offers'];

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'buy_get':
        return <span className="text-orange-500 bg-orange-50 px-2.5 py-1 rounded-full text-xs font-semibold">Buy X Get Y</span>;
      case 'discount':
        return <span className="text-yellow-600 bg-yellow-50 px-2.5 py-1 rounded-full text-xs font-semibold">Discount</span>;
      case 'flat':
        return <span className="text-purple-500 bg-purple-50 px-2.5 py-1 rounded-full text-xs font-semibold">Flat</span>;
      case 'percentage':
        return <span className="text-blue-500 bg-blue-50 px-2.5 py-1 rounded-full text-xs font-semibold">Percentage</span>;
      default:
        return <span className="text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full text-xs font-semibold capitalize">{type?.replace('_', ' ')}</span>;
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-600 text-xs font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Active
        </span>
      );
    }
    if (status === 'scheduled') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-50 text-yellow-600 text-xs font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span> Scheduled
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-semibold capitalize">
        <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span> {status}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const getDiscountText = (item: Offer) => {
    if (item.discountType === 'percentage') return `${item.discountValue}% OFF`;
    if (item.discountType === 'fixed_amount') return `₹${item.discountValue} OFF`;
    if (item.discountType === 'buy_get') return `Buy ${item.buyQuantity} Get ${item.getQuantity} FREE`;
    return 'Special Offer';
  };

  const getSubText = (item: Offer) => {
    if (item.discountType === 'percentage') return 'Percentage Discount';
    if (item.discountType === 'fixed_amount') return 'Flat Discount';
    if (item.discountType === 'buy_get') return 'Buy X Get Y';
    return item.offerType;
  };

  const columns: Column<Offer>[] = [
    {
      header: 'Offer Name',
      cell: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
            <img src={item.image || 'https://placehold.co/100x100?text=Offer'} alt={item.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-800">{item.name}</p>
            <p className="text-xs text-gray-400 font-medium capitalize">{getSubText(item)}</p>
          </div>
        </div>
      )
    },
    { header: 'Offer Type', cell: (item) => getTypeBadge(item.offerType) },
    { header: 'Code', cell: (item) => <span className="text-sm font-bold text-gray-800">{item.couponCode}</span> },
    { header: 'Discount', cell: (item) => <span className="text-sm font-medium text-gray-800">{getDiscountText(item)}</span> },
    {
      header: 'Validity',
      cell: (item) => (
        <span className="text-sm font-medium text-gray-600 whitespace-pre-line">
          {formatDate(item.startDate)}
          {item.endDate && `\n- ${formatDate(item.endDate)}`}
        </span>
      )
    },
    { header: 'Status', cell: (item) => getStatusBadge(item.status) },
    { header: 'Used', cell: (item) => <span className="text-sm font-bold text-gray-800">{item.usageCount || 0}</span> },
    {
      header: 'Actions',
      cell: (item) => (
        <div className="flex items-center justify-center gap-2">
          <button onClick={() => onEditOfferClick?.(item)} className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
            <Edit2 className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      ),
      headerClassName: 'text-center',
      cellClassName: 'text-center'
    }
  ];

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-6 mb-6 border-b border-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-bold transition-colors border-b-2 ${activeTab === tab
              ? 'border-[#E85D21] text-[#E85D21]'
              : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Top Bar: Search & Filters */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={filterVals.search}
            onChange={(e) => onFilterChange?.('search', e.target.value)}
            placeholder="Search offers or coupon code..."
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#E85D21] focus:ring-1 focus:ring-[#E85D21] transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <span className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-gray-500 font-medium">Offer Type</span>
            <select 
              value={filterVals.offerType}
              onChange={(e) => onFilterChange?.('offerType', e.target.value)}
              className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 pl-3 pr-8 rounded-lg outline-none focus:border-[#E85D21] text-sm font-semibold cursor-pointer h-[38px] min-w-[130px]"
            >
              <option>All Types</option>
              <option>Buy X Get Y</option>
              <option>Flat Discount</option>
              <option>Percentage</option>
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

          <div className="relative flex items-center bg-white border border-gray-200 rounded-lg px-2 h-[38px]">
            <span className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-gray-500 font-medium">Date Range</span>
            <input 
              type="date" 
              value={filterVals.startDate}
              onChange={(e) => onFilterChange?.('startDate', e.target.value)}
              className="text-xs text-gray-700 font-medium outline-none bg-transparent cursor-pointer"
            />
            <span className="text-gray-400 text-xs mx-1">to</span>
            <input 
              type="date" 
              value={filterVals.endDate}
              onChange={(e) => onFilterChange?.('endDate', e.target.value)}
              className="text-xs text-gray-700 font-medium outline-none bg-transparent cursor-pointer"
            />
          </div>

          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors h-[38px]">
            <Filter className="w-4 h-4" /> Filters
          </button>

          <button onClick={onAddOfferClick} className="flex items-center justify-center gap-2 px-4 py-2 bg-[#E85D21] text-white text-sm font-semibold rounded-lg hover:bg-[#d6511a] transition-colors h-[38px]">
            <Plus className="w-4 h-4" /> Add Offer
          </button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={offers}
        keyExtractor={(item) => item._id}
        minWidth="1000px"
      />

      {/* Pagination */}
      {pagination && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
          <span className="text-sm text-gray-500">
            Showing {offers.length === 0 ? 0 : (pagination.currentPage - 1) * pagination.limit + 1} to {Math.min(pagination.currentPage * pagination.limit, pagination.totalOffers)} of {pagination.totalOffers} offers
          </span>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <button
                onClick={() => onPageChange?.(pagination.currentPage - 1)}
                disabled={!pagination.hasPreviousPage}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                &lt;
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
                &gt;
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

export default OffersList;
