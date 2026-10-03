import React, { useState } from 'react';
import { PlayerStats, ShopItem, Skill } from '../../types';
import {
  StrengthIcon,
  AgilityIcon,
  VitalityIcon,
  IntelligenceIcon,
  PerceptionIcon,
  SwordSlashIcon,
  PotionIcon,
  PlusIcon,
  CrownMonarchIcon,
  AlertGlyphIcon,
  ShieldDefendIcon,
} from '../icons/SystemIcons';
import { soundFx } from '../../utils/soundEffects';
import { HunterVisual } from '../dungeon/HunterVisual';
import { SkillLoadoutDeck } from '../skills/SkillLoadoutDeck';
import { getSkillRank, RANK_STYLE_CONFIGS } from '../../utils/skillRank';
import { StatusCanvasVFX } from '../status/StatusCanvasVFX';

interface StatusTabProps {
  stats: PlayerStats;
  equippedItems: ShopItem[];
  skills?: Skill[];
  onAllocateStat: (statKey: keyof Pick<PlayerStats, 'strength' | 'agility' | 'intelligence' | 'vitality' | 'perception'>, amount: number) => void;
  onUseFullRecovery: () => void;
  onTriggerManaBurn?: (mpCost: number, skillName: string) => void;
  recoveryPotionsCount: number;
  onToggleEquipSkill?: (skillId: string) => void;
  onUpgradeSkill?: (skillId: string) => void;
}

export const StatusTab: React.FC<StatusTabProps> = ({
  stats,
  equippedItems,
  skills = [],
  onAllocateStat,
  onUseFullRecovery,
  onTriggerManaBurn,
  recoveryPotionsCount,
  onToggleEquipSkill,
  onUpgradeSkill,
}) => {
  const [allocatedTemp, setAllocatedTemp] = useState<string | null>(null);
  const [manaBurnAnim, setManaBurnAnim] = useState(false);
  const [lastUsedSkill, setLastUsedSkill] = useState<string | null>(null);
  const [hoveredStat, setHoveredStat] = useState<string | null>(null);
  const [customInputs, setCustomInputs] = useState<Record<string, string>>({
    strength: '',
    vitality: '',
    agility: '',
    intelligence: '',
    perception: '',
  });
  const [globalQuickAmount, setGlobalQuickAmount] = useState<string>('10');

  const hasUnusedPoints = stats.statPoints > 0;

  const handleAllocate = (key: keyof Pick<PlayerStats, 'strength' | 'agility' | 'intelligence' | 'vitality' | 'perception'>, amt: number) => {
    if (stats.statPoints < amt || amt <= 0) return;
    soundFx.playStatAllocated();
    onAllocateStat(key, amt);
    setAllocatedTemp(key);
    setTimeout(() => setAllocatedTemp(null), 800);
  };

  const handleCustomInputChange = (key: string, val: string) => {
    const cleaned = val.replace(/[^0-9]/g, '');
    setCustomInputs((prev) => ({ ...prev, [key]: cleaned }));
  };

  const handleApplyCustom = (key: keyof Pick<PlayerStats, 'strength' | 'agility' | 'intelligence' | 'vitality' | 'perception'>) => {
    const parsed = parseInt(customInputs[key], 10);
    if (isNaN(parsed) || parsed <= 0) return;
    const actualAmt = Math.min(parsed, stats.statPoints);
    if (actualAmt > 0) {
      handleAllocate(key, actualAmt);
      setCustomInputs((prev) => ({ ...prev, [key]: '' }));
    }
  };

  const handleApplyGlobalQuick = (key: keyof Pick<PlayerStats, 'strength' | 'agility' | 'intelligence' | 'vitality' | 'perception'>) => {
    const parsed = parseInt(globalQuickAmount, 10);
    if (isNaN(parsed) || parsed <= 0) return;
    const actualAmt = Math.min(parsed, stats.statPoints);
    if (actualAmt > 0) {
      handleAllocate(key, actualAmt);
    }
  };

  const handleCastSkill = (skill: Skill) => {
    if (stats.mp < skill.mpCost) {
      soundFx.playPenaltyWarning();
      return;
    }
    soundFx.playManaBurnSound();
    setManaBurnAnim(true);
    setLastUsedSkill(skill.name);
    onTriggerManaBurn?.(skill.mpCost, skill.name);
    setTimeout(() => {
      setManaBurnAnim(false);
    }, 1800);
  };

  const handleQuickManaBurnTest = () => {
    const cost = 25;
    if (stats.mp < cost) {
      soundFx.playPenaltyWarning();
      return;
    }
    soundFx.playManaBurnSound();
    setManaBurnAnim(true);
    setLastUsedSkill('Giải Phóng Ma Lực Cơ Bản');
    onTriggerManaBurn?.(cost, 'Giải Phóng Ma Lực');
    setTimeout(() => {
      setManaBurnAnim(false);
    }, 1800);
  };

  // Calculated combat attributes
  const physicalAttack = Math.round(stats.strength * 3.2 + stats.agility * 1.5);
  const magicPower = Math.round(stats.intelligence * 4.0);
  const critRate = Math.min(75, Math.round(15 + stats.perception * 0.45 + stats.agility * 0.2));
  const evasionRate = Math.min(60, Math.round(10 + stats.agility * 0.5));
  const physicalDefense = Math.round(stats.vitality * 2.8);
  const manaRegen = Math.round(5 + stats.intelligence * 0.35);

  const statItems = [
    {
      key: 'strength' as const,
      shortKey: 'STR',
      label: 'SỨC MẠNH',
      sublabel: 'Physical Might',
      value: stats.strength,
      desc: 'Tăng sát thương vật lý, uy lực dao găm và khả năng mang vác vũ khí hạng nặng.',
      potentialBoost: `+${(stats.statPoints * 3.2).toFixed(0)} Sát thương vật lý`,
      icon: StrengthIcon,
      accentColor: '#ef4444',
      bgGlow: 'from-red-950/40 via-red-900/20 to-slate-950',
      borderColor: 'border-red-500/50 hover:border-red-400',
      badgeColor: 'bg-red-950 border-red-500/60 text-red-300',
      textColor: 'text-red-400',
      btnColor: 'hover:border-red-400 hover:text-red-300 hover:bg-red-950/60',
    },
    {
      key: 'vitality' as const,
      shortKey: 'VIT',
      label: 'THỂ LỰC',
      sublabel: 'Max Vitality & Defense',
      value: stats.vitality,
      desc: 'Tăng lượng máu tối đa (HP), chỉ số giáp phòng ngự và giảm tích tụ mệt mỏi.',
      potentialBoost: `+${stats.statPoints * 20} HP tối đa & +${(stats.statPoints * 2.8).toFixed(0)} Giáp`,
      icon: VitalityIcon,
      accentColor: '#10b981',
      bgGlow: 'from-emerald-950/40 via-emerald-900/20 to-slate-950',
      borderColor: 'border-emerald-500/50 hover:border-emerald-400',
      badgeColor: 'bg-emerald-950 border-emerald-500/60 text-emerald-300',
      textColor: 'text-emerald-400',
      btnColor: 'hover:border-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/60',
    },
    {
      key: 'agility' as const,
      shortKey: 'AGI',
      label: 'NHANH NHẸN',
      sublabel: 'Speed & Reflex',
      value: stats.agility,
      desc: 'Tăng tốc độ di chuyển, phản xạ né tránh 50/100 và tần suất ra chiêu.',
      potentialBoost: `+${(stats.statPoints * 0.5).toFixed(1)}% Tỷ lệ né đòn`,
      icon: AgilityIcon,
      accentColor: '#f59e0b',
      bgGlow: 'from-amber-950/40 via-amber-900/20 to-slate-950',
      borderColor: 'border-amber-500/50 hover:border-amber-400',
      badgeColor: 'bg-amber-950 border-amber-500/60 text-amber-300',
      textColor: 'text-amber-400',
      btnColor: 'hover:border-amber-400 hover:text-amber-300 hover:bg-amber-950/60',
    },
    {
      key: 'intelligence' as const,
      shortKey: 'INT',
      label: 'TRÍ TUỆ',
      sublabel: 'Mana & Shadow Power',
      value: stats.intelligence,
      desc: 'Tăng trữ lượng Mana (MP), sức mạnh ma pháp bóng tối và hồi phục mana mỗi hiệp.',
      potentialBoost: `+${stats.statPoints * 15} MP & +${(stats.statPoints * 4.0).toFixed(0)} Ma lực`,
      icon: IntelligenceIcon,
      accentColor: '#00d2ff',
      bgGlow: 'from-cyan-950/40 via-blue-900/20 to-slate-950',
      borderColor: 'border-cyan-500/50 hover:border-cyan-400',
      badgeColor: 'bg-cyan-950 border-cyan-500/60 text-cyan-300',
      textColor: 'text-cyan-400',
      btnColor: 'hover:border-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/60',
    },
    {
      key: 'perception' as const,
      shortKey: 'PER',
      label: 'GIÁC QUAN',
      sublabel: 'Sensory & Lethality',
      value: stats.perception,
      desc: 'Tăng khả năng phát hiện điểm yếu, tỷ lệ bạo kích và cảm nhận sát khí đối phương.',
      potentialBoost: `+${(stats.statPoints * 0.45).toFixed(1)}% Tỷ lệ bạo kích`,
      icon: PerceptionIcon,
      accentColor: '#a855f7',
      bgGlow: 'from-purple-950/40 via-purple-900/20 to-slate-950',
      borderColor: 'border-purple-500/50 hover:border-purple-400',
      badgeColor: 'bg-purple-950 border-purple-500/60 text-purple-300',
      textColor: 'text-purple-400',
      btnColor: 'hover:border-purple-400 hover:text-purple-300 hover:bg-purple-950/60',
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-2 sm:p-4 md:p-6 space-y-4 sm:space-y-6 box-border overflow-hidden">
      {/* Top Banner: Status Header */}
      <div className="system-window p-3 sm:p-5 md:p-6 rounded-sm relative overflow-hidden">
        <div className="hud-corner-tl" />
        <div className="hud-corner-tr" />
        <div className="hud-corner-bl" />
        <div className="hud-corner-br" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4 border-b border-cyan-500/30 pb-3 sm:pb-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono tracking-widest uppercase">
              <span>HỆ THỐNG / BẢNG THÔNG SỐ NGƯỜI CHƠI 3D HOLOGRAPHIC</span>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white font-chakra tracking-wider">
                STATUS WINDOW
              </h1>
              <span className="text-xs sm:text-sm font-normal text-cyan-300 px-2 py-0.5 border border-cyan-400/50 bg-cyan-950/60 font-mono">
                [ID: HUNTER-001]
              </span>
            </div>
          </div>

          {/* Quick Action: Full Recovery Potion */}
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                if (recoveryPotionsCount > 0) {
                  soundFx.playPotion();
                  onUseFullRecovery();
                }
              }}
              disabled={recoveryPotionsCount <= 0 || (stats.hp === stats.maxHp && stats.mp === stats.maxMp && stats.fatigue === 0)}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-3 py-2 border rounded-xs text-xs font-bold transition-all cursor-pointer ${
                recoveryPotionsCount > 0 && (stats.hp < stats.maxHp || stats.mp < stats.maxMp || stats.fatigue > 0)
                  ? 'bg-gradient-to-r from-emerald-950 to-teal-950 border-emerald-400 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:brightness-110'
                  : 'bg-slate-900/60 border-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <PotionIcon className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="truncate">HỒI PHỤC TOÀN PHẦN ({recoveryPotionsCount} Bình)</span>
            </button>
          </div>
        </div>

        {/* Identity Overview Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mt-4 sm:mt-5 text-sm">
          <div className="p-2.5 sm:p-3 bg-slate-950/70 border border-cyan-500/20 rounded-xs">
            <span className="text-[10px] sm:text-xs text-slate-400 block font-chakra uppercase">DANH HIỆU</span>
            <span className="font-bold text-cyan-200 text-xs sm:text-base truncate block">{stats.title}</span>
          </div>

          <div className="p-2.5 sm:p-3 bg-slate-950/70 border border-cyan-500/20 rounded-xs">
            <span className="text-[10px] sm:text-xs text-slate-400 block font-chakra uppercase">NGHỀ NGHIỆP</span>
            <div className="flex items-center gap-1">
              <CrownMonarchIcon className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span className="font-bold text-purple-300 text-xs sm:text-base truncate">{stats.job}</span>
            </div>
          </div>

          <div className="p-2.5 sm:p-3 bg-slate-950/70 border border-cyan-500/20 rounded-xs">
            <span className="text-[10px] sm:text-xs text-slate-400 block font-chakra uppercase">CẤP BẬC THỢ SĂN</span>
            <span className="font-bold text-yellow-300 text-xs sm:text-base font-orbitron">HẠNG {stats.rank}</span>
          </div>

          <div className="p-2.5 sm:p-3 bg-slate-950/70 border border-cyan-500/20 rounded-xs">
            <span className="text-[10px] sm:text-xs text-slate-400 block font-chakra uppercase">MỨC ĐỘ MỆT MỎI</span>
            <span className={`font-bold text-xs sm:text-base font-orbitron ${stats.fatigue > 60 ? 'text-red-400' : 'text-slate-200'}`}>
              {stats.fatigue} / {stats.maxFatigue}
            </span>
          </div>
        </div>

        {/* Character Visual Showcase & Live Mana Burn Channeling */}
        <div className="mt-4 sm:mt-5 p-3 sm:p-5 bg-gradient-to-r from-slate-950 via-[#030d1e] to-slate-950 border border-cyan-500/30 rounded-xs relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
            {/* Left: Animated Hunter Model with Mana Burn Aura */}
            <div className="relative flex flex-col items-center shrink-0">
              <div className={`relative transition-all duration-300 ${manaBurnAnim ? 'scale-105' : ''}`}>
                <HunterVisual
                  isAttacking={manaBurnAnim}
                  isHurt={false}
                  isGuarding={false}
                  isStealthed={false}
                  className="w-32 h-32 sm:w-40 sm:h-40"
                />

                {/* High-Performance Canvas Particle System (Zero Layout Thrashing) */}
                <StatusCanvasVFX isManaBurning={manaBurnAnim} activeSkillName={lastUsedSkill} />
              </div>

              <div className="mt-1 text-center">
                <span className="text-[11px] sm:text-xs font-mono font-bold text-cyan-300 flex items-center justify-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${manaBurnAnim ? 'bg-cyan-300 animate-ping' : 'bg-cyan-400'}`} />
                  SUNG JIN-WOO
                </span>
                {manaBurnAnim && (
                  <span className="text-[10px] font-chakra font-bold text-cyan-200 animate-pulse block">
                    MANA BURN: MẢNH NĂNG LƯỢNG TỎA RA!
                  </span>
                )}
              </div>
            </div>

            {/* Right: HP / MP Gauges & Interactive Skill Mana Burn Controls */}
            <div className="flex-1 w-full space-y-3">
              {/* Gauges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {/* HP */}
                <div className="p-2.5 bg-slate-900/80 border border-red-500/30 rounded-xs">
                  <div className="flex items-center justify-between text-xs font-chakra font-bold mb-1">
                    <span className="text-red-400 uppercase text-[11px]">SINH LỰC (HP)</span>
                    <span className="text-white font-orbitron text-xs">{stats.hp} / {stats.maxHp}</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-red-950">
                    <div
                      className="h-full bg-gradient-to-r from-red-600 to-rose-400 transition-all duration-300"
                      style={{ width: `${Math.min(100, (stats.hp / stats.maxHp) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* MP */}
                <div className="p-2.5 bg-slate-900/80 border border-cyan-500/40 rounded-xs">
                  <div className="flex items-center justify-between text-xs font-chakra font-bold mb-1">
                    <span className="text-cyan-400 uppercase text-[11px] flex items-center gap-1">
                      <span>MA LỰC (MP)</span>
                      {manaBurnAnim && <span className="text-[9px] text-cyan-200 animate-ping">⚡ BURNING</span>}
                    </span>
                    <span className="text-white font-orbitron text-xs">{stats.mp} / {stats.maxMp}</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-cyan-950">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-sky-200 transition-all duration-300 shadow-[0_0_10px_#00e5ff]"
                      style={{ width: `${Math.min(100, (stats.mp / stats.maxMp) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Mana Burn Skills Activation Section */}
              <div className="p-2.5 bg-slate-950/80 border border-cyan-500/30 rounded-xs">
                <div className="flex items-center justify-between pb-1.5 border-b border-cyan-500/20 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    <span className="text-[11px] sm:text-xs font-chakra font-bold text-cyan-300 uppercase tracking-wide">
                      THI TRIỂN KỸ NĂNG & TIÊU HAO MANA
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-slate-400 hidden sm:inline">
                    Bấm để giải phóng mana
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={handleQuickManaBurnTest}
                    disabled={stats.mp < 25}
                    className={`px-2.5 py-1 rounded-xs border text-[11px] font-chakra font-bold flex items-center gap-1 transition-all cursor-pointer ${
                      stats.mp >= 25
                        ? 'bg-gradient-to-r from-cyan-950 to-blue-900 border-cyan-400 text-cyan-200 shadow-[0_0_10px_rgba(0,229,255,0.4)]'
                        : 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed'
                    }`}
                  >
                    <span>⚡ BÙNG TỎA MA LỰC</span>
                    <span className="text-[9px] text-cyan-300 font-mono">(-25 MP)</span>
                  </button>

                  {skills.filter((s) => s.unlocked).map((sk) => {
                    const isReady = stats.mp >= sk.mpCost;
                    const rank = getSkillRank(sk);
                    const rankCfg = RANK_STYLE_CONFIGS[rank];
                    const pulseClass = isReady ? rankCfg.readyPulseClass : '';

                    return (
                      <button
                        key={sk.id}
                        onClick={() => handleCastSkill(sk)}
                        disabled={!isReady}
                        className={`px-2.5 py-1 rounded-xs border text-[11px] font-chakra font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                          isReady
                            ? `bg-slate-900/90 ${pulseClass} border-cyan-500/70 text-white hover:border-cyan-300 hover:text-cyan-200`
                            : 'bg-slate-900/60 border-slate-800 text-slate-600 cursor-not-allowed opacity-60'
                        }`}
                      >
                        <span className={`px-1 py-0.2 rounded-xs text-[8px] font-black font-orbitron border ${rankCfg.badgeBorder} ${rankCfg.badgeBg} ${rankCfg.badgeText}`}>
                          [{rank}]
                        </span>
                        <span>{sk.name}</span>
                        <span className="text-[9px] text-cyan-400 font-mono">(-{sk.mpCost} MP)</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION: STAT POTENTIAL INDICATOR (PULSES WHEN POINTS ARE AVAILABLE) */}
      {/* ========================================================================= */}
      <div
        className={`w-full p-4 sm:p-5 rounded-sm border transition-all duration-500 relative overflow-hidden backdrop-blur-md ${
          hasUnusedPoints
            ? 'bg-gradient-to-r from-cyan-950/90 via-blue-950/95 to-purple-950/90 border-cyan-400 shadow-[0_0_35px_rgba(0,229,255,0.4),inset_0_0_20px_rgba(0,229,255,0.2)] animate-pulse'
            : 'bg-slate-950/80 border-slate-800 shadow-sm'
        }`}
      >
        <div className="hud-corner-tl" />
        <div className="hud-corner-tr" />
        <div className="hud-corner-bl" />
        <div className="hud-corner-br" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3">
            {/* Holographic Radar Pulse Orb */}
            <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-slate-950 border border-cyan-400/80 shrink-0 shadow-[0_0_15px_rgba(0,229,255,0.5)]">
              <div className={`w-6 h-6 rounded-full ${hasUnusedPoints ? 'bg-gradient-to-r from-cyan-400 to-amber-400 animate-ping opacity-75' : 'bg-cyan-500/40'}`} />
              <div className="absolute inset-0 rounded-full border border-cyan-300/40 animate-spin-slow pointer-events-none" />
              <span className="absolute font-orbitron font-black text-sm text-cyan-200">
                {stats.statPoints}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold tracking-widest text-cyan-300 uppercase flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${hasUnusedPoints ? 'bg-amber-400 animate-bounce' : 'bg-emerald-400'}`} />
                  {hasUnusedPoints ? '⚡ CHỈ BÁO TIỀM NĂNG CHƯA KHAI PHÁ' : '✓ TRẠNG THÁI THUỘC TÍNH TỐI ƯU'}
                </span>
                {hasUnusedPoints && (
                  <span className="px-1.5 py-0.2 bg-amber-950 border border-amber-400 text-amber-300 text-[10px] font-mono font-black rounded-xs animate-pulse">
                    +{stats.statPoints} ĐIỂM
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-300 mt-0.5 max-w-xl font-chakra">
                {hasUnusedPoints
                  ? 'Hệ Thống ghi nhận điểm thuộc tính dư thừa! Hãy phân bổ ngay vào các trục năng lực 3D bên dưới để gia tăng đột biến sức mạnh thực chiến.'
                  : 'Tất cả điểm tiềm năng đã được hấp thụ hoàn toàn vào ma trận thể chất. Hoàn thành nhiệm vụ hàng ngày hoặc vượt ải để tích lũy thêm điểm.'}
              </p>
            </div>
          </div>

          {/* Stat Potential Growth Breakdown Pills */}
          {hasUnusedPoints && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full scrollbar-none">
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-1 rounded-xs border border-cyan-500/40 shrink-0">
                +{(stats.statPoints * 3.2).toFixed(0)} ATK
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-1 rounded-xs border border-emerald-500/40 shrink-0">
                +{stats.statPoints * 20} HP
              </span>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-950/80 px-2 py-1 rounded-xs border border-amber-500/40 shrink-0">
                +{(stats.statPoints * 0.5).toFixed(1)}% EVD
              </span>
              <span className="text-[10px] font-mono text-purple-400 bg-purple-950/80 px-2 py-1 rounded-xs border border-purple-500/40 shrink-0">
                +{(stats.statPoints * 0.45).toFixed(1)}% CRIT
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3D-PERSPECTIVE HOLOGRAPHIC GRID: 5 CORE PLAYER ATTRIBUTES */}
      {/* ========================================================================= */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-cyan-500/20">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
            <h2 className="text-base sm:text-lg font-black text-white font-chakra tracking-wide uppercase flex items-center gap-2">
              <span>MA TRẬN THUỘC TÍNH 3D HOLOGRAPHIC (CORE ATTRIBUTES)</span>
            </h2>
          </div>
          <span className="text-[11px] font-mono text-cyan-400">
            [ĐIỂM CÒN LẠI: <strong className="text-amber-300 font-bold">{stats.statPoints}</strong>]
          </span>
        </div>

        {/* Master Quick Custom Allocation Toolbar */}
        <div className="p-3 bg-gradient-to-r from-slate-950 via-[#041124] to-slate-950 border border-cyan-500/40 rounded-xs shadow-[0_0_20px_rgba(0,229,255,0.15)] space-y-2.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cyan-500/20 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs sm:text-sm font-black font-chakra text-white tracking-wide uppercase flex items-center gap-1.5">
                <span>⚡ CÔNG CỤ NHẬP CHỈ SỐ CỘNG NHANH (QUICK ALLOCATOR)</span>
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              Nhập số điểm mong muốn rồi bấm nút chỉ số tương ứng
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5">
            {/* Input Box & Quick Preset Pills */}
            <div className="flex flex-wrap items-center gap-1.5 flex-1">
              <div className="relative flex-1 min-w-[140px] max-w-[200px]">
                <input
                  type="number"
                  min={1}
                  max={stats.statPoints}
                  value={globalQuickAmount}
                  onChange={(e) => setGlobalQuickAmount(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="Số điểm muốn cộng..."
                  disabled={stats.statPoints <= 0}
                  className="w-full py-1.5 px-2.5 bg-slate-900/90 border border-cyan-500/60 focus:border-cyan-300 rounded-xs text-xs font-mono text-cyan-200 outline-none text-center font-bold placeholder:text-slate-600 disabled:opacity-40"
                />
              </div>

              {/* Quick number presets: +5, +10, +20, +50, MAX */}
              <div className="flex items-center gap-1">
                {[5, 10, 20, 50].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setGlobalQuickAmount(String(num))}
                    className={`px-2 py-1 rounded-xs border text-[10px] font-mono font-bold transition-all cursor-pointer ${
                      globalQuickAmount === String(num)
                        ? 'bg-cyan-900/90 border-cyan-300 text-cyan-100 shadow-[0_0_8px_rgba(0,229,255,0.4)]'
                        : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    +{num}
                  </button>
                ))}

                {stats.statPoints > 0 && (
                  <button
                    key="max-btn"
                    type="button"
                    onClick={() => setGlobalQuickAmount(String(stats.statPoints))}
                    className="px-2 py-1 bg-amber-950/90 hover:bg-amber-900 border border-amber-400 text-amber-300 rounded-xs text-[10px] font-mono font-bold transition-all cursor-pointer shadow-[0_0_8px_rgba(245,158,11,0.3)]"
                    title="Điền toàn bộ điểm còn lại"
                  >
                    MAX ({stats.statPoints})
                  </button>
                )}
              </div>
            </div>

            {/* One-click Allocate buttons for each of the 5 stats */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-mono text-slate-400 hidden xl:inline">Cộng nhanh:</span>
              {statItems.map((item) => {
                const amt = Math.min(parseInt(globalQuickAmount, 10) || 0, stats.statPoints);
                const canApply = stats.statPoints > 0 && amt > 0;
                return (
                  <button
                    key={item.key}
                    type="button"
                    disabled={!canApply}
                    onClick={() => handleApplyGlobalQuick(item.key)}
                    className={`px-2.5 py-1.5 rounded-xs border text-xs font-chakra font-black transition-all flex items-center gap-1 ${
                      canApply
                        ? `${item.badgeColor} hover:brightness-125 cursor-pointer shadow-[0_0_10px_rgba(0,229,255,0.25)] active:scale-95`
                        : 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed opacity-40'
                    }`}
                    title={`Cộng ${amt} điểm vào ${item.label}`}
                  >
                    <span>+{amt > 0 ? amt : ''}</span>
                    <span>{item.shortKey}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3D Perspective Grid Container */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 [perspective:1200px]"
        >
          {statItems.map((item) => {
            const Icon = item.icon;
            const isRecentlyAllocated = allocatedTemp === item.key;
            const isHovered = hoveredStat === item.key;

            return (
              <div
                key={item.key}
                onMouseEnter={() => setHoveredStat(item.key)}
                onMouseLeave={() => setHoveredStat(null)}
                className={`group relative p-4 rounded-sm border transition-all duration-300 ease-out [transform-style:preserve-3d] flex flex-col justify-between ${
                  item.borderColor
                } ${
                  hasUnusedPoints
                    ? 'shadow-[0_4px_20px_rgba(0,210,255,0.15)] ring-1 ring-cyan-400/30'
                    : 'shadow-md'
                } bg-gradient-to-b ${item.bgGlow} ${
                  isRecentlyAllocated ? 'ring-2 ring-cyan-400 scale-[1.03]' : ''
                } hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(0,229,255,0.3)]`}
                style={{
                  transform: isHovered
                    ? 'rotateX(4deg) rotateY(-4deg) translateZ(12px)'
                    : 'rotateX(0deg) rotateY(0deg) translateZ(0px)',
                }}
              >
                {/* 3D Corner Tech Brackets */}
                <div className="hud-corner-tl" />
                <div className="hud-corner-tr" />
                <div className="hud-corner-bl" />
                <div className="hud-corner-br" />

                {/* Holographic Scanline Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none rounded-sm" />

                <div>
                  {/* Card Top: Icon, Code Badge & Core Value */}
                  <div className="flex items-center justify-between gap-2 mb-2 relative z-10 [transform:translateZ(10px)]">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xs bg-slate-950/90 border border-slate-700 group-hover:border-cyan-400 transition-colors shadow-inner">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className={`text-[10px] font-mono font-black px-1.5 py-0.2 rounded-xs border ${item.badgeColor}`}>
                          {item.shortKey}
                        </span>
                      </div>
                    </div>

                    {/* Main Numeric Stat Display with 3D Depth */}
                    <div className="text-right">
                      <span className="text-2xl sm:text-3xl font-black font-orbitron text-white tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                        {item.value}
                      </span>
                    </div>
                  </div>

                  {/* Attribute Name & Description */}
                  <div className="space-y-1 mb-3 relative z-10">
                    <h3 className="text-sm font-black text-white font-chakra tracking-wide">
                      {item.label}
                    </h3>
                    <span className="text-[10px] font-mono text-cyan-400/80 block">
                      {item.sublabel}
                    </span>
                    <p className="text-[11px] text-slate-300 leading-tight line-clamp-2">
                      {item.desc}
                    </p>
                  </div>

                  {/* Stat Potential Growth Indicator inside card */}
                  {hasUnusedPoints && (
                    <div className="mb-3 p-1.5 bg-slate-950/90 border border-cyan-500/30 rounded-xs text-[10px] font-mono text-cyan-300 flex items-center justify-between animate-pulse">
                      <span>TIỀM NĂNG:</span>
                      <span className="font-bold text-amber-300">{item.potentialBoost}</span>
                    </div>
                  )}
                </div>

                {/* Action Controls: Preset + Custom Allocation Input */}
                <div className="pt-2 border-t border-slate-800/80 space-y-2 relative z-10">
                  {/* Preset quick buttons row */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleAllocate(item.key, 1)}
                      disabled={stats.statPoints < 1}
                      className={`flex-1 py-1 px-1.5 bg-slate-900/90 border border-cyan-500/40 text-[11px] font-chakra font-black rounded-xs transition-all cursor-pointer flex items-center justify-center gap-0.5 ${
                        stats.statPoints >= 1
                          ? 'text-cyan-200 hover:border-cyan-300 hover:bg-cyan-950 hover:shadow-[0_0_10px_rgba(0,229,255,0.4)]'
                          : 'opacity-40 border-slate-800 text-slate-600 cursor-not-allowed'
                      }`}
                    >
                      <span>+1</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAllocate(item.key, 5)}
                      disabled={stats.statPoints < 5}
                      className={`flex-1 py-1 px-1.5 bg-slate-900/90 border border-cyan-500/40 text-[11px] font-chakra font-black rounded-xs transition-all cursor-pointer flex items-center justify-center gap-0.5 ${
                        stats.statPoints >= 5
                          ? 'text-cyan-200 hover:border-cyan-300 hover:bg-cyan-950 hover:shadow-[0_0_10px_rgba(0,229,255,0.4)]'
                          : 'opacity-40 border-slate-800 text-slate-600 cursor-not-allowed'
                      }`}
                    >
                      <span>+5</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAllocate(item.key, 10)}
                      disabled={stats.statPoints < 10}
                      className={`flex-1 py-1 px-1.5 bg-slate-900/90 border border-cyan-500/40 text-[11px] font-chakra font-black rounded-xs transition-all cursor-pointer flex items-center justify-center gap-0.5 ${
                        stats.statPoints >= 10
                          ? 'text-cyan-200 hover:border-cyan-300 hover:bg-cyan-950 hover:shadow-[0_0_10px_rgba(0,229,255,0.4)]'
                          : 'opacity-40 border-slate-800 text-slate-600 cursor-not-allowed'
                      }`}
                    >
                      <span>+10</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAllocate(item.key, stats.statPoints)}
                      disabled={stats.statPoints <= 0}
                      className={`py-1 px-2 border text-[10px] font-mono font-bold rounded-xs cursor-pointer transition-all ${
                        stats.statPoints > 0
                          ? 'bg-amber-950/90 border-amber-400 text-amber-300 hover:bg-amber-900 shadow-[0_0_8px_rgba(245,158,11,0.3)]'
                          : 'opacity-40 border-slate-800 bg-slate-900 text-slate-600 cursor-not-allowed'
                      }`}
                      title={`Cộng toàn bộ ${stats.statPoints} điểm còn lại`}
                    >
                      MAX
                    </button>
                  </div>

                  {/* Custom Amount Input Row */}
                  <div className="flex items-center gap-1">
                    <div className="relative flex-1">
                      <input
                        type="number"
                        min={1}
                        max={stats.statPoints}
                        value={customInputs[item.key] || ''}
                        onChange={(e) => handleCustomInputChange(item.key, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleApplyCustom(item.key);
                        }}
                        placeholder={stats.statPoints > 0 ? `Tự nhập (max ${stats.statPoints})` : 'Hết điểm'}
                        disabled={stats.statPoints <= 0}
                        className="w-full py-1 px-2 bg-slate-950/95 border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 rounded-xs text-xs font-mono text-cyan-200 outline-none text-center placeholder:text-slate-600 disabled:opacity-40"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => handleApplyCustom(item.key)}
                      disabled={stats.statPoints <= 0 || !customInputs[item.key] || parseInt(customInputs[item.key], 10) <= 0}
                      className={`py-1 px-2.5 border text-[10px] font-chakra font-black rounded-xs transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                        stats.statPoints > 0 && customInputs[item.key] && parseInt(customInputs[item.key], 10) > 0
                          ? 'bg-gradient-to-r from-cyan-950 to-blue-900 hover:from-cyan-900 hover:to-blue-800 border-cyan-400 text-cyan-200 shadow-[0_0_10px_rgba(0,229,255,0.4)]'
                          : 'border-slate-800 bg-slate-900 text-slate-600 cursor-not-allowed opacity-40'
                      }`}
                      title="Áp dụng điểm tự nhập"
                    >
                      <span>+ CỘNG</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* LOWER SECTION: COMBAT TELEMETRY & EQUIPPED GEAR */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Left: Combat Calculated Telemetry (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="system-window p-4 sm:p-5 rounded-sm relative">
            <div className="hud-corner-tl" />
            <div className="hud-corner-br" />

            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 mb-3">
              <h3 className="text-sm sm:text-base font-bold text-white font-chakra flex items-center gap-2">
                <SwordSlashIcon className="w-4 h-4 text-cyan-400" />
                <span>CHỈ SỐ THỰC CHIẾN TÍNH TOÁN (COMBAT TELEMETRY)</span>
              </h3>
              <span className="text-[10px] font-mono text-slate-400">TỰ ĐỘNG CẬP NHẬT</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="p-3 bg-slate-950/80 border border-red-500/30 rounded-xs">
                <span className="text-slate-400 block font-chakra text-[11px]">SÁT THƯƠNG VẬT LÝ</span>
                <span className="text-base sm:text-lg font-bold text-red-300 font-orbitron">{physicalAttack}</span>
                <span className="text-[9px] text-slate-500 block mt-0.5">Dựa trên STR & AGI</span>
              </div>

              <div className="p-3 bg-slate-950/80 border border-cyan-500/30 rounded-xs">
                <span className="text-slate-400 block font-chakra text-[11px]">SỨC MẠNH MA PHÁP</span>
                <span className="text-base sm:text-lg font-bold text-cyan-300 font-orbitron">{magicPower}</span>
                <span className="text-[9px] text-slate-500 block mt-0.5">Dựa trên INT</span>
              </div>

              <div className="p-3 bg-slate-950/80 border border-purple-500/30 rounded-xs">
                <span className="text-slate-400 block font-chakra text-[11px]">TỶ LỆ BẠO KÍCH</span>
                <span className="text-base sm:text-lg font-bold text-purple-300 font-orbitron">{critRate}%</span>
                <span className="text-[9px] text-slate-500 block mt-0.5">Dựa trên PER & AGI</span>
              </div>

              <div className="p-3 bg-slate-950/80 border border-amber-500/30 rounded-xs">
                <span className="text-slate-400 block font-chakra text-[11px]">TỶ LỆ NÉ TRÁNH</span>
                <span className="text-base sm:text-lg font-bold text-amber-300 font-orbitron">{evasionRate}%</span>
                <span className="text-[9px] text-slate-500 block mt-0.5">Dựa trên AGI</span>
              </div>

              <div className="p-3 bg-slate-950/80 border border-emerald-500/30 rounded-xs">
                <span className="text-slate-400 block font-chakra text-[11px]">GIÁP PHÒNG NGỰ</span>
                <span className="text-base sm:text-lg font-bold text-emerald-300 font-orbitron">{physicalDefense}</span>
                <span className="text-[9px] text-slate-500 block mt-0.5">Dựa trên VIT</span>
              </div>

              <div className="p-3 bg-slate-950/80 border border-blue-500/30 rounded-xs">
                <span className="text-slate-400 block font-chakra text-[11px]">HỒI PHỤC MANA</span>
                <span className="text-base sm:text-lg font-bold text-blue-300 font-orbitron">+{manaRegen} / Hiệp</span>
                <span className="text-[9px] text-slate-500 block mt-0.5">Dựa trên INT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Equipped Gear & Weapons (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="system-window p-4 sm:p-5 rounded-sm relative">
            <div className="hud-corner-tl" />
            <div className="hud-corner-br" />

            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 mb-3">
              <h3 className="text-sm sm:text-base font-bold text-white font-chakra flex items-center gap-2">
                <ShieldDefendIcon className="w-4 h-4 text-cyan-400" />
                <span>TRANG BỊ ĐANG MANG ({equippedItems.length})</span>
              </h3>
              <span className="text-[10px] font-mono text-slate-400">CỬA HÀNG</span>
            </div>

            {equippedItems.length === 0 ? (
              <div className="p-4 bg-slate-950/60 border border-dashed border-slate-800 rounded-xs text-center">
                <p className="text-xs text-slate-500 font-chakra">
                  Chưa trang bị vật phẩm nào. Hãy ghé CỬA HÀNG để mua dao găm và áo giáp hoàng đế!
                </p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {equippedItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-2.5 bg-slate-950/80 border border-cyan-500/30 rounded-xs flex items-center justify-between gap-2"
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="px-1.5 py-0.2 bg-cyan-950 border border-cyan-400 text-cyan-300 text-[9px] font-bold rounded-xs font-mono">
                          HẠNG {item.rank}
                        </span>
                        <span className="font-bold text-xs text-white font-chakra">{item.name}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{item.description}</p>
                    </div>

                    <span className="text-[10px] font-mono text-emerald-400 font-bold shrink-0">
                      ĐANG TRANG BỊ
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5-SKILL COMBAT LOADOUT DECK & SKILL LIBRARY */}
      {/* ========================================================================= */}
      {onToggleEquipSkill && (
        <div className="pt-2">
          <SkillLoadoutDeck
            skills={skills}
            onToggleEquipSkill={onToggleEquipSkill}
            onUpgradeSkill={onUpgradeSkill}
            playerGold={stats.gold}
            playerLevel={stats.level}
          />
        </div>
      )}
    </div>
  );
};
