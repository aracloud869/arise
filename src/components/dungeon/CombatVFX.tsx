import React from 'react';
import { CrownMonarchIcon } from '../icons/SystemIcons';

export type VFXType = 
  | 'basic_slash'
  | 'dagger_throw'
  | 'venom_strike'
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
      {/* 1. BASIC SLASH (TRẢM KÍCH ĐOẢN ĐAO) - Cyan Plasma Razor Slice */}
      {activeVFX === 'basic_slash' && (
        <div className="relative w-full h-full flex items-center justify-center animate-skill-slash">
          <div className="absolute w-[160%] h-5 bg-gradient-to-r from-transparent via-white to-transparent animate-blade-slash -rotate-45 shadow-[0_0_35px_#00f0ff,0_0_70px_#ffffff]" />
          <div className="absolute w-[150%] h-12 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-blade-slash -rotate-45 blur-md opacity-80" />
          <div className="absolute w-44 h-44 rounded-full bg-cyan-300/40 animate-ping shadow-[0_0_40px_#00e5ff]" />
          <div className="absolute text-center animate-bounce">
            <span className="font-black font-chakra text-2xl sm:text-3xl text-cyan-200 tracking-widest text-glow-blue uppercase block">
              TRẢM KÍCH ĐOẢN ĐAO
            </span>
          </div>
        </div>
      )}

      {/* 2. DAGGER THROW (PHI ĐAO ĐOẠT MỆNH) - Flying Cyan Dagger Impale */}
      {activeVFX === 'dagger_throw' && (
        <div className="relative w-full h-full flex items-center justify-center animate-skill-slash">
          <div className="absolute w-60 h-60 border-2 border-dashed border-sky-400 rounded-full animate-spin shadow-[0_0_40px_#38bdf8]" />
          <div className="absolute w-[140%] h-4 bg-gradient-to-r from-transparent via-sky-300 to-transparent animate-blade-slash rotate-12 shadow-[0_0_35px_#38bdf8]" />
          <div className="absolute w-[140%] h-4 bg-gradient-to-r from-transparent via-white to-transparent animate-blade-slash -rotate-12 shadow-[0_0_35px_#ffffff]" />
          <div className="absolute text-center animate-bounce">
            <span className="font-black font-chakra text-3xl sm:text-4xl text-sky-300 tracking-widest drop-shadow-[0_0_25px_#38bdf8] block uppercase">
              PHI ĐAO ĐOẠT MỆNH!
            </span>
            <span className="text-xs font-mono text-sky-100 tracking-wider bg-slate-950/90 px-3 py-1 border border-sky-400 rounded-xs inline-block mt-1">
              [PHÓNG ĐAO TỪ XA · GIẢM 40% NÉ TRÁNH]
            </span>
          </div>
        </div>
      )}

      {/* 3. VENOM STRIKE / RASAKA FANG (NỌC ĐỘC RASAKA) - Phantom Viper Jaws */}
      {activeVFX === 'venom_strike' && (
        <div className="relative w-full h-full flex items-center justify-center animate-skill-venom">
          <div className="absolute inset-0 bg-purple-950/50 backdrop-blur-[2px] animate-pulse" />
          <svg className="w-80 h-80 sm:w-[420px] sm:h-[420px] animate-venom-splash filter drop-shadow-[0_0_40px_#a855f7]" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="85" fill="none" stroke="#22c55e" strokeWidth="4" strokeDasharray="10 6" opacity="0.7" className="animate-spin" />
            <path d="M30,35 Q100,75 170,35" stroke="#c084fc" strokeWidth="8" fill="none" strokeLinecap="round" />
            <polygon points="45,40 68,40 55,108" fill="#f8fafc" stroke="#a855f7" strokeWidth="2.5" />
            <polygon points="132,40 155,40 145,108" fill="#f8fafc" stroke="#a855f7" strokeWidth="2.5" />
            <circle cx="100" cy="100" r="18" fill="#a855f7" opacity="0.9" className="animate-ping" />
          </svg>
          <div className="absolute w-80 h-80 rounded-full border-4 border-emerald-400 bg-purple-900/40 animate-ping shadow-[0_0_60px_#a855f7,0_0_40px_#22c55e]" />
          <div className="absolute text-center animate-bounce">
            <span className="font-black font-chakra text-3xl sm:text-4xl text-emerald-300 tracking-widest drop-shadow-[0_0_25px_#22c55e] block uppercase">
              NỌC ĐỘC RASAKA!
            </span>
            <span className="text-xs font-mono text-purple-200 tracking-wider bg-slate-950/90 px-3 py-1 border border-purple-500 rounded-xs inline-block mt-1">
              [GÂY TÊ LIỆT · RÚT MÁU KẺ THÙ TRONG 3 HIỆP]
            </span>
          </div>
        </div>
      )}

      {/* 4. MUTILATE X (XÉ TOẠC LIÊN HOÀN) - Savage 10-Hit Blood Slash Frenzy */}
      {activeVFX === 'mutilate_x' && (
        <div className="relative w-full h-full flex items-center justify-center animate-skill-mutilate">
          <div className="absolute w-[150%] h-6 bg-gradient-to-r from-transparent via-rose-500 to-transparent animate-cross-slash rotate-45 shadow-[0_0_50px_#f43f5e]" />
          <div className="absolute w-[150%] h-6 bg-gradient-to-r from-transparent via-red-600 to-transparent animate-cross-slash -rotate-45 shadow-[0_0_50px_#dc2626]" />
          <div className="absolute w-[140%] h-5 bg-gradient-to-r from-transparent via-white to-transparent animate-cross-slash rotate-15" />
          <div className="absolute w-[140%] h-5 bg-gradient-to-r from-transparent via-rose-400 to-transparent animate-cross-slash -rotate-75" />
          <div className="absolute text-center animate-bounce">
            <span className="font-black font-chakra text-3xl sm:text-5xl text-rose-500 tracking-widest drop-shadow-[0_0_35px_#f43f5e] block uppercase">
              XÉ TOẠC LIÊN HOÀN!
            </span>
            <span className="text-xs font-mono text-white tracking-wider bg-red-950/90 px-3 py-1 border border-rose-500 rounded-xs inline-block mt-1">
              [10 NHÁT TRẢM TÀN SÁT · SÁT THƯƠNG BẠO KÍCH CỰC ĐẠI]
            </span>
          </div>
        </div>
      )}

      {/* 5. KAMISH WRATH (CƠN THỊNH NỘ KAMISH) - Golden Dragon Claw Shatter */}
      {activeVFX === 'kamish_wrath' && (
        <div className="relative w-full h-full flex items-center justify-center animate-skill-kamish">
          <div className="absolute w-[170%] h-8 bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-cross-slash rotate-35 shadow-[0_0_60px_#f59e0b]" />
          <div className="absolute w-[170%] h-8 bg-gradient-to-r from-transparent via-orange-500 to-transparent animate-cross-slash -rotate-35 shadow-[0_0_60px_#f97316]" />
          <div className="absolute text-center animate-bounce">
            <span className="font-black font-chakra text-3xl sm:text-5xl text-amber-300 tracking-widest text-glow-gold block uppercase">
              CƠN THỊNH NỘ KAMISH!
            </span>
            <span className="text-xs font-mono text-yellow-100 tracking-wider bg-amber-950/90 px-4 py-1 border border-amber-400 rounded-xs inline-block mt-1">
              [NANH RỒNG KAMISH · PHÁ 80% GIÁP TRÙM]
            </span>
          </div>
        </div>
      )}

      {/* 6. SHADOW STEP (BỘ PHÁP BÓNG ĐÊM) - Triple Shadow Afterimage Dash */}
      {activeVFX === 'shadow_step' && (
        <div className="relative w-full h-full flex items-center justify-center animate-skill-stealth">
          <div className="absolute w-72 h-72 border-2 border-cyan-400/80 rounded-full animate-ping shadow-[0_0_40px_#38bdf8]" />
          <div className="absolute w-[160%] h-8 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-blade-slash rotate-12 opacity-80" />
          <div className="absolute w-[160%] h-8 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-blade-slash -rotate-24 opacity-80" />
          <div className="absolute text-center animate-bounce">
            <span className="font-black font-chakra text-3xl sm:text-4xl text-cyan-300 tracking-widest text-glow-blue uppercase block">
              BỘ PHÁP BÓNG ĐÊM!
            </span>
            <span className="text-xs font-mono text-cyan-200 tracking-wider bg-slate-950/90 px-3 py-1 border border-cyan-400 rounded-xs inline-block mt-1">
              [LƯỚT HƯ KHÔNG · TĂNG 100% NÉ ĐÒN · HỒI 10% MP]
            </span>
          </div>
        </div>
      )}

      {/* 7. STEALTH INVISIBLE (TÀNG HÌNH ẨN THÂN) - Dark Abyssal Eyes */}
      {activeVFX === 'stealth_invisible' && (
        <div className="absolute inset-0 bg-[#020617]/90 backdrop-blur-md flex items-center justify-center animate-skill-stealth z-50">
          <div className="relative text-center space-y-4">
            <div className="flex items-center justify-center gap-8">
              <div className="w-16 h-3.5 bg-cyan-300 rounded-full shadow-[0_0_35px_#00e5ff] animate-ping" />
              <div className="w-16 h-3.5 bg-cyan-300 rounded-full shadow-[0_0_35px_#00e5ff] animate-ping" />
            </div>
            <h3 className="text-3xl sm:text-5xl font-black text-white font-chakra tracking-widest text-glow-blue uppercase">
              TÀNG HÌNH ẨN THÂN
            </h3>
            <p className="text-xs sm:text-sm font-mono text-cyan-300 tracking-widest bg-cyan-950/80 px-4 py-1 border border-cyan-400/60 inline-block">
              [HÒA VÀO HƯ KHÔNG · NÉ 100% ĐÒN ĐÁNH · +250% BẠO KÍCH]
            </p>
          </div>
        </div>
      )}

      {/* 8. BLOODLUST AURA (SÁT KHÍ ÁP ĐẢO) - Crimson Death Intent Aura */}
      {activeVFX === 'bloodlust_aura' && (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute w-[500px] h-[500px] rounded-full border-4 border-red-600 animate-ping shadow-[0_0_100px_#ef4444]" />
          <div className="absolute text-center animate-bounce">
            <span className="text-6xl block mb-2 animate-pulse">☠️</span>
            <span className="font-black font-chakra text-3xl sm:text-5xl text-red-500 tracking-widest text-glow-red block uppercase">
              SÁT KHÍ ÁP ĐẢO!
            </span>
            <span className="text-xs font-mono text-red-200 tracking-wider bg-red-950/90 px-3 py-1 border border-red-500 rounded-xs inline-block mt-1">
              [SÁT KHÍ LẠNH GÁY · GIẢM 35% CÔNG & PHÒNG QUÁI]
            </span>
          </div>
        </div>
      )}

      {/* 9. QUICKSILVER (TỐC BỘ THẦN TỐC) - Golden Clockwork Warp */}
      {activeVFX === 'quicksilver' && (
        <div className="relative w-full h-full flex items-center justify-center animate-skill-quicksilver">
          <div className="absolute w-80 h-80 border-4 border-amber-400 rounded-full animate-spin shadow-[0_0_60px_#f59e0b]" />
          <div className="absolute w-64 h-64 border-2 border-dashed border-yellow-200 rounded-full animate-ping" />
          <div className="absolute w-[170%] h-6 bg-gradient-to-r from-transparent via-yellow-300 to-transparent animate-blade-slash -rotate-12 shadow-[0_0_40px_#eab308]" />
          <div className="absolute text-center animate-bounce">
            <span className="font-black font-chakra text-3xl sm:text-4xl text-amber-300 tracking-widest drop-shadow-[0_0_25px_#eab308] block uppercase">
              TỐC BỘ THẦN TỐC!
            </span>
            <span className="text-xs font-mono text-yellow-200 tracking-wider bg-slate-950/90 px-3 py-1 border border-amber-400 rounded-xs inline-block mt-1">
              [GIA TĂNG TỐC ĐỘ 50% · TẶNG NGAY 1 LƯỢT ĐÁNH PHỤ]
            </span>
          </div>
        </div>
      )}

      {/* 10. RULER'S AUTHORITY (QUYỀN NĂNG THỐNG TRỊ) - Psychic Telekinetic Hand Slam */}
      {activeVFX === 'ruler_authority' && (
        <div className="relative w-full h-full flex items-center justify-center animate-skill-authority">
          <div className="absolute w-96 h-96 sm:w-[520px] sm:h-[520px] rounded-full border-4 border-cyan-300 bg-cyan-950/50 shadow-[0_0_90px_#00e5ff] flex items-center justify-center animate-spin">
            <div className="w-80 h-80 rounded-full border-2 border-dashed border-cyan-200" />
          </div>
          <svg className="w-80 h-80 sm:w-[380px] sm:h-[380px] filter drop-shadow-[0_0_60px_#38bdf8] animate-bounce" viewBox="0 0 200 200">
            <path d="M45,110 L45,35 Q55,22 68,35 L68,110" stroke="#ffffff" strokeWidth="8" fill="#0284c7" opacity="0.85" strokeLinecap="round" />
            <path d="M72,110 L72,15 Q84,5 96,15 L96,110" stroke="#ffffff" strokeWidth="8" fill="#0284c7" opacity="0.85" strokeLinecap="round" />
            <path d="M100,110 L100,20 Q112,10 124,20 L124,110" stroke="#ffffff" strokeWidth="8" fill="#0284c7" opacity="0.85" strokeLinecap="round" />
            <circle cx="95" cy="130" r="40" fill="#00e5ff" opacity="0.75" />
          </svg>
          <div className="absolute text-center mt-44">
            <span className="font-black font-chakra text-3xl sm:text-5xl text-white tracking-widest text-glow-blue block uppercase">
              BÀN TAY THỐNG TRỊ
            </span>
            <span className="text-xs sm:text-sm font-mono font-bold text-amber-300 tracking-wider bg-slate-950/90 px-4 py-1.5 rounded-xs border border-amber-400 inline-block mt-2">
              [UY ÁP VÔ HÌNH · QUÁI BỊ CHOÁNG 1 HIỆP]
            </span>
          </div>
        </div>
      )}

      {/* 11. SPATIAL COLLAPSE (SỤP ĐỔ KHÔNG GIAN) - Gravity Singularity Hole */}
      {activeVFX === 'spatial_collapse' && (
        <div className="relative w-full h-full flex items-center justify-center animate-skill-authority">
          <div className="absolute w-72 h-72 rounded-full bg-purple-950 border-4 border-cyan-400 animate-spin shadow-[0_0_80px_#7e22ce,inset_0_0_50px_#00e5ff]" />
          <div className="absolute w-44 h-44 rounded-full bg-black border-2 border-white animate-ping" />
          <div className="absolute text-center animate-bounce">
            <span className="font-black font-chakra text-3xl sm:text-4xl text-purple-300 tracking-widest drop-shadow-[0_0_30px_#a855f7] block uppercase">
              SỤP ĐỔ KHÔNG GIAN!
            </span>
            <span className="text-xs font-mono text-cyan-200 tracking-wider bg-slate-950/90 px-3 py-1 border border-purple-500 rounded-xs inline-block mt-1">
              [TRỌNG LỰC HỐ ĐEN · PHÁ HUỶ 100% GIÁP PHÒNG THỦ]
            </span>
          </div>
        </div>
      )}

      {/* 12. SHADOW EXCHANGE (HOÁN ĐỔI BÓNG TỐI) - Abyssal Portal Swap */}
      {activeVFX === 'shadow_exchange' && (
        <div className="relative w-full h-full flex items-center justify-center animate-skill-stealth">
          <div className="absolute w-80 h-[140%] bg-purple-950/80 border-x-4 border-purple-400 animate-pulse blur-sm" />
          <div className="absolute w-56 h-56 rounded-full bg-cyan-400/40 animate-ping shadow-[0_0_50px_#a855f7]" />
          <div className="absolute text-center animate-bounce">
            <span className="font-black font-chakra text-3xl sm:text-4xl text-purple-300 tracking-widest drop-shadow-[0_0_30px_#c084fc] block uppercase">
              HOÁN ĐỔI BÓNG TỐI!
            </span>
            <span className="text-xs font-mono text-cyan-200 tracking-wider bg-slate-950/90 px-3 py-1 border border-purple-400 rounded-xs inline-block mt-1">
              [DỊCH CHUYỂN TỨC THỜI · NÉ ĐÒN & TẬP KÍCH LƯNG]
            </span>
          </div>
        </div>
      )}

      {/* 13. ARISE (TRỖI DẬY) - Monarch Army Extraction */}
      {activeVFX === 'arise' && (
        <div className="absolute inset-0 bg-[#090014]/95 backdrop-blur-md flex items-center justify-center animate-skill-arise z-50 overflow-hidden">
          <div className="absolute w-[700px] h-[700px] rounded-full bg-gradient-to-r from-purple-900 via-indigo-950 to-purple-950 opacity-60 animate-shadow-vortex blur-2xl" />
          <div className="absolute w-96 h-96 sm:w-[580px] sm:h-[580px] rounded-full border-4 border-purple-500 bg-purple-950/50 shadow-[0_0_100px_#a855f7] flex items-center justify-center animate-spin">
            <CrownMonarchIcon className="w-28 h-28 text-purple-400 animate-pulse" />
          </div>
          <div className="relative text-center space-y-3 z-20">
            <h2 className="text-5xl sm:text-8xl font-black text-white font-orbitron tracking-widest text-glow-purple uppercase animate-bounce">
              ARISE!
            </h2>
            <p className="text-xl sm:text-3xl font-black text-purple-300 font-chakra tracking-widest text-glow-purple uppercase">
              TRỖI DẬY · BẬC THẦY BÓNG TỐI
            </p>
          </div>
        </div>
      )}

      {/* 14. SHADOW EXTRACTION (TRÍCH XUẤT HẮC ÁM) - Life & Mana Drain Tendrils */}
      {activeVFX === 'shadow_extraction' && (
        <div className="relative w-full h-full flex items-center justify-center animate-skill-arise">
          <div className="absolute w-80 h-80 rounded-full border-4 border-dashed border-purple-400 bg-purple-950/60 animate-spin shadow-[0_0_70px_#a855f7]" />
          <div className="absolute w-56 h-56 rounded-full bg-emerald-400/40 animate-ping" />
          <div className="absolute text-center animate-bounce">
            <span className="font-black font-chakra text-3xl sm:text-4xl text-purple-300 tracking-widest drop-shadow-[0_0_30px_#a855f7] block uppercase">
              TRÍCH XUẤT HẮC ÁM!
            </span>
            <span className="text-xs font-mono text-emerald-300 tracking-wider bg-slate-950/90 px-3 py-1 border border-emerald-400 rounded-xs inline-block mt-1">
              [HÚT SINH MỆNH · HỒI 50% HP & MP CHO THỢ SĂN]
            </span>
          </div>
        </div>
      )}

      {/* 15. MONARCH DOMAIN (LÃNH ĐỊA CHÚA TỂ) - Floor Expansion Domain */}
      {activeVFX === 'monarch_domain' && (
        <div className="absolute inset-0 bg-slate-950/90 border-4 border-purple-500 flex items-center justify-center animate-skill-arise z-50">
          <div className="absolute w-[800px] h-[800px] rounded-full bg-purple-950/70 blur-2xl animate-spin" />
          <div className="relative text-center space-y-3">
            <CrownMonarchIcon className="w-24 h-24 text-purple-400 mx-auto animate-bounce" />
            <h3 className="text-4xl sm:text-6xl font-black text-purple-300 font-chakra tracking-widest text-glow-purple uppercase">
              LÃNH ĐỊA CHÚA TỂ!
            </h3>
            <span className="text-xs sm:text-sm font-mono text-cyan-300 tracking-wider bg-purple-950/90 px-4 py-1.5 border border-purple-400 rounded-xs inline-block">
              [BAO PHỦ HẮC ÁM · +50% SÁT THƯƠNG & HỒI 25 MP MỖI LƯỢT]
            </span>
          </div>
        </div>
      )}

      {/* 16. SHADOW ARMOR (HẮC GIÁP HỘ THỂ) - Crystalline Obsidian Barrier */}
      {activeVFX === 'shadow_armor' && (
        <div className="relative w-full h-full flex items-center justify-center animate-skill-stealth">
          <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border-4 border-purple-400 bg-slate-950/80 animate-ping shadow-[0_0_70px_#a855f7]" />
          <div className="absolute text-center animate-bounce">
            <span className="font-black font-chakra text-3xl sm:text-4xl text-purple-200 tracking-widest text-glow-purple block uppercase">
              HẮC GIÁP HỘ THỂ!
            </span>
            <span className="text-xs font-mono text-cyan-300 tracking-wider bg-slate-950/90 px-3 py-1 border border-purple-500 rounded-xs inline-block mt-1">
              [HẤP THỤ 80% SÁT THƯƠNG · PHẢN ĐÒN 50%]
            </span>
          </div>
        </div>
      )}

      {/* 17. DRAGON FEAR (UY ÁP LONG TỘC) - Golden Dragon Ghost Roar */}
      {activeVFX === 'dragon_fear' && (
        <div className="relative w-full h-full flex items-center justify-center animate-skill-dragon">
          <div className="absolute w-[500px] h-[500px] rounded-full border-4 border-amber-400 animate-ping shadow-[0_0_90px_#f59e0b]" />
          <div className="absolute text-center animate-bounce">
            <span className="text-6xl block mb-2 animate-pulse">🐉</span>
            <span className="font-black font-chakra text-3xl sm:text-5xl text-amber-400 tracking-widest text-glow-gold block uppercase">
              UY ÁP LONG TỘC!
            </span>
            <span className="text-xs font-mono text-yellow-200 tracking-wider bg-slate-950/90 px-3 py-1 border border-amber-400 rounded-xs inline-block mt-1">
              [TIẾNG GẦM KINH HOÀNG · KẺ ĐỊCH TÊ LIỆT MẤT LƯỢT]
            </span>
          </div>
        </div>
      )}

      {/* 18. DRAGON BREATH (HƠI THỞ HỦY DIỆT) - Infernal Molten Stream */}
      {activeVFX === 'dragon_breath' && (
        <div className="relative w-full h-full flex items-center justify-center animate-skill-dragon">
          <div className="absolute w-[180%] h-44 bg-gradient-to-r from-transparent via-red-600 to-amber-500 animate-pulse blur-xl opacity-90" />
          <div className="absolute w-[150%] h-24 bg-gradient-to-r from-yellow-300 via-orange-500 to-rose-600 animate-blade-slash shadow-[0_0_50px_#ef4444]" />
          <div className="absolute text-center animate-bounce">
            <span className="font-black font-chakra text-3xl sm:text-5xl text-amber-300 tracking-widest drop-shadow-[0_0_35px_#dc2626] block uppercase">
              HƠI THỞ HỦY DIỆT!
            </span>
            <span className="text-xs font-mono text-yellow-100 tracking-wider bg-red-950/90 px-3 py-1 border border-amber-400 rounded-xs inline-block mt-1">
              [NGỌN LỬA LONG ĐẾ · THIÊU RỤI X6.2 SÁT THƯƠNG]
            </span>
          </div>
        </div>
      )}

      {/* 19. DEMON LIGHTNING (LÔI QUANG MA VƯƠNG) - Blue Demon Bolt Strike */}
      {activeVFX === 'demon_lightning' && (
        <div className="relative w-full h-full flex items-center justify-center animate-skill-lightning">
          <div className="absolute w-4 h-[180%] bg-gradient-to-b from-white via-blue-500 to-cyan-400 animate-pulse shadow-[0_0_60px_#38bdf8]" />
          <div className="absolute w-72 h-72 rounded-full bg-blue-600/50 animate-ping" />
          <div className="absolute text-center animate-bounce">
            <span className="font-black font-chakra text-3xl sm:text-5xl text-cyan-300 tracking-widest text-glow-blue block uppercase">
              LÔI QUANG MA VƯƠNG!
            </span>
            <span className="text-xs font-mono text-blue-200 tracking-wider bg-slate-950/90 px-3 py-1 border border-cyan-400 rounded-xs inline-block mt-1">
              [SẤM SÉT BARAN · 100% CHOÁNG VÁNG & PHÁ GIÁP]
            </span>
          </div>
        </div>
      )}

      {/* 20. VOID CLEAVE (TRẢM KÍCH HƯ KHÔNG) - Magenta Reality Tear */}
      {activeVFX === 'void_cleave' && (
        <div className="relative w-full h-full flex items-center justify-center animate-skill-void">
          <div className="absolute w-[180%] h-8 bg-gradient-to-r from-transparent via-pink-500 to-transparent animate-blade-slash -rotate-30 shadow-[0_0_60px_#ec4899]" />
          <div className="absolute w-[180%] h-8 bg-gradient-to-r from-transparent via-purple-600 to-transparent animate-blade-slash rotate-30 shadow-[0_0_60px_#a855f7]" />
          <div className="absolute text-center animate-bounce">
            <span className="font-black font-chakra text-3xl sm:text-5xl text-pink-300 tracking-widest drop-shadow-[0_0_35px_#ec4899] block uppercase">
              TRẢM KÍCH HƯ KHÔNG!
            </span>
            <span className="text-xs font-mono text-pink-100 tracking-wider bg-purple-950/90 px-3 py-1 border border-pink-500 rounded-xs inline-block mt-1">
              [VẾT RÁCH KHÔNG GIAN · CHÉM XUYÊN MỌI KẾT GIỚI]
            </span>
          </div>
        </div>
      )}

      {/* 21. BOSS CLAW */}
      {activeVFX === 'boss_claw' && (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute w-[130%] h-5 bg-gradient-to-r from-transparent via-red-600 to-transparent animate-cross-slash rotate-25 shadow-[0_0_40px_#ef4444]" />
          <div className="absolute w-[130%] h-5 bg-gradient-to-r from-transparent via-rose-500 to-transparent animate-cross-slash rotate-35 shadow-[0_0_40px_#f43f5e]" />
          <div className="w-56 h-56 rounded-full bg-red-600/35 animate-ping shadow-[0_0_60px_#ef4444]" />
        </div>
      )}

      {/* 22. BOSS COMBO */}
      {activeVFX === 'boss_combo' && (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute w-[140%] h-6 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-cross-slash rotate-45 shadow-[0_0_40px_#ef4444]" />
          <div className="absolute w-[140%] h-6 bg-gradient-to-r from-transparent via-orange-500 to-transparent animate-cross-slash -rotate-45 shadow-[0_0_40px_#f97316]" />
          <div className="absolute text-center animate-bounce">
            <span className="font-black font-chakra text-3xl sm:text-5xl text-red-500 tracking-wider text-glow-red uppercase block">
              COMBO CUỒNG NỘ!
            </span>
          </div>
        </div>
      )}

      {/* 23. BOSS ULTIMATE */}
      {activeVFX === 'boss_ultimate' && (
        <div className="absolute inset-0 bg-red-950/85 backdrop-blur-sm flex items-center justify-center animate-pulse z-50">
          <div className="absolute w-[600px] h-[600px] rounded-full bg-red-600/50 animate-ping shadow-[0_0_120px_#ef4444]" />
          <div className="relative text-center space-y-4">
            <h3 className="text-4xl sm:text-6xl font-black text-red-500 font-chakra text-glow-red tracking-wider uppercase animate-bounce">
              BÙNG NỔ NỘ KHÍ DIỆT THẾ!
            </h3>
          </div>
        </div>
      )}

      {/* 24. MONSTER EVADE */}
      {activeVFX === 'monster_evade' && (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute w-64 h-64 rounded-full border-2 border-purple-400 bg-purple-900/20 animate-ping opacity-75" />
          <div className="relative text-center animate-bounce">
            <span className="font-black font-chakra text-3xl sm:text-5xl text-purple-300 tracking-widest drop-shadow-[0_0_30px_#a855f7] block uppercase">
              NÉ ĐÒN! (50/100)
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
