import React from 'react';
import { CrownMonarchIcon } from '../icons/SystemIcons';

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
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden flex items-center justify-center">
      {/* 1. BASIC SLASH (skill-slash) - Twin High-Velocity Cyan Sonic Razor Arc */}
      {activeVFX === 'basic_slash' && (
        <div className="relative w-full h-full flex items-center justify-center animate-vfx-razorslash">
          <svg className="w-80 h-80 sm:w-[440px] sm:h-[440px] filter drop-shadow-[0_0_35px_#00f0ff]" viewBox="0 0 200 200">
            <path
              d="M 15 180 Q 95 95 185 20"
              fill="none"
              stroke="#ffffff"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <path
              d="M 25 185 Q 100 100 190 30"
              fill="none"
              stroke="#00e5ff"
              strokeWidth="14"
              opacity="0.8"
              strokeLinecap="round"
            />
            <path
              d="M 180 180 Q 105 105 20 25"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="10"
              opacity="0.8"
              strokeLinecap="round"
            />
            {/* Speed spark particles */}
            <circle cx="100" cy="100" r="18" fill="#ffffff" className="animate-ping" />
            <circle cx="60" cy="140" r="4" fill="#00f0ff" />
            <circle cx="140" cy="60" r="5" fill="#ffffff" />
            <circle cx="130" cy="130" r="4" fill="#38bdf8" />
          </svg>
          <div className="absolute text-center mt-36">
            <span className="font-black font-chakra text-2xl sm:text-4xl text-cyan-200 tracking-widest uppercase block drop-shadow-[0_0_20px_#00e5ff]">
              CHÉM CHỚP NHOÁNG!
            </span>
            <span className="text-[10px] sm:text-xs font-mono text-cyan-300 bg-slate-950/90 px-3 py-0.5 border border-cyan-400 rounded-xs inline-block mt-1">
              [SONIC RAZOR SLASH · TỐC ĐỘ CỰC HẠN]
            </span>
          </div>
        </div>
      )}

      {/* 2. DAGGER THROW (skill-dagger-throw) - 5 Homing Spectral Flying Daggers */}
      {activeVFX === 'dagger_throw' && (
        <div className="relative w-full h-full flex items-center justify-center animate-vfx-daggerburst">
          <svg className="w-80 h-80 sm:w-[420px] sm:h-[420px] filter drop-shadow-[0_0_30px_#38bdf8]" viewBox="0 0 200 200">
            {/* Target reticle */}
            <circle cx="100" cy="100" r="45" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 4" className="animate-spin" />
            <circle cx="100" cy="100" r="8" fill="#38bdf8" className="animate-ping" />
            {/* 5 daggers converging */}
            {[
              { x: 30, y: 35, rot: 45 },
              { x: 170, y: 35, rot: -45 },
              { x: 20, y: 120, rot: 75 },
              { x: 180, y: 120, rot: -75 },
              { x: 100, y: 180, rot: 180 },
            ].map((d, i) => (
              <g key={i} transform={`translate(${d.x}, ${d.y}) rotate(${d.rot})`}>
                <polygon points="0,-25 6,10 0,6 -6,10" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" />
                <line x1="0" y1="10" x2="0" y2="40" stroke="#38bdf8" strokeWidth="3" opacity="0.6" strokeDasharray="4 2" />
              </g>
            ))}
          </svg>
          <div className="absolute text-center mt-36">
            <span className="font-black font-chakra text-2xl sm:text-4xl text-sky-300 tracking-widest uppercase block drop-shadow-[0_0_20px_#38bdf8]">
              PHI ĐAO ĐOẠT MỆNH!
            </span>
            <span className="text-[10px] sm:text-xs font-mono text-sky-100 bg-slate-950/90 px-3 py-0.5 border border-sky-400 rounded-xs inline-block mt-1">
              [5 PHI ĐAO ĐỒNG LOẠT KHÓA MỤC TIÊU]
            </span>
          </div>
        </div>
      )}

      {/* 3. VITAL STRIKE (skill-vital-strike) - Tactical Ocular Reticle & Crimson Laser Needle */}
      {activeVFX === 'vital_strike' && (
        <div className="relative w-full h-full flex items-center justify-center animate-vfx-vitalcrosshair">
          <svg className="w-84 h-84 sm:w-[460px] sm:h-[460px] filter drop-shadow-[0_0_40px_#ef4444]" viewBox="0 0 200 200">
            {/* Sniper concentric circles */}
            <circle cx="100" cy="100" r="75" fill="none" stroke="#ef4444" strokeWidth="2.5" />
            <circle cx="100" cy="100" r="45" fill="none" stroke="#f87171" strokeWidth="1.5" strokeDasharray="6 3" />
            <circle cx="100" cy="100" r="20" fill="none" stroke="#ffffff" strokeWidth="2" />
            {/* Crosshair lines */}
            <line x1="15" y1="100" x2="80" y2="100" stroke="#ef4444" strokeWidth="2" />
            <line x1="120" y1="100" x2="185" y2="100" stroke="#ef4444" strokeWidth="2" />
            <line x1="100" y1="15" x2="100" y2="80" stroke="#ef4444" strokeWidth="2" />
            <line x1="100" y1="120" x2="100" y2="185" stroke="#ef4444" strokeWidth="2" />
            {/* Center crimson core */}
            <circle cx="100" cy="100" r="10" fill="#dc2626" className="animate-ping" />
            <circle cx="100" cy="100" r="4" fill="#ffffff" />
            {/* Target locked corner ticks */}
            <path d="M 40 50 L 30 50 L 30 60" fill="none" stroke="#ef4444" strokeWidth="3" />
            <path d="M 160 50 L 170 50 L 170 60" fill="none" stroke="#ef4444" strokeWidth="3" />
            <path d="M 40 150 L 30 150 L 30 140" fill="none" stroke="#ef4444" strokeWidth="3" />
            <path d="M 160 150 L 170 150 L 170 140" fill="none" stroke="#ef4444" strokeWidth="3" />
          </svg>
          <div className="absolute text-center mt-36">
            <span className="font-black font-chakra text-2xl sm:text-4xl text-red-500 tracking-widest uppercase block drop-shadow-[0_0_20px_#ef4444]">
              NHÁT ĐÂM CHÍ MẠNG!
            </span>
            <span className="text-[10px] sm:text-xs font-mono text-red-200 bg-red-950/90 px-3 py-0.5 border border-red-500 rounded-xs inline-block mt-1">
              [TARGET LOCKED: KHÓA TỬ HUYỆT · BẠO KÍCH CỰC ĐẠI]
            </span>
          </div>
        </div>
      )}

      {/* 4. VENOM STRIKE (skill-venom) - Toxic Emerald Viper Acid Jaws */}
      {activeVFX === 'venom_strike' && (
        <div className="relative w-full h-full flex items-center justify-center animate-vfx-venomsnap">
          <svg className="w-80 h-80 sm:w-[440px] sm:h-[440px] filter drop-shadow-[0_0_40px_#22c55e]" viewBox="0 0 200 200">
            {/* Acid biohazard circle */}
            <circle cx="100" cy="100" r="75" fill="none" stroke="#22c55e" strokeWidth="3" strokeDasharray="12 6" className="animate-spin" />
            {/* Giant viper jaws */}
            <path d="M 40 60 Q 100 25 160 60" fill="none" stroke="#86efac" strokeWidth="8" strokeLinecap="round" />
            <path d="M 40 140 Q 100 175 160 140" fill="none" stroke="#86efac" strokeWidth="8" strokeLinecap="round" />
            {/* Fangs */}
            <polygon points="65,60 80,60 72,110" fill="#ffffff" stroke="#22c55e" strokeWidth="2" />
            <polygon points="120,60 135,60 128,110" fill="#ffffff" stroke="#22c55e" strokeWidth="2" />
            <polygon points="72,140 85,140 78,95" fill="#ffffff" stroke="#22c55e" strokeWidth="2" />
            <polygon points="115,140 128,140 122,95" fill="#ffffff" stroke="#22c55e" strokeWidth="2" />
            {/* Dripping acid bubbles */}
            <circle cx="72" cy="120" r="6" fill="#4ade80" className="animate-bounce" />
            <circle cx="128" cy="120" r="5" fill="#4ade80" className="animate-bounce" />
            <circle cx="100" cy="100" r="14" fill="#15803d" opacity="0.8" className="animate-ping" />
          </svg>
          <div className="absolute text-center mt-36">
            <span className="font-black font-chakra text-2xl sm:text-4xl text-emerald-400 tracking-widest uppercase block drop-shadow-[0_0_20px_#22c55e]">
              ĐÒN ĐỘC TÊ LIỆT!
            </span>
            <span className="text-[10px] sm:text-xs font-mono text-emerald-200 bg-slate-950/90 px-3 py-0.5 border border-emerald-400 rounded-xs inline-block mt-1">
              [NANH ĐỘC HUYẾT XÀ · GÂY TÊ LIỆT KẺ ĐỊCH]
            </span>
          </div>
        </div>
      )}

      {/* 5. RASAKA FLURRY (skill-rasaka-fang) - Blood Poison 8-Blade Storm Vortex */}
      {activeVFX === 'rasaka_flurry' && (
        <div className="relative w-full h-full flex items-center justify-center animate-vfx-rasakawhirl">
          <svg className="w-88 h-88 sm:w-[460px] sm:h-[460px] filter drop-shadow-[0_0_40px_#c084fc]" viewBox="0 0 200 200">
            {/* Spinning blade arcs */}
            <circle cx="100" cy="100" r="80" fill="none" stroke="#a855f7" strokeWidth="3" strokeDasharray="8 6" className="animate-spin" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <g key={i} transform={`rotate(${angle} 100 100)`}>
                <path d="M 100 20 Q 140 50 100 100" fill="none" stroke={i % 2 === 0 ? '#10b981' : '#c084fc'} strokeWidth="5" strokeLinecap="round" />
                <circle cx="100" cy="20" r="4" fill="#ffffff" />
              </g>
            ))}
            <circle cx="100" cy="100" r="24" fill="#7e22ce" opacity="0.6" className="animate-ping" />
          </svg>
          <div className="absolute text-center mt-36">
            <span className="font-black font-chakra text-2xl sm:text-4xl text-purple-300 tracking-widest uppercase block drop-shadow-[0_0_20px_#c084fc]">
              HUYẾT VŨ TRẢM!
            </span>
            <span className="text-[10px] sm:text-xs font-mono text-emerald-300 bg-slate-950/90 px-3 py-0.5 border border-purple-400 rounded-xs inline-block mt-1">
              [VŨ BÃO 8 ĐAO HUYẾT ĐỘC · PHÁ GIÁP DIỆN RỘNG]
            </span>
          </div>
        </div>
      )}

      {/* 6. MUTILATE X (skill-mutilate) - Heavy Armor-Shattering Crimson Cross Cleave */}
      {activeVFX === 'mutilate_x' && (
        <div className="relative w-full h-full flex items-center justify-center animate-vfx-mutilatecrash">
          <svg className="w-88 h-88 sm:w-[480px] sm:h-[480px] filter drop-shadow-[0_0_50px_#f43f5e]" viewBox="0 0 200 200">
            {/* Colossal Red X-Cut */}
            <line x1="20" y1="20" x2="180" y2="180" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
            <line x1="20" y1="20" x2="180" y2="180" stroke="#f43f5e" strokeWidth="18" opacity="0.85" strokeLinecap="round" />
            <line x1="180" y1="20" x2="20" y2="180" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
            <line x1="180" y1="20" x2="20" y2="180" stroke="#dc2626" strokeWidth="18" opacity="0.85" strokeLinecap="round" />
            {/* Shattered armor fragments */}
            <polygon points="50,90 65,80 60,105" fill="#f87171" stroke="#ffffff" strokeWidth="1.5" />
            <polygon points="140,85 155,95 135,105" fill="#f87171" stroke="#ffffff" strokeWidth="1.5" />
            <polygon points="90,45 105,50 95,65" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
            <polygon points="95,145 110,135 105,155" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="100" cy="100" r="28" fill="#ffffff" opacity="0.9" className="animate-ping" />
          </svg>
          <div className="absolute text-center mt-36">
            <span className="font-black font-chakra text-2xl sm:text-4xl text-rose-500 tracking-widest uppercase block drop-shadow-[0_0_20px_#f43f5e]">
              TRẢM KÍCH TÀN BẠO!
            </span>
            <span className="text-[10px] sm:text-xs font-mono text-white bg-red-950/90 px-3 py-0.5 border border-rose-500 rounded-xs inline-block mt-1">
              [VẾT CHÉM CHỮ X TÀN KHỐC · BỔ TOÁC PHÒNG NGỰ]
            </span>
          </div>
        </div>
      )}

      {/* 7. KAMISH WRATH (skill-kamish-wrath) - Colossal Fiery Dragon Skull Magma Eruption */}
      {activeVFX === 'kamish_wrath' && (
        <div className="relative w-full h-full flex items-center justify-center animate-vfx-kamishvolcano">
          <svg className="w-96 h-96 sm:w-[500px] sm:h-[500px] filter drop-shadow-[0_0_60px_#f59e0b]" viewBox="0 0 200 200">
            {/* Fiery magma ring */}
            <circle cx="100" cy="100" r="85" fill="none" stroke="#ea580c" strokeWidth="4" strokeDasharray="10 5" className="animate-spin" />
            {/* Dragon Head Silhouette */}
            <path
              d="M 50 140 Q 60 70 100 45 Q 140 70 150 140 Q 125 155 100 135 Q 75 155 50 140 Z"
              fill="#7c2d12"
              stroke="#f59e0b"
              strokeWidth="5"
            />
            {/* Glowing yellow Dragon Eyes */}
            <ellipse cx="80" cy="85" rx="8" ry="4" fill="#fef08a" transform="rotate(-15 80 85)" className="animate-pulse" />
            <ellipse cx="120" cy="85" rx="8" ry="4" fill="#fef08a" transform="rotate(15 120 85)" className="animate-pulse" />
            {/* Dragon Teeth & Horns */}
            <polygon points="65,55 50,20 75,45" fill="#f59e0b" />
            <polygon points="135,55 150,20 125,45" fill="#f59e0b" />
            <polygon points="85,130 92,110 99,130" fill="#ffffff" />
            <polygon points="101,130 108,110 115,130" fill="#ffffff" />
            {/* Magma burst sparks */}
            <circle cx="100" cy="100" r="30" fill="#fbbf24" opacity="0.6" className="animate-ping" />
          </svg>
          <div className="absolute text-center mt-36">
            <span className="font-black font-chakra text-2xl sm:text-4xl text-amber-300 tracking-widest uppercase block drop-shadow-[0_0_20px_#f59e0b]">
              CƠN THỊNH NỘ KAMISH!
            </span>
            <span className="text-[10px] sm:text-xs font-mono text-yellow-100 bg-amber-950/90 px-3 py-0.5 border border-amber-400 rounded-xs inline-block mt-1">
              [NANH RỒNG HOÀNG ĐẾ · PHÁ HỦY 80% GIÁP TRÙM]
            </span>
          </div>
        </div>
      )}

      {/* 8. SHADOW STEP (skill-shadow-step) - Tri-Phase Dimensional Shadow Mirage Dash */}
      {activeVFX === 'shadow_step' && (
        <div className="relative w-full h-full flex items-center justify-center animate-vfx-shadowmirage">
          <svg className="w-84 h-84 sm:w-[440px] sm:h-[440px] filter drop-shadow-[0_0_40px_#6366f1]" viewBox="0 0 200 200">
            {/* 3 shadow silhouette steps */}
            {[-45, 0, 45].map((offset, i) => (
              <g key={i} transform={`translate(${offset}, 0)`} opacity={0.35 + i * 0.3}>
                <ellipse cx="100" cy="140" rx="30" ry="8" fill="#1e1b4b" opacity="0.8" />
                <path d="M 85 140 L 95 60 L 105 60 L 115 140 Z" fill="#312e81" stroke="#6366f1" strokeWidth="2" />
                <circle cx="100" cy="50" r="14" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                {/* Glowing cyan eyes on lead shadow */}
                {i === 2 && (
                  <>
                    <circle cx="96" cy="48" r="2.5" fill="#00f0ff" className="animate-ping" />
                    <circle cx="104" cy="48" r="2.5" fill="#00f0ff" className="animate-ping" />
                  </>
                )}
              </g>
            ))}
            {/* Horizontal dash trails */}
            <line x1="20" y1="95" x2="180" y2="95" stroke="#818cf8" strokeWidth="3" strokeDasharray="15 8" />
            <line x1="30" y1="110" x2="170" y2="110" stroke="#00f0ff" strokeWidth="2" strokeDasharray="10 5" />
          </svg>
          <div className="absolute text-center mt-36">
            <span className="font-black font-chakra text-2xl sm:text-4xl text-indigo-300 tracking-widest uppercase block drop-shadow-[0_0_20px_#6366f1]">
              BỘ PHÁP BÓNG ĐÊM!
            </span>
            <span className="text-[10px] sm:text-xs font-mono text-cyan-200 bg-slate-950/90 px-3 py-0.5 border border-indigo-400 rounded-xs inline-block mt-1">
              [LƯỚT HƯ KHÔNG · +100% NÉ ĐÒN · HỒI 10% MP]
            </span>
          </div>
        </div>
      )}

      {/* 9. STEALTH (skill-stealth) - Hexagonal Camouflage Matrix & Piercing Monarch Eyes */}
      {activeVFX === 'stealth_invisible' && (
        <div className="relative w-full h-full flex items-center justify-center animate-vfx-stealthhex">
          <svg className="w-92 h-92 sm:w-[480px] sm:h-[480px] filter drop-shadow-[0_0_40px_#00e5ff]" viewBox="0 0 200 200">
            {/* Hexagonal Camouflage Grid */}
            {[
              { x: 100, y: 50 },
              { x: 55, y: 75 },
              { x: 145, y: 75 },
              { x: 100, y: 100 },
              { x: 55, y: 125 },
              { x: 145, y: 125 },
              { x: 100, y: 150 },
            ].map((hex, i) => (
              <polygon
                key={i}
                points={`${hex.x},${hex.y - 22} ${hex.x + 19},${hex.y - 11} ${hex.x + 19},${hex.y + 11} ${hex.x},${hex.y + 22} ${hex.x - 19},${hex.y + 11} ${hex.x - 19},${hex.y - 11}`}
                fill="none"
                stroke="#00e5ff"
                strokeWidth="1.8"
                opacity={0.4 + (i % 3) * 0.25}
              />
            ))}
            {/* Twin Glowing Cyan Monarch Eyes piercing the dark */}
            <g transform="translate(100, 100)">
              <ellipse cx="-24" cy="0" rx="14" ry="5" fill="#00f0ff" className="animate-pulse" />
              <circle cx="-24" cy="0" r="3" fill="#ffffff" />
              <ellipse cx="24" cy="0" rx="14" ry="5" fill="#00f0ff" className="animate-pulse" />
              <circle cx="24" cy="0" r="3" fill="#ffffff" />
            </g>
          </svg>
          <div className="absolute text-center mt-36">
            <span className="font-black font-chakra text-2xl sm:text-4xl text-cyan-200 tracking-widest uppercase block drop-shadow-[0_0_20px_#00e5ff]">
              TÀNG HÌNH ẨN THÂN
            </span>
            <span className="text-[10px] sm:text-xs font-mono text-cyan-300 bg-cyan-950/90 px-3 py-0.5 border border-cyan-400 rounded-xs inline-block mt-1">
              [HÒA VÀO HƯ KHÔNG · NÉ 100% ĐÒN ĐÁNH · +250% BẠO KÍCH]
            </span>
          </div>
        </div>
      )}

      {/* 10. BLOODLUST (skill-bloodlust) - Terrifying Demonic Red Glare & Panic Shockwave */}
      {activeVFX === 'bloodlust_aura' && (
        <div className="relative w-full h-full flex items-center justify-center animate-vfx-bloodlustpulse">
          <svg className="w-92 h-92 sm:w-[480px] sm:h-[480px] filter drop-shadow-[0_0_50px_#ef4444]" viewBox="0 0 200 200">
            {/* Blood shockwaves */}
            <circle cx="100" cy="100" r="85" fill="none" stroke="#ef4444" strokeWidth="3" opacity="0.6" className="animate-ping" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="#dc2626" strokeWidth="2.5" />
            {/* Demonic Ocular Gaze */}
            <path
              d="M 30 100 Q 100 40 170 100 Q 100 160 30 100 Z"
              fill="#450a0a"
              stroke="#ef4444"
              strokeWidth="4"
            />
            {/* Slit Demonic Pupil */}
            <circle cx="100" cy="100" r="28" fill="#ef4444" />
            <ellipse cx="100" cy="100" rx="6" ry="24" fill="#000000" />
            <circle cx="94" cy="92" r="3" fill="#ffffff" />
            {/* Fear runes */}
            <line x1="20" y1="50" x2="40" y2="70" stroke="#f87171" strokeWidth="2" />
            <line x1="180" y1="50" x2="160" y2="70" stroke="#f87171" strokeWidth="2" />
          </svg>
          <div className="absolute text-center mt-36">
            <span className="font-black font-chakra text-2xl sm:text-4xl text-red-500 tracking-widest uppercase block drop-shadow-[0_0_20px_#ef4444]">
              SÁT KHÍ ÁP ĐẢO!
            </span>
            <span className="text-[10px] sm:text-xs font-mono text-red-200 bg-red-950/90 px-3 py-0.5 border border-red-500 rounded-xs inline-block mt-1">
              [UY ÁP KINH HOÀNG · GIẢM 35% CÔNG & PHÒNG QUÁI]
            </span>
          </div>
        </div>
      )}

      {/* 11. QUICKSILVER (skill-quicksilver) - Ancient Golden Chronometer / Time-Dilation Dial */}
      {activeVFX === 'quicksilver' && (
        <div className="relative w-full h-full flex items-center justify-center animate-vfx-quicksilverclock">
          <svg className="w-88 h-88 sm:w-[460px] sm:h-[460px] filter drop-shadow-[0_0_40px_#eab308]" viewBox="0 0 200 200">
            {/* Outer clock ring with ticks */}
            <circle cx="100" cy="100" r="80" fill="none" stroke="#eab308" strokeWidth="4" />
            <circle cx="100" cy="100" r="70" fill="none" stroke="#fef08a" strokeWidth="1.5" strokeDasharray="8 6" className="animate-spin" />
            {/* Roman Hour Ticks */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
              <line
                key={i}
                x1="100"
                y1="25"
                x2="100"
                y2="33"
                stroke="#eab308"
                strokeWidth={i % 3 === 0 ? '3' : '1.5'}
                transform={`rotate(${deg} 100 100)`}
              />
            ))}
            {/* Golden Clock Hands */}
            <line x1="100" y1="100" x2="100" y2="45" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="100" y1="100" x2="140" y2="100" stroke="#facc15" strokeWidth="4" strokeLinecap="round" />
            <circle cx="100" cy="100" r="8" fill="#eab308" />
            <circle cx="100" cy="100" r="4" fill="#ffffff" />
          </svg>
          <div className="absolute text-center mt-36">
            <span className="font-black font-chakra text-2xl sm:text-4xl text-amber-300 tracking-widest uppercase block drop-shadow-[0_0_20px_#eab308]">
              TỐC BỘ THẦN TỐC!
            </span>
            <span className="text-[10px] sm:text-xs font-mono text-yellow-200 bg-slate-950/90 px-3 py-0.5 border border-amber-400 rounded-xs inline-block mt-1">
              [TIME DILATION · GIA TĂNG TỐC ĐỘ 50%]
            </span>
          </div>
        </div>
      )}

      {/* 12. RULER'S AUTHORITY (skill-authority) - Colossal Celestial Telekinetic Starlight Hand */}
      {activeVFX === 'ruler_authority' && (
        <div className="relative w-full h-full flex items-center justify-center animate-vfx-authorityslam">
          <svg className="w-96 h-96 sm:w-[500px] sm:h-[500px] filter drop-shadow-[0_0_60px_#00e5ff]" viewBox="0 0 200 200">
            {/* Gravitational shockwave rings */}
            <circle cx="100" cy="100" r="85" fill="none" stroke="#00e5ff" strokeWidth="3" opacity="0.6" className="animate-ping" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 4" />
            {/* Ethereal Starlight Hand Palm */}
            <path
              d="M 50 120 L 50 45 Q 60 30 70 45 L 70 120"
              stroke="#ffffff"
              strokeWidth="6"
              fill="#0369a1"
              strokeLinecap="round"
            />
            <path
              d="M 75 120 L 75 25 Q 87 10 99 25 L 99 120"
              stroke="#ffffff"
              strokeWidth="6"
              fill="#0369a1"
              strokeLinecap="round"
            />
            <path
              d="M 104 120 L 104 35 Q 116 20 128 35 L 128 120"
              stroke="#ffffff"
              strokeWidth="6"
              fill="#0369a1"
              strokeLinecap="round"
            />
            <path
              d="M 133 120 L 133 60 Q 143 50 153 60 L 153 120"
              stroke="#ffffff"
              strokeWidth="6"
              fill="#0369a1"
              strokeLinecap="round"
            />
            {/* Main Palm */}
            <rect x="50" y="110" width="103" height="60" rx="15" fill="#0284c7" stroke="#00e5ff" strokeWidth="3" />
            {/* Center gravity star */}
            <circle cx="100" cy="140" r="14" fill="#ffffff" className="animate-pulse" />
          </svg>
          <div className="absolute text-center mt-36">
            <span className="font-black font-chakra text-2xl sm:text-4xl text-white tracking-widest uppercase block drop-shadow-[0_0_20px_#00e5ff]">
              BÀN TAY THỐNG TRỊ
            </span>
            <span className="text-[10px] sm:text-xs font-mono text-amber-300 bg-slate-950/90 px-3 py-0.5 border border-amber-400 rounded-xs inline-block mt-1">
              [UY ÁP KẺ THỐNG TRỊ · QUÁI BỊ CHOÁNG 1 HIỆP]
            </span>
          </div>
        </div>
      )}

      {/* 13. SPATIAL COLLAPSE (skill-spatial-collapse) - Gravitational Black Hole Accretion Disk */}
      {activeVFX === 'spatial_collapse' && (
        <div className="relative w-full h-full flex items-center justify-center animate-vfx-blackhole">
          <svg className="w-88 h-88 sm:w-[460px] sm:h-[460px] filter drop-shadow-[0_0_50px_#7e22ce]" viewBox="0 0 200 200">
            {/* Accretion disk spiral arms */}
            <circle cx="100" cy="100" r="85" fill="none" stroke="#7e22ce" strokeWidth="5" strokeDasharray="14 8" className="animate-spin" />
            <circle cx="100" cy="100" r="65" fill="none" stroke="#00e5ff" strokeWidth="3" strokeDasharray="10 6" />
            {/* Photon Ring */}
            <circle cx="100" cy="100" r="45" fill="none" stroke="#c084fc" strokeWidth="4" />
            {/* Event Horizon (Pure Black Void) */}
            <circle cx="100" cy="100" r="35" fill="#000000" stroke="#ffffff" strokeWidth="2" />
            {/* Warping light beams */}
            <line x1="10" y1="100" x2="190" y2="100" stroke="#00f0ff" strokeWidth="2" opacity="0.6" />
            <line x1="100" y1="10" x2="100" y2="190" stroke="#a855f7" strokeWidth="2" opacity="0.6" />
          </svg>
          <div className="absolute text-center mt-36">
            <span className="font-black font-chakra text-2xl sm:text-4xl text-purple-300 tracking-widest uppercase block drop-shadow-[0_0_20px_#7e22ce]">
              SỤP ĐỔ KHÔNG GIAN!
            </span>
            <span className="text-[10px] sm:text-xs font-mono text-cyan-200 bg-slate-950/90 px-3 py-0.5 border border-purple-500 rounded-xs inline-block mt-1">
              [TRỌNG LỰC HỐ ĐEN · PHÁ HUỶ 100% GIÁP PHÒNG THỦ]
            </span>
          </div>
        </div>
      )}

      {/* 14. SHADOW EXCHANGE (skill-shadow-exchange) - Dual Swirling Abyssal Gateway Portals */}
      {activeVFX === 'shadow_exchange' && (
        <div className="relative w-full h-full flex items-center justify-center animate-vfx-shadowportal">
          <svg className="w-88 h-88 sm:w-[460px] sm:h-[460px] filter drop-shadow-[0_0_45px_#a855f7]" viewBox="0 0 200 200">
            {/* Twin portals swapping */}
            <ellipse cx="60" cy="100" rx="35" ry="60" fill="#1e1b4b" stroke="#a855f7" strokeWidth="4" className="animate-spin" />
            <ellipse cx="140" cy="100" rx="35" ry="60" fill="#1e1b4b" stroke="#00f0ff" strokeWidth="4" className="animate-spin" />
            {/* Energy bridge between portals */}
            <path d="M 60 70 Q 100 40 140 70" fill="none" stroke="#c084fc" strokeWidth="3" strokeDasharray="6 3" />
            <path d="M 60 130 Q 100 160 140 130" fill="none" stroke="#38bdf8" strokeWidth="3" strokeDasharray="6 3" />
            {/* Shadow particles */}
            <circle cx="60" cy="100" r="10" fill="#a855f7" className="animate-ping" />
            <circle cx="140" cy="100" r="10" fill="#00f0ff" className="animate-ping" />
          </svg>
          <div className="absolute text-center mt-36">
            <span className="font-black font-chakra text-2xl sm:text-4xl text-purple-300 tracking-widest uppercase block drop-shadow-[0_0_20px_#a855f7]">
              HOÁN ĐỔI BÓNG TỐI!
            </span>
            <span className="text-[10px] sm:text-xs font-mono text-cyan-200 bg-slate-950/90 px-3 py-0.5 border border-purple-400 rounded-xs inline-block mt-1">
              [DỊCH CHUYỂN TỨC THỜI · HOÁN ĐỔI VỊ TRÍ CHIẾN BINH]
            </span>
          </div>
        </div>
      )}

      {/* 15. ARISE (skill-arise) - THE ICONIC SHADOW MONARCH AWAKENING */}
      {activeVFX === 'arise' && (
        <div className="absolute inset-0 bg-[#070012]/95 backdrop-blur-md flex items-center justify-center animate-vfx-ariseburst z-50 overflow-hidden">
          <div className="absolute w-[600px] h-[600px] rounded-full bg-purple-900/40 blur-3xl animate-pulse" />
          <div className="relative text-center space-y-4">
            {/* Monarch Crown Symbol */}
            <div className="w-28 h-28 mx-auto rounded-full bg-purple-950 border-4 border-purple-400 flex items-center justify-center shadow-[0_0_60px_#a855f7] animate-bounce">
              <CrownMonarchIcon className="w-16 h-16 text-purple-300" />
            </div>
            {/* Iconic English 'ARISE' */}
            <h1 className="text-6xl sm:text-8xl md:text-9xl font-black text-white font-orbitron tracking-widest text-glow-purple uppercase">
              ARISE!
            </h1>
            <p className="text-xl sm:text-3xl font-black text-purple-300 font-chakra tracking-widest text-glow-purple uppercase">
              TRỖI DẬY · HỠI QUÂN ĐOÀN BÓNG TỐI!
            </p>
            <div className="inline-block bg-purple-950/90 border border-purple-400 px-4 py-1 rounded-xs font-mono text-xs text-cyan-300">
              [THỨC TỈNH TOÀN BỘ LINH HỒN SAU TỬ THẦN]
            </div>
          </div>
        </div>
      )}

      {/* 16. SHADOW EXTRACTION (skill-shadow-extraction) - Soul Core Siphon Wisps */}
      {activeVFX === 'shadow_extraction' && (
        <div className="relative w-full h-full flex items-center justify-center animate-vfx-soulextraction">
          <svg className="w-88 h-88 sm:w-[460px] sm:h-[460px] filter drop-shadow-[0_0_50px_#34d399]" viewBox="0 0 200 200">
            {/* Siphoning rings */}
            <circle cx="100" cy="100" r="75" fill="none" stroke="#10b981" strokeWidth="2.5" strokeDasharray="8 6" className="animate-spin" />
            {/* Rising soul core wisps */}
            <path d="M 80 160 Q 60 110 95 60" fill="none" stroke="#34d399" strokeWidth="4" strokeLinecap="round" />
            <path d="M 120 160 Q 140 110 105 60" fill="none" stroke="#6ee7b7" strokeWidth="4" strokeLinecap="round" />
            <path d="M 100 170 Q 100 120 100 50" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
            {/* Luminous Soul Core */}
            <circle cx="100" cy="50" r="16" fill="#34d399" className="animate-ping" />
            <circle cx="100" cy="50" r="7" fill="#ffffff" />
          </svg>
          <div className="absolute text-center mt-36">
            <span className="font-black font-chakra text-2xl sm:text-4xl text-purple-300 tracking-widest uppercase block drop-shadow-[0_0_20px_#a855f7]">
              TRÍCH XUẤT HẮC ÁM!
            </span>
            <span className="text-[10px] sm:text-xs font-mono text-emerald-300 bg-slate-950/90 px-3 py-0.5 border border-emerald-400 rounded-xs inline-block mt-1">
              [HÚT TỐI ĐA SINH MỆNH · HỒI 50% HP & MP CHO NGƯỜI CHƠI]
            </span>
          </div>
        </div>
      )}

      {/* 17. MONARCH DOMAIN (skill-monarch-domain) - Infinite Obsidian Floor Sea */}
      {activeVFX === 'monarch_domain' && (
        <div className="absolute inset-0 bg-[#090216]/90 border-4 border-purple-500 flex items-center justify-center animate-vfx-monarchdomain z-50">
          <div className="absolute w-[650px] h-[650px] rounded-full bg-purple-950/60 blur-3xl animate-spin" />
          <div className="relative text-center space-y-3">
            <CrownMonarchIcon className="w-24 h-24 text-purple-400 mx-auto animate-bounce" />
            <h2 className="text-4xl sm:text-6xl font-black text-purple-300 font-chakra tracking-widest text-glow-purple uppercase">
              LÃNH ĐỊA CHÚA TỂ!
            </h2>
            <span className="text-xs sm:text-sm font-mono text-cyan-300 bg-purple-950/90 px-4 py-1.5 border border-purple-400 rounded-xs inline-block">
              [BIỂN BÓNG TỐI VÔ TẬN · +50% SÁT THƯƠNG QUÂN ĐOÀN]
            </span>
          </div>
        </div>
      )}

      {/* 18. SHADOW ARMOR (skill-shadow-armor) - Hexagonal Obsidian Barrier Plate Snap */}
      {activeVFX === 'shadow_armor' && (
        <div className="relative w-full h-full flex items-center justify-center animate-vfx-shadowarmor">
          <svg className="w-92 h-92 sm:w-[480px] sm:h-[480px] filter drop-shadow-[0_0_50px_#a855f7]" viewBox="0 0 200 200">
            {/* Hexagonal Aegis Crest */}
            <polygon
              points="100,20 170,55 170,145 100,180 30,145 30,55"
              fill="#1e1b4b"
              stroke="#a855f7"
              strokeWidth="5"
              opacity="0.8"
            />
            <polygon
              points="100,40 150,65 150,135 100,160 50,135 50,65"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2.5"
              strokeDasharray="8 4"
            />
            {/* Inner Crest Glyph */}
            <path d="M 80 100 L 100 120 L 130 80" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
          </svg>
          <div className="absolute text-center mt-36">
            <span className="font-black font-chakra text-2xl sm:text-4xl text-purple-200 tracking-widest uppercase block drop-shadow-[0_0_20px_#a855f7]">
              HẮC GIÁP HỘ THỂ!
            </span>
            <span className="text-[10px] sm:text-xs font-mono text-cyan-300 bg-slate-950/90 px-3 py-0.5 border border-purple-500 rounded-xs inline-block mt-1">
              [HẤP THỤ 80% SÁT THƯƠNG · PHẢN ĐÒN 50%]
            </span>
          </div>
        </div>
      )}

      {/* 19. DRAGON FEAR (skill-dragon-fear) - Acoustic Golden Dragon Roar Shockwave */}
      {activeVFX === 'dragon_fear' && (
        <div className="relative w-full h-full flex items-center justify-center animate-vfx-dragonroar">
          <svg className="w-96 h-96 sm:w-[500px] sm:h-[500px] filter drop-shadow-[0_0_55px_#f59e0b]" viewBox="0 0 200 200">
            {/* Soundwave expanding concentric arcs */}
            <circle cx="100" cy="100" r="85" fill="none" stroke="#f59e0b" strokeWidth="3" opacity="0.6" className="animate-ping" />
            <circle cx="100" cy="100" r="65" fill="none" stroke="#fbbf24" strokeWidth="3.5" />
            <circle cx="100" cy="100" r="45" fill="none" stroke="#ffffff" strokeWidth="4" />
            {/* Dragon Head Roaring Mouth */}
            <path d="M 65 75 Q 100 50 135 75 L 145 125 Q 100 150 55 125 Z" fill="#78350f" stroke="#f59e0b" strokeWidth="4" />
            <circle cx="85" cy="85" r="5" fill="#fef08a" />
            <circle cx="115" cy="85" r="5" fill="#fef08a" />
          </svg>
          <div className="absolute text-center mt-36">
            <span className="font-black font-chakra text-2xl sm:text-4xl text-amber-400 tracking-widest uppercase block drop-shadow-[0_0_20px_#f59e0b]">
              UY ÁP LONG TỘC!
            </span>
            <span className="text-[10px] sm:text-xs font-mono text-yellow-200 bg-slate-950/90 px-3 py-0.5 border border-amber-400 rounded-xs inline-block mt-1">
              [TIẾNG GẦM KINH HOÀNG · KẺ ĐỊCH TÊ LIỆT MẤT LƯỢT]
            </span>
          </div>
        </div>
      )}

      {/* 20. DRAGON BREATH (skill-dragon-breath) - Cosmic Plasma Flame Inferno Beam */}
      {activeVFX === 'dragon_breath' && (
        <div className="relative w-full h-full flex items-center justify-center animate-vfx-dragonbeam">
          <svg className="w-full h-64 sm:h-80 filter drop-shadow-[0_0_60px_#ef4444]" viewBox="0 0 400 150">
            {/* Horizontal Plasma Beam */}
            <path d="M 0 75 Q 200 20 400 75 Q 200 130 0 75 Z" fill="#b91c1c" opacity="0.8" />
            <path d="M 0 75 Q 200 40 400 75 Q 200 110 0 75 Z" fill="#f97316" opacity="0.9" />
            <line x1="0" y1="75" x2="400" y2="75" stroke="#ffffff" strokeWidth="12" strokeLinecap="round" />
          </svg>
          <div className="absolute text-center mt-36">
            <span className="font-black font-chakra text-2xl sm:text-4xl text-amber-300 tracking-widest uppercase block drop-shadow-[0_0_20px_#ef4444]">
              HƠI THỞ HỦY DIỆT!
            </span>
            <span className="text-[10px] sm:text-xs font-mono text-yellow-100 bg-red-950/90 px-3 py-0.5 border border-amber-400 rounded-xs inline-block mt-1">
              [NGỌN LỬA LONG ĐẾ · THIÊU RỤI X6.2 SÁT THƯƠNG]
            </span>
          </div>
        </div>
      )}

      {/* 21. DEMON LIGHTNING (skill-demon-lightning) - Baran Heavenly Thunder Torrent */}
      {activeVFX === 'demon_lightning' && (
        <div className="relative w-full h-full flex items-center justify-center animate-vfx-demonthunder">
          <svg className="w-88 h-96 sm:w-[460px] sm:h-[500px] filter drop-shadow-[0_0_60px_#38bdf8]" viewBox="0 0 200 300">
            {/* Jagged Lightning Bolt */}
            <polyline
              points="100,0 80,70 120,90 70,170 115,190 60,300"
              fill="none"
              stroke="#0284c7"
              strokeWidth="16"
              opacity="0.8"
            />
            <polyline
              points="100,0 80,70 120,90 70,170 115,190 60,300"
              fill="none"
              stroke="#ffffff"
              strokeWidth="6"
            />
            {/* Electrical Arcs */}
            <line x1="80" y1="70" x2="40" y2="100" stroke="#38bdf8" strokeWidth="3" />
            <line x1="120" y1="90" x2="160" y2="120" stroke="#38bdf8" strokeWidth="3" />
            <circle cx="60" cy="300" r="22" fill="#38bdf8" className="animate-ping" />
          </svg>
          <div className="absolute text-center mt-36">
            <span className="font-black font-chakra text-2xl sm:text-4xl text-cyan-300 tracking-widest uppercase block drop-shadow-[0_0_20px_#38bdf8]">
              LÔI QUANG MA VƯƠNG!
            </span>
            <span className="text-[10px] sm:text-xs font-mono text-blue-200 bg-slate-950/90 px-3 py-0.5 border border-cyan-400 rounded-xs inline-block mt-1">
              [SẤM SÉT BARAN · 100% CHOÁNG VÁNG & PHÁ GIÁP]
            </span>
          </div>
        </div>
      )}

      {/* 22. VOID CLEAVE (skill-void-cleave) - Reality Fracture Dimension Tear */}
      {activeVFX === 'void_cleave' && (
        <div className="relative w-full h-full flex items-center justify-center animate-vfx-voidrift">
          <svg className="w-96 h-96 sm:w-[500px] sm:h-[500px] filter drop-shadow-[0_0_60px_#ec4899]" viewBox="0 0 200 200">
            {/* Jagged Reality Rupture Tear */}
            <polygon
              points="20,180 80,120 70,110 130,60 115,50 180,20 160,50 175,60 110,120 125,130"
              fill="#581c87"
              stroke="#ec4899"
              strokeWidth="3.5"
            />
            {/* Deep cosmos stars inside rift */}
            <circle cx="100" cy="100" r="3" fill="#ffffff" className="animate-ping" />
            <circle cx="70" cy="130" r="2" fill="#00f0ff" />
            <circle cx="130" cy="70" r="2" fill="#f43f5e" />
          </svg>
          <div className="absolute text-center mt-36">
            <span className="font-black font-chakra text-2xl sm:text-4xl text-pink-300 tracking-widest uppercase block drop-shadow-[0_0_20px_#ec4899]">
              TRẢM KÍCH HƯ KHÔNG!
            </span>
            <span className="text-[10px] sm:text-xs font-mono text-pink-100 bg-purple-950/90 px-3 py-0.5 border border-pink-500 rounded-xs inline-block mt-1">
              [VẾT RÁCH KHÔNG GIAN · CHÉM XUYÊN MỌI KẾT GIỚI]
            </span>
          </div>
        </div>
      )}

      {/* BOSS & GENERAL COMBAT ACTIONS */}
      {activeVFX === 'boss_claw' && (
        <div className="relative w-full h-full flex items-center justify-center animate-vfx-mutilatecrash">
          <svg className="w-80 h-80 sm:w-[420px] sm:h-[420px] filter drop-shadow-[0_0_40px_#ef4444]" viewBox="0 0 200 200">
            {/* Triple Demonic Beast Claw Gouges */}
            <path d="M 40 40 Q 60 100 80 160" fill="none" stroke="#ef4444" strokeWidth="8" strokeLinecap="round" />
            <path d="M 80 30 Q 100 100 120 170" fill="none" stroke="#dc2626" strokeWidth="10" strokeLinecap="round" />
            <path d="M 120 40 Q 140 100 160 160" fill="none" stroke="#b91c1c" strokeWidth="8" strokeLinecap="round" />
            <circle cx="100" cy="100" r="20" fill="#ef4444" opacity="0.6" className="animate-ping" />
          </svg>
        </div>
      )}

      {activeVFX === 'boss_combo' && (
        <div className="relative w-full h-full flex items-center justify-center animate-vfx-rasakawhirl">
          <svg className="w-88 h-88 sm:w-[460px] sm:h-[460px] filter drop-shadow-[0_0_50px_#f97316]" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="75" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray="10 5" className="animate-spin" />
            <line x1="20" y1="20" x2="180" y2="180" stroke="#f97316" strokeWidth="8" strokeLinecap="round" />
            <line x1="180" y1="20" x2="20" y2="180" stroke="#ef4444" strokeWidth="8" strokeLinecap="round" />
          </svg>
          <div className="absolute text-center mt-36">
            <span className="font-black font-chakra text-2xl sm:text-4xl text-red-500 tracking-wider text-glow-red uppercase block">
              LIÊN HOÀN CUỒNG BẠO!
            </span>
          </div>
        </div>
      )}

      {activeVFX === 'boss_ultimate' && (
        <div className="absolute inset-0 bg-red-950/90 backdrop-blur-sm flex items-center justify-center animate-pulse z-50">
          <div className="absolute w-[600px] h-[600px] rounded-full bg-red-600/40 blur-3xl animate-ping" />
          <div className="relative text-center space-y-4">
            <div className="text-7xl block mb-2 animate-bounce">🩸</div>
            <h2 className="text-4xl sm:text-6xl font-black text-red-500 font-chakra text-glow-red tracking-wider uppercase">
              BÙNG NỔ NỘ KHÍ DIỆT THẾ!
            </h2>
            <p className="text-xs sm:text-sm font-mono text-red-300">
              [TRÙM GIẢI PHÓNG ĐÒN ĐÁNH HỦY DIỆT TOÀN DIỆN]
            </p>
          </div>
        </div>
      )}

      {activeVFX === 'monster_evade' && (
        <div className="relative w-full h-full flex items-center justify-center animate-vfx-shadowmirage">
          <svg className="w-80 h-80 sm:w-[400px] sm:h-[400px] filter drop-shadow-[0_0_30px_#a855f7]" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="60" fill="#581c87" opacity="0.3" stroke="#a855f7" strokeWidth="2" strokeDasharray="6 4" className="animate-ping" />
          </svg>
          <div className="absolute text-center">
            <span className="font-black font-chakra text-3xl sm:text-5xl text-purple-300 tracking-widest drop-shadow-[0_0_30px_#a855f7] block uppercase">
              NÉ ĐÒN! (MISS)
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
