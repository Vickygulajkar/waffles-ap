import React from 'react';

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconBgColor: string;
  iconColor: string;
  trend?: {
    value: string;
    isUp: boolean;
    text: string;
  };
  subtitle?: React.ReactNode;
  hasBgPattern?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  iconBgColor,
  iconColor,
  trend,
  subtitle,
  hasBgPattern,
}) => {
  return (
    <div className={`relative flex items-center p-5 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden`}>
      {hasBgPattern && (
        <div className="absolute right-[-10px] top-[-10px] opacity-10 pointer-events-none">
          {/* A simple SVG pattern resembling the waffle/checkered pattern in the image */}
          <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" stroke="#E85D21" strokeWidth="2">
              <path d="M20,20 h80 v80 h-80 z" />
              <path d="M20,60 h80 M60,20 v80" />
              <path d="M40,20 v80 M80,20 v80 M20,40 h80 M20,80 h80" />
              <circle cx="60" cy="60" r="40" strokeDasharray="4 4" />
            </g>
          </svg>
        </div>
      )}
      
      <div className={`flex items-center justify-center w-14 h-14 rounded-full ${iconBgColor} ${iconColor} mr-4 z-10 shrink-0`}>
        {icon}
      </div>
      
      <div className="flex flex-col z-10">
        <span className="text-sm font-semibold text-gray-600 mb-1">{title}</span>
        <span className="text-2xl font-bold text-gray-900 mb-1">{value}</span>
        
        {subtitle ? (
          <div className="text-xs text-gray-500 font-medium">{subtitle}</div>
        ) : trend ? (
          <div className="flex items-center text-xs font-medium mt-0.5">
            <span className={`flex items-center ${trend.isUp ? 'text-green-500' : 'text-red-500'}`}>
              {trend.isUp ? '↑' : '↓'} {trend.value}
            </span>
            <span className="text-gray-400 ml-1">{trend.text}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default StatCard;
