import React, { useState, useEffect } from 'react';
import {
  ChevronDown,
  Phone,
  Video,
  AlertTriangle,
  ArrowRight,
  Check,
  Stethoscope,
  ChevronRight,
  TrendingUp,
  Activity,
  Heart,
  Footprints,
  Droplets,
  Calendar,
  Sparkles,
  ShieldCheck,
  X,
  Moon,
  Flame,
  Clock,
  CheckCircle2,
  Thermometer,
  Layers,
  ChevronUp,
} from 'lucide-react';
import {
  ElderlyProfile,
  MonitoredMetric,
  CareNotification,
  CareServiceItem,
  CarePlanTask,
  TabType,
  VitalTrendPoint,
} from '../types';
import {
  mockVitalTrends7Days,
  mockVitalTrends24Hours,
  mockSleepAnalysis,
  mockDailySteps,
} from '../mockData';
import { ElderHomeSceneIllustration } from './FlatIllustrations';
import { VitalDetailModal } from './VitalDetailModal';

interface OverviewProps {
  elderlyList: ElderlyProfile[];
  currentElderly: ElderlyProfile;
  onSelectElderly: (e: ElderlyProfile) => void;
  onOpenElderDrawer?: () => void;
  metrics: MonitoredMetric[];
  notifications: CareNotification[];
  services: CareServiceItem[];
  careTasks: CarePlanTask[];
  onNavigateTab: (tab: TabType) => void;
  onAcknowledgeNotification: (id: string, note?: string) => void;
  onTransferToProfessional: (id: string, type: string) => void;
}

export default function Overview({
  elderlyList,
  currentElderly,
  onSelectElderly,
  onOpenElderDrawer,
  metrics,
  notifications,
  services,
  careTasks,
  onNavigateTab,
  onAcknowledgeNotification,
  onTransferToProfessional,
}: OverviewProps) {
  const [trendMode, setTrendMode] = useState<'7days' | '24hours'>('7days');
  const [selectedTrendIndex, setSelectedTrendIndex] = useState<number | null>(6);
  const [selectedMetricId, setSelectedMetricId] = useState<string>('m2');
  const [quickContactModal, setQuickContactModal] = useState<string | null>(null);

  // 体征详情弹窗控制
  const [isVitalDetailOpen, setIsVitalDetailOpen] = useState(false);
  const [vitalDetailMetricId, setVitalDetailMetricId] = useState<string>('m1');

  // 本地体征数据驱动（支持实时在弹窗中录入同步）
  const [localMetrics, setLocalMetrics] = useState<MonitoredMetric[]>(metrics);

  useEffect(() => {
    setLocalMetrics(metrics);
  }, [metrics]);

  // 打开指定体征深度详情弹窗
  const openVitalDetail = (metricId: string) => {
    setVitalDetailMetricId(metricId);
    setIsVitalDetailOpen(true);
  };

  // 处理在弹窗中补录更新体征
  const handleUpdateMetricValue = (metricId: string, newValue: string | number, statusText: string) => {
    setLocalMetrics((prev) =>
      prev.map((m) =>
        m.id === metricId ? { ...m, value: newValue, statusText, updatedAt: '刚刚' } : m
      )
    );
  };

  // 待处理紧急警报（未确认）
  const urgentUnacknowledged = notifications.filter(
    (n) => n.category === 'urgent_attention' && !n.isAcknowledged
  );

  // 进行中的服务
  const activeService = services.find((s) => s.currentStepIndex < 4);

  // 今日任务完成情况
  const completedTaskCount = careTasks.filter((t) => t.status === 'completed').length;
  const totalTaskCount = careTasks.length;

  // 走势数据源
  const vitalTrendData: VitalTrendPoint[] =
    trendMode === '7days' ? mockVitalTrends7Days : mockVitalTrends24Hours;

  const currentHoveredPoint =
    selectedTrendIndex !== null && vitalTrendData[selectedTrendIndex]
      ? vitalTrendData[selectedTrendIndex]
      : vitalTrendData[vitalTrendData.length - 1];

  // 指标视觉映射（扁平纯色块，无描边）
  const getMetricVisuals = (id: string) => {
    switch (id) {
      case 'm1':
        return {
          icon: Activity,
          colorClass: 'text-rose-500',
          bgClass: 'bg-[#FFF1F2]',
        };
      case 'm2':
        return {
          icon: Heart,
          colorClass: 'text-[#E11D48]',
          bgClass: 'bg-[#FFE4E6]',
        };
      case 'm3':
        return {
          icon: Droplets,
          colorClass: 'text-[#D97706]',
          bgClass: 'bg-[#FEF3C7]',
        };
      default:
        return {
          icon: Thermometer,
          colorClass: 'text-[#EA580C]',
          bgClass: 'bg-[#FFEDD5]',
        };
    }
  };

  // 是否存在待家属决策的异常关注事项
  const hasPendingUrgent = urgentUnacknowledged.length > 0;

  return (
    <div className="pb-28 max-w-md mx-auto px-4 pt-3 space-y-3.5">
      {/* 顶部：受护长辈基本信息卡片（扁平插画风，融合温馨家居矢量插画，无描边） */}
      <section className="rounded-2xl bg-white p-4.5 shadow-xs relative overflow-hidden">
        {/* 背景柔和几何插画装饰（纯平色块，无描边） */}
        <div className="absolute right-0 top-0 bottom-0 pointer-events-none opacity-90 hidden sm:block">
          <ElderHomeSceneIllustration className="w-32 h-32 -mr-3 -mt-3" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between gap-3">
            {/* 长辈头像与身份信息 */}
            <div className="flex items-center space-x-3 min-w-0">
              <div className="relative shrink-0">
                <div className="w-13 h-13 rounded-2xl bg-[#FFF2EB] text-[#C2410C] flex items-center justify-center font-bold text-lg shadow-xs">
                  {currentElderly.avatarText}
                </div>
                <span
                  className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full ring-2 ring-white flex items-center justify-center ${
                    hasPendingUrgent ? 'bg-[#EF4444]' : 'bg-[#10B981]'
                  }`}
                />
              </div>

              <div className="min-w-0 text-left">
                <div className="flex items-center space-x-2">
                  <h1 className="text-lg font-bold text-[#2A1E17] tracking-tight">
                    {currentElderly.name}
                  </h1>
                  <span className="text-[11px] font-semibold text-[#8C7A70] bg-[#F8F4EE] px-2 py-0.5 rounded-lg shrink-0">
                    {currentElderly.relationship} · {currentElderly.age}岁
                  </span>
                </div>
                {/* 状态描述：严格依据真实待处理异常（已删除原“各项指标平稳 · 居家居安守护中”） */}
                <p className="text-xs mt-1.5 flex items-center space-x-1.5">
                  <span
                    className={`w-2 h-2 rounded-full inline-block ${
                      hasPendingUrgent ? 'bg-[#EF4444]' : 'bg-[#10B981]'
                    }`}
                  />
                  <span className={hasPendingUrgent ? 'text-[#DC2626] font-semibold' : 'text-[#7C6E65]'}>
                    {hasPendingUrgent
                      ? `存在 ${urgentUnacknowledged.length} 项健康待关注事项`
                      : '智能终端全时联网看护'}
                  </span>
                </p>
              </div>
            </div>

            {/* 长辈实时状态标签（扁平纯色块，无描边） */}
            <div
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 ${
                hasPendingUrgent
                  ? 'bg-[#FEE2E2] text-[#DC2626]'
                  : 'bg-[#ECFDF5] text-[#059669]'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  hasPendingUrgent ? 'bg-[#EF4444] animate-pulse' : 'bg-[#10B981]'
                }`}
              />
              <span>
                {hasPendingUrgent ? `${urgentUnacknowledged.length}项需关注` : currentElderly.statusSummary}
              </span>
            </div>
          </div>

          {/* 实时守护与数据采集时间 */}
          <div className="mt-3.5 pt-3 bg-[#FAF8F5] rounded-xl px-3 py-2 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-1.5 text-left">
              {hasPendingUrgent ? (
                <>
                  <AlertTriangle className="w-3.5 h-3.5 text-[#DC2626] shrink-0" />
                  <span className="text-[11px] text-[#DC2626] font-medium">
                    待家属决策处置 · 异常已推送
                  </span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#059669] shrink-0" />
                  <span className="text-[11px] text-[#6E6056]">
                    物联网智能探头持续监护
                  </span>
                </>
              )}
            </div>
            <span className="text-[11px] text-[#9C8E84]">
              {currentElderly.statusLastCheck}
            </span>
          </div>

          {/* 亲情连线快捷按钮（扁平插画风，纯色大块，无描边） */}
          <div className="grid grid-cols-2 gap-2.5 mt-3">
            <button
              onClick={() => setQuickContactModal('phone')}
              className="flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl bg-[#F8F4EE] hover:bg-[#EFE9E1] text-[#3D2E25] text-xs font-bold active:scale-[0.98] transition cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-[#EA580C]" />
              <span>给老人拨号</span>
            </button>
            <button
              onClick={() => setQuickContactModal('video')}
              className="flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl bg-[#FF793F] hover:bg-[#EA580C] text-white text-xs font-bold active:scale-[0.98] transition cursor-pointer shadow-xs"
            >
              <Video className="w-3.5 h-3.5 text-white" />
              <span>发起视频陪伴</span>
            </button>
          </div>
        </div>
      </section>

      {/* 待处理异常提醒（柔和浅红纯色底，无描边） */}
      {urgentUnacknowledged.length > 0 && (
        <section className="bg-[#FEF2F2] rounded-2xl p-4 space-y-3 text-left">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
              <h2 className="text-xs font-bold text-[#991B1B]">
                待处理健康关注事项 ({urgentUnacknowledged.length})
              </h2>
            </div>
            <button
              onClick={() => onNavigateTab('notifications')}
              className="text-xs font-bold text-[#DC2626] hover:underline flex items-center space-x-0.5 cursor-pointer"
            >
              <span>查看全部</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {urgentUnacknowledged.slice(0, 1).map((alert) => (
            <div key={alert.id} className="space-y-2.5">
              {/* 异常测量情境与依据 */}
              <div className="bg-white rounded-xl p-3.5 space-y-2">
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-[#1C1917] block">
                      {alert.title}
                    </span>
                    <span className="text-[11px] text-[#78716C] block leading-snug">
                      {alert.detail}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#991B1B] bg-[#FEE2E2] px-2 py-0.5 rounded-md font-bold shrink-0">
                    需关注
                  </span>
                </div>

                {/* 测量情境标注与数据来源 */}
                <div className="pt-2 text-[11px] text-[#78716C] flex items-center justify-between bg-[#FAF8F5] p-2 rounded-lg">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-[#A8A29E]" />
                    <span>今日 08:30 · 晨起静息连续2次测定高于阈值</span>
                  </span>
                  <span className="font-medium text-[#44403C]">欧姆龙血压计</span>
                </div>
              </div>

              {/* 家属处置双操作流转 */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() =>
                    onAcknowledgeNotification(alert.id, '家属已电话核实，长辈无不适，持续关注')
                  }
                  className="py-2.5 px-3 rounded-xl bg-[#F5EFEA] hover:bg-[#EFE8E1] text-[#44403C] text-xs font-bold active:scale-[0.98] transition cursor-pointer flex items-center justify-center space-x-1"
                >
                  <Check className="w-3.5 h-3.5 text-[#57534E]" />
                  <span>已核实并了解</span>
                </button>

                <button
                  onClick={() => onTransferToProfessional(alert.id, 'community_doctor')}
                  className="py-2.5 px-3 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-bold active:scale-[0.98] transition cursor-pointer flex items-center justify-center space-x-1 shadow-xs"
                >
                  <Stethoscope className="w-3.5 h-3.5 text-white" />
                  <span>转交社区医生</span>
                </button>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* 四列快捷服务入口（扁平插画风，纯色大块底座，无描边） */}
      <section className="bg-white rounded-2xl p-4">
        <div className="grid grid-cols-4 gap-2">
          {[
            {
              title: '预约陪诊',
              tag: '门诊协助',
              icon: Sparkles,
              iconBg: 'bg-[#FFF2EB]',
              iconColor: 'text-[#EA580C]',
              action: () => onNavigateTab('services'),
            },
            {
              title: '上门康复',
              tag: '专业理疗',
              icon: Activity,
              iconBg: 'bg-[#EFF6FF]',
              iconColor: 'text-[#2563EB]',
              action: () => onNavigateTab('services'),
            },
            {
              title: '居家助餐',
              tag: '热食配送',
              icon: Calendar,
              iconBg: 'bg-[#FEF3C7]',
              iconColor: 'text-[#D97706]',
              action: () => onNavigateTab('services'),
            },
            {
              title: '安宁居安',
              tag: '安全巡检',
              icon: ShieldCheck,
              iconBg: 'bg-[#ECFDF5]',
              iconColor: 'text-[#059669]',
              action: () => onNavigateTab('careplan'),
            },
          ].map((item, idx) => {
            const ItemIcon = item.icon;
            return (
              <button
                key={idx}
                onClick={item.action}
                className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-[#FAF8F5] active:scale-95 transition cursor-pointer"
              >
                <div className={`w-11 h-11 rounded-2xl ${item.iconBg} flex items-center justify-center mb-1.5 shadow-xs`}>
                  <ItemIcon className={`w-5 h-5 ${item.iconColor}`} />
                </div>
                <span className="text-xs font-bold text-[#2A1E17]">
                  {item.title}
                </span>
                <span className="text-[10px] text-[#8C7D73] mt-0.5">
                  {item.tag}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 今日体征看板（扁平插画风，无描边，点击任意指标钻取深度详情） */}
      <section className="bg-white rounded-2xl p-4.5 space-y-3.5 text-left">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-4 bg-[#FF793F] rounded-full" />
            <h2 className="text-sm font-bold text-[#2C211B]">今日体征概况</h2>
            <span className="text-[10px] font-normal text-[#8C7D73] hidden sm:inline">
              (点击卡片查看深度记录与分析)
            </span>
          </div>
          <span className="text-[11px] font-bold text-[#059669] bg-[#ECFDF5] px-2.5 py-1 rounded-lg">
            全量已联网同步
          </span>
        </div>

        {/* 4 个指标大字展示卡片（心率、血压、血糖、体温）全能点进去！ */}
        <div className="grid grid-cols-2 gap-2.5">
          {localMetrics.slice(0, 4).map((m) => {
            const visuals = getMetricVisuals(m.id);
            const MetricIcon = visuals.icon;

            return (
              <button
                key={m.id}
                onClick={() => openVitalDetail(m.id)}
                className="p-3.5 rounded-2xl text-left transition cursor-pointer bg-[#FAF8F5] hover:bg-[#F3EFE9] active:scale-[0.98] group relative"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <div className={`w-7 h-7 rounded-xl ${visuals.bgClass} flex items-center justify-center ${visuals.colorClass}`}>
                      <MetricIcon className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-[#2C211B]">{m.name}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-[#BDB2A9] group-hover:text-[#FF793F] transition-colors" />
                </div>

                <div className="mt-2.5 flex items-baseline space-x-1">
                  <span className="text-2xl font-extrabold text-[#241A14] tracking-tight tabular-nums font-sans">
                    {m.value}
                  </span>
                  <span className="text-xs font-semibold text-[#8C7A70]">{m.unit}</span>
                </div>

                <div className="mt-1.5 flex items-center justify-between">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      m.status === 'abnormal_high' || m.status === 'abnormal_low'
                        ? 'text-[#DC2626] bg-[#FEE2E2]'
                        : m.status === 'attention'
                        ? 'text-[#D97706] bg-[#FEF3C7]'
                        : 'text-[#059669] bg-[#ECFDF5]'
                    }`}
                  >
                    {m.statusText}
                  </span>
                  <span className="text-[10px] text-[#8C7D73] truncate max-w-[70px]">
                    {m.updatedAt}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 深度数据可视化 1：血压与心率走势图（扁平插画风，无描边，点击可钻取） */}
      <section className="bg-white rounded-2xl p-4.5 space-y-3.5 text-left">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-4 bg-rose-500 rounded-full" />
            <h2 className="text-sm font-bold text-[#2C211B]">血压心率走势</h2>
          </div>

          <div className="flex items-center space-x-2">
            {/* 7日与24小时切换 */}
            <div className="flex bg-[#F6F2EC] p-0.5 rounded-xl text-xs font-medium">
              <button
                onClick={() => {
                  setTrendMode('7days');
                  setSelectedTrendIndex(6);
                }}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  trendMode === '7days'
                    ? 'bg-white text-[#EA580C] font-bold shadow-xs'
                    : 'text-[#7D6B60] hover:text-[#2A1E17]'
                }`}
              >
                近7日
              </button>
              <button
                onClick={() => {
                  setTrendMode('24hours');
                  setSelectedTrendIndex(5);
                }}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  trendMode === '24hours'
                    ? 'bg-white text-[#EA580C] font-bold shadow-xs'
                    : 'text-[#7D6B60] hover:text-[#2A1E17]'
                }`}
              >
                今日
              </button>
            </div>

            <button
              onClick={() => openVitalDetail('m2')}
              className="text-xs text-[#FF793F] font-bold flex items-center hover:underline cursor-pointer"
            >
              <span>详情</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 交互提示与当前选中数据卡片（精修规整网格排版，彻底解决折行与色彩杂乱） */}
        <div
          onClick={() => openVitalDetail('m2')}
          className="bg-[#FAF8F5] hover:bg-[#F3EFE9] transition rounded-2xl p-3.5 text-xs cursor-pointer text-left"
        >
          {/* 顶栏：测定时间与状态标签（两端对齐，标签不折行） */}
          <div className="flex items-center justify-between pb-2.5 border-b border-[#F0EBE3]">
            <span className="text-[11px] text-[#7A6A60] flex items-center">
              测定时间：<strong className="text-[#2C211B] font-semibold ml-1">{currentHoveredPoint.date}</strong>
            </span>
            <span
              className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full shrink-0 whitespace-nowrap ${
                currentHoveredPoint.status === 'normal'
                  ? 'bg-[#EBF8F1] text-[#15803D]'
                  : 'bg-[#FEF3C7] text-[#D97706]'
              }`}
            >
              {currentHoveredPoint.status === 'normal' ? '平稳达标' : '轻微偏高'}
            </span>
          </div>

          {/* 3列规整数据展示：收缩压、舒张压、心率 */}
          <div className="grid grid-cols-3 gap-2 pt-2.5">
            <div>
              <span className="text-[11px] text-[#8C7D73] block">收缩压 (高压)</span>
              <div className="flex items-baseline mt-0.5 whitespace-nowrap">
                <span className="text-lg font-extrabold text-[#241A14] tabular-nums font-sans">
                  {currentHoveredPoint.systolic}
                </span>
                <span className="text-[10px] text-[#8C7D73] ml-1">mmHg</span>
              </div>
            </div>

            <div>
              <span className="text-[11px] text-[#8C7D73] block">舒张压 (低压)</span>
              <div className="flex items-baseline mt-0.5 whitespace-nowrap">
                <span className="text-lg font-extrabold text-[#241A14] tabular-nums font-sans">
                  {currentHoveredPoint.diastolic}
                </span>
                <span className="text-[10px] text-[#8C7D73] ml-1">mmHg</span>
              </div>
            </div>

            <div>
              <span className="text-[11px] text-[#8C7D73] block">脉搏心率</span>
              <div className="flex items-baseline mt-0.5 whitespace-nowrap">
                <span className="text-lg font-extrabold text-[#241A14] tabular-nums font-sans">
                  {currentHoveredPoint.heartRate}
                </span>
                <span className="text-[10px] text-[#8C7D73] ml-1">次/分</span>
              </div>
            </div>
          </div>
        </div>


        {/* 扁平纯色柱状走势图 */}
        <div className="relative pt-2">
          <div className="flex items-center justify-between text-[10px] text-[#9E8F84] mb-1.5">
            <span>高压安全参考区间 (90~140 mmHg)</span>
            <span className="text-rose-500 font-bold">正常区间</span>
          </div>

          <div className="grid grid-cols-7 gap-1.5 h-28 items-end px-1 pb-1">
            {vitalTrendData.map((pt, idx) => {
              const isSelected = selectedTrendIndex === idx;
              const minVal = 60;
              const maxVal = 150;
              const systolicHeight = Math.min(
                100,
                Math.max(25, ((pt.systolic - minVal) / (maxVal - minVal)) * 100)
              );
              const diastolicHeight = Math.min(
                80,
                Math.max(15, ((pt.diastolic - minVal) / (maxVal - minVal)) * 100)
              );

              return (
                <div
                  key={idx}
                  onClick={() => setSelectedTrendIndex(idx)}
                  className={`flex flex-col items-center justify-end h-full cursor-pointer group transition-all rounded-xl p-1 ${
                    isSelected ? 'bg-[#FFF2EB]' : 'hover:bg-[#FAF8F5]'
                  }`}
                >
                  <span
                    className={`text-[9px] font-bold mb-1 tabular-nums ${
                      isSelected ? 'text-[#FF793F]' : 'text-[#8C7A70]'
                    }`}
                  >
                    {pt.systolic}
                  </span>

                  {/* 收缩压与舒张压扁平色块双条柱 */}
                  <div className="w-full flex items-end justify-center space-x-1 h-16">
                    <div
                      style={{ height: `${systolicHeight}%` }}
                      className={`w-2.5 rounded-t-md transition-all ${
                        isSelected ? 'bg-rose-500' : 'bg-rose-300 group-hover:bg-rose-400'
                      }`}
                    />
                    <div
                      style={{ height: `${diastolicHeight}%` }}
                      className={`w-2.5 rounded-t-md transition-all ${
                        isSelected ? 'bg-amber-500' : 'bg-amber-300 group-hover:bg-amber-400'
                      }`}
                    />
                  </div>

                  <span
                    className={`text-[10px] mt-1.5 ${
                      isSelected ? 'font-bold text-[#2A1E17]' : 'text-[#8C7A70]'
                    }`}
                  >
                    {pt.date}
                  </span>
                </div>
              );
            })}
          </div>

          {/* 图例 */}
          <div className="flex items-center justify-center space-x-5 text-[11px] text-[#7A6A60] pt-2">
            <span className="flex items-center">
              <span className="w-2.5 h-2.5 rounded-md bg-rose-400 mr-1.5" />
              收缩压 (高压)
            </span>
            <span className="flex items-center">
              <span className="w-2.5 h-2.5 rounded-md bg-amber-400 mr-1.5" />
              舒张压 (低压)
            </span>
            <span className="flex items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-1.5" />
              心率 72 bpm
            </span>
          </div>
        </div>
      </section>

      {/* 深度数据可视化 2：昨夜睡眠深浅时段分析（扁平插画风，点击可钻取睡眠详情） */}
      <section
        onClick={() => openVitalDetail('m5')}
        className="bg-white rounded-2xl p-4.5 space-y-3.5 text-left cursor-pointer hover:bg-[#FDFBF7] transition"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-4 bg-[#7C3AED] rounded-full" />
            <h2 className="text-sm font-bold text-[#2C211B]">睡眠深浅分析</h2>
          </div>
          <div className="flex items-center space-x-1 text-xs text-[#7C3AED] font-bold">
            <span className="bg-[#EDE9FE] px-2.5 py-1 rounded-lg flex items-center">
              <Moon className="w-3 h-3 mr-1 text-[#7C3AED]" />
              {mockSleepAnalysis.score}分 · {mockSleepAnalysis.statusText}
            </span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* 睡眠总览与时长 */}
        <div className="flex items-baseline justify-between text-xs">
          <div>
            <span className="text-2xl font-extrabold text-[#241A14] tabular-nums font-sans">
              {mockSleepAnalysis.totalHours}
            </span>
            <span className="text-xs font-semibold text-[#7A6A60] ml-1">小时</span>
          </div>
          <div className="text-[11px] text-[#7A6A60] flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5 text-[#8C7A70]" />
            <span>
              {mockSleepAnalysis.startTime} 入睡 ~ {mockSleepAnalysis.endTime} 醒来
            </span>
          </div>
        </div>

        {/* 比例横向分段纯色色块条形图（无描边） */}
        <div className="space-y-2">
          <div className="h-3.5 w-full rounded-full overflow-hidden flex bg-[#F4EFEA]">
            <div
              style={{ width: `${mockSleepAnalysis.deepPct}%` }}
              className="bg-[#2563EB]"
              title={`深睡 ${mockSleepAnalysis.deepHours}h`}
            />
            <div
              style={{ width: `${mockSleepAnalysis.lightPct}%` }}
              className="bg-[#60A5FA]"
              title={`浅睡 ${mockSleepAnalysis.lightHours}h`}
            />
            <div
              style={{ width: `${mockSleepAnalysis.remPct}%` }}
              className="bg-[#A855F7]"
              title={`快速眼动 ${mockSleepAnalysis.remHours}h`}
            />
            <div
              style={{ width: `${mockSleepAnalysis.awakePct}%` }}
              className="bg-[#F59E0B]"
              title={`清醒 ${mockSleepAnalysis.awakeHours}h`}
            />
          </div>

          {/* 阶段四项指标卡片（扁平暖色块，无描边） */}
          <div className="grid grid-cols-4 gap-1.5 text-center text-[11px]">
            <div className="p-2 rounded-xl bg-[#FAF8F5]">
              <span className="text-[#1D4ED8] font-bold block">
                {mockSleepAnalysis.deepHours}h
              </span>
              <span className="text-[#64748B] text-[10px]">深睡 {mockSleepAnalysis.deepPct}%</span>
            </div>
            <div className="p-2 rounded-xl bg-[#FAF8F5]">
              <span className="text-[#0284C7] font-bold block">
                {mockSleepAnalysis.lightHours}h
              </span>
              <span className="text-[#64748B] text-[10px]">浅睡 {mockSleepAnalysis.lightPct}%</span>
            </div>
            <div className="p-2 rounded-xl bg-[#FAF8F5]">
              <span className="text-[#7E22CE] font-bold block">
                {mockSleepAnalysis.remHours}h
              </span>
              <span className="text-[#64748B] text-[10px]">眼动 {mockSleepAnalysis.remPct}%</span>
            </div>
            <div className="p-2 rounded-xl bg-[#FAF8F5]">
              <span className="text-[#B45309] font-bold block">
                {mockSleepAnalysis.awakeHours}h
              </span>
              <span className="text-[#64748B] text-[10px]">清醒 {mockSleepAnalysis.awakePct}%</span>
            </div>
          </div>
        </div>

        <div className="text-[11px] text-[#635349] bg-[#FAF8F5] p-2.5 rounded-xl flex items-center justify-between">
          <span>深睡节律优良 · 仅起夜1次</span>
          <span className="font-bold text-[#059669]">达标</span>
        </div>
      </section>

      {/* 深度数据可视化 3：活动步数柱状图（扁平插画风，点击可钻取步数详情） */}
      <section
        onClick={() => openVitalDetail('m4')}
        className="bg-white rounded-2xl p-4.5 space-y-3.5 text-left cursor-pointer hover:bg-[#FDFBF7] transition"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-4 bg-emerald-500 rounded-full" />
            <h2 className="text-sm font-bold text-[#2C211B]">今日步数与活动</h2>
          </div>
          <div className="flex items-center space-x-1 text-xs text-[#059669] font-bold">
            <span className="bg-[#ECFDF5] px-2.5 py-1 rounded-lg">已达成 108%</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* 步数主数据与消耗（扁平纯色块，无描边） */}
        <div className="grid grid-cols-3 gap-2 text-left">
          <div className="p-3 rounded-xl bg-[#FAF8F5]">
            <span className="text-[10px] text-[#8C7A70] block">今日步数</span>
            <div className="flex items-baseline space-x-0.5 mt-1">
              <span className="text-xl font-extrabold text-[#241A14] tabular-nums font-sans">
                4,320
              </span>
              <span className="text-[10px] text-[#8C7A70]">步</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#FAF8F5]">
            <span className="text-[10px] text-[#8C7A70] block">热量消耗</span>
            <div className="flex items-baseline space-x-0.5 mt-1">
              <span className="text-xl font-extrabold text-[#FF793F] tabular-nums font-sans">
                168
              </span>
              <span className="text-[10px] text-[#8C7A70]">kcal</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#FAF8F5]">
            <span className="text-[10px] text-[#8C7A70] block">活跃时长</span>
            <div className="flex items-baseline space-x-0.5 mt-1">
              <span className="text-xl font-extrabold text-[#059669] tabular-nums font-sans">
                48
              </span>
              <span className="text-[10px] text-[#8C7A70]">分钟</span>
            </div>
          </div>
        </div>

        {/* 7日步数柱状图 */}
        <div className="pt-2">
          <div className="flex items-center justify-between text-[10px] text-[#9E8F84] mb-1.5">
            <span>目标参考线 (4,000步)</span>
            <span className="text-emerald-700 font-bold">达标健康</span>
          </div>

          <div className="grid grid-cols-7 gap-1.5 h-28 items-end px-1">
            {mockDailySteps.map((step, idx) => {
              const maxSteps = 5000;
              const heightPercent = Math.min(100, Math.max(20, (step.steps / maxSteps) * 100));
              const isReach = step.steps >= step.target;

              return (
                <div key={idx} className="flex flex-col items-center justify-end h-full group">
                  <span
                    className={`text-[9px] font-bold mb-1 tabular-nums ${
                      step.isToday ? 'text-[#FF793F]' : 'text-[#8C7A70]'
                    }`}
                  >
                    {step.steps}
                  </span>

                  <div className="w-full flex justify-center">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-3.5 rounded-t-md transition-all duration-300 ${
                        step.isToday
                          ? 'bg-[#FF793F]'
                          : isReach
                          ? 'bg-emerald-300 group-hover:bg-emerald-400'
                          : 'bg-[#E5DCD0]'
                      }`}
                    />
                  </div>

                  <span
                    className={`text-[10px] mt-1.5 ${
                      step.isToday ? 'font-bold text-[#FF793F]' : 'text-[#8C7A70]'
                    }`}
                  >
                    {step.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 快捷跳转：正在办理的服务 & 今日照护安排（扁平纯色块，无描边） */}
      <div className="grid grid-cols-2 gap-2.5 text-left">
        {/* 服务进度入口 */}
        <div
          onClick={() => onNavigateTab('services')}
          className="bg-white rounded-2xl p-4 cursor-pointer hover:bg-[#FAF8F5] transition"
        >
          <div className="flex items-center justify-between text-xs text-[#8C7A70]">
            <span className="font-bold text-[#3C2F27]">服务进度</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#FF793F]" />
          </div>
          {activeService ? (
            <div className="mt-2.5">
              <div className="text-sm font-bold text-[#271C17] truncate">
                {activeService.title}
              </div>
              <div className="text-[11px] font-semibold text-[#059669] mt-1 flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#059669] mr-1.5" />
                正在安排 · {activeService.serviceStaff?.name || '陪诊员'}
              </div>
            </div>
          ) : (
            <div className="text-xs text-[#96867B] mt-2">暂无办理中的服务</div>
          )}
        </div>

        {/* 照护计划入口 */}
        <div
          onClick={() => onNavigateTab('careplan')}
          className="bg-white rounded-2xl p-4 cursor-pointer hover:bg-[#FAF8F5] transition"
        >
          <div className="flex items-center justify-between text-xs text-[#8C7A70]">
            <span className="font-bold text-[#3C2F27]">家庭计划</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#FF793F]" />
          </div>
          <div className="mt-2.5">
            <div className="text-sm font-bold text-[#271C17]">
              已打卡 {completedTaskCount} / {totalTaskCount} 项
            </div>
            <div className="text-[11px] font-semibold text-[#EA580C] mt-1">
              午后康复锻炼待完成
            </div>
          </div>
        </div>
      </div>

      {/* 电话/视频陪伴模拟弹窗（扁平纯色块，无描边） */}
      {quickContactModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-xs w-full space-y-4 text-center shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-[#FFF2EB] flex items-center justify-center mx-auto text-[#FF793F]">
              {quickContactModal === 'phone' ? (
                <Phone className="w-7 h-7 text-[#FF793F]" />
              ) : (
                <Video className="w-7 h-7 text-[#FF793F]" />
              )}
            </div>
            <div>
              <h3 className="text-base font-bold text-[#2A1D16]">
                {quickContactModal === 'phone' ? '正在拨通长辈电话' : '正在发起视频陪伴'}
              </h3>
              <p className="text-xs text-[#7A6A60] mt-1.5 font-medium">
                {currentElderly.name} · {currentElderly.emergencyContact.phone}
              </p>
              <p className="text-[11px] text-[#9C8C80] mt-1">
                床头智能音箱将自动免提接听
              </p>
            </div>
            <button
              onClick={() => setQuickContactModal(null)}
              className="w-full py-2.5 rounded-xl bg-[#2E211A] hover:bg-[#1A120E] text-white font-bold text-xs active:scale-95 transition cursor-pointer"
            >
              结束通话
            </button>
          </div>
        </div>
      )}

      {/* 全功能体征深度钻取与分析弹窗 */}
      <VitalDetailModal
        isOpen={isVitalDetailOpen}
        onClose={() => setIsVitalDetailOpen(false)}
        initialMetricId={vitalDetailMetricId}
        metrics={localMetrics}
        currentElderly={currentElderly}
        onUpdateMetricValue={handleUpdateMetricValue}
        onTransferToDoctor={(metricName, value) => {
          onTransferToProfessional(urgentUnacknowledged[0]?.id || 'notif-1', 'transferred_to_community');
        }}
      />
    </div>
  );
}
