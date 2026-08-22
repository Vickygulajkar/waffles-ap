import React from 'react';
import { Gift } from 'lucide-react';

const RewardDetails: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      <h3 className="text-sm font-bold text-gray-800 mb-4">Reward Details</h3>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-[#E85D21] shrink-0">
            <Gift className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Reward Value</p>
            <p className="text-xl font-bold text-gray-900">₹320</p>
            <p className="text-[10px] text-gray-400 mt-0.5">(Default Reward)</p>
          </div>
        </div>
        
        <button className="px-4 py-1.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
          Edit
        </button>
      </div>
    </div>
  );
};

export default RewardDetails;
