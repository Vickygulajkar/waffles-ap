import React from 'react';
import { X, ChevronDown, Calendar as CalendarIcon } from 'lucide-react';

const OfferDetails: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full sticky top-6">
      {/* Header */}
      <div className="p-5 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800">Add New Offer</h2>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-5 flex-1 overflow-y-auto space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">
            Offer Type <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select className="w-full appearance-none bg-white border border-gray-200 text-gray-800 py-2 pl-3 pr-8 rounded-lg outline-none focus:border-[#E85D21] focus:ring-1 focus:ring-[#E85D21] text-sm font-medium cursor-pointer">
              <option>Select offer type</option>
              <option>Buy X Get Y</option>
              <option>Flat Discount</option>
              <option>Free Delivery</option>
              <option>Percentage</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">
            Offer Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter offer name"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#E85D21] focus:ring-1 focus:ring-[#E85D21] transition-all font-medium text-gray-800"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">
            Coupon Code (Optional)
          </label>
          <input
            type="text"
            placeholder="Enter code"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#E85D21] focus:ring-1 focus:ring-[#E85D21] transition-all font-medium text-gray-800"
          />
          <p className="text-[10px] text-gray-500 mt-1 font-medium">Leave empty for auto-generated code</p>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">
            Discount Type <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select className="w-full appearance-none bg-white border border-gray-200 text-gray-800 py-2 pl-3 pr-8 rounded-lg outline-none focus:border-[#E85D21] focus:ring-1 focus:ring-[#E85D21] text-sm font-medium cursor-pointer">
              <option>Select discount type</option>
              <option>Percentage</option>
              <option>Fixed Amount</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">
            Discount Value <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter discount value"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#E85D21] focus:ring-1 focus:ring-[#E85D21] transition-all font-medium text-gray-800"
          />
          <p className="text-[10px] text-gray-500 mt-1 font-medium">For percentage: enter value between 1-100</p>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">
            Minimum Order Value (Optional)
          </label>
          <input
            type="text"
            placeholder="Enter minimum order value"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#E85D21] focus:ring-1 focus:ring-[#E85D21] transition-all font-medium text-gray-800"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">
            Validity Period <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Start Date"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#E85D21] focus:ring-1 focus:ring-[#E85D21] transition-all font-medium text-gray-800"
              />
            </div>
            <span className="text-xs font-semibold text-gray-500">to</span>
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="End Date"
                className="w-full pl-3 pr-8 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#E85D21] focus:ring-1 focus:ring-[#E85D21] transition-all font-medium text-gray-800"
              />
              <CalendarIcon className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">
            Status
          </label>
          <div className="flex bg-gray-50 border border-gray-200 rounded-lg p-1">
            <button className="flex-1 py-1.5 bg-[#E85D21] text-white text-sm font-semibold rounded-md shadow-sm">
              Active
            </button>
            <button className="flex-1 py-1.5 text-gray-500 hover:text-gray-700 text-sm font-semibold rounded-md transition-colors border border-transparent hover:border-gray-200 hover:bg-white">
              Scheduled
            </button>
          </div>
        </div>

      </div>

      {/* Footer Actions */}
      <div className="p-5 border-t border-gray-100 flex gap-3">
        <button className="flex-1 py-2.5 border border-gray-200 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button className="flex-1 py-2.5 bg-[#E85D21] text-white text-sm font-bold rounded-lg hover:bg-[#d6511a] transition-colors">
          Create Offer
        </button>
      </div>
    </div>
  );
};

export default OfferDetails;
