import React from 'react';
import { BellRing } from 'lucide-react';

const PointsExpiring: React.FC = () => {
  const members = [
    { name: 'Aman Kumar', expiry: 'Expire on 25 Sep 2025', points: '100 pts', avatar: 'AK' },
    { name: 'Sneha Kapoor', expiry: 'Expire on 27 Sep 2025', points: '60 pts', avatar: 'SK' },
    { name: 'Mohit Joshi', expiry: 'Expire on 30 Sep 2025', points: '45 pts', avatar: 'MJ' },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-bold text-gray-800">Points Expiring Soon</h3>
        <a href="#" className="text-xs font-semibold text-[#E85D21] hover:underline">
          View All
        </a>
      </div>
      
      <div className="space-y-5 mb-6">
        {members.map((member, index) => (
          <div key={index} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-600 shrink-0">
                {member.avatar}
              </div>
              <div>
                <p className="font-semibold text-gray-800 mb-0.5">{member.name}</p>
                <p className="text-[10px] text-gray-500">{member.expiry}</p>
              </div>
            </div>
            <span className="text-gray-500 font-medium">{member.points}</span>
          </div>
        ))}
      </div>
      
      <button className="w-full border border-orange-200 text-[#E85D21] hover:bg-orange-50 py-2.5 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2">
        <BellRing className="w-4 h-4" />
        Send Reminder to Members
      </button>
    </div>
  );
};

export default PointsExpiring;
