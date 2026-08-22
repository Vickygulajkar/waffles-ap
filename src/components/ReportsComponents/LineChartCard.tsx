import React from 'react';

interface LineChartCardProps {
  title: string;
  value: string;
  trend: string;
  trendIsUp: boolean;
  currentPeriodLabel: string;
  previousPeriodLabel: string;
  yAxisLabels: string[];
}

const LineChartCard: React.FC<LineChartCardProps> = ({
  title,
  value,
  trend,
  trendIsUp,
  currentPeriodLabel,
  previousPeriodLabel,
  yAxisLabels
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h3 className="text-sm font-bold text-gray-800 mb-2">{title}</h3>
      <div className="flex items-end gap-3 mb-4">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <span className={`text-xs font-semibold mb-1 ${trendIsUp ? 'text-green-500' : 'text-red-500'}`}>
          {trendIsUp ? '↑' : '↓'} {trend}
        </span>
      </div>

      <div className="flex items-center gap-6 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-1 bg-[#E85D21] rounded-full"></div>
          <span className="text-[10px] font-semibold text-gray-600">{currentPeriodLabel}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-0 border-t-2 border-dashed border-gray-300"></div>
          <span className="text-[10px] font-semibold text-gray-500">{previousPeriodLabel}</span>
        </div>
      </div>

      <div className="relative h-48 w-full flex">
        {/* Y-Axis */}
        <div className="flex flex-col justify-between items-end pr-4 text-[10px] text-gray-400 font-medium h-40">
          {yAxisLabels.map((label, idx) => (
            <span key={idx}>{label}</span>
          ))}
        </div>

        {/* Chart Area */}
        <div className="flex-1 relative h-40 border-b border-gray-100">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            {/* Defs for Gradient */}
            <defs>
              <linearGradient id="gradientLine" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#E85D21" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#E85D21" stopOpacity="0" />
              </linearGradient>
            </defs>
            
            {/* Previous Period Line (Dashed) */}
            <path 
              d="M0,70 Q10,80 20,60 T40,65 T60,50 T80,75 T100,60" 
              fill="none" 
              stroke="#D1D5DB" 
              strokeWidth="1" 
              strokeDasharray="4 4" 
              vectorEffect="non-scaling-stroke" 
            />
            
            {/* Current Period Fill */}
            <path 
              d="M0,60 Q10,70 20,40 T40,50 T60,20 T80,60 T100,40 L100,100 L0,100 Z" 
              fill="url(#gradientLine)" 
            />

            {/* Current Period Line (Solid) */}
            <path 
              d="M0,60 Q10,70 20,40 T40,50 T60,20 T80,60 T100,40" 
              fill="none" 
              stroke="#E85D21" 
              strokeWidth="2" 
              vectorEffect="non-scaling-stroke" 
            />
            
            {/* Data point circle (example) */}
            <circle cx="60" cy="20" r="3" fill="#E85D21" stroke="white" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          </svg>

          {/* X-Axis */}
          <div className="absolute top-40 left-0 right-0 flex justify-between pt-2 text-[10px] text-gray-400 font-medium">
            <span>21 Aug</span>
            <span>26 Aug</span>
            <span>31 Aug</span>
            <span>05 Sep</span>
            <span>10 Sep</span>
            <span>15 Sep</span>
            <span>20 Sep</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LineChartCard;
