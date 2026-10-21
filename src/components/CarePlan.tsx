import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Clock,
  Plus,
  Check,
  User,
  Shield,
  Eye,
  HandHelping,
  Lock,
  X,
  Sparkles,
  Pill,
  HeartPulse,
} from 'lucide-react';
import { CarePlanTask, OperationBoundary, ElderlyProfile } from '../types';

interface CarePlanProps {
  tasks: CarePlanTask[];
  currentElderly: ElderlyProfile;
  onToggleTaskStatus: (taskId: string) => void;
  onAddTask: (task: Partial<CarePlanTask>) => void;
}

export default function CarePlan({
  tasks,
  currentElderly,
  onToggleTaskStatus,
  onAddTask,
}: CarePlanProps) {
  const [filterBoundary, setFilterBoundary] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // 新任务表单
  const [newTitle, setNewTitle] = useState('晚间降压药提醒');
  const [newTime, setNewTime] = useState('20:00');
  const [newBoundary, setNewBoundary] = useState<OperationBoundary>('assistable');
  const [newAssignee, setNewAssignee] = useState('李明 (长子)');

  // 边界徽章显示
  const renderBoundaryTag = (boundary: OperationBoundary) => {
    switch (boundary) {
      case 'assistable':
        return (
          <span className="inline-flex items-center text-[10px] font-bold text-[#D95D24] bg-[#FFF2EB] border border-[#FCD7C2] px-2 py-0.5 rounded-full">
            <HandHelping className="w-3 h-3 mr-1 text-[#FF7528]" />
            家属可协助
          </span>
        );
      case 'elderly_confirm':
        return (
          <span className="inline-flex items-center text-[10px] font-bold text-[#6D28D9] bg-[#F5F3FF] border border-[#DDD6FE] px-2 py-0.5 rounded-full">
            <Lock className="w-3 h-3 mr-1 text-[#7C3AED]" />
            需长辈本人确认
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center text-[10px] font-bold text-[#64748B] bg-[#F1F5F9] border border-[#E2E8F0] px-2 py-0.5 rounded-full">
            <Eye className="w-3 h-3 mr-1 text-[#64748B]" />
            仅供知情查看
          </span>
        );
    }
  };

  const filteredTasks = tasks.filter((t) => {
    if (filterBoundary === 'all') return true;
    return t.boundary === filterBoundary;
  });

  const handleCreateTask = () => {
    onAddTask({
      title: newTitle,
      scheduledTime: newTime,
      boundary: newBoundary,
      assigneeName: newAssignee,
    });
    setShowAddModal(false);
  };

  const completedCount = tasks.filter((t) => t.status === 'completed').length;
  const progressPct = Math.round((completedCount / (tasks.length || 1)) * 100);

  return (
    <div className="pb-28 max-w-md mx-auto px-4 pt-3 space-y-4">
      {/* 顶部标题与新建任务 */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#2A1E17] tracking-tight">
            家庭照护协同
          </h1>
          <p className="text-xs text-[#827166] mt-0.5">
            家庭成员已确认的日常安排与照护任务
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-1.5 py-2 px-3.5 rounded-full bg-gradient-to-r from-[#FF8842] to-[#FF6525] text-white text-xs font-bold shadow-[0_3px_12px_rgba(255,101,37,0.25)] hover:brightness-105 active:scale-95 transition"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>加任务</span>
        </button>
      </header>

      {/* 照护进度概览卡片 */}
      <section className="bg-gradient-to-br from-[#FFFBF7] via-[#FFF5EC] to-[#FFEDE0] rounded-xl border border-[#FDE5D2] p-4 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-[#FF7528]" />
            <span className="text-xs font-bold text-[#2C211B]">
              今日协同进度
            </span>
          </div>
          <span className="text-xs font-extrabold text-[#E65100]">
            已完成 {completedCount}/{tasks.length} 项 ({progressPct}%)
          </span>
        </div>

        {/* 温暖双色进度条 */}
        <div className="w-full bg-[#EADBCE] h-2.5 rounded-full overflow-hidden p-0.5">
          <div
            style={{ width: `${progressPct}%` }}
            className="h-full bg-gradient-to-r from-[#FF8E4D] to-[#FF6422] rounded-full transition-all duration-500 shadow-xs"
          />
        </div>

        {/* 共享依据说明 */}
        <div className="mt-3 pt-2.5 border-t border-[#F5E2D2] flex items-center justify-between text-[11px] text-[#8C7A70]">
          <span className="flex items-center">
            <Shield className="w-3 h-3 mr-1 text-[#FF7528]" />
            共享依据: {currentElderly.authorization.scope}
          </span>
          <span className="text-[#18794E] font-medium">授权生效中</span>
        </div>
      </section>

      {/* 权限边界筛选胶囊 */}
      <div className="flex space-x-1.5 overflow-x-auto no-scrollbar py-0.5">
        {[
          { key: 'all', label: `全部任务 (${tasks.length})` },
          { key: 'assistable', label: '家属可协助' },
          { key: 'elderly_confirm', label: '需老人确认' },
          { key: 'view_only', label: '仅限查看' },
        ].map((btn) => {
          const isActive = filterBoundary === btn.key;
          return (
            <button
              key={btn.key}
              onClick={() => setFilterBoundary(btn.key)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-xs ${
                isActive
                  ? 'bg-gradient-to-r from-[#FF8742] to-[#FF6525] text-white shadow-[0_3px_10px_rgba(255,101,37,0.25)]'
                  : 'bg-white text-[#635349] border border-[#EADBCE] hover:bg-[#FFFDFB]'
              }`}
            >
              {btn.label}
            </button>
          );
        })}
      </div>

      {/* 任务列表 */}
      <div className="space-y-3">
        {filteredTasks.map((t) => {
          const isCompleted = t.status === 'completed';

          return (
            <article
              key={t.id}
              className={`p-4 rounded-xl border transition-all ${
                isCompleted
                  ? 'bg-[#FAF7F2] border-[#EADBCE] opacity-80'
                  : 'bg-white border-[#EFE8DF] shadow-xs'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {/* 打卡勾选按钮 */}
                  <button
                    onClick={() => onToggleTaskStatus(t.id)}
                    className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                      isCompleted
                        ? 'bg-[#18794E] text-white shadow-xs'
                        : 'border-2 border-[#D8C7B8] hover:border-[#FF7836] bg-white'
                    }`}
                  >
                    {isCompleted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </button>

                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-[#E65100] flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {t.scheduledTime}
                      </span>
                      {renderBoundaryTag(t.boundary)}
                    </div>

                    <h3
                      className={`text-sm font-bold mt-1 ${
                        isCompleted ? 'line-through text-[#998A80]' : 'text-[#2C211B]'
                      }`}
                    >
                      {t.title}
                    </h3>

                    <p className="text-xs text-[#736359] mt-0.5">
                      {t.notes}
                    </p>

                    <div className="mt-2 text-[11px] text-[#938379] flex items-center space-x-3">
                      <span>协同负责人: {t.assigneeName}</span>
                      {t.completedAt && (
                        <span className="text-[#18794E] font-medium">
                          {t.completedBy} 于 {t.completedAt} 完成打卡
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* 新建任务弹窗 */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#2D211A]/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-5 max-w-xs w-full shadow-2xl space-y-3.5 border border-[#EDE2D4]">
            <div className="flex items-center justify-between pb-2 border-b border-[#F2ECE3]">
              <h3 className="text-sm font-bold text-[#2A1E17]">
                添加家庭照护安排
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-7 h-7 rounded-lg bg-[#FAF6F0] flex items-center justify-center text-[#7A6A60]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#3C2F27] block mb-1">
                  任务事项
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#EADBCE] rounded-lg p-2 text-xs text-[#3A2C23] focus:outline-none focus:border-[#FF7836]"
                  placeholder="例如: 睡前测量血压"
                />
              </div>

              <div>
                <label className="font-bold text-[#3C2F27] block mb-1">
                  提醒时间
                </label>
                <input
                  type="text"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#EADBCE] rounded-lg p-2 text-xs text-[#3A2C23] focus:outline-none"
                  placeholder="20:00"
                />
              </div>

              <div>
                <label className="font-bold text-[#3C2F27] block mb-1">
                  家属操作权限边界
                </label>
                <select
                  value={newBoundary}
                  onChange={(e) => setNewBoundary(e.target.value as OperationBoundary)}
                  className="w-full bg-[#FAF7F2] border border-[#EADBCE] rounded-lg p-2 text-xs text-[#3A2C23] focus:outline-none"
                >
                  <option value="assistable">家属可协助 (可代长辈勾选打卡)</option>
                  <option value="elderly_confirm">需长辈本人确认 (智能药盒/手环感应)</option>
                  <option value="view_only">仅供知情查看 (医生专业处方记录)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#3C2F27] block mb-1">
                  指派家庭成员
                </label>
                <input
                  type="text"
                  value={newAssignee}
                  onChange={(e) => setNewAssignee(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#EADBCE] rounded-lg p-2 text-xs text-[#3A2C23] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="py-2 rounded-lg border border-[#EADBCE] text-xs font-bold text-[#6D5D53]"
              >
                取消
              </button>
              <button
                onClick={handleCreateTask}
                className="py-2 rounded-lg bg-gradient-to-r from-[#FF8842] to-[#FF6525] text-white text-xs font-bold shadow-xs hover:brightness-105 transition"
              >
                保存任务
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
