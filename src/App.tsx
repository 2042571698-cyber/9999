import React, { useState } from 'react';
import {
  LayoutDashboard,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  User,
} from 'lucide-react';

import Overview from './components/Overview';
import NotificationCenter from './components/NotificationCenter';
import ServiceAssistance from './components/ServiceAssistance';
import CarePlan from './components/CarePlan';
import SettingsView from './components/SettingsView';
import ElderSwitchDrawer from './components/ElderSwitchDrawer';
import { ElderGatewayView } from './components/ElderGatewayView';
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
  // 开屏长辈选择器状态（默认开屏呈现，需先选择看哪个老人后才进入首页）
  const [isGatewayOpen, setIsGatewayOpen] = useState(true);

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
      title: newSrv.title || '预约服务',
      category: newSrv.category || 'medical_care',
      elderlyName: currentElderly.name,
      orderNumber: `FW2024${Math.floor(1000 + Math.random() * 9000)}`,
      applyTime: '刚刚',
      currentStepIndex: 0,
      price: newSrv.price || 120,
      steps: [
        {
          stepId: 'submitted',
          stepName: '提交',
          status: 'completed',
          timestamp: '刚刚',
          operatorName: '李明 (长子)',
          description: '提交预约申请',
        },
        {
          stepId: 'accepted',
          stepName: '受理',
          status: 'current',
          description: '等待社区养老服务调度中心接单',
        },
        {
          stepId: 'scheduled',
          stepName: '安排',
          status: 'pending',
          description: '派发专业护理员与陪诊员',
        },
        {
          stepId: 'executing',
          stepName: '执行',
          status: 'pending',
          description: '上门服务与现场执行',
        },
        {
          stepId: 'completed',
          stepName: '完成',
          status: 'pending',
          description: '家属服务核销与评价',
        },
      ],
    };
    setServices([newOrder, ...services]);
  };

  // 照护计划打卡
  const handleToggleTaskStatus = (taskId: string) => {
    setCareTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          const isDone = task.status === 'completed';
          return {
            ...task,
            status: isDone ? 'pending' : 'completed',
            completedAt: isDone ? undefined : '刚刚',
            completedBy: isDone ? undefined : '李明 (长子)',
          };
        }
        return task;
      })
    );
  };

  // 添加新任务
  const handleAddTask = (taskData: Partial<CarePlanTask>) => {
    const newTask: CarePlanTask = {
      id: `task-${Date.now()}`,
      title: taskData.title || '新日常安排',
      category: taskData.category || 'life',
      scheduledTime: taskData.scheduledTime || '全天',
      boundary: taskData.boundary || 'assistable',
      assigneeName: '李明',
      assigneeRole: '大儿子 李明',
      status: 'pending',
      sharingBasis: `基于${currentElderly.name}签署的家庭全权共享协议`,
      notes: taskData.notes || '日常协同事项',
    };
    setCareTasks([...careTasks, newTask]);
  };

  // 统计紧急未处理异常数
  const urgentCount = notifications.filter(
    (n) => n.category === 'urgent_attention' && !n.isAcknowledged
  ).length;

  // 计算当前长辈实际综合状态（统一暖色系，杜绝绿黄蓝）
  const elderStatusBadge = urgentCount > 0
    ? { text: `${urgentCount}项待关注`, isUrgent: true }
    : { text: currentElderly.statusSummary || '体征平稳', isUrgent: false };

  // 开屏双长辈选择页面（优先呈现，用户选定后再进入主页）
  if (isGatewayOpen) {
    return (
      <ElderGatewayView
        elderlyList={elderlyList}
        onSelectElder={(elder) => {
          setCurrentElderly(elder);
          setIsGatewayOpen(false);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2A1E17] font-sans flex flex-col selection:bg-[#FFE3D1] selection:text-[#EA580C]">


      {/* 主视图内容区域 */}
      <main className="flex-1">
        {activeTab === 'overview' && (
          <Overview
            elderlyList={elderlyList}
            currentElderly={currentElderly}
            onSelectElderly={(e) => setCurrentElderly(e)}
            onOpenElderDrawer={() => setIsElderDrawerOpen(true)}
            onOpenGateway={() => setIsGatewayOpen(true)}
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

      {/* 底部 5 栏导航栏（纯暖色排版，无描边） */}
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
                      isActive ? 'text-[#FF793F] stroke-[2.2]' : 'text-[#8C7D73] stroke-[1.75]'
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
                    isActive ? 'font-bold text-[#FF793F]' : 'font-medium text-[#7C6E65]'
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
        onOpenGateway={() => setIsGatewayOpen(true)}
      />
    </div>
  );
}
