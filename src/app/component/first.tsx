import React from "react";

export default function First() {
  return (
    <div 
      className="relative w-[500px] h-[500px] bg-white flex items-center justify-center m-auto"
      style={{
        perspective: "1000px", // Adds 3D perspective depth
      }}
    >
      {/* Main Outer Frame with rotateX(85deg) */}
      <div 
        className="absolute inset-0 border-8 border-yellow-600 border-solid style-gold-gradient"
        style={{
          transform: "rotateX(120deg)",
          transformStyle: "preserve-3d",
        }}
      >
        
        {/* Corner Accents */}
        <div className="absolute -top-3 -left-3 w-8 h-8 border-t-4 border-l-4 border-yellow-600" />
        <div className="absolute -top-3 -right-3 w-8 h-8 border-t-4 border-r-4 border-yellow-600" />
        <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-4 border-l-4 border-yellow-600" />
        <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-4 border-r-4 border-yellow-600" />

        {/* Cross Vertical Rectangles */}
        <div className="absolute top-[10%] bottom-[10%] left-[28%] right-[28%] border-4 border-yellow-600 pointer-events-none" />
        <div className="absolute top-[28%] bottom-[28%] left-[10%] right-[10%] border-4 border-yellow-600 pointer-events-none" />

        {/* Center Decorative SVG Ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-56 h-56" viewBox="0 0 200 200">
            <defs>
              <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#BF953F" />
                <stop offset="25%" stopColor="#FCF6BA" />
                <stop offset="50%" stopColor="#B38728" />
                <stop offset="75%" stopColor="#FBF5B7" />
                <stop offset="100%" stopColor="#AA771C" />
              </linearGradient>
            </defs>

            {/* Circular Lines */}
            <circle cx="100" cy="100" r="70" stroke="url(#gold)" strokeWidth="3" fill="none" />
            <circle cx="100" cy="100" r="78" stroke="url(#gold)" strokeWidth="1.5" strokeDasharray="4 6" fill="none" />
            <circle cx="100" cy="100" r="62" stroke="url(#gold)" strokeWidth="1.5" strokeDasharray="4 6" fill="none" />

            {/* Diamond Elements */}
            <g fill="#ffffff" stroke="url(#gold)" strokeWidth="1">
              <circle cx="100" cy="30" r="4" />
              <circle cx="135" cy="39" r="4" />
              <circle cx="161" cy="65" r="4" />
              <circle cx="170" cy="100" r="4" />
              <circle cx="161" cy="135" r="4" />
              <circle cx="135" cy="161" r="4" />
              <circle cx="100" cy="170" r="4" />
              <circle cx="65" cy="161" r="4" />
              <circle cx="39" cy="135" r="4" />
              <circle cx="30" cy="100" r="4" />
              <circle cx="39" cy="65" r="4" />
              <circle cx="65" cy="39" r="4" />
            </g>
          </svg>
        </div>

      </div>
    </div>
  );
}