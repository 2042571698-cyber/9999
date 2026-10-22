import React from 'react';
import { ElderlyProfile } from '../types';
import {
  ElderAvatarFather,
  ElderAvatarMother,
  IconHeartRate,
  IconBloodPressure,
  IconBloodSugar,
  IconSleepMoon,
  IconStepShoes,
} from './PremiumIcons';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface ElderGatewayViewProps {
  elderlyList: ElderlyProfile[];
  onSelectElder: (elder: ElderlyProfile) => void;
}

export function ElderGatewayView({ elderlyList, onSelectElder }: ElderGatewayViewProps) {
  // 父亲与母亲极简结构化数据（无长冗文本，数据清晰）
  const fatherProfile = elderlyList.find((e) => e.id === 'e1') || elderlyList[0];
  const motherProfile = elderlyList.find((e) => e.id === 'e2') || elderlyList[1] || elderlyList[0];

  const fatherData = {
    profile: fatherProfile,
    role: '父亲',
    name: fatherProfile.name || '李建国',
    age: 72,
    statusText: '正常',
    isAlert: false,
    vitals: [
      { name: '心率', val: '72', unit: 'bpm', icon: IconHeartRate },
      { name: '血压', val: '126/82', unit: 'mmHg', icon: IconBloodPressure },
      { name: '血糖', val: '5.8', unit: 'mmol/L', icon: IconBloodSugar },
      { name: '睡眠', val: '7.5', unit: 'h', icon: IconSleepMoon },
      { name: '步数', val: '4320', unit: '步', icon: IconStepShoes },
    ],
    todos: [
      { tag: '服药', text: '12:30 降压药', done: false },
      { tag: '陪诊', text: '明日 门诊陪诊', done: false },
      { tag: '活动', text: '今日步数达标', done: true },
    ],
  };

  const motherData = {
    profile: motherProfile,
    role: '母亲',
    name: motherProfile.name || '张美琴',
    age: 69,
    statusText: '偏高关注',
    isAlert: true,
    vitals: [
      { name: '心率', val: '76', unit: 'bpm', icon: IconHeartRate },
      { name: '血压', val: '138/88', unit: 'mmHg', icon: IconBloodPressure },
      { name: '血糖', val: '6.1', unit: 'mmol/L', icon: IconBloodSugar },
      { name: '睡眠', val: '6.8', unit: 'h', icon: IconSleepMoon },
      { name: '步数', val: '2150', unit: '步', icon: IconStepShoes },
    ],
    todos: [
      { tag: '预警', text: '晨测高压需复核', isAlert: true },
      { tag: '助餐', text: '11:45 热餐配送', done: false },
      { tag: '复测', text: '19:00 晚间测压', done: false },
    ],
  };

  const cards = [
    { data: fatherData, avatar: ElderAvatarFather },
    { data: motherData, avatar: ElderAvatarMother },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2A1E17] flex flex-col justify-center px-3 py-6 max-w-lg mx-auto select-none">
      {/* 极简顶栏 */}
      <div className="flex items-center space-x-2 px-1 mb-4">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF793F]" />
        <span className="text-sm font-bold tracking-tight text-[#2A1E17]">选择长辈</span>
      </div>

      {/* 核心：左右两个框（左父亲，右母亲） */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 flex-1 items-stretch">
        {cards.map(({ data, avatar: AvatarComponent }, idx) => {
          return (
            <div
              key={idx}
              onClick={() => onSelectElder(data.profile)}
              className="bg-white rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between shadow-xs hover:shadow-md active:scale-[0.98] transition cursor-pointer text-left relative overflow-hidden"
            >
              {/* 顶部身份与状态 */}
              <div>
                <div className="flex items-start justify-between">
                  <AvatarComponent className="w-11 h-11 shrink-0 rounded-xl" />
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      data.isAlert
                        ? 'bg-[#FEECEB] text-[#DC2626]'
                        : 'bg-[#F5EFE9] text-[#5A483D]'
                    }`}
                  >
                    {data.statusText}
                  </span>
                </div>

                <div className="mt-2">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-sm font-extrabold text-[#2A1E17]">{data.role}</span>
                    <span className="text-xs font-bold text-[#5A483D]">{data.name}</span>
                    <span className="text-[10px] text-[#8C7D73]">{data.age}岁</span>
                  </div>
                </div>

                {/* 状态值（精简核心数据） */}
                <div className="mt-3 pt-2.5 border-t border-[#F5EFEA]">
                  <div className="text-[10px] font-bold text-[#8C7D73] mb-1.5">实时状态值</div>
                  <div className="space-y-1.5 bg-[#FAF7F2] p-2 rounded-xl text-xs">
                    {data.vitals.map((v, vIdx) => {
                      const VIcon = v.icon;
                      return (
                        <div key={vIdx} className="flex items-center justify-between text-[11px]">
                          <span className="text-[#8C7D73] flex items-center space-x-1">
                            <VIcon className="w-3.5 h-3.5 text-[#EA580C]" />
                            <span>{v.name}</span>
                          </span>
                          <span className="font-bold text-[#2A1E17] tabular-nums">
                            {v.val}
                            <span className="text-[9px] text-[#A8988C] ml-0.5 font-normal">{v.unit}</span>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 待办事项（简化短标签，无冗长说明） */}
                <div className="mt-3 pt-2 border-t border-[#F5EFEA]">
                  <div className="text-[10px] font-bold text-[#8C7D73] mb-1.5">今日待办</div>
                  <div className="space-y-1.5">
                    {data.todos.map((todo, tIdx) => (
                      <div
                        key={tIdx}
                        className={`px-2 py-1.5 rounded-lg text-[11px] flex items-center justify-between ${
                          todo.isAlert
                            ? 'bg-[#FEECEB] text-[#991B1B]'
                            : 'bg-[#FAF7F2] text-[#3D2E25]'
                        }`}
                      >
                        <div className="flex items-center space-x-1 min-w-0 pr-1 truncate">
                          <span
                            className={`text-[9px] font-bold px-1 py-0.2 rounded shrink-0 ${
                              todo.isAlert
                                ? 'bg-[#FCA5A5] text-[#7F1D1D]'
                                : 'bg-[#EFEAE2] text-[#6E6056]'
                            }`}
                          >
                            {todo.tag}
                          </span>
                          <span className="truncate">{todo.text}</span>
                        </div>
                        {todo.done && (
                          <CheckCircle2 className="w-3 h-3 text-[#EA580C] shrink-0 ml-1" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 底部进入按钮 */}
              <div className="mt-4 pt-2.5 border-t border-[#F5EFEA]">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectElder(data.profile);
                  }}
                  className="w-full py-2 rounded-xl bg-[#FF793F] hover:bg-[#EA580C] text-white text-xs font-bold transition flex items-center justify-center space-x-1 shadow-xs cursor-pointer"
                >
                  <span>进入首页</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
