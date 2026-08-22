import React from 'react';

const TopMembers: React.FC = () => {
  const members = [
    { rank: 1, name: 'Riya Sharma', points: '2,350 pts', avatar: 'RS' },
    { rank: 2, name: 'Aman Kumar', points: '1,980 pts', avatar: 'AK' },
    { rank: 3, name: 'Pooja Singh', points: '1,650 pts', avatar: 'PS' },
    { rank: 4, name: 'Neha Deshmukh', points: '1,420 pts', avatar: 'ND' },
    { rank: 5, name: 'Vivek Kumar', points: '1,250 pts', avatar: 'VK' },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-bold text-gray-800">Top Members (By Points)</h3>
        <a href="#" className="text-xs font-semibold text-[#E85D21] hover:underline">
          View All
        </a>
      </div>
      
      <div className="space-y-4">
        {members.map((member) => (
          <div key={member.rank} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <span className="text-gray-400 w-4 font-bold">{member.rank}</span>
              <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-[10px] font-bold text-orange-600 shrink-0">
                {member.avatar}
              </div>
              <span className="font-semibold text-gray-800">{member.name}</span>
            </div>
            <span className="text-gray-500 font-medium">{member.points}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopMembers;
