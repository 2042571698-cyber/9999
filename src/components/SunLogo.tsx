import React from 'react';

interface SunLogoProps {
  className?: string;
  size?: number;
}

/**
 * 「暖阳」矢量 SVG 品牌 Logo
 * 意象：初升暖阳与庇护家檐的几何扁平结合
 * 寓意：以温暖日光照拂居家安宁，代表专业、可信赖的居家养老守护
 */
export const SunLogo: React.FC<SunLogoProps> = ({ className = 'w-8 h-8', size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="暖阳品牌标志"
    >
      {/* 暖阳圆形核心（半沉于屋檐之下，朝阳破晓） */}
      <circle cx="18" cy="15" r="7.5" fill="#FF793F" />

      {/* 晨曦暖阳辐射光芒（克制的三道极简几何光芒） */}
      <path
        d="M18 4V2M10.22 7.22L8.8 5.8M25.78 7.22L27.2 5.8"
        stroke="#FF793F"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* 庇护家檐（平直有力的屋顶几何檐口与立柱基座） */}
      <path
        d="M6 19.5L18 10.5L30 19.5"
        stroke="#2E211A"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 家屋底座守护托线 */}
      <path
        d="M9.5 19.5V28C9.5 29.1 10.4 30 11.5 30H24.5C25.6 30 26.5 29.1 26.5 28V19.5"
        stroke="#2E211A"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 门扉与温暖内芯（负空间小窗户/爱心之门） */}
      <path
        d="M15.5 30V23C15.5 21.9 16.4 21 17.5 21H18.5C19.6 21 20.5 21.9 20.5 23V30"
        stroke="#FF793F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
