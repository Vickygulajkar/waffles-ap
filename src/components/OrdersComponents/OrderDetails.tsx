import React from 'react';
import { ChefHat, Phone, MapPin, ChevronDown } from 'lucide-react';

const OrderDetails: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full sticky top-6">
      {/* Header */}
      <div className="p-5 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">Order Details</h2>
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-600 text-sm font-semibold">
          <ChefHat className="w-4 h-4" /> Preparing
        </span>
      </div>

      <div className="p-5 flex-1 overflow-y-auto">
        {/* Customer Info */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex gap-3">
              <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xl flex-shrink-0">
                V
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">Vivek Sharma</h3>
                <div className="flex items-center gap-1.5 text-gray-500 text-sm mt-0.5">
                  <Phone className="w-3.5 h-3.5" /> +91 98765 43210
                </div>
              </div>
            </div>
            <button className="px-3 py-1.5 border border-[#E85D21] text-[#E85D21] text-xs font-bold rounded-lg hover:bg-orange-50 transition-colors">
              View Profile
            </button>
          </div>
          <div className="flex gap-2 text-gray-500 text-sm bg-gray-50 p-3 rounded-xl">
            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p className="leading-tight">101, Sunshine Apartments,<br/>Kharadi, Pune - 411014</p>
          </div>
        </div>

        {/* Order Info Row */}
        <div className="flex items-center justify-between border-y border-gray-100 py-4 mb-6">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-semibold mb-1">Order ID</span>
            <span className="text-sm font-bold text-gray-800">#10345</span>
          </div>
          <div className="w-px h-8 bg-gray-200"></div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-semibold mb-1">Order Date</span>
            <span className="text-sm font-bold text-gray-800">21 Aug 2026</span>
          </div>
          <div className="w-px h-8 bg-gray-200"></div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-semibold mb-1">Order Time</span>
            <span className="text-sm font-bold text-gray-800">10:30 AM</span>
          </div>
        </div>

        {/* Items */}
        <h3 className="font-bold text-gray-800 mb-4">Items (2)</h3>
        <div className="space-y-4 mb-6">
          <div className="flex gap-3">
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
              <img src="https://placehold.co/100x100?text=Waffle+1" alt="Nutella Overload" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <h4 className="font-bold text-sm text-gray-800">Nutella Overload</h4>
                <div className="text-right">
                  <span className="font-bold text-sm text-gray-800 block">₹199</span>
                  <span className="text-xs text-gray-500 font-medium">x 1</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Regular Size</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
              <img src="https://placehold.co/100x100?text=Waffle+2" alt="Red Velvet Waffle" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <h4 className="font-bold text-sm text-gray-800">Red Velvet Waffle</h4>
                <div className="text-right">
                  <span className="font-bold text-sm text-gray-800 block">₹249</span>
                  <span className="text-xs text-gray-500 font-medium">x 1</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Regular Size<br/>+ Extra Chocolate</p>
            </div>
          </div>
        </div>

        {/* Breakdown */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 font-medium">Item Total</span>
            <span className="font-bold text-gray-800">₹448</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 font-medium">Delivery Fee</span>
            <span className="font-bold text-gray-800">₹30</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 font-medium">Discount</span>
            <span className="font-bold text-green-500">- ₹5</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center bg-orange-50 p-4 rounded-xl mb-6">
          <span className="font-bold text-gray-800">Total Amount</span>
          <span className="font-bold text-xl text-gray-900">₹473</span>
        </div>

        {/* Update Status */}
        <div className="border-t border-gray-100 pt-5">
          <h3 className="font-bold text-gray-800 mb-3">Update Order Status</h3>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <select className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-2.5 pl-10 pr-8 rounded-lg outline-none focus:border-[#E85D21] text-sm font-semibold cursor-pointer">
                <option>Preparing</option>
                <option>Ready</option>
                <option>Out for Delivery</option>
                <option>Delivered</option>
              </select>
              <ChefHat className="w-4 h-4 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <button className="bg-[#E85D21] hover:bg-[#d6511a] text-white font-bold py-2.5 px-4 rounded-lg transition-colors flex items-center gap-2 flex-shrink-0 text-sm">
              Update Status
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderDetails;
