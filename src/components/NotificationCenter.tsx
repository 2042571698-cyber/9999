import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  PhoneCall,
  Stethoscope,
  Clock,
  MapPin,
  Check,
  ChevronRight,
  ShieldAlert,
  Bell,
  X,
  Sparkles,
} from 'lucide-react';
import { CareNotification, ElderlyProfile } from '../types';

interface NotificationCenterProps {
  notifications: CareNotification[];
  currentElderly: ElderlyProfile;
  onAcknowledge: (id: string, feedbackNote?: string) => void;
  onTransferToProfessional: (id: string, transferType: string, note?: string) => void;
}

export default function NotificationCenter({
  notifications,
  currentElderly,
  onAcknowledge,
  onTransferToProfessional,
}: NotificationCenterProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'urgent' | 'service' | 'acknowledged'>('all');
  const [showTransferModal, setShowTransferModal] = useState<CareNotification | null>(null);
  const [transferTarget, setTransferTarget] = useState<'community' | 'hospital_120'>('community');
  const [callDoctorModal, setCallDoctorModal] = useState<string | null>(null);

  // 过滤列表
  const filteredList = notifications.filter((item) => {
    if (activeFilter === 'urgent') return item.category === 'urgent_attention';
    if (activeFilter === 'service') return item.category === 'service_update';
    if (activeFilter === 'acknowledged') return item.isAcknowledged;
    return true;
  });

  const urgentCount = notifications.filter(
    (n) => n.category === 'urgent_attention' && !n.isAcknowledged
  ).length;

  const handleConfirmTransfer = () => {
    if (showTransferModal) {
      onTransferToProfessional(
        showTransferModal.id,
        transferTarget,
        transferTarget === 'community' ? '已转交安贞社区卫生站' : '已呼叫120急救'
      );
      setShowTransferModal(null);
      setCallDoctorModal(transferTarget === 'community' ? '社区卫生站 (010-84221199)' : '120急救中心');
    }
  };

  return (
    <div className="pb-28 max-w-md mx-auto px-4 pt-3 space-y-4">
      {/* 顶部标题与分类过滤胶囊 */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#2A1E17] tracking-tight">
            消息与提醒
          </h1>
          <p className="text-xs text-[#827166] mt-0.5">
            长辈生活体征感知与服务流转状态
          </p>
        </div>

        {urgentCount > 0 ? (
          <span className="text-xs font-bold text-[#B91C1C] bg-[#FFF1EE] border border-[#FCD8CF] px-3 py-1 rounded-full flex items-center shadow-xs">
            <span className="w-2 h-2 rounded-full bg-red-500 mr-1.5 animate-pulse" />
            待处理: {urgentCount}
          </span>
        ) : (
          <span className="text-xs font-semibold text-[#18794E] bg-[#E8F8F0] border border-[#C2EED7] px-3 py-1 rounded-full flex items-center">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-[#18794E]" />
            全天平稳
          </span>
        )}
      </header>

      {/* 4组分类胶囊切换 */}
      <div className="flex space-x-1.5 overflow-x-auto no-scrollbar py-0.5">
        {[
          { key: 'all', label: `全部 (${notifications.length})` },
          { key: 'urgent', label: `紧急关注 (${urgentCount})`, highlight: urgentCount > 0 },
          { key: 'service', label: '服务动态' },
          { key: 'acknowledged', label: '已确认' },
        ].map((tab) => {
          const isActive = activeFilter === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-xs ${
                isActive
                  ? 'bg-gradient-to-r from-[#FF8742] to-[#FF6525] text-white shadow-[0_3px_10px_rgba(255,101,37,0.25)]'
                  : tab.highlight
                  ? 'bg-[#FFF1EE] text-[#BE123C] border border-[#FCD8CF]'
                  : 'bg-white text-[#635349] border border-[#EADBCE] hover:bg-[#FFFDFB]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 消息卡片列表 */}
      <div className="space-y-3">
        {filteredList.map((item) => {
          const isUrgent = item.category === 'urgent_attention';

          return (
            <article
              key={item.id}
              className={`p-4 rounded-xl border transition-all ${
                isUrgent && !item.isAcknowledged
                  ? 'bg-gradient-to-br from-[#FFF7F5] to-[#FFF1EE] border-[#FCD2C7] shadow-[0_4px_16px_rgba(239,68,68,0.06)]'
                  : 'bg-white border-[#EFE8DF] shadow-xs'
              }`}
            >
              {/* 头部：分类标识与时间 */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {isUrgent ? (
                    <span className="text-[11px] font-bold text-[#BE123C] bg-[#FFEBE7] border border-[#FCCFC6] px-2 py-0.5 rounded-full flex items-center">
                      <AlertTriangle className="w-3 h-3 mr-1 text-[#E11D48]" />
                      异常关注
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold text-[#1D70B8] bg-[#EEF6FF] border border-[#CFE4FE] px-2 py-0.5 rounded-full flex items-center">
                      <Sparkles className="w-3 h-3 mr-1 text-[#1D70B8]" />
                      服务更新
                    </span>
                  )}
                  <span className="text-[11px] text-[#938379] flex items-center">
                    <Clock className="w-3 h-3 mr-1 text-[#B0A197]" />
                    {item.timestamp}
                  </span>
                </div>

                {item.isAcknowledged ? (
                  <span className="text-[11px] text-[#18794E] font-medium bg-[#E8F8F0] px-2 py-0.5 rounded-full flex items-center">
                    <Check className="w-3 h-3 mr-1" />
                    已确认
                  </span>
                ) : (
                  <span className="text-[11px] text-[#FF6525] font-bold bg-[#FFF2EB] px-2 py-0.5 rounded-full">
                    待家属了解
                  </span>
                )}
              </div>

              {/* 标题与摘要 */}
              <div>
                <h3 className="text-sm font-bold text-[#2A1E17] leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[#5D4E44] mt-1 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              {/* 设备与位置来源 */}
              <div className="mt-2.5 pt-2.5 border-t border-[#F2ECE3] flex items-center justify-between text-[11px] text-[#8C7B71]">
                <span>监测源: {item.sourceDevice}</span>
                <span className="flex items-center text-[#736359]">
                  <MapPin className="w-3 h-3 mr-1 text-[#FF7528]" />
                  {item.location}
                </span>
              </div>

              {/* 转交记录状态（若已转交） */}
              {item.transferStatus && item.transferStatus !== 'none' && (
                <div className="mt-2.5 p-2.5 rounded-xl bg-[#FFF9F3] border border-[#FDE5D2] text-xs text-[#A85122] flex items-center justify-between">
                  <span className="font-semibold">{item.transferNote}</span>
                  <button
                    onClick={() => setCallDoctorModal(item.transferNote || '医生电话')}
                    className="text-[11px] font-bold text-[#FF6525] underline"
                  >
                    联系跟进
                  </button>
                </div>
              )}

              {/* 操作按钮区 */}
              {!item.isAcknowledged && (
                <div className="mt-3.5 pt-3 border-t border-[#F2ECE3] grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onAcknowledge(item.id, '家属已电话核实确认')}
                    className="py-2.5 px-3 bg-gradient-to-r from-[#FF8842] to-[#FF6525] text-white rounded-full text-xs font-bold transition flex items-center justify-center space-x-1.5 shadow-[0_3px_10px_rgba(255,101,37,0.22)] active:scale-[0.98]"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>我知道了</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowTransferModal(item);
                      setTransferTarget('community');
                    }}
                    className="py-2.5 px-3 bg-white border border-[#EADBCE] hover:bg-[#FFFDFB] text-[#554439] rounded-full text-xs font-bold transition flex items-center justify-center space-x-1.5 shadow-xs active:scale-[0.98]"
                  >
                    <Stethoscope className="w-3.5 h-3.5 text-[#FF7528]" />
                    <span>转交医护处理</span>
                  </button>
                </div>
              )}

              {/* 已了解详细信息 */}
              {item.isAcknowledged && (
                <div className="mt-2 text-[11px] text-[#85756B] bg-[#FAF7F2] p-2 rounded-xl flex items-center justify-between">
                  <span>确认人: {item.acknowledgedBy} · {item.acknowledgedAt}</span>
                  <span className="text-[#18794E] font-medium">{item.feedbackNote || '已核实'}</span>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* 转交专业机构弹窗 */}
      {showTransferModal && (
        <div className="fixed inset-0 bg-[#2D211A]/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-5 max-w-xs w-full shadow-2xl space-y-3.5 border border-[#EDE2D4]">
            <div className="flex items-center justify-between pb-2 border-b border-[#F2ECE3]">
              <h3 className="text-sm font-bold text-[#2A1E17]">
                转交专业医护跟进
              </h3>
              <button
                onClick={() => setShowTransferModal(null)}
                className="w-7 h-7 rounded-lg bg-[#FAF6F0] flex items-center justify-center text-[#7A6A60]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#736359] leading-relaxed">
              针对「{showTransferModal.title}」，平台将为您联动专业线下处置机构：
            </p>

            <div className="space-y-2">
              <button
                onClick={() => setTransferTarget('community')}
                className={`w-full p-2.5 rounded-lg border text-left text-xs transition ${
                  transferTarget === 'community'
                    ? 'border-[#FF7836] bg-[#FFF9F3] font-bold text-[#D95D24]'
                    : 'border-[#EADBCE] text-[#4A3B32]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>安贞社区卫生服务站</span>
                  <span className="text-[11px] text-[#8C7B71]">签约家庭医生</span>
                </div>
                <div className="text-[11px] font-normal text-[#8A796F] mt-0.5">
                  护士 20 分钟内可上门排查
                </div>
              </button>

              <button
                onClick={() => setTransferTarget('hospital_120')}
                className={`w-full p-2.5 rounded-lg border text-left text-xs transition ${
                  transferTarget === 'hospital_120'
                    ? 'border-[#E11D48] bg-[#FFF5F3] font-bold text-[#BE123C]'
                    : 'border-[#EADBCE] text-[#4A3B32]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>120 急救专线</span>
                  <span className="text-[11px] text-[#BE123C]">紧急救护</span>
                </div>
                <div className="text-[11px] font-normal text-[#8A796F] mt-0.5">
                  直连最近安贞医院急诊中心
                </div>
              </button>
            </div>

            <div className="text-[10px] text-[#A19186] bg-[#FAF7F2] p-2 rounded-lg leading-relaxed">
              温馨提示：平台提供转交与协同入口，不替代线下专业医疗诊断，遇危急请直接拨打 120。
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => setShowTransferModal(null)}
                className="py-2 rounded-lg border border-[#EADBCE] text-xs font-bold text-[#6D5D53]"
              >
                取消
              </button>
              <button
                onClick={handleConfirmTransfer}
                className="py-2 rounded-lg bg-gradient-to-r from-[#FF8742] to-[#FF6525] text-white text-xs font-bold shadow-xs hover:brightness-105 transition"
              >
                确认转交
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 医生拨打电话弹窗 */}
      {callDoctorModal && (
        <div className="fixed inset-0 bg-[#2D211A]/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-5 max-w-xs w-full shadow-2xl space-y-3 text-center border border-[#EDE2D4]">
            <div className="w-12 h-12 rounded-full bg-[#EBF8F2] flex items-center justify-center mx-auto text-[#18794E]">
              <PhoneCall className="w-6 h-6 text-[#18794E] animate-bounce" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#2A1E17]">
                已发起联动
              </h3>
              <p className="text-xs text-[#7A6A60] mt-1">
                {callDoctorModal}
              </p>
              <p className="text-[11px] text-[#9E8E84] mt-1">
                医生已收到长辈实时体征简报，正在准备电话核实。
              </p>
            </div>
            <button
              onClick={() => setCallDoctorModal(null)}
              className="w-full py-2 rounded-lg bg-[#3D2C22] text-white font-bold text-xs"
            >
              我知道了
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
