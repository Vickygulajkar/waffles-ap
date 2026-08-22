import React, { useState } from 'react';
import DataTable from '../common/DataTable';
import type { Column } from '../common/DataTable';
import { Search, ChevronDown, Filter, Download, ChevronLeft, ChevronRight } from 'lucide-react';

interface Activity {
  id: string;
  customerName: string;
  customerPhone: string;
  avatar: string;
  avatarColor: string;
  activityType: string;
  activityDesc: string;
  orderId: string;
  points: number;
  status: 'Credited' | 'Redeemed' | 'Expired';
  date: string;
}

const mockActivities: Activity[] = [
  { id: '1', customerName: 'Riya Sharma', customerPhone: '9876543210', avatar: 'RS', avatarColor: 'bg-red-50 text-red-500', activityType: 'Points Earned', activityDesc: 'On Order', orderId: '#WN12567', points: 120, status: 'Credited', date: '21 Sep 2025, 10:30 AM' },
  { id: '2', customerName: 'Aman Kumar', customerPhone: '9123456780', avatar: 'AK', avatarColor: 'bg-purple-50 text-purple-500', activityType: 'Points Redeemed', activityDesc: 'Redeemed on Order', orderId: '#WN12525', points: -100, status: 'Redeemed', date: '20 Sep 2025, 07:45 PM' },
  { id: '3', customerName: 'Pooja Singh', customerPhone: '9988776655', avatar: 'PS', avatarColor: 'bg-green-50 text-green-500', activityType: 'Points Earned', activityDesc: 'On Order', orderId: '#WN12520', points: 80, status: 'Credited', date: '20 Sep 2025, 01:20 PM' },
  { id: '4', customerName: 'Neha Deshmukh', customerPhone: '9871122334', avatar: 'ND', avatarColor: 'bg-yellow-50 text-yellow-600', activityType: 'Welcome Bonus', activityDesc: 'Signup Bonus', orderId: '-', points: 50, status: 'Credited', date: '19 Sep 2025, 11:15 AM' },
  { id: '5', customerName: 'Vivek Kumar', customerPhone: '8822334455', avatar: 'VK', avatarColor: 'bg-pink-50 text-pink-500', activityType: 'Points Earned', activityDesc: 'On Order', orderId: '#WN12495', points: 150, status: 'Credited', date: '18 Sep 2025, 08:10 PM' },
  { id: '6', customerName: 'Sneha Kapoor', customerPhone: '9712345678', avatar: 'SK', avatarColor: 'bg-blue-50 text-blue-500', activityType: 'Points Expired', activityDesc: 'Expired', orderId: '-', points: -60, status: 'Expired', date: '18 Sep 2025, 01:00 AM' },
  { id: '7', customerName: 'Mohit Joshi', customerPhone: '9090909090', avatar: 'MJ', avatarColor: 'bg-purple-50 text-purple-500', activityType: 'Points Earned', activityDesc: 'On Order', orderId: '#WN12450', points: 200, status: 'Credited', date: '17 Sep 2025, 09:30 PM' },
  { id: '8', customerName: 'Divya Thakur', customerPhone: '9876501234', avatar: 'DT', avatarColor: 'bg-yellow-50 text-yellow-600', activityType: 'Points Redeemed', activityDesc: 'Redeemed on Order', orderId: '#WN12425', points: -150, status: 'Redeemed', date: '17 Sep 2025, 03:40 PM' },
];

const PointsHistoryTable: React.FC = () => {
  const [activities] = useState<Activity[]>(mockActivities);

  const getActivityBadgeColor = (type: string) => {
    switch (type) {
      case 'Points Earned': return 'bg-green-50 text-green-600';
      case 'Points Redeemed': return 'bg-orange-50 text-orange-600';
      case 'Welcome Bonus': return 'bg-blue-50 text-blue-600';
      case 'Points Expired': return 'bg-red-50 text-red-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Credited': return 'bg-green-50 text-green-600';
      case 'Redeemed': return 'text-orange-500'; // According to screenshot it's just text
      case 'Expired': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const columns: Column<Activity>[] = [
    {
      header: 'Customer',
      cell: (item) => (
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${item.avatarColor}`}>
            {item.avatar}
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{item.customerName}</p>
            <p className="text-xs text-gray-500">{item.customerPhone}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Activity Type',
      cell: (item) => (
        <div className="flex flex-col items-start gap-1">
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${getActivityBadgeColor(item.activityType)}`}>
            {item.activityType}
          </span>
          <span className="text-xs text-gray-500">{item.activityDesc}</span>
        </div>
      ),
    },
    {
      header: 'Order ID',
      accessorKey: 'orderId',
      cellClassName: 'font-semibold text-gray-800 text-xs',
    },
    {
      header: 'Points',
      cell: (item) => (
        <span className={`text-sm font-bold ${item.points > 0 ? 'text-green-500' : 'text-red-500'}`}>
          {item.points > 0 ? '+' : ''}{item.points}
        </span>
      ),
    },
    {
      header: 'Status',
      cell: (item) => (
        <span className={`text-xs font-semibold ${item.status === 'Credited' ? 'px-2 py-0.5 rounded-full bg-green-50 text-green-600' : getStatusColor(item.status)}`}>
          {item.status}
        </span>
      ),
    },
    {
      header: 'Date & Time',
      accessorKey: 'date',
      cellClassName: 'font-semibold text-gray-800 text-xs',
    },
  ];

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by customer name, phone or order ID..." 
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E85D21]/20 focus:border-[#E85D21] transition-all"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Status</label>
            <div className="relative">
              <select className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#E85D21]/20 focus:border-[#E85D21] bg-white min-w-[130px]">
                <option>All Status</option>
                <option>Credited</option>
                <option>Redeemed</option>
                <option>Expired</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Activity Type</label>
            <div className="relative">
              <select className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#E85D21]/20 focus:border-[#E85D21] bg-white min-w-[130px]">
                <option>All Types</option>
                <option>Points Earned</option>
                <option>Points Redeemed</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>

          <button className="mt-5 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          
          <button className="mt-5 ml-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
        <DataTable 
          columns={columns} 
          data={activities} 
          keyExtractor={(item) => item.id} 
        />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">
          Showing 1 to 8 of 124 activities
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
            16
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

export default PointsHistoryTable;
