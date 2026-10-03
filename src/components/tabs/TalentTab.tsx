import React, { useState, useMemo } from 'react';
import { PlayerStats, TalentNode, TalentRankTier, MonsterMaterial } from '../../types';
import {
  CrownMonarchIcon,
  AlertGlyphIcon,
  FlameStreakIcon,
  GoldCoinIcon,
} from '../icons/SystemIcons';
import { soundFx } from '../../utils/soundEffects';

interface TalentTabProps {
  stats: PlayerStats;
  talentNodes: TalentNode[];
  talentRankTiers: TalentRankTier[];
  materials: MonsterMaterial[];
  onUnlockTalentNode: (nodeId: string) => boolean;
  onBreakthroughRank: (rank: 'E' | 'D' | 'C' | 'B' | 'A' | 'S') => boolean;
  onExportData?: () => void;
}

export const TalentTab: React.FC<TalentTabProps> = ({
  stats,
  talentNodes,
  talentRankTiers,
  materials,
  onUnlockTalentNode,
  onBreakthroughRank,
  onExportData,
}) => {
  const [selectedRank, setSelectedRank] = useState<'E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'Monarch'>('E');
  const [specializationFilter, setSpecializationFilter] = useState<'all' | 'combat' | 'agility' | 'monarch'>('all');
  const [selectedNodeModal, setSelectedNodeModal] = useState<TalentNode | null>(null);

  const currentTier = talentRankTiers.find((t) => t.rank === selectedRank) || talentRankTiers[0];
  const allRankNodes = useMemo(
    () => talentNodes.filter((n) => n.rank === selectedRank).sort((a, b) => a.tier - b.tier),
    [talentNodes, selectedRank]
  );

  // Filter nodes by specialization if selected
  const filteredNodes = useMemo(() => {
    if (specializationFilter === 'all') return allRankNodes;
    if (specializationFilter === 'combat') {
      return allRankNodes.filter(
        (n) =>
          n.statsBonus?.strength ||
          n.statsBonus?.vitality ||
          n.statsBonus?.damageReduction ||
          n.name.toLowerCase().includes('slash') ||
          n.vietnameseName.toLowerCase().includes('trảm') ||
          n.vietnameseName.toLowerCase().includes('lực')
      );
    }
    if (specializationFilter === 'agility') {
      return allRankNodes.filter(
        (n) =>
          n.statsBonus?.agility ||
          n.statsBonus?.critRate ||
          n.statsBonus?.evasionRate ||
          n.statsBonus?.perception ||
          n.vietnameseName.toLowerCase().includes('tốc') ||
          n.vietnameseName.toLowerCase().includes('nhát') ||
          n.vietnameseName.toLowerCase().includes('độc')
      );
    }
    if (specializationFilter === 'monarch') {
      return allRankNodes.filter(
        (n) =>
          n.statsBonus?.intelligence ||
          n.statsBonus?.mp ||
          n.unlockedSkillId ||
          n.vietnameseName.toLowerCase().includes('bóng') ||
          n.vietnameseName.toLowerCase().includes('chúa') ||
          n.vietnameseName.toLowerCase().includes('hắc')
      );
    }
    return allRankNodes;
  }, [allRankNodes, specializationFilter]);

  // Group nodes by tier (Tier 1, Tier 2, Tier 3, Tier 4)
  const tier1Nodes = filteredNodes.filter((n) => n.tier === 1);
  const tier2Nodes = filteredNodes.filter((n) => n.tier === 2);
  const tier3Nodes = filteredNodes.filter((n) => n.tier === 3);
  const tier4Nodes = filteredNodes.filter((n) => n.tier === 4);

  const totalUnlockedNodes = useMemo(() => talentNodes.filter((n) => n.unlocked).length, [talentNodes]);
  const isRankFullyMaxed = allRankNodes.length > 0 && allRankNodes.every((n) => n.unlocked);

  const rankOrder: ('E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'Monarch')[] = ['E', 'D', 'C', 'B', 'A', 'S', 'Monarch'];
  const currentRankIdx = rankOrder.indexOf(selectedRank);
  const nextRankName = rankOrder[currentRankIdx + 1];
  const nextTier = talentRankTiers.find((t) => t.rank === nextRankName);
  const isAlreadyBrokenThrough = selectedRank === 'Monarch' || (nextTier ? nextTier.unlocked : false);

  // Compute accumulated stat bonuses from all unlocked talent nodes
  const totalStatsFromTalents = useMemo(() => {
    const total = {
      str: 0,
      agi: 0,
      int: 0,
      vit: 0,
      per: 0,
      hp: 0,
      mp: 0,
      crit: 0,
      eva: 0,
      reduction: 0,
    };

    talentNodes.forEach((node) => {
      if (node.unlocked && node.statsBonus) {
        if (node.statsBonus.strength) total.str += node.statsBonus.strength;
        if (node.statsBonus.agility) total.agi += node.statsBonus.agility;
        if (node.statsBonus.intelligence) total.int += node.statsBonus.intelligence;
        if (node.statsBonus.vitality) total.vit += node.statsBonus.vitality;
        if (node.statsBonus.perception) total.per += node.statsBonus.perception;
        if (node.statsBonus.hp) total.hp += node.statsBonus.hp;
        if (node.statsBonus.mp) total.mp += node.statsBonus.mp;
        if (node.statsBonus.critRate) total.crit += node.statsBonus.critRate;
        if (node.statsBonus.evasionRate) total.eva += node.statsBonus.evasionRate;
        if (node.statsBonus.damageReduction) total.reduction += node.statsBonus.damageReduction;
      }
    });

    return total;
  }, [talentNodes]);

  const getMaterialCount = (matId: string) => {
    const mat = materials.find((m) => m.id === matId);
    return mat ? mat.count : 0;
  };

  const canBreakthrough = () => {
    if (!currentTier || currentTier.unlocked === false) return false;
    if (stats.gold < currentTier.breakthroughRequirements.gold) return false;
    return currentTier.breakthroughRequirements.materials.every((req) => {
      return getMaterialCount(req.materialId) >= req.requiredCount;
    });
  };

  const getRankTheme = (rank: string) => {
    switch (rank) {
      case 'E':
        return {
          badge: 'border-cyan-500/60 bg-cyan-950/60 text-cyan-300',
          glow: 'shadow-[0_0_15px_rgba(0,229,255,0.4)]',
          border: 'border-cyan-400',
        };
      case 'D':
        return {
          badge: 'border-emerald-500/60 bg-emerald-950/60 text-emerald-300',
          glow: 'shadow-[0_0_15px_rgba(16,185,129,0.4)]',
          border: 'border-emerald-400',
        };
      case 'C':
        return {
          badge: 'border-blue-500/60 bg-blue-950/60 text-blue-300',
          glow: 'shadow-[0_0_15px_rgba(59,130,246,0.4)]',
          border: 'border-blue-400',
        };
      case 'B':
        return {
          badge: 'border-purple-500/60 bg-purple-950/60 text-purple-300',
          glow: 'shadow-[0_0_15px_rgba(168,85,247,0.4)]',
          border: 'border-purple-400',
        };
      case 'A':
        return {
          badge: 'border-red-500/60 bg-red-950/60 text-red-300',
          glow: 'shadow-[0_0_15px_rgba(239,68,68,0.4)]',
          border: 'border-red-400',
        };
      case 'S':
        return {
          badge: 'border-amber-500/60 bg-amber-950/60 text-amber-300',
          glow: 'shadow-[0_0_15px_rgba(245,158,11,0.4)]',
          border: 'border-amber-400',
        };
      case 'Monarch':
        return {
          badge: 'border-rose-500/60 bg-rose-950/60 text-rose-300',
          glow: 'shadow-[0_0_20px_rgba(244,63,94,0.6)]',
          border: 'border-rose-400',
        };
      default:
        return {
          badge: 'border-cyan-500/60 bg-cyan-950/60 text-cyan-300',
          glow: 'shadow-[0_0_15px_rgba(0,229,255,0.4)]',
          border: 'border-cyan-400',
        };
    }
  };

  // Render individual Node Card
  const renderNodeCard = (node: TalentNode) => {
    const isUnlocked = node.unlocked;
    const prereqNode = node.requiresNodeId ? talentNodes.find((n) => n.id === node.requiresNodeId) : null;
    const isPrereqUnlocked = !node.requiresNodeId || (prereqNode ? prereqNode.unlocked : true);
    const isParentRankUnlocked = currentTier?.unlocked ?? true;
    const canUnlock = !isUnlocked && isParentRankUnlocked && isPrereqUnlocked && stats.gold >= node.goldCost;

    return (
      <div
        key={node.id}
        className="flex flex-col items-center relative group my-2 transition-all duration-300"
      >
        {/* Node Box */}
        <div
          className={`p-3.5 sm:p-4 rounded-sm border-2 w-56 sm:w-64 flex flex-col justify-between relative transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl ${
            isUnlocked
              ? 'bg-gradient-to-b from-emerald-950/90 via-slate-950 to-slate-950 border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.35)]'
              : canUnlock
              ? 'bg-gradient-to-b from-cyan-950/90 via-slate-950 to-slate-950 border-cyan-400 shadow-[0_0_30px_rgba(0,229,255,0.45)]'
              : 'bg-slate-950/80 border-slate-800 text-slate-500 opacity-75'
          }`}
        >
          {/* Top Status Header */}
          <div className="flex items-center justify-between mb-2">
            <span
              className={`text-[9px] font-mono font-black px-2 py-0.5 rounded-xs border tracking-wider ${
                isUnlocked
                  ? 'border-emerald-400 text-emerald-300 bg-emerald-950/80 shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                  : canUnlock
                  ? 'border-cyan-400 text-cyan-300 bg-cyan-950/80 animate-pulse shadow-[0_0_10px_rgba(0,229,255,0.5)]'
                  : 'border-slate-700 text-slate-500 bg-slate-900'
              }`}
            >
              {isUnlocked ? '✓ ĐÃ LĨNH NGỘ' : canUnlock ? '⚡ CÓ THỂ MỞ' : '🔒 KHÓA'}
            </span>

            <span className="text-[11px] font-mono text-amber-300 font-bold flex items-center gap-1">
              {isUnlocked ? (
                <span className="text-emerald-400">VĨNH VIỄN</span>
              ) : (
                <>
                  <GoldCoinIcon className="w-3 h-3 text-amber-400" />
                  {node.goldCost.toLocaleString()} G
                </>
              )}
            </span>
          </div>

          {/* Title & Icon */}
          <div className="flex items-start gap-2.5">
            <div
              className={`w-10 h-10 rounded-sm border flex items-center justify-center text-xl shrink-0 ${
                isUnlocked
                  ? 'border-emerald-400 bg-emerald-950/60 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                  : canUnlock
                  ? 'border-cyan-400 bg-cyan-950/60 shadow-[0_0_15px_rgba(0,229,255,0.4)]'
                  : 'border-slate-800 bg-slate-900'
              }`}
            >
              {node.icon || '⚔️'}
            </div>
            <div className="min-w-0">
              <h3 className={`text-xs sm:text-sm font-black font-chakra leading-snug truncate ${isUnlocked ? 'text-white' : 'text-slate-200'}`}>
                {node.vietnameseName}
              </h3>
              <span className="text-[10px] font-mono text-cyan-400/80 block mt-0.5">
                Tầng {node.tier} · Bậc {node.rank}
              </span>
            </div>
          </div>

          {node.unlockedSkillId && (
            <div className="mt-2 inline-flex items-center gap-1 text-[9px] font-mono font-bold bg-purple-950/90 border border-purple-400 text-purple-300 px-2 py-0.5 rounded-xs shadow-[0_0_10px_rgba(168,85,247,0.3)]">
              <span>⚡ MỞ KHÓA KỸ NĂNG CHỦ ĐỘNG</span>
            </div>
          )}

          <p className="text-[11px] text-slate-400 mt-2 leading-relaxed line-clamp-2">
            {node.description}
          </p>

          {/* Stat Boost Preview */}
          <div className="mt-2.5 pt-2 border-t border-slate-800/80 text-[10px] font-mono flex items-center justify-between">
            <span className="text-slate-400">Gia Tăng:</span>
            <span className="font-bold text-emerald-300">
              {node.statsBonus
                ? Object.entries(node.statsBonus)
                    .map(([k, v]) => `+${v} ${k.slice(0, 3).toUpperCase()}`)
                    .join(', ')
                : 'Thần Lực Thức Tỉnh'}
            </span>
          </div>

          {/* Prerequisite warning if locked */}
          {!isUnlocked && !isPrereqUnlocked && (
            <div className="mt-2 p-1.5 bg-red-950/60 border border-red-500/40 rounded-xs text-[9px] font-mono text-red-300 flex items-center gap-1">
              <AlertGlyphIcon className="w-3 h-3 text-red-400 shrink-0" />
              <span className="truncate">Yêu cầu: {prereqNode ? prereqNode.vietnameseName : 'Nút tầng trước'}</span>
            </div>
          )}

          {/* Interactive Button */}
          <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center gap-2">
            <button
              onClick={() => {
                soundFx.playClick();
                setSelectedNodeModal(node);
              }}
              className="flex-1 py-1.5 px-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white rounded-xs text-[10px] font-mono font-bold transition-all cursor-pointer"
            >
              Chi Tiết
            </button>
            {!isUnlocked && (
              <button
                disabled={!canUnlock}
                onClick={() => {
                  if (!canUnlock) return;
                  soundFx.playArise();
                  onUnlockTalentNode(node.id);
                }}
                className={`flex-1 py-1.5 px-2 rounded-xs text-[10px] font-chakra font-black tracking-wider transition-all cursor-pointer uppercase ${
                  canUnlock
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-[0_0_15px_rgba(0,229,255,0.5)]'
                    : 'bg-slate-900 border border-slate-800 text-slate-600 cursor-not-allowed'
                }`}
              >
                Lĩnh Ngộ
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-2 sm:p-4 md:p-6 space-y-4 sm:space-y-6 box-border overflow-hidden">
      {/* 1. TOP HEADER BANNER - MONARCH CONSTELLATION AESTHETIC */}
      <div className="system-window p-3 sm:p-5 rounded-sm relative overflow-hidden bg-slate-950/95 border-2 border-cyan-500/50 shadow-[0_0_40px_rgba(0,229,255,0.15)]">
        <div className="hud-corner-tl" />
        <div className="hud-corner-tr" />
        <div className="hud-corner-bl" />
        <div className="hud-corner-br" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-cyan-500/30 pb-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>HỆ THỐNG THỨC TỈNH · CÂY TÀI NĂNG CHÚA TỂ BÓNG TỐI</span>
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <CrownMonarchIcon className="w-7 h-7 text-purple-400" />
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white font-chakra tracking-wider uppercase drop-shadow-[0_0_20px_rgba(0,229,255,0.4)]">
                MẠCH MA LỰC BÓNG TỐI (SHADOW TALENT TREE)
              </h1>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Khai mở các mạch ma lực hắc ám, cường hóa vĩnh viễn thuộc tính và thức tỉnh tuyệt kỹ độc quyền của Chúa Tể Bóng Tối Sung Jin-woo!
            </p>
          </div>

          {/* Player Resource Badges */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <div className="px-3.5 py-2 bg-slate-900/90 border border-amber-400/60 rounded-xs flex items-center gap-2 font-mono text-xs shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <GoldCoinIcon className="w-4 h-4 text-amber-400" />
              <span className="text-slate-400">VÀNG:</span>
              <span className="font-bold text-amber-300">{stats.gold.toLocaleString()} G</span>
            </div>

            <div className="px-3.5 py-2 bg-slate-900/90 border border-purple-400/60 rounded-xs flex items-center gap-2 font-mono text-xs shadow-[0_0_15px_rgba(168,85,247,0.2)]">
              <FlameStreakIcon className="w-4 h-4 text-purple-400" />
              <span className="text-slate-400">ĐÃ LĨNH NGỘ:</span>
              <span className="font-bold text-purple-300">
                {totalUnlockedNodes} / {talentNodes.length} Mạch
              </span>
            </div>

            {onExportData && (
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  onExportData();
                }}
                title="Xuất sao lưu 100% dữ liệu Hệ Thống & Cây Tài Năng"
                className="px-3 py-2 bg-cyan-950/90 hover:bg-cyan-900 border border-cyan-400 text-cyan-200 text-xs font-bold font-chakra rounded-xs cursor-pointer shadow-[0_0_12px_rgba(0,229,255,0.3)] flex items-center gap-1.5 transition-all"
              >
                <span>💾 XUẤT FULL DỮ LIỆU</span>
              </button>
            )}
          </div>
        </div>

        {/* ACCUMULATED TALENT STATS SUMMARY BAR */}
        <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[11px]">
            ⚡ Tổng Chỉ Số Vĩnh Viễn Đã Nhận:
          </span>
          {totalStatsFromTalents.str > 0 && (
            <span className="px-2 py-0.5 bg-red-950/60 border border-red-500/40 text-red-300 rounded-xs">
              +{totalStatsFromTalents.str} STR
            </span>
          )}
          {totalStatsFromTalents.agi > 0 && (
            <span className="px-2 py-0.5 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 rounded-xs">
              +{totalStatsFromTalents.agi} AGI
            </span>
          )}
          {totalStatsFromTalents.int > 0 && (
            <span className="px-2 py-0.5 bg-purple-950/60 border border-purple-500/40 text-purple-300 rounded-xs">
              +{totalStatsFromTalents.int} INT
            </span>
          )}
          {totalStatsFromTalents.vit > 0 && (
            <span className="px-2 py-0.5 bg-blue-950/60 border border-blue-500/40 text-blue-300 rounded-xs">
              +{totalStatsFromTalents.vit} VIT
            </span>
          )}
          {totalStatsFromTalents.per > 0 && (
            <span className="px-2 py-0.5 bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 rounded-xs">
              +{totalStatsFromTalents.per} PER
            </span>
          )}
          {totalStatsFromTalents.hp > 0 && (
            <span className="px-2 py-0.5 bg-amber-950/60 border border-amber-500/40 text-amber-300 rounded-xs">
              +{totalStatsFromTalents.hp} HP
            </span>
          )}
          {totalStatsFromTalents.mp > 0 && (
            <span className="px-2 py-0.5 bg-indigo-950/60 border border-indigo-500/40 text-indigo-300 rounded-xs">
              +{totalStatsFromTalents.mp} MP
            </span>
          )}
        </div>

        {/* 2. RANK PROGRESSION TABS (E -> D -> C -> B -> A -> S -> Monarch) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mt-4">
          {talentRankTiers.map((tier) => {
            const isSelected = selectedRank === tier.rank;
            const isUnlocked = tier.unlocked;
            const nodesInRank = talentNodes.filter((n) => n.rank === tier.rank);
            const unlockedCount = nodesInRank.filter((n) => n.unlocked).length;
            const isMaxed = nodesInRank.length > 0 && unlockedCount === nodesInRank.length;
            const theme = getRankTheme(tier.rank);

            return (
              <button
                key={tier.rank}
                onClick={() => {
                  soundFx.playClick();
                  setSelectedRank(tier.rank);
                }}
                className={`p-2.5 rounded-xs border text-left transition-all cursor-pointer flex flex-col justify-between relative ${
                  isSelected
                    ? `bg-gradient-to-b from-cyan-950 via-slate-900 to-cyan-950 ${theme.border} ${theme.glow}`
                    : isUnlocked
                    ? 'bg-slate-950/80 border-slate-700 hover:border-cyan-500/60 hover:bg-slate-900'
                    : 'bg-slate-950/40 border-slate-800 opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-black px-1.5 py-0.5 rounded-xs border ${theme.badge}`}>
                      HẠNG {tier.rank}
                    </span>
                    {isMaxed && <span className="text-[9px] font-mono text-amber-300 font-bold">MAX ✓</span>}
                  </div>
                  <div className="font-bold text-xs text-white font-chakra truncate mt-1">
                    {tier.rank === 'Monarch' ? 'CHÚA TỂ' : `BẬC ${tier.rank}`}
                  </div>
                </div>

                <div className="mt-2 text-[10px] font-mono flex items-center justify-between">
                  <span className={isUnlocked ? 'text-cyan-300' : 'text-slate-500'}>
                    {isUnlocked ? `${unlockedCount}/${nodesInRank.length} Mạch` : '🔒 Khóa'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. SPECIALIZATION FILTER TABS */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-950/80 border border-slate-800 rounded-sm">
        <span className="text-xs font-mono text-slate-400 px-2 font-bold uppercase">
          Lọc Chuyên Hóa:
        </span>
        {[
          { id: 'all', label: 'TẤT CẢ MẠCH MA LỰC' },
          { id: 'combat', label: '⚔️ CHIẾN BINH & SỨC MẠNH' },
          { id: 'agility', label: '🗡️ THÂN PHÁP & BẠO KÍCH' },
          { id: 'monarch', label: '👑 CHÚA TỂ & QUÂN ĐOÀN' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => {
              soundFx.playClick();
              setSpecializationFilter(item.id as 'all' | 'combat' | 'agility' | 'monarch');
            }}
            className={`px-3 py-1.5 text-xs font-chakra font-bold rounded-xs transition-all cursor-pointer ${
              specializationFilter === item.id
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(0,229,255,0.4)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* 4. MAIN CONTENT: DYNAMIC TALENT CONSTELLATION GRAPH & BREAKTHROUGH ALTAR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* LEFT: CONSTELLATION NODES MAP (8 COLS) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="system-window p-4 sm:p-5 rounded-sm bg-slate-950/95 border border-slate-800 relative min-h-[500px]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-6">
              <div>
                <span className="text-xs font-mono text-cyan-400 tracking-wider">
                  SƠ ĐỒ MẠCH MA LỰC HẠNG {selectedRank}
                </span>
                <h2 className="text-lg font-black text-white font-chakra">
                  {currentTier ? currentTier.title : `NHÁNH BẬC ${selectedRank}`}
                </h2>
              </div>
              <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-xs border ${getRankTheme(selectedRank).badge}`}>
                {currentTier?.unlocked
                  ? `✓ ĐÃ MỞ (${allRankNodes.filter((n) => n.unlocked).length}/${allRankNodes.length} MẠCH)`
                  : '🔒 BẬC CHƯA KHAI MỞ'}
              </span>
            </div>

            {/* CONSTELLATION TIERS CONTAINER */}
            <div className="flex flex-col items-center space-y-8 relative py-4 overflow-x-auto scrollbar-none min-w-[320px]">
              {/* TIER 1: CORE TRUNK */}
              {tier1Nodes.length > 0 && (
                <div className="flex flex-col items-center relative w-full">
                  <div className="text-[10px] font-mono font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-500/50 px-3 py-0.5 rounded-full mb-2">
                    TẦNG 1: MẠCH MA LỰC CỐT LÕI (CORE)
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-6">
                    {tier1Nodes.map((node) => renderNodeCard(node))}
                  </div>
                </div>
              )}

              {/* TIER 2: BRANCHING SOUL VESSELS */}
              {tier2Nodes.length > 0 && (
                <div className="flex flex-col items-center relative w-full pt-4">
                  {/* Neon Circuit SVG Connector */}
                  <svg className="w-full h-6 max-w-md opacity-70 mb-2" viewBox="0 0 400 30">
                    <line x1="200" y1="0" x2="200" y2="15" stroke="#00e5ff" strokeWidth="2" />
                    <line x1="80" y1="15" x2="320" y2="15" stroke="#00e5ff" strokeWidth="2" strokeDasharray="6 4" />
                    <line x1="80" y1="15" x2="80" y2="30" stroke="#00e5ff" strokeWidth="2" />
                    <line x1="320" y1="15" x2="320" y2="30" stroke="#00e5ff" strokeWidth="2" />
                  </svg>
                  <div className="text-[10px] font-mono font-bold text-purple-300 bg-purple-950/80 border border-purple-500/50 px-3 py-0.5 rounded-full mb-2">
                    TẦNG 2: MẠCH PHÂN NHÁNH THẦN HỒN ({tier2Nodes.length} NHÁNH)
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-6">
                    {tier2Nodes.map((node) => renderNodeCard(node))}
                  </div>
                </div>
              )}

              {/* TIER 3: ADVANCED MASTERY */}
              {tier3Nodes.length > 0 && (
                <div className="flex flex-col items-center relative w-full pt-4">
                  {/* Neon Circuit SVG Connector */}
                  <svg className="w-full h-6 max-w-md opacity-70 mb-2" viewBox="0 0 400 30">
                    <line x1="200" y1="0" x2="200" y2="15" stroke="#a855f7" strokeWidth="2" />
                    <line x1="100" y1="15" x2="300" y2="15" stroke="#a855f7" strokeWidth="2" strokeDasharray="6 4" />
                    <line x1="100" y1="15" x2="100" y2="30" stroke="#a855f7" strokeWidth="2" />
                    <line x1="300" y1="15" x2="300" y2="30" stroke="#a855f7" strokeWidth="2" />
                  </svg>
                  <div className="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/50 px-3 py-0.5 rounded-full mb-2">
                    TẦNG 3: MẠCH TINH THÔNG THƯỢNG THỪA ({tier3Nodes.length} NHÁNH)
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-6">
                    {tier3Nodes.map((node) => renderNodeCard(node))}
                  </div>
                </div>
              )}

              {/* TIER 4: APEX RANK CREST */}
              {tier4Nodes.length > 0 && (
                <div className="flex flex-col items-center relative w-full pt-4">
                  {/* Neon Circuit SVG Connector */}
                  <svg className="w-full h-6 max-w-md opacity-70 mb-2" viewBox="0 0 400 30">
                    <line x1="200" y1="0" x2="200" y2="30" stroke="#f59e0b" strokeWidth="3" />
                    <circle cx="200" cy="15" r="4" fill="#fbbf24" className="animate-ping" />
                  </svg>
                  <div className="text-[10px] font-mono font-bold text-amber-300 bg-amber-950/80 border border-amber-500/50 px-3 py-0.5 rounded-full mb-2">
                    TẦNG 4: TUYỆT KỸ ĐỈNH CAO BẬC {selectedRank}
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-6">
                    {tier4Nodes.map((node) => renderNodeCard(node))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: BREAKTHROUGH ALTAR & REQUIRED MONSTER MATERIALS (4 COLS) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="system-window p-4 sm:p-5 rounded-sm bg-slate-950/95 border-2 border-amber-500/50 relative shadow-[0_0_30px_rgba(245,158,11,0.15)]">
            <div className="hud-corner-tl" />
            <div className="hud-corner-tr" />
            <div className="hud-corner-bl" />
            <div className="hud-corner-br" />

            <div className="flex items-center justify-between border-b border-amber-500/30 pb-3 mb-4">
              <span className="text-xs font-mono text-amber-400 tracking-wider font-bold">
                ⚡ ĐÀN TẾ ĐỘT PHÁ CẢNH GIỚI
              </span>
              <span className="text-[10px] font-mono text-slate-400">HẠNG {selectedRank}</span>
            </div>

            {currentTier ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-black text-amber-300 font-chakra">{currentTier.title}</h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{currentTier.description}</p>
                </div>

                {/* Progress Node Check */}
                <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xs text-xs flex items-center justify-between">
                  <span className="text-slate-400">Tiến Độ Mở Mạch:</span>
                  <span className={`font-mono font-bold ${isRankFullyMaxed ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {allRankNodes.filter((n) => n.unlocked).length} / {allRankNodes.length} Mạch
                  </span>
                </div>

                {/* REQUIRED MATERIALS LIST */}
                <div className="space-y-2">
                  <span className="text-xs font-bold font-chakra text-slate-200 block">
                    NGUYÊN LIỆU ĐỘT PHÁ (SĂN BOSS HẦM NGỤC):
                  </span>

                  {currentTier.breakthroughRequirements.materials.map((req) => {
                    const ownedCount = getMaterialCount(req.materialId);
                    const isEnough = ownedCount >= req.requiredCount;

                    return (
                      <div
                        key={req.materialId}
                        className={`p-2.5 rounded-xs border text-xs flex items-center justify-between ${
                          isEnough ? 'bg-emerald-950/30 border-emerald-500/40' : 'bg-slate-900/80 border-slate-800'
                        }`}
                      >
                        <span className="text-white font-chakra flex items-center gap-2">
                          <span className="text-base">{req.icon || '💎'}</span>
                          <span>{req.name}</span>
                        </span>
                        <span className={`font-mono font-bold ${isEnough ? 'text-emerald-300' : 'text-red-400'}`}>
                          {ownedCount} / {req.requiredCount} {isEnough ? '✓' : ''}
                        </span>
                      </div>
                    );
                  })}

                  {/* Gold Requirement */}
                  <div
                    className={`p-2.5 rounded-xs border text-xs flex items-center justify-between ${
                      stats.gold >= currentTier.breakthroughRequirements.gold
                        ? 'bg-emerald-950/30 border-emerald-500/40'
                        : 'bg-slate-900/80 border-slate-800'
                    }`}
                  >
                    <span className="text-white font-chakra flex items-center gap-1.5">
                      <GoldCoinIcon className="w-4 h-4 text-amber-400" />
                      <span>Vàng Yêu Cầu:</span>
                    </span>
                    <span
                      className={`font-mono font-bold ${
                        stats.gold >= currentTier.breakthroughRequirements.gold ? 'text-amber-300' : 'text-red-400'
                      }`}
                    >
                      {currentTier.breakthroughRequirements.gold.toLocaleString()} G
                    </span>
                  </div>
                </div>

                {/* BREAKTHROUGH ACTION BUTTON */}
                {isAlreadyBrokenThrough ? (
                  <div className="w-full py-3 px-4 text-center text-xs font-black font-chakra rounded-xs border border-emerald-500/80 bg-emerald-950/80 text-emerald-300 uppercase tracking-wider shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                    ✓ ĐÃ ĐỘT PHÁ CẢNH GIỚI NÀY THÀNH CÔNG
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      if (!canBreakthrough()) return;
                      soundFx.playLevelUp();
                      onBreakthroughRank(selectedRank as 'E' | 'D' | 'C' | 'B' | 'A' | 'S');
                    }}
                    disabled={!isRankFullyMaxed || !canBreakthrough()}
                    className={`w-full py-3 px-4 text-xs font-black font-chakra rounded-xs border transition-all cursor-pointer uppercase tracking-wider ${
                      isRankFullyMaxed && canBreakthrough()
                        ? 'bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 border-yellow-300 text-black shadow-[0_0_30px_rgba(234,179,8,0.7)] animate-pulse'
                        : 'bg-slate-900 border-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    {!isRankFullyMaxed
                      ? `🔒 CẦN LĨNH NGỘ ĐỦ ${allRankNodes.length}/${allRankNodes.length} MẠCH`
                      : !canBreakthrough()
                      ? '🔒 THIẾU NGUYÊN LIỆU HOẶC VÀNG'
                      : `⚡ ĐỘT PHÁ CẢNH GIỚI TRUYỀN THUYẾT`}
                  </button>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* NODE DETAILS MODAL */}
      {selectedNodeModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="system-window p-5 max-w-md w-full bg-slate-950 border-2 border-cyan-400 rounded-sm relative shadow-[0_0_50px_rgba(0,229,255,0.4)]">
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/30">
              <span className="text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider">
                [CHI TIẾT MẠCH MA LỰC]
              </span>
              <button
                onClick={() => setSelectedNodeModal(null)}
                className="text-slate-400 hover:text-white text-sm font-bold font-mono px-2 py-0.5 border border-slate-800 rounded-xs cursor-pointer"
              >
                ✕ ĐÓNG
              </button>
            </div>

            <div className="mt-4 space-y-3.5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-sm border-2 border-cyan-400 bg-cyan-950/60 flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(0,229,255,0.4)]">
                  {selectedNodeModal.icon || '🛡️'}
                </div>
                <div>
                  <h2 className="text-base font-black text-white font-chakra">{selectedNodeModal.vietnameseName}</h2>
                  <span className="text-[10px] font-mono text-cyan-400">
                    Bậc {selectedNodeModal.rank} · Tầng {selectedNodeModal.tier}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{selectedNodeModal.description}</p>

              <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xs space-y-1.5 text-xs">
                <span className="text-slate-400 font-mono block">THUỘC TÍNH VĨNH VIỄN GIA TĂNG:</span>
                <span className="font-bold text-emerald-300 font-mono text-sm">
                  {selectedNodeModal.statsBonus
                    ? Object.entries(selectedNodeModal.statsBonus)
                        .map(([k, v]) => `+${v} ${k.toUpperCase()}`)
                        .join(' · ')
                    : 'Mở khóa tuyệt kỹ đính kèm'}
                </span>
              </div>

              {selectedNodeModal.requiresNodeId && (
                <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xs text-xs text-slate-400">
                  🔒 <strong>Điền kiện tiên quyết:</strong> Cần khai mở mạch thuộc tầng trước.
                </div>
              )}

              {selectedNodeModal.unlockedSkillId && (
                <div className="p-2.5 bg-purple-950/80 border border-purple-500/60 rounded-xs text-xs text-purple-200">
                  ⚡ <strong>Tuyệt kỹ đính kèm:</strong> Mở khóa trực tiếp kỹ năng chủ động trong Thư Viện Kỹ Năng.
                </div>
              )}

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-800">
                <button
                  onClick={() => setSelectedNodeModal(null)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-chakra font-bold rounded-xs cursor-pointer"
                >
                  ĐÓNG
                </button>
                {!selectedNodeModal.unlocked && (
                  <button
                    onClick={() => {
                      soundFx.playArise();
                      onUnlockTalentNode(selectedNodeModal.id);
                      setSelectedNodeModal(null);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-chakra font-black rounded-xs cursor-pointer shadow-[0_0_20px_rgba(0,229,255,0.5)] uppercase tracking-wider"
                  >
                    LĨNH NGỘ ({selectedNodeModal.goldCost.toLocaleString()} G)
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
