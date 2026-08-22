import React, { useState } from 'react';
import { Search, Filter, Plus, Edit2, MoreVertical, ChevronDown, Calendar as CalendarIcon } from 'lucide-react';
import DataTable, { type Column } from '../common/DataTable';

type Offer = {
  id: string;
  name: string;
  subtext: string;
  type: string;
  code: string;
  discount: string;
  validity: string;
  status: string;
  used: number;
  image: string;
};

const OffersList: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All Offers');
  const tabs = ['All Offers', 'Active', 'Scheduled', 'Expired', 'Coupons'];

  const offers: Offer[] = [
    { id: '1', name: 'Buy 2 Waffles Get 1 Topping FREE', subtext: 'Buy X Get Y', type: 'Buy X Get Y', code: 'B2G1TOP', discount: 'Get 1 Topping FREE', validity: '20 Aug 2025\n- 31 Aug 2025', status: 'Active', used: 287, image: 'https://placehold.co/100x100?text=Waffle' },
    { id: '2', name: 'Flat 20% OFF', subtext: 'Flat Discount', type: 'Flat', code: 'WAFFLE20', discount: '20% OFF', validity: '15 Aug 2025\n- 25 Aug 2025', status: 'Active', used: 536, image: 'https://placehold.co/100x100?text=%' },
    { id: '3', name: 'Free Delivery', subtext: 'Free Delivery', type: 'Free Delivery', code: 'FREESHIP', discount: 'Free Delivery', validity: '10 Aug 2025\n- 20 Aug 2025', status: 'Active', used: 412, image: 'https://placehold.co/100x100?text=Truck' },
    { id: '4', name: 'Birthday Special', subtext: 'Flat Discount', type: 'Flat', code: 'BIRTHDAY50', discount: '₹50 OFF', validity: '01 Aug 2025\n- 31 Aug 2025', status: 'Active', used: 98, image: 'https://placehold.co/100x100?text=Cake' },
    { id: '5', name: 'First Order Offer', subtext: 'Percentage Discount', type: 'Percentage', code: 'WELCOME10', discount: '10% OFF', validity: '01 Aug 2025\n- 31 Aug 2025', status: 'Active', used: 309, image: 'https://placehold.co/100x100?text=Ticket' },
    { id: '6', name: 'Weekend Bonanza', subtext: 'Flat Discount', type: 'Flat', code: 'WEEKEND30', discount: '₹30 OFF', validity: 'Every Sat - Sun', status: 'Scheduled', used: 0, image: 'https://placehold.co/100x100?text=Calendar' },
    { id: '7', name: 'Monsoon Special', subtext: 'Percentage Discount', type: 'Percentage', code: 'MONSOON15', discount: '15% OFF', validity: '01 Jul 2025\n- 31 Jul 2025', status: 'Expired', used: 200, image: 'https://placehold.co/100x100?text=Clock' },
  ];

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'Buy X Get Y':
        return <span className="text-orange-500 bg-orange-50 px-2.5 py-1 rounded-full text-xs font-semibold">{type}</span>;
      case 'Flat':
        return <span className="text-yellow-600 bg-yellow-50 px-2.5 py-1 rounded-full text-xs font-semibold">{type}</span>;
      case 'Free Delivery':
        return <span className="text-purple-500 bg-purple-50 px-2.5 py-1 rounded-full text-xs font-semibold">{type}</span>;
      case 'Percentage':
        return <span className="text-blue-500 bg-blue-50 px-2.5 py-1 rounded-full text-xs font-semibold">{type}</span>;
      default:
        return <span>{type}</span>;
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === 'Active') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-600 text-xs font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> {status}
        </span>
      );
    }
    if (status === 'Scheduled') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-50 text-yellow-600 text-xs font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span> {status}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-semibold">
        <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span> {status}
      </span>
    );
  };

  const columns: Column<Offer>[] = [
    {
      header: 'Offer Name',
      cell: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-800">{item.name}</p>
            <p className="text-xs text-gray-400 font-medium">{item.subtext}</p>
          </div>
        </div>
      )
    },
    { header: 'Offer Type', cell: (item) => getTypeBadge(item.type) },
    { header: 'Code', cell: (item) => <span className="text-sm font-bold text-gray-800">{item.code}</span> },
    { header: 'Discount', cell: (item) => <span className="text-sm font-medium text-gray-800">{item.discount}</span> },
    { 
      header: 'Validity', 
      cell: (item) => (
        <span className="text-sm font-medium text-gray-600 whitespace-pre-line">{item.validity}</span>
      )
    },
    { header: 'Status', cell: (item) => getStatusBadge(item.status) },
    { header: 'Used', cell: (item) => <span className="text-sm font-bold text-gray-800">{item.used}</span> },
    {
      header: 'Actions',
      cell: () => (
        <div className="flex items-center justify-center gap-2">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
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
            className={`pb-3 text-sm font-bold transition-colors border-b-2 ${
              activeTab === tab
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
            placeholder="Search offers or coupon code..."
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#E85D21] focus:ring-1 focus:ring-[#E85D21] transition-all"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <span className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-gray-500 font-medium">Offer Type</span>
            <select className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 pl-3 pr-8 rounded-lg outline-none focus:border-[#E85D21] text-sm font-semibold cursor-pointer h-[38px] min-w-[130px]">
              <option>All Types</option>
              <option>Buy X Get Y</option>
              <option>Flat Discount</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative">
            <span className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-gray-500 font-medium">Status</span>
            <select className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 pl-3 pr-8 rounded-lg outline-none focus:border-[#E85D21] text-sm font-semibold cursor-pointer h-[38px] min-w-[120px]">
              <option>All Status</option>
              <option>Active</option>
              <option>Scheduled</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative">
            <span className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-gray-500 font-medium">Date Range</span>
            <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 py-2 px-3 rounded-lg outline-none hover:border-[#E85D21] transition-colors text-sm font-semibold h-[38px]">
              21 Aug 2025 - 21 Aug 2025
              <CalendarIcon className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors h-[38px]">
            <Filter className="w-4 h-4" /> Filters
          </button>
          
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[#E85D21] text-white text-sm font-semibold rounded-lg hover:bg-[#d6511a] transition-colors h-[38px]">
            <Plus className="w-4 h-4" /> Add Offer
          </button>
        </div>
      </div>

      <DataTable 
        columns={columns}
        data={offers}
        keyExtractor={(item) => item.id}
        minWidth="1000px"
      />

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
        <span className="text-sm text-gray-500">Showing 1 to 7 of 24 offers</span>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50">&lt;</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#E85D21] text-white font-medium">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50">3</button>
            <span className="w-8 h-8 flex items-center justify-center text-gray-500">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50">&gt;</button>
          </div>
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-200 text-gray-700 py-1.5 pl-3 pr-8 rounded-lg outline-none focus:border-[#E85D21] text-sm font-medium cursor-pointer">
              <option>10 / page</option>
              <option>20 / page</option>
              <option>50 / page</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffersList;
