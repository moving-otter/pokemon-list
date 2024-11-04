import React from 'react';

export default function SlideLoading() {
  return (
    <div data-testid="slide-loading" className="w-full h-1 bg-gray-200 overflow-hidden fixed">
      <div className="absolute left-0 bottom-0 h-full w-full bg-blue-400 animate-slide-reset" />
    </div>
  );
}
