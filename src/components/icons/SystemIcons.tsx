import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// System Status Icon (Solo Leveling System Window Glyph)
export const StatusIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" stroke="currentColor" fill="currentColor" fillOpacity="0.12" />
    <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);

// Quest Icon (Holographic Scroll / Directive Glyph)
export const QuestIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <path d="M4 4h12l4 4v12H4V4z" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.08" />
    <path d="M16 4v4h4" />
    <path d="M8 11h8" strokeLinecap="round" />
    <path d="M8 15h5" strokeLinecap="round" />
    <circle cx="8" cy="8" r="1" fill="currentColor" />
  </svg>
);

// Dungeon Gate Icon (Dimensional Portal Rift)
export const DungeonIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <ellipse cx="12" cy="12" rx="9" ry="10" stroke="currentColor" strokeDasharray="3 2" />
    <ellipse cx="12" cy="12" rx="5" ry="7" fill="currentColor" fillOpacity="0.15" />
    <path d="M12 2v4M12 18v4M2 12h4M18 12h4" strokeLinecap="round" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);

// Shop Icon (Dimensional Store Glyph)
export const ShopIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <path d="M3 9l2-5h14l2 5v11a1 1 0 01-1 1H4a1 1 0 01-1-1V9z" fill="currentColor" fillOpacity="0.1" />
    <path d="M3 9h18" />
    <path d="M9 13a3 3 0 006 0" strokeLinecap="round" />
  </svg>
);

// Profile / Hunter Icon (Shadow Monarch Visage / Hunter Crest)
export const ProfileIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <path d="M12 2l4 7-4 3-4-3 4-7z" fill="currentColor" fillOpacity="0.2" />
    <path d="M4 21v-2a6 6 0 0112 0v2" strokeLinecap="round" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

// Novel Reader Icon (Shadow Grimoire / Sanctuary Book)
export const NovelIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" strokeLinecap="round" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" fill="currentColor" fillOpacity="0.1" />
    <path d="M9 7h7M9 11h5" strokeLinecap="round" />
  </svg>
);

// Settings Icon (Tech Core Gear)
export const SettingsIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.2" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);

// Target / Goal Crosshair Icon
export const TargetIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.2" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" strokeLinecap="round" />
  </svg>
);

// Streak Flame Icon (Monarch Blue/Cyan Fire)
export const FlameStreakIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <path d="M12 2c1.5 3 4 5 4 8.5 0 3.5-2.5 6.5-6 6.5s-6-3-6-6.5C4 7 7 4 9 2c0 2 1.5 3.5 3 0z" fill="currentColor" fillOpacity="0.25" />
    <path d="M12 11c1 1.5 2 2.5 2 4 0 1.5-1 2.5-2 2.5s-2-1-2-2.5c0-1 1-2.5 2-4z" fill="currentColor" />
  </svg>
);

// Gold Coin Icon
export const GoldCoinIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="9" stroke="currentColor" fill="currentColor" fillOpacity="0.15" />
    <path d="M12 7v10M14.5 9.5a2.5 2.5 0 00-5 0c0 2 5 1.5 5 3.5a2.5 2.5 0 01-5 0" strokeLinecap="round" />
  </svg>
);

// Strength Icon (Muscle / Blade Force)
export const StrengthIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <path d="M5 19L19 5M16 5l3 3-8 8-4-1 1-4 8-6z" fill="currentColor" fillOpacity="0.2" />
    <path d="M19 5l-2-2M5 19l-2 2" strokeLinecap="round" />
  </svg>
);

// Agility Icon (Wind Dagger / Feather Speed)
export const AgilityIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.2" />
  </svg>
);

// Vitality Icon (Life Core / Heart Plate)
export const VitalityIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" fillOpacity="0.25" />
    <path d="M12 7v5M9.5 9.5h5" strokeLinecap="round" />
  </svg>
);

// Intelligence Icon (Mana Crystal / Mental Eye)
export const IntelligenceIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <polygon points="12 2 20 8 16 21 8 21 4 8" fill="currentColor" fillOpacity="0.2" />
    <circle cx="12" cy="11" r="2.5" fill="currentColor" />
  </svg>
);

// Perception Icon (God's Eye / Hunter Sense)
export const PerceptionIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.4" />
    <path d="M12 9v1M12 14v1M9 12h1M14 12h1" strokeLinecap="round" />
  </svg>
);

// Arise / Shadow Monarch Extraction Icon
export const AriseIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <path d="M12 2v14M5 9l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 19c3 3 15 3 18 0" strokeLinecap="round" />
    <circle cx="12" cy="16" r="1.5" fill="currentColor" />
  </svg>
);

// Crown Monarch Icon
export const CrownMonarchIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <path d="M3 18h18M5 14l3-7 4 4 4-4 3 7H5z" fill="currentColor" fillOpacity="0.2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="8" cy="7" r="1" fill="currentColor" />
    <circle cx="12" cy="11" r="1" fill="currentColor" />
    <circle cx="16" cy="7" r="1" fill="currentColor" />
  </svg>
);

// Potion Flask Icon
export const PotionIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <path d="M10 2h4M12 2v4M7 21h10a2 2 0 002-2l-4-9V6H9v4l-4 9a2 2 0 002 2z" fill="currentColor" fillOpacity="0.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 16h10" strokeLinecap="round" />
  </svg>
);

// Sword Slash Combat Icon
export const SwordSlashIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <path d="M14.5 17.5L3 6V3h3l11.5 11.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13 19l2 2 6-6-2-2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M19 5l-4 4" strokeLinecap="round" />
  </svg>
);

// Boss Skull Icon
export const SkullBossIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <path d="M4 10a8 8 0 1116 0c0 4.5-2.5 8-5 9H9c-2.5-1-5-4.5-5-9z" fill="currentColor" fillOpacity="0.2" />
    <circle cx="9" cy="10" r="1.5" fill="currentColor" />
    <circle cx="15" cy="10" r="1.5" fill="currentColor" />
    <path d="M9 17v2M12 17v2M15 17v2" strokeLinecap="round" />
  </svg>
);

// Alert / Exclamation Glyph
export const AlertGlyphIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <polygon points="12 2 22 20 2 20" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.15" />
    <path d="M12 9v5" strokeLinecap="round" />
    <circle cx="12" cy="17" r="1" fill="currentColor" />
  </svg>
);

// Plus and Check Icons
export const PlusIcon: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2.5">
    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
  </svg>
);

export const CheckIcon: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2.5">
    <path d="M4 12l5 5L20 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Edit Pencil Icon
export const EditPencilIcon: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.2" />
  </svg>
);

// Trash Delete Icon
export const TrashIcon: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <polyline points="3 6 5 6 21 6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.1" />
    <line x1="10" y1="11" x2="10" y2="17" strokeLinecap="round" />
    <line x1="14" y1="11" x2="14" y2="17" strokeLinecap="round" />
  </svg>
);

// Refresh / Restore Icon
export const RefreshIcon: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <polyline points="23 4 23 10 17 10" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const VolumeIcon: React.FC<{ soundOn: boolean; className?: string }> = ({ soundOn, className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" fillOpacity="0.2" strokeLinecap="round" strokeLinejoin="round" />
    {soundOn ? (
      <>
        <path d="M15.54 8.46a5 5 0 010 7.07" strokeLinecap="round" />
        <path d="M19.07 4.93a10 10 0 010 14.14" strokeLinecap="round" />
      </>
    ) : (
      <path d="M23 9l-6 6M17 9l6 6" strokeLinecap="round" />
    )}
  </svg>
);

// Shield Defend / Guard Icon
export const ShieldDefendIcon: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="currentColor" fillOpacity="0.15" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 6v12M8 12h8" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
  </svg>
);

