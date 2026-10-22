import React from 'react';

/**
 * 暖阳系统专属扁平插画库（彻底统一暖色调规范，无蓝黄绿杂色）
 * 调色板：暖橙 #FF793F、深焦橙 #EA580C、咖啡深褐 #2A1E17 / #5A483D、暖柔杏底 #FFF2EB / #FAF7F2、暖灰 #8C7D73
 */

// 1. 居家养老·长辈温情生活场景插画（温暖阳光、窗景与温水茶杯，纯暖色系）
export function ElderHomeSceneIllustration({ className = 'w-24 h-24' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* 柔和暖底圆块 */}
      <circle cx="60" cy="60" r="54" fill="#FAF5EF" />

      {/* 暖阳光晕（暖杏色） */}
      <circle cx="88" cy="36" r="16" fill="#FED7AA" opacity="0.85" />
      <circle cx="88" cy="36" r="24" fill="#FFF2EB" opacity="0.5" />

      {/* 家居窗檐与屋脊几何扁平色块 */}
      <path d="M22 66L60 38L98 66V88H22V66Z" fill="#F8EDE3" />
      <path d="M18 64L60 34L102 64H18Z" fill="#FDBA74" />

      {/* 室内温馨窗格 */}
      <rect x="44" y="54" width="32" height="30" rx="4" fill="#FFFFFF" />
      <rect x="47" y="57" width="12" height="11" rx="2" fill="#FAF5EF" />
      <rect x="61" y="57" width="12" height="11" rx="2" fill="#FAF5EF" />
      <rect x="47" y="70" width="12" height="11" rx="2" fill="#FAF5EF" />
      <rect x="61" y="70" width="12" height="11" rx="2" fill="#FAF5EF" />

      {/* 窗台盆栽（暖陶盆与典雅枝叶，无绿） */}
      <rect x="74" y="76" width="10" height="9" rx="2" fill="#EA580C" />
      <path d="M79 76C75 72 73 66 77 64C81 66 81 72 79 76Z" fill="#8C7D73" />
      <path d="M79 76C83 73 87 69 86 65C82 66 80 72 79 76Z" fill="#A8988C" />

      {/* 温水茶杯 */}
      <rect x="36" y="78" width="6" height="7" rx="1.5" fill="#FFFFFF" />
      <ellipse cx="39" cy="78" rx="3" ry="1" fill="#FED7AA" />
      <path d="M39 74Q37 72 39 70" stroke="#FF793F" strokeWidth="1.2" strokeLinecap="round" />

      {/* 底部柔和地坪 */}
      <ellipse cx="60" cy="100" rx="46" ry="6" fill="#EFE8DF" />
    </svg>
  );
}

// 2. 心率体征扁平插画（纯暖色）
export function HeartRateIllustration({ className = 'w-12 h-12' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="32" cy="32" r="28" fill="#FFF2EB" />
      <path
        d="M32 46C32 46 16 36 16 26C16 20.477 20.477 16 26 16C28.5 16 30.7 17.2 32 19C33.3 17.2 35.5 16 38 16C43.523 16 48 20.477 48 26C48 36 32 46 32 46Z"
        fill="#FF793F"
      />
      {/* 扁平脉搏折线 */}
      <path
        d="M20 28H26L29 22L33 34L37 26L39 30H44"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 3. 血压体征扁平插画（纯暖色）
export function BloodPressureIllustration({ className = 'w-12 h-12' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="32" cy="32" r="28" fill="#FFF2EB" />
      {/* 臂带主体 */}
      <rect x="18" y="22" width="28" height="24" rx="4" fill="#EA580C" />
      <rect x="22" y="26" width="20" height="16" rx="2" fill="#FED7AA" />
      {/* 气管与充气球 */}
      <path d="M32 46V52C32 54 36 54 36 52V46" stroke="#C2410C" strokeWidth="2" strokeLinecap="round" />
      <circle cx="32" cy="34" r="5" fill="#FFFFFF" />
      <path d="M32 31V34L34 35" stroke="#EA580C" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// 4. 血糖体征扁平插画（纯暖色）
export function BloodSugarIllustration({ className = 'w-12 h-12' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="32" cy="32" r="28" fill="#FFF2EB" />
      {/* 扁平水滴/血滴 */}
      <path
        d="M32 16C32 16 20 30 20 38C20 44.627 25.373 50 32 50C38.627 50 44 44.627 44 38C44 30 32 16 32 16Z"
        fill="#FF793F"
      />
      {/* 晶体亮点 */}
      <circle cx="28" cy="36" r="3" fill="#FED7AA" />
      <circle cx="35" cy="41" r="2" fill="#FED7AA" />
      <path d="M29 27L32 23" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// 5. 体温体征扁平插画（纯暖色）
export function TemperatureIllustration({ className = 'w-12 h-12' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="32" cy="32" r="28" fill="#FFF2EB" />
      {/* 扁平体温计 */}
      <rect x="29" y="16" width="6" height="26" rx="3" fill="#EA580C" />
      <rect x="30" y="18" width="4" height="20" rx="2" fill="#FED7AA" />
      <circle cx="32" cy="44" r="7" fill="#EA580C" />
      <circle cx="32" cy="44" r="4.5" fill="#FF793F" />
      <rect x="31" y="24" width="2" height="16" rx="1" fill="#EA580C" />
    </svg>
  );
}

// 6. 睡眠体征扁平插画（深褐暖调，无紫蓝）
export function SleepIllustration({ className = 'w-12 h-12' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="32" cy="32" r="28" fill="#FAF5EF" />
      {/* 扁平新月（深褐与暖调） */}
      <path
        d="M38 18C28.059 18 20 26.059 20 36C20 44.153 25.434 50.999 32.844 53.228C30.985 50.312 30 46.85 30 43.125C30 31.875 39.125 22.75 50.375 22.75C51.625 22.75 52.834 22.88 54 23.118C50.213 20 44.423 18 38 18Z"
        fill="#5A483D"
      />
      {/* 伴随暖星 */}
      <circle cx="44" cy="38" r="2.5" fill="#FF793F" />
      <circle cx="25" cy="24" r="1.5" fill="#FDBA74" />
      <circle cx="48" cy="46" r="1.8" fill="#FED7AA" />
    </svg>
  );
}

// 7. 步数与活动扁平插画（纯暖色，无绿）
export function StepsIllustration({ className = 'w-12 h-12' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="32" cy="32" r="28" fill="#FAF5EF" />
      {/* 扁平健康足态 */}
      <path
        d="M18 42C18 36 22 34 27 34H36L44 38C46 39 47 41 46 43L44 45H18V42Z"
        fill="#8C7D73"
      />
      <rect x="16" y="44" width="32" height="4" rx="2" fill="#5A483D" />
      {/* 动态足迹点（暖橙渐变） */}
      <ellipse cx="26" cy="24" rx="3.5" ry="5" fill="#FF793F" />
      <ellipse cx="36" cy="21" rx="3" ry="4.5" fill="#FED7AA" />
    </svg>
  );
}

// 8. 血氧饱和度扁平插画（纯暖色，无蓝）
export function OxygenIllustration({ className = 'w-12 h-12' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="32" cy="32" r="28" fill="#FFF2EB" />
      <circle cx="32" cy="32" r="14" fill="#EA580C" />
      <path
        d="M26 32C26 28.686 28.686 26 32 26C35.314 26 38 28.686 38 32C38 35.314 35.314 38 32 38C28.686 38 26 35.314 26 32Z"
        fill="#FF793F"
      />
      <text x="32" y="35" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">
        O₂
      </text>
    </svg>
  );
}

// 9. 呼吸率扁平插画（纯暖色，无青绿）
export function RespiratoryIllustration({ className = 'w-12 h-12' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="32" cy="32" r="28" fill="#FAF5EF" />
      <path
        d="M20 28C24 24 30 24 34 28C38 32 42 32 44 28"
        stroke="#8C7D73"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M20 36C24 32 30 32 34 36C38 40 42 40 44 36"
        stroke="#FF793F"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
