export type TabType = 'overview' | 'notifications' | 'services' | 'careplan' | 'settings';

export enum ElderlyStatus {
  Safe = 'safe',
  Attention = 'attention',
  Emergency = 'emergency',
}

// 操作权限边界
export type OperationBoundary = 'view_only' | 'assistable' | 'elderly_confirm';

// 授权信息
export interface ElderlyAuthorization {
  elderlyId: string;
  elderlyName: string;
  guardianRelation: string; // 比如：长子、女儿
  scope: string; // "全权照护协同与健康知情"
  status: 'active' | 'pending_renew' | 'limited';
  validUntil: string;
  authorizationCode: string;
  signedDate: string;
}

// 健康体征指标（包含更新时间与数据来源）
export interface MonitoredMetric {
  id: string;
  name: string;
  value: string | number;
  unit: string;
  status: 'normal' | 'abnormal_high' | 'abnormal_low' | 'attention';
  statusText: string;
  source: string; // 例如: "智能健康腕表"、"欧姆龙蓝牙血压计"、"长辈自测录入"
  updatedAt: string; // 例如: "10分钟前"、"07:30"
  referenceRange: string;
}

// 血压心率走势数据点
export interface VitalTrendPoint {
  date: string;
  time?: string;
  systolic: number; // 收缩压 (高压)
  diastolic: number; // 舒张压 (低压)
  heartRate: number; // 心率 (bpm)
  status: 'normal' | 'attention';
}

// 睡眠分析数据
export interface SleepAnalysis {
  totalHours: number;
  score: number;
  statusText: string;
  startTime: string;
  endTime: string;
  deepHours: number;
  deepPct: number;
  lightHours: number;
  lightPct: number;
  remHours: number;
  remPct: number;
  awakeHours: number;
  awakePct: number;
  timeline: {
    start: string;
    end: string;
    stage: 'deep' | 'light' | 'rem' | 'awake';
    stageName: string;
  }[];
}

// 步数柱状图数据点
export interface DailyStepPoint {
  day: string;
  steps: number;
  target: number;
  isToday?: boolean;
}

// 异常通知与提醒
export interface CareNotification {
  id: string;
  category: 'urgent_attention' | 'service_update' | 'routine_care'; // 紧急关注事件 vs 普通服务更新
  level: 'critical' | 'warning' | 'normal';
  title: string;
  summary: string;
  detail: string;
  timestamp: string;
  sourceDevice: string;
  location: string;
  isAcknowledged: boolean; // 是否已确认了解
  acknowledgedAt?: string;
  acknowledgedBy?: string;
  feedbackNote?: string;
  requiresProfessional: boolean; // 是否需要专业医护人员处置
  transferStatus?: 'none' | 'transferred_to_clinic' | 'transferred_to_community' | 'emergency_120';
  transferNote?: string;
  vitalContext?: {
    metricName: string;
    value: string;
  };
}

// 服务办理处理节点
export interface ServiceProcessStep {
  stepId: 'submitted' | 'accepted' | 'scheduled' | 'executing' | 'completed';
  stepName: string; // 提交申请、机构受理、人员安排、上门执行、验收完成
  status: 'completed' | 'current' | 'pending';
  timestamp?: string;
  operatorName?: string;
  operatorRole?: string;
  operatorPhone?: string;
  description: string;
  isSupplementalRequired?: boolean; // 是否需要家属补充信息
}

// 服务事项
export interface CareServiceItem {
  id: string;
  title: string;
  category: 'medical_care' | 'home_nursing' | 'daily_assist' | 'escort';
  elderlyName: string;
  orderNumber: string;
  applyTime: string;
  currentStepIndex: number; // 0..4
  steps: ServiceProcessStep[];
  serviceStaff?: {
    name: string;
    role: string;
    avatar: string;
    phone: string;
    rating: number;
    company: string;
  };
  supplementalInfo?: {
    key: string;
    label: string;
    value?: string;
    submitted: boolean;
  }[];
  price: number;
}

// 照护计划任务
export interface CarePlanTask {
  id: string;
  title: string;
  category: 'medication' | 'health_check' | 'outpatient' | 'rehab' | 'life';
  scheduledTime: string;
  boundary: OperationBoundary; // 'view_only' | 'assistable' | 'elderly_confirm'
  assigneeName: string;
  assigneeRole: string; // "大儿子 李明" | "管家兼护士 王主管" | "二女儿 李华"
  status: 'pending' | 'in_progress' | 'completed' | 'waiting_elderly';
  sharingBasis: string; // 共享依据："基于李建国签署的家庭全权共享协议"
  notes: string;
  completedAt?: string;
  completedBy?: string;
}

// 老人完整档案
export interface ElderlyProfile {
  id: string;
  name: string;
  avatarText: string;
  age: number;
  gender: 'male' | 'female';
  relationship: string;
  address: string;
  status: ElderlyStatus;
  statusSummary: string;
  statusLastCheck: string;
  authorization: ElderlyAuthorization;
  emergencyContact: {
    name: string;
    phone: string;
    hospital: string;
    hospitalDistance: string;
  };
}
