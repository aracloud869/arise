import { Skill } from '../types';

export type SkillRank = 'E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'Monarch';

/**
 * Returns the definitive rank for any skill.
 * If skill.rank is specified, uses that; otherwise infers from minLevelToUnlock or skill ID.
 */
export const getSkillRank = (skill: Skill): SkillRank => {
  if (skill.rank) return skill.rank;

  const id = skill.id;
  // Monarch / Mythic tier
  if (
    id.includes('void') ||
    id.includes('kamish') ||
    id.includes('demon') ||
    id.includes('dragon-breath')
  ) {
    return 'Monarch';
  }

  // S-Rank tier
  if (
    id.includes('arise') ||
    id.includes('domain') ||
    id.includes('extraction') ||
    id.includes('dragon-fear')
  ) {
    return 'S';
  }

  // A-Rank tier
  if (
    id.includes('authority') ||
    id.includes('spatial') ||
    id.includes('exchange') ||
    id.includes('armor')
  ) {
    return 'A';
  }

  // B-Rank tier
  if (
    id.includes('rasaka') ||
    id.includes('stealth') ||
    id.includes('bloodlust') ||
    id.includes('quicksilver')
  ) {
    return 'B';
  }

  // C-Rank tier
  if (id.includes('mutilate') || id.includes('shadow-step')) {
    return 'C';
  }

  // D-Rank tier
  if (id.includes('venom') || id.includes('vital')) {
    return 'D';
  }

  // E-Rank tier default
  return 'E';
};

/**
 * Configuration and styling metadata for each rank
 */
export interface RankStyleConfig {
  rank: SkillRank;
  label: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  glowColor: string;
  readyPulseClass: string;
  ambientRingClass: string;
  gradientBg: string;
}

export const RANK_STYLE_CONFIGS: Record<SkillRank, RankStyleConfig> = {
  E: {
    rank: 'E',
    label: 'HẠNG E',
    badgeBg: 'bg-slate-900/90',
    badgeBorder: 'border-slate-500/60',
    badgeText: 'text-slate-300',
    glowColor: 'rgba(148, 163, 184, 0.5)',
    readyPulseClass: 'animate-rank-pulse-e',
    ambientRingClass: 'ring-1 ring-slate-400/40',
    gradientBg: 'from-slate-900 via-slate-950 to-slate-900',
  },
  D: {
    rank: 'D',
    label: 'HẠNG D',
    badgeBg: 'bg-emerald-950/80',
    badgeBorder: 'border-emerald-500/60',
    badgeText: 'text-emerald-300',
    glowColor: 'rgba(34, 197, 94, 0.6)',
    readyPulseClass: 'animate-rank-pulse-d',
    ambientRingClass: 'ring-1 ring-emerald-400/50',
    gradientBg: 'from-emerald-950/40 via-slate-950 to-emerald-950/30',
  },
  C: {
    rank: 'C',
    label: 'HẠNG C',
    badgeBg: 'bg-cyan-950/80',
    badgeBorder: 'border-cyan-500/70',
    badgeText: 'text-cyan-300',
    glowColor: 'rgba(56, 189, 248, 0.65)',
    readyPulseClass: 'animate-rank-pulse-c',
    ambientRingClass: 'ring-1 ring-cyan-400/60',
    gradientBg: 'from-cyan-950/40 via-slate-950 to-blue-950/40',
  },
  B: {
    rank: 'B',
    label: 'HẠNG B',
    badgeBg: 'bg-purple-950/80',
    badgeBorder: 'border-purple-500/70',
    badgeText: 'text-purple-300',
    glowColor: 'rgba(168, 85, 247, 0.7)',
    readyPulseClass: 'animate-rank-pulse-b',
    ambientRingClass: 'ring-1 ring-purple-400/60',
    gradientBg: 'from-purple-950/50 via-slate-950 to-indigo-950/40',
  },
  A: {
    rank: 'A',
    label: 'HẠNG A',
    badgeBg: 'bg-fuchsia-950/80',
    badgeBorder: 'border-fuchsia-500/80',
    badgeText: 'text-fuchsia-300',
    glowColor: 'rgba(217, 70, 239, 0.75)',
    readyPulseClass: 'animate-rank-pulse-a',
    ambientRingClass: 'ring-1.5 ring-fuchsia-400/70',
    gradientBg: 'from-fuchsia-950/50 via-slate-950 to-purple-950/50',
  },
  S: {
    rank: 'S',
    label: 'HẠNG S',
    badgeBg: 'bg-amber-950/90',
    badgeBorder: 'border-amber-400',
    badgeText: 'text-amber-300',
    glowColor: 'rgba(245, 158, 11, 0.85)',
    readyPulseClass: 'animate-rank-pulse-s',
    ambientRingClass: 'ring-2 ring-amber-400/80',
    gradientBg: 'from-amber-950/60 via-slate-950 to-yellow-950/40',
  },
  Monarch: {
    rank: 'Monarch',
    label: 'CHÚA TỂ',
    badgeBg: 'bg-gradient-to-r from-purple-950 via-violet-900 to-amber-950',
    badgeBorder: 'border-amber-400',
    badgeText: 'text-amber-200',
    glowColor: 'rgba(234, 179, 8, 0.9)',
    readyPulseClass: 'animate-rank-pulse-monarch',
    ambientRingClass: 'ring-2 ring-amber-400 shadow-[0_0_15px_rgba(234,179,8,0.5)]',
    gradientBg: 'from-purple-950/70 via-slate-950 to-amber-950/50',
  },
};

/**
 * Returns passive CSS animation pulse class for a skill based on its rank and ready state.
 */
export const getSkillRankPulseClass = (skill: Skill, isReady: boolean = true): string => {
  if (!isReady) return 'opacity-60 grayscale-[40%] transition-opacity';
  const rank = getSkillRank(skill);
  return RANK_STYLE_CONFIGS[rank].readyPulseClass;
};
