import React, { useState } from 'react';
import {
  X,
  Check,
  Plus,
  Phone,
  ShieldCheck,
  Heart,
  Activity,
  Footprints,
  ChevronRight,
  UserCheck,
  AlertCircle,
} from 'lucide-react';
import { ElderlyProfile, ElderlyStatus } from '../types';

interface ElderSwitchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  elderlyList: ElderlyProfile[];
  currentElderly: ElderlyProfile;
  onSelectElderly: (elderly: ElderlyProfile) => void;
  onAddElderly?: (newProfile: Partial<ElderlyProfile>) => void;
}

export default function ElderSwitchDrawer({
  isOpen,
  onClose,
  elderlyList,
  currentElderly,
  onSelectElderly,
  onAddElderly,
}: ElderSwitchDrawerProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRelation, setNewRelation] = useState('岳父');
  const [newAge, setNewAge] = useState('75');
  const [newAddress, setNewAddress] = useState('海淀区中关村南大街 12号院');
  const [callNotice, setCallNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelect = (elderly: ElderlyProfile) => {
    onSelectElderly(elderly);
    onClose();
  };

  const handleQuickCall = (e: React.MouseEvent, phone: string, name: string) => {
    e.stopPropagation();
    setCallNotice(`正在呼叫 ${name} 的紧急联络电话: ${phone}`);
    setTimeout(() => setCallNotice(null), 3000);
  };

  const handleAddNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    if (onAddElderly) {
      onAddElderly({
        name: newName.trim(),
        avatarText: newName.trim().slice(0, 1),
        relationship: newRelation,
        age: parseInt(newAge, 10) || 70,
        gender: newRelation.includes('母') || newRelation.includes('婆') ? 'female' : 'male',
        address: newAddress.trim() || '北京市朝阳区',
        status: ElderlyStatus.Safe,
        statusSummary: '今日正常',
        statusLastCheck: '刚刚',
      });
    }
    setShowAddForm(false);
    setNewName('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      {/* 遮罩点击关闭 */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* 底部抽屉容器 - 严格统一 12px 规整轻圆角 */}
      <div className="relative w-full max-w-md bg-[#FAF7F2] rounded-t-xl border-t border-[#E8DFD3] shadow-[0_-10px_35px_rgba(0,0,0,0.15)] max-h-[88vh] flex flex-col z-10 animate-in slide-in-from-bottom duration-250">
        {/* 顶部手柄条 */}
        <div className="pt-2.5 pb-1 flex justify-center">
          <div className="w-10 h-1 rounded-full bg-[#D8CCC0]" />
        </div>

        {/* 抽屉头部 */}
        <div className="px-4 py-2.5 flex items-center justify-between border-b border-[#EFE7DE] bg-white/70">
          <div>
            <h2 className="text-base font-bold text-[#2A1E17] flex items-center">
              <span>切换守护长辈</span>
              <span className="ml-2 text-[11px] font-semibold text-[#8C5D39] bg-[#FFF0E2] border border-[#FCD9BE] px-2 py-0.5 rounded-full">
                {elderlyList.length} 位已授权
              </span>
            </h2>
            <p className="text-[11px] text-[#7F6E63] mt-0.5">
              可在经本人实名签署授权的家庭长者间即时切换
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#F4EFEA] hover:bg-[#EAE2D7] text-[#635349] flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 提示消息 */}
        {callNotice && (
          <div className="mx-4 mt-2 px-3 py-2 bg-[#18794E] text-white text-xs font-semibold rounded-lg flex items-center space-x-2 shadow-xs animate-in fade-in">
            <Phone className="w-3.5 h-3.5 animate-bounce shrink-0" />
            <span className="truncate">{callNotice}</span>
          </div>
        )}

        {/* 抽屉滚动内容 */}
        <div className="p-4 space-y-3 overflow-y-auto max-h-[calc(88vh-130px)]">
          {elderlyList.map((elderly) => {
            const isSelected = elderly.id === currentElderly.id;
            const isAttention = elderly.status === ElderlyStatus.Attention;

            return (
              <div
                key={elderly.id}
                onClick={() => handleSelect(elderly)}
                className={`p-4 rounded-2xl transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-[#FFF2EB] shadow-xs'
                    : 'bg-[#FAF8F5] hover:bg-[#F3EFE9]'
                }`}
              >
                {/* 选中的左侧微橙色指示条 */}
                {isSelected && (
                  <div className="absolute left-0 top-4 bottom-4 w-1.5 bg-[#FF793F] rounded-r-full" />
                )}

                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    {/* 头像 */}
                    <div className="relative">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-base bg-white text-[#3D2F27] shadow-xs">
                        {elderly.avatarText}
                      </div>
                      <span
                        className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full ring-2 ring-white flex items-center justify-center ${
                          isAttention ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-base font-bold text-[#2A1E17]">
                          {elderly.name}
                        </span>
                        <span className="text-[11px] font-bold text-[#7C6C62] bg-white px-2 py-0.5 rounded-lg shadow-2xs">
                          {elderly.relationship} · {elderly.age}岁
                        </span>
                      </div>

                      <div className="flex items-center space-x-2 mt-1.5">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            isAttention
                              ? 'bg-[#FEF3C7] text-[#D97706]'
                              : 'bg-[#ECFDF5] text-[#059669]'
                          }`}
                        >
                          {elderly.statusSummary}
                        </span>
                        <span className="text-[10px] text-[#8C7D73]">
                          更新于 {elderly.statusLastCheck}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 状态勾选徽章 */}
                  {isSelected ? (
                    <div className="w-6 h-6 rounded-full bg-[#FF793F] text-white flex items-center justify-center shadow-xs">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-transparent hover:text-[#FF793F]">
                      <Check className="w-3.5 h-3.5 text-[#C4B7AC]" />
                    </div>
                  )}
                </div>

                {/* 关键体征与授权小条 */}
                <div className="mt-3 pt-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3 text-[#5A493E]">
                    <span className="flex items-center font-medium">
                      <Activity className="w-3.5 h-3.5 mr-1 text-[#FF7528]" />
                      心率 72
                    </span>
                    <span className="flex items-center font-medium">
                      <Heart className="w-3.5 h-3.5 mr-1 text-rose-500" />
                      血压 126/82
                    </span>
                    <span className="flex items-center font-medium">
                      <Footprints className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                      4,320步
                    </span>
                  </div>

                  {/* 紧急联系呼叫长辈按钮 */}
                  <button
                    onClick={(e) =>
                      handleQuickCall(e, elderly.emergencyContact.phone, elderly.name)
                    }
                    className="py-1 px-2.5 rounded-lg bg-white hover:bg-[#FFEEDE] text-[#D95D24] transition flex items-center space-x-1 cursor-pointer font-bold text-[11px] shadow-2xs"
                    title="拨打长辈联系电话"
                  >
                    <Phone className="w-3 h-3" />
                    <span>呼叫</span>
                  </button>
                </div>
              </div>
            );
          })}

          {/* 添加新长辈授权 */}
          {!showAddForm ? (
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full py-3 rounded-xl border border-dashed border-[#D4C3B3] bg-white/60 hover:bg-white text-[#7F6A5C] text-xs font-bold flex items-center justify-center space-x-1.5 transition"
            >
              <Plus className="w-4 h-4 text-[#FF7528]" />
              <span>添加其他关联长辈 (需签署共享协议)</span>
            </button>
          ) : (
            <form
              onSubmit={handleAddNew}
              className="p-3.5 rounded-xl border border-[#F7D8C4] bg-[#FFFBF8] space-y-2.5 animate-in fade-in"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#2A1E17]">录入新长辈信息</span>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="text-xs text-[#8C7A70] hover:text-[#2A1E17]"
                >
                  取消
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-[#8C7A70] block mb-1">长辈姓名</label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="如：王秀英"
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-[#E2D6CB] bg-white focus:outline-none focus:border-[#FF7528]"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-[#8C7A70] block mb-1">与您的关系</label>
                  <select
                    value={newRelation}
                    onChange={(e) => setNewRelation(e.target.value)}
                    className="w-full px-2 py-1.5 text-xs rounded-lg border border-[#E2D6CB] bg-white focus:outline-none focus:border-[#FF7528]"
                  >
                    <option value="母亲">母亲</option>
                    <option value="父亲">父亲</option>
                    <option value="岳母">岳母</option>
                    <option value="岳父">岳父</option>
                    <option value="祖母">祖母</option>
                    <option value="祖父">祖父</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] text-[#8C7A70] block mb-1">年龄</label>
                  <input
                    type="number"
                    value={newAge}
                    onChange={(e) => setNewAge(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-[#E2D6CB] bg-white focus:outline-none focus:border-[#FF7528]"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-[10px] text-[#8C7A70] block mb-1">现住址</label>
                  <input
                    type="text"
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-[#E2D6CB] bg-white focus:outline-none focus:border-[#FF7528]"
                  />
                </div>
              </div>

              <div className="pt-1 flex justify-end space-x-2">
                <button
                  type="submit"
                  className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#FF8842] to-[#FF6525] text-white text-xs font-bold shadow-xs hover:brightness-105 active:scale-95 transition"
                >
                  确认添加并发送授权申请
                </button>
              </div>
            </form>
          )}

          {/* 授权合规提示 */}
          <div className="p-3 rounded-xl bg-white border border-[#EFE7DD] flex items-start space-x-2.5">
            <ShieldCheck className="w-4 h-4 text-[#18794E] shrink-0 mt-0.5" />
            <div className="text-[11px] text-[#635349] leading-relaxed">
              <strong className="text-[#2C211B] font-bold">法定监护及健康数据授权：</strong>
              所有切换数据均严格遵循国家老龄与医疗健康隐私规范，仅展示家属合法知情与协助范围内的各项信息。
            </div>
          </div>
        </div>

        {/* 抽屉底部安全操作栏 */}
        <div className="p-3 border-t border-[#EFE7DE] bg-white/90 flex items-center justify-between">
          <div className="text-[11px] text-[#8C7A70]">
            当前正守护：<strong className="text-[#2A1E17]">{currentElderly.name}</strong>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#FAF5F0] hover:bg-[#F2E8DC] text-[#4A392E] text-xs font-bold border border-[#E6D9CC] transition"
          >
            完成
          </button>
        </div>
      </div>
    </div>
  );
}
