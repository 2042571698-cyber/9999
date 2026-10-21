import React, { useState } from 'react';
import {
  LayoutDashboard,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  User,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';
import { SunLogo } from './components/SunLogo';
import Overview from './components/Overview';
import NotificationCenter from './components/NotificationCenter';
import ServiceAssistance from './components/ServiceAssistance';
import CarePlan from './components/CarePlan';
import SettingsView from './components/SettingsView';
import ElderSwitchDrawer from './components/ElderSwitchDrawer';
import {
  TabType,
  ElderlyProfile,
  CareNotification,
  CareServiceItem,
  CarePlanTask,
  MonitoredMetric,
} from './types';
import {
  mockElderlyProfiles,
  mockMonitoredMetrics,
  mockNotifications,
  mockCareServices,
  mockCarePlanTasks,
} from './mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [elderlyList, setElderlyList] = useState<ElderlyProfile[]>(mockElderlyProfiles);
  const [currentElderly, setCurrentElderly] = useState<ElderlyProfile>(mockElderlyProfiles[0]);
  const [isElderDrawerOpen, setIsElderDrawerOpen] = useState(false);
  const [metrics, setMetrics] = useState<MonitoredMetric[]>(mockMonitoredMetrics);
  const [notifications, setNotifications] = useState<CareNotification[]>(mockNotifications);
  const [services, setServices] = useState<CareServiceItem[]>(mockCareServices);
  const [careTasks, setCareTasks] = useState<CarePlanTask[]>(mockCarePlanTasks);

  // 添加新长辈授权
  const handleAddElderly = (newProfile: Partial<ElderlyProfile>) => {
    const newElder: ElderlyProfile = {
      id: `e-${Date.now()}`,
      name: newProfile.name || '长辈',
      avatarText: newProfile.avatarText || '长',
      age: newProfile.age || 70,
      gender: newProfile.gender || 'male',
      relationship: newProfile.relationship || '长辈',
      address: newProfile.address || '北京市朝阳区',
      status: newProfile.status || mockElderlyProfiles[0].status,
      statusSummary: newProfile.statusSummary || '今日正常',
      statusLastCheck: '刚刚',
      authorization: {
        elderlyId: `e-${Date.now()}`,
        elderlyName: newProfile.name || '长辈',
        guardianRelation: `长子 (李明)`,
        scope: '日常照护 · 健康知情',
        status: 'active',
        validUntil: '2028年12月',
        authorizationCode: `YJ-2024-${Math.floor(1000 + Math.random() * 9000)}`,
        signedDate: '2024年10月',
      },
      emergencyContact: {
        name: '李明 (长子)',
        phone: '138-0010-8888',
        hospital: '安贞社区医院',
        hospitalDistance: '1.0公里',
      },
    };
    setElderlyList([...elderlyList, newElder]);
    setCurrentElderly(newElder);
  };

  // 家属确认了解异常
  const handleAcknowledgeNotification = (id: string, feedbackNote?: string) => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    setNotifications((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isAcknowledged: true,
            acknowledgedAt: timeStr,
            acknowledgedBy: '李明 (长子)',
            feedbackNote: feedbackNote || '家属已电话核实',
          };
        }
        return item;
      })
    );
  };

  // 家属将异常转交专业机构
  const handleTransferToProfessional = (id: string, transferType: string, note?: string) => {
    setNotifications((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isAcknowledged: true,
            acknowledgedBy: '李明 (长子)',
            acknowledgedAt: '刚刚',
            transferStatus: transferType === 'hospital_120' ? 'emergency_120' : 'transferred_to_community',
            transferNote: note || (transferType === 'hospital_120' ? '已呼叫120急救中心' : '已转交安贞社区卫生站'),
          };
        }
        return item;
      })
    );
  };

  // 补充服务必要信息
  const handleUpdateSupplementalInfo = (serviceId: string, key: string, value: string) => {
    setServices((prev) =>
      prev.map((srv) => {
        if (srv.id === serviceId && srv.supplementalInfo) {
          return {
            ...srv,
            supplementalInfo: srv.supplementalInfo.map((info) => {
              if (info.key === key) {
                return { ...info, value, submitted: true };
              }
              return info;
            }),
          };
        }
        return srv;
      })
    );
  };

  // 创建新预约服务
  const handleCreateNewServiceOrder = (newSrv: Partial<CareServiceItem>) => {
    const newOrder: CareServiceItem = {
      id: `srv-${Date.now()}`,
      title: newSrv.title || '上门助浴',
      category: newSrv.category || 'daily_assist',
      elderlyName: currentElderly.name,
      orderNumber: `NY${Date.now().toString().slice(-6)}`,
      applyTime: '刚刚',
      currentStepIndex: 1, // 受理中
      price: newSrv.price || 120,
      steps: newSrv.steps || [
        {
          stepId: 'submitted',
          stepName: '提交申请',
          status: 'completed',
          timestamp: '刚刚',
          operatorName: '李明 (长子)',
          description: '提交预约需求',
        },
        {
          stepId: 'accepted',
          stepName: '机构受理',
          status: 'current',
          timestamp: '处理中',
          operatorName: '暖阳调度中心',
          description: '正在匹配合适护工',
        },
        {
          stepId: 'scheduled',
          stepName: '人员安排',
          status: 'pending',
          description: '护工接单确认',
        },
        {
          stepId: 'executing',
          stepName: '上门执行',
          status: 'pending',
          description: '上门服务并录入照护记录',
        },
        {
          stepId: 'completed',
          stepName: '验收完成',
          status: 'pending',
          description: '家属在线签字验收',
        },
      ],
      serviceStaff: {
        name: '王金芳',
        role: '专业金牌照护师',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
        phone: '139-1122-8899',
        rating: 4.95,
        company: '暖阳安康养老服务',
      },
      supplementalInfo: [
        { key: 'notes', label: '特殊健康禁忌或喜好', submitted: false },
        { key: 'doorCode', label: '单元门禁密码', submitted: false },
      ],
    };

    setServices([newOrder, ...services]);
    setActiveTab('services');
  };

  // 照护任务状态切换打卡
  const handleToggleTaskStatus = (taskId: string) => {
    setCareTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const nextCompleted = t.status !== 'completed';
          return {
            ...t,
            status: nextCompleted ? 'completed' : 'pending',
            completedAt: nextCompleted ? '刚刚' : undefined,
            completedBy: nextCompleted ? '李明' : undefined,
          };
        }
        return t;
      })
    );
  };

  // 添加照护任务
  const handleAddTask = (task: Partial<CarePlanTask>) => {
    const newTask: CarePlanTask = {
      id: `task-${Date.now()}`,
      title: task.title || '新安排',
      category: task.category || 'life',
      scheduledTime: task.scheduledTime || '今日',
      boundary: task.boundary || 'assistable',
      assigneeName: task.assigneeName || '李明',
      assigneeRole: '长子',
      status: 'pending',
      sharingBasis: '基于李建国签署的家庭全权共享协议',
      notes: task.notes || '日常照料打卡',
    };
    setCareTasks([...careTasks, newTask]);
  };

  // 未处理紧急通知数
  const urgentCount = notifications.filter(
    (n) => n.category === 'urgent_attention' && !n.isAcknowledged
  ).length;

  // 计算当前长辈实际综合状态（杜绝异常存在时显示今日正常）
  const elderStatusBadge = urgentCount > 0
    ? { text: `${urgentCount}项待关注`, isUrgent: true }
    : { text: currentElderly.statusSummary || '体征平稳', isUrgent: false };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C211B] font-sans flex flex-col selection:bg-[#FFE3D1] selection:text-[#E65100]">
      {/* 顶部通栏（扁平插画风，纯平无描边） */}
      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-40 px-4 py-3 shadow-xs">
        <div className="max-w-md mx-auto flex items-center justify-between">
          {/* 暖阳专属矢量 SVG Logo 与品牌标识 */}
          <div className="flex items-center space-x-2.5">
            <SunLogo className="w-8 h-8 shrink-0" size={32} />
            <div>
              <div className="flex items-center space-x-1.5 leading-tight">
                <span className="font-bold text-base text-[#2A1E17] tracking-tight">暖阳</span>
                <span className="text-[10px] font-bold text-[#E65100] bg-[#FFF2EB] px-2 py-0.5 rounded-lg">
                  家属端
                </span>
              </div>
              <p className="text-[10px] text-[#7C6D64] mt-0.5 leading-none">
                居家养老服务平台
              </p>
            </div>
          </div>

          {/* 顶部守护长辈切换入口（扁平插画风，纯色大块，无描边，防止挤压折行） */}
          <button
            onClick={() => setIsElderDrawerOpen(true)}
            className="flex items-center space-x-1.5 bg-[#FAF8F5] hover:bg-[#F3EFE9] active:bg-[#ECE5DC] px-2.5 py-1.5 rounded-xl transition cursor-pointer group shrink-0"
            title="点击切换守护长辈"
          >
            {/* 头像 */}
            <div className="relative shrink-0">
              <div className="w-6 h-6 rounded-full bg-[#EFE9E2] text-[#4A3B32] flex items-center justify-center font-bold text-xs">
                {currentElderly.avatarText}
              </div>
              <span
                className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full ring-1 ring-white ${
                  elderStatusBadge.isUrgent ? 'bg-red-500' : 'bg-emerald-500'
                }`}
              />
            </div>

            {/* 名字与亲属关系 */}
            <div className="flex items-center space-x-1 text-left whitespace-nowrap shrink-0">
              <span className="text-xs font-bold text-[#2A1E17] group-hover:text-[#E65100] transition">
                {currentElderly.name}
              </span>
              <span className="text-[10px] text-[#78695E] bg-[#EFE8DF] px-1.5 py-0.5 rounded-md font-medium">
                {currentElderly.relationship}
              </span>
            </div>

            {/* 真实状态标签（无描边纯色块） */}
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-md whitespace-nowrap shrink-0 ${
                elderStatusBadge.isUrgent
                  ? 'text-[#DC2626] bg-[#FEE2E2]'
                  : 'text-[#059669] bg-[#ECFDF5]'
              }`}
            >
              {elderStatusBadge.text}
            </span>

            {/* 下拉微三角 */}
            <ChevronDown className="w-3.5 h-3.5 text-[#8C7D73] group-hover:text-[#2A1E17] transition-colors shrink-0" />
          </button>

        </div>
      </header>

      {/* 主视图内容区域 */}
      <main className="flex-1">
        {activeTab === 'overview' && (
          <Overview
            elderlyList={elderlyList}
            currentElderly={currentElderly}
            onSelectElderly={(e) => setCurrentElderly(e)}
            onOpenElderDrawer={() => setIsElderDrawerOpen(true)}
            metrics={metrics}
            notifications={notifications}
            services={services}
            careTasks={careTasks}
            onNavigateTab={(tab) => setActiveTab(tab)}
            onAcknowledgeNotification={handleAcknowledgeNotification}
            onTransferToProfessional={handleTransferToProfessional}
          />
        )}

        {activeTab === 'notifications' && (
          <NotificationCenter
            notifications={notifications}
            currentElderly={currentElderly}
            onAcknowledge={handleAcknowledgeNotification}
            onTransferToProfessional={handleTransferToProfessional}
          />
        )}

        {activeTab === 'services' && (
          <ServiceAssistance
            services={services}
            onUpdateSupplementalInfo={handleUpdateSupplementalInfo}
            onCreateNewServiceOrder={handleCreateNewServiceOrder}
          />
        )}

        {activeTab === 'careplan' && (
          <CarePlan
            tasks={careTasks}
            currentElderly={currentElderly}
            onToggleTaskStatus={handleToggleTaskStatus}
            onAddTask={handleAddTask}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsView
            currentElderly={currentElderly}
            elderlyList={elderlyList}
          />
        )}
      </main>

      {/* 底部 5 栏导航栏（扁平插画风，无描边，纯色平底） */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md z-50 py-2 shadow-lg">
        <div className="max-w-md mx-auto grid grid-cols-5 px-2">
          {[
            { id: 'overview', label: '总览', icon: LayoutDashboard },
            { id: 'notifications', label: '消息', icon: Bell, badge: urgentCount },
            { id: 'services', label: '服务', icon: BriefcaseBusiness },
            { id: 'careplan', label: '计划', icon: CalendarDays },
            { id: 'settings', label: '设置', icon: User },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            const TabIcon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className="flex flex-col items-center justify-center py-1 transition-colors relative cursor-pointer"
              >
                <div className="relative">
                  <TabIcon
                    className={`w-5 h-5 transition-colors ${
                      isActive ? 'text-[#FF793F] stroke-[2.2]' : 'text-[#7C6E65] stroke-[1.75]'
                    }`}
                  />

                  {tab.badge && tab.badge > 0 ? (
                    <span className="absolute -top-1 -right-2 bg-[#DC2626] text-white text-[10px] font-bold h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center leading-none">
                      {tab.badge}
                    </span>
                  ) : null}
                </div>

                <span
                  className={`text-[10px] mt-1 tracking-tight ${
                    isActive ? 'font-bold text-[#FF793F]' : 'font-medium text-[#6B5D54]'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* 切换长辈专属底部抽屉 */}
      <ElderSwitchDrawer
        isOpen={isElderDrawerOpen}
        onClose={() => setIsElderDrawerOpen(false)}
        elderlyList={elderlyList}
        currentElderly={currentElderly}
        onSelectElderly={(elderly) => setCurrentElderly(elderly)}
        onAddElderly={handleAddElderly}
      />
    </div>
  );
}
