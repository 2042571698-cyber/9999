import React, { useState } from 'react';
import {
  X,
  Plus,
  Send,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  Activity,
  Heart,
  Droplets,
  Thermometer,
  Moon,
  Footprints,
  Wind,
} from 'lucide-react';
import { MonitoredMetric, ElderlyProfile } from '../types';
import {
  HeartRateIllustration,
  BloodPressureIllustration,
  BloodSugarIllustration,
  TemperatureIllustration,
  SleepIllustration,
  StepsIllustration,
  OxygenIllustration,
  RespiratoryIllustration,
} from './FlatIllustrations';

interface VitalDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMetricId: string;
  metrics: MonitoredMetric[];
  currentElderly: ElderlyProfile;
  onUpdateMetricValue?: (metricId: string, newValue: string | number, statusText: string) => void;
  onTransferToDoctor?: (metricName: string, value: string | number) => void;
}

export function VitalDetailModal({
  isOpen,
  onClose,
  initialMetricId,
  metrics,
  currentElderly,
  onUpdateMetricValue,
  onTransferToDoctor,
}: VitalDetailModalProps) {
  const [activeMetricId, setActiveMetricId] = useState<string>(initialMetricId);
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('7d');
  const [showAddRecordModal, setShowAddRecordModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [transferSuccessTip, setTransferSuccessTip] = useState(false);

  // 手动录入表单状态
  const [inputVal1, setInputVal1] = useState('');
  const [inputVal2, setInputVal2] = useState('');
  const [inputTag, setInputTag] = useState('晨起静息');

  if (!isOpen) return null;

  // 获取当前选中的体征指标
  const currentMetric = metrics.find((m) => m.id === activeMetricId) || metrics[0];

  // 扩展体征元数据（涵盖参考范围、标准解释、测量设备、专业照护指南）
  const getMetricDetailMeta = (id: string) => {
    switch (id) {
      case 'm1': // 心率
        return {
          title: '静息心率',
          illustration: HeartRateIllustration,
          unit: '次/分',
          standardRange: '60 ~ 100 次/分 (老年人静息理想区间: 60~80)',
          summaryText: '波动在正常理想范围，连续监测未发现早搏或心动过速',
          avgVal: '72',
          maxVal: '88 (15:20散步)',
          minVal: '62 (04:30睡眠)',
          complianceRate: '98.5%',
          device: '华为智能守护腕表 B6 (蓝牙自动同频)',
          condition: '晨起静坐 5 分钟后自动测量',
          advice:
            '老人日常心率平稳。老年人交感神经调节减弱，清晨起床时宜遵守“三个半分钟”原则（平卧半分钟、坐起半分钟、床沿垂腿半分钟），适度补充温水，避免剧烈活动引起心率骤升。',
          records: [
            { time: '今日 21:00', tag: '睡前自测', value: '68 次/分', status: '正常' },
            { time: '今日 18:20', tag: '晚餐散步后', value: '85 次/分', status: '正常' },
            { time: '今日 12:45', tag: '午间小憩前', value: '70 次/分', status: '正常' },
            { time: '今日 08:30', tag: '晨起静息', value: '72 次/分', status: '正常' },
            { time: '昨日 21:30', tag: '睡前自测', value: '69 次/分', status: '正常' },
          ],
          points7d: [
            { label: '10-15', val: 70 },
            { label: '10-16', val: 72 },
            { label: '10-17', val: 74 },
            { label: '10-18', val: 71 },
            { label: '10-19', val: 73 },
            { label: '10-20', val: 75 },
            { label: '今日', val: 72 },
          ],
        };
      case 'm2': // 血压
        return {
          title: '动态血压',
          illustration: BloodPressureIllustration,
          unit: 'mmHg',
          standardRange: '收缩压 90~139 / 舒张压 60~89 mmHg',
          summaryText: '达标平稳，早晨与傍晚双峰值平缓，无体位性低血压',
          avgVal: '124/81',
          maxVal: '132/84 (10-17)',
          minVal: '118/78 (10-15)',
          complianceRate: '96.2%',
          device: '欧姆龙 HEM-7136 医用蓝牙血压计',
          condition: '排尿后排空膀胱、静坐10分钟上臂测量',
          advice:
            '结合老人轻度高血压病史，早间降压药需在早饭后30分钟按时温水服用。若高压持续超过140 mmHg或伴有头晕头胀，请点击“转交医生”核验调整用药剂量。',
          records: [
            { time: '今日 19:00', tag: '傍晚复测', value: '128/83 mmHg', status: '正常' },
            { time: '今日 12:30', tag: '午饭后自测', value: '122/80 mmHg', status: '正常' },
            { time: '今日 07:45', tag: '晨起静息', value: '126/82 mmHg', status: '正常' },
            { time: '昨日 19:10', tag: '晚间测量', value: '125/81 mmHg', status: '正常' },
            { time: '昨日 07:40', tag: '晨起静息', value: '124/82 mmHg', status: '正常' },
          ],
          points7d: [
            { label: '10-15', val: 122 },
            { label: '10-16', val: 125 },
            { label: '10-17', val: 128 },
            { label: '10-18', val: 126 },
            { label: '10-19', val: 124 },
            { label: '10-20', val: 127 },
            { label: '今日', val: 126 },
          ],
        };
      case 'm3': // 血糖
        return {
          title: '餐前与空腹血糖',
          illustration: BloodSugarIllustration,
          unit: 'mmol/L',
          standardRange: '空腹 3.9~6.1 / 餐后2小时 3.9~7.8 mmol/L',
          summaryText: '糖代谢平稳，未出现低血糖或餐后血糖大幅震荡',
          avgVal: '5.8',
          maxVal: '6.4 (10-16餐后)',
          minVal: '5.1 (10-18空腹)',
          complianceRate: '99.0%',
          device: '鱼跃 580 语音智能血糖仪',
          condition: '晨起空腹 8 小时微量指尖血',
          advice:
            '血糖控制非常理想。维持少食多餐、粗细搭配规律，避免油炸及高升糖水果（如荔枝、龙眼）。床头备有苏打饼干以防偶发夜间低血糖心慌。',
          records: [
            { time: '今日 13:30', tag: '午餐后2h', value: '6.2 mmol/L', status: '正常' },
            { time: '今日 07:15', tag: '晨起空腹', value: '5.8 mmol/L', status: '正常' },
            { time: '昨日 19:30', tag: '晚餐后2h', value: '6.5 mmol/L', status: '正常' },
            { time: '昨日 07:20', tag: '晨起空腹', value: '5.6 mmol/L', status: '正常' },
          ],
          points7d: [
            { label: '10-15', val: 5.7 },
            { label: '10-16', val: 6.0 },
            { label: '10-17', val: 5.9 },
            { label: '10-18', val: 5.5 },
            { label: '10-19', val: 5.8 },
            { label: '10-20', val: 6.1 },
            { label: '今日', val: 5.8 },
          ],
        };
      case 'm4': // 步数与日常活动
        return {
          title: '日常活动与步数',
          illustration: StepsIllustration,
          unit: '步',
          standardRange: '老年人健康推荐 3,500 ~ 6,000 步/日',
          summaryText: '今日已完成 4,320 步，超越日常打卡目标 8%，下肢活动充沛',
          avgVal: '4,210',
          maxVal: '4,980 (10-19)',
          minVal: '3,450 (10-17雨天)',
          complianceRate: '100%',
          device: '老人随身红外计步感应器 / 手环同步',
          condition: '全天累计步数（室内行走 + 小区漫步）',
          advice:
            '适度步行有益心肺与关节灵活。建议分段行走，单次不超过20分钟；穿戴防滑软底老人鞋，遇雨雪湿滑天气减少户外活动，改为室内椅上抬腿训练。',
          records: [
            { time: '今日 18:30', tag: '傍晚公园散步', value: '1,850 步', status: '已达标' },
            { time: '今日 12:00', tag: '午间室内走动', value: '920 步', status: '已达标' },
            { time: '今日 09:30', tag: '晨练早市', value: '1,550 步', status: '已达标' },
          ],
          points7d: [
            { label: '10-15', val: 4200 },
            { label: '10-16', val: 4450 },
            { label: '10-17', val: 3450 },
            { label: '10-18', val: 4120 },
            { label: '10-19', val: 4980 },
            { label: '10-20', val: 4380 },
            { label: '今日', val: 4320 },
          ],
        };
      case 'm5': // 睡眠
        return {
          title: '夜间睡眠质量',
          illustration: SleepIllustration,
          unit: '小时',
          standardRange: '老年人推荐 6.0 ~ 8.0 小时 (深睡占比 &ge; 20%)',
          summaryText: '总睡眠 7.5 小时，深睡 2.1 小时 (28%)，起夜 1 次，节律良好',
          avgVal: '7.3h',
          maxVal: '7.8h (10-18)',
          minVal: '6.6h (10-16)',
          complianceRate: '95.0%',
          device: '智能睡眠无感监测床垫 Sensor-Pad',
          condition: '22:30 入睡至次日 06:00 晨起自主监测',
          advice:
            '保持规律作息。睡前1小时勿饮浓茶或过多温水以减少起夜；床头配备小夜灯避免跌倒；维持卧室温度在 22~24℃ 恒定适宜。',
          records: [
            { time: '昨夜 22:30', tag: '入睡记录', value: '7.5 小时 (深睡2.1h)', status: '优秀' },
            { time: '前夜 22:45', tag: '入睡记录', value: '7.2 小时 (深睡1.9h)', status: '良好' },
          ],
          points7d: [
            { label: '10-15', val: 7.2 },
            { label: '10-16', val: 6.6 },
            { label: '10-17', val: 7.4 },
            { label: '10-18', val: 7.8 },
            { label: '10-19', val: 7.0 },
            { label: '10-20', val: 7.3 },
            { label: '今日', val: 7.5 },
          ],
        };
      case 'm6': // 体温
      default:
        return {
          title: '基础体温',
          illustration: TemperatureIllustration,
          unit: '℃',
          standardRange: '腋下/额温 36.0 ~ 37.2 ℃',
          summaryText: '体温平稳，无发热或低体温征象',
          avgVal: '36.5',
          maxVal: '36.7 (10-16)',
          minVal: '36.3 (10-18)',
          complianceRate: '100%',
          device: '医用红外额温仪 / 智能手环温感探头',
          condition: '早间清醒静坐测定',
          advice:
            '体温调节能力随年龄增长减退，早晚注意添衣保暖。若体温超过 37.3℃ 或出现咳嗽咽痛，请及时补充温开水并联系社区医生。',
          records: [
            { time: '今日 18:00', tag: '晚间复测', value: '36.6 ℃', status: '正常' },
            { time: '今日 12:00', tag: '午间测量', value: '36.4 ℃', status: '正常' },
            { time: '今日 08:00', tag: '晨起测量', value: '36.5 ℃', status: '正常' },
          ],
          points7d: [
            { label: '10-15', val: 36.4 },
            { label: '10-16', val: 36.7 },
            { label: '10-17', val: 36.5 },
            { label: '10-18', val: 36.3 },
            { label: '10-19', val: 36.6 },
            { label: '10-20', val: 36.5 },
            { label: '今日', val: 36.5 },
          ],
        };
    }
  };

  const meta = getMetricDetailMeta(currentMetric.id);
  const MetaIllustration = meta.illustration;

  // 处理提交新记录
  const handleSaveRecord = () => {
    if (!inputVal1) return;
    const finalVal = activeMetricId === 'm2' && inputVal2 ? `${inputVal1}/${inputVal2}` : inputVal1;
    if (onUpdateMetricValue) {
      onUpdateMetricValue(activeMetricId, finalVal, '正常');
    }
    setShowAddRecordModal(false);
    setInputVal1('');
    setInputVal2('');
  };

  // 处理转交医生核验
  const handleTransfer = () => {
    if (onTransferToDoctor) {
      onTransferToDoctor(meta.title, currentMetric.value);
    }
    setTransferSuccessTip(true);
    setTimeout(() => {
      setTransferSuccessTip(false);
    }, 3500);
  };

  return (
    <div className="fixed inset-0 bg-[#2D211A]/40 backdrop-blur-xs flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      {/* 弹窗容器（扁平无描边纯净卡片，温润暖白色调） */}
      <div className="bg-[#FAF8F5] w-full max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom duration-200">
        {/* 顶部标题与关闭按钮（规整对齐，带微细分割线） */}
        <div className="bg-white px-5 py-3.5 flex items-center justify-between border-b border-[#F0EBE3]">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-[#FFF2EB] flex items-center justify-center shrink-0">
              <MetaIllustration className="w-6 h-6" />
            </div>
            <div className="min-w-0 text-left">
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-[#2A1E17] truncate">{meta.title} · 深度监测</h3>
                <span className="text-[11px] font-semibold text-[#15803D] bg-[#EBF8F1] px-2.5 py-0.5 rounded-full shrink-0 whitespace-nowrap">
                  平稳达标
                </span>
              </div>
              <p className="text-[11px] text-[#8C7D73] mt-0.5 truncate">
                {currentElderly.name} · {meta.device}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F4EFEA] hover:bg-[#EFE9E2] flex items-center justify-center text-[#6B5C52] transition cursor-pointer shrink-0 ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 顶层横向体征切换标签栏（统一为 inline-flex 胶囊，h-8 显式高度，居中不跑偏，彻底杜绝溢出与文字剥离） */}
        <div className="bg-white px-4 py-2.5 flex items-center space-x-2 overflow-x-auto no-scrollbar border-b border-[#F0EBE3]">
          {metrics.map((m) => {
            const isActive = m.id === activeMetricId;
            return (
              <button
                key={m.id}
                onClick={() => setActiveMetricId(m.id)}
                className={`inline-flex items-center justify-center h-8 px-4 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#FF793F] text-white shadow-xs'
                    : 'bg-[#F5EFE9] text-[#6E6056] hover:bg-[#ECE4DC]'
                }`}
              >
                {m.name}
              </button>
            );
          })}
        </div>

        {/* 滚动内容区域 */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1 text-left">
          {/* 实时核验提示横幅 */}
          {transferSuccessTip && (
            <div className="bg-[#ECFDF5] p-3 rounded-2xl flex items-center space-x-2 text-xs text-[#065F46] animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>已将长辈今日「{meta.title}」数据直接派发至亚运村社区全科医生站，医生将优先复核！</span>
            </div>
          )}

          {/* 核心大字指标与扁平插画结合卡片 */}
          <div className="bg-white rounded-2xl p-4">
            <div className="flex items-start justify-between">
              <div className="text-left flex-1 min-w-0 pr-3">
                <span className="text-[11px] font-medium text-[#8C7D73] block">最新监测时间：今日 08:30</span>

                {activeMetricId === 'm2' ? (
                  /* 血压专用3项规整布局（收缩压、舒张压、脉搏心率），彻底解决挤压换行 */
                  <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-[#F5EFEA]">
                    <div>
                      <span className="text-[10px] text-[#8C7D73] block">收缩压 (高压)</span>
                      <div className="flex items-baseline mt-0.5 whitespace-nowrap">
                        <span className="text-2xl font-extrabold text-[#2A1E17] tabular-nums font-sans">126</span>
                        <span className="text-[10px] text-[#8C7D73] ml-1">mmHg</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#8C7D73] block">舒张压 (低压)</span>
                      <div className="flex items-baseline mt-0.5 whitespace-nowrap">
                        <span className="text-2xl font-extrabold text-[#2A1E17] tabular-nums font-sans">82</span>
                        <span className="text-[10px] text-[#8C7D73] ml-1">mmHg</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#8C7D73] block">脉搏心率</span>
                      <div className="flex items-baseline mt-0.5 whitespace-nowrap">
                        <span className="text-2xl font-extrabold text-[#2A1E17] tabular-nums font-sans">74</span>
                        <span className="text-[10px] text-[#8C7D73] ml-1">次/分</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-baseline space-x-1.5 mt-1.5">
                    <span className="text-3xl font-extrabold text-[#2A1E17] tabular-nums font-sans">
                      {currentMetric.value}
                    </span>
                    <span className="text-sm font-semibold text-[#8C7D73]">{currentMetric.unit}</span>
                  </div>
                )}

                <div className="mt-3 text-[11px] text-[#6E6056] space-y-1 bg-[#FAF8F5] p-2.5 rounded-xl">
                  <p className="flex items-center">
                    <span className="text-[#8C7D73] shrink-0">参考标准：</span>
                    <span className="font-medium text-[#2A1E17]">{meta.standardRange}</span>
                  </p>
                  <p className="flex items-center">
                    <span className="text-[#8C7D73] shrink-0">采集情境：</span>
                    <span className="text-[#6E6056]">{meta.condition}</span>
                  </p>
                </div>
              </div>

              <div className="w-18 h-18 shrink-0 flex items-center justify-center bg-[#FDF8F3] rounded-2xl">
                <MetaIllustration className="w-14 h-14" />
              </div>
            </div>
          </div>

          {/* 统计概览四宫格（扁平温和色块，规整排版） */}
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-white rounded-xl p-2.5 text-center">
              <span className="text-[10px] text-[#8C7D73] block">7日均值</span>
              <span className="text-xs sm:text-sm font-bold text-[#2A1E17] mt-0.5 block truncate">{meta.avgVal}</span>
            </div>
            <div className="bg-white rounded-xl p-2.5 text-center">
              <span className="text-[10px] text-[#8C7D73] block">最高记录</span>
              <span className="text-xs sm:text-sm font-bold text-[#DC2626] mt-0.5 block truncate">
                {meta.maxVal.split(' ')[0]}
              </span>
            </div>
            <div className="bg-white rounded-xl p-2.5 text-center">
              <span className="text-[10px] text-[#8C7D73] block">最低记录</span>
              <span className="text-xs sm:text-sm font-bold text-[#15803D] mt-0.5 block truncate">
                {meta.minVal.split(' ')[0]}
              </span>
            </div>
            <div className="bg-white rounded-xl p-2.5 text-center">
              <span className="text-[10px] text-[#8C7D73] block">达标率</span>
              <span className="text-xs sm:text-sm font-bold text-[#FF793F] mt-0.5 block">
                {meta.complianceRate}
              </span>
            </div>
          </div>

          {/* 趋势走势折线/柱状分析图 */}
          <div className="bg-white rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-[#FF793F]" />
                <h4 className="text-xs font-bold text-[#2A1E17]">体征走势与波动分析</h4>
              </div>

              {/* 时间跨度切换 */}
              <div className="flex bg-[#F6F2EC] p-0.5 rounded-lg text-[11px] font-medium">
                {(['24h', '7d', '30d'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setTimeRange(r)}
                    className={`px-2.5 py-0.5 rounded-md transition cursor-pointer ${
                      timeRange === r
                        ? 'bg-white text-[#FF793F] font-bold shadow-xs'
                        : 'text-[#7C6D63]'
                    }`}
                  >
                    {r === '24h' ? '24小时' : r === '7d' ? '近7日' : '近30日'}
                  </button>
                ))}
              </div>
            </div>

            {/* 走势可视化纯色柱状图 */}
            <div className="grid grid-cols-7 gap-2 h-28 items-end pt-3 px-1">
              {meta.points7d.map((pt, idx) => {
                const isToday = idx === meta.points7d.length - 1;
                // 计算高度比例
                const maxChart =
                  activeMetricId === 'm4' ? 6000 : activeMetricId === 'm2' ? 150 : 100;
                const minChart =
                  activeMetricId === 'm4' ? 2000 : activeMetricId === 'm2' ? 60 : 30;
                const hPercent = Math.min(
                  100,
                  Math.max(25, ((Number(pt.val) - minChart) / (maxChart - minChart)) * 100)
                );

                return (
                  <div key={idx} className="flex flex-col items-center justify-end h-full group">
                    <span
                      className={`text-[9px] font-bold mb-1 tabular-nums ${
                        isToday ? 'text-[#FF793F]' : 'text-[#8C7D73]'
                      }`}
                    >
                      {pt.val}
                    </span>
                    <div
                      style={{ height: `${hPercent}%` }}
                      className={`w-full max-w-[18px] rounded-t-md transition-all ${
                        isToday ? 'bg-[#FF793F]' : 'bg-[#FED7AA] group-hover:bg-[#FDBA74]'
                      }`}
                    />
                    <span
                      className={`text-[10px] mt-1.5 ${
                        isToday ? 'font-bold text-[#FF793F]' : 'text-[#8C7D73]'
                      }`}
                    >
                      {pt.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <p className="text-[11px] text-[#7A6A60] bg-[#FAF8F5] p-2.5 rounded-xl flex items-center justify-between">
              <span>{meta.summaryText}</span>
              <span className="font-semibold text-[#15803D] shrink-0 whitespace-nowrap ml-2">平稳正常</span>
            </p>
          </div>


          {/* 测量流水记录 */}
          <div className="bg-white rounded-2xl p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-[#2A1E17] flex items-center space-x-1">
                <span>近期测量流水明细</span>
                <span className="text-[10px] text-[#8C7D73] font-normal">
                  ({meta.records.length}条)
                </span>
              </h4>
              <button
                onClick={() => setShowAddRecordModal(true)}
                className="text-xs font-bold text-[#FF793F] hover:text-[#EA580C] flex items-center space-x-0.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>手动补录</span>
              </button>
            </div>

            <div className="divide-y divide-[#F6F2EC]">
              {meta.records.map((rec, i) => (
                <div key={i} className="py-2.5 flex items-center justify-between text-xs">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-[#2A1E17]">{rec.value}</span>
                      <span className="text-[10px] font-medium text-[#7C6D63] bg-[#F5EFE9] px-1.5 py-0.5 rounded">
                        {rec.tag}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#9E8F84] mt-0.5 block">{rec.time}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-[#15803D] bg-[#F0FDF4] px-2 py-0.5 rounded">
                    {rec.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 社区全科医生专业建议 */}
          <div className="bg-[#FFF8F3] rounded-2xl p-4 space-y-2">
            <div className="flex items-center space-x-1.5">
              <div className="w-4 h-4 rounded-full bg-[#FF793F] text-white flex items-center justify-center text-[10px] font-bold">
                医
              </div>
              <h4 className="text-xs font-bold text-[#B45309]">社区医生与照护建议</h4>
            </div>
            <p className="text-xs text-[#7A6A60] leading-relaxed">{meta.advice}</p>
          </div>
        </div>

        {/* 底部操作工具栏（扁平纯色块，高可用） */}
        <div className="bg-white p-3.5 flex items-center space-x-2">
          <button
            onClick={() => setShowAddRecordModal(true)}
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#FAF8F5] hover:bg-[#F4EFEA] text-[#2C211B] text-xs font-bold flex items-center justify-center space-x-1.5 transition cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#FF793F]" />
            <span>手动录入</span>
          </button>

          <button
            onClick={() => setShowReportModal(true)}
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#FAF8F5] hover:bg-[#F4EFEA] text-[#2C211B] text-xs font-bold flex items-center justify-center space-x-1.5 transition cursor-pointer"
          >
            <FileText className="w-4 h-4 text-[#FF793F]" />
            <span>健康周报</span>
          </button>

          <button
            onClick={handleTransfer}
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#FF793F] hover:bg-[#EA580C] text-white text-xs font-bold flex items-center justify-center space-x-1.5 transition cursor-pointer active:scale-98"
          >
            <Send className="w-4 h-4 text-white" />
            <span>转交医生</span>
          </button>
        </div>
      </div>

      {/* 手动补录弹窗 */}
      {showAddRecordModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-60">
          <div className="bg-white rounded-2xl p-5 max-w-xs w-full space-y-3.5 text-left">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-[#2A1E17]">补录「{meta.title}」数据</h4>
              <button
                onClick={() => setShowAddRecordModal(false)}
                className="w-6 h-6 rounded-full bg-[#F4EFEA] flex items-center justify-center text-[#7A6A60]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-[#7A6A60] block">测量情境标签</label>
              <div className="flex flex-wrap gap-1.5">
                {['晨起静息', '饭前空腹', '饭后2小时', '运动散步后', '睡前静息'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setInputTag(tag)}
                    className={`px-2.5 py-1 rounded-lg text-xs transition cursor-pointer ${
                      inputTag === tag
                        ? 'bg-[#FF793F] text-white font-semibold'
                        : 'bg-[#F6F2EC] text-[#6E6056]'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-[#7A6A60] block">
                {activeMetricId === 'm2' ? '收缩压 (高压) mmHg' : `测量数值 (${currentMetric.unit})`}
              </label>
              <input
                type="number"
                placeholder={activeMetricId === 'm2' ? '例如 120' : '输入测量数值'}
                value={inputVal1}
                onChange={(e) => setInputVal1(e.target.value)}
                className="w-full bg-[#FAF8F5] px-3 py-2 rounded-xl text-sm font-bold text-[#2A1E17] outline-none focus:bg-[#FFF8F3]"
              />
            </div>

            {activeMetricId === 'm2' && (
              <div className="space-y-2">
                <label className="text-xs text-[#7A6A60] block">舒张压 (低压) mmHg</label>
                <input
                  type="number"
                  placeholder="例如 80"
                  value={inputVal2}
                  onChange={(e) => setInputVal2(e.target.value)}
                  className="w-full bg-[#FAF8F5] px-3 py-2 rounded-xl text-sm font-bold text-[#2A1E17] outline-none focus:bg-[#FFF8F3]"
                />
              </div>
            )}

            <div className="pt-2 flex space-x-2">
              <button
                onClick={() => setShowAddRecordModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-[#F6F2EC] text-xs font-bold text-[#6E6056] cursor-pointer"
              >
                取消
              </button>
              <button
                onClick={handleSaveRecord}
                className="flex-1 py-2.5 rounded-xl bg-[#FF793F] text-xs font-bold text-white cursor-pointer active:scale-95 transition"
              >
                保存打卡
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 健康周报预览弹窗 */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-60">
          <div className="bg-white rounded-2xl p-5 max-w-sm w-full space-y-3.5 text-left">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-[#2A1E17]">
                  {currentElderly.name} · {meta.title}健康报告
                </h4>
                <p className="text-[10px] text-[#8C7D73]">周期：近7天 (2024.10.15 ~ 10.21)</p>
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                className="w-6 h-6 rounded-full bg-[#F4EFEA] flex items-center justify-center text-[#7A6A60]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-[#FAF8F5] p-3 rounded-xl space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[#7A6A60]">平均监测值：</span>
                <span className="font-bold text-[#2A1E17]">
                  {meta.avgVal} {currentMetric.unit}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A6A60]">达标合格率：</span>
                <span className="font-bold text-[#15803D]">{meta.complianceRate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A6A60]">综合评定：</span>
                <span className="font-bold text-[#FF793F]">达标平稳，照护评级 A+</span>
              </div>
            </div>

            <div className="text-[11px] text-[#7A6A60] leading-relaxed">
              根据安贞社区卫生站指导意见，当前长辈体征指标平稳，请继续维持规律作息与服药打卡。报告已支持一键分享至家庭微信群或发送给责任医生。
            </div>

            <button
              onClick={() => {
                setShowReportModal(false);
                alert('已生成高清报告卡片，可直接长按保存分享');
              }}
              className="w-full py-2.5 rounded-xl bg-[#FF793F] text-xs font-bold text-white cursor-pointer active:scale-95 transition"
            >
              分享体征报告
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
