import React from 'react';
import { X, BellRing } from 'lucide-react';
import type { Customer } from './CustomersTable';

interface CustomerProfilePaneProps {
  customer: Customer | null;
  onClose: () => void;
}

const CustomerProfilePane: React.FC<CustomerProfilePaneProps> = ({ customer, onClose }) => {
  if (!customer) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full max-h-[850px] relative">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="p-6 overflow-y-auto scrollbar-hide">
        {/* Header Profile */}
        <div className="flex gap-4 mb-6">
          {customer.avatarImage ? (
            <img src={customer.avatarImage} alt={customer.name} className="w-14 h-14 rounded-full object-cover shrink-0" />
          ) : (
            <div className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold shrink-0 bg-blue-50 text-blue-500`}>
              {customer.avatar}
            </div>
          )}
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-base font-bold text-gray-900">{customer.name}</h2>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-green-600">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Active
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">{customer.email}</p>
            <p className="text-xs text-gray-500">{customer.phone}</p>
            <p className="text-[10px] text-gray-400 mt-2">Joined on {customer.joinDate}, 10:30 AM</p>
          </div>
        </div>

        {/* 3 Stats */}
        <div className="grid grid-cols-3 gap-2 mb-8 text-center border-t border-b border-gray-100 py-4">
          <div>
            <p className="text-lg font-bold text-gray-900">{customer.orders}</p>
            <p className="text-[10px] text-gray-500">Total Orders</p>
          </div>
          <div className="border-l border-r border-gray-100">
            <p className="text-lg font-bold text-gray-900">{customer.totalSpent}</p>
            <p className="text-[10px] text-gray-500">Total Spent</p>
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900">{customer.points}</p>
            <p className="text-[10px] text-gray-500">Points</p>
          </div>
        </div>

        {/* Customer Information */}
        <div className="mb-8">
          <h3 className="text-xs font-bold text-gray-900 mb-4">Customer Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-xs text-gray-500">Phone</span>
              <span className="text-xs font-semibold text-gray-800">{customer.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-500">Email</span>
              <span className="text-xs font-semibold text-gray-800">{customer.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-500">Date of Birth</span>
              <span className="text-xs font-semibold text-gray-800">12 Jan 1996</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-500">City</span>
              <span className="text-xs font-semibold text-gray-800">Pune</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-500">Address</span>
              <span className="text-xs font-semibold text-gray-800 text-right w-48">Kharadi, Pune, Maharashtra - 411014</span>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-bold text-gray-900">Recent Orders</h3>
            <a href="#" className="text-[10px] font-semibold text-[#E85D21] hover:underline">View All</a>
          </div>
          <div className="space-y-3">
            {[
              { id: '#ORD12568', date: '21 Aug 2025', amt: '₹320', status: 'Delivered' },
              { id: '#ORD12510', date: '18 Aug 2025', amt: '₹450', status: 'Delivered' },
              { id: '#ORD12450', date: '15 Aug 2025', amt: '₹280', status: 'Delivered' },
            ].map((order, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-xs font-semibold text-gray-800 w-16">{order.id}</span>
                <span className="text-[10px] text-gray-500">{order.date}</span>
                <span className="text-xs font-bold text-gray-900 w-12 text-right">{order.amt}</span>
                <span className="text-[10px] font-semibold bg-green-50 text-green-600 px-2 py-0.5 rounded-full">
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Loyalty Information */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-bold text-gray-900">Loyalty Information</h3>
            <a href="#" className="text-[10px] font-semibold text-[#E85D21] hover:underline">View Details</a>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-xs text-gray-500">Total Points</span>
              <span className="text-xs font-bold text-gray-800">{customer.points}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-500">Points Redeemed</span>
              <span className="text-xs font-bold text-gray-800">1,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-500">Points Expiring Soon</span>
              <span className="text-xs font-bold text-gray-800">120 (on 10 Sep 2025)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 border-t border-gray-100 flex gap-3 mt-auto bg-white">
        <button className="flex-1 py-2 border border-orange-200 text-[#E85D21] rounded-lg text-xs font-bold hover:bg-orange-50 transition-colors flex items-center justify-center gap-1.5">
          <BellRing className="w-3.5 h-3.5" />
          Send Notification
        </button>
        <button className="flex-1 py-2 bg-[#E85D21] hover:bg-[#D9551E] text-white rounded-lg text-xs font-bold transition-colors">
          View Full Profile
        </button>
      </div>
    </div>
  );
};

export default CustomerProfilePane;
