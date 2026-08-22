import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const SelectionRules: React.FC = () => {
  const rules = [
    'Only completed orders are eligible',
    'Minimum order value: ₹100',
    'One order per customer per day',
    'Fair random selection'
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      <h3 className="text-sm font-bold text-gray-800 mb-4">Winner Selection Rules</h3>
      
      <ul className="space-y-3">
        {rules.map((rule, index) => (
          <li key={index} className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
            <span className="text-xs font-semibold text-gray-700">{rule}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectionRules;
