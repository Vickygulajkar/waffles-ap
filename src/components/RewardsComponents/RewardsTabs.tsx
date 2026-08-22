import React, { useState } from 'react';

const RewardsTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Points History');
  const tabs = ['Points History', 'Redeem Requests', 'Reward Settings', 'Tiers & Benefits'];

  return (
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
  );
};

export default RewardsTabs;
