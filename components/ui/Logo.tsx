import React from 'react';
import Link from 'next/link';

interface LogoProps {
  variant?: 'light' | 'dark';
  showTagline?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({
  variant = 'dark',
  showTagline = false,
  className = '',
  size = 'md',
}: LogoProps) {
  const isLight = variant === 'light';

  const sizeClasses = {
    sm: {
      svg: 'w-7 h-7',
      title: 'text-base font-bold tracking-tight',
      sub: 'text-[9px] tracking-widest',
    },
    md: {
      svg: 'w-8 h-8',
      title: 'text-lg font-extrabold tracking-tight',
      sub: 'text-[10px] tracking-widest',
    },
    lg: {
      svg: 'w-10 h-10',
      title: 'text-2xl font-black tracking-tight',
      sub: 'text-xs tracking-widest',
    },
  }[size];

  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 transition-transform duration-200 hover:scale-[1.01] ${className}`}
      aria-label="Modern Fertilisers - Home"
    >
      {/* Precision Geometric Leaf + Molecule + Growth Line Icon */}
      <div className={`relative flex items-center justify-center shrink-0 ${sizeClasses.svg}`}>
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm transition-transform duration-300 group-hover:rotate-3"
        >
          {/* Hexagonal Tech Matrix Base */}
          <polygon
            points="20,2 35,10.5 35,29.5 20,38 5,29.5 5,10.5"
            stroke={isLight ? '#10b981' : '#047857'}
            strokeWidth="1.5"
            strokeDasharray="2 3"
            opacity="0.45"
          />

          {/* Precision Leaf Curve with Nutrient Core */}
          <path
            d="M20 7C20 7 29 13 29 23C29 27.97 24.97 32 20 32C15.03 32 11 27.97 11 23C11 13 20 7 20 7Z"
            fill={isLight ? 'url(#leafGradLight)' : 'url(#leafGradDark)'}
          />

          {/* Central Vascular Growth Line */}
          <path
            d="M20 31V12"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* Upward Nutrient Nodes / Molecular Bonds */}
          <circle cx="20" cy="14" r="2" fill="#84cc16" />
          <circle cx="24.5" cy="21" r="1.8" fill="#34d399" />
          <circle cx="15.5" cy="23" r="1.8" fill="#fbbf24" />

          {/* Ascending Angled Energy Vector */}
          <path
            d="M15 26L20 20L25 15"
            stroke="#ffffff"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />

          <defs>
            <linearGradient id="leafGradDark" x1="11" y1="7" x2="29" y2="32" gradientUnits="userSpaceOnUse">
              <stop stopColor="#059669" />
              <stop offset="1" stopColor="#042f1f" />
            </linearGradient>
            <linearGradient id="leafGradLight" x1="11" y1="7" x2="29" y2="32" gradientUnits="userSpaceOnUse">
              <stop stopColor="#34d399" />
              <stop offset="1" stopColor="#059669" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Wordmark */}
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-semibold tracking-[-0.03em] ${
              isLight ? 'text-white' : 'text-neutral-900'
            } ${sizeClasses.title}`}
          >
            MODERN
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
        <span
          className={`font-mono font-medium uppercase tracking-[0.22em] ${
            isLight ? 'text-emerald-400' : 'text-emerald-700'
          } ${sizeClasses.sub}`}
        >
          FERTILISERS
        </span>
        {showTagline && (
          <span className="text-[11px] text-neutral-500 font-sans mt-0.5 tracking-normal">
            Better Nutrition. Better Growth.
          </span>
        )}
      </div>
    </Link>
  );
}
