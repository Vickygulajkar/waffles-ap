import React, { useState } from 'react';
import DataTable from '../common/DataTable';
import type { Column } from '../common/DataTable';
import { Search, ChevronDown, Filter, ChevronLeft, ChevronRight, Pencil, MoreVertical, Plus, ArrowUp, ArrowDown } from 'lucide-react';

export interface Banner {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  type: string;
  position: string;
  status: 'Active' | 'Scheduled' | 'Expired';
  publishDate: string;
  publishTime: string;
  endDate: string;
  endTime: string;
  priority: number;
}

const mockBanners: Banner[] = [
  { id: '1', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=100&h=100&fit=crop', title: 'Weekend Special - 20% OFF', subtitle: 'Enjoy 20% off on all waffles', type: 'Image', position: 'Home Carousel', status: 'Active', publishDate: '20 Aug 2025', publishTime: '10:00 AM', endDate: '27 Aug 2025', endTime: '11:59 PM', priority: 1 },
  { id: '2', image: 'https://images.unsplash.com/photo-1623428454614-abaf00244e52?w=100&h=100&fit=crop', title: 'Free Delivery', subtitle: 'On orders above ₹399', type: 'Image', position: 'Top Banner', status: 'Active', publishDate: '18 Aug 2025', publishTime: '09:00 AM', endDate: '25 Aug 2025', endTime: '11:59 PM', priority: 2 },
  { id: '3', image: 'https://images.unsplash.com/photo-1572490122747-3968b75bb8fc?w=100&h=100&fit=crop', title: 'New Shakes Arrived!', subtitle: 'Try our new range of shakes', type: 'Image', position: 'Home Carousel', status: 'Scheduled', publishDate: '22 Aug 2025', publishTime: '10:00 AM', endDate: '05 Sep 2025', endTime: '11:59 PM', priority: 3 },
  { id: '4', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop', title: 'Combo Offer', subtitle: 'Waffle + Shake @ ₹199', type: 'Image', position: 'Category Banner', status: 'Active', publishDate: '15 Aug 2025', publishTime: '08:00 AM', endDate: '31 Aug 2025', endTime: '11:59 PM', priority: 4 },
  { id: '5', image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=100&h=100&fit=crop', title: 'Earn Double Points', subtitle: 'On every order this week', type: 'Image', position: 'Bottom Banner', status: 'Expired', publishDate: '05 Aug 2025', publishTime: '10:00 AM', endDate: '12 Aug 2025', endTime: '11:59 PM', priority: 5 },
  { id: '6', image: 'https://images.unsplash.com/photo-1512152272829-e3139592d56f?w=100&h=100&fit=crop', title: 'Download Our App', subtitle: 'Better experience, more rewards', type: 'Image', position: 'Bottom Banner', status: 'Active', publishDate: '10 Aug 2025', publishTime: '10:00 AM', endDate: '30 Sep 2025', endTime: '11:59 PM', priority: 6 },
];

interface BannersTableProps {
  onAddBanner: () => void;
  onEditBanner?: (banner: Banner) => void;
}

const BannersTable: React.FC<BannersTableProps> = ({ onAddBanner, onEditBanner }) => {
  const [banners] = useState<Banner[]>(mockBanners);
  const [activeTab, setActiveTab] = useState('All Banners');
  const tabs = ['All Banners', 'Active', 'Scheduled', 'Expired / Inactive'];

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
        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-50 text-[#E85D21]">
          {item.type}
        </span>
      ),
    },
    {
      header: 'Position',
      accessorKey: 'position',
      cellClassName: 'font-semibold text-gray-800 text-xs',
    },
    {
      header: 'Status',
      cell: (item) => {
        const [textColor, dotColor] = getStatusColor(item.status).split(' ');
        return (
          <span className={`inline-flex items-center gap-1.5 text-xs font-bold ${textColor}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
            {item.status}
          </span>
        );
      },
    },
    {
      header: 'Publish Date',
      cell: (item) => (
        <div>
          <p className="text-xs font-bold text-gray-800">{item.publishDate}</p>
          <p className="text-[10px] text-gray-500">{item.publishTime}</p>
        </div>
      ),
    },
    {
      header: 'End Date',
      cell: (item) => (
        <div>
          <p className="text-xs font-bold text-gray-800">{item.endDate}</p>
          <p className="text-[10px] text-gray-500">{item.endTime}</p>
        </div>
      ),
    },
    {
      header: 'Priority',
      cell: (item) => (
        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800">
          {item.priority <= 3 ? (
            <ArrowUp className="w-3.5 h-3.5 text-[#E85D21]" />
          ) : (
            <ArrowDown className="w-3.5 h-3.5 text-[#E85D21]" />
          )}
          {item.priority}
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
    <div>
      <div className="flex space-x-8 border-b border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-sm font-semibold transition-colors relative ${
              activeTab === tab ? 'text-[#E85D21]' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E85D21] rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search banner title..." 
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E85D21]/20 focus:border-[#E85D21] transition-all"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Banner Type</label>
            <div className="relative">
              <select className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#E85D21]/20 focus:border-[#E85D21] bg-white min-w-[120px]">
                <option>All Types</option>
                <option>Image</option>
                <option>Video</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Status</label>
            <div className="relative">
              <select className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#E85D21]/20 focus:border-[#E85D21] bg-white min-w-[120px]">
                <option>All Status</option>
                <option>Active</option>
                <option>Scheduled</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Date Range</label>
            <div className="relative">
              <input 
                type="text"
                placeholder="Select date range"
                className="pl-4 pr-10 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#E85D21]/20 focus:border-[#E85D21] bg-white min-w-[140px]"
              />
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>

          <button className="mt-5 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          
          <button 
            onClick={onAddBanner}
            className="mt-5 ml-2 px-4 py-2 bg-[#E85D21] hover:bg-[#D9551E] text-white rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shadow-md shadow-[#E85D21]/20"
          >
            <Plus className="w-4 h-4" />
            Add Banner
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
        <DataTable 
          columns={columns} 
          data={banners} 
          keyExtractor={(item) => item.id}
          selectable={true}
        />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">
          Showing 1 to 6 of 24 banners
        </p>
        
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:bg-gray-50">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded border border-[#E85D21] text-[#E85D21] font-semibold text-sm">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold text-sm">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold text-sm">
            3
          </button>
          <span className="text-gray-400 mx-1">...</span>
          <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold text-sm">
            4
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50">
            <ChevronRight className="w-4 h-4" />
          </button>
          
          <div className="relative ml-4">
            <select className="appearance-none pl-3 pr-8 py-1.5 border border-gray-200 rounded text-sm font-medium focus:outline-none focus:border-[#E85D21] bg-white text-gray-600">
              <option>10 / page</option>
              <option>20 / page</option>
              <option>50 / page</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannersTable;
