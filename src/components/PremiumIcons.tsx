import React from 'react';

/**
 * 暖阳系统专属高端矢量 SVG 图标库
 * 统一标准：无蓝黄绿杂色，统一温暖纯净色系（暖橙 #FF793F、深褐 #2A1E17、暖灰 #8C7D73、暖浅底 #FFF2EB）
 * 规范：24x24 视口、1.75 统一描边与优雅几何微倒角，告别普通公版 AI 生成感
 */

// 1. 暖阳品牌 Sun & Roof Logo
export function IconSunWarm({ className = 'w-6 h-6', size = 24 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="16" cy="16" r="14" fill="#FFF2EB" />
      <path d="M16 6L24 13V23C24 23.5523 23.5523 24 23 24H9C8.44772 24 8 23.5523 8 23V13L16 6Z" fill="#FF793F" />
      <path d="M16 9L21 13.5V21H11V13.5L16 9Z" fill="#FFFFFF" />
      <circle cx="16" cy="16.5" r="2.5" fill="#FF793F" />
      <path d="M16 3V5M16 27V29M3 16H5M27 16H29" stroke="#EA580C" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

// 2. 静息心率（高端医用心电曲线与温润爱心）
export function IconHeartRate({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
        fill="#FFF2EB"
        stroke="#FF793F"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M4.5 9.5H8L10 6L13.5 14L15.5 8.5L17 11H19.5"
        stroke="#EA580C"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 3. 动态血压（高保真水银表盘刻度与气囊）
export function IconBloodPressure({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="12" cy="11" r="8" fill="#FFF2EB" stroke="#FF793F" strokeWidth="1.75" />
      <path d="M12 7V11L15 13" stroke="#EA580C" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 19V21.5C12 22.0523 11.5523 22.5 11 22.5H7" stroke="#8C7D73" strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="6" cy="11" r="1" fill="#EA580C" />
      <circle cx="12" cy="5" r="1" fill="#EA580C" />
      <circle cx="18" cy="11" r="1" fill="#EA580C" />
    </svg>
  );
}

// 4. 餐前血糖（血糖血滴与微量检测晶片）
export function IconBloodSugar({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M12 2.5C12 2.5 5.5 10 5.5 14.5C5.5 18.09 8.41 21 12 21C15.59 21 18.5 18.09 18.5 14.5C18.5 10 12 2.5 12 2.5Z"
        fill="#FFF2EB"
        stroke="#FF793F"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="14" r="2.5" fill="#EA580C" />
      <path d="M10 11.5C10.5 10.5 11.2 9.5 12 8.5" stroke="#FF793F" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// 5. 基础体温（水银柱感温计）
export function IconTemperature({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M14 14.76V5C14 3.9 13.1 3 12 3C10.9 3 10 3.9 10 5V14.76C8.8 15.68 8 17.2 8 18.89C8 21.16 9.8 23 12 23C14.2 23 16 21.16 16 18.89C16 17.2 15.2 15.68 14 14.76Z"
        fill="#FFF2EB"
        stroke="#FF793F"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="19" r="2.5" fill="#EA580C" />
      <path d="M12 9V16" stroke="#EA580C" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

// 6. 睡眠分析（静谧月牙与陪伴星辉）
export function IconSleepMoon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79Z"
        fill="#FFF2EB"
        stroke="#8C7D73"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="17" cy="6" r="1.5" fill="#FF793F" />
      <circle cx="20" cy="9.5" r="1" fill="#EA580C" />
    </svg>
  );
}

// 7. 日常步数与活动（健康足印轨迹）
export function IconStepShoes({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M6 14C7.5 13.5 9 14.5 9.5 16C10 17.5 9 19.5 7.5 20C6 20.5 4.5 19.5 4 18C3.5 16.5 4.5 14.5 6 14Z"
        fill="#FFF2EB"
        stroke="#FF793F"
        strokeWidth="1.5"
      />
      <path
        d="M16 5C17.5 4.5 19 5.5 19.5 7C20 8.5 19 10.5 17.5 11C16 11.5 14.5 10.5 14 9C13.5 7.5 14.5 5.5 16 5Z"
        fill="#FFF2EB"
        stroke="#FF793F"
        strokeWidth="1.5"
      />
      <path d="M7 11C8.5 10 11 10 13 12" stroke="#FF793F" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />
    </svg>
  );
}

// 8. 预约陪诊（门诊医疗箱与护士手杖）
export function IconMedicalEscort({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="3" y="6" width="18" height="15" rx="3" fill="#FFF2EB" stroke="#FF793F" strokeWidth="1.75" />
      <path d="M8 6V4C8 3.44772 8.44772 3 9 3H15C15.5523 3 16 3.44772 16 4V6" stroke="#FF793F" strokeWidth="1.75" />
      <path d="M12 10.5V16.5M9 13.5H15" stroke="#EA580C" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

// 9. 上门康复（理疗守护手部呵护）
export function IconRehabCare({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M12 21.5C6.75 21.5 2.5 17.25 2.5 12C2.5 6.75 6.75 2.5 12 2.5C17.25 2.5 21.5 6.75 21.5 12C21.5 17.25 17.25 21.5 12 21.5Z"
        fill="#FFF2EB"
        stroke="#FF793F"
        strokeWidth="1.75"
      />
      <path d="M8 12.5L11 15.5L16 9.5" stroke="#EA580C" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// 10. 居家助餐（暖热餐食盖碗）
export function IconMealAssist({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M3 13C3 13 4 19 12 19C20 19 21 13 21 13H3Z" fill="#FFF2EB" stroke="#FF793F" strokeWidth="1.75" strokeLinejoin="round" />
      <path d="M12 9V5M9 9C9 9 9 6 10 5M15 9C15 9 15 6 14 5" stroke="#EA580C" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M2 13H22" stroke="#FF793F" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

// 11. 安宁居安（安全巡检智能家门）
export function IconSafetyHome({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M3 10L12 3L21 10V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V10Z" fill="#FFF2EB" stroke="#FF793F" strokeWidth="1.75" strokeLinejoin="round" />
      <path d="M10 21V13H14V21" stroke="#EA580C" strokeWidth="1.75" strokeLinejoin="round" />
    </svg>
  );
}

// 12. 用药管理（胶囊药丸）
export function IconMedication({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M10.5 4.5L4.5 10.5C3 12 3 14.5 4.5 16L8 19.5C9.5 21 12 21 13.5 19.5L19.5 13.5C21 12 21 9.5 19.5 8L16 4.5C14.5 3 12 3 10.5 4.5Z"
        fill="#FFF2EB"
        stroke="#FF793F"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M8.5 12.5L12.5 8.5" stroke="#EA580C" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

// 13. 亲情拨号
export function IconPhoneCall({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M22 16.92V19.92C22 20.48 21.54 20.93 20.97 20.89C10.74 20.19 3.81 13.26 3.11 3.03C3.07 2.46 3.52 2 4.08 2H7.08C7.58 2 8 2.37 8.07 2.86C8.21 3.86 8.5 4.82 8.92 5.71C9.09 6.07 9 6.5 8.71 6.79L7.09 8.41C8.61 11.39 12.61 15.39 15.59 16.91L17.21 15.29C17.5 15 17.93 14.91 18.29 15.08C19.18 15.5 20.14 15.79 21.14 15.93C21.63 16 22 16.42 22 16.92Z"
        fill="#FFF2EB"
        stroke="#FF793F"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 14. 视频陪伴
export function IconVideoCall({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="2" y="6" width="14" height="12" rx="3" fill="#FFF2EB" stroke="#FF793F" strokeWidth="1.75" />
      <path d="M16 10L21 7V17L16 14V10Z" fill="#FFF2EB" stroke="#FF793F" strokeWidth="1.75" strokeLinejoin="round" />
      <circle cx="9" cy="12" r="2" fill="#EA580C" />
    </svg>
  );
}

// 15. 待办事项剪贴板
export function IconTodoClipboard({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="4" y="5" width="16" height="16" rx="3" fill="#FAF5EF" stroke="#8C7D73" strokeWidth="1.75" />
      <path d="M9 3H15C15.5523 3 16 3.44772 16 4V5H8V4C8 3.44772 8.44772 3 9 3Z" fill="#EFE8DF" stroke="#8C7D73" strokeWidth="1.5" />
      <path d="M8 11L10.5 13.5L16 8.5" stroke="#EA580C" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 16H16" stroke="#A8988C" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// 16. 待关注警告（暖调纯粹，绝无刺眼高饱和亮红）
export function IconAlertWarm({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M12 3L2 20H22L12 3Z"
        fill="#FEECEB"
        stroke="#DC2626"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M12 9V14" stroke="#DC2626" strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="12" cy="17" r="1" fill="#DC2626" />
    </svg>
  );
}

// 17. 父亲专属高端矢量头像
export function ElderAvatarFather({ className = 'w-12 h-12' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="48" height="48" rx="16" fill="#F5EFE9" />
      {/* 父亲发型（干练花白银发） */}
      <path d="M16 19C16 14.5 19.5 11 24 11C28.5 11 32 14.5 32 19V21H16V19Z" fill="#A8988C" />
      {/* 面部 */}
      <circle cx="24" cy="22" r="8" fill="#FDE7D9" />
      {/* 老花镜 */}
      <rect x="18" y="20" width="5" height="3.5" rx="1" stroke="#8C7D73" strokeWidth="1.2" fill="none" />
      <rect x="25" y="20" width="5" height="3.5" rx="1" stroke="#8C7D73" strokeWidth="1.2" fill="none" />
      <path d="M23 21.5H25" stroke="#8C7D73" strokeWidth="1.2" />
      {/* 衣领（温暖深棕唐装式样） */}
      <path d="M12 40C12 32.5 17 29 24 29C31 29 36 32.5 36 40H12Z" fill="#5A483D" />
      <path d="M24 29V37" stroke="#FAF7F2" strokeWidth="1.2" />
    </svg>
  );
}

// 18. 母亲专属高端矢量头像
export function ElderAvatarMother({ className = 'w-12 h-12' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="48" height="48" rx="16" fill="#FFF2EB" />
      {/* 母亲烫发盘发发型 */}
      <circle cx="24" cy="20" r="10" fill="#8C7D73" />
      <ellipse cx="24" cy="14" rx="7" ry="4" fill="#A8988C" />
      {/* 面部 */}
      <circle cx="24" cy="22" r="7.5" fill="#FDE7D9" />
      {/* 温和微笑 */}
      <path d="M22 24.5C23 25.5 25 25.5 26 24.5" stroke="#C2410C" strokeWidth="1" strokeLinecap="round" />
      {/* 亲切温和衣领（暖橙红织锦） */}
      <path d="M12 40C12 32.5 17 29 24 29C31 29 36 32.5 36 40H12Z" fill="#C2410C" />
      {/* 珍珠配饰 */}
      <circle cx="24" cy="30" r="1.5" fill="#FAF7F2" />
    </svg>
  );
}
