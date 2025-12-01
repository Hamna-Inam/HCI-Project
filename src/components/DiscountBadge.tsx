import React from 'react';

interface DiscountBadgeProps {
  discount: number;
  size?: 'small' | 'medium' | 'large';
}

export function DiscountBadge({ discount, size = 'medium' }: DiscountBadgeProps) {
  const sizeClasses = {
    small: 'w-14 h-14',
    medium: 'w-16 h-16',
    large: 'w-20 h-20',
  };

  const textSize = {
    small: { discount: '0.75rem', off: '0.4rem' },
    medium: { discount: '0.9rem', off: '0.45rem' },
    large: { discount: '1.1rem', off: '0.55rem' },
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <div className={`${sizeClasses[size]} relative`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.4))' }}
        >
          {/* Clean 12-point badge - premium look */}
          <path
            d="M 50 8
               L 54 42 L 63 12
               L 58 44 L 75 20
               L 62 48 L 85 30
               L 65 50 L 88 45
               L 66 54 L 92 60
               L 68 58 L 92 75
               L 66 66 L 88 85
               L 63 70 L 80 92
               L 56 72 L 66 98
               L 50 74 L 44 98
               L 46 72 L 34 98
               L 37 70 L 20 92
               L 34 66 L 12 85
               L 32 58 L 8 75
               L 34 54 L 8 60
               L 35 50 L 12 45
               L 38 48 L 15 30
               L 42 44 L 25 20
               L 46 42 L 37 12
               Z"
            fill="#7C2D12"
            stroke="none"
          />
          {/* Inner glow circle for text background */}
          <circle cx="50" cy="50" r="28" fill="#7C2D12" opacity="0.95" />
        </svg>
        
        {/* Discount Text - Gold on Dark Brown */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span 
            className="text-[#FACC06] font-black leading-none"
            style={{ 
              fontSize: textSize[size].discount,
              textShadow: '0 1px 3px rgba(0,0,0,0.5)',
              letterSpacing: '-0.02em'
            }}
          >
            {discount}%
          </span>
          <span 
            className="text-[#FACC06] font-black leading-none tracking-wider"
            style={{ 
              fontSize: textSize[size].off,
              textShadow: '0 1px 3px rgba(0,0,0,0.5)',
              marginTop: '2px'
            }}
          >
            OFF
          </span>
        </div>
      </div>
    </div>
  );
}
