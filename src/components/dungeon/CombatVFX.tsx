import React from 'react';

export type VFXType =
  | 'basic_slash'
  | 'dagger_throw'
  | 'vital_strike'
  | 'venom_strike'
  | 'rasaka_flurry'
  | 'mutilate_x'
  | 'kamish_wrath'
  | 'shadow_step'
  | 'stealth_invisible'
  | 'bloodlust_aura'
  | 'quicksilver'
  | 'ruler_authority'
  | 'spatial_collapse'
  | 'shadow_exchange'
  | 'arise'
  | 'shadow_extraction'
  | 'monarch_domain'
  | 'shadow_armor'
  | 'dragon_fear'
  | 'dragon_breath'
  | 'demon_lightning'
  | 'void_cleave'
  | 'boss_claw'
  | 'boss_combo'
  | 'boss_ultimate'
  | 'monster_evade'
  | null;

interface CombatVFXProps {
  activeVFX: VFXType;
}

export const CombatVFX: React.FC<CombatVFXProps> = ({ activeVFX }) => {
  if (!activeVFX) return null;

  return (
    <div
      key={activeVFX}
      className="absolute inset-0 pointer-events-none z-40 overflow-hidden flex items-center justify-center select-none"
    >
      {/* ========================================================================= */}
      {/* 1. BASIC SLASH: Twin High-Speed Cyan Plasma Scythe Arcs */}
      {/* ========================================================================= */}
      {activeVFX === 'basic_slash' && (
        <div className="absolute left-[15%] sm:left-[22%] top-1/2 -translate-y-1/2 w-44 sm:w-60 h-28 sm:h-36 animate-vfx-razorslash">
          <svg className="w-full h-full" viewBox="0 0 200 120">
            <defs>
              <linearGradient id="slashGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="50%" stopColor="#00e5ff" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0077ff" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="slashGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="1" />
                <stop offset="60%" stopColor="#0284c7" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#0369a1" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Primary Slash Wave */}
            <path
              d="M 15 110 Q 95 40 185 15"
              fill="none"
              stroke="url(#slashGrad1)"
              strokeWidth="9"
              strokeLinecap="round"
            />
            {/* White-Hot Core Blade */}
            <path
              d="M 25 105 Q 100 45 175 22"
              fill="none"
              stroke="#ffffff"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Cross Counter Slash Wave */}
            <path
              d="M 185 105 Q 100 50 20 25"
              fill="none"
              stroke="url(#slashGrad2)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Impact Flash Core */}
            <circle cx="100" cy="55" r="16" fill="#00e5ff" opacity="0.8" className="animate-ping" />
            <circle cx="100" cy="55" r="8" fill="#ffffff" />
          </svg>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. DAGGER THROW: 5 Converging Piercing Dagger Beams */}
      {/* ========================================================================= */}
      {activeVFX === 'dagger_throw' && (
        <div className="absolute left-[12%] sm:left-[20%] top-1/2 -translate-y-1/2 w-48 sm:w-64 h-32 sm:h-40 animate-vfx-daggerburst">
          <svg className="w-full h-full" viewBox="0 0 200 120">
            <defs>
              <linearGradient id="daggerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="60%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Target Reticle */}
            <circle cx="95" cy="60" r="26" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="6 3" />
            <circle cx="95" cy="60" r="10" fill="#00e5ff" opacity="0.6" className="animate-ping" />
            {/* Converging Dagger Paths */}
            {[
              { x1: 15, y1: 15, x2: 85, y2: 55 },
              { x1: 175, y1: 20, x2: 105, y2: 55 },
              { x1: 10, y1: 60, x2: 80, y2: 60 },
              { x1: 180, y1: 65, x2: 110, y2: 60 },
              { x1: 95, y1: 110, x2: 95, y2: 70 },
            ].map((d, i) => (
              <g key={i}>
                <line x1={d.x1} y1={d.y1} x2={d.x2} y2={d.y2} stroke="url(#daggerGrad)" strokeWidth="6" strokeLinecap="round" />
                <line x1={d.x1} y1={d.y1} x2={d.x2} y2={d.y2} stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
              </g>
            ))}
          </svg>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. VITAL STRIKE: Crimson Sniper Lock & Lethal Heart Pierce */}
      {/* ========================================================================= */}
      {activeVFX === 'vital_strike' && (
        <div className="absolute left-[16%] sm:left-[24%] top-1/2 -translate-y-1/2 w-44 sm:w-56 h-32 sm:h-40 animate-vfx-vitalcrosshair">
          <svg className="w-full h-full" viewBox="0 0 160 140">
            <defs>
              <radialGradient id="vitalRadial" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="50%" stopColor="#ef4444" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#991b1b" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* Sniper Crosshairs */}
            <circle cx="80" cy="70" r="38" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="8 4" />
            <circle cx="80" cy="70" r="20" fill="url(#vitalRadial)" />
            <line x1="80" y1="15" x2="80" y2="125" stroke="#ef4444" strokeWidth="2" />
            <line x1="25" y1="70" x2="135" y2="70" stroke="#ef4444" strokeWidth="2" />
            {/* Lethal Heart-Piercing Spike */}
            <polygon points="80,10 88,60 80,120 72,60" fill="#ffffff" />
            <circle cx="80" cy="70" r="14" fill="#ef4444" opacity="0.8" className="animate-ping" />
          </svg>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. VENOM STRIKE: Toxic Viper Emerald Acid Fangs */}
      {/* ========================================================================= */}
      {activeVFX === 'venom_strike' && (
        <div className="absolute left-[14%] sm:left-[22%] top-1/2 -translate-y-1/2 w-48 sm:w-60 h-32 sm:h-40 animate-vfx-venomsnap">
          <svg className="w-full h-full" viewBox="0 0 180 140">
            <defs>
              <linearGradient id="venomGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4ade80" />
                <stop offset="60%" stopColor="#16a34a" />
                <stop offset="100%" stopColor="#14532d" />
              </linearGradient>
            </defs>
            {/* Top Venomous Fang */}
            <path d="M 50 15 Q 90 60 90 70 Q 75 45 50 15 Z" fill="url(#venomGrad)" stroke="#86efac" strokeWidth="2" />
            <path d="M 130 15 Q 90 60 90 70 Q 105 45 130 15 Z" fill="url(#venomGrad)" stroke="#86efac" strokeWidth="2" />
            {/* Acid Splash Splatters */}
            {[
              { cx: 70, cy: 75, r: 6 },
              { cx: 110, cy: 75, r: 5 },
              { cx: 90, cy: 95, r: 9 },
              { cx: 60, cy: 110, r: 4 },
              { cx: 120, cy: 110, r: 4 },
            ].map((p, i) => (
              <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill="#22c55e" opacity="0.85" />
            ))}
            <circle cx="90" cy="70" r="14" fill="#a7f3d0" opacity="0.7" className="animate-ping" />
          </svg>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. RASAKA FLURRY: Blood Whirlwind & Rapid Crescent Dance */}
      {/* ========================================================================= */}
      {activeVFX === 'rasaka_flurry' && (
        <div className="absolute left-[12%] sm:left-[20%] top-1/2 -translate-y-1/2 w-52 sm:w-68 h-36 sm:h-44 animate-vfx-rasakawhirl">
          <svg className="w-full h-full" viewBox="0 0 200 160">
            <defs>
              <linearGradient id="rasakaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="50%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="80" r="55" fill="none" stroke="url(#rasakaGrad)" strokeWidth="6" strokeDasharray="25 15" />
            <circle cx="100" cy="80" r="35" fill="none" stroke="#ffffff" strokeWidth="3" strokeDasharray="15 10" />
            {/* Quad Crescent Slashes */}
            <path d="M 45 45 Q 100 80 155 45" fill="none" stroke="#f43f5e" strokeWidth="6" strokeLinecap="round" />
            <path d="M 155 115 Q 100 80 45 115" fill="none" stroke="#c084fc" strokeWidth="6" strokeLinecap="round" />
            <path d="M 45 115 Q 100 80 45 45" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 155 45 Q 100 80 155 115" fill="none" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="100" cy="80" r="18" fill="#ec4899" opacity="0.8" className="animate-ping" />
          </svg>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. MUTILATE: Massive Armor-Cracking Heavy Execution Cleave */}
      {/* ========================================================================= */}
      {activeVFX === 'mutilate_x' && (
        <div className="absolute left-[14%] sm:left-[22%] top-1/2 -translate-y-1/2 w-52 sm:w-68 h-36 sm:h-44 animate-vfx-mutilatecrash">
          <svg className="w-full h-full" viewBox="0 0 200 160">
            <defs>
              <linearGradient id="mutilateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="40%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#881337" />
              </linearGradient>
            </defs>
            {/* Giant X-Cleave Line 1 */}
            <line x1="20" y1="20" x2="180" y2="140" stroke="url(#mutilateGrad)" strokeWidth="12" strokeLinecap="round" />
            <line x1="20" y1="20" x2="180" y2="140" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
            {/* Giant X-Cleave Line 2 */}
            <line x1="180" y1="20" x2="20" y2="140" stroke="url(#mutilateGrad)" strokeWidth="12" strokeLinecap="round" />
            <line x1="180" y1="20" x2="20" y2="140" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
            {/* Center Shatter Explosion */}
            <polygon points="100,50 115,90 100,110 85,90" fill="#ffffff" />
            <circle cx="100" cy="80" r="24" fill="#e11d48" opacity="0.85" className="animate-ping" />
          </svg>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. KAMISH WRATH: Volcanic Dragon Magma Jaws & Ash Burst */}
      {/* ========================================================================= */}
      {activeVFX === 'kamish_wrath' && (
        <div className="absolute left-[10%] sm:left-[18%] top-1/2 -translate-y-1/2 w-56 sm:w-72 h-36 sm:h-48 animate-vfx-kamishvolcano">
          <svg className="w-full h-full" viewBox="0 0 220 160">
            <defs>
              <linearGradient id="kamishGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fde047" />
                <stop offset="50%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#dc2626" />
              </linearGradient>
            </defs>
            {/* Dragon Magma Jaws */}
            <path d="M 30 30 Q 110 10 190 60 Q 110 50 30 30 Z" fill="url(#kamishGrad)" stroke="#ffffff" strokeWidth="2" />
            <path d="M 30 130 Q 110 150 190 100 Q 110 110 30 130 Z" fill="url(#kamishGrad)" stroke="#ffffff" strokeWidth="2" />
            {/* Burning Ember Sparks */}
            <circle cx="110" cy="80" r="28" fill="#f59e0b" opacity="0.75" className="animate-ping" />
            <circle cx="110" cy="80" r="14" fill="#ffffff" />
          </svg>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 8. SHADOW STEP: Fast Triple Mirage Teleport Behind Target */}
      {/* ========================================================================= */}
      {activeVFX === 'shadow_step' && (
        <div className="absolute inset-0 flex items-center justify-around animate-vfx-shadowmirage">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-600/60 to-cyan-500/40 rounded-full blur-md animate-pulse" />
          <div className="w-28 h-28 bg-gradient-to-r from-cyan-400/80 to-blue-600/50 rounded-full blur-lg animate-ping" />
        </div>
      )}

      {/* ========================================================================= */}
      {/* 9. STEALTH: Hexagonal Tactical Camouflage Cloak Around Hunter */}
      {/* ========================================================================= */}
      {activeVFX === 'stealth_invisible' && (
        <div className="absolute right-[14%] sm:right-[20%] top-1/2 -translate-y-1/2 w-44 sm:w-56 h-36 sm:h-44 animate-vfx-stealthhex">
          <svg className="w-full h-full" viewBox="0 0 160 140">
            {/* Hexagonal Shield Network */}
            {[
              { cx: 80, cy: 50, r: 24 },
              { cx: 50, cy: 90, r: 22 },
              { cx: 110, cy: 90, r: 22 },
            ].map((hex, i) => (
              <polygon
                key={i}
                points={`${hex.cx},${hex.cy - hex.r} ${hex.cx + hex.r * 0.86},${hex.cy - hex.r * 0.5} ${hex.cx + hex.r * 0.86},${hex.cy + hex.r * 0.5} ${hex.cx},${hex.cy + hex.r} ${hex.cx - hex.r * 0.86},${hex.cy + hex.r * 0.5} ${hex.cx - hex.r * 0.86},${hex.cy - hex.r * 0.5}`}
                fill="none"
                stroke="#00e5ff"
                strokeWidth="2.5"
                opacity="0.9"
              />
            ))}
            <circle cx="80" cy="75" r="26" fill="#00e5ff" opacity="0.3" className="animate-ping" />
          </svg>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 10. BLOODLUST: Crimson Demonic Gaze & Terror Shockwaves */}
      {/* ========================================================================= */}
      {activeVFX === 'bloodlust_aura' && (
        <div className="absolute inset-0 flex items-center justify-center animate-vfx-bloodlustpulse">
          <div className="w-56 h-56 rounded-full border-4 border-red-500/80 bg-red-950/40 shadow-[0_0_50px_rgba(239,68,68,0.8)] animate-ping" />
        </div>
      )}

      {/* ========================================================================= */}
      {/* 11. QUICKSILVER: Chrono Acceleration Glyph Around Hunter */}
      {/* ========================================================================= */}
      {activeVFX === 'quicksilver' && (
        <div className="absolute right-[14%] sm:right-[20%] top-1/2 -translate-y-1/2 w-48 sm:w-60 h-36 sm:h-44 animate-vfx-quicksilverclock">
          <svg className="w-full h-full" viewBox="0 0 180 140">
            <circle cx="90" cy="70" r="45" fill="none" stroke="#facc15" strokeWidth="3" strokeDasharray="12 6" />
            <circle cx="90" cy="70" r="25" fill="none" stroke="#ffffff" strokeWidth="2" />
            <line x1="90" y1="70" x2="90" y2="40" stroke="#facc15" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="90" y1="70" x2="115" y2="70" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="90" cy="70" r="14" fill="#eab308" opacity="0.75" className="animate-ping" />
          </svg>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 12. RULER'S AUTHORITY: Invisible Gravitational Slam From Heavens */}
      {/* ========================================================================= */}
      {activeVFX === 'ruler_authority' && (
        <div className="absolute left-[12%] sm:left-[20%] top-0 bottom-0 w-52 sm:w-64 flex flex-col items-center justify-center animate-vfx-authorityslam">
          <div className="w-full h-12 bg-gradient-to-b from-cyan-400 via-blue-500 to-transparent blur-xs opacity-90" />
          <div className="w-48 h-8 rounded-full border-2 border-cyan-300 bg-cyan-950/80 shadow-[0_0_30px_#00e5ff] animate-ping" />
        </div>
      )}

      {/* ========================================================================= */}
      {/* 13. SPATIAL COLLAPSE: Gravitational Singularity Black Hole */}
      {/* ========================================================================= */}
      {activeVFX === 'spatial_collapse' && (
        <div className="absolute left-[14%] sm:left-[22%] top-1/2 -translate-y-1/2 w-48 sm:w-60 h-36 sm:h-44 animate-vfx-blackhole">
          <svg className="w-full h-full" viewBox="0 0 160 140">
            <circle cx="80" cy="70" r="22" fill="#000000" stroke="#38bdf8" strokeWidth="4" />
            <circle cx="80" cy="70" r="40" fill="none" stroke="#a855f7" strokeWidth="3" strokeDasharray="14 8" />
            <circle cx="80" cy="70" r="55" fill="none" stroke="#00e5ff" strokeWidth="2" strokeDasharray="8 6" />
            <circle cx="80" cy="70" r="10" fill="#ffffff" className="animate-ping" />
          </svg>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 14. SHADOW EXCHANGE: Abyssal Shadow Portal */}
      {/* ========================================================================= */}
      {activeVFX === 'shadow_exchange' && (
        <div className="absolute right-[14%] sm:right-[20%] bottom-2 w-48 sm:w-60 h-24 animate-vfx-shadowportal">
          <div className="w-full h-12 rounded-[100%] bg-gradient-to-r from-purple-900 via-slate-950 to-indigo-900 border-2 border-purple-400 shadow-[0_0_35px_#a855f7] animate-pulse" />
        </div>
      )}

      {/* ========================================================================= */}
      {/* 15. ARISE: Grand Shadow Monarch Legion Summoning Array */}
      {/* ========================================================================= */}
      {activeVFX === 'arise' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center animate-vfx-ariseburst">
          {/* Summoning Runic Floor Array */}
          <div className="w-64 sm:w-96 h-28 sm:h-36 rounded-[100%] border-2 border-purple-400/90 bg-purple-950/40 shadow-[0_0_50px_rgba(168,85,247,0.9)] flex items-center justify-center relative overflow-hidden">
            <div className="w-48 sm:w-72 h-16 sm:h-20 rounded-[100%] border border-cyan-400/80 animate-ping" />
            <span className="font-chakra font-black text-xl sm:text-3xl text-purple-200 tracking-[0.25em] drop-shadow-[0_0_20px_#a855f7]">
              ARISE · TRỖI DẬY
            </span>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 16. SHADOW EXTRACTION: Soul Extraction Vortex */}
      {/* ========================================================================= */}
      {activeVFX === 'shadow_extraction' && (
        <div className="absolute left-[15%] sm:left-[22%] top-1/2 -translate-y-1/2 w-48 sm:w-60 h-36 sm:h-44 animate-vfx-soulextraction">
          <svg className="w-full h-full" viewBox="0 0 160 140">
            <path d="M 80 120 Q 50 70 80 20 Q 110 70 80 120 Z" fill="none" stroke="#c084fc" strokeWidth="4" />
            <circle cx="80" cy="70" r="18" fill="#a855f7" opacity="0.8" className="animate-ping" />
          </svg>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 17. MONARCH'S DOMAIN: Infinite Shadow Ocean Expanding Over Battlefield */}
      {/* ========================================================================= */}
      {activeVFX === 'monarch_domain' && (
        <div className="absolute inset-0 bg-gradient-to-t from-purple-950/90 via-slate-950/80 to-transparent flex items-center justify-center animate-vfx-monarchdomain">
          <div className="w-72 sm:w-[32rem] h-20 sm:h-28 rounded-[100%] border-2 border-purple-400 shadow-[0_0_60px_#a855f7] flex items-center justify-center">
            <span className="font-orbitron font-black text-xs sm:text-base text-purple-200 tracking-widest uppercase">
              👑 LÃNH ĐỊA CHÚA TỂ BÓNG TỐI
            </span>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 18. SHADOW ARMOR: Interlocking Crystalline Obsidian Aegis */}
      {/* ========================================================================= */}
      {activeVFX === 'shadow_armor' && (
        <div className="absolute right-[14%] sm:right-[20%] top-1/2 -translate-y-1/2 w-48 sm:w-60 h-36 sm:h-44 animate-vfx-shadowarmor">
          <div className="w-full h-full rounded-lg border-2 border-indigo-400/90 bg-indigo-950/50 shadow-[0_0_35px_rgba(99,102,241,0.8)] flex items-center justify-center">
            <span className="font-chakra font-black text-xs text-indigo-200 uppercase">
              🛡️ HẮC GIÁP HỘ THỂ
            </span>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 19. DRAGON FEAR: Draconic Stun Roar Shockwave */}
      {/* ========================================================================= */}
      {activeVFX === 'dragon_fear' && (
        <div className="absolute left-[12%] sm:left-[20%] top-1/2 -translate-y-1/2 w-52 sm:w-68 h-36 sm:h-44 animate-vfx-dragonroar">
          <svg className="w-full h-full" viewBox="0 0 180 140">
            <circle cx="90" cy="70" r="48" fill="none" stroke="#f59e0b" strokeWidth="4" strokeDasharray="14 6" />
            <circle cx="90" cy="70" r="28" fill="none" stroke="#fbbf24" strokeWidth="3" />
            <circle cx="90" cy="70" r="16" fill="#f59e0b" opacity="0.8" className="animate-ping" />
          </svg>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 20. DRAGON BREATH: Torrent of Azure-White Incinerating Plasma */}
      {/* ========================================================================= */}
      {activeVFX === 'dragon_breath' && (
        <div className="absolute inset-0 flex items-center justify-center animate-vfx-dragonbeam">
          <div className="w-full h-14 sm:h-20 bg-gradient-to-r from-transparent via-cyan-400 to-white shadow-[0_0_60px_#00e5ff] blur-xs" />
        </div>
      )}

      {/* ========================================================================= */}
      {/* 21. DEMON LIGHTNING: Celestial Golden-Cyan Lightning Bolt */}
      {/* ========================================================================= */}
      {activeVFX === 'demon_lightning' && (
        <div className="absolute left-[16%] sm:left-[24%] top-0 bottom-0 w-28 sm:w-36 animate-vfx-demonthunder">
          <svg className="w-full h-full" viewBox="0 0 100 200">
            <polyline
              points="50,0 35,60 65,90 30,140 70,160 45,200"
              fill="none"
              stroke="#00e5ff"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <polyline
              points="50,0 35,60 65,90 30,140 70,160 45,200"
              fill="none"
              stroke="#ffffff"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 22. VOID CLEAVE: Cosmic Dimensional Rift Cleave */}
      {/* ========================================================================= */}
      {activeVFX === 'void_cleave' && (
        <div className="absolute left-[10%] sm:left-[18%] top-1/2 -translate-y-1/2 w-56 sm:w-76 h-36 sm:h-48 animate-vfx-voidrift">
          <svg className="w-full h-full" viewBox="0 0 220 160">
            <line x1="20" y1="140" x2="200" y2="20" stroke="#a855f7" strokeWidth="16" strokeLinecap="round" />
            <line x1="20" y1="140" x2="200" y2="20" stroke="#000000" strokeWidth="8" strokeLinecap="round" />
            <line x1="20" y1="140" x2="200" y2="20" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 23. BOSS CLAW: Jagged Crimson Lacerations */}
      {/* ========================================================================= */}
      {activeVFX === 'boss_claw' && (
        <div className="absolute right-[14%] sm:right-[22%] top-1/2 -translate-y-1/2 w-48 sm:w-60 h-32 sm:h-40 animate-vfx-razorslash">
          <svg className="w-full h-full" viewBox="0 0 160 120">
            <path d="M 20 20 Q 80 60 140 100" stroke="#ef4444" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M 40 10 Q 100 50 160 90" stroke="#b91c1c" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M 10 35 Q 70 75 130 115" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" fill="none" />
          </svg>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 24. BOSS COMBO: Berserk Multi-Slash Storm */}
      {/* ========================================================================= */}
      {activeVFX === 'boss_combo' && (
        <div className="absolute right-[14%] sm:right-[22%] top-1/2 -translate-y-1/2 w-52 sm:w-64 h-36 sm:h-44 animate-vfx-mutilatecrash">
          <svg className="w-full h-full" viewBox="0 0 180 140">
            <line x1="20" y1="20" x2="160" y2="120" stroke="#dc2626" strokeWidth="10" strokeLinecap="round" />
            <line x1="160" y1="20" x2="20" y2="120" stroke="#b91c1c" strokeWidth="10" strokeLinecap="round" />
            <circle cx="90" cy="70" r="18" fill="#ef4444" className="animate-ping" />
          </svg>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 25. BOSS ULTIMATE: Blood Moon Eclipse Cataclysm */}
      {/* ========================================================================= */}
      {activeVFX === 'boss_ultimate' && (
        <div className="absolute inset-0 bg-red-950/60 flex items-center justify-center animate-vfx-bloodlustpulse">
          <div className="w-48 sm:w-64 h-48 sm:h-64 rounded-full border-4 border-rose-500 shadow-[0_0_80px_#f43f5e] bg-red-900/40 animate-ping" />
        </div>
      )}

      {/* ========================================================================= */}
      {/* 26. MONSTER EVADE: Phantom Afterimage Displacement */}
      {/* ========================================================================= */}
      {activeVFX === 'monster_evade' && (
        <div className="absolute left-[14%] sm:left-[22%] top-1/2 -translate-y-1/2 w-40 sm:w-52 h-32 sm:h-40 animate-pulse">
          <div className="w-full h-full rounded-full border border-dashed border-cyan-400 blur-xs bg-cyan-950/30" />
        </div>
      )}
    </div>
  );
};
