import React from 'react';
import { ChevronDown, Calendar, Filter } from 'lucide-react';

const ReportsFilters: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-4 mb-6 items-end">
      {/* Date Range */}
      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">&nbsp;</label>
        <div className="relative">
          <input 
            type="text" 
            defaultValue="21 Aug 2025 - 21 Sep 2025"
            className="pl-4 pr-10 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#E85D21]/20 focus:border-[#E85D21] bg-white w-[220px]"
          />
          <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Compare to */}
      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Compare to</label>
        <div className="relative">
          <select className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#E85D21]/20 focus:border-[#E85D21] bg-white min-w-[200px]">
            <option>21 Jul 2025 - 20 Aug 2025</option>
            <option>Previous Year</option>
            <option>Custom Range</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>
      </div>

      {/* Group By */}
      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Group By</label>
        <div className="relative">
          <select className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#E85D21]/20 focus:border-[#E85D21] bg-white min-w-[140px]">
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>
      </div>

      {/* Outlets */}
      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Outlets</label>
        <div className="relative">
          <select className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#E85D21]/20 focus:border-[#E85D21] bg-white min-w-[160px]">
            <option>All Outlets</option>
            <option>Pune Center</option>
            <option>Mumbai Hub</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>
      </div>

      {/* Filters Button */}
      <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-gray-50 transition-colors h-[38px]">
        <Filter className="w-4 h-4" />
        Filters
      </button>
    </div>
  );
};

export default ReportsFilters;
