import React from 'react';

interface MonsterVisualProps {
  gateId: string;
  isHurt: boolean;
  isAttacking: boolean;
  isRage: boolean;
  isStunned: boolean;
  isDead: boolean;
  isEvading?: boolean;
  className?: string;
  monsterRole?: 'minion' | 'elite' | 'boss';
}

export const MonsterVisual: React.FC<MonsterVisualProps> = ({
  gateId,
  isHurt,
  isAttacking,
  isRage,
  isStunned,
  isDead,
  isEvading = false,
  className = "w-36 h-36 sm:w-48 sm:h-48 md:w-60 md:h-60",
  monsterRole = 'boss',
}) => {
  // Identify specific boss or monster from gateId or role
  const getMonsterType = () => {
    const id = gateId.toLowerCase();
    if (id.includes('wolf') || id.includes('lycan') || id.includes('hang-soi') || id.includes('e-01') || id.includes('e-1')) return 'wolf';
    if (id.includes('goblin') || id.includes('durbuk') || id.includes('e-02') || id.includes('e-2')) return 'goblin';
    if (id.includes('spider') || id.includes('nhện') || id.includes('aranea') || id.includes('e-03') || id.includes('e-3')) return 'spider';
    if (id.includes('skeleton') || id.includes('xương') || id.includes('e-04') || id.includes('e-4') || id.includes('statue') || id.includes('đền-thờ')) return 'skeleton';
    if (id.includes('rasaka') || id.includes('snake') || id.includes('xà') || id.includes('d-01') || id.includes('d-1') || id.includes('d-02') || id.includes('d-2')) return 'snake';
    if (id.includes('baruka') || id.includes('ice') || id.includes('băng') || id.includes('c-01') || id.includes('c-1') || id.includes('c-02') || id.includes('c-2')) return 'ice_elf';
    if (id.includes('igris') || id.includes('knight') || id.includes('b-01') || id.includes('b-1') || id.includes('b-02') || id.includes('b-2') || id.includes('den-tho')) return 'igris';
    if (id.includes('baran') || id.includes('demon') || id.includes('quỷ') || id.includes('a-01') || id.includes('a-1') || id.includes('a-02') || id.includes('a-2') || id.includes('lau-dai')) return 'baran';
    if (id.includes('beru') || id.includes('ant') || id.includes('kiến') || id.includes('s-01') || id.includes('s-1') || id.includes('jeju')) return 'beru';
    if (id.includes('bellion') || id.includes('marshal') || id.includes('tướng-quân')) return 'bellion';
    if (id.includes('antares') || id.includes('dragon') || id.includes('kamish') || id.includes('mythic') || id.includes('red') || id.includes('hỏa-long')) return 'dragon';
    if (monsterRole === 'minion') return 'minion';
    if (monsterRole === 'elite') return 'elite';
    return 'boss_generic';
  };

  const monsterType = getMonsterType();

  const renderMonsterSVG = (isGhost = false) => {
    const ghostFilter = isGhost ? 'opacity-40 blur-[1px]' : '';

    // 1. SÓI CHÚA NANH THÉP LYCAN (Alpha Steel-Fanged Lycan)
    if (monsterType === 'wolf') {
      return (
        <svg viewBox="0 0 400 400" className={`w-full h-full filter ${ghostFilter} ${!isGhost ? 'drop-shadow-[0_0_25px_rgba(56,189,248,0.7)]' : ''}`}>
          <defs>
            <linearGradient id="wolfFurGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isGhost ? "#38bdf8" : "#0284c7"} />
              <stop offset="40%" stopColor={isGhost ? "#0369a1" : "#0c4a6e"} />
              <stop offset="100%" stopColor={isGhost ? "#082f49" : "#020617"} />
            </linearGradient>
            <linearGradient id="wolfManeGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </linearGradient>
            <radialGradient id="wolfEyeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#991b1b" />
            </radialGradient>
          </defs>

          {/* Electric Frost Aura Back Aura */}
          <circle cx="200" cy="200" r="145" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.4" className="animate-spin" />
          
          {/* Jagged Neck Mane & Back Spikes */}
          <path d="M80,240 L40,210 L95,190 L50,150 L110,140 L70,100 L140,110 L120,50 L180,90 M320,240 L360,210 L305,190 L350,150 L290,140 L330,100 L260,110 L280,50 L220,90" stroke="#38bdf8" strokeWidth="3" fill="url(#wolfManeGrad)" />
          
          {/* Main Lycan Head & Muscular Jaw */}
          <path d="M120,230 Q90,160 150,100 Q200,75 250,100 Q310,160 280,230 Q250,330 200,345 Q150,330 120,230 Z" fill="url(#wolfFurGrad)" stroke="#38bdf8" strokeWidth="3" />
          
          {/* Armor Plating on Forehead */}
          <polygon points="175,100 200,75 225,100 215,140 185,140" fill="#0f172a" stroke="#00f0ff" strokeWidth="2" />
          <line x1="200" y1="80" x2="200" y2="135" stroke="#38bdf8" strokeWidth="2" />

          {/* Pointed Beast Ears with Inner Glow */}
          <polygon points="145,115 105,40 175,90" fill="#0369a1" stroke="#38bdf8" strokeWidth="2.5" />
          <polygon points="255,115 295,40 225,90" fill="#0369a1" stroke="#38bdf8" strokeWidth="2.5" />
          <polygon points="140,105 120,55 160,90" fill="#082f49" />
          <polygon points="260,105 280,55 240,90" fill="#082f49" />

          {/* Glowing Crimson Feral Eyes */}
          <polygon points="145,170 185,182 155,192" fill="url(#wolfEyeGlow)" className="animate-pulse" />
          <polygon points="255,170 215,182 245,192" fill="url(#wolfEyeGlow)" className="animate-pulse" />
          <circle cx="165" cy="180" r="3.5" fill="#ffffff" />
          <circle cx="235" cy="180" r="3.5" fill="#ffffff" />

          {/* Snout & Steel Razor Fangs */}
          <polygon points="200,195 175,235 225,235" fill="#020617" stroke="#38bdf8" strokeWidth="2" />
          <polygon points="170,235 180,270 175,235" fill="#f8fafc" stroke="#38bdf8" strokeWidth="1" />
          <polygon points="230,235 220,270 225,235" fill="#f8fafc" stroke="#38bdf8" strokeWidth="1" />
          <polygon points="185,240 190,260 195,240" fill="#f8fafc" />
          <polygon points="215,240 210,260 205,240" fill="#f8fafc" />
          <polygon points="195,242 200,262 205,242" fill="#e2e8f0" />

          {/* Blue Lightning Streaks on Cheek */}
          <path d="M120,200 L140,215 L130,230 L150,240 M280,200 L260,215 L270,230 L250,240" stroke="#00f0ff" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    }

    // 2. TÙ TRƯỞNG GOBLIN DURBUK (Goblin Warchief Durbuk)
    if (monsterType === 'goblin') {
      return (
        <svg viewBox="0 0 400 400" className={`w-full h-full filter ${ghostFilter} ${!isGhost ? 'drop-shadow-[0_0_25px_rgba(34,197,94,0.7)]' : ''}`}>
          <defs>
            <linearGradient id="goblinSkin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isGhost ? "#38bdf8" : "#15803d"} />
              <stop offset="50%" stopColor={isGhost ? "#0369a1" : "#166534"} />
              <stop offset="100%" stopColor={isGhost ? "#082f49" : "#052e16"} />
            </linearGradient>
            <linearGradient id="boneColor" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>
          </defs>

          {/* Skull Helmet Headdress */}
          <path d="M140,110 Q200,40 260,110 Q240,160 200,160 Q160,160 140,110 Z" fill="#f8fafc" stroke="#64748b" strokeWidth="3" />
          <ellipse cx="170" cy="105" rx="12" ry="16" fill="#020617" />
          <ellipse cx="230" cy="105" rx="12" ry="16" fill="#020617" />
          <polygon points="195,120 200,140 205,120" fill="#020617" />

          {/* Massive Spiked Goblin War Club on Right */}
          <polygon points="290,260 360,70 380,80 310,270" fill="#78350f" stroke="#451a03" strokeWidth="2.5" />
          <polygon points="345,95 380,85 365,115" fill="#f8fafc" stroke="#451a03" strokeWidth="1.5" />
          <polygon points="330,135 365,125 350,155" fill="#f8fafc" stroke="#451a03" strokeWidth="1.5" />
          <polygon points="315,175 350,165 335,195" fill="#f8fafc" stroke="#451a03" strokeWidth="1.5" />

          {/* Goblin Head & Savage Wrinkles */}
          <path d="M130,160 Q100,220 140,280 Q200,320 260,280 Q300,220 270,160 Z" fill="url(#goblinSkin)" stroke="#22c55e" strokeWidth="3" />

          {/* Long Pointy Goblin Ears with Gold Earrings */}
          <polygon points="140,180 50,150 135,220" fill="#166534" stroke="#22c55e" strokeWidth="2.5" />
          <polygon points="260,180 350,150 265,220" fill="#166534" stroke="#22c55e" strokeWidth="2.5" />
          <circle cx="70" cy="175" r="7" fill="none" stroke="#fbbf24" strokeWidth="3" />
          <circle cx="330" cy="175" r="7" fill="none" stroke="#fbbf24" strokeWidth="3" />

          {/* Menacing Fiery Yellow Eyes */}
          <ellipse cx="165" cy="205" rx="14" ry="10" fill="#facc15" className="animate-pulse" />
          <ellipse cx="235" cy="205" rx="14" ry="10" fill="#facc15" className="animate-pulse" />
          <circle cx="165" cy="205" r="4" fill="#000000" />
          <circle cx="235" cy="205" r="4" fill="#000000" />

          {/* Large Crooked Nose */}
          <polygon points="190,210 200,245 210,210" fill="#14532d" stroke="#22c55e" strokeWidth="1.5" />

          {/* Underbite Savage Yellow Tusks */}
          <path d="M160,265 Q200,290 240,265" fill="#052e16" stroke="#22c55e" strokeWidth="2" />
          <polygon points="165,275 175,240 180,275" fill="url(#boneColor)" stroke="#ca8a04" strokeWidth="1" />
          <polygon points="235,275 225,240 220,275" fill="url(#boneColor)" stroke="#ca8a04" strokeWidth="1" />

          {/* Bone Bead Necklace */}
          <path d="M130,310 Q200,360 270,310" stroke="#fef08a" strokeWidth="6" strokeDasharray="8 6" strokeLinecap="round" />
        </svg>
      );
    }

    // 3. NHỆN CHÚA ĐỘC GAI ARANEA (Broodmother Arachnid Aranea)
    if (monsterType === 'spider') {
      return (
        <svg viewBox="0 0 400 400" className={`w-full h-full filter ${ghostFilter} ${!isGhost ? 'drop-shadow-[0_0_30px_rgba(239,68,68,0.8)]' : ''}`}>
          <defs>
            <radialGradient id="spiderEggGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="60%" stopColor="#881337" />
              <stop offset="100%" stopColor="#1e1b4b" />
            </radialGradient>
          </defs>

          {/* 8 Scythe-Like Spiked Arachnid Legs */}
          {/* Left Legs */}
          <path d="M150,190 L60,110 L20,180" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M140,210 L40,170 L10,250" stroke="#dc2626" strokeWidth="5.5" strokeLinecap="round" fill="none" />
          <path d="M145,230 L50,260 L30,340" stroke="#b91c1c" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M160,250 L80,310 L60,370" stroke="#991b1b" strokeWidth="4.5" strokeLinecap="round" fill="none" />

          {/* Right Legs */}
          <path d="M250,190 L340,110 L380,180" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M260,210 L360,170 L390,250" stroke="#dc2626" strokeWidth="5.5" strokeLinecap="round" fill="none" />
          <path d="M255,230 L350,260 L370,340" stroke="#b91c1c" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M240,250 L320,310 L340,370" stroke="#991b1b" strokeWidth="4.5" strokeLinecap="round" fill="none" />

          {/* Giant Swollen Egg Abdomen */}
          <ellipse cx="200" cy="140" rx="90" ry="80" fill="url(#spiderEggGlow)" stroke="#f43f5e" strokeWidth="3" />
          {/* Glowing Crimson Rune on Abdomen */}
          <polygon points="200,90 225,130 200,170 175,130" fill="none" stroke="#f43f5e" strokeWidth="3" className="animate-pulse" />

          {/* Arachnid Cephalothorax Head */}
          <ellipse cx="200" cy="240" rx="65" ry="55" fill="#0f051d" stroke="#ef4444" strokeWidth="3" />

          {/* 8 Glowing Multi-Eyes */}
          <circle cx="180" cy="225" r="7" fill="#ef4444" className="animate-pulse" />
          <circle cx="220" cy="225" r="7" fill="#ef4444" className="animate-pulse" />
          <circle cx="165" cy="240" r="5" fill="#f43f5e" />
          <circle cx="235" cy="240" r="5" fill="#f43f5e" />
          <circle cx="180" cy="248" r="4" fill="#fb7185" />
          <circle cx="220" cy="248" r="4" fill="#fb7185" />
          <circle cx="195" cy="235" r="4" fill="#ffffff" />
          <circle cx="205" cy="235" r="4" fill="#ffffff" />

          {/* Deadly Dripping Venom Chelicerae Fangs */}
          <path d="M180,260 Q170,305 155,320 Q180,310 190,280" fill="#f8fafc" stroke="#ef4444" strokeWidth="2" />
          <path d="M220,260 Q230,305 245,320 Q220,310 210,280" fill="#f8fafc" stroke="#ef4444" strokeWidth="2" />
          <circle cx="155" cy="320" r="4.5" fill="#22c55e" className="animate-ping" />
          <circle cx="245" cy="320" r="4.5" fill="#22c55e" className="animate-ping" />
        </svg>
      );
    }

    // 4. KỴ SĨ XƯƠNG CỔ ĐẠI & TƯỢNG ĐÁ THẦN ĐỀN (Ancient Skeleton Knight / Statue)
    if (monsterType === 'skeleton') {
      return (
        <svg viewBox="0 0 400 400" className={`w-full h-full filter ${ghostFilter} ${!isGhost ? 'drop-shadow-[0_0_30px_rgba(59,130,246,0.8)]' : ''}`}>
          <defs>
            <linearGradient id="ancientStone" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isGhost ? "#38bdf8" : "#334155"} />
              <stop offset="50%" stopColor={isGhost ? "#0369a1" : "#1e293b"} />
              <stop offset="100%" stopColor={isGhost ? "#082f49" : "#020617"} />
            </linearGradient>
            <radialGradient id="soulFlame" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#1e40af" />
            </radialGradient>
          </defs>

          {/* Cracked Stone Halo / Runes */}
          <circle cx="200" cy="180" r="140" fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="12 8" opacity="0.6" className="animate-spin" />

          {/* Heavy Stone Pauldrons */}
          <polygon points="90,170 30,190 70,290 140,240" fill="url(#ancientStone)" stroke="#94a3b8" strokeWidth="3" />
          <polygon points="310,170 370,190 330,290 260,240" fill="url(#ancientStone)" stroke="#94a3b8" strokeWidth="3" />

          {/* Giant Ancient Halberd on Left */}
          <line x1="60" y1="380" x2="60" y2="40" stroke="#cbd5e1" strokeWidth="5" />
          <path d="M60,40 L20,90 L60,80 L100,90 Z" fill="#94a3b8" stroke="#38bdf8" strokeWidth="2" />
          <polygon points="60,60 110,70 90,110 60,90" fill="#64748b" stroke="#38bdf8" strokeWidth="1.5" />

          {/* Imposing Skull Helm / Ancient God Face */}
          <path d="M140,110 Q200,60 260,110 Q280,200 240,280 Q200,310 160,280 Q120,200 140,110 Z" fill="url(#ancientStone)" stroke="#94a3b8" strokeWidth="3.5" />

          {/* Forehead Stone Crack with Blue Soul Light */}
          <path d="M200,80 L205,120 L195,140 L210,165" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />

          {/* Burning Blue Soul Flame Eyes */}
          <ellipse cx="165" cy="175" rx="14" ry="18" fill="#020617" stroke="#38bdf8" strokeWidth="2" />
          <ellipse cx="235" cy="175" rx="14" ry="18" fill="#020617" stroke="#38bdf8" strokeWidth="2" />
          <circle cx="165" cy="175" r="7" fill="url(#soulFlame)" className="animate-ping" />
          <circle cx="235" cy="175" r="7" fill="url(#soulFlame)" className="animate-ping" />

          {/* Grim Stone Grin Teeth */}
          <rect x="170" y="240" width="10" height="20" fill="#e2e8f0" stroke="#475569" />
          <rect x="185" y="240" width="10" height="20" fill="#e2e8f0" stroke="#475569" />
          <rect x="205" y="240" width="10" height="20" fill="#e2e8f0" stroke="#475569" />
          <rect x="220" y="240" width="10" height="20" fill="#e2e8f0" stroke="#475569" />
        </svg>
      );
    }

    // 5. ĐỘC XÀ KHỔNG LỒ RASAKA (Poison Serpent Rasaka)
    if (monsterType === 'snake') {
      return (
        <svg viewBox="0 0 400 400" className={`w-full h-full filter ${ghostFilter} ${!isGhost ? 'drop-shadow-[0_0_30px_rgba(168,85,247,0.85)]' : ''}`}>
          <defs>
            <linearGradient id="snakeSkinGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={isGhost ? "#38bdf8" : "#7e22ce"} />
              <stop offset="50%" stopColor={isGhost ? "#0284c7" : "#4c1d95"} />
              <stop offset="100%" stopColor={isGhost ? "#082f49" : "#1e1b4b"} />
            </linearGradient>
            <radialGradient id="serpentGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="70%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#713f12" />
            </radialGradient>
          </defs>

          {/* Massive Coiled Snake Hood with Scales */}
          <ellipse cx="200" cy="200" rx="140" ry="120" fill="url(#snakeSkinGrad)" stroke="#c084fc" strokeWidth="3.5" />
          
          {/* Hood Scale Patterns */}
          <path d="M100,160 Q200,120 300,160 M90,200 Q200,160 310,200 M110,240 Q200,200 290,240" stroke="#a855f7" strokeWidth="2" fill="none" opacity="0.6" />

          {/* Inner Armored Serpent Head */}
          <path d="M135,160 Q200,70 265,160 Q245,285 200,300 Q155,285 135,160 Z" fill="#2e1065" stroke="#e9d5ff" strokeWidth="3" />

          {/* Hypnotic Slit Golden Venom Eyes */}
          <ellipse cx="165" cy="165" rx="12" ry="16" fill="url(#serpentGlow)" className="animate-pulse" />
          <ellipse cx="235" cy="165" rx="12" ry="16" fill="url(#serpentGlow)" className="animate-pulse" />
          <line x1="165" y1="150" x2="165" y2="180" stroke="#000000" strokeWidth="4" strokeLinecap="round" />
          <line x1="235" y1="150" x2="235" y2="180" stroke="#000000" strokeWidth="4" strokeLinecap="round" />

          {/* Giant Razor Venom Fangs dripping poison */}
          <polygon points="168,215 155,280 178,225" fill="#ffffff" stroke="#c084fc" strokeWidth="1.5" />
          <polygon points="232,215 245,280 222,225" fill="#ffffff" stroke="#c084fc" strokeWidth="1.5" />
          <circle cx="155" cy="280" r="5" fill="#a855f7" className="animate-ping" />
          <circle cx="245" cy="280" r="5" fill="#a855f7" className="animate-ping" />

          {/* Forked Crimson Serpent Tongue */}
          <path d="M200,240 L200,300 L180,330 M200,300 L220,330" stroke="#f43f5e" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    }

    // 6. THỦ LĨNH YÊU TINH BĂNG BARUKA (Frost Monarch Vassal Baruka)
    if (monsterType === 'ice_elf') {
      return (
        <svg viewBox="0 0 400 400" className={`w-full h-full filter ${ghostFilter} ${!isGhost ? 'drop-shadow-[0_0_35px_rgba(0,229,255,0.85)]' : ''}`}>
          <defs>
            <linearGradient id="barukaArmor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isGhost ? "#e0f2fe" : "#38bdf8"} />
              <stop offset="60%" stopColor={isGhost ? "#38bdf8" : "#0369a1"} />
              <stop offset="100%" stopColor={isGhost ? "#082f49" : "#082f49"} />
            </linearGradient>
            <linearGradient id="frostBlade" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#7dd3fc" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>

          {/* Spiked Glacial Crystal Cape */}
          <polygon points="70,110 20,60 90,260" fill="#bae6fd" opacity="0.9" stroke="#00f0ff" strokeWidth="2" />
          <polygon points="330,110 380,60 310,260" fill="#bae6fd" opacity="0.9" stroke="#00f0ff" strokeWidth="2" />

          {/* Dual Curved Frost Daggers */}
          <path d="M110,240 Q40,190 30,90 Q90,170 110,240 Z" fill="url(#frostBlade)" stroke="#00f0ff" strokeWidth="2.5" />
          <path d="M290,240 Q360,190 370,90 Q310,170 290,240 Z" fill="url(#frostBlade)" stroke="#00f0ff" strokeWidth="2.5" />

          {/* Armored Body */}
          <polygon points="140,140 200,90 260,140 240,320 160,320" fill="url(#barukaArmor)" stroke="#e0f2fe" strokeWidth="3" />

          {/* Flowing Silver White Elf Hair */}
          <path d="M145,110 Q200,45 255,110 L275,210 L250,135 L200,95 L150,135 L125,210 Z" fill="#f8fafc" stroke="#38bdf8" strokeWidth="2" />

          {/* Pointed Frost Elf Ears */}
          <polygon points="135,135 75,115 140,160" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2.5" />
          <polygon points="265,135 325,115 260,160" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2.5" />

          {/* Glowing Pure Ice Cyan Eyes */}
          <polygon points="168,145 186,155 168,162" fill="#00f0ff" className="animate-pulse" />
          <polygon points="232,145 214,155 232,162" fill="#00f0ff" className="animate-pulse" />
        </svg>
      );
    }

    // 7. HUYẾT KỴ SĨ IGRIS (Blood-Red Commander Igris)
    if (monsterType === 'igris') {
      return (
        <svg viewBox="0 0 400 400" className={`w-full h-full filter ${ghostFilter} ${!isGhost ? 'drop-shadow-[0_0_40px_rgba(220,38,38,0.95)]' : ''}`}>
          <defs>
            <linearGradient id="igrisBloodPlate" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isGhost ? "#38bdf8" : "#991b1b"} />
              <stop offset="50%" stopColor={isGhost ? "#0284c7" : "#450a0a"} />
              <stop offset="100%" stopColor={isGhost ? "#082f49" : "#180202"} />
            </linearGradient>
          </defs>

          {/* Massive Flowing Crimson Helmet Plume */}
          <path d="M200,65 Q250,5 340,25 Q290,85 210,95 Z" fill="#dc2626" className="animate-pulse" />
          <path d="M190,70 Q130,20 70,35 Q120,90 180,95 Z" fill="#b91c1c" />

          {/* Spiked Knight Pauldrons */}
          <polygon points="80,120 20,150 60,250 140,200" fill="url(#igrisBloodPlate)" stroke="#ef4444" strokeWidth="3" />
          <polygon points="320,120 380,150 340,250 260,200" fill="url(#igrisBloodPlate)" stroke="#ef4444" strokeWidth="3" />

          {/* Knight Helmet */}
          <polygon points="155,85 200,50 245,85 235,175 200,205 165,175" fill="url(#igrisBloodPlate)" stroke="#dc2626" strokeWidth="3.5" />

          {/* Glowing Red Visor Light Slit */}
          <polygon points="170,125 230,125 225,136 175,136" fill="#ef4444" />
          <line x1="165" y1="130" x2="235" y2="130" stroke="#ffffff" strokeWidth="3" className="animate-pulse" />

          {/* Massive Demonic Blood Greatsword */}
          <polygon points="200,195 188,390 212,390" fill="#f8fafc" stroke="#dc2626" strokeWidth="2.5" />
          <line x1="200" y1="200" x2="200" y2="385" stroke="#ef4444" strokeWidth="3" />
          <polygon points="160,260 240,260 200,275" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
        </svg>
      );
    }

    // 8. MA VƯƠNG SẤM SÉT BARAN (Demon King Baran)
    if (monsterType === 'baran') {
      return (
        <svg viewBox="0 0 400 400" className={`w-full h-full filter ${ghostFilter} ${!isGhost ? 'drop-shadow-[0_0_40px_rgba(59,130,246,0.95)]' : ''}`}>
          <defs>
            <linearGradient id="baranDemonPlate" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isGhost ? "#38bdf8" : "#1e1b4b"} />
              <stop offset="60%" stopColor={isGhost ? "#0284c7" : "#0f172a"} />
              <stop offset="100%" stopColor={isGhost ? "#082f49" : "#020617"} />
            </linearGradient>
          </defs>

          {/* Demonic Lightning Wings */}
          <polygon points="50,70 10,140 80,270 140,160" fill="#1e1b4b" stroke="#3b82f6" strokeWidth="3" />
          <polygon points="350,70 390,140 320,270 260,160" fill="#1e1b4b" stroke="#3b82f6" strokeWidth="3" />

          {/* Curved Demon Lightning Horns */}
          <path d="M160,80 Q90,10 45,30 Q80,90 150,105" fill="#0f172a" stroke="#60a5fa" strokeWidth="3.5" />
          <path d="M240,80 Q310,10 355,30 Q320,90 250,105" fill="#0f172a" stroke="#60a5fa" strokeWidth="3.5" />

          {/* Demon Head & Lightning Core */}
          <polygon points="145,90 200,45 255,90 240,290 200,335 160,290" fill="url(#baranDemonPlate)" stroke="#3b82f6" strokeWidth="3.5" />

          {/* Crackling Sky-Blue Lightning Eyes */}
          <polygon points="168,120 190,135 168,142" fill="#60a5fa" className="animate-pulse" />
          <polygon points="232,120 210,135 232,142" fill="#60a5fa" className="animate-pulse" />

          {/* Lightning Arc Sword */}
          <path d="M200,175 L200,370 L195,380 L205,380 Z" fill="#93c5fd" stroke="#3b82f6" strokeWidth="3.5" />
          <path d="M185,205 L215,220 L185,235 L215,250" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" className="animate-ping" />
        </svg>
      );
    }

    // 9. VUA KIẾN BERU (Ant King Beru)
    if (monsterType === 'beru') {
      return (
        <svg viewBox="0 0 400 400" className={`w-full h-full filter ${ghostFilter} ${!isGhost ? 'drop-shadow-[0_0_40px_rgba(168,85,247,0.95)]' : ''}`}>
          <defs>
            <linearGradient id="beruChitinGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={isGhost ? "#38bdf8" : "#6b21a8"} />
              <stop offset="50%" stopColor={isGhost ? "#0284c7" : "#3b0764"} />
              <stop offset="100%" stopColor={isGhost ? "#082f49" : "#0f051d"} />
            </linearGradient>
          </defs>

          {/* Jet Wings of Dark Violet */}
          <polygon points="70,90 10,50 60,230" fill="#a855f7" opacity="0.75" stroke="#c084fc" strokeWidth="2.5" />
          <polygon points="330,90 390,50 340,230" fill="#a855f7" opacity="0.75" stroke="#c084fc" strokeWidth="2.5" />

          {/* Royal Chitinous Mandibles */}
          <path d="M145,150 Q100,175 125,220 Q160,195 165,165" fill="#3b0764" stroke="#a855f7" strokeWidth="3" />
          <path d="M255,150 Q300,175 275,220 Q240,195 235,165" fill="#3b0764" stroke="#a855f7" strokeWidth="3" />

          {/* Chitinous Carapace Head */}
          <polygon points="145,75 200,35 255,75 245,300 200,340 155,300" fill="url(#beruChitinGrad)" stroke="#c084fc" strokeWidth="3.5" />

          {/* Crown Antennae */}
          <polygon points="190,35 200,5 210,35" fill="#e9d5ff" className="animate-pulse" />
          <polygon points="175,45 160,15 185,40" fill="#a855f7" />
          <polygon points="225,45 240,15 215,40" fill="#a855f7" />

          {/* Predatory Violet Compound Eyes */}
          <ellipse cx="170" cy="115" rx="16" ry="12" fill="#c084fc" className="animate-pulse" />
          <ellipse cx="230" cy="115" rx="16" ry="12" fill="#c084fc" className="animate-pulse" />
          <circle cx="170" cy="115" r="5" fill="#ffffff" />
          <circle cx="230" cy="115" r="5" fill="#ffffff" />

          {/* Razor Scythe Forelegs */}
          <path d="M115,175 Q50,220 40,310 Q95,290 125,220" fill="#2e1065" stroke="#c084fc" strokeWidth="3.5" />
          <path d="M285,175 Q350,220 360,310 Q305,290 275,220" fill="#2e1065" stroke="#c084fc" strokeWidth="3.5" />
        </svg>
      );
    }

    // 10. ĐẠI TƯỚNG QUÂN BELLION (Grand Marshal Bellion)
    if (monsterType === 'bellion') {
      return (
        <svg viewBox="0 0 400 400" className={`w-full h-full filter ${ghostFilter} ${!isGhost ? 'drop-shadow-[0_0_40px_rgba(168,85,247,0.95)]' : ''}`}>
          <defs>
            <linearGradient id="bellionArmor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isGhost ? "#38bdf8" : "#475569"} />
              <stop offset="60%" stopColor={isGhost ? "#0284c7" : "#1e1b4b"} />
              <stop offset="100%" stopColor={isGhost ? "#082f49" : "#020617"} />
            </linearGradient>
          </defs>

          {/* Multiple Shadow Wings */}
          <polygon points="60,60 10,120 70,220" fill="#0f172a" stroke="#a855f7" strokeWidth="2.5" />
          <polygon points="50,140 10,200 80,280" fill="#0f172a" stroke="#a855f7" strokeWidth="2" />
          <polygon points="340,60 390,120 330,220" fill="#0f172a" stroke="#a855f7" strokeWidth="2.5" />
          <polygon points="350,140 390,200 320,280" fill="#0f172a" stroke="#a855f7" strokeWidth="2" />

          {/* Centipede-Segmented Grand Armor */}
          <polygon points="140,80 200,40 260,80 250,310 200,350 150,310" fill="url(#bellionArmor)" stroke="#c084fc" strokeWidth="3.5" />
          
          {/* Segment Ribs */}
          <line x1="160" y1="150" x2="240" y2="150" stroke="#a855f7" strokeWidth="3" />
          <line x1="165" y1="190" x2="235" y2="190" stroke="#a855f7" strokeWidth="3" />
          <line x1="170" y1="230" x2="230" y2="230" stroke="#a855f7" strokeWidth="3" />

          {/* Glowing Purple Mask Slits */}
          <circle cx="170" cy="110" r="6" fill="#c084fc" className="animate-pulse" />
          <circle cx="230" cy="110" r="6" fill="#c084fc" className="animate-pulse" />
          <circle cx="200" cy="125" r="4" fill="#ffffff" />
        </svg>
      );
    }

    // 11. LONG ĐẾ ANTARES & RỒNG CỔ ĐẠI KAMISH (Monarch of Destruction Antares & Kamish)
    if (monsterType === 'dragon') {
      return (
        <svg viewBox="0 0 400 400" className={`w-full h-full filter ${ghostFilter} ${!isGhost ? 'drop-shadow-[0_0_45px_rgba(239,68,68,1)]' : ''}`}>
          <defs>
            <linearGradient id="dragonScalesGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={isGhost ? "#38bdf8" : "#b91c1c"} />
              <stop offset="50%" stopColor={isGhost ? "#0284c7" : "#450a0a"} />
              <stop offset="100%" stopColor={isGhost ? "#082f49" : "#1c0404"} />
            </linearGradient>
            <radialGradient id="dragonMagma" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#f59e0b" />
              <stop offset="80%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#7f1d1d" />
            </radialGradient>
          </defs>

          {/* Massive Draconic Wings with Magma Spikes */}
          <polygon points="40,50 5,130 75,290 140,180" fill="#450a0a" stroke="#ef4444" strokeWidth="3.5" />
          <polygon points="360,50 395,130 325,290 260,180" fill="#450a0a" stroke="#ef4444" strokeWidth="3.5" />

          {/* Giant Crown Horns */}
          <path d="M145,65 Q70,5 20,25 Q65,85 135,100" fill="#1c0404" stroke="#f59e0b" strokeWidth="4" />
          <path d="M255,65 Q330,5 380,25 Q335,85 265,100" fill="#1c0404" stroke="#f59e0b" strokeWidth="4" />

          {/* Infernal Dragon Skull */}
          <polygon points="135,75 200,25 265,75 255,300 200,350 145,300" fill="url(#dragonScalesGrad)" stroke="#ef4444" strokeWidth="4" />

          {/* Blazing Volcanic Eyes */}
          <polygon points="160,105 190,120 160,132" fill="#fbbf24" className="animate-pulse" />
          <polygon points="240,105 210,120 240,132" fill="#fbbf24" className="animate-pulse" />
          <circle cx="170" cy="118" r="4" fill="#ffffff" />
          <circle cx="230" cy="118" r="4" fill="#ffffff" />

          {/* Flaming Magma Maw */}
          <polygon points="165,180 200,145 235,180 200,245" fill="url(#dragonMagma)" className="animate-pulse" />
          <polygon points="160,175 170,215 170,175" fill="#ffffff" />
          <polygon points="240,175 230,215 230,175" fill="#ffffff" />
          <polygon points="195,175 200,210 205,175" fill="#ffffff" />
        </svg>
      );
    }

    // Default Minion / High Orc Shaman / Hellhound Pack
    return (
      <svg viewBox="0 0 400 400" className={`w-full h-full filter ${ghostFilter} ${!isGhost ? 'drop-shadow-[0_0_25px_rgba(239,68,68,0.7)]' : ''}`}>
        <defs>
          <linearGradient id="genericShadow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={isGhost ? "#38bdf8" : "#312e81"} />
            <stop offset="100%" stopColor={isGhost ? "#082f49" : "#020617"} />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="120" fill="url(#genericShadow)" stroke={isGhost ? "#38bdf8" : "#ef4444"} strokeWidth="3" />
        <polygon points="150,110 110,40 180,95" fill="#0f172a" stroke="#ef4444" strokeWidth="2.5" />
        <polygon points="250,110 290,40 220,95" fill="#0f172a" stroke="#ef4444" strokeWidth="2.5" />
        <circle cx="160" cy="180" r="12" fill="#ef4444" className="animate-pulse" />
        <circle cx="240" cy="180" r="12" fill="#ef4444" className="animate-pulse" />
        <polygon points="170,220 185,255 195,220" fill="#ffffff" />
        <polygon points="205,220 215,255 230,220" fill="#ffffff" />
      </svg>
    );
  };

  return (
    <div
      className={`relative flex items-center justify-center transition-all duration-300 select-none ${className} ${
        isDead
          ? 'opacity-20 grayscale scale-75 rotate-6 filter blur-sm transition-all duration-1000'
          : isEvading
          ? 'animate-monster-evade scale-105'
          : isHurt
          ? 'animate-monster-hurt'
          : isAttacking
          ? 'animate-monster-lunge'
          : isRage
          ? 'animate-monster-rage'
          : 'animate-monster-idle'
      }`}
    >
      {/* 1. GHOSTING AFTERIMAGE EFFECT (When Evading) */}
      {isEvading && !isDead && (
        <>
          {/* Left Ghost Silhouette */}
          <div className="absolute inset-0 -translate-x-8 sm:-translate-x-12 opacity-50 blur-[2px] pointer-events-none transition-all duration-300 transform scale-110">
            {renderMonsterSVG(true)}
          </div>
          {/* Right Ghost Silhouette */}
          <div className="absolute inset-0 translate-x-8 sm:translate-x-12 opacity-35 blur-[3px] pointer-events-none transition-all duration-300 transform scale-95">
            {renderMonsterSVG(true)}
          </div>
          {/* Swift Wind Blur Trails */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[140%] h-8 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent -rotate-12 animate-pulse filter blur-sm" />
            <div className="w-[120%] h-4 bg-gradient-to-r from-transparent via-white/60 to-transparent rotate-6 animate-pulse" />
          </div>
        </>
      )}

      {/* 2. Rage Aura Overlay */}
      {isRage && !isDead && (
        <div className="absolute inset-0 bg-red-600/25 rounded-full filter blur-xl animate-ping pointer-events-none" />
      )}

      {/* 3. Stunned Cosmic Halo */}
      {isStunned && !isDead && (
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center gap-1 z-30 animate-spin">
          <div className="w-4 h-4 rounded-full border-2 border-yellow-300 bg-yellow-400 shadow-[0_0_15px_#fde047]" />
          <div className="w-5 h-5 rounded-full border-2 border-amber-300 bg-amber-400 shadow-[0_0_20px_#f59e0b]" />
          <div className="w-3 h-3 rounded-full border-2 border-yellow-300 bg-yellow-400 shadow-[0_0_10px_#fde047]" />
        </div>
      )}

      {/* 4. Primary Monster Graphic */}
      <div className={`relative z-10 w-full h-full flex items-center justify-center ${isEvading ? 'opacity-85' : ''}`}>
        {renderMonsterSVG()}
      </div>

      {/* 5. Hit Flash Sparkles */}
      {isHurt && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="w-28 h-28 rounded-full bg-white/60 animate-ping" />
        </div>
      )}
    </div>
  );
};
