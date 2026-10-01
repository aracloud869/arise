import React, { useEffect, useState } from 'react';
import { SkullBossIcon, AlertGlyphIcon } from '../icons/SystemIcons';

interface HolographicHPBarProps {
  currentHp: number;
  maxHp: number;
  label: string;
  subLabel?: string;
  role?: 'boss' | 'elite' | 'minion' | 'player';
  rage?: number;
  showRage?: boolean;
  dodgeRate?: number;
  waveInfo?: string;
  className?: string;
}

export const HolographicHPBar: React.FC<HolographicHPBarProps> = ({
  currentHp,
  maxHp,
  label,
  subLabel,
  role = 'boss',
  rage = 0,
  showRage = false,
  dodgeRate,
  waveInfo,
  className = '',
}) => {
  const hpPercent = Math.max(0, Math.min(100, Math.round((currentHp / maxHp) * 100)));
  const isCritical = hpPercent <= 20 && hpPercent > 0;
  const isDead = currentHp <= 0;

  // Trailing damage ghost bar for dynamic punchy feedback
  const [ghostHpPercent, setGhostHpPercent] = useState(hpPercent);

  useEffect(() => {
    if (hpPercent < ghostHpPercent) {
      const timer = setTimeout(() => {
        setGhostHpPercent(hpPercent);
      }, 450);
      return () => clearTimeout(timer);
    } else {
      setGhostHpPercent(hpPercent);
    }
  }, [hpPercent, ghostHpPercent]);

  // Color schemes based on role and critical state
  const isPlayer = role === 'player';
  const isBoss = role === 'boss';
  const isElite = role === 'elite';

  const getBarGradient = () => {
    if (isDead) return 'from-slate-800 to-slate-900';
    if (isCritical) return 'from-red-600 via-rose-500 to-red-700 animate-pulse';
    if (isPlayer) return 'from-cyan-600 via-blue-500 to-teal-400';
    if (isBoss) return 'from-purple-600 via-red-600 to-rose-500';
    if (isElite) return 'from-amber-600 via-orange-500 to-yellow-500';
    return 'from-red-600 via-rose-600 to-orange-500';
  };

  const getBorderGlow = () => {
    if (isCritical) {
      return 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.9),inset_0_0_15px_rgba(239,68,68,0.35)] ring-2 ring-red-500/80 animate-pulse bg-red-950/40';
    }
    if (isPlayer) {
      return 'border-cyan-400/80 shadow-[0_0_15px_rgba(0,229,255,0.4),inset_0_0_8px_rgba(0,229,255,0.15)] bg-slate-950/85';
    }
    if (isBoss) {
      return 'border-purple-500/80 shadow-[0_0_18px_rgba(168,85,247,0.45),inset_0_0_10px_rgba(239,68,68,0.2)] bg-slate-950/85';
    }
    if (isElite) {
      return 'border-amber-500/80 shadow-[0_0_15px_rgba(245,158,11,0.4),inset_0_0_8px_rgba(245,158,11,0.15)] bg-slate-950/85';
    }
    return 'border-red-500/50 shadow-[0_0_12px_rgba(239,68,68,0.3)] bg-slate-950/85';
  };

  // Generate 10 holographic health segments
  const segments = Array.from({ length: 10 }, (_, i) => i);

  return (
    <div
      className={`w-full max-w-full relative p-2 sm:p-2.5 rounded-xs backdrop-blur-md border transition-all duration-300 ${getBorderGlow()} ${className}`}
    >
      {/* Holographic Cyber Corner Brackets */}
      <div className={`absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 ${isCritical ? 'border-red-400 animate-ping' : isPlayer ? 'border-cyan-400' : isBoss ? 'border-purple-400' : 'border-amber-400'}`} />
      <div className={`absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 ${isCritical ? 'border-red-400 animate-ping' : isPlayer ? 'border-cyan-400' : isBoss ? 'border-purple-400' : 'border-amber-400'}`} />
      <div className={`absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 ${isCritical ? 'border-red-400 animate-ping' : isPlayer ? 'border-cyan-400' : isBoss ? 'border-purple-400' : 'border-amber-400'}`} />
      <div className={`absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 ${isCritical ? 'border-red-400 animate-ping' : isPlayer ? 'border-cyan-400' : isBoss ? 'border-purple-400' : 'border-amber-400'}`} />

      {/* Holographic Scanline Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.03)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none rounded-xs" />

      {/* Header Info */}
      <div className="w-full flex items-center justify-between text-xs mb-1 relative z-10">
        <div className="flex items-center gap-1.5 truncate max-w-[65%] sm:max-w-[75%]">
          {!isPlayer ? (
            <SkullBossIcon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${isCritical ? 'text-red-400 animate-bounce' : isBoss ? 'text-purple-400' : isElite ? 'text-amber-400' : 'text-red-500'}`} />
          ) : (
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shrink-0 shadow-[0_0_8px_rgba(0,229,255,0.8)]" />
          )}

          <div className="flex flex-col truncate min-w-0">
            <div className="flex items-center gap-1 sm:gap-1.5 truncate">
              <span
                className={`font-black font-chakra text-[11px] sm:text-xs md:text-sm tracking-wide truncate ${
                  isCritical
                    ? 'text-red-300 font-bold drop-shadow-[0_0_10px_rgba(239,68,68,0.9)] animate-pulse'
                    : isPlayer
                    ? 'text-cyan-200'
                    : isBoss
                    ? 'text-purple-200'
                    : isElite
                    ? 'text-amber-200'
                    : 'text-slate-100'
                }`}
              >
                {label}
              </span>

              {waveInfo && (
                <span className="text-[8px] sm:text-[9px] px-1 py-0.1 bg-slate-900 border border-cyan-500/40 text-cyan-300 rounded-xs font-mono shrink-0">
                  {waveInfo}
                </span>
              )}

              {role && role !== 'player' && (
                <span
                  className={`text-[8px] sm:text-[9px] px-1 py-0.1 font-mono font-bold rounded-xs shrink-0 ${
                    role === 'boss'
                      ? 'bg-purple-950 border border-purple-500 text-purple-300'
                      : role === 'elite'
                      ? 'bg-amber-950 border border-amber-500 text-amber-300'
                      : 'bg-red-950 border border-red-500/60 text-red-300'
                  }`}
                >
                  {role === 'boss' ? 'TRÙM CUỐI' : role === 'elite' ? 'TINH ANH' : 'BẦY QUÁI'}
                </span>
              )}
            </div>

            {subLabel && (
              <span className="text-[9px] sm:text-[10px] text-slate-400 font-chakra truncate">
                {subLabel}
              </span>
            )}
          </div>
        </div>

        {/* HP Value & Critical Alert Badge */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="text-right">
            <div className="font-orbitron font-bold text-[10px] sm:text-xs tracking-wider">
              <span className={isCritical ? 'text-red-400 font-black animate-pulse' : isPlayer ? 'text-cyan-300' : 'text-red-300'}>
                {currentHp.toLocaleString()}
              </span>
              <span className="text-slate-500 text-[9px] sm:text-[10px]"> / {maxHp.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Holographic HP Progress Bar */}
      <div className={`relative w-full h-3.5 sm:h-4 bg-slate-950 rounded-xs overflow-hidden border p-0.5 shadow-inner transition-colors ${
        isCritical ? 'border-red-500/90 shadow-[inset_0_0_10px_rgba(239,68,68,0.5)] ring-1 ring-red-500' : 'border-slate-700/80'
      }`}>
        {/* Trailing Damage Ghost Bar */}
        <div
          className="absolute top-0.5 bottom-0.5 left-0.5 bg-amber-400/50 transition-all duration-500 ease-out rounded-xs"
          style={{ width: `calc(${ghostHpPercent}% - 4px)` }}
        />

        {/* Active Health Fill */}
        <div
          className={`h-full bg-gradient-to-r ${getBarGradient()} transition-all duration-200 ease-out rounded-xs relative shadow-[0_0_12px_rgba(0,229,255,0.3)]`}
          style={{ width: `${hpPercent}%` }}
        >
          {/* Shimmer Light Sweep */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer opacity-75" />
        </div>

        {/* 10 Holographic Segments Overlay */}
        <div className="absolute inset-0 flex justify-between pointer-events-none px-0.5">
          {segments.map((s) => (
            <div key={s} className="w-[1px] h-full bg-slate-950/70" />
          ))}
        </div>

        {/* Center Percentage & Status Badge */}
        <div className="absolute inset-0 flex items-center justify-between px-1.5 text-[8px] sm:text-[9px] font-orbitron font-bold pointer-events-none drop-shadow">
          <span className="font-mono tracking-wider opacity-90 text-white">
            {isDead ? '[TỬ TRẬN]' : isCritical ? '⚠️ HP NGUY CẤP' : isPlayer ? 'HUNTER HP' : role === 'boss' ? 'BOSS HP' : 'ENEMY HP'}
          </span>
          <span className={`${isCritical ? 'text-yellow-300 animate-pulse font-black text-[9px] sm:text-[10px]' : 'text-white'}`}>
            {hpPercent}%
          </span>
        </div>
      </div>

      {/* Critical Danger Red Flashing Warning Strip (< 20% HP) */}
      {isCritical && (
        <div className="mt-1 px-1.5 py-0.5 bg-red-950/95 border border-red-500 text-red-200 text-[9px] sm:text-[10px] font-chakra font-black tracking-wider flex items-center justify-between rounded-xs animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.8)]">
          <span className="flex items-center gap-1">
            <AlertGlyphIcon className="w-3 h-3 text-red-400 animate-bounce shrink-0" />
            <span className="truncate">⚠️ [CẢNH BÁO NGUY CẤP: HP DƯỚI 20%]</span>
          </span>
          <span className="font-mono font-black text-amber-300 uppercase animate-ping shrink-0 text-[8px]">
            CRITICAL
          </span>
        </div>
      )}

      {/* Optional Rage / Fury Gauge for Boss */}
      {showRage && (
        <div className="mt-1 flex items-center gap-1.5 text-[8px] sm:text-[9px]">
          <span className="text-amber-400 font-bold font-chakra shrink-0">NỘ KHÍ:</span>
          <div className="flex-1 h-1 sm:h-1.5 bg-slate-950 border border-amber-500/40 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 transition-all duration-300"
              style={{ width: `${Math.min(100, Math.max(0, rage))}%` }}
            />
          </div>
          <span className="font-mono font-bold text-amber-300 shrink-0">{rage}%</span>
        </div>
      )}
    </div>
  );
};
