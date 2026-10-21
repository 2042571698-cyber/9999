import React, { useState } from 'react';
import {
  User,
  ShieldCheck,
  Phone,
  Hospital,
  ChevronRight,
  Check,
  Bell,
  Heart,
  Users,
  Lock,
  PhoneCall,
  Sparkles,
} from 'lucide-react';
import { ElderlyProfile } from '../types';

interface SettingsViewProps {
  currentElderly: ElderlyProfile;
  elderlyList: ElderlyProfile[];
}

export default function SettingsView({
  currentElderly,
  elderlyList,
}: SettingsViewProps) {
  const [notifySms, setNotifySms] = useState(true);
  const [notifyUrgentCall, setNotifyUrgentCall] = useState(true);
  const [notifyDailyDigest, setNotifyDailyDigest] = useState(true);
  const [callModal, setCallModal] = useState<string | null>(null);

  return (
    <div className="pb-28 max-w-md mx-auto px-4 pt-3 space-y-4">
      {/* 顶部标题 */}
      <header>
        <h1 className="text-xl font-bold text-[#2A1E17] tracking-tight">
          家属个人与权限设置
        </h1>
        <p className="text-xs text-[#827166] mt-0.5">
          授权范围、紧急联络网与监护身份管理
        </p>
      </header>

      {/* 家属身份卡片 - 暖阳轻拟物渐变 */}
      <section className="bg-gradient-to-br from-[#FFFBF7] via-[#FFF5EC] to-[#FFEDE0] rounded-xl border border-[#FDE5D2] p-4 shadow-xs">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF9853] to-[#FF6B35] text-white flex items-center justify-center font-bold text-lg shadow-[0_3px_10px_rgba(255,107,53,0.25)]">
            李
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-bold text-[#2C211B]">
                李明
              </h2>
              <span className="text-[11px] font-bold text-[#E65100] bg-[#FFF0E6] px-2 py-0.5 rounded-full border border-[#FFD5BA]">
                主监护人 (长子)
              </span>
            </div>
            <p className="text-xs text-[#7A6A60] mt-1 flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-[#18794E]" />
              <span>已完成国家老龄服务平台实名核身</span>
            </p>
          </div>
        </div>
      </section>

      {/* 长辈照护授权信息 */}
      <section className="bg-white rounded-xl border border-[#EFE8DF] p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#F4EFE8]">
          <div className="flex items-center space-x-2">
            <Lock className="w-4 h-4 text-[#FF7528]" />
            <h3 className="text-sm font-bold text-[#2C211B]">
              受护长辈授权协议
            </h3>
          </div>
          <span className="text-xs font-bold text-[#18794E] bg-[#E8F8F0] px-2.5 py-0.5 rounded-full">
            已生效
          </span>
        </div>

        <div className="space-y-2 text-xs text-[#5D4C42]">
          <div className="flex justify-between py-1 border-b border-[#FAF6F0]">
            <span className="text-[#8C7A70]">授权长辈</span>
            <span className="font-bold text-[#2C211B]">{currentElderly.name} ({currentElderly.relationship})</span>
          </div>
          <div className="flex justify-between py-1 border-b border-[#FAF6F0]">
            <span className="text-[#8C7A70]">法定授权范围</span>
            <span className="font-semibold text-[#2C211B]">{currentElderly.authorization.scope}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-[#FAF6F0]">
            <span className="text-[#8C7A70]">有效期限</span>
            <span className="font-semibold text-[#2C211B]">至 {currentElderly.authorization.validUntil}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-[#8C7A70]">电子授权编码</span>
            <span className="font-mono text-[#8C7A70]">{currentElderly.authorization.authorizationCode}</span>
          </div>
        </div>
      </section>

      {/* 紧急急救与签约医院专线 */}
      <section className="bg-white rounded-xl border border-[#EFE8DF] p-4 shadow-xs space-y-3">
        <div className="flex items-center space-x-2">
          <Hospital className="w-4 h-4 text-[#FF7528]" />
          <h3 className="text-sm font-bold text-[#2C211B]">
            就近急救与对口医院
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <button
            onClick={() => setCallModal('120 急救专线')}
            className="p-3 rounded-lg bg-[#FFF5F3] border border-[#FCD8CF] text-left hover:bg-[#FFEBE7] transition"
          >
            <div className="text-xs font-bold text-[#B91C1C]">120 急救直呼</div>
            <div className="text-[11px] text-[#A82222] mt-0.5">支持一键同步老人住址</div>
          </button>

          <button
            onClick={() => setCallModal(currentElderly.emergencyContact.hospital)}
            className="p-3 rounded-lg bg-[#FAF7F2] border border-[#EADBCE] text-left hover:bg-[#F5EFE7] transition"
          >
            <div className="text-xs font-bold text-[#3B2E26] truncate">
              {currentElderly.emergencyContact.hospital}
            </div>
            <div className="text-[11px] text-[#7A6A60] mt-0.5">
              距老人居所 {currentElderly.emergencyContact.hospitalDistance}
            </div>
          </button>
        </div>
      </section>

      {/* 消息通知偏好设置 */}
      <section className="bg-white rounded-xl border border-[#EFE8DF] p-4 shadow-xs space-y-3">
        <div className="flex items-center space-x-2">
          <Bell className="w-4 h-4 text-[#FF7528]" />
          <h3 className="text-sm font-bold text-[#2C211B]">
            家属推送与提醒渠道
          </h3>
        </div>

        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-[#3B2E26]">异常体征电话强提醒</div>
              <div className="text-[11px] text-[#8C7A70]">心率或离床异常时自动外呼</div>
            </div>
            <button
              onClick={() => setNotifyUrgentCall(!notifyUrgentCall)}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                notifyUrgentCall ? 'bg-[#FF7528]' : 'bg-[#E0D5C7]'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  notifyUrgentCall ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-[#3B2E26]">服务进度短信通知</div>
              <div className="text-[11px] text-[#8C7A70]">护工接单、出发与服务完成提醒</div>
            </div>
            <button
              onClick={() => setNotifySms(!notifySms)}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                notifySms ? 'bg-[#FF7528]' : 'bg-[#E0D5C7]'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  notifySms ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-[#3B2E26]">晚间家庭健康简报</div>
              <div className="text-[11px] text-[#8C7A70]">每晚 20:30 汇总今日步数与心率</div>
            </div>
            <button
              onClick={() => setNotifyDailyDigest(!notifyDailyDigest)}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                notifyDailyDigest ? 'bg-[#FF7528]' : 'bg-[#E0D5C7]'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  notifyDailyDigest ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* 平台版本与关怀热线 */}
      <footer className="text-center text-[11px] text-[#9E8E84] space-y-1 pt-2">
        <div>「暖阳」居家养老守护平台 · 家属端 v2.4.0</div>
        <div>全国居家养老服务热线: 400-880-9988 (24小时)</div>
      </footer>

      {/* 拨号弹窗 */}
      {callModal && (
        <div className="fixed inset-0 bg-[#2D211A]/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-5 max-w-xs w-full shadow-2xl space-y-3.5 text-center border border-[#EDE2D4]">
            <div className="w-12 h-12 rounded-full bg-[#FFEAE0] flex items-center justify-center mx-auto text-[#FF6525]">
              <PhoneCall className="w-6 h-6 text-[#FF6525] animate-bounce" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#2A1E17]">
                正在呼叫
              </h3>
              <p className="text-xs text-[#7A6A60] mt-1">
                {callModal}
              </p>
            </div>
            <button
              onClick={() => setCallModal(null)}
              className="w-full py-2 rounded-lg bg-[#3D2C22] text-white font-bold text-xs hover:bg-[#2C1F17] transition"
            >
              挂断
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
