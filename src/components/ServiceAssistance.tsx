import React, { useState } from 'react';
import {
  PlusCircle,
  Phone,
  Check,
  Clock,
  User,
  CheckCircle2,
  Calendar,
  Sparkles,
  ChevronRight,
  X,
  Stethoscope,
  HeartHandshake,
  ShieldCheck,
  Star,
} from 'lucide-react';
import { CareServiceItem } from '../types';

interface ServiceAssistanceProps {
  services: CareServiceItem[];
  onUpdateSupplementalInfo: (serviceId: string, key: string, value: string) => void;
  onCreateNewServiceOrder: (newService: Partial<CareServiceItem>) => void;
}

export default function ServiceAssistance({
  services,
  onUpdateSupplementalInfo,
  onCreateNewServiceOrder,
}: ServiceAssistanceProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(services[0]?.id || '');
  const [showNewServiceModal, setShowNewServiceModal] = useState(false);
  const [supplementalInput, setSupplementalInput] = useState<{ [key: string]: string }>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [contactStaffModal, setContactStaffModal] = useState<any | null>(null);

  // 新建服务表单状态
  const [newTitle, setNewTitle] = useState('上门助浴与理发');
  const [newCategory, setNewCategory] = useState<'medical_care' | 'home_nursing' | 'daily_assist' | 'escort'>('daily_assist');
  const [newPrice, setNewPrice] = useState(128);

  const currentService = services.find((s) => s.id === selectedServiceId) || services[0];

  const handleSaveSupplemental = (serviceId: string, key: string) => {
    const val = supplementalInput[`${serviceId}-${key}`];
    if (val && val.trim()) {
      onUpdateSupplementalInfo(serviceId, key, val.trim());
      setToastMessage('已成功补充信息，服务人员已同步知悉');
      setTimeout(() => setToastMessage(null), 2500);
    }
  };

  const handleCreateOrder = () => {
    onCreateNewServiceOrder({
      title: newTitle,
      category: newCategory,
      price: newPrice,
    });
    setShowNewServiceModal(false);
    setToastMessage('预约申请已提交，调度中心正在受理');
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <div className="pb-28 max-w-md mx-auto px-4 pt-3 space-y-4">
      {/* 顶部标题与新建服务预约 */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#2A1E17] tracking-tight">
            服务协助与办理
          </h1>
          <p className="text-xs text-[#827166] mt-0.5">
            全流程节点透明跟踪与家属信息协同
          </p>
        </div>

        <button
          onClick={() => setShowNewServiceModal(true)}
          className="flex items-center space-x-1.5 py-2 px-3.5 rounded-full bg-gradient-to-r from-[#FF8842] to-[#FF6525] text-white text-xs font-bold shadow-[0_3px_12px_rgba(255,101,37,0.25)] hover:brightness-105 active:scale-95 transition"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>预约服务</span>
        </button>
      </header>

      {/* 服务单据水平滑块选择 */}
      <div className="flex space-x-2.5 overflow-x-auto no-scrollbar py-1">
        {services.map((srv) => {
          const isSelected = srv.id === currentService?.id;
          const isCompleted = srv.currentStepIndex >= 4;

          return (
            <button
              key={srv.id}
              onClick={() => setSelectedServiceId(srv.id)}
              className={`p-3 rounded-xl min-w-[200px] text-left border transition-all shrink-0 ${
                isSelected
                  ? 'border-2 border-[#FF7836] bg-[#FFF9F3] shadow-[0_3px_12px_rgba(255,120,54,0.1)]'
                  : 'border-[#EDE4D9] bg-white hover:border-[#DDCBBE]'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-[#2C211B] truncate max-w-[120px]">
                  {srv.title}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isCompleted
                      ? 'bg-[#E8F8F0] text-[#18794E]'
                      : 'bg-[#FFF0E6] text-[#E65100]'
                  }`}
                >
                  {isCompleted ? '已完成' : '办理中'}
                </span>
              </div>
              <div className="text-[11px] text-[#8C7B71]">
                单号: {srv.orderNumber}
              </div>
              <div className="text-xs font-bold text-[#E65100] mt-1">
                ¥{srv.price}
              </div>
            </button>
          );
        })}
      </div>

      {currentService && (
        <div className="space-y-4">
          {/* 5 阶段服务流程透明节点卡片 */}
          <section className="bg-white rounded-xl border border-[#EFE8DF] p-4 shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-[#F4EFE8]">
              <div>
                <h2 className="text-base font-bold text-[#2C211B]">
                  {currentService.title}
                </h2>
                <p className="text-xs text-[#8A796F] mt-0.5">
                  申请时间: {currentService.applyTime} · 为「{currentService.elderlyName}」办理
                </p>
              </div>
              <span className="text-sm font-bold text-[#FF6525]">
                ¥{currentService.price}
              </span>
            </div>

            {/* 5 步状态流转节点 */}
            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#EADBCE]">
              {currentService.steps.map((step, idx) => {
                const isPast = idx < currentService.currentStepIndex;
                const isCurrent = idx === currentService.currentStepIndex;

                return (
                  <div key={step.stepId} className="relative group">
                    {/* 节点圆形图标 */}
                    <div
                      className={`absolute -left-6 top-0 w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                        isPast
                          ? 'bg-[#18794E] text-white shadow-xs'
                          : isCurrent
                          ? 'bg-[#FF7528] text-white ring-4 ring-[#FFE3D1]'
                          : 'bg-[#EDE4D9] text-[#9E8E84]'
                      }`}
                    >
                      {isPast ? (
                        <Check className="w-3 h-3 stroke-[3]" />
                      ) : (
                        <span className="text-[10px] font-bold">{idx + 1}</span>
                      )}
                    </div>

                    {/* 节点内容 */}
                    <div className="ml-2">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-bold ${
                            isCurrent
                              ? 'text-[#FF6525] text-sm'
                              : isPast
                              ? 'text-[#2C211B]'
                              : 'text-[#96867B]'
                          }`}
                        >
                          {step.stepName}
                          {isCurrent && (
                            <span className="ml-2 text-[10px] font-semibold text-[#FF6525] bg-[#FFF2EB] px-2 py-0.5 rounded-full">
                              进行中
                            </span>
                          )}
                        </span>
                        <span className="text-[10px] text-[#9E8E84]">
                          {step.timestamp || '待到达'}
                        </span>
                      </div>

                      <p className="text-xs text-[#635349] mt-0.5">
                        {step.description}
                      </p>

                      {step.operatorName && (
                        <div className="text-[11px] text-[#8C7A70] mt-1">
                          经办人: {step.operatorName}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 专属服务护工/专员信息 */}
          {currentService.serviceStaff && (
            <section className="bg-white rounded-xl border border-[#EFE8DF] p-4 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={currentService.serviceStaff.avatar}
                      alt={currentService.serviceStaff.name}
                      className="w-12 h-12 rounded-xl object-cover border border-[#EFE8DF] shadow-xs"
                    />
                    <span className="absolute -bottom-1 -right-1 bg-[#18794E] text-white text-[9px] px-1 rounded-full font-bold">
                      认证
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center space-x-1.5">
                      <h3 className="text-sm font-bold text-[#2A1E17]">
                        {currentService.serviceStaff.name}
                      </h3>
                      <span className="text-[11px] text-[#8C5D39] bg-[#FFF0E2] px-2 py-0.2 rounded-full font-medium">
                        {currentService.serviceStaff.role}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-[11px] text-[#7A6A60] mt-0.5">
                      <span>{currentService.serviceStaff.company}</span>
                      <span className="flex items-center text-[#E65100] font-bold">
                        <Star className="w-3 h-3 fill-current mr-0.5" />
                        {currentService.serviceStaff.rating}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setContactStaffModal(currentService.serviceStaff)}
                  className="flex items-center space-x-1 py-1.5 px-3 rounded-lg bg-white hover:bg-[#FAF6F0] text-[#4A392F] text-xs font-bold border border-[#EADBCE] shadow-xs transition"
                >
                  <Phone className="w-3.5 h-3.5 text-[#FF7528]" />
                  <span>联系电话</span>
                </button>
              </div>
            </section>
          )}

          {/* 家属信息补充与协助 */}
          {currentService.supplementalInfo && currentService.supplementalInfo.length > 0 && (
            <section className="bg-gradient-to-br from-[#FFFBF7] to-[#FFF5EC] rounded-xl border border-[#FBE3D0] p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <HeartHandshake className="w-4 h-4 text-[#FF7528]" />
                  <h3 className="text-sm font-bold text-[#2C211B]">
                    家属协助：补充上门注意事项
                  </h3>
                </div>
                <span className="text-[11px] text-[#A66E48]">协同提醒</span>
              </div>

              <p className="text-xs text-[#736359] leading-relaxed">
                服务人员上门前，请补充老人居住门禁、饮食或身体禁忌，保障照护顺利。
              </p>

              <div className="space-y-2.5 pt-1">
                {currentService.supplementalInfo.map((info) => {
                  const inputKey = `${currentService.id}-${info.key}`;

                  return (
                    <div key={info.key} className="bg-white p-3 rounded-xl border border-[#F0E4D7] space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-[#3B2E26]">
                          {info.label}
                        </label>
                        {info.submitted && (
                          <span className="text-[10px] text-[#18794E] bg-[#E8F8F0] px-2 py-0.5 rounded-full font-bold">
                            已录入
                          </span>
                        )}
                      </div>

                      <div className="flex space-x-2">
                        <input
                          type="text"
                          defaultValue={info.value || ''}
                          placeholder="例如: 单元门密码或腰椎曾有术后骨折"
                          onChange={(e) =>
                            setSupplementalInput({
                              ...supplementalInput,
                              [inputKey]: e.target.value,
                            })
                          }
                          className="flex-1 bg-[#FAF7F2] border border-[#EADBCE] rounded-xl px-3 py-1.5 text-xs text-[#33261F] focus:outline-none focus:border-[#FF7836]"
                        />
                        <button
                          onClick={() => handleSaveSupplemental(currentService.id, info.key)}
                          className="px-3.5 py-1.5 bg-[#FF7528] hover:bg-[#E65E12] text-white rounded-xl text-xs font-bold transition shadow-xs"
                        >
                          提交
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      )}

      {/* 新建服务预约弹窗 */}
      {showNewServiceModal && (
        <div className="fixed inset-0 bg-[#2D211A]/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-5 max-w-xs w-full shadow-2xl space-y-3.5 border border-[#EDE2D4]">
            <div className="flex items-center justify-between pb-2 border-b border-[#F2ECE3]">
              <h3 className="text-sm font-bold text-[#2A1E17]">
                预约居家养老服务
              </h3>
              <button
                onClick={() => setShowNewServiceModal(false)}
                className="w-7 h-7 rounded-lg bg-[#FAF6F0] flex items-center justify-center text-[#7A6A60]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#3C2F27] block mb-1">
                  服务项目名称
                </label>
                <select
                  value={newTitle}
                  onChange={(e) => {
                    setNewTitle(e.target.value);
                    if (e.target.value.includes('就医')) setNewPrice(160);
                    else if (e.target.value.includes('护理')) setNewPrice(180);
                    else setNewPrice(120);
                  }}
                  className="w-full bg-[#FAF7F2] border border-[#EADBCE] rounded-lg p-2 text-xs text-[#3A2C23] focus:outline-none"
                >
                  <option value="上门专业助浴">上门专业助浴 (¥120)</option>
                  <option value="就医全程陪诊">就医全程陪诊 (¥160)</option>
                  <option value="慢性病用药巡检与测糖">慢病用药巡检 (¥98)</option>
                  <option value="术后伤口换药照护">术后伤口换药 (¥180)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#3C2F27] block mb-1">
                  期望上门时间
                </label>
                <div className="p-2 rounded-lg bg-[#FAF7F2] border border-[#EADBCE] text-xs text-[#5D4E44] flex items-center justify-between">
                  <span>明日 09:30 - 11:30</span>
                  <Calendar className="w-3.5 h-3.5 text-[#FF7528]" />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#3C2F27] block mb-1">
                  服务费用预估
                </label>
                <div className="text-base font-extrabold text-[#E65100]">
                  ¥{newPrice} <span className="text-xs font-normal text-[#8A796F]">/ 次 (医保补贴后)</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setShowNewServiceModal(false)}
                className="py-2 rounded-lg border border-[#EADBCE] text-xs font-bold text-[#6D5D53]"
              >
                取消
              </button>
              <button
                onClick={handleCreateOrder}
                className="py-2 rounded-lg bg-gradient-to-r from-[#FF8842] to-[#FF6525] text-white text-xs font-bold shadow-xs hover:brightness-105 transition"
              >
                立即预约
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 联系护工弹窗 */}
      {contactStaffModal && (
        <div className="fixed inset-0 bg-[#2D211A]/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-5 max-w-xs w-full shadow-2xl space-y-3.5 text-center border border-[#EDE2D4]">
            <img
              src={contactStaffModal.avatar}
              alt={contactStaffModal.name}
              className="w-14 h-14 rounded-full mx-auto object-cover border-2 border-[#FF8742] shadow-xs"
            />
            <div>
              <h3 className="text-base font-bold text-[#2A1E17]">
                {contactStaffModal.name} ({contactStaffModal.role})
              </h3>
              <p className="text-xs text-[#7A6A60] mt-1">
                联系专线: {contactStaffModal.phone}
              </p>
              <p className="text-[11px] text-[#9E8E84] mt-0.5">
                所属机构: {contactStaffModal.company}
              </p>
            </div>
            <button
              onClick={() => setContactStaffModal(null)}
              className="w-full py-2 rounded-lg bg-[#3D2C22] text-white font-bold text-xs"
            >
              关闭
            </button>
          </div>
        </div>
      )}

      {/* 消息 Toast */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-[#2E2018] text-white text-xs font-medium px-4 py-2 rounded-full shadow-xl z-50 flex items-center space-x-1.5 animate-fade-in">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#FF793F]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
