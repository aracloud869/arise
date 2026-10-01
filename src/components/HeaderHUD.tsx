import React from 'react';
import { PlayerStats } from '../types';
import {
  FlameStreakIcon,
  GoldCoinIcon,
  VolumeIcon,
  AlertGlyphIcon,
  CrownMonarchIcon
} from './icons/SystemIcons';
import { soundFx } from '../utils/soundEffects';

interface HeaderHUDProps {
  stats: PlayerStats;
  streak: number;
  timeRemainingStr: string;
  isPenaltyWarning: boolean;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenPenaltyModal: () => void;
  onOpenNotifications: () => void;
  unreadCount: number;
  streakUpdated?: boolean;
}

export const HeaderHUD: React.FC<HeaderHUDProps> = ({
  stats,
  streak,
  timeRemainingStr,
  isPenaltyWarning,
  soundEnabled,
  onToggleSound,
  onOpenPenaltyModal,
  onOpenNotifications,
  unreadCount,
  streakUpdated = false,
}) => {
  const hpPercent = Math.max(0, Math.min(100, Math.round((stats.hp / stats.maxHp) * 100)));
  const mpPercent = Math.max(0, Math.min(100, Math.round((stats.mp / stats.maxMp) * 100)));
  const fatiguePercent = Math.max(0, Math.min(100, Math.round((stats.fatigue / stats.maxFatigue) * 100)));
  const expPercent = Math.max(0, Math.min(100, Math.round((stats.exp / stats.maxExp) * 100)));

  return (
    <header className="w-full max-w-full bg-[#040914]/95 border-b border-cyan-500/30 backdrop-blur-md sticky top-0 z-40 px-2 sm:px-4 py-2 shadow-[0_4px_20px_rgba(0,180,255,0.15)] box-border overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2 sm:gap-3">
        {/* Top / Left Row: Hunter Identity + Level + Controls on mobile */}
        <div className="flex items-center justify-between gap-2">
          {/* Left: Level badge & Name */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-950 via-slate-900 to-blue-950 border border-cyan-400 rounded-sm shadow-[0_0_12px_rgba(0,210,255,0.5)] shrink-0">
              <span className="text-[9px] sm:text-[10px] absolute top-0.5 text-cyan-400 tracking-wider font-chakra">CẤP</span>
              <span className="text-base sm:text-xl font-bold font-orbitron text-cyan-100 mt-2">{stats.level}</span>
              <div className="hud-corner-tl" />
              <div className="hud-corner-br" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs sm:text-base font-bold text-white tracking-wide font-chakra truncate">
                  SUNG JIN-WOO
                </span>
                <span className="px-1 py-0.2 sm:px-1.5 sm:py-0.5 text-[9px] sm:text-[10px] font-semibold border border-purple-400/80 text-purple-300 bg-purple-950/60 rounded-xs uppercase tracking-wider flex items-center gap-1 shrink-0">
                  <CrownMonarchIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-purple-400" />
                  {stats.job}
                </span>
                <span className="px-1 py-0.2 sm:px-1.5 sm:py-0.2 text-[9px] sm:text-[10px] font-bold border border-cyan-400 text-cyan-300 bg-cyan-950/70 rounded-xs shrink-0">
                  HẠNG {stats.rank}
                </span>
              </div>
              <div className="text-[10px] sm:text-xs text-cyan-400/80 font-medium truncate max-w-[200px] sm:max-w-[280px]">
                {stats.title}
              </div>
            </div>
          </div>

          {/* Quick Audio & Notif buttons on mobile */}
          <div className="flex items-center gap-1.5 lg:hidden shrink-0">
            <button
              onClick={() => {
                soundFx.playClick();
                const current = soundFx.getBgmEnabled();
                soundFx.setBgmEnabled(!current);
              }}
              className="px-2 py-1 bg-slate-900 border border-purple-500/40 text-purple-300 rounded-xs text-[10px] font-chakra font-bold"
              title="Bật/Tắt BGM"
            >
              🎵 {soundFx.getBgmEnabled() ? 'BGM' : 'MUTE'}
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                onToggleSound();
              }}
              className={`p-1.5 border rounded-xs ${
                soundEnabled
                  ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300'
                  : 'bg-slate-900/60 border-slate-700 text-slate-500'
              }`}
              title="Âm thanh"
            >
              <VolumeIcon soundOn={soundEnabled} className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenNotifications();
              }}
              className="relative p-1.5 bg-slate-900 border border-cyan-500/40 text-cyan-300 rounded-xs"
              title="Thông báo"
            >
              <span className="font-bold text-[10px] font-orbitron">[!]</span>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Center: HP, MP & EXP Bars */}
        <div className="w-full lg:flex-1 lg:max-w-xl flex flex-col gap-1 px-0 sm:px-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-1">
            {/* HP Bar */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="w-6 font-bold text-red-400 font-chakra text-[10px] sm:text-[11px] text-right shrink-0">HP</span>
              <div className="flex-1 h-3 sm:h-3.5 bg-slate-950/90 border border-red-500/40 rounded-xs overflow-hidden relative shadow-inner">
                <div
                  className={`h-full bg-gradient-to-r from-red-600 via-rose-500 to-pink-500 transition-all duration-300 ${
                    hpPercent < 25 ? 'animate-pulse' : ''
                  }`}
                  style={{ width: `${hpPercent}%` }}
                />
                <span className="absolute inset-0 flex items-center justify-center text-[9px] sm:text-[10px] font-bold text-white drop-shadow">
                  {stats.hp} / {stats.maxHp} ({hpPercent}%)
                </span>
              </div>
            </div>

            {/* MP Bar */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="w-6 font-bold text-cyan-400 font-chakra text-[10px] sm:text-[11px] text-right shrink-0">MP</span>
              <div className="flex-1 h-2.5 sm:h-3 bg-slate-950/90 border border-cyan-500/40 rounded-xs overflow-hidden relative shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 transition-all duration-300"
                  style={{ width: `${mpPercent}%` }}
                />
                <span className="absolute inset-0 flex items-center justify-center text-[8px] sm:text-[9px] font-bold text-white drop-shadow">
                  {stats.mp} / {stats.maxMp} ({mpPercent}%)
                </span>
              </div>
            </div>
          </div>

          {/* EXP & Fatigue micro bar */}
          <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-slate-400 gap-3">
            <div className="flex items-center gap-1.5 flex-1">
              <span className="text-yellow-400 font-semibold shrink-0">EXP</span>
              <div className="flex-1 h-1.5 bg-slate-950 border border-yellow-500/30 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-400" style={{ width: `${expPercent}%` }} />
              </div>
              <span className="text-[9px] text-yellow-300 font-mono shrink-0">{expPercent}%</span>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <span className="text-amber-400/90 font-medium">Mệt mỏi:</span>
              <span className={`font-bold font-mono ${fatiguePercent > 70 ? 'text-red-400 animate-pulse' : 'text-slate-300'}`}>
                {stats.fatigue}/{stats.maxFatigue}
              </span>
            </div>
          </div>
        </div>

        {/* Right Row: Gold, Streak, Deadline, BGM & Controls */}
        <div className="flex items-center justify-between sm:justify-end gap-1.5 sm:gap-2 overflow-x-auto pb-0.5 scrollbar-none">
          {/* Gold */}
          <div className="flex items-center gap-1 px-2 py-0.5 sm:py-1 bg-amber-950/40 border border-amber-500/40 rounded-xs shadow-sm shrink-0">
            <GoldCoinIcon className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs sm:text-sm font-bold text-amber-300 font-orbitron">
              {stats.gold.toLocaleString('vi-VN')}
            </span>
          </div>

          {/* Daily Streak */}
          <div className={`flex items-center gap-1 px-2 py-0.5 sm:py-1 rounded-xs transition-all duration-300 shrink-0 ${
            streakUpdated
              ? 'bg-gradient-to-r from-cyan-900 to-blue-900 border border-white shadow-[0_0_15px_#00e5ff]'
              : 'bg-cyan-950/50 border border-cyan-500/40'
          }`}>
            <FlameStreakIcon className={`w-3.5 h-3.5 text-cyan-400 ${streakUpdated ? 'animate-streak-flame-surge text-white' : 'animate-pulse'}`} />
            <div className="flex flex-col leading-none">
              <span className="text-[8px] text-cyan-300 uppercase tracking-wider font-chakra font-bold">Chuỗi</span>
              <span className="text-[10px] sm:text-xs font-bold text-white font-orbitron">{streak} NGÀY</span>
            </div>
          </div>

          {/* Countdown & Penalty Status */}
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenPenaltyModal();
            }}
            className={`flex items-center gap-1 px-2 py-0.5 sm:py-1 border rounded-xs text-[10px] transition-colors cursor-pointer shrink-0 ${
              isPenaltyWarning
                ? 'bg-red-950/80 border-red-500 text-red-200 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]'
                : 'bg-slate-900/80 border-cyan-500/30 text-cyan-300 hover:border-cyan-400'
            }`}
            title="Đếm ngược hoàn thành nhiệm vụ hàng ngày"
          >
            <AlertGlyphIcon className={`w-3 h-3 ${isPenaltyWarning ? 'text-red-400' : 'text-cyan-400'}`} />
            <div className="flex flex-col text-left leading-none">
              <span className="text-[8px] uppercase tracking-tight text-slate-400">Hạn chót</span>
              <span className="font-mono text-[10px] sm:text-xs font-bold text-white">{timeRemainingStr}</span>
            </div>
          </button>

          {/* Desktop Controls (BGM, Sound, Notifications) */}
          <div className="hidden lg:flex items-center gap-1.5 shrink-0">
            {/* BGM Toggle */}
            <button
              onClick={() => {
                soundFx.playClick();
                const current = soundFx.getBgmEnabled();
                soundFx.setBgmEnabled(!current);
              }}
              className="flex items-center gap-1 px-2 py-1 bg-slate-900/80 border border-purple-500/40 text-purple-300 hover:border-purple-300 rounded-xs text-xs font-chakra transition-colors cursor-pointer"
              title="Bật/Tắt BGM"
            >
              <span className="text-xs">🎵</span>
              <span className="font-mono text-[10px] font-bold text-cyan-300">
                {soundFx.getBgmEnabled() ? 'BẬT' : 'TẮT'}
              </span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={() => {
                soundFx.playClick();
                onToggleSound();
              }}
              className={`p-1.5 border rounded-xs transition-colors cursor-pointer ${
                soundEnabled
                  ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300'
                  : 'bg-slate-900/60 border-slate-700 text-slate-500'
              }`}
              title="Bật/Tắt âm hiệu ứng"
            >
              <VolumeIcon soundOn={soundEnabled} className="w-3.5 h-3.5" />
            </button>

            {/* Notifications Bell */}
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenNotifications();
              }}
              className="relative p-1.5 bg-slate-900/80 border border-cyan-500/40 text-cyan-300 hover:border-cyan-300 rounded-xs transition-colors cursor-pointer"
              title="Thông báo Hệ Thống"
            >
              <span className="font-bold text-xs font-orbitron">[!]</span>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
