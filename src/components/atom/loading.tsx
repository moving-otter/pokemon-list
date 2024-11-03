import React from 'react';

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="loader">
        <div className="w-12 h-12 border-4 border-t-transparent border-gray-200 rounded-full animate-spin"></div>
      </div>
      <style jsx>{`
        .loader {
          position: relative;
          width: 48px;
          height: 48px;
        }
      `}</style>
    </div>
  );
}
