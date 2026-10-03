import React from 'react';

export interface FloatingCombatItem {
  id: number;
  text: string;
  subText?: string;
  type: 'damage' | 'crit' | 'skill' | 'heal' | 'boss_damage' | 'status' | 'effectiveness';
  rank?: string;
  x: number; // percentage within arena (0-100)
  y: number; // percentage within arena (0-100)
}

interface CombatDamageOverlayProps {
  items: FloatingCombatItem[];
}

export const CombatDamageOverlay: React.FC<CombatDamageOverlayProps> = ({ items }) => {
  if (items.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-visible">
      {items.map((item) => {
        const isCrit = item.type === 'crit';
        const isHeal = item.type === 'heal';
        const isBossDmg = item.type === 'boss_damage';
        const isStatus = item.type === 'status';
        const isEffectiveness = item.type === 'effectiveness';
        const isSkill = item.type === 'skill';

        return (
          <div
            key={item.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-combat-popup flex flex-col items-center select-none"
            style={{ left: `${item.x}%`, top: `${item.y}%` }}
          >
            {/* Skill / Effectiveness Header Badge */}
            {(item.subText || isEffectiveness || isSkill) && (
              <div
                className={`text-[9px] font-chakra font-black px-1.5 py-0.5 rounded-xs tracking-wider uppercase mb-0.5 border shadow-sm flex items-center gap-1 ${
                  isCrit || item.rank === 'Monarch' || item.rank === 'S'
                    ? 'bg-amber-950/90 border-amber-400 text-amber-200 shadow-[0_0_8px_rgba(245,158,11,0.6)]'
                    : isEffectiveness
                    ? 'bg-cyan-950/90 border-cyan-400 text-cyan-200 shadow-[0_0_8px_rgba(56,189,248,0.5)]'
                    : isStatus
                    ? 'bg-purple-950/90 border-purple-400 text-purple-200'
                    : 'bg-slate-900/90 border-slate-600 text-slate-200'
                }`}
              >
                {item.rank && (
                  <span className="text-[8px] font-orbitron font-extrabold text-amber-300">
                    [{item.rank}]
                  </span>
                )}
                <span>{item.subText || (isCrit ? 'CRITICAL!' : 'SKILL HIT')}</span>
              </div>
            )}

            {/* Main Floating Number / Status Text */}
            <div
              className={`font-black font-orbitron tracking-tight leading-none ${
                isCrit
                  ? 'text-lg sm:text-2xl text-yellow-300 drop-shadow-[0_0_12px_rgba(234,179,8,0.95)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]'
                  : isHeal
                  ? 'text-sm sm:text-lg text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.9)]'
                  : isBossDmg
                  ? 'text-sm sm:text-lg text-rose-500 drop-shadow-[0_0_10px_rgba(244,63,94,0.9)]'
                  : isStatus
                  ? 'text-xs sm:text-sm text-cyan-300 drop-shadow-[0_0_8px_rgba(56,189,248,0.85)]'
                  : 'text-sm sm:text-lg text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]'
              }`}
            >
              {item.text}
            </div>

            {/* Impact Flash Dot for Crits */}
            {isCrit && (
              <div className="w-2 h-2 rounded-full bg-yellow-200 animate-ping mt-0.5" />
            )}
          </div>
        );
      })}
    </div>
  );
};
