import React from 'react';
import { Coins, Plus, Edit } from 'lucide-react';

const LoyaltySummary: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      <h3 className="text-sm font-bold text-gray-800 mb-4">Loyalty Program Summary</h3>
      
      <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex items-start gap-4 mb-5">
        <div className="mt-1">
          <Coins className="w-6 h-6 text-orange-500" />
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-700">Earn Points on every order</p>
          <p className="text-sm font-bold text-gray-900 mt-1">1 Point = ₹1</p>
        </div>
      </div>
      
      <ul className="space-y-3 mb-6">
        <li className="flex items-start gap-2">
          <Plus className="w-3.5 h-3.5 text-orange-500 mt-0.5 shrink-0" />
          <span className="text-xs font-medium text-gray-600">100 Points = ₹100 Discount</span>
        </li>
        <li className="flex items-start gap-2">
          <Plus className="w-3.5 h-3.5 text-orange-500 mt-0.5 shrink-0" />
          <span className="text-xs font-medium text-gray-600">Minimum redeemable: 100 Points</span>
        </li>
        <li className="flex items-start gap-2">
          <Plus className="w-3.5 h-3.5 text-orange-500 mt-0.5 shrink-0" />
          <span className="text-xs font-medium text-gray-600">Points valid for 12 months</span>
        </li>
      </ul>
      
      <button className="w-full bg-[#E85D21] hover:bg-[#D9551E] text-white py-2.5 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2">
        <Edit className="w-4 h-4" />
        Edit Program Settings
      </button>
    </div>
  );
};

export default LoyaltySummary;
