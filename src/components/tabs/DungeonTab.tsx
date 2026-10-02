import React, { useState, useEffect, useRef } from 'react';
import { PlayerStats, DungeonGate, Skill } from '../../types';
import {
  DungeonIcon,
  SkullBossIcon,
  SwordSlashIcon,
  AriseIcon,
  GoldCoinIcon,
  PotionIcon,
  AlertGlyphIcon,
  CrownMonarchIcon,
  ShieldDefendIcon,
  CheckIcon,
} from '../icons/SystemIcons';
import { soundFx } from '../../utils/soundEffects';
import { MonsterVisual } from '../dungeon/MonsterVisual';
import { HunterVisual } from '../dungeon/HunterVisual';
import { CombatVFX, VFXType } from '../dungeon/CombatVFX';
import { HolographicHPBar } from '../dungeon/HolographicHPBar';
import { GroundImpactEffect } from '../effects/GroundImpactEffect';
import { SkillLoadoutDeck } from '../skills/SkillLoadoutDeck';

interface DungeonTabProps {
  stats: PlayerStats;
  dungeons: DungeonGate[];
  skills: Skill[];
  onVictory: (gate: DungeonGate, rewards: { exp: number; gold: number; drops: string[] }) => void;
  onDefeat: () => void;
  onUseBattlePotion: () => boolean;
  recoveryPotionsCount: number;
  onRaidStateChange?: (isActive: boolean) => void;
  onToggleEquipSkill?: (skillId: string) => void;
}

interface FloatingText {
  id: number;
  text: string;
  type: 'damage' | 'crit' | 'heal' | 'boss_damage' | 'status';
  x: number;
  y: number;
}

export type DungeonGameMode = 'gates' | 'tower' | 'world_boss' | 'arena';

// Helper to calculate total waves based on rank
const calculateTotalWaves = (gate: DungeonGate): number => {
  if (gate.totalWaves) return gate.totalWaves;
  switch (gate.rank) {
    case 'E': return 3;
    case 'D': return 4;
    case 'C': return 5;
    case 'B': return 6;
    case 'A': return 7;
    case 'S': return 8;
    case 'RED':
    case 'MYTHIC': return 10;
    default: return 3;
  }
};

// Calculate dynamic enemy evasion based on rank, level and role
const calculateEnemyDodgeRate = (gate: DungeonGate, wave: number, totalWaves: number): number => {
  const isFinalBoss = wave >= totalWaves;
  const isElite = wave === totalWaves - 1;
  const rankBonus = gate.rank === 'MYTHIC' || gate.rank === 'RED' ? 20 : gate.rank === 'S' ? 15 : gate.rank === 'A' ? 10 : 5;

  if (isFinalBoss) {
    return Math.min(65, 35 + rankBonus);
  }
  if (isElite) {
    return Math.min(50, 25 + rankBonus);
  }
  return Math.min(40, 20 + rankBonus);
};

// Enemy wave metadata generator based on Gate and dynamic Wave index
const getWaveEnemyData = (gate: DungeonGate, wave: number, totalWaves: number) => {
  const isFinalWave = wave >= totalWaves;
  const isPenultimate = wave === totalWaves - 1;
  const isEarlyWave = wave <= Math.max(1, Math.floor(totalWaves * 0.4));
  const dodgeRate = calculateEnemyDodgeRate(gate, wave, totalWaves);

  if (isFinalWave) {
    return {
      role: 'boss' as const,
      name: `TRÙM CUỐI: ${gate.bossName}`,
      title: gate.bossTitle,
      maxHp: Math.round(gate.bossHp * 1.5),
      attack: Math.round(gate.bossAttack * 1.4),
      defense: Math.round(gate.bossDefense * 1.2),
      dodgeRate,
    };
  }

  if (isPenultimate) {
    return {
      role: 'elite' as const,
      name: `Thống Lĩnh Hộ Vệ [Đợt ${wave}/${totalWaves}]`,
      title: `Cận thần hùng mạnh nhất canh giữ phòng trùm`,
      maxHp: Math.round(gate.bossHp * 1.05),
      attack: Math.round(gate.bossAttack * 0.95),
      defense: Math.round(gate.bossDefense * 0.85),
      dodgeRate,
    };
  }

  if (isEarlyWave) {
    return {
      role: 'minion' as const,
      name: `Bầy Quái Tiền Trạm [Đợt ${wave}/${totalWaves}]`,
      title: `Lũ quái hung hãn tuần tra cửa hang`,
      maxHp: Math.round(gate.bossHp * (0.35 + (wave / totalWaves) * 0.2)),
      attack: Math.round(gate.bossAttack * (0.45 + (wave / totalWaves) * 0.2)),
      defense: Math.round(gate.bossDefense * 0.4),
      dodgeRate,
    };
  }

  // Mid wave
  return {
    role: 'elite' as const,
    name: `Đội Tinh Anh Hộ Vệ [Đợt ${wave}/${totalWaves}]`,
    title: `Quân đoàn quái vật phòng thủ tầng giữa hầm ngục`,
    maxHp: Math.round(gate.bossHp * (0.6 + (wave / totalWaves) * 0.3)),
    attack: Math.round(gate.bossAttack * (0.7 + (wave / totalWaves) * 0.25)),
    defense: Math.round(gate.bossDefense * 0.65),
    dodgeRate,
  };
};

export const DungeonTab: React.FC<DungeonTabProps> = ({
  stats,
  dungeons,
  skills,
  onVictory,
  onDefeat,
  onUseBattlePotion,
  recoveryPotionsCount,
  onRaidStateChange,
  onToggleEquipSkill,
}) => {
  // Game Mode Selection: 'gates' | 'tower' | 'world_boss' | 'arena'
  const [activeMode, setActiveMode] = useState<DungeonGameMode>('gates');

  // Selected rank filter for standard gates
  const [selectedRank, setSelectedRank] = useState<string>('ALL');

  // Selected dungeon for battle
  const [activeGate, setActiveGate] = useState<DungeonGate | null>(null);

  // Tower Mode Progression State
  const [towerFloor, setTowerFloor] = useState<number>(1);
  const [towerMaxCleared, setTowerMaxCleared] = useState<number>(0);

  // Battle State: 'idle' | 'fighting' | 'victory' | 'defeat'
  const [battleState, setBattleState] = useState<'idle' | 'fighting' | 'victory' | 'defeat'>('idle');

  // Multi-Wave Progression
  const [currentWave, setCurrentWave] = useState<number>(1);
  const [totalWavesCount, setTotalWavesCount] = useState<number>(3);
  const [waveTransitionMessage, setWaveTransitionMessage] = useState<string | null>(null);

  // Turn-based Combat State
  const [currentTurn, setCurrentTurn] = useState<'player' | 'boss'>('player');
  const [turnCount, setTurnCount] = useState<number>(1);
  const [isActing, setIsActing] = useState<boolean>(false);
  const [fastSpeed, setFastSpeed] = useState<boolean>(false);

  // Current Enemy Stats
  const [enemyCurrentHp, setEnemyCurrentHp] = useState<number>(100);
  const [enemyMaxHp, setEnemyMaxHp] = useState<number>(100);
  const [enemyName, setEnemyName] = useState<string>('');
  const [enemyTitle, setEnemyTitle] = useState<string>('');
  const [enemyRole, setEnemyRole] = useState<'minion' | 'elite' | 'boss'>('minion');
  const [enemyDodgeRate, setEnemyDodgeRate] = useState<number>(35);
  const [enemyRage, setEnemyRage] = useState<number>(0);

  // Player Combat Stats
  const [playerCombatHp, setPlayerCombatHp] = useState<number>(stats.hp);
  const [playerCombatMp, setPlayerCombatMp] = useState<number>(stats.mp);

  // Status Effects
  const [isEnemyStunned, setIsEnemyStunned] = useState<boolean>(false);
  const [isStealthed, setIsStealthed] = useState<boolean>(false);
  const [isGuarding, setIsGuarding] = useState<boolean>(false);
  const [poisonTurnsRemaining, setPoisonTurnsRemaining] = useState<number>(0);
  const [skillCooldownTurns, setSkillCooldownTurns] = useState<Record<string, number>>({});

  // Animations & Visuals
  const [isHunterAttacking, setIsHunterAttacking] = useState<boolean>(false);
  const [isHunterHurt, setIsHunterHurt] = useState<boolean>(false);
  const [isMonsterAttacking, setIsMonsterAttacking] = useState<boolean>(false);
  const [isMonsterHurt, setIsMonsterHurt] = useState<boolean>(false);
  const [isMonsterEvading, setIsMonsterEvading] = useState<boolean>(false);
  const [activeVFX, setActiveVFX] = useState<VFXType>(null);
  const [groundImpactActive, setGroundImpactActive] = useState<boolean>(false);
  const [groundImpactIntensity, setGroundImpactIntensity] = useState<'normal' | 'heavy' | 'colossal'>('heavy');
  const [screenShake, setScreenShake] = useState<boolean>(false);
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
  const [combatLogs, setCombatLogs] = useState<string[]>([]);
  const [lootResult, setLootResult] = useState<{ exp: number; gold: number; drops: string[] } | null>(null);
  const [isLoadoutModalOpen, setIsLoadoutModalOpen] = useState<boolean>(false);

  const combatLogContainerRef = useRef<HTMLDivElement>(null);

  // Max 5 Equipped Skills for Battle Deck
  const equippedBattleSkills = skills.filter((s) => s.unlocked && s.equipped).slice(0, 5);

  useEffect(() => {
    if (combatLogContainerRef.current) {
      combatLogContainerRef.current.scrollTop = combatLogContainerRef.current.scrollHeight;
    }
  }, [combatLogs]);

  // Sync player combat stats when not in fight
  useEffect(() => {
    if (battleState === 'idle') {
      setPlayerCombatHp(stats.hp);
      setPlayerCombatMp(stats.mp);
    }
  }, [stats.hp, stats.mp, battleState]);

  const addFloatingText = (text: string, type: FloatingText['type'], target: 'boss' | 'player' = 'boss') => {
    const id = Date.now() + Math.random();
    const x = target === 'boss' ? 45 + (Math.random() * 20 - 10) : 30 + (Math.random() * 20 - 10);
    const y = target === 'boss' ? 35 + (Math.random() * 15 - 7) : 50 + (Math.random() * 15 - 7);

    setFloatingTexts((prev) => [...prev, { id, text, type, x, y }]);
    setTimeout(() => {
      setFloatingTexts((prev) => prev.filter((item) => item.id !== id));
    }, 1200);
  };

  const triggerVFX = (type: VFXType, duration = 800) => {
    setActiveVFX(type);
    setTimeout(() => setActiveVFX(null), duration);
  };

  const triggerGroundImpact = (intensity: 'normal' | 'heavy' | 'colossal' = 'heavy') => {
    setGroundImpactIntensity(intensity);
    setGroundImpactActive(true);
    setTimeout(() => setGroundImpactActive(false), 950);
  };

  const triggerScreenShake = () => {
    setScreenShake(true);
    setTimeout(() => setScreenShake(false), 450);
  };

  // Start Dungeon Raid
  const startRaid = (gate: DungeonGate) => {
    soundFx.playSystemNotification();
    soundFx.setBgmMode('epic');
    onRaidStateChange?.(true);

    const totalWaves = calculateTotalWaves(gate);
    setActiveGate(gate);
    setCurrentWave(1);
    setTotalWavesCount(totalWaves);

    const waveData = getWaveEnemyData(gate, 1, totalWaves);
    setEnemyMaxHp(waveData.maxHp);
    setEnemyCurrentHp(waveData.maxHp);
    setEnemyName(waveData.name);
    setEnemyTitle(waveData.title);
    setEnemyRole(waveData.role);
    setEnemyDodgeRate(waveData.dodgeRate);
    setEnemyRage(0);

    setPlayerCombatHp(stats.hp);
    setPlayerCombatMp(stats.mp);
    setTurnCount(1);
    setCurrentTurn('player');
    setIsActing(false);
    setIsEnemyStunned(false);
    setIsStealthed(false);
    setIsGuarding(false);
    setPoisonTurnsRemaining(0);
    setSkillCooldownTurns({});
    setCombatLogs([
      `[TIẾN VÀO CỔNG]: ${gate.name} (Độ khó: ${gate.rank})`,
      `[HỆ THỐNG]: Đợt 1/${totalWaves} bắt đầu! Đã nạp ${equippedBattleSkills.length} kỹ năng xuất chiến.`,
    ]);
    setBattleState('fighting');
  };

  // Start Tower Floor Battle
  const startTowerFloor = (floor: number) => {
    const isBossFloor = floor % 5 === 0;
    const baseHp = 400 + floor * 350;
    const baseAtk = 25 + floor * 22;
    const baseDef = 8 + floor * 8;
    const totalWaves = isBossFloor ? 5 : 3;

    const fakeGate: DungeonGate = {
      id: `tower-floor-${floor}`,
      name: `Tháp Vô Cực - Tầng ${floor} ${isBossFloor ? '[TẦNG TRÙM]' : ''}`,
      rank: floor > 50 ? 'MYTHIC' : floor > 30 ? 'S' : floor > 15 ? 'A' : floor > 8 ? 'B' : 'C',
      bossName: isBossFloor ? `Chúa Tể Tầng ${floor}: Ma Vương Bóng Đêm` : `Thủ Hộ Giả Tầng ${floor}`,
      bossTitle: `Canh Giữ Phong Ấn Tầng ${floor}`,
      bossHp: baseHp,
      bossMaxHp: baseHp,
      bossAttack: baseAtk,
      bossDefense: baseDef,
      expReward: 200 + floor * 180,
      goldReward: 400 + floor * 300,
      possibleDrops: ['Bảo Thạch Hư Không', 'Mảnh Vỡ Tháp Vô Cực', 'Huyết Tinh Năng Lượng'],
      description: `Thử thách giới hạn tột cùng của thợ săn tại tầng ${floor} Tháp Vô Cực.`,
      minLevel: Math.max(1, Math.floor(floor * 1.2)),
      totalWaves,
      dungeonType: 'tower',
    };

    startRaid(fakeGate);
  };

  // In-Combat Potion Quick-Use
  const handleUsePotionInCombat = () => {
    if (battleState !== 'fighting' || currentTurn !== 'player' || isActing || !activeGate || waveTransitionMessage) return;

    if (recoveryPotionsCount <= 0) {
      soundFx.playFatigueAlert();
      addFloatingText('HẾT BÌNH HỒI PHỤC!', 'status', 'player');
      return;
    }

    if (playerCombatHp >= stats.maxHp && playerCombatMp >= stats.maxMp) {
      soundFx.playFatigueAlert();
      addFloatingText('HP & MP ĐÃ ĐẦY!', 'status', 'player');
      return;
    }

    const success = onUseBattlePotion();
    if (success) {
      soundFx.playPotion();
      setPlayerCombatHp(stats.maxHp);
      setPlayerCombatMp(stats.maxMp);
      addFloatingText('+100% HP & MP HỒI PHỤC!', 'heal', 'player');
      setCombatLogs((prev) => [
        ...prev,
        `[DƯỢC LIỆU]: Bạn đã uống Bình Hồi Phục Toàn Phần! Khôi phục 100% HP (${stats.maxHp}) và 100% MP (${stats.maxMp})!`,
      ]);
    }
  };

  // Basic Attack
  const handleBasicAttack = () => {
    if (battleState !== 'fighting' || currentTurn !== 'player' || isActing || !activeGate || waveTransitionMessage) return;

    setIsActing(true);
    setIsHunterAttacking(true);
    soundFx.playSlash();
    triggerVFX('basic_slash', 500);

    // Dynamic Monster Evade Chance Check based on Monster Agility
    const isEvaded = Math.random() < (enemyDodgeRate / 100);

    setTimeout(() => {
      setIsHunterAttacking(false);

      if (isEvaded) {
        setIsMonsterEvading(true);
        soundFx.playEvadeSound(); // Wind whoosh evasion sound
        triggerVFX('monster_evade', 650);
        addFloatingText('MISS!', 'status', 'boss'); // Neon MISS! text
        setCombatLogs((prev) => [
          ...prev,
          `[NÉ TRÁNH - MISS]: ${enemyName} đã kích hoạt Thân Pháp Mờ Ảo né tránh hoàn toàn đòn đánh! (Tỷ lệ né: ${enemyDodgeRate}%)`,
        ]);
        setTimeout(() => setIsMonsterEvading(false), 650);

        setTimeout(() => {
          advanceToEnemyTurn(enemyCurrentHp);
        }, 600);
        return;
      }

      setIsMonsterHurt(true);
      triggerScreenShake();
      triggerGroundImpact('normal');

      const baseDmg = Math.round(stats.strength * 1.3 + stats.agility * 0.8 + 15);
      const isCrit = isStealthed || Math.random() < (stats.perception * 0.005 + 0.15);
      const critMulti = isStealthed ? 2.5 : 1.8;
      const rawDmg = isCrit ? Math.round(baseDmg * critMulti) : baseDmg;
      const damage = Math.max(12, rawDmg - Math.round(getWaveEnemyData(activeGate, currentWave, totalWavesCount).defense * 0.3));

      soundFx.playCrit();
      addFloatingText(isCrit ? `BẠO KÍCH! -${damage}` : `-${damage}`, isCrit ? 'crit' : 'damage', 'boss');

      setCombatLogs((prev) => [
        ...prev,
        `[ĐÒN ĐÁNH]: Bạn vung dao găm chém trúng ${enemyName}, gây ${damage} sát thương ${isCrit ? '(BẠO KÍCH!)' : ''}.`,
      ]);

      const nextEnemyHp = Math.max(0, enemyCurrentHp - damage);
      setEnemyCurrentHp(nextEnemyHp);
      setEnemyRage((prev) => Math.min(100, prev + Math.floor(damage / 12) + 5));

      setTimeout(() => setIsMonsterHurt(false), 300);

      if (nextEnemyHp <= 0) {
        handleWaveClear();
      } else {
        setTimeout(() => {
          advanceToEnemyTurn(nextEnemyHp);
        }, 600);
      }
    }, 350);
  };

  // Cast Skill in Dungeon (Only Unlocked & Equipped in 5-deck)
  const useSkillById = (skill: Skill) => {
    if (battleState !== 'fighting' || currentTurn !== 'player' || isActing || !activeGate || waveTransitionMessage) return;
    if (playerCombatMp < skill.mpCost) {
      soundFx.playFatigueAlert();
      addFloatingText('HẾT MANA!', 'status', 'player');
      return;
    }

    const currentCd = skillCooldownTurns[skill.id] || 0;
    if (currentCd > 0) {
      soundFx.playFatigueAlert();
      addFloatingText(`HỒI CHIÊU: ${currentCd} HIỆP`, 'status', 'player');
      return;
    }

    setIsActing(true);
    setIsHunterAttacking(true);
    setPlayerCombatMp((prev) => Math.max(0, prev - skill.mpCost));

    // Put skill on cooldown
    setSkillCooldownTurns((prev) => ({
      ...prev,
      [skill.id]: 2 + skill.level,
    }));

    const skId = skill.id;

    if (skId === 'skill-slash') {
      soundFx.playSlash();
      triggerVFX('basic_slash', 750);
      triggerGroundImpact('heavy');
    } else if (skId === 'skill-dagger-throw') {
      soundFx.playSlash();
      triggerVFX('dagger_throw', 800);
      triggerGroundImpact('heavy');
    } else if (skId === 'skill-rasaka-fang') {
      soundFx.playVenom();
      triggerVFX('venom_strike', 850);
      triggerGroundImpact('heavy');
      setPoisonTurnsRemaining(3);
    } else if (skId === 'skill-mutilate') {
      soundFx.playSlash();
      triggerVFX('mutilate_x', 850);
      triggerGroundImpact('colossal');
    } else if (skId === 'skill-kamish-wrath') {
      soundFx.playBossRoar();
      triggerVFX('kamish_wrath', 950);
      triggerGroundImpact('colossal');
    } else if (skId === 'skill-shadow-step') {
      soundFx.playStealth();
      triggerVFX('shadow_step', 750);
      setIsStealthed(true);
      addFloatingText('BỘ PHÁP BÓNG ĐÊM!', 'status', 'player');
    } else if (skId === 'skill-stealth') {
      soundFx.playStealth();
      triggerVFX('stealth_invisible', 850);
      setIsStealthed(true);
      addFloatingText('TÀNG HÌNH ẨN THÂN!', 'status', 'player');
    } else if (skId === 'skill-bloodlust') {
      soundFx.playBossRoar();
      triggerVFX('bloodlust_aura', 850);
      addFloatingText('SÁT KHÍ ÁP ĐẢO!', 'status', 'boss');
    } else if (skId === 'skill-quicksilver') {
      soundFx.playStealth();
      triggerVFX('quicksilver', 800);
      addFloatingText('TỐC BỘ THẦN TỐC!', 'status', 'player');
    } else if (skId === 'skill-authority') {
      soundFx.playAuthority();
      triggerVFX('ruler_authority', 900);
      triggerGroundImpact('colossal');
      setIsEnemyStunned(true);
      addFloatingText('CHOÁNG VÁNG!', 'status', 'boss');
    } else if (skId === 'skill-spatial-collapse') {
      soundFx.playAuthority();
      triggerVFX('spatial_collapse', 900);
      triggerGroundImpact('colossal');
    } else if (skId === 'skill-shadow-exchange') {
      soundFx.playStealth();
      triggerVFX('shadow_exchange', 800);
      setIsStealthed(true);
      addFloatingText('HOÁN ĐỔI BÓNG TỐI!', 'status', 'player');
    } else if (skId === 'skill-arise') {
      soundFx.playArise();
      triggerVFX('arise', 1100);
      triggerGroundImpact('colossal');
    } else if (skId === 'skill-shadow-extraction') {
      soundFx.playArise();
      triggerVFX('shadow_extraction', 900);
      triggerGroundImpact('heavy');
    } else if (skId === 'skill-monarch-domain') {
      soundFx.playArise();
      triggerVFX('monarch_domain', 1000);
      triggerGroundImpact('colossal');
    } else if (skId === 'skill-shadow-armor') {
      soundFx.playGuardSound();
      triggerVFX('shadow_armor', 800);
      addFloatingText('HẮC GIÁP HỘ THỂ!', 'status', 'player');
    } else if (skId === 'skill-dragon-fear') {
      soundFx.playBossRoar();
      triggerVFX('dragon_fear', 900);
      setIsEnemyStunned(true);
      addFloatingText('LONG UY UY ÁP!', 'status', 'boss');
    } else if (skId === 'skill-dragon-breath') {
      soundFx.playBossRoar();
      triggerVFX('dragon_breath', 1000);
      triggerGroundImpact('colossal');
    } else if (skId === 'skill-demon-lightning') {
      soundFx.playAuthority();
      triggerVFX('demon_lightning', 850);
      triggerGroundImpact('colossal');
      setIsEnemyStunned(true);
      addFloatingText('LÔI QUANG CHOÁNG!', 'status', 'boss');
    } else if (skId === 'skill-void-cleave') {
      soundFx.playSlash();
      triggerVFX('void_cleave', 950);
      triggerGroundImpact('colossal');
    } else {
      soundFx.playSlash();
      triggerVFX('basic_slash', 750);
      triggerGroundImpact('heavy');
    }

    setTimeout(() => {
      setIsHunterAttacking(false);
      setIsMonsterHurt(true);
      triggerScreenShake();

      const baseSkillDmg = Math.round((stats.strength * 1.5 + stats.intelligence * 1.2 + 25) * skill.damageMultiplier);
      const isCrit = isStealthed || Math.random() < 0.35;
      const damage = isCrit ? Math.round(baseSkillDmg * 2.2) : baseSkillDmg;

      soundFx.playCrit();
      addFloatingText(isCrit ? `BẠO KÍCH! -${damage}` : `-${damage}`, 'crit', 'boss');
      setCombatLogs((prev) => [
        ...prev,
        `[KỸ NĂNG: ${skill.vietnameseName}]: Gây ${damage} sát thương ${isCrit ? '(SIÊU BẠO KÍCH!)' : ''} lên ${enemyName}!`,
      ]);

      const nextEnemyHp = Math.max(0, enemyCurrentHp - damage);
      setEnemyCurrentHp(nextEnemyHp);
      setEnemyRage((prev) => Math.min(100, prev + 15));

      setTimeout(() => setIsMonsterHurt(false), 350);

      if (nextEnemyHp <= 0) {
        handleWaveClear();
      } else {
        setTimeout(() => {
          advanceToEnemyTurn(nextEnemyHp);
        }, 650);
      }
    }, 450);
  };

  // Guard Action
  const handleGuardAction = () => {
    if (battleState !== 'fighting' || currentTurn !== 'player' || isActing || !activeGate || waveTransitionMessage) return;

    soundFx.playGuardSound();
    setIsGuarding(true);
    addFloatingText('THỦ VỮNG -65%', 'status', 'player');
    setCombatLogs((prev) => [...prev, `[PHÒNG THỦ]: Bạn vào thế thủ vững chắc, giảm 65% sát thương nhận vào hiệp này!`]);
    advanceToEnemyTurn(enemyCurrentHp);
  };

  // Advance to Enemy Turn
  const advanceToEnemyTurn = (latestEnemyHp: number) => {
    setCurrentTurn('boss');
    setIsActing(true);

    const delay = fastSpeed ? 350 : 700;
    setTimeout(() => {
      executeEnemyAction(latestEnemyHp);
    }, delay);
  };

  // Execute Enemy Action with Multi-Hit Combos
  const executeEnemyAction = (latestEnemyHp: number) => {
    if (!activeGate || battleState !== 'fighting') return;

    if (isStealthed) {
      setIsStealthed(false);
      soundFx.playEvadeSound();
      addFloatingText('NÉ ĐÒN THÀNH CÔNG!', 'heal', 'player');
      setCombatLogs((prev) => [...prev, `[NÉ TRÁNH]: Nhờ hiệu ứng Tàng Hình, bạn đã hoàn toàn né tránh đòn đánh của ${enemyName}!`]);
      endEnemyTurn();
      return;
    }

    if (isEnemyStunned) {
      setIsEnemyStunned(false);
      soundFx.playSystemNotification();
      addFloatingText('QUÁI BỊ CHOÁNG!', 'status', 'boss');
      setCombatLogs((prev) => [...prev, `[TRẠNG THÁI]: ${enemyName} đang bị Choáng Váng và mất lượt hành động!`]);
      endEnemyTurn();
      return;
    }

    // Determine Combo Type
    const isBoss = enemyRole === 'boss';
    const isRageMax = enemyRage >= 100;
    const waveStats = getWaveEnemyData(activeGate, currentWave, totalWavesCount);

    const comboRoll = Math.random();
    let numHits = 1;
    let comboName = 'Đòn Đánh Đơn';

    if (isRageMax) {
      numHits = 3;
      comboName = 'BÙNG NỔ NỘ KHÍ DIỆT THẾ [3 HITS]';
      setEnemyRage(0);
    } else if (isBoss && comboRoll > 0.45) {
      numHits = 3;
      comboName = 'Liên Hoàn Trảm Vũ Trụ [3 HITS]';
    } else if (comboRoll > 0.4) {
      numHits = 2;
      comboName = 'Song Vuốt Xé Rách [2 HITS]';
    }

    setIsMonsterAttacking(true);
    soundFx.playBossRoar();
    triggerVFX(isBoss ? 'boss_combo' : 'boss_claw', 800);

    setCombatLogs((prev) => [
      ...prev,
      `[TẤN CÔNG]: ${enemyName} tung chiêu [${comboName}] dồn dập vào bạn!`,
    ]);

    let totalDamageDealt = 0;
    let hitsExecuted = 0;

    const executeSingleHit = () => {
      hitsExecuted++;
      setIsHunterHurt(true);
      triggerScreenShake();
      soundFx.playHit();

      const rawAtk = waveStats.attack + (hitsExecuted * 6);
      const defMitigation = Math.round(stats.vitality * 0.7);
      let hitDmg = Math.max(8, rawAtk - defMitigation);

      if (isGuarding) {
        hitDmg = Math.round(hitDmg * 0.35);
      }

      totalDamageDealt += hitDmg;
      addFloatingText(`HIT ${hitsExecuted}: -${hitDmg}`, 'boss_damage', 'player');

      setPlayerCombatHp((prev) => {
        const nextHp = Math.max(0, prev - hitDmg);
        if (nextHp <= 0) {
          handlePlayerDefeat();
        }
        return nextHp;
      });

      setTimeout(() => setIsHunterHurt(false), 200);

      if (hitsExecuted < numHits) {
        setTimeout(executeSingleHit, fastSpeed ? 200 : 350);
      } else {
        setIsMonsterAttacking(false);
        setIsGuarding(false);
        setTimeout(endEnemyTurn, 400);
      }
    };

    setTimeout(executeSingleHit, 300);
  };

  const endEnemyTurn = () => {
    // Tick cooldowns
    setSkillCooldownTurns((prev) => {
      const updated: Record<string, number> = {};
      for (const [k, v] of Object.entries(prev)) {
        if (v > 1) updated[k] = v - 1;
      }
      return updated;
    });

    // Mana natural regeneration
    setPlayerCombatMp((prev) => Math.min(stats.maxMp, prev + 5));

    setTurnCount((t) => t + 1);
    setCurrentTurn('player');
    setIsActing(false);
  };

  // Wave Clear & Boss Victory Handler
  const handleWaveClear = () => {
    if (!activeGate) return;

    if (currentWave < totalWavesCount) {
      // Advance to next wave
      const nextWave = currentWave + 1;
      soundFx.playLevelUp();
      setWaveTransitionMessage(`ĐÃ DỌN SẠCH ĐỢT ${currentWave}/${totalWavesCount}! ĐỢT TIẾP THEO ĐANG TRÀN VÀO...`);

      setTimeout(() => {
        setCurrentWave(nextWave);
        const nextWaveData = getWaveEnemyData(activeGate, nextWave, totalWavesCount);
        setEnemyMaxHp(nextWaveData.maxHp);
        setEnemyCurrentHp(nextWaveData.maxHp);
        setEnemyName(nextWaveData.name);
        setEnemyTitle(nextWaveData.title);
        setEnemyRole(nextWaveData.role);
        setEnemyDodgeRate(nextWaveData.dodgeRate);
        setEnemyRage(0);
        setWaveTransitionMessage(null);
        setIsActing(false);
        setCurrentTurn('player');
        setCombatLogs((prev) => [
          ...prev,
          `==============================`,
          `[ĐỢT MỚI]: ${nextWaveData.name} xuất hiện! Sẵn sàng chiến đấu!`,
        ]);
      }, 1500);
    } else {
      // Dungeon Cleared Completely!
      handleRaidVictory();
    }
  };

  const handleRaidVictory = () => {
    if (!activeGate) return;

    soundFx.playVictoryFanfare();
    soundFx.setBgmMode('ambient');
    setBattleState('victory');

    if (activeGate.dungeonType === 'tower') {
      setTowerFloor((f) => f + 1);
      setTowerMaxCleared((m) => Math.max(m, towerFloor));
    }

    const rewards = {
      exp: activeGate.expReward,
      gold: activeGate.goldReward,
      drops: activeGate.possibleDrops,
    };
    setLootResult(rewards);
    onVictory(activeGate, rewards);
  };

  const handlePlayerDefeat = () => {
    soundFx.playFatigueAlert();
    soundFx.setBgmMode('ambient');
    setBattleState('defeat');
    onDefeat();
  };

  const handleExitRaid = () => {
    soundFx.setBgmMode('ambient');
    onRaidStateChange?.(false);
    setBattleState('idle');
    setActiveGate(null);
  };

  // Filtered Gates for standard dungeon mode
  const filteredGates = dungeons.filter((g) => {
    if (selectedRank === 'ALL') return true;
    return g.rank === selectedRank;
  });

  return (
    <div className={`w-full max-w-7xl mx-auto p-1.5 sm:p-4 box-border space-y-3 sm:space-y-4 ${screenShake ? 'animate-screen-shake' : ''}`}>
      {/* VFX Overlay Container */}
      <CombatVFX activeVFX={activeVFX} />

      {/* Floating Damage & Status Texts */}
      {floatingTexts.map((ft) => (
        <div
          key={ft.id}
          className={`fixed pointer-events-none z-[110] font-black font-orbitron transition-all duration-700 animate-float-text text-sm sm:text-lg ${
            ft.type === 'crit'
              ? 'text-yellow-300 drop-shadow-[0_0_12px_rgba(234,179,8,0.9)] text-lg sm:text-2xl scale-125'
              : ft.type === 'heal'
              ? 'text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]'
              : ft.type === 'boss_damage'
              ? 'text-red-500 drop-shadow-[0_0_12px_rgba(239,68,68,0.9)]'
              : ft.type === 'status'
              ? 'text-cyan-300 drop-shadow-[0_0_10px_rgba(0,229,255,0.8)]'
              : 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]'
          }`}
          style={{ left: `${ft.x}%`, top: `${ft.y}%` }}
        >
          {ft.text}
        </div>
      ))}

      {/* ========================================================================= */}
      {/* STATE 1: BROWSE MODES & GATES (When not fighting) */}
      {/* ========================================================================= */}
      {battleState === 'idle' && (
        <div className="space-y-4">
          {/* Header Banner */}
          <div className="system-window p-4 sm:p-6 rounded-sm relative overflow-hidden">
            <div className="hud-corner-tl" />
            <div className="hud-corner-tr" />
            <div className="hud-corner-bl" />
            <div className="hud-corner-br" />

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pb-3 border-b border-cyan-500/20">
              <div>
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono tracking-widest uppercase">
                  <span>HỆ THỐNG CHIẾN TRƯỜNG & HẦM NGỤC / 4 CHẾ ĐỘ MỚI CỰC XỊN</span>
                </div>
                <h1 className="text-xl sm:text-3xl font-black text-white font-chakra tracking-wide mt-1 flex items-center gap-2">
                  <DungeonIcon className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400 shrink-0" />
                  <span>HUNTER GATES & DUNGEON EXPEDITION</span>
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  Chinh phục 41+ Cổng Hầm Ngục thức tỉnh, thử thách Tháp Vô Cực 100 tầng, Đột kích Trùm Thế Giới và Đấu Trường Thợ Săn.
                </p>
              </div>

              {/* Recovery Potion Quick Indicator */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-950 border border-cyan-500/30 rounded-xs">
                <PotionIcon className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-slate-300 font-chakra">Bình Hồi Phục:</span>
                <span className="text-xs font-mono font-bold text-emerald-300">{recoveryPotionsCount}</span>
              </div>
            </div>

            {/* Game Mode Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
              {[
                { id: 'gates', label: 'CỔNG HẦM NGỤC', icon: '🌀', desc: '41 Cổng Hạng E → Mythic' },
                { id: 'tower', label: 'THÁP VÔ CỰC', icon: '🗼', desc: 'Leo 100 Tầng Thử Thách' },
                { id: 'world_boss', label: 'TRÙM THẾ GIỚI', icon: '🐉', desc: 'Kamish & Antares' },
                { id: 'arena', label: 'ĐẤU TRƯỜNG PVP', icon: '⚔️', desc: 'Đấu Thợ Săn Hạng S' },
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => {
                    soundFx.playClick();
                    setActiveMode(mode.id as DungeonGameMode);
                  }}
                  className={`p-3 rounded-xs border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    activeMode === mode.id
                      ? 'bg-gradient-to-br from-cyan-950/90 to-blue-950/90 border-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.4)] text-white'
                      : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{mode.icon}</span>
                    <span className="font-bold font-chakra text-xs tracking-wider">{mode.label}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono mt-1">{mode.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 5-Skill Loadout Quick Selection Deck */}
          <div className="p-3 bg-gradient-to-r from-slate-950 via-cyan-950/60 to-slate-950 border border-cyan-500/40 rounded-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2.5 pb-2 border-b border-cyan-500/20">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs font-bold font-chakra text-cyan-200 uppercase tracking-wide">
                  BỘ 5 KỸ NĂNG XUẤT CHIẾN ({equippedBattleSkills.length}/5 ĐÃ TRANG BỊ)
                </span>
              </div>
              
              <button
                onClick={() => {
                  soundFx.playClick();
                  setIsLoadoutModalOpen(true);
                }}
                className="px-2.5 py-1 bg-cyan-950/90 hover:bg-cyan-900 border border-cyan-400 text-cyan-200 font-bold font-chakra text-[11px] rounded-xs cursor-pointer shadow-[0_0_10px_rgba(0,229,255,0.3)] transition-all flex items-center gap-1.5"
              >
                <span>⚙️ QUẢN LÝ 5 Ô KỸ NĂNG</span>
                <span className="text-[10px] text-cyan-300 font-mono">({skills.filter(s => s.unlocked).length} Đã Mở)</span>
              </button>
            </div>

            {/* Quick 5 Slots Visualization */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[0, 1, 2, 3, 4].map((slotIdx) => {
                const sk = equippedBattleSkills[slotIdx];
                if (sk) {
                  return (
                    <div
                      key={sk.id}
                      onClick={() => onToggleEquipSkill?.(sk.id)}
                      className="p-2 bg-slate-900/90 hover:bg-slate-850 border border-cyan-400/60 rounded-xs cursor-pointer transition-all flex flex-col justify-between group"
                      title="Bấm để tháo khỏi đội hình"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono text-cyan-300 font-bold">SLOT {slotIdx + 1}</span>
                        <span className="text-[8px] font-mono text-slate-400 group-hover:text-red-400">✕ Tháo</span>
                      </div>
                      <div className="font-bold text-xs text-white font-chakra truncate mt-0.5">{sk.name}</div>
                      <div className="flex items-center justify-between text-[9px] font-mono text-cyan-300 mt-0.5">
                        <span>{sk.mpCost} MP</span>
                        <span className="text-amber-300">x{sk.damageMultiplier} ST</span>
                      </div>
                    </div>
                  );
                }
                return (
                  <div
                    key={`empty-dungeon-slot-${slotIdx}`}
                    onClick={() => {
                      soundFx.playClick();
                      setIsLoadoutModalOpen(true);
                    }}
                    className="p-2 bg-slate-950/40 border border-dashed border-cyan-500/30 rounded-xs flex flex-col items-center justify-center text-center cursor-pointer hover:border-cyan-400 transition-colors min-h-[52px]"
                  >
                    <span className="text-[10px] font-mono text-slate-500 font-bold">+ SLOT {slotIdx + 1} TRỐNG</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Loadout Modal Popup */}
          {isLoadoutModalOpen && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
              <div className="relative w-full max-w-4xl bg-slate-950 border border-cyan-500/80 rounded-sm shadow-[0_0_35px_rgba(0,229,255,0.4)] p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between pb-3 border-b border-cyan-500/30 mb-4">
                  <div className="flex items-center gap-2">
                    <SwordSlashIcon className="w-5 h-5 text-cyan-400" />
                    <h2 className="text-base sm:text-lg font-black text-white font-chakra">
                      QUẢN LÝ BỘ 5 KỸ NĂNG XUẤT CHIẾN (COMBAT LOADOUT)
                    </h2>
                  </div>
                  <button
                    onClick={() => setIsLoadoutModalOpen(false)}
                    className="px-3 py-1 bg-slate-900 border border-slate-700 hover:border-red-400 text-slate-300 hover:text-red-300 rounded-xs font-mono text-xs cursor-pointer"
                  >
                    ✕ ĐÓNG
                  </button>
                </div>

                <SkillLoadoutDeck
                  skills={skills}
                  onToggleEquipSkill={onToggleEquipSkill || (() => {})}
                  playerGold={stats.gold}
                  playerLevel={stats.level}
                />
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* MODE 1: STANDARD GATES (41 Gates with Rank Filter) */}
          {/* ========================================================================= */}
          {activeMode === 'gates' && (
            <div className="space-y-4">
              {/* Rank Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {['ALL', 'E', 'D', 'C', 'B', 'A', 'S', 'RED', 'MYTHIC'].map((rank) => (
                  <button
                    key={rank}
                    onClick={() => {
                      soundFx.playClick();
                      setSelectedRank(rank);
                    }}
                    className={`px-3 py-1.5 rounded-xs text-xs font-bold font-chakra border transition-all cursor-pointer whitespace-nowrap ${
                      selectedRank === rank
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-black shadow-[0_0_12px_rgba(0,229,255,0.5)]'
                        : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40'
                    }`}
                  >
                    {rank === 'ALL' ? 'TẤT CẢ (41 CỔNG)' : `HẠNG ${rank}`}
                  </button>
                ))}
              </div>

              {/* Gates Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredGates.map((gate) => {
                  const isLocked = stats.level < gate.minLevel;
                  const totalWaves = calculateTotalWaves(gate);

                  return (
                    <div
                      key={gate.id}
                      className={`system-window p-4 rounded-xs border relative flex flex-col justify-between transition-all ${
                        isLocked
                          ? 'opacity-60 border-slate-800 bg-slate-950/50'
                          : 'hover:border-cyan-400/80 hover:shadow-[0_0_20px_rgba(0,180,255,0.25)] bg-slate-950/80'
                      }`}
                    >
                      <div>
                        {/* Header Badge */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span
                            className={`px-2 py-0.5 text-[10px] font-black font-orbitron rounded-xs border ${
                              gate.rank === 'MYTHIC'
                                ? 'bg-amber-950 border-amber-400 text-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.4)]'
                                : gate.rank === 'RED'
                                ? 'bg-rose-950 border-red-500 text-red-300 animate-pulse'
                                : gate.rank === 'S'
                                ? 'bg-purple-950 border-purple-400 text-purple-300'
                                : gate.rank === 'A'
                                ? 'bg-blue-950 border-blue-400 text-blue-300'
                                : 'bg-slate-900 border-slate-700 text-slate-300'
                            }`}
                          >
                            HẠNG {gate.rank} · {totalWaves} ĐỢT QUÁI
                          </span>

                          <span className="text-[10px] font-mono text-cyan-400">
                            Cấp Yêu Cầu: {gate.minLevel}
                          </span>
                        </div>

                        <h3 className="text-sm font-bold text-white font-chakra truncate">
                          {gate.name}
                        </h3>

                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                          {gate.description}
                        </p>

                        {/* Boss Info Preview */}
                        <div className="mt-3 p-2 bg-slate-900/80 border border-slate-800 rounded-xs text-[11px] space-y-1">
                          <div className="flex items-center justify-between text-slate-300">
                            <span className="font-bold text-red-400 truncate">{gate.bossName}</span>
                            <span className="font-mono text-red-300">{gate.bossHp.toLocaleString()} HP</span>
                          </div>
                          <div className="flex items-center justify-between text-slate-400 text-[10px]">
                            <span>Thưởng EXP: +{gate.expReward.toLocaleString()}</span>
                            <span className="text-amber-400 font-bold">+{gate.goldReward.toLocaleString()} Vàng</span>
                          </div>
                        </div>
                      </div>

                      {/* Enter Dungeon Action Button */}
                      <button
                        onClick={() => {
                          if (isLocked) {
                            soundFx.playFatigueAlert();
                            return;
                          }
                          startRaid(gate);
                        }}
                        disabled={isLocked}
                        className={`w-full mt-3 py-2 px-3 rounded-xs font-chakra font-black text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                          isLocked
                            ? 'bg-slate-900 border border-slate-800 text-slate-500 cursor-not-allowed'
                            : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-slate-950 shadow-[0_0_15px_rgba(0,210,255,0.4)]'
                        }`}
                      >
                        <SwordSlashIcon className="w-4 h-4" />
                        <span>{isLocked ? `YÊU CẦU CẤP ${gate.minLevel}` : 'TIẾN VÀO ĐỘT KÍCH'}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* MODE 2: INFINITE SHADOW TOWER (100 Floors) */}
          {/* ========================================================================= */}
          {activeMode === 'tower' && (
            <div className="system-window p-4 sm:p-6 rounded-sm space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-cyan-500/20">
                <div>
                  <h2 className="text-lg font-black text-white font-chakra flex items-center gap-2">
                    <span>🗼 THÁP VÔ CỰC BÓNG TỐI [100 TẦNG]</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Mỗi tầng là một thử thách dũng khí. Cứ mỗi 5 tầng sẽ chạm trán Trùm Tối Cao canh giữ kho báu huyền thoại.
                  </p>
                </div>
                <div className="text-right font-mono text-xs">
                  <span className="text-slate-400">Tầng Hiện Tại: </span>
                  <span className="text-cyan-300 font-bold text-sm">Tầng {towerFloor}</span>
                  <span className="text-slate-500 ml-2">(Kỷ Lục: Tầng {towerMaxCleared})</span>
                </div>
              </div>

              {/* Tower Floor Ladder Preview */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[towerFloor, towerFloor + 1, towerFloor + 2].map((floor) => {
                  const isBoss = floor % 5 === 0;
                  return (
                    <div
                      key={floor}
                      className={`p-4 rounded-xs border flex flex-col justify-between ${
                        floor === towerFloor
                          ? 'bg-gradient-to-br from-cyan-950/80 to-blue-950/80 border-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.3)]'
                          : 'bg-slate-950/60 border-slate-800'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-bold text-cyan-300 font-orbitron">TẦNG {floor}</span>
                          {isBoss && (
                            <span className="px-1.5 py-0.2 bg-red-950 border border-red-500 text-red-300 text-[9px] font-bold rounded-xs animate-pulse">
                              TRÙM TẦNG
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-300 font-chakra">
                          {isBoss ? 'Thủ Hộ Ma Vương Cổ Đại' : `Bầy Quái Tháp Tầng ${floor}`}
                        </p>
                        <div className="mt-2 text-[10px] text-slate-400 font-mono">
                          HP Ước Tính: {(400 + floor * 350).toLocaleString()}
                        </div>
                      </div>

                      {floor === towerFloor && (
                        <button
                          onClick={() => startTowerFloor(floor)}
                          className="mt-3 w-full py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-bold font-chakra text-xs rounded-xs shadow-[0_0_15px_rgba(0,210,255,0.5)] cursor-pointer"
                        >
                          KHIÊU CHIẾN TẦNG {floor}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* MODE 3: WORLD BOSS RAID */}
          {/* ========================================================================= */}
          {activeMode === 'world_boss' && (
            <div className="system-window p-4 sm:p-6 rounded-sm space-y-4">
              <div className="pb-3 border-b border-cyan-500/20">
                <h2 className="text-lg font-black text-red-400 font-chakra flex items-center gap-2">
                  <span>🐉 ĐỘT KÍCH TRÙM THẾ GIỚI (WORLD BOSS RAID)</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Các thực thể hùng mạnh bậc nhất vũ trụ: Long Đế Antares, Kamish, và Nữ Hoàng Querehsha.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {dungeons
                  .filter((g) => g.dungeonType === 'world_boss' || g.rank === 'MYTHIC')
                  .slice(0, 4)
                  .map((boss) => (
                    <div
                      key={boss.id}
                      className="p-4 bg-slate-950/80 border border-red-500/40 rounded-xs flex flex-col justify-between hover:border-red-400 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-bold text-red-400 font-chakra">{boss.bossName}</span>
                          <span className="text-[10px] font-mono text-amber-300 font-bold">
                            {boss.bossHp.toLocaleString()} HP
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">{boss.description}</p>
                      </div>

                      <button
                        onClick={() => startRaid(boss)}
                        className="mt-3 w-full py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold font-chakra text-xs rounded-xs shadow-[0_0_15px_rgba(239,68,68,0.5)] cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <SkullBossIcon className="w-4 h-4 text-white" />
                        <span>KHIÊU CHIẾN WORLD BOSS</span>
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* MODE 4: HUNTER ARENA PVP SIMULATION */}
          {/* ========================================================================= */}
          {activeMode === 'arena' && (
            <div className="system-window p-4 sm:p-6 rounded-sm space-y-4">
              <div className="pb-3 border-b border-cyan-500/20">
                <h2 className="text-lg font-black text-purple-400 font-chakra flex items-center gap-2">
                  <span>⚔️ ĐẤU TRƯỜNG THỢ SĂN (HUNTER RANK ARENA)</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Thách đấu bản sao của các Thợ Săn Hạng S & Cấp Quốc Gia để khẳng định ngôi vị Chúa Tể Tối Thượng.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { name: 'Thợ Săn Thomas Andre', title: 'Thợ Săn Cấp Quốc Gia - Vua Goliath', rank: 'National', hp: 45000, atk: 450, def: 250 },
                  { name: 'Thợ Săn Liu Zhigang', title: 'Kiếm Thánh Hạng 1 Trung Hoa', rank: 'National', hp: 42000, atk: 480, def: 210 },
                  { name: 'Thợ Săn Cha Hae-In', title: 'Phó Bang Chủ Hiệp Hội Hunters', rank: 'S', hp: 18000, atk: 260, def: 120 },
                  { name: 'Thợ Săn Baek Yoon-Ho', title: 'Chủ Bang Bạch Hổ (Hóa Ma Thú)', rank: 'S', hp: 22000, atk: 280, def: 140 },
                  { name: 'Thợ Săn Choi Jong-In', title: 'Pháp Sư Lửa Tối Thượng', rank: 'S', hp: 16000, atk: 340, def: 90 },
                ].map((hunter, idx) => {
                  const pvpGate: DungeonGate = {
                    id: `pvp-hunter-${idx}`,
                    name: `Đấu Trường: So Tài Với ${hunter.name}`,
                    rank: 'S',
                    bossName: hunter.name,
                    bossTitle: hunter.title,
                    bossHp: hunter.hp,
                    bossMaxHp: hunter.hp,
                    bossAttack: hunter.atk,
                    bossDefense: hunter.def,
                    expReward: 15000,
                    goldReward: 25000,
                    possibleDrops: ['Danh Hiệu Đấu Trường', 'Huy Chương Thợ Săn Hạng S'],
                    description: `Trận đấu giao hữu định đoạt thứ hạng thợ săn thế giới.`,
                    minLevel: 15,
                    totalWaves: 3,
                    dungeonType: 'standard',
                  };

                  return (
                    <div
                      key={hunter.name}
                      className="p-3 bg-slate-950/80 border border-purple-500/40 rounded-xs flex flex-col justify-between hover:border-purple-400 transition-all"
                    >
                      <div>
                        <span className="px-1.5 py-0.2 bg-purple-950 border border-purple-400 text-purple-300 text-[9px] font-bold rounded-xs font-mono">
                          HẠNG {hunter.rank}
                        </span>
                        <h3 className="font-bold text-sm text-white font-chakra mt-1">{hunter.name}</h3>
                        <p className="text-xs text-slate-400">{hunter.title}</p>
                        <div className="mt-2 text-[10px] text-slate-400 font-mono">
                          HP: {hunter.hp.toLocaleString()} · ATK: {hunter.atk}
                        </div>
                      </div>

                      <button
                        onClick={() => startRaid(pvpGate)}
                        className="mt-3 w-full py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold font-chakra text-xs rounded-xs cursor-pointer shadow-[0_0_12px_rgba(168,85,247,0.4)]"
                      >
                        THÁCH ĐẤU NGAY
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* STATE 2: FULLSCREEN TURN-BASED COMBAT ARENA (CLEAN, 100% NON-CLIPPED LAYOUT) */}
      {/* ========================================================================= */}
      {battleState === 'fighting' && activeGate && (
        <div className="w-full max-w-full flex flex-col gap-1.5 pb-20 overflow-y-auto max-h-[calc(100dvh-75px)] scrollbar-thin box-border">
          {/* 1. Header Bar: Gate Title, Wave Count, Speed Toggle & Exit */}
          <div className="p-1.5 sm:p-2 bg-slate-950/95 border border-cyan-500/30 rounded-xs flex items-center justify-between gap-2 text-xs shrink-0 shadow-sm">
            <div className="flex items-center gap-1.5 sm:gap-2 truncate min-w-0">
              <span className="font-black font-chakra text-cyan-300 text-xs sm:text-sm truncate">
                {activeGate.name}
              </span>
              <span className="px-1.5 py-0.2 bg-cyan-950 border border-cyan-400 text-cyan-300 text-[9px] sm:text-[10px] font-mono font-bold rounded-xs shrink-0">
                ĐỢT {currentWave}/{totalWavesCount}
              </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => setFastSpeed(!fastSpeed)}
                className={`px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-bold font-orbitron border rounded-xs cursor-pointer ${
                  fastSpeed ? 'bg-amber-950 border-amber-400 text-amber-300' : 'bg-slate-900 border-slate-700 text-slate-400'
                }`}
              >
                {fastSpeed ? '1.5x' : '1.0x'}
              </button>

              <button
                onClick={handleExitRaid}
                className="px-2 py-0.5 bg-slate-900 border border-slate-700 hover:border-red-400 text-[9px] sm:text-[10px] text-slate-300 hover:text-red-300 rounded-xs cursor-pointer"
              >
                RÚT LUI
              </button>
            </div>
          </div>

          {/* Wave Transition Overlay Message */}
          {waveTransitionMessage && (
            <div className="p-2 bg-gradient-to-r from-cyan-900/90 via-blue-900/90 to-purple-900/90 border border-cyan-400 rounded-xs text-center text-cyan-200 font-chakra font-black text-xs sm:text-sm animate-pulse shadow-[0_0_20px_rgba(0,229,255,0.7)] shrink-0">
              {waveTransitionMessage}
            </div>
          )}

          {/* 2. Holographic HP Bars Grid: Boss/Minion Holographic Bar on Top, Hunter on Bottom */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 shrink-0">
            {/* Enemy Holographic HP Bar */}
            <HolographicHPBar
              currentHp={enemyCurrentHp}
              maxHp={enemyMaxHp}
              label={enemyName}
              subLabel={enemyTitle}
              role={enemyRole}
              rage={enemyRage}
              showRage={true}
              dodgeRate={enemyDodgeRate}
              waveInfo={`ĐỢT ${currentWave}/${totalWavesCount}`}
            />

            {/* Hunter Holographic HP Bar */}
            <HolographicHPBar
              currentHp={playerCombatHp}
              maxHp={stats.maxHp}
              label="THỢ SĂN SUNG JIN-WOO"
              subLabel={`Hạng ${stats.rank} · ${stats.job}`}
              role="player"
            />
          </div>

          {/* 3. Battlefield Arena (Monster and Hunter Visuals + Ground Impact Effect + Ghosting) */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950/70 border border-slate-800 rounded-xs h-24 sm:h-32 items-center justify-center relative shrink-0 overflow-hidden">
            {/* Ground Impact Particle Dust & Shockwaves Component */}
            <GroundImpactEffect
              active={groundImpactActive}
              intensity={groundImpactIntensity}
              xPercent={25}
              yPercent={65}
            />

            {/* Monster Visual Model with Ghosting Evasion */}
            <div className="flex flex-col items-center justify-center relative z-10">
              <MonsterVisual
                gateId={activeGate.id}
                isHurt={isMonsterHurt}
                isAttacking={isMonsterAttacking}
                isRage={enemyRage >= 75}
                isStunned={isEnemyStunned}
                isDead={enemyCurrentHp <= 0}
                isEvading={isMonsterEvading}
                monsterRole={enemyRole}
                className="w-16 h-16 sm:w-24 sm:h-24"
              />
            </div>

            {/* Hunter Visual Model */}
            <div className="flex flex-col items-center justify-center relative z-10">
              <HunterVisual
                isAttacking={isHunterAttacking}
                isGuarding={isGuarding}
                isHurt={isHunterHurt}
                isStealthed={isStealthed}
                className="w-16 h-16 sm:w-24 sm:h-24"
              />
            </div>
          </div>

          {/* 4. Combat Actions & Skill Deck (Limited to 5 Equipped Skills + Basic/Guard/Potion) */}
          <div className="p-2 bg-slate-950/95 border border-cyan-500/30 rounded-xs space-y-1.5 shrink-0 shadow-lg">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold font-chakra text-cyan-300 text-[11px] sm:text-xs truncate">
                {currentTurn === 'player' ? '👉 LƯỢT CỦA BẠN: CHỌN ĐÒN ĐÁNH HOẶC DÙNG DƯỢC PHẨM' : '⏳ LƯỢT CỦA QUÁI VẬT...'}
              </span>
              <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] shrink-0">
                <span className="text-cyan-400 font-bold">MP: {playerCombatMp} / {stats.maxMp}</span>
              </div>
            </div>

            {/* Action Buttons Grid (Fits perfectly without overflow) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-1.5">
              {/* Basic Slash Attack */}
              <button
                onClick={handleBasicAttack}
                disabled={currentTurn !== 'player' || isActing}
                className="p-1.5 bg-gradient-to-b from-slate-900 to-slate-950 hover:from-cyan-950 hover:to-slate-900 border border-cyan-500/40 hover:border-cyan-400 rounded-xs text-left cursor-pointer disabled:opacity-50 transition-all flex flex-col justify-between shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <SwordSlashIcon className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-[9px] font-mono text-cyan-300">0 MP</span>
                </div>
                <div className="mt-0.5 font-bold text-[11px] sm:text-xs text-white font-chakra truncate">Chém Dao Găm</div>
                <span className="text-[8px] text-slate-400">Đòn Thường</span>
              </button>

              {/* Guard Action */}
              <button
                onClick={handleGuardAction}
                disabled={currentTurn !== 'player' || isActing}
                className="p-1.5 bg-gradient-to-b from-slate-900 to-slate-950 hover:from-blue-950 hover:to-slate-900 border border-blue-500/40 hover:border-blue-400 rounded-xs text-left cursor-pointer disabled:opacity-50 transition-all flex flex-col justify-between shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <ShieldDefendIcon className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-[9px] font-mono text-blue-300">0 MP</span>
                </div>
                <div className="mt-0.5 font-bold text-[11px] sm:text-xs text-white font-chakra truncate">Thủ Thế</div>
                <span className="text-[8px] text-slate-400">Giảm 65% ST</span>
              </button>

              {/* In-Combat Potion Quick-Use Button */}
              <button
                onClick={handleUsePotionInCombat}
                disabled={
                  currentTurn !== 'player' ||
                  isActing ||
                  recoveryPotionsCount <= 0 ||
                  (playerCombatHp >= stats.maxHp && playerCombatMp >= stats.maxMp)
                }
                className={`p-1.5 bg-gradient-to-b from-slate-900 to-slate-950 hover:from-emerald-950 hover:to-slate-900 border border-emerald-500/40 hover:border-emerald-400 rounded-xs text-left cursor-pointer disabled:opacity-50 transition-all flex flex-col justify-between shadow-sm ${
                  recoveryPotionsCount > 0 && (playerCombatHp < stats.maxHp * 0.4 || playerCombatMp < stats.maxMp * 0.3)
                    ? 'ring-1 ring-emerald-400 animate-pulse'
                    : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <PotionIcon className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[9px] sm:text-[10px] font-mono font-bold text-emerald-300">
                    x{recoveryPotionsCount}
                  </span>
                </div>
                <div className="mt-0.5 font-bold text-[11px] sm:text-xs text-white font-chakra truncate">
                  Hồi Phục Máu
                </div>
                <span className="text-[8px] sm:text-[9px] text-emerald-400 truncate">Hồi 100% HP/MP</span>
              </button>

              {/* Only 5 Equipped Battle Skills Displayed */}
              {equippedBattleSkills.map((skill) => {
                const cd = skillCooldownTurns[skill.id] || 0;
                const notEnoughMp = playerCombatMp < skill.mpCost;
                const disabled = currentTurn !== 'player' || isActing || cd > 0 || notEnoughMp;

                return (
                  <button
                    key={skill.id}
                    onClick={() => useSkillById(skill)}
                    disabled={disabled}
                    className={`p-1.5 rounded-xs border text-left cursor-pointer transition-all flex flex-col justify-between relative shadow-sm ${
                      disabled
                        ? 'bg-slate-950/80 border-slate-800 text-slate-500 opacity-60'
                        : 'bg-gradient-to-b from-slate-900 to-slate-950 hover:from-cyan-950 hover:to-slate-900 border-cyan-400 text-cyan-200'
                    }`}
                  >
                    {cd > 0 && (
                      <span className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center font-mono font-bold text-amber-300 text-[10px] rounded-xs">
                        HỒI: {cd}
                      </span>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold text-cyan-300">CẤP {skill.level}</span>
                      <span className="text-[9px] font-mono text-cyan-400">{skill.mpCost} MP</span>
                    </div>
                    <div className="mt-0.5 font-bold text-[11px] sm:text-xs text-white font-chakra truncate">
                      {skill.name}
                    </div>
                    <span className="text-[8px] sm:text-[9px] text-slate-400 truncate">x{skill.damageMultiplier} ST</span>
                  </button>
                );
              })}

              {/* Notice if player has not equipped skills */}
              {equippedBattleSkills.length === 0 && (
                <div className="col-span-2 p-1.5 bg-slate-950/60 border border-dashed border-slate-800 rounded-xs flex items-center justify-center text-[10px] font-chakra text-slate-400 text-center">
                  Chưa trang bị kỹ năng nào (Vào Hồ Sơ hoặc Cổng để lắp 5 kỹ năng)
                </div>
              )}
            </div>
          </div>

          {/* 5. Combat Log Box */}
          <div
            ref={combatLogContainerRef}
            className="p-1.5 bg-slate-950/85 border border-slate-800 rounded-xs max-h-[55px] sm:max-h-[70px] overflow-y-auto font-mono text-[9px] sm:text-[10px] space-y-0.5 text-slate-400 shrink-0"
          >
            {combatLogs.map((log, index) => (
              <div key={index} className="leading-tight">
                {log}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STATE 3: VICTORY SCREEN */}
      {/* ========================================================================= */}
      {battleState === 'victory' && activeGate && lootResult && (
        <div className="system-window p-6 rounded-sm text-center space-y-4 max-w-xl mx-auto border-2 border-cyan-400 shadow-[0_0_40px_rgba(0,229,255,0.6)]">
          <div className="w-16 h-16 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center mx-auto animate-bounce">
            <CheckIcon className="w-10 h-10 text-cyan-300" />
          </div>

          <h2 className="text-2xl font-black text-white font-chakra uppercase tracking-wider text-glow-blue">
            CHIẾN THẮNG HẦM NGỤC!
          </h2>
          <p className="text-xs text-slate-300">
            Bạn đã tiêu diệt hoàn toàn {activeGate.name} và chinh phục mọi đợt quái vật!
          </p>

          <div className="p-4 bg-slate-950 border border-cyan-500/30 rounded-xs space-y-2 text-xs">
            <div className="flex items-center justify-between text-cyan-300 font-mono">
              <span>EXP Nhận Được:</span>
              <span className="font-bold">+{lootResult.exp.toLocaleString()} EXP</span>
            </div>
            <div className="flex items-center justify-between text-amber-400 font-mono">
              <span>Vàng Thu Được:</span>
              <span className="font-bold">+{lootResult.gold.toLocaleString()} Vàng</span>
            </div>
            {lootResult.drops.length > 0 && (
              <div className="pt-2 border-t border-slate-800 text-left">
                <span className="text-slate-400 block text-[11px] mb-1">Vật Phẩm Rơi:</span>
                <div className="flex flex-wrap gap-1">
                  {lootResult.drops.map((drop, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-cyan-950 border border-cyan-500/50 text-cyan-200 text-[10px] rounded-xs font-mono">
                      {drop}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleExitRaid}
            className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-black font-chakra text-sm rounded-xs shadow-[0_0_20px_rgba(0,229,255,0.6)] cursor-pointer"
          >
            TIẾP TỤC HÀNH TRÌNH
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STATE 4: DEFEAT SCREEN */}
      {/* ========================================================================= */}
      {battleState === 'defeat' && (
        <div className="system-window p-6 rounded-sm text-center space-y-4 max-w-xl mx-auto border-2 border-red-500 shadow-[0_0_40px_rgba(239,68,68,0.6)]">
          <div className="w-16 h-16 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center mx-auto animate-pulse">
            <AlertGlyphIcon className="w-10 h-10 text-red-400" />
          </div>

          <h2 className="text-2xl font-black text-red-400 font-chakra uppercase tracking-wider">
            BẠN ĐÃ TỬ TRẬN TRONG ẢI!
          </h2>
          <p className="text-xs text-slate-400">
            Sức mạnh của kẻ thù vượt ngoài dự tính. Chỉ số mệt mỏi tăng lên và bạn buộc phải rút lui để hồi phục.
          </p>

          <button
            onClick={handleExitRaid}
            className="w-full py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black font-chakra text-sm rounded-xs shadow-[0_0_20px_rgba(239,68,68,0.6)] cursor-pointer"
          >
            RÚT LUI VỀ THÀNH PHỐ
          </button>
        </div>
      )}
    </div>
  );
};
