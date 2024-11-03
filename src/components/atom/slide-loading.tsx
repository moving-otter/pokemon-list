import React from 'react';

export default function SlideLoading() {
  return (
    <div className="w-full h-1 bg-gray-200 overflow-hidden relative">
      <div className="absolute left-0 top-0 h-full w-full bg-blue-400 animate-slide-reset" />
    </div>
  );
}
