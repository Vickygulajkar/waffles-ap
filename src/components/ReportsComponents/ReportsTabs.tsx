import React, { useState } from 'react';

const ReportsTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const tabs = ['Overview', 'Sales', 'Orders', 'Products', 'Customers', 'Rewards', 'Daily Winner', 'Offers & Coupons'];

  return (
    <div className="flex space-x-6 border-b border-gray-200 mb-6 overflow-x-auto scrollbar-hide">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`pb-4 text-sm font-semibold transition-colors relative whitespace-nowrap ${
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

export default ReportsTabs;
