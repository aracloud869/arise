import React, { useState } from 'react';
import { Skill } from '../../types';
import {
  SwordSlashIcon,
  AriseIcon,
  CrownMonarchIcon,
  AlertGlyphIcon,
  CheckIcon,
  PlusIcon,
  FlameStreakIcon,
} from '../icons/SystemIcons';
import { soundFx } from '../../utils/soundEffects';

interface SkillLoadoutDeckProps {
  skills: Skill[];
  onToggleEquipSkill: (skillId: string) => void;
  onUpgradeSkill?: (skillId: string) => void;
  playerGold?: number;
  playerLevel?: number;
  compact?: boolean;
}

export const SkillLoadoutDeck: React.FC<SkillLoadoutDeckProps> = ({
  skills,
  onToggleEquipSkill,
  onUpgradeSkill,
  playerGold = 0,
  playerLevel = 1,
  compact = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeSlotModal, setActiveSlotModal] = useState<number | null>(null);

  // Equipped active combat skills (max 5 slots)
  const equippedSkills = skills.filter((s) => (s.type === 'active' || !s.type) && s.equipped && s.unlocked);
  const unlockedSkills = skills.filter((s) => (s.type === 'active' || !s.type) && s.unlocked);

  const categories = [
    { id: 'all', label: 'TẤT CẢ', count: skills.length },
    { id: 'dagger', label: 'DAO GĂM & SÁT THỦ', count: skills.filter((s) => s.category === 'dagger' || s.category === 'assassin').length },
    { id: 'shadow', label: 'CHÚA TỂ BÓNG TỐI', count: skills.filter((s) => s.category === 'shadow').length },
    { id: 'ruler', label: 'QUYỀN NĂNG THỐNG TRỊ', count: skills.filter((s) => s.category === 'ruler').length },
    { id: 'monarch', label: 'LONG ĐẾ & HỦY DIỆT', count: skills.filter((s) => s.category === 'monarch').length },
    { id: 'buff', label: 'THÂN PHÁP & BUFF', count: skills.filter((s) => s.category === 'buff').length },
  ];

  const filteredSkills = skills.filter((s) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'dagger') return s.category === 'dagger' || s.category === 'assassin';
    return s.category === selectedCategory;
  });

  const getCategoryColor = (cat?: string) => {
    switch (cat) {
      case 'dagger':
      case 'assassin':
        return 'text-red-400 border-red-500/40 bg-red-950/40';
      case 'shadow':
        return 'text-purple-400 border-purple-500/40 bg-purple-950/40';
      case 'ruler':
        return 'text-cyan-400 border-cyan-500/40 bg-cyan-950/40';
      case 'monarch':
        return 'text-amber-400 border-amber-500/40 bg-amber-950/40';
      case 'buff':
        return 'text-emerald-400 border-emerald-500/40 bg-emerald-950/40';
      default:
        return 'text-cyan-400 border-cyan-500/40 bg-cyan-950/40';
    }
  };

  const getSkillCategoryName = (cat?: string) => {
    switch (cat) {
      case 'dagger': return 'Dao Găm';
      case 'assassin': return 'Sát Thủ';
      case 'shadow': return 'Bóng Tối';
      case 'ruler': return 'Kẻ Thống Trị';
      case 'monarch': return 'Long Đế';
      case 'buff': return 'Thân Pháp';
      default: return 'Kỹ Năng';
    }
  };

  // Direct slot assignment or toggle
  const handleSlotClick = (slotIdx: number) => {
    soundFx.playClick();
    setActiveSlotModal(slotIdx);
  };

  const handleSelectSkillForSlot = (skill: Skill) => {
    soundFx.playClick();
    if (!skill.equipped) {
      onToggleEquipSkill(skill.id);
    }
    setActiveSlotModal(null);
  };

  return (
    <div className="w-full space-y-4">
      {/* 1. TOP SECTION: 5-SLOT BATTLE LOADOUT DECK */}
      <div className="system-window p-3 sm:p-5 rounded-sm relative overflow-hidden bg-slate-950/90 border border-cyan-500/40">
        <div className="hud-corner-tl" />
        <div className="hud-corner-tr" />
        <div className="hud-corner-bl" />
        <div className="hud-corner-br" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-cyan-500/30 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <SwordSlashIcon className="w-4 h-4 text-cyan-400" />
              <h2 className="text-sm sm:text-base font-black text-white font-chakra tracking-wider">
                BỘ KỸ NĂNG XUẤT CHIẾN (5 Ô COMBAT SLOTS)
              </h2>
            </div>
            <p className="text-[11px] text-cyan-300/80 font-mono mt-0.5">
              👉 Bấm trực tiếp vào bất kỳ ô nào bên dưới (Slot 1 - 5) để chọn và đổi kỹ năng xuất chiến!
            </p>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-cyan-950/80 border border-cyan-400/60 rounded-xs font-mono text-xs">
            <span className="text-slate-400">ĐÃ LẮP:</span>
            <span className={`font-black ${equippedSkills.length === 5 ? 'text-amber-300 animate-pulse' : 'text-cyan-300'}`}>
              {equippedSkills.length} / 5 Ô
            </span>
          </div>
        </div>

        {/* 5 HOLOGRAPHIC SLOTS GRID (FULLY CLICKABLE) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 mt-3.5">
          {[0, 1, 2, 3, 4].map((slotIdx) => {
            const skill = equippedSkills[slotIdx];

            if (skill) {
              const catClass = getCategoryColor(skill.category);
              return (
                <div
                  key={skill.id}
                  onClick={() => handleSlotClick(slotIdx)}
                  className="p-3 bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-900/90 border border-cyan-400/80 hover:border-cyan-300 rounded-xs relative group cursor-pointer hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 bg-cyan-950 border border-cyan-500/50 text-cyan-300 rounded-xs">
                        SLOT {slotIdx + 1}
                      </span>
                      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-xs border ${catClass}`}>
                        {getSkillCategoryName(skill.category)}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-bold text-xs sm:text-sm text-white font-chakra truncate">
                        {skill.name}
                      </h3>
                      <p className="text-[10px] text-cyan-300/90 truncate font-mono">
                        {skill.vietnameseName}
                      </p>
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-300 pt-1 border-t border-slate-800">
                        <span className="text-cyan-400 font-bold">{skill.mpCost} MP</span>
                        <span className="text-amber-300 font-bold">x{skill.damageMultiplier} ST</span>
                      </div>
                    </div>
                  </div>

                  {/* Action row */}
                  <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                    <span className="text-cyan-400 font-chakra font-bold group-hover:underline">
                      🔄 Đổi Chiêu
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        soundFx.playClick();
                        onToggleEquipSkill(skill.id);
                      }}
                      className="px-2 py-0.5 bg-red-950/80 hover:bg-red-900 border border-red-500/50 text-red-300 rounded-xs font-mono"
                    >
                      Tháo
                    </button>
                  </div>
                </div>
              );
            }

            // Empty Slot (Click to pick)
            return (
              <button
                key={`empty-slot-${slotIdx}`}
                type="button"
                onClick={() => handleSlotClick(slotIdx)}
                className="p-3 bg-slate-950/60 border-2 border-dashed border-cyan-500/40 hover:border-cyan-400 hover:bg-cyan-950/20 rounded-xs flex flex-col items-center justify-center text-center min-h-[120px] transition-all cursor-pointer group shadow-sm"
              >
                <div className="w-8 h-8 rounded-full border border-dashed border-cyan-400 group-hover:scale-110 group-hover:border-cyan-300 flex items-center justify-center text-cyan-400 mb-1.5 transition-transform bg-cyan-950/40">
                  <PlusIcon className="w-4 h-4" />
                </div>
                <span className="text-xs font-mono font-bold text-cyan-300 group-hover:text-white">
                  + SLOT {slotIdx + 1}: TRỐNG
                </span>
                <span className="text-[9px] text-cyan-400/70 mt-0.5 font-mono">
                  Ấn vào để chọn kỹ năng
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* MODAL: CHỌN KỸ NĂNG CHO SLOT ĐANG CHỌN */}
      {activeSlotModal !== null && (
        <div className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
          <div className="relative w-full max-w-2xl bg-slate-950 border border-cyan-400 rounded-sm shadow-[0_0_35px_rgba(0,229,255,0.4)] p-4 sm:p-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/30 mb-4">
              <div className="flex items-center gap-2">
                <SwordSlashIcon className="w-5 h-5 text-cyan-400" />
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white font-chakra">
                    CHỌN KỸ NĂNG XUẤT CHIẾN CHO SLOT {activeSlotModal + 1}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Danh sách các kỹ năng đã mở khóa ({unlockedSkills.length} kỹ năng khả dụng)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveSlotModal(null)}
                className="px-3 py-1 bg-slate-900 border border-slate-700 hover:border-red-400 text-slate-300 hover:text-red-300 rounded-xs font-mono text-xs cursor-pointer"
              >
                ✕ ĐÓNG
              </button>
            </div>

            {unlockedSkills.length === 0 ? (
              <div className="p-6 bg-slate-900/60 border border-dashed border-slate-800 rounded-xs text-center space-y-2">
                <p className="text-sm text-amber-300 font-chakra font-bold">
                  Bạn chưa mở khóa kỹ năng nào!
                </p>
                <p className="text-xs text-slate-400">
                  Hãy vượt qua Cổng Hầm Ngục Hạng E (Hang Sói Lycan), tăng cấp thợ săn hoặc kích hoạt các nhánh trong tab <strong className="text-cyan-400">TÀI NĂNG</strong> để mở khóa kỹ năng!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {unlockedSkills.map((sk) => {
                  const isEquipped = sk.equipped;
                  const catClass = getCategoryColor(sk.category);
                  return (
                    <div
                      key={sk.id}
                      className={`p-3 rounded-xs border transition-all flex flex-col justify-between ${
                        isEquipped
                          ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_12px_rgba(0,229,255,0.2)]'
                          : 'bg-slate-900/80 border-slate-700 hover:border-cyan-400 hover:bg-slate-850'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-xs border ${catClass}`}>
                            {getSkillCategoryName(sk.category)}
                          </span>
                          <span className="text-[10px] font-mono text-cyan-300">
                            Cấp {sk.level}/{sk.maxLevel}
                          </span>
                        </div>

                        <h4 className="font-bold text-sm text-white font-chakra">{sk.name}</h4>
                        <p className="text-[10px] text-cyan-400/90 font-mono">{sk.vietnameseName}</p>
                        <p className="text-[11px] text-slate-300 mt-1.5 line-clamp-2 leading-tight">{sk.description}</p>

                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-300 mt-2 pt-1.5 border-t border-slate-800">
                          <span className="text-cyan-400 font-bold">{sk.mpCost} MP</span>
                          <span className="text-amber-300 font-bold">x{sk.damageMultiplier} Sát Thương</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleSelectSkillForSlot(sk)}
                        className={`mt-3 w-full py-2 rounded-xs text-xs font-bold font-chakra transition-all cursor-pointer text-center ${
                          isEquipped
                            ? 'bg-amber-950 border border-amber-400 text-amber-300 hover:bg-amber-900'
                            : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-[0_0_12px_rgba(0,229,255,0.4)]'
                        }`}
                      >
                        {isEquipped ? '✓ ĐANG TRANG BỊ (Nhấp để Tháo)' : `⚡ LẮP VÀO SLOT ${activeSlotModal + 1}`}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. SKILL CATALOG & DRAWER */}
      <div className="system-window p-3 sm:p-5 rounded-sm relative bg-slate-950/80 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <CrownMonarchIcon className="w-4 h-4 text-purple-400" />
            <h3 className="text-xs sm:text-sm font-bold text-white font-chakra">
              THƯ VIỆN KỸ NĂNG ({unlockedSkills.length} ĐÃ MỞ / {skills.length} TỔNG CỘNG)
            </h3>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1 text-[10px] font-mono">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  soundFx.playClick();
                  setSelectedCategory(cat.id);
                }}
                className={`px-2 py-1 rounded-xs border transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-cyan-950 border-cyan-400 text-cyan-200 shadow-[0_0_10px_rgba(0,229,255,0.4)]'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>
        </div>

        {/* SKILLS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
          {filteredSkills.map((skill) => {
            const isEquipped = skill.equipped && skill.unlocked;
            const isLocked = !skill.unlocked;
            const upgradeCost = skill.level * 1500;
            const canUpgrade = !isLocked && skill.level < skill.maxLevel && playerGold >= upgradeCost;
            const catClass = getCategoryColor(skill.category);

            return (
              <div
                key={skill.id}
                className={`p-3 rounded-xs border transition-all flex flex-col justify-between relative ${
                  isEquipped
                    ? 'bg-gradient-to-b from-cyan-950/40 via-slate-950 to-slate-900 border-cyan-400/80 shadow-[0_0_12px_rgba(0,229,255,0.2)]'
                    : isLocked
                    ? 'bg-slate-950/40 border-slate-800/80 opacity-60'
                    : 'bg-slate-950/80 border-slate-700/80 hover:border-cyan-500/50 hover:bg-slate-900/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-xs border ${catClass}`}>
                      {getSkillCategoryName(skill.category)}
                    </span>

                    {isEquipped && (
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 bg-cyan-950 border border-cyan-400 text-cyan-300 rounded-xs flex items-center gap-1">
                        <CheckIcon className="w-3 h-3" />
                        <span>XUẤT CHIẾN</span>
                      </span>
                    )}

                    {isLocked && (
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 bg-slate-900 border border-slate-700 text-slate-400 rounded-xs flex items-center gap-1">
                        <AlertGlyphIcon className="w-3 h-3 text-amber-400" />
                        <span>CHƯA MỞ</span>
                      </span>
                    )}
                  </div>

                  <h4 className="font-bold text-sm text-white font-chakra flex items-center justify-between">
                    <span>{skill.name}</span>
                    <span className="text-[10px] font-mono text-cyan-300 font-normal">
                      Cấp {skill.level}/{skill.maxLevel}
                    </span>
                  </h4>

                  <p className="text-[10px] text-cyan-400/80 font-mono mt-0.5">
                    {skill.vietnameseName}
                  </p>

                  <p className="text-[11px] text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                    {skill.description}
                  </p>

                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-2.5 pt-2 border-t border-slate-800">
                    <span className="text-cyan-400 font-bold">{skill.mpCost} MP Tiêu Hao</span>
                    <span className="text-amber-300 font-bold">x{skill.damageMultiplier} Sát Thương</span>
                  </div>
                </div>

                {/* Bottom Action Controls */}
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center gap-1.5">
                  {isLocked ? (
                    <div className="w-full py-1.5 bg-slate-900/60 border border-slate-800 text-[10px] font-mono text-amber-400/90 text-center rounded-xs">
                      🔒 {skill.minLevelToUnlock ? `Mở ở Cấp ${skill.minLevelToUnlock} hoặc nâng Tài Năng` : 'Vượt Cổng / Nâng Tài Năng'}
                    </div>
                  ) : (
                    <>
                      {/* Equip / Unequip Toggle */}
                      <button
                        onClick={() => {
                          soundFx.playClick();
                          onToggleEquipSkill(skill.id);
                        }}
                        disabled={!isEquipped && equippedSkills.length >= 5}
                        className={`flex-1 py-1.5 px-2 text-xs font-bold font-chakra rounded-xs cursor-pointer transition-all text-center ${
                          isEquipped
                            ? 'bg-red-950/80 hover:bg-red-900 border border-red-500/50 text-red-300'
                            : equippedSkills.length >= 5
                            ? 'bg-slate-900 border border-slate-800 text-slate-500 cursor-not-allowed'
                            : 'bg-cyan-950 hover:bg-cyan-900 border border-cyan-400 text-cyan-200 shadow-[0_0_10px_rgba(0,229,255,0.3)]'
                        }`}
                      >
                        {isEquipped ? 'Tháo Khỏi Đội Hình' : equippedSkills.length >= 5 ? 'Đã Đầy (5/5)' : '+ Lắp Xuất Chiến'}
                      </button>

                      {/* Upgrade Skill Button */}
                      {onUpgradeSkill && skill.level < skill.maxLevel && (
                        <button
                          onClick={() => {
                            if (canUpgrade) {
                              soundFx.playLevelUp();
                              onUpgradeSkill(skill.id);
                            } else {
                              soundFx.playPenaltyWarning();
                            }
                          }}
                          disabled={!canUpgrade}
                          className={`py-1.5 px-2.5 text-[10px] font-mono font-bold rounded-xs border transition-all cursor-pointer flex items-center gap-1 ${
                            canUpgrade
                              ? 'bg-amber-950/80 border-amber-400 text-amber-300 hover:bg-amber-900 shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                              : 'bg-slate-900/60 border-slate-800 text-slate-500 cursor-not-allowed'
                          }`}
                          title={`Nâng cấp tốn ${upgradeCost.toLocaleString()} Vàng`}
                        >
                          <FlameStreakIcon className="w-3 h-3 text-amber-400 shrink-0" />
                          <span>+{upgradeCost.toLocaleString()}G</span>
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
