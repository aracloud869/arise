import React from 'react';

interface HunterVisualProps {
  isAttacking: boolean;
  isHurt: boolean;
  isGuarding: boolean;
  isStealthed: boolean;
  className?: string;
}

export const HunterVisual: React.FC<HunterVisualProps> = ({
  isAttacking,
  isHurt,
  isGuarding,
  isStealthed,
  className = "w-32 h-32 sm:w-44 sm:h-44 md:w-56 md:h-56",
}) => {
  return (
    <div
      className={`relative flex items-center justify-center transition-all duration-200 select-none ${className} ${
        isStealthed ? 'opacity-30 filter blur-[1px]' : 'opacity-100'
      } ${
        isHurt
          ? 'animate-monster-hurt'
          : isAttacking
          ? 'animate-hunter-lunge'
          : 'animate-monster-idle'
      }`}
    >
      {/* Guard Mana Shield Bubble */}
      {isGuarding && (
        <div className="absolute inset-[-12px] rounded-full border-2 border-cyan-400 bg-cyan-500/15 animate-shield-guard pointer-events-none z-30 flex items-center justify-center">
          <div className="absolute top-2 text-[10px] font-bold font-orbitron text-cyan-300 tracking-wider bg-slate-950/80 px-2 py-0.5 rounded-full border border-cyan-500/50">
            PHÒNG THỦ -65% SÁT THƯƠNG
          </div>
        </div>
      )}

      {/* Shadow Monarch Silhouette & Dagger Stance */}
      <svg viewBox="0 0 320 320" className="w-full h-full filter drop-shadow-[0_0_20px_rgba(0,210,255,0.45)]">
        <defs>
          <linearGradient id="jinwooCoat" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="50%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
          <linearGradient id="cyanDagger" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#00e5ff" />
            <stop offset="100%" stopColor="#0052cc" />
          </linearGradient>
          <linearGradient id="kasakaDagger" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#4c1d95" />
          </linearGradient>
        </defs>

        {/* Ambient Dark Monarch Shadow Mist */}
        <circle cx="160" cy="180" r="110" fill="#0369a1" opacity="0.12" className="animate-pulse" />

        {/* Billowing Shadow Trenchcoat Tails */}
        <path d="M120,180 C80,220 60,280 80,310 C110,300 130,260 140,220 Z" fill="url(#jinwooCoat)" />
        <path d="M200,180 C240,220 260,280 240,310 C210,300 190,260 180,220 Z" fill="url(#jinwooCoat)" />
        <path d="M130,200 L190,200 L205,310 L115,310 Z" fill="#020617" stroke="#0ea5e9" strokeWidth="1" />

        {/* Hunter Torso & High Collar Jacket */}
        <polygon points="120,110 200,110 185,210 135,210" fill="url(#jinwooCoat)" stroke="#0284c7" strokeWidth="1.5" />
        {/* Collar flares */}
        <polygon points="120,110 100,70 140,95" fill="#0f172a" stroke="#00e5ff" strokeWidth="1" />
        <polygon points="200,110 220,70 180,95" fill="#0f172a" stroke="#00e5ff" strokeWidth="1" />

        {/* Hunter Head & Silhouette */}
        <polygon points="160,50 185,85 178,125 160,135 142,125 135,85" fill="#1e293b" />
        {/* Shadow Black Hair */}
        <path d="M130,75 C130,40 160,35 190,45 C195,65 180,80 175,70 C165,60 145,75 130,75 Z" fill="#09090b" stroke="#38bdf8" strokeWidth="1" />

        {/* Iconic Piercing Glowing Cyan Eyes */}
        <line x1="147" y1="88" x2="157" y2="88" stroke="#00e5ff" strokeWidth="3.5" strokeLinecap="round" filter="drop-shadow(0 0 8px #00e5ff)" />
        <line x1="165" y1="88" x2="175" y2="88" stroke="#00e5ff" strokeWidth="3.5" strokeLinecap="round" filter="drop-shadow(0 0 8px #00e5ff)" />
        {/* Eye trails */}
        <path d="M147,88 Q130,85 120,80" stroke="#00e5ff" strokeWidth="1.5" fill="none" opacity="0.8" />
        <path d="M175,88 Q190,85 200,80" stroke="#00e5ff" strokeWidth="1.5" fill="none" opacity="0.8" />

        {/* Right Arm Holding Cyan Knight Killer Dagger */}
        <path d="M195,120 L240,150 L260,140" stroke="#1e293b" strokeWidth="12" strokeLinecap="round" />
        {/* Knight Killer Blade (Glowing Cyan) */}
        <polygon points="255,140 310,120 280,155" fill="url(#cyanDagger)" stroke="#ffffff" strokeWidth="1.5" filter="drop-shadow(0 0 10px #00e5ff)" />
        <line x1="250" y1="142" x2="262" y2="138" stroke="#64748b" strokeWidth="4" />

        {/* Left Arm Holding Kasaka's Venom Fang Dagger */}
        <path d="M125,120 L80,150 L60,140" stroke="#1e293b" strokeWidth="12" strokeLinecap="round" />
        {/* Kasaka Poison Dagger (Glowing Purple) */}
        <polygon points="65,140 10,120 40,155" fill="url(#kasakaDagger)" stroke="#ffffff" strokeWidth="1.5" filter="drop-shadow(0 0 10px #a855f7)" />
        <line x1="70" y1="142" x2="58" y2="138" stroke="#64748b" strokeWidth="4" />
      </svg>
    </div>
  );
};
