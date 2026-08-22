import React from 'react';
import { Trophy } from 'lucide-react';

const WinnerCard: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-b from-[#FFF5F0] to-[#FFE8DA] rounded-2xl p-6 border border-[#FBE5D6] overflow-hidden text-center flex flex-col items-center justify-center">
      {/* Background decorative elements */}
      <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-orange-400 opacity-60"></div>
      <div className="absolute top-10 right-8 w-3 h-3 bg-yellow-400 rotate-45 opacity-70"></div>
      <div className="absolute bottom-12 left-10 w-2 h-2 rounded-full bg-red-400 opacity-60"></div>
      <div className="absolute top-1/2 right-4 w-2 h-2 rounded-full bg-orange-500 opacity-50"></div>
      <div className="absolute bottom-6 right-12 w-3 h-3 bg-yellow-500 rotate-12 opacity-60"></div>

      <h3 className="font-serif text-2xl font-bold text-gray-800 mb-1 z-10">Today's Winner</h3>
      <p className="text-sm font-semibold text-gray-800 bg-white/60 px-3 py-1 rounded-full mb-6 z-10">
        21 Aug 2025
      </p>

      <div className="relative z-10 mb-6">
        <div className="w-20 h-20 bg-gradient-to-b from-yellow-300 to-yellow-600 rounded-full flex items-center justify-center shadow-lg mx-auto border-4 border-white">
          <Trophy className="w-10 h-10 text-white" fill="white" />
        </div>
        {/* Laurel wreath shapes could go here, simplified as styling */}
      </div>

      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 w-full border border-white/50 z-10">
        <h4 className="font-bold text-gray-800 mb-1">Winner not selected yet</h4>
        <p className="text-xs text-gray-500">
          Click 'Select Winner' to choose today's lucky customer!
        </p>
      </div>
    </div>
  );
};

export default WinnerCard;
