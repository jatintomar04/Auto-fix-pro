import React from 'react';
import { Car } from 'lucide-react';

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center">
      <div className="relative">
        {/* Road */}
        <div className="w-48 h-1 bg-blue-200 rounded-full mb-8 relative overflow-hidden">
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-blue-300 animate-[shimmer_1s_infinite]" />
        </div>

        {/* Car with shadow */}
        <div className="relative animate-[bounce_1s_infinite]">
          <Car className="w-12 h-12 text-blue-600 animate-[wiggle_.3s_infinite]" />
          <div className="w-10 h-2 bg-blue-100 rounded-full mx-auto mt-2 animate-pulse" />
        </div>

        {/* Loading text */}
        <div className="mt-8 text-center">
          <h3 className="text-xl font-semibold text-blue-900">Loading</h3>
          <div className="flex items-center justify-center gap-1 mt-2">
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-[bounce_1s_infinite]" />
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-[bounce_1s_infinite_.1s]" />
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-[bounce_1s_infinite_.2s]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;