import React from 'react';
import { TabType } from '../types';
import {
  StatusIcon,
  QuestIcon,
  DungeonIcon,
  ShopIcon,
  ProfileIcon,
  NovelIcon,
  SettingsIcon,
  CrownMonarchIcon,
} from './icons/SystemIcons';
import { soundFx } from '../utils/soundEffects';

interface NavigationTabsProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  availablePoints: number;
  unclaimedQuestsCount: number;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeTab,
  onSelectTab,
  availablePoints,
  unclaimedQuestsCount,
}) => {
  const tabs = [
    {
      id: 'status' as TabType,
      label: 'TRANG CHỦ',
      sublabel: 'Chỉ Số',
      icon: StatusIcon,
      badge: availablePoints > 0 ? `+${availablePoints}` : undefined,
    },
    {
      id: 'quests' as TabType,
      label: 'NHIỆM VỤ',
      sublabel: 'Chuỗi & Mục Tiêu',
      icon: QuestIcon,
      badge: unclaimedQuestsCount > 0 ? `${unclaimedQuestsCount}` : undefined,
    },
    {
      id: 'talents' as TabType,
      label: 'TÀI NĂNG',
      sublabel: 'Cây Nhánh Bậc',
      icon: CrownMonarchIcon,
    },
    {
      id: 'dungeon' as TabType,
      label: 'ẢI CHIẾN',
      sublabel: 'Săn Boss Cổng',
      icon: DungeonIcon,
    },
    {
      id: 'shop' as TabType,
      label: 'CỬA HÀNG',
      sublabel: 'Trang Bị & Dược',
      icon: ShopIcon,
    },
    {
      id: 'profile' as TabType,
      label: 'HỒ SƠ',
      sublabel: 'Kỹ Năng & Bóng Tối',
      icon: ProfileIcon,
    },
    {
      id: 'novel' as TabType,
      label: 'XẢ STRESS',
      sublabel: 'Đọc Tiểu Thuyết',
      icon: NovelIcon,
    },
    {
      id: 'settings' as TabType,
      label: 'CÀI ĐẶT',
      sublabel: 'Hệ Thống',
      icon: SettingsIcon,
    },
  ];

  return (
    <nav className="w-full max-w-full bg-[#030816]/95 border-b border-cyan-500/20 py-1.5 px-2 overflow-x-auto scrollbar-none sticky top-0 z-30 backdrop-blur-md box-border">
      <div className="max-w-7xl mx-auto flex items-center justify-start sm:justify-center gap-1 sm:gap-1.5 min-w-max px-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const IconComponent = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => {
                soundFx.playClick();
                onSelectTab(tab.id);
              }}
              className={`relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xs border transition-all duration-200 cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-950/90 to-blue-950/90 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(0,210,255,0.35)]'
                  : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 hover:bg-slate-900/60'
              }`}
            >
              <IconComponent className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${isActive ? 'text-cyan-300' : 'text-slate-400'}`} />
              <div className="flex flex-col text-left leading-tight">
                <span className={`text-[11px] sm:text-xs font-bold font-chakra tracking-wide ${isActive ? 'text-white' : 'text-slate-300'}`}>
                  {tab.label}
                </span>
                <span className="text-[9px] sm:text-[10px] text-cyan-400/70 font-mono hidden md:inline">
                  {tab.sublabel}
                </span>
              </div>

              {/* Badges for points or pending quests */}
              {tab.badge && (
                <span className="ml-0.5 px-1 py-0.1 sm:px-1.5 sm:py-0.2 text-[8px] sm:text-[9px] font-bold rounded-full bg-cyan-500 text-slate-950 animate-pulse">
                  {tab.badge}
                </span>
              )}

              {/* Active holographic indicator */}
              {isActive && (
                <>
                  <div className="hud-corner-tl" />
                  <div className="hud-corner-br" />
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-6 sm:w-8 h-[2px] bg-cyan-400 shadow-[0_0_8px_#00e5ff]" />
                </>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
