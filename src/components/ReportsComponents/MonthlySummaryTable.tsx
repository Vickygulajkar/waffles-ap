import React from 'react';

const MonthlySummaryTable: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 overflow-x-auto">
      <h3 className="text-sm font-bold text-gray-800 mb-4">Monthly Summary (Trend)</h3>
      
      <table className="w-full text-left border-collapse min-w-[600px]">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="py-3 px-2 text-[10px] font-bold text-gray-800 uppercase">Month</th>
            <th className="py-3 px-2 text-[10px] font-bold text-gray-800 uppercase">Revenue</th>
            <th className="py-3 px-2 text-[10px] font-bold text-gray-800 uppercase">Orders</th>
            <th className="py-3 px-2 text-[10px] font-bold text-gray-800 uppercase">Avg Order Value</th>
            <th className="py-3 px-2 text-[10px] font-bold text-gray-800 uppercase text-center">New Customers</th>
            <th className="py-3 px-2 text-[10px] font-bold text-gray-800 uppercase text-center">Total Customers</th>
          </tr>
        </thead>
        <tbody className="text-xs font-semibold text-gray-800">
          <tr className="border-b border-gray-50">
            <td className="py-4 px-2">Aug 2025</td>
            <td className="py-4 px-2">₹3,42,580</td>
            <td className="py-4 px-2">1,428</td>
            <td className="py-4 px-2">₹240.15</td>
            <td className="py-4 px-2 text-center">156</td>
            <td className="py-4 px-2 text-center">2,456</td>
          </tr>
          <tr className="border-b border-gray-50">
            <td className="py-4 px-2 text-gray-500">Jul 2025</td>
            <td className="py-4 px-2 text-gray-500">₹2,89,020</td>
            <td className="py-4 px-2 text-gray-500">1,237</td>
            <td className="py-4 px-2 text-gray-500">₹233.45</td>
            <td className="py-4 px-2 text-gray-500 text-center">142</td>
            <td className="py-4 px-2 text-gray-500 text-center">2,300</td>
          </tr>
          <tr>
            <td className="py-4 px-2 font-bold text-gray-900">Change</td>
            <td className="py-4 px-2 text-green-500">↑ 18.6%</td>
            <td className="py-4 px-2 text-green-500">↑ 15.3%</td>
            <td className="py-4 px-2 text-green-500">↑ 2.9%</td>
            <td className="py-4 px-2 text-green-500 text-center">↑ 9.9%</td>
            <td className="py-4 px-2 text-green-500 text-center">↑ 6.8%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MonthlySummaryTable;
