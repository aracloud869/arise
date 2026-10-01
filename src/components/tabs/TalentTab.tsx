import React, { useState } from 'react';
import { PlayerStats, TalentNode, TalentRankTier, MonsterMaterial } from '../../types';
import {
  CrownMonarchIcon,
  SwordSlashIcon,
  ShieldDefendIcon,
  AlertGlyphIcon,
  CheckIcon,
  FlameStreakIcon,
  GoldCoinIcon,
  PlusIcon,
} from '../icons/SystemIcons';
import { soundFx } from '../../utils/soundEffects';

interface TalentTabProps {
  stats: PlayerStats;
  talentNodes: TalentNode[];
  talentRankTiers: TalentRankTier[];
  materials: MonsterMaterial[];
  onUnlockTalentNode: (nodeId: string) => boolean;
  onBreakthroughRank: (rank: 'E' | 'D' | 'C' | 'B' | 'A' | 'S') => boolean;
}

export const TalentTab: React.FC<TalentTabProps> = ({
  stats,
  talentNodes,
  talentRankTiers,
  materials,
  onUnlockTalentNode,
  onBreakthroughRank,
}) => {
  const [selectedRank, setSelectedRank] = useState<'E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'Monarch'>('E');
  const [selectedNodeModal, setSelectedNodeModal] = useState<TalentNode | null>(null);

  const currentTier = talentRankTiers.find((t) => t.rank === selectedRank) || talentRankTiers[0];
  const rankNodes = talentNodes.filter((n) => n.rank === selectedRank).sort((a, b) => a.tier - b.tier);

  // Group nodes by tier (Tier 1, Tier 2, Tier 3, Tier 4)
  const tier1Nodes = rankNodes.filter((n) => n.tier === 1);
  const tier2Nodes = rankNodes.filter((n) => n.tier === 2);
  const tier3Nodes = rankNodes.filter((n) => n.tier === 3);
  const tier4Nodes = rankNodes.filter((n) => n.tier === 4);

  const totalUnlockedNodes = talentNodes.filter((n) => n.unlocked).length;
  const isRankFullyMaxed = rankNodes.length > 0 && rankNodes.every((n) => n.unlocked);

  const rankOrder: ('E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'Monarch')[] = ['E', 'D', 'C', 'B', 'A', 'S', 'Monarch'];
  const currentRankIdx = rankOrder.indexOf(selectedRank);
  const nextRankName = rankOrder[currentRankIdx + 1];
  const nextTier = talentRankTiers.find((t) => t.rank === nextRankName);
  const isAlreadyBrokenThrough = selectedRank === 'Monarch' || (nextTier ? nextTier.unlocked : false);

  const getMaterialCount = (matId: string) => {
    const mat = materials.find((m) => m.id === matId);
    return mat ? mat.count : 0;
  };

  // Check if player has enough materials for breakthrough
  const canBreakthrough = () => {
    if (!currentTier || currentTier.unlocked === false) return false;
    if (stats.gold < currentTier.breakthroughRequirements.gold) return false;
    return currentTier.breakthroughRequirements.materials.every((req) => {
      return getMaterialCount(req.materialId) >= req.requiredCount;
    });
  };

  const getRankBadgeColor = (rank: string) => {
    switch (rank) {
      case 'E': return 'border-cyan-500/60 bg-cyan-950/60 text-cyan-300';
      case 'D': return 'border-emerald-500/60 bg-emerald-950/60 text-emerald-300';
      case 'C': return 'border-blue-500/60 bg-blue-950/60 text-blue-300';
      case 'B': return 'border-purple-500/60 bg-purple-950/60 text-purple-300';
      case 'A': return 'border-red-500/60 bg-red-950/60 text-red-300';
      case 'S': return 'border-amber-500/60 bg-amber-950/60 text-amber-300';
      case 'Monarch': return 'border-rose-500/60 bg-rose-950/60 text-rose-300';
      default: return 'border-cyan-500/60 bg-cyan-950/60 text-cyan-300';
    }
  };

  // Helper to render individual Tree Node Card with CSS Pseudo-Elements (::before, ::after)
  const renderNodeCard = (node: TalentNode, isRoot: boolean = false) => {
    const isUnlocked = node.unlocked;
    const prereqNode = node.requiresNodeId ? talentNodes.find((n) => n.id === node.requiresNodeId) : null;
    const isPrereqUnlocked = !node.requiresNodeId || (prereqNode ? prereqNode.unlocked : true);
    const isParentRankUnlocked = currentTier?.unlocked ?? true;
    const canUnlock = !isUnlocked && isParentRankUnlocked && isPrereqUnlocked && stats.gold >= node.goldCost;

    return (
      <div
        key={node.id}
        className={`flex flex-col items-center relative group my-3 ${
          !isRoot
            ? "before:content-[''] before:absolute before:-top-6 before:left-1/2 before:-translate-x-1/2 before:w-0.5 before:h-6 " +
              (isUnlocked
                ? 'before:bg-cyan-400 before:shadow-[0_0_10px_rgba(0,229,255,0.8)]'
                : canUnlock
                ? 'before:bg-cyan-500/80'
                : 'before:bg-slate-800')
            : ''
        }`}
      >
        {/* Node Box */}
        <div
          onClick={() => {
            soundFx.playClick();
            setSelectedNodeModal(node);
          }}
          className={`p-3.5 sm:p-4 rounded-sm border-2 w-52 sm:w-60 flex flex-col justify-between relative transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl cursor-pointer ${
            isUnlocked
              ? 'bg-gradient-to-b from-emerald-950/80 via-slate-950 to-slate-950 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.35)]'
              : canUnlock
              ? 'bg-gradient-to-b from-cyan-950/80 via-slate-950 to-slate-950 border-cyan-400 shadow-[0_0_25px_rgba(0,229,255,0.45)] animate-pulse'
              : 'bg-slate-950/80 border-slate-800 text-slate-500 opacity-75'
          }`}
        >
          {/* Top Status Header */}
          <div className="flex items-center justify-between mb-1.5">
            <span className={`text-[9px] font-mono font-black px-1.5 py-0.2 rounded-xs border ${
              isUnlocked
                ? 'border-emerald-400 text-emerald-300 bg-emerald-950/80'
                : canUnlock
                ? 'border-cyan-400 text-cyan-300 bg-cyan-950/80'
                : 'border-slate-700 text-slate-500 bg-slate-900'
            }`}>
              {isUnlocked ? '✓ ĐÃ LĨNH NGỘ' : canUnlock ? '⚡ CÓ THỂ MỞ' : '🔒 KHÓA'}
            </span>

            <span className="text-[10px] font-mono text-amber-300 font-bold">
              {isUnlocked ? 'CẤP VÔ HẠN' : `${node.goldCost.toLocaleString()} G`}
            </span>
          </div>

          {/* Node Title & Description */}
          <div className="flex items-center gap-2">
            <span className="text-xl shrink-0">{node.icon || '🛡️'}</span>
            <div>
              <h3 className={`text-xs sm:text-sm font-black font-chakra leading-snug ${isUnlocked ? 'text-white' : 'text-slate-300'}`}>
                {node.vietnameseName}
              </h3>
              {node.unlockedSkillId && (
                <span className="inline-block mt-0.5 text-[9px] font-mono font-bold bg-purple-950 border border-purple-500/80 text-purple-300 px-1 py-0.2 rounded-xs">
                  ⚡ MỞ CHỦ ĐỘNG
                </span>
              )}
            </div>
          </div>

          <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
            {node.description}
          </p>

          {/* Stat Bonus Footer */}
          <div className="mt-2 pt-2 border-t border-slate-800/80 text-[10px] font-mono flex items-center justify-between">
            <span className="text-slate-400">Gia Tăng:</span>
            <span className="font-bold text-emerald-300">
              {node.statsBonus
                ? Object.entries(node.statsBonus)
                    .map(([k, v]) => `+${v} ${k.slice(0, 3).toUpperCase()}`)
                    .join(', ')
                : 'Mở Tuyệt Kỹ'}
            </span>
          </div>

          {/* PREREQUISITE WARNING IF LOCKED */}
          {!isUnlocked && !isPrereqUnlocked && (
            <div className="mt-2 p-1.5 bg-red-950/60 border border-red-500/40 rounded-xs text-[9px] font-mono text-red-300 flex items-center gap-1">
              <AlertGlyphIcon className="w-3 h-3 text-red-400 shrink-0" />
              <span>Yêu cầu: {prereqNode ? prereqNode.vietnameseName : 'Nút tầng trước'}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-2 sm:p-4 md:p-6 space-y-4 sm:space-y-6 box-border overflow-hidden">
      {/* 1. TOP HEADER BANNER */}
      <div className="system-window p-3 sm:p-5 rounded-sm relative overflow-hidden bg-slate-950/90 border border-cyan-500/40">
        <div className="hud-corner-tl" />
        <div className="hud-corner-tr" />
        <div className="hud-corner-bl" />
        <div className="hud-corner-br" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-cyan-500/30 pb-3">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono tracking-widest uppercase">
              <span>HỆ THỐNG / CÂY TÀI NĂNG ĐƯỜNG KẾT NỐI CSS (POSITION RELATIVE & PSEUDO-ELEMENTS ::BEFORE/::AFTER)</span>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            </div>
            <div className="flex items-center gap-2 mt-1">
              <CrownMonarchIcon className="w-6 h-6 text-purple-400" />
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white font-chakra tracking-wider">
                HIERARCHICAL PSEUDO-ELEMENT TREE MAP
              </h1>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Giao diện cây tài năng đa nhánh phân cấp với các đường kết nối nhánh cha-con (pseudo-elements ::before & ::after) trực quan!
            </p>
          </div>

          {/* Player Resource Badges */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <div className="px-3 py-1.5 bg-slate-900/90 border border-amber-400/50 rounded-xs flex items-center gap-2 font-mono text-xs">
              <GoldCoinIcon className="w-4 h-4 text-amber-400" />
              <span className="text-slate-400">VÀNG:</span>
              <span className="font-bold text-amber-300">{stats.gold.toLocaleString()} G</span>
            </div>

            <div className="px-3 py-1.5 bg-slate-900/90 border border-purple-400/50 rounded-xs flex items-center gap-2 font-mono text-xs">
              <FlameStreakIcon className="w-4 h-4 text-purple-400" />
              <span className="text-slate-400">ĐÃ MỞ:</span>
              <span className="font-bold text-purple-300">
                {totalUnlockedNodes} / {talentNodes.length} Nút
              </span>
            </div>
          </div>
        </div>

        {/* 2. RANK ROAD (E -> D -> C -> B -> A -> S -> Monarch) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mt-4">
          {talentRankTiers.map((tier) => {
            const isSelected = selectedRank === tier.rank;
            const isUnlocked = tier.unlocked;
            const nodesInRank = talentNodes.filter((n) => n.rank === tier.rank);
            const unlockedCount = nodesInRank.filter((n) => n.unlocked).length;
            const isMaxed = nodesInRank.length > 0 && unlockedCount === nodesInRank.length;

            return (
              <button
                key={tier.rank}
                onClick={() => {
                  soundFx.playClick();
                  setSelectedRank(tier.rank);
                }}
                className={`p-2.5 rounded-xs border text-left transition-all cursor-pointer flex flex-col justify-between relative ${
                  isSelected
                    ? 'bg-gradient-to-b from-cyan-950 via-slate-900 to-cyan-950 border-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.4)]'
                    : isUnlocked
                    ? 'bg-slate-950/80 border-slate-700 hover:border-cyan-500/60 hover:bg-slate-900'
                    : 'bg-slate-950/40 border-slate-800 opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-black px-1.5 py-0.2 rounded-xs border ${getRankBadgeColor(tier.rank)}`}>
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
                    {isUnlocked ? `${unlockedCount}/${nodesInRank.length} Nhánh` : '🔒 Khóa'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. MAIN CONTENT: CSS HIERARCHICAL FLEX TREE STRUCTURE WITH PSEUDO-ELEMENT CONNECTORS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* LEFT / TOP: CSS TREE MAP (8 COLS) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="system-window p-4 rounded-sm bg-slate-950/90 border border-slate-800 relative min-h-[480px]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-6">
              <div>
                <span className="text-xs font-mono text-purple-400 tracking-wider">SƠ ĐỒ CÂY TÀI NĂNG ĐA NHÁNH PSEUDO-ELEMENTS (RANK {selectedRank})</span>
                <h2 className="text-lg font-black text-white font-chakra">
                  {currentTier ? currentTier.title : `NHÁNH BẬC ${selectedRank}`}
                </h2>
              </div>
              <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-xs border ${getRankBadgeColor(selectedRank)}`}>
                {currentTier?.unlocked ? `✓ ĐÃ MỞ (${rankNodes.filter((n) => n.unlocked).length}/${rankNodes.length} NÚT)` : '🔒 BẬC CHƯA MỞ'}
              </span>
            </div>

            {/* CSS FLEX-COL HIERARCHICAL TREE CONTAINER WITH PSEUDO CONNECTORS */}
            <div className="flex flex-col items-center space-y-8 relative py-4 overflow-x-auto scrollbar-none min-w-[320px]">
              {/* TIER 1: ROOT TRUNK */}
              {tier1Nodes.length > 0 && (
                <div className="flex flex-col items-center relative">
                  <div className="text-[10px] font-mono font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-500/50 px-2 py-0.5 rounded-full mb-1">
                    TẦNG 1 (CỐT LÕI)
                  </div>
                  <div className="flex items-center justify-center gap-6">
                    {tier1Nodes.map((node) => renderNodeCard(node, true))}
                  </div>
                </div>
              )}

              {/* TIER 2: SPLITTING BRANCHES WITH PSEUDO-ELEMENT HORIZONTAL CONNECTOR */}
              {tier2Nodes.length > 0 && (
                <div className="flex flex-col items-center relative w-full pt-4">
                  {/* Pseudo-element horizontal connector line across Tier 2 siblings */}
                  {tier2Nodes.length > 1 && (
                    <div className="relative w-full flex justify-center mb-2 before:content-[''] before:absolute before:-top-2 before:left-1/4 before:right-1/4 before:h-0.5 before:bg-gradient-to-r before:from-cyan-500 before:via-purple-500 before:to-cyan-500 before:shadow-[0_0_8px_rgba(0,229,255,0.8)]" />
                  )}
                  <div className="text-[10px] font-mono font-bold text-purple-300 bg-purple-950/80 border border-purple-500/50 px-2.5 py-0.5 rounded-full mb-2">
                    TẦNG 2 ({tier2Nodes.length} NHÁNH PHÂN NHÁNH)
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 relative">
                    {tier2Nodes.map((node) => renderNodeCard(node))}
                  </div>
                </div>
              )}

              {/* TIER 3: ADVANCED MASTERY BRANCHES WITH PSEUDO-ELEMENT HORIZONTAL CONNECTOR */}
              {tier3Nodes.length > 0 && (
                <div className="flex flex-col items-center relative w-full pt-4">
                  {/* Pseudo-element horizontal connector line across Tier 3 siblings */}
                  {tier3Nodes.length > 1 && (
                    <div className="relative w-full flex justify-center mb-2 before:content-[''] before:absolute before:-top-2 before:left-1/4 before:right-1/4 before:h-0.5 before:bg-gradient-to-r before:from-purple-500 before:via-emerald-400 before:to-purple-500 before:shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                  )}
                  <div className="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/50 px-2.5 py-0.5 rounded-full mb-2">
                    TẦNG 3 ({tier3Nodes.length} NHÁNH CAO CẤP)
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 relative">
                    {tier3Nodes.map((node) => renderNodeCard(node))}
                  </div>
                </div>
              )}

              {/* TIER 4: ULTIMATE RANK MASTERY NODE WITH PSEUDO-ELEMENT HORIZONTAL CONNECTOR */}
              {tier4Nodes.length > 0 && (
                <div className="flex flex-col items-center relative w-full pt-4">
                  {tier4Nodes.length > 1 && (
                    <div className="relative w-full flex justify-center mb-2 before:content-[''] before:absolute before:-top-2 before:left-1/4 before:right-1/4 before:h-0.5 before:bg-gradient-to-r before:from-amber-500 before:via-yellow-400 before:to-amber-500 before:shadow-[0_0_8px_rgba(234,179,8,0.8)]" />
                  )}
                  <div className="text-[10px] font-mono font-bold text-amber-300 bg-amber-950/80 border border-amber-500/50 px-2.5 py-0.5 rounded-full mb-2">
                    TẦNG 4 (TUYỆT KỸ ĐỈNH CAO BẬC {selectedRank})
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 relative">
                    {tier4Nodes.map((node) => renderNodeCard(node))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: RANK BREAKTHROUGH & MATERIALS REQUIRED PANEL (4 COLS) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="system-window p-4 rounded-sm bg-slate-950/90 border border-amber-500/40 relative">
            <div className="hud-corner-tl" />
            <div className="hud-corner-tr" />
            <div className="hud-corner-bl" />
            <div className="hud-corner-br" />

            <div className="flex items-center justify-between border-b border-amber-500/30 pb-2 mb-3">
              <span className="text-xs font-mono text-amber-400 tracking-wider">YÊU CẦU ĐỘT PHÁ RANK</span>
              <span className="text-[10px] font-mono text-slate-400">RANK {selectedRank}</span>
            </div>

            {currentTier ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-black text-amber-300 font-chakra">{currentTier.title}</h3>
                  <p className="text-xs text-slate-300 mt-1">{currentTier.description}</p>
                </div>

                {/* Progress Node Check */}
                <div className="p-2.5 bg-slate-900/90 border border-slate-800 rounded-xs text-xs flex items-center justify-between">
                  <span className="text-slate-400">Tiến Độ Mở Nhánh:</span>
                  <span className={`font-mono font-bold ${isRankFullyMaxed ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {rankNodes.filter((n) => n.unlocked).length} / {rankNodes.length} Nút
                  </span>
                </div>

                {/* REQUIRED MATERIALS LIST */}
                <div className="space-y-2">
                  <span className="text-xs font-bold font-chakra text-slate-300 block">
                    NGUYÊN LIỆU ĐỘT PHÁ (SĂN TRÙM HẦM NGỤC):
                  </span>

                  {currentTier.breakthroughRequirements.materials.map((req) => {
                    const ownedCount = getMaterialCount(req.materialId);
                    const isEnough = ownedCount >= req.requiredCount;

                    return (
                      <div
                        key={req.materialId}
                        className={`p-2 rounded-xs border text-xs flex items-center justify-between ${
                          isEnough ? 'bg-emerald-950/30 border-emerald-500/40' : 'bg-slate-900/80 border-slate-800'
                        }`}
                      >
                        <span className="text-white font-chakra flex items-center gap-1.5">
                          <span>{req.icon || '💎'}</span>
                          <span>{req.name}</span>
                        </span>
                        <span className={`font-mono font-bold ${isEnough ? 'text-emerald-300' : 'text-red-400'}`}>
                          {ownedCount} / {req.requiredCount} {isEnough ? '✓' : ''}
                        </span>
                      </div>
                    );
                  })}

                  {/* Gold Requirement */}
                  <div className={`p-2 rounded-xs border text-xs flex items-center justify-between ${
                    stats.gold >= currentTier.breakthroughRequirements.gold ? 'bg-emerald-950/30 border-emerald-500/40' : 'bg-slate-900/80 border-slate-800'
                  }`}>
                    <span className="text-white font-chakra">Vàng Đột Phá:</span>
                    <span className={`font-mono font-bold ${stats.gold >= currentTier.breakthroughRequirements.gold ? 'text-amber-300' : 'text-red-400'}`}>
                      {currentTier.breakthroughRequirements.gold.toLocaleString()} G
                    </span>
                  </div>
                </div>

                {/* BREAKTHROUGH ACTION BUTTON */}
                {isAlreadyBrokenThrough ? (
                  <div className="w-full py-3 px-4 text-center text-xs font-black font-chakra rounded-xs border border-emerald-500/80 bg-emerald-950/80 text-emerald-300 uppercase tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                    ✓ ĐÃ ĐỘT PHÁ RANK NÀY THÀNH CÔNG
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      if (!canBreakthrough()) return;
                      onBreakthroughRank(selectedRank as 'E' | 'D' | 'C' | 'B' | 'A' | 'S');
                    }}
                    disabled={!isRankFullyMaxed || !canBreakthrough()}
                    className={`w-full py-3 px-4 text-xs font-black font-chakra rounded-xs border transition-all cursor-pointer uppercase tracking-wider ${
                      isRankFullyMaxed && canBreakthrough()
                        ? 'bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 border-yellow-300 text-black shadow-[0_0_25px_rgba(234,179,8,0.6)] animate-pulse'
                        : 'bg-slate-900 border-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    {!isRankFullyMaxed
                      ? `🔒 CẦN LĨNH NGỘ ĐỦ ${rankNodes.length}/${rankNodes.length} NÚT TÀI NĂNG`
                      : !canBreakthrough()
                      ? '🔒 THIẾU NGUYÊN LIỆU HOẶC VÀNG'
                      : `⚡ ĐỘT PHÁ RANK TRUYỀN THUYẾT`}
                  </button>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* NODE DETAILS MODAL */}
      {selectedNodeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="system-window p-5 max-w-md w-full bg-slate-950 border border-cyan-400 rounded-sm relative shadow-[0_0_40px_rgba(0,229,255,0.3)]">
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/30">
              <span className="text-xs font-mono text-cyan-300 font-bold">CHI TIẾT NÚT TÀI NĂNG</span>
              <button
                onClick={() => setSelectedNodeModal(null)}
                className="text-slate-400 hover:text-white text-sm font-bold font-mono px-2 py-0.5 border border-slate-800 rounded-xs cursor-pointer"
              >
                ✕ ĐÓNG
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedNodeModal.icon || '🛡️'}</span>
                <div>
                  <h2 className="text-base font-black text-white font-chakra">{selectedNodeModal.vietnameseName}</h2>
                  <span className="text-[10px] font-mono text-cyan-400">Nút thuộc Bậc {selectedNodeModal.rank} · Tầng {selectedNodeModal.tier}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{selectedNodeModal.description}</p>

              <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xs space-y-1 text-xs">
                <span className="text-slate-400 font-mono block">HIỆU ỨNG GIA TĂNG CƠ THỂ:</span>
                <span className="font-bold text-emerald-300 font-mono">
                  {selectedNodeModal.statsBonus
                    ? Object.entries(selectedNodeModal.statsBonus)
                        .map(([k, v]) => `+${v} ${k.toUpperCase()}`)
                        .join(' · ')
                    : 'Mở khóa tuyệt kỹ đính kèm'}
                </span>
              </div>

              {selectedNodeModal.requiresNodeId && (
                <div className="p-2 bg-slate-900 border border-slate-800 rounded-xs text-xs text-slate-400">
                  🔒 <strong>Điền kiện tiên quyết:</strong> Cần khai mở nút thuộc tầng trước.
                </div>
              )}

              {selectedNodeModal.unlockedSkillId && (
                <div className="p-2.5 bg-purple-950/60 border border-purple-500/50 rounded-xs text-xs text-purple-200">
                  ⚡ <strong>Tuyệt kỹ đính kèm:</strong> Mở khóa trực tiếp kỹ năng chủ động trong Thư Viện Kỹ Năng.
                </div>
              )}

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  onClick={() => setSelectedNodeModal(null)}
                  className="px-4 py-2 bg-slate-900 border border-slate-700 text-slate-300 text-xs font-chakra font-bold rounded-xs cursor-pointer"
                >
                  ĐÓNG
                </button>
                {!selectedNodeModal.unlocked && (
                  <button
                    onClick={() => {
                      onUnlockTalentNode(selectedNodeModal.id);
                      setSelectedNodeModal(null);
                    }}
                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 border border-cyan-300 text-white text-xs font-chakra font-bold rounded-xs cursor-pointer shadow-[0_0_12px_rgba(0,229,255,0.4)]"
                  >
                    LĨNH NGỘ NÚT TÀI NĂNG
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
