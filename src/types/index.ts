export type TabType = 'status' | 'quests' | 'talents' | 'dungeon' | 'shop' | 'profile' | 'novel' | 'settings';

export interface PlayerStats {
  level: number;
  exp: number;
  maxExp: number;
  title: string;
  job: string;
  rank: 'E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'National' | 'Monarch';
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  fatigue: number;
  maxFatigue: number;
  gold: number;
  statPoints: number;
  talentPoints?: number;
  strength: number;     // STR
  agility: number;      // AGI
  intelligence: number; // INT
  vitality: number;     // VIT
  perception: number;   // PER
}

export interface TalentNode {
  id: string;
  name: string;
  vietnameseName: string;
  rank: 'E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'Monarch';
  tier: number;
  requiresNodeId?: string;
  description: string;
  type: 'passive_stat' | 'passive_effect' | 'skill_unlock';
  statsBonus?: {
    strength?: number;
    agility?: number;
    intelligence?: number;
    vitality?: number;
    perception?: number;
    hp?: number;
    mp?: number;
    critRate?: number;
    evasionRate?: number;
    damageReduction?: number;
  };
  unlockedSkillId?: string;
  goldCost: number;
  talentPointsCost: number;
  unlocked: boolean;
  icon: string;
}

export interface MonsterMaterial {
  id: string;
  name: string;
  rank: 'E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'Mythic';
  count: number;
  description: string;
  dropFrom: string;
  icon: string;
}

export interface TalentRankTier {
  rank: 'E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'Monarch';
  title: string;
  subtitle: string;
  description: string;
  unlocked: boolean;
  breakthroughRequirements: {
    gold: number;
    materials: {
      materialId: string;
      name: string;
      requiredCount: number;
      icon: string;
    }[];
  };
}

export interface DailyQuestItem {
  id: string;
  name: string;
  target: number;
  current: number;
  unit: string;
  completed: boolean;
  type?: string;
}

export interface CustomGoal {
  id: string;
  title: string;
  category: 'physical' | 'study' | 'mental' | 'habit';
  target: number;
  current: number;
  unit: string;
  rewardExp: number;
  rewardGold: number;
  difficulty: 'E' | 'D' | 'C' | 'B' | 'A' | 'S';
  completed: boolean;
  createdAt: string;
}

export interface StreakReward {
  days: number;
  title: string;
  rewardText: string;
  gold: number;
  statPoints: number;
  claimed: boolean;
}

export interface ShopItem {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'potion' | 'accessory' | 'special';
  rank: 'E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'Divine';
  price: number;
  description: string;
  statsBonus: {
    strength?: number;
    agility?: number;
    intelligence?: number;
    vitality?: number;
    perception?: number;
    hp?: number;
    mp?: number;
  };
  equipped: boolean;
  quantity: number;
  iconType: string;
}

export interface Skill {
  id: string;
  name: string;
  vietnameseName: string;
  rank?: 'E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'Monarch';
  level: number;
  maxLevel: number;
  mpCost: number;
  cooldownSeconds: number;
  cooldownTurns?: number;
  damageMultiplier: number;
  type: 'active' | 'passive';
  category?: 'dagger' | 'shadow' | 'ruler' | 'monarch' | 'buff' | 'assassin';
  description: string;
  sfxType: 
    | 'slash' 
    | 'vital_strike' 
    | 'venom' 
    | 'shadow_step' 
    | 'quicksilver' 
    | 'spatial_collapse' 
    | 'authority' 
    | 'shadow_exchange' 
    | 'mutilate' 
    | 'arise' 
    | 'monarch_domain' 
    | 'shadow_armor' 
    | 'dragon_fear' 
    | 'dragon_breath' 
    | 'demon_lightning' 
    | 'void_cleave';
  unlocked: boolean;
  equipped?: boolean;
  minLevelToUnlock?: number;
}

export interface ShadowSoldier {
  id: string;
  name: string;
  originalName: string;
  rank: 'Thường' | 'Ưu Tú' | 'Hiệp Sĩ' | 'Thống Lĩnh' | 'Đại Tướng Quân';
  count: number;
  power: number;
  avatarType: string;
  description: string;
  level?: number;
  maxLevel?: number;
  combatRole?: 'dps' | 'tank' | 'healer' | 'mage' | 'assassin';
  signatureSkill?: string;
  signatureSkillDesc?: string;
  combatDamage?: number;
  combatEffect?: 'bleed' | 'stun' | 'shield' | 'heal' | 'burn';
  isRecruited?: boolean;
  isDeployed?: boolean;
  recruitCostGold?: number;
  recruitCostMaterialId?: string;
  recruitCostMaterialCount?: number;
  upgradeCostGold?: number;
  upgradeCostMaterialId?: string;
  upgradeCostMaterialCount?: number;
}

export interface GrowthLog {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  category: 'level' | 'stat' | 'boss' | 'quest' | 'shop';
}

export interface DungeonGate {
  id: string;
  name: string;
  rank: 'E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'RED' | 'MYTHIC';
  bossName: string;
  bossTitle: string;
  bossHp: number;
  bossMaxHp: number;
  bossAttack: number;
  bossDefense: number;
  expReward: number;
  goldReward: number;
  possibleDrops: string[];
  description: string;
  minLevel: number;
  totalWaves?: number;
  dungeonType?: 'standard' | 'tower' | 'world_boss' | 'red_gate';
}

export interface NovelChapter {
  id: number;
  chapterNumber: number;
  title: string;
  publishDate: string;
  isNew?: boolean;
  content: string[];
}

export interface Novel {
  id: string;
  title: string;
  author?: string;
  genre?: string;
  category?: 'psychology' | 'detective' | 'martial_arts' | 'scifi' | 'monarch' | string;
  coverAccent?: string;
  readTimeMinutes?: number;
  totalReads?: number;
  rating?: number;
  description?: string;
  chapters: NovelChapter[];
}

export interface AppSettings {
  soundEnabled: boolean;
  sfxVolume: number;
  screenShake: boolean;
  themeColor: 'blue' | 'purple' | 'red' | 'gold';
  readingTheme: 'dark' | 'sepia' | 'oled';
  fontSize: number;
  autoNotifications: boolean;
}

export interface SystemNotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'quest' | 'penalty' | 'level' | 'dungeon' | 'system' | 'streak';
  read: boolean;
}
