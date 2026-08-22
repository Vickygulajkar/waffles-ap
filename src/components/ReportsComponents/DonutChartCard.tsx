import React from 'react';

interface DonutDataItem {
  label: string;
  value: string;
  percentage: number;
  color: string;
}

interface DonutChartCardProps {
  title: string;
  data: DonutDataItem[];
  centerLabel?: string;
  centerValue?: string;
}

const DonutChartCard: React.FC<DonutChartCardProps> = ({ title, data, centerLabel, centerValue }) => {
  // Simple calculation for SVG strokes (circumference = 2 * PI * r)
  // For a circle with r=40, circumference is ~251.2
  const r = 40;
  const circumference = 2 * Math.PI * r;
  
  let currentOffset = 0;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col h-full">
      <h3 className="text-sm font-bold text-gray-800 mb-6">{title}</h3>
      
      <div className="flex items-center gap-6 mt-auto mb-auto">
        {/* Chart SVG */}
        <div className="relative w-28 h-28 shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background track */}
            <circle cx="50" cy="50" r={r} fill="none" stroke="#F3F4F6" strokeWidth="15" />
            
            {/* Segments */}
            {data.map((item, idx) => {
              const dashLength = (item.percentage / 100) * circumference;
              const dasharray = `${dashLength} ${circumference}`;
              const dashoffset = -currentOffset;
              currentOffset += dashLength;
              
              // We're passing tailwind color classes like 'bg-green-500', 
              // but SVG stroke needs actual colors. We can map common colors or expect hex.
              // Let's assume `color` prop is a hex or valid CSS color like '#10B981'.
              return (
                <circle 
                  key={idx}
                  cx="50" cy="50" r={r} 
                  fill="none" 
                  stroke={item.color} 
                  strokeWidth="15" 
                  strokeDasharray={dasharray} 
                  strokeDashoffset={dashoffset}
                  strokeLinecap="butt"
                />
              );
            })}
          </svg>
          
          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {centerLabel && <span className="text-[10px] text-gray-500 font-semibold">{centerLabel}</span>}
            {centerValue && <span className="text-sm font-bold text-gray-900">{centerValue}</span>}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-2 flex-1">
          {data.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-gray-600 font-semibold">{item.label}</span>
              </div>
              <span className="font-bold text-gray-800">
                {item.value} <span className="text-gray-400 font-medium ml-1">({item.percentage}%)</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonutChartCard;
