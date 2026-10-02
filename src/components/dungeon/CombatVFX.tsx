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
    <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden flex items-center justify-center">
      {/* 1. BASIC SLASH (skill-slash) - High-Speed Twin Plasma Scythe Slash */}
      {activeVFX === 'basic_slash' && (
        <div className="relative w-full h-full flex items-center justify-center animate-vfx-razorslash">
          <svg className="w-full h-full max-w-[280px] max-h-[160px] filter drop-shadow-[0_0_25px_#00f0ff]" viewBox="0 0 200 120">
            {/* Razor 1 */}
            <path
              d="M 10 110 Q 90 60 190 10"
              fill="none"
              stroke="#ffffff"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M 20 115 Q 95 65 190 20"
              fill="none"
              stroke="#00e5ff"
              strokeWidth="12"
              opacity="0.85"
              strokeLinecap="round"
            />
            {/* Cross Razor 2 */}
            <path
              d="M 190 110 Q 105 60 10 10"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="8"
              opacity="0.9"
              strokeLinecap="round"
            />
            {/* Center impact spark */}
            <circle cx="100" cy="60" r="14" fill="#ffffff" className="animate-ping" />
          </svg>
        </div>
      )}

      {/* 2. DAGGER THROW (skill-dagger-throw) - 5 Converging Piercing Cyan Laser Blades */}
      {activeVFX === 'dagger_throw' && (
        <div className="relative w-full h-full flex items-center justify-center animate-vfx-daggerburst">
          <svg className="w-full h-full max-w-[280px] max-h-[160px] filter drop-shadow-[0_0_20px_#38bdf8]" viewBox="0 0 200 120">
            {/* Lock Reticle */}
            <circle cx="100" cy="60" r="28" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 3" />
            <circle cx="100" cy="60" r="6" fill="#00e5ff" className="animate-ping" />
            {/* Converging Daggers */}
            {[
              { x1: 20, y1: 15, x2: 90, y2: 55 },
              { x1: 180, y1: 15, x2: 110, y2: 55 },
              { x1: 15, y1: 60, x2: 85, y2: 60 },
              { x1: 185, y1: 60, x2: 115, y2: 60 },
              { x1: 100, y1: 115, x2: 100, y2: 70 },
            ].map((d, i) => (
              <g key={i}>
                <line x1={d.x1} y1={d.y1} x2={d.x2} y2={d.y2} stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
                <line x1={d.x1} y1={d.y1} x2={d.x2} y2={d.y2} stroke="#38bdf8" strokeWidth="7" opacity="0.75" strokeLinecap="round" />
              </g>
            ))}
          </svg>
        </div>
      )}

      {/* 3. VITAL STRIKE (skill-vital-strike) - High-Tech Red Sniper Reticle & Critical Heart Pierce */}
      {activeVFX === 'vital_strike' && (
        <div className="relative w-full h-full flex items-center justify-center animate-vfx-vitalcrosshair">
          <svg className="w-full h-full max-w-[280px] max-h-[160px] filter drop-shadow-[0_0_30px_#ef4444]" viewBox="0 0 200 120">
            {/* Concentric red sniper rings */}
            <circle cx="100" cy="60" r="45" fill="none" stroke="#ef4444" strokeWidth="2.5" />
            <circle cx="100" cy="60" r="25" fill="none" stroke="#f87171" strokeWidth="1.5" strokeDasharray="4 2" />
            <circle cx="100" cy="60" r="8" fill="#dc2626" className="animate-ping" />
            {/* Sniper cross lines */}
            <line x1="20" y1="60" x2="180" y2="60" stroke="#ef4444" strokeWidth="2" />
            <line x1="100" y1="5" x2="100" y2="115" stroke="#ef4444" strokeWidth="2" />
            {/* Central laser perforation */}
            <line x1="0" y1="60" x2="200" y2="60" stroke="#ffffff" strokeWidth="4" />
          </svg>
        </div>
      )}

      {/* 4. VENOM STRIKE (skill-venom) - Toxic Emerald Viper Venom Acid Jaws */}
      {activeVFX === 'venom_strike' && (
        <div className="relative w-full h-full flex items-center justify-center animate-vfx-venomsnap">
          <svg className="w-full h-full max-w-[280px] max-h-[160px] filter drop-shadow-[0_0_30px_#22c55e]" viewBox="0 0 200 120">
            {/* Toxic biohazard arcs */}
            <path d="M 30 35 Q 100 5 170 35" fill="none" stroke="#86efac" strokeWidth="6" strokeLinecap="round" />
            <path d="M 30 85 Q 100 115 170 85" fill="none" stroke="#86efac" strokeWidth="6" strokeLinecap="round" />
            {/* Acid Fangs */}
            <polygon points="65,35 80,35 72,75" fill="#ffffff" stroke="#22c55e" strokeWidth="2" />
            <polygon points="120,35 135,35 128,75" fill="#ffffff" stroke="#22c55e" strokeWidth="2" />
            {/* Dissolving venom bubbles */}
            <circle cx="72" cy="78" r="5" fill="#4ade80" className="animate-ping" />
            <circle cx="128" cy="78" r="5" fill="#4ade80" className="animate-ping" />
            <circle cx="100" cy="60" r="16" fill="#15803d" opacity="0.75" className="animate-pulse" />
          </svg>
        </div>
      )}

      {/* 5. RASAKA FLURRY (skill-rasaka-fang) - Blood Poison 8-Blade Storm Cyclone */}
      {activeVFX === 'rasaka_flurry' && (
        <div className="relative w-full h-full flex items-center justify-center animate-vfx-rasakawhirl">
          <svg className="w-full h-full max-w-[280px] max-h-[160px] filter drop-shadow-[0_0_30px_#c084fc]" viewBox="0 0 200 120">
            <circle cx="100" cy="60" r="50" fill="none" stroke="#a855f7" strokeWidth="3" strokeDasharray="8 4" />
            {[0, 60, 120, 180, 240, 300].map((deg, i) => (
              <path
                key={i}
                d="M 100 15 Q 130 40 100 60"
                fill="none"
                stroke={i % 2 === 0 ? '#10b981' : '#c084fc'}
                strokeWidth="4"
                strokeLinecap="round"
                transform={`rotate(${deg} 100 60)`}
              />
            ))}
            <circle cx="100" cy="60" r="18" fill="#7e22ce" opacity="0.8" className="animate-ping" />
          </svg>
        </div>
      )}

      {/* 6. MUTILATE X (skill-mutilate) - Heavy Armor-Cracking Blood Red X Cleave */}
      {activeVFX === 'mutilate_x' && (
        <div className="relative w-full h-full flex items-center justify-center animate-vfx-mutilatecrash">
          <svg className="w-full h-full max-w-[280px] max-h-[160px] filter drop-shadow-[0_0_40px_#f43f5e]" viewBox="0 0 200 120">
            {/* Giant X-Cut */}
            <line x1="20" y1="15" x2="180" y2="105" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
            <line x1="20" y1="15" x2="180" y2="105" stroke="#f43f5e" strokeWidth="14" opacity="0.9" strokeLinecap="round" />
            <line x1="180" y1="15" x2="20" y2="105" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
            <line x1="180" y1="15" x2="20" y2="105" stroke="#dc2626" strokeWidth="14" opacity="0.9" strokeLinecap="round" />
            {/* Core Impact */}
            <circle cx="100" cy="60" r="20" fill="#ffffff" className="animate-ping" />
          </svg>
        </div>
      )}

      {/* 7. KAMISH WRATH (skill-kamish-wrath) - Colossal Magma Dragon Head Inferno */}
      {activeVFX === 'kamish_wrath' && (
        <div className="relative w-full h-full flex items-center justify-center animate-vfx-kamishvolcano">
          <svg className="w-full h-full max-w-[280px] max-h-[160px] filter drop-shadow-[0_0_45px_#f59e0b]" viewBox="0 0 200 120">
            {/* Dragon Maw Silhouette */}
            <path
              d="M 40 100 Q 50 40 100 25 Q 150 40 160 100 Q 130 115 100 95 Q 70 115 40 100 Z"
              fill="#7c2d12"
              stroke="#f59e0b"
              strokeWidth="4"
            />
            {/* Glowing Golden Eyes */}
            <ellipse cx="80" cy="55" rx="7" ry="3.5" fill="#fef08a" transform="rotate(-15 80 55)" />
            <ellipse cx="120" cy="55" rx="7" ry="3.5" fill="#fef08a" transform="rotate(15 120 55)" />
            {/* Magma burst */}
            <circle cx="100" cy="60" r="24" fill="#fbbf24" opacity="0.8" className="animate-ping" />
          </svg>
        </div>
      )}

      {/* 8. SHADOW STEP (skill-shadow-step) - Tri-Phase Dimensional Shadow Mirage Dash */}
      {activeVFX === 'shadow_step' && (
        <div className="relative w-full h-full flex items-center justify-center animate-vfx-shadowmirage">
          <svg className="w-full h-full max-w-[280px] max-h-[160px] filter drop-shadow-[0_0_30px_#6366f1]" viewBox="0 0 200 120">
            {[-35, 0, 35].map((offset, i) => (
              <g key={i} transform={`translate(${offset}, 0)`} opacity={0.4 + i * 0.3}>
                <ellipse cx="100" cy="95" rx="20" ry="6" fill="#1e1b4b" />
                <path d="M 90 95 L 96 35 L 104 35 L 110 95 Z" fill="#312e81" stroke="#6366f1" strokeWidth="1.5" />
                <circle cx="100" cy="28" r="9" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
              </g>
            ))}
            {/* Kinetic trail */}
            <line x1="20" y1="60" x2="180" y2="60" stroke="#00f0ff" strokeWidth="3" strokeDasharray="12 6" />
          </svg>
        </div>
      )}

      {/* 9. STEALTH (skill-stealth) - Hexagonal Camouflage Matrix & Cyan Piercing Eyes */}
      {activeVFX === 'stealth_invisible' && (
        <div className="relative w-full h-full flex items-center justify-center animate-vfx-stealthhex">
          <svg className="w-full h-full max-w-[280px] max-h-[160px] filter drop-shadow-[0_0_30px_#00e5ff]" viewBox="0 0 200 120">
            {/* Hex Grid */}
            {[
              { x: 100, y: 30 },
              { x: 65, y: 50 },
              { x: 135, y: 50 },
              { x: 100, y: 70 },
              { x: 65, y: 90 },
              { x: 135, y: 90 },
            ].map((hex, i) => (
              <polygon
                key={i}
                points={`${hex.x},${hex.y - 14} ${hex.x + 12},${hex.y - 7} ${hex.x + 12},${hex.y + 7} ${hex.x},${hex.y + 14} ${hex.x - 12},${hex.y + 7} ${hex.x - 12},${hex.y - 7}`}
                fill="none"
                stroke="#00e5ff"
                strokeWidth="1.5"
                opacity={0.5 + (i % 3) * 0.2}
              />
            ))}
            {/* Glowing Cyan Monarch Eyes */}
            <ellipse cx="85" cy="60" rx="9" ry="3.5" fill="#00f0ff" className="animate-pulse" />
            <ellipse cx="115" cy="60" rx="9" ry="3.5" fill="#00f0ff" className="animate-pulse" />
          </svg>
        </div>
      )}

      {/* 10. BLOODLUST (skill-bloodlust) - Demonic Red Eye Gaze & Fear Shockwave */}
      {activeVFX === 'bloodlust_aura' && (
        <div className="relative w-full h-full flex items-center justify-center animate-vfx-bloodlustpulse">
          <svg className="w-full h-full max-w-[280px] max-h-[160px] filter drop-shadow-[0_0_35px_#ef4444]" viewBox="0 0 200 120">
            {/* Shockwave Rings */}
            <circle cx="100" cy="60" r="55" fill="none" stroke="#ef4444" strokeWidth="2" opacity="0.6" className="animate-ping" />
            {/* Demonic Eye */}
            <path d="M 40 60 Q 100 20 160 60 Q 100 100 40 60 Z" fill="#450a0a" stroke="#ef4444" strokeWidth="3" />
            <circle cx="100" cy="60" r="18" fill="#ef4444" />
            <ellipse cx="100" cy="60" rx="4" ry="16" fill="#000000" />
          </svg>
        </div>
      )}

      {/* 11. QUICKSILVER (skill-quicksilver) - Golden Clockwork Time-Dilation Dial */}
      {activeVFX === 'quicksilver' && (
        <div className="relative w-full h-full flex items-center justify-center animate-vfx-quicksilverclock">
          <svg className="w-full h-full max-w-[280px] max-h-[160px] filter drop-shadow-[0_0_30px_#eab308]" viewBox="0 0 200 120">
            <circle cx="100" cy="60" r="48" fill="none" stroke="#eab308" strokeWidth="3" />
            <circle cx="100" cy="60" r="40" fill="none" stroke="#fef08a" strokeWidth="1.5" strokeDasharray="6 3" />
            {/* Clock hands */}
            <line x1="100" y1="60" x2="100" y2="25" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="100" y1="60" x2="130" y2="60" stroke="#facc15" strokeWidth="3" strokeLinecap="round" />
            <circle cx="100" cy="60" r="5" fill="#eab308" />
          </svg>
        </div>
      )}

      {/* 12. RULER'S AUTHORITY (skill-authority) - Divine Cosmic Telekinetic Starlight Hand */}
      {activeVFX === 'ruler_authority' && (
        <div className="relative w-full h-full flex items-center justify-center animate-vfx-authorityslam">
          <svg className="w-full h-full max-w-[280px] max-h-[160px] filter drop-shadow-[0_0_40px_#00e5ff]" viewBox="0 0 200 120">
            {/* Gravity Rings */}
            <circle cx="100" cy="70" r="50" fill="none" stroke="#00e5ff" strokeWidth="2" opacity="0.7" className="animate-ping" />
            {/* Ethereal Hand Palm */}
            <rect x="65" y="55" width="70" height="40" rx="10" fill="#0284c7" stroke="#00e5ff" strokeWidth="2.5" opacity="0.85" />
            <path d="M 70 55 L 70 15 Q 77 5 84 15 L 84 55" stroke="#ffffff" strokeWidth="4" fill="#0369a1" />
            <path d="M 87 55 L 87 5 Q 95 -3 103 5 L 103 55" stroke="#ffffff" strokeWidth="4" fill="#0369a1" />
            <path d="M 106 55 L 106 12 Q 113 4 120 12 L 120 55" stroke="#ffffff" strokeWidth="4" fill="#0369a1" />
            <path d="M 123 55 L 123 25 Q 129 18 135 25 L 135 55" stroke="#ffffff" strokeWidth="4" fill="#0369a1" />
            <circle cx="100" cy="75" r="8" fill="#ffffff" className="animate-pulse" />
          </svg>
        </div>
      )}

      {/* 13. SPATIAL COLLAPSE (skill-spatial-collapse) - Gravitational Singularity Black Hole */}
      {activeVFX === 'spatial_collapse' && (
        <div className="relative w-full h-full flex items-center justify-center animate-vfx-blackhole">
          <svg className="w-full h-full max-w-[280px] max-h-[160px] filter drop-shadow-[0_0_35px_#7e22ce]" viewBox="0 0 200 120">
            <circle cx="100" cy="60" r="50" fill="none" stroke="#7e22ce" strokeWidth="4" strokeDasharray="10 5" />
            <circle cx="100" cy="60" r="35" fill="none" stroke="#00e5ff" strokeWidth="2" strokeDasharray="6 3" />
            {/* Event Horizon Void */}
            <circle cx="100" cy="60" r="22" fill="#000000" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="100" cy="60" r="8" fill="#c084fc" className="animate-ping" />
          </svg>
        </div>
      )}

      {/* 14. SHADOW EXCHANGE (skill-shadow-exchange) - Dual Swirling Void Gateways */}
      {activeVFX === 'shadow_exchange' && (
        <div className="relative w-full h-full flex items-center justify-center animate-vfx-shadowportal">
          <svg className="w-full h-full max-w-[280px] max-h-[160px] filter drop-shadow-[0_0_30px_#a855f7]" viewBox="0 0 200 120">
            <ellipse cx="65" cy="60" rx="24" ry="42" fill="#1e1b4b" stroke="#a855f7" strokeWidth="3" />
            <ellipse cx="135" cy="60" rx="24" ry="42" fill="#1e1b4b" stroke="#00f0ff" strokeWidth="3" />
            <line x1="65" y1="60" x2="135" y2="60" stroke="#c084fc" strokeWidth="2" strokeDasharray="4 2" />
          </svg>
        </div>
      )}

      {/* 15. ARISE (skill-arise) - THE MONARCH AWAKENING: Giant Violet Shadow Eruption */}
      {activeVFX === 'arise' && (
        <div className="relative w-full h-full flex items-center justify-center animate-vfx-ariseburst">
          <svg className="w-full h-full max-w-[300px] max-h-[180px] filter drop-shadow-[0_0_50px_#a855f7]" viewBox="0 0 200 120">
            {/* Ground Shadow Ocean */}
            <ellipse cx="100" cy="95" rx="80" ry="20" fill="#2e1065" stroke="#a855f7" strokeWidth="3" opacity="0.8" />
            {/* Monarch Crown Glyph */}
            <polygon points="70,55 80,30 100,45 120,30 130,55 100,65" fill="#a855f7" stroke="#ffffff" strokeWidth="2" />
            {/* Erupting Shadow Pillars */}
            <path d="M 60 95 Q 75 40 85 10" fill="none" stroke="#c084fc" strokeWidth="5" strokeLinecap="round" />
            <path d="M 140 95 Q 125 40 115 10" fill="none" stroke="#c084fc" strokeWidth="5" strokeLinecap="round" />
            <circle cx="100" cy="45" r="16" fill="#00e5ff" opacity="0.6" className="animate-ping" />
          </svg>
        </div>
      )}

      {/* 16. SHADOW EXTRACTION (skill-shadow-extraction) - Siphoning Glowing Teal Soul Flames */}
      {activeVFX === 'shadow_extraction' && (
        <div className="relative w-full h-full flex items-center justify-center animate-vfx-soulextraction">
          <svg className="w-full h-full max-w-[280px] max-h-[160px] filter drop-shadow-[0_0_35px_#34d399]" viewBox="0 0 200 120">
            <path d="M 85 105 Q 70 65 95 25" fill="none" stroke="#34d399" strokeWidth="4" strokeLinecap="round" />
            <path d="M 115 105 Q 130 65 105 25" fill="none" stroke="#6ee7b7" strokeWidth="4" strokeLinecap="round" />
            <circle cx="100" cy="25" r="12" fill="#34d399" className="animate-ping" />
            <circle cx="100" cy="25" r="5" fill="#ffffff" />
          </svg>
        </div>
      )}

      {/* 17. MONARCH DOMAIN (skill-monarch-domain) - Obsidian Shadow Floor Rune Matrix */}
      {activeVFX === 'monarch_domain' && (
        <div className="relative w-full h-full flex items-center justify-center animate-vfx-monarchdomain">
          <svg className="w-full h-full max-w-[300px] max-h-[160px] filter drop-shadow-[0_0_40px_#9333ea]" viewBox="0 0 200 120">
            <ellipse cx="100" cy="65" rx="85" ry="35" fill="#180828" stroke="#a855f7" strokeWidth="3" opacity="0.9" />
            <ellipse cx="100" cy="65" rx="55" ry="22" fill="none" stroke="#c084fc" strokeWidth="2" strokeDasharray="8 4" />
            <circle cx="100" cy="65" r="14" fill="#a855f7" opacity="0.6" className="animate-pulse" />
          </svg>
        </div>
      )}

      {/* 18. SHADOW ARMOR (skill-shadow-armor) - Hexagonal Obsidian Aegis Shield */}
      {activeVFX === 'shadow_armor' && (
        <div className="relative w-full h-full flex items-center justify-center animate-vfx-shadowarmor">
          <svg className="w-full h-full max-w-[280px] max-h-[160px] filter drop-shadow-[0_0_35px_#a855f7]" viewBox="0 0 200 120">
            <polygon
              points="100,10 150,35 150,90 100,115 50,90 50,35"
              fill="#1e1b4b"
              stroke="#a855f7"
              strokeWidth="3.5"
              opacity="0.85"
            />
            <polygon
              points="100,25 135,45 135,80 100,100 65,80 65,45"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2"
              strokeDasharray="6 3"
            />
            <circle cx="100" cy="62" r="10" fill="#ffffff" className="animate-ping" />
          </svg>
        </div>
      )}

      {/* 19. DRAGON FEAR (skill-dragon-fear) - Golden Dragon Roar Shockwaves */}
      {activeVFX === 'dragon_fear' && (
        <div className="relative w-full h-full flex items-center justify-center animate-vfx-dragonroar">
          <svg className="w-full h-full max-w-[280px] max-h-[160px] filter drop-shadow-[0_0_40px_#f59e0b]" viewBox="0 0 200 120">
            <circle cx="100" cy="60" r="50" fill="none" stroke="#f59e0b" strokeWidth="3" opacity="0.7" className="animate-ping" />
            <circle cx="100" cy="60" r="35" fill="none" stroke="#fbbf24" strokeWidth="3" />
            <circle cx="100" cy="60" r="20" fill="#ffffff" opacity="0.8" />
          </svg>
        </div>
      )}

      {/* 20. DRAGON BREATH (skill-dragon-breath) - Cosmic Plasma Firestorm Beam */}
      {activeVFX === 'dragon_breath' && (
        <div className="relative w-full h-full flex items-center justify-center animate-vfx-dragonbeam">
          <svg className="w-full h-full max-w-[320px] max-h-[140px] filter drop-shadow-[0_0_45px_#ef4444]" viewBox="0 0 300 100">
            <path d="M 0 50 Q 150 15 300 50 Q 150 85 0 50 Z" fill="#b91c1c" opacity="0.85" />
            <path d="M 0 50 Q 150 25 300 50 Q 150 75 0 50 Z" fill="#f97316" opacity="0.9" />
            <line x1="0" y1="50" x2="300" y2="50" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" />
          </svg>
        </div>
      )}

      {/* 21. DEMON LIGHTNING (skill-demon-lightning) - Baran Branched Heavenly Lightning */}
      {activeVFX === 'demon_lightning' && (
        <div className="relative w-full h-full flex items-center justify-center animate-vfx-demonthunder">
          <svg className="w-full h-full max-w-[280px] max-h-[160px] filter drop-shadow-[0_0_40px_#38bdf8]" viewBox="0 0 200 120">
            <polyline
              points="100,0 85,35 115,50 80,85 110,95 70,120"
              fill="none"
              stroke="#0284c7"
              strokeWidth="10"
              opacity="0.8"
            />
            <polyline
              points="100,0 85,35 115,50 80,85 110,95 70,120"
              fill="none"
              stroke="#ffffff"
              strokeWidth="4"
            />
            <circle cx="70" cy="120" r="14" fill="#38bdf8" className="animate-ping" />
          </svg>
        </div>
      )}

      {/* 22. VOID CLEAVE (skill-void-cleave) - Reality Fracture Dimensional Tear */}
      {activeVFX === 'void_cleave' && (
        <div className="relative w-full h-full flex items-center justify-center animate-vfx-voidrift">
          <svg className="w-full h-full max-w-[280px] max-h-[160px] filter drop-shadow-[0_0_40px_#ec4899]" viewBox="0 0 200 120">
            <polygon
              points="15,105 75,70 65,60 125,35 115,25 185,10 165,30 175,40 115,70 125,80"
              fill="#581c87"
              stroke="#ec4899"
              strokeWidth="2.5"
            />
            <circle cx="100" cy="60" r="10" fill="#ffffff" className="animate-ping" />
          </svg>
        </div>
      )}

      {/* BOSS & ENEMY COMBAT ACTIONS */}
      {activeVFX === 'boss_claw' && (
        <div className="relative w-full h-full flex items-center justify-center animate-vfx-mutilatecrash">
          <svg className="w-full h-full max-w-[260px] max-h-[140px] filter drop-shadow-[0_0_35px_#ef4444]" viewBox="0 0 200 120">
            <path d="M 40 25 Q 60 60 80 100" fill="none" stroke="#ef4444" strokeWidth="6" strokeLinecap="round" />
            <path d="M 80 15 Q 100 60 120 105" fill="none" stroke="#dc2626" strokeWidth="8" strokeLinecap="round" />
            <path d="M 120 25 Q 140 60 160 100" fill="none" stroke="#b91c1c" strokeWidth="6" strokeLinecap="round" />
          </svg>
        </div>
      )}

      {activeVFX === 'boss_combo' && (
        <div className="relative w-full h-full flex items-center justify-center animate-vfx-rasakawhirl">
          <svg className="w-full h-full max-w-[260px] max-h-[140px] filter drop-shadow-[0_0_35px_#f97316]" viewBox="0 0 200 120">
            <circle cx="100" cy="60" r="45" fill="none" stroke="#ef4444" strokeWidth="3" strokeDasharray="8 4" />
            <line x1="20" y1="15" x2="180" y2="105" stroke="#f97316" strokeWidth="6" strokeLinecap="round" />
            <line x1="180" y1="15" x2="20" y2="105" stroke="#ef4444" strokeWidth="6" strokeLinecap="round" />
          </svg>
        </div>
      )}

      {activeVFX === 'boss_ultimate' && (
        <div className="absolute inset-0 bg-red-950/80 backdrop-blur-xs flex items-center justify-center animate-pulse z-40">
          <svg className="w-full h-full max-w-[280px] max-h-[160px] filter drop-shadow-[0_0_50px_#ef4444]" viewBox="0 0 200 120">
            <circle cx="100" cy="60" r="50" fill="#dc2626" opacity="0.4" className="animate-ping" />
            <circle cx="100" cy="60" r="25" fill="#ffffff" />
          </svg>
        </div>
      )}

      {activeVFX === 'monster_evade' && (
        <div className="relative w-full h-full flex items-center justify-center animate-vfx-shadowmirage">
          <svg className="w-full h-full max-w-[240px] max-h-[120px] filter drop-shadow-[0_0_20px_#a855f7]" viewBox="0 0 200 120">
            <circle cx="100" cy="60" r="40" fill="#581c87" opacity="0.3" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 2" />
          </svg>
        </div>
      )}
    </div>
  );
};
