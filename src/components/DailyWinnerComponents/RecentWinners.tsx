import React from 'react';

const RecentWinners: React.FC = () => {
  const winners = [
    { date: '20 Aug', name: 'Vivek Sharma', orderId: '#10332', amount: '₹280' },
    { date: '19 Aug', name: 'Sneha Patil', orderId: '#10315', amount: '₹350' },
    { date: '18 Aug', name: 'Rahul Verma', orderId: '#10308', amount: '₹299' },
    { date: '17 Aug', name: 'Priya Mehta', orderId: '#10296', amount: '₹410' },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-bold text-gray-800">Recent Winners</h3>
        <a href="#" className="text-xs font-semibold text-[#E85D21] hover:underline">
          View All
        </a>
      </div>
      
      <div className="space-y-4">
        {winners.map((winner, index) => (
          <div key={index} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <span className="text-gray-500 w-10 font-medium">{winner.date}</span>
              <span className="font-semibold text-gray-800 w-24 truncate">{winner.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-400 font-medium">{winner.orderId}</span>
              <span className="font-bold text-gray-900 w-8 text-right">{winner.amount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentWinners;
