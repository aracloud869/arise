import React, { useState } from 'react';
import { PlayerStats, Skill, ShadowSoldier, GrowthLog } from '../../types';
import {
  ProfileIcon,
  CrownMonarchIcon,
  AriseIcon,
  SwordSlashIcon,
  PlusIcon,
  CheckIcon,
} from '../icons/SystemIcons';
import { soundFx } from '../../utils/soundEffects';
import { getSkillRank, RANK_STYLE_CONFIGS } from '../../utils/skillRank';

interface ProfileTabProps {
  stats: PlayerStats;
  skills: Skill[];
  shadowArmy: ShadowSoldier[];
  growthLogs: GrowthLog[];
  onUpgradeSkill: (skillId: string) => void;
  onToggleEquipSkill?: (skillId: string) => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  stats,
  skills,
  shadowArmy,
  growthLogs,
  onUpgradeSkill,
  onToggleEquipSkill,
}) => {
  const [profileSection, setProfileSection] = useState<'skills' | 'shadows' | 'logs'>('skills');

  const totalShadowCount = shadowArmy.reduce((acc, curr) => acc + curr.count, 0);
  const totalShadowPower = shadowArmy.reduce((acc, curr) => acc + curr.power * curr.count, 0);
  const equippedCount = skills.filter((s) => (s.type === 'active' || !s.type) && s.equipped && s.unlocked).length;
  const activeSkillsList = skills.filter((s) => s.type === 'active' || !s.type);
  const passiveSkillsList = skills.filter((s) => s.type === 'passive');

  return (
    <div className="w-full max-w-7xl mx-auto p-2 sm:p-4 md:p-6 space-y-4 sm:space-y-6 box-border overflow-hidden">
      {/* Header Window */}
      <div className="system-window p-4 sm:p-6 rounded-sm relative">
        <div className="hud-corner-tl" />
        <div className="hud-corner-tr" />
        <div className="hud-corner-bl" />
        <div className="hud-corner-br" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-cyan-500/20">
          <div>
            <div className="flex items-center gap-2 text-purple-400 text-xs font-mono tracking-widest uppercase">
              <span>HỒ SƠ / BÍ TÍCH CHÚA TỂ BÓNG TỐI</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-black text-white font-chakra tracking-wide mt-1 flex items-center gap-2">
              <CrownMonarchIcon className="w-6 h-6 sm:w-7 sm:h-7 text-purple-400" />
              <span>HUNTER PROFILE & SHADOW LEGION</span>
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Quản lý danh sách 16+ kỹ năng độc quyền, bộ 5 kỹ năng xuất chiến và đội quân bóng tối trỗi dậy.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-chakra">
            <div className="p-2.5 sm:p-3 bg-purple-950/40 border border-purple-500/40 rounded-xs text-center">
              <span className="text-slate-400 block text-[10px]">QUÂN ĐOÀN BÓNG TỐI</span>
              <span className="text-sm sm:text-base font-bold font-orbitron text-purple-300">
                {totalShadowCount} Chiến Binh
              </span>
            </div>

            <div className="p-2.5 sm:p-3 bg-purple-950/40 border border-purple-500/40 rounded-xs text-center">
              <span className="text-slate-400 block text-[10px]">TỔNG SỨC MẠNH BÓNG</span>
              <span className="text-sm sm:text-base font-bold font-orbitron text-cyan-300">
                {totalShadowPower.toLocaleString()} POW
              </span>
            </div>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'skills', label: `KỸ NĂNG ĐẶC BIỆT (${skills.length})` },
            { id: 'shadows', label: `ĐỘI QUÂN BÓNG TỐI (${shadowArmy.length})` },
            { id: 'logs', label: `NHẬT KÝ THĂNG TIẾN (${growthLogs.length})` },
          ].map((sec) => (
            <button
              key={sec.id}
              onClick={() => {
                soundFx.playClick();
                setProfileSection(sec.id as typeof profileSection);
              }}
              className={`px-3 py-1.5 text-xs font-bold font-chakra rounded-xs border transition-colors cursor-pointer shrink-0 ${
                profileSection === sec.id
                  ? 'bg-purple-600 border-purple-400 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                  : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-purple-300 hover:border-purple-500/40'
              }`}
            >
              {sec.label}
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 1: SKILLS MANAGEMENT */}
      {profileSection === 'skills' && (
        <div className="space-y-4">
          {/* Active 5-Skill Loadout Notice */}
          <div className="p-3 sm:p-4 bg-gradient-to-r from-purple-950/80 via-slate-950 to-cyan-950/80 border border-purple-500/40 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="font-bold font-chakra text-white text-xs sm:text-sm uppercase tracking-wide">
                  BỘ 5 KỸ NĂNG XUẤT CHIẾN (BATTLE LOADOUT: {equippedCount}/5)
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Mỗi trận đấu chỉ được mang tối đa 5 kỹ năng. Bấm nút [LẮP VÀO TRẬN / THÁO] trên từng kỹ năng đã mở khóa để tùy chỉnh bộ chiêu thức ưa thích.
              </p>
            </div>

            {/* Quick Equipped Slots */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {Array.from({ length: 5 }, (_, i) => {
                const eqSkill = skills.filter((s) => (s.type === 'active' || !s.type) && s.unlocked && s.equipped)[i];
                if (eqSkill) {
                  const rank = getSkillRank(eqSkill);
                  const rankCfg = RANK_STYLE_CONFIGS[rank];

                  return (
                    <div
                      key={i}
                      className={`h-11 px-2 rounded-xs border flex flex-col items-center justify-center relative text-center shrink-0 bg-gradient-to-b ${rankCfg.gradientBg} ${rankCfg.readyPulseClass} border-cyan-400 shadow-[0_0_12px_rgba(0,229,255,0.4)]`}
                    >
                      <span className={`text-[8px] font-orbitron font-extrabold px-1 rounded-xs border ${rankCfg.badgeBorder} ${rankCfg.badgeBg} ${rankCfg.badgeText}`}>
                        [{rank}]
                      </span>
                      <span className="text-[10px] font-chakra font-black text-cyan-200 line-clamp-1 mt-0.5 max-w-[70px]">
                        {eqSkill.name}
                      </span>
                    </div>
                  );
                }

                return (
                  <div
                    key={i}
                    className="w-11 h-11 rounded-xs border flex flex-col items-center justify-center relative text-center shrink-0 bg-slate-950/80 border-dashed border-slate-800 text-slate-600"
                  >
                    <span className="text-[9px] font-mono font-bold text-slate-600">
                      O-{i + 1}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {skills.map((skill) => {
              const isLocked = !skill.unlocked;
              const isEquipped = skill.equipped && skill.unlocked;
              const isMax = skill.level >= skill.maxLevel;
              const upgradeCost = skill.level * 1500;
              const canUpgrade = !isLocked && stats.gold >= upgradeCost && !isMax;

              return (
                <div
                  key={skill.id}
                  className={`system-window p-3.5 sm:p-4 rounded-sm flex flex-col justify-between transition-all ${
                    isLocked
                      ? 'border-slate-800 bg-slate-950/60 opacity-80'
                      : isEquipped
                      ? 'border-cyan-400 bg-gradient-to-b from-cyan-950/40 to-slate-950 shadow-[0_0_15px_rgba(0,229,255,0.25)]'
                      : 'border-emerald-500/40 bg-slate-950/90'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className={`px-1.5 py-0.2 text-[9px] sm:text-[10px] font-bold border rounded-xs font-orbitron ${
                          isLocked ? 'border-amber-500/50 text-amber-400 bg-amber-950/40' : 'border-emerald-400 text-emerald-300 bg-emerald-950/80'
                        }`}>
                          {isLocked ? '🔒 CHƯA MỞ' : `✓ ĐÃ MỞ (CẤP ${skill.level}/${skill.maxLevel})`}
                        </span>

                        {isEquipped && (
                          <span className="px-1.5 py-0.2 bg-cyan-950 border border-cyan-400 text-cyan-300 text-[9px] font-bold font-mono rounded-xs animate-pulse">
                            XUẤT CHIẾN
                          </span>
                        )}
                      </div>

                      <span className="text-[10px] font-mono text-cyan-300">
                        {isLocked ? `Cấp ${skill.minLevelToUnlock || '?'}` : `${skill.mpCost} MP · ${skill.cooldownSeconds}s`}
                      </span>
                    </div>

                    <h3 className={`text-sm sm:text-base font-bold font-chakra ${isLocked ? 'text-slate-400' : 'text-white'}`}>
                      {skill.vietnameseName}
                    </h3>

                    <p className="text-xs text-slate-300 mt-1 leading-relaxed line-clamp-2">
                      {skill.description}
                    </p>

                    <div className="mt-2.5 p-2 bg-slate-950/80 border border-slate-800 rounded-xs text-xs flex items-center justify-between">
                      <span className="text-slate-400 text-[11px]">Hệ thống sát thương:</span>
                      <span className={`font-orbitron font-bold text-[11px] ${isLocked ? 'text-amber-400' : 'text-yellow-300'}`}>
                        {isLocked ? '🔒 CHƯA LĨNH NGỘ' : `x${skill.damageMultiplier} Sát Thương`}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between gap-2">
                    {skill.type === 'passive' ? (
                      <span className="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/50 px-2 py-1 rounded-xs">
                        🛡️ KÍCH HOẠT VÔ HẠN (TỰ ĐỘNG NỘI TẠI)
                      </span>
                    ) : !isLocked && onToggleEquipSkill ? (
                      <button
                        onClick={() => {
                          soundFx.playClick();
                          onToggleEquipSkill(skill.id);
                        }}
                        className={`py-1 px-2.5 text-xs font-bold font-chakra rounded-xs border transition-colors cursor-pointer ${
                          isEquipped
                            ? 'bg-red-950/70 border-red-500/60 text-red-300 hover:bg-red-900'
                            : 'bg-cyan-950/70 border-cyan-400 text-cyan-200 hover:bg-cyan-900'
                        }`}
                      >
                        {isEquipped ? 'THÁO KHỎI DECK' : 'LẮP VÀO TRẬN (MAX 5)'}
                      </button>
                    ) : (
                      <span className="text-[10px] font-mono text-amber-400/90">
                        {skill.minLevelToUnlock ? `🔒 Cần Cấp ${skill.minLevelToUnlock} hoặc Nâng Tài Năng` : '🔒 Nâng Tài Năng hoặc vượt ải'}
                      </span>
                    )}

                    {/* Upgrade Skill Button */}
                    <button
                      onClick={() => {
                        if (canUpgrade) {
                          soundFx.playLevelUp();
                          onUpgradeSkill(skill.id);
                        }
                      }}
                      disabled={!canUpgrade}
                      className={`py-1 px-2.5 text-xs font-bold font-chakra rounded-xs border transition-colors cursor-pointer shrink-0 ${
                        canUpgrade
                          ? 'bg-gradient-to-r from-yellow-600 to-amber-600 border-yellow-400 text-slate-950 shadow-[0_0_10px_rgba(234,179,8,0.4)]'
                          : 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed'
                      }`}
                    >
                      {isMax ? 'TỐI ĐA' : `+CẤP (${upgradeCost.toLocaleString()} G)`}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 2: SHADOW ARMY MANAGEMENT */}
      {profileSection === 'shadows' && (
        <div className="space-y-4">
          {shadowArmy.length === 0 ? (
            <div className="p-8 system-window text-center space-y-2 border-dashed border-purple-500/40">
              <AriseIcon className="w-12 h-12 text-purple-400/60 mx-auto" />
              <h3 className="text-base font-bold text-white font-chakra">
                QUÂN ĐOÀN BÓNG TỐI CHƯA CÓ CHIẾN BINH NÀO
              </h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Hãy hoàn thành chuỗi nhiệm vụ thức tỉnh, đạt Cấp 20 và đánh bại Boss Đền Thờ Cổ để chuyển nghề thành <strong>CHÚA TỂ BÓNG TỐI</strong>, mở khóa kỹ năng trích xuất bóng tối (ARISE)!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {shadowArmy.map((shadow) => (
                <div
                  key={shadow.id}
                  className="system-window p-4 rounded-sm border-purple-500/40 hover:border-purple-400 transition-all shadow-[0_0_20px_rgba(168,85,247,0.15)] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 bg-purple-950 border border-purple-400 text-purple-300 text-[10px] font-bold rounded-xs font-mono">
                        HẠNG {shadow.rank}
                      </span>
                      <span className="text-xs font-mono font-bold text-cyan-300">
                        {shadow.power.toLocaleString()} POW
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white font-chakra">{shadow.name}</h3>
                    <span className="text-[10px] text-slate-400 font-mono block">({shadow.originalName})</span>

                    <p className="text-xs text-slate-300 mt-2 line-clamp-2">
                      {shadow.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-purple-500/20 flex items-center justify-between text-xs font-chakra">
                    <span className="text-purple-300 font-bold">Số lượng triệu hồi:</span>
                    <span className="font-orbitron font-bold text-white text-sm">
                      x{shadow.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SECTION 3: GROWTH LOGS */}
      {profileSection === 'logs' && (
        <div className="system-window p-4 sm:p-6 rounded-sm space-y-3">
          <h2 className="text-sm font-bold text-cyan-300 font-chakra uppercase tracking-wide pb-2 border-b border-cyan-500/20">
            NHẬT KÝ LỊCH SỬ THĂNG CẤP & CHIẾN TÍCH
          </h2>

          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
            {growthLogs.map((log) => (
              <div
                key={log.id}
                className="p-3 bg-slate-950/80 border border-cyan-500/20 rounded-xs flex items-start justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-cyan-400 font-bold">[{log.timestamp}]</span>
                    <span className="font-bold text-white font-chakra">{log.title}</span>
                  </div>
                  <p className="text-slate-400 mt-1">{log.description}</p>
                </div>

                <span className={`px-2 py-0.5 text-[9px] font-bold rounded-xs uppercase font-mono ${
                  log.category === 'level' ? 'bg-cyan-950 border border-cyan-400 text-cyan-300' :
                  log.category === 'boss' ? 'bg-red-950 border border-red-500 text-red-300' :
                  log.category === 'quest' ? 'bg-amber-950 border border-amber-400 text-amber-300' :
                  'bg-slate-900 border border-slate-700 text-slate-300'
                }`}>
                  {log.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
