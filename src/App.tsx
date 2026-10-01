import React, { useState, useEffect, useCallback } from 'react';
import {
  TabType,
  PlayerStats,
  DailyQuestItem,
  CustomGoal,
  StreakReward,
  ShopItem,
  Skill,
  ShadowSoldier,
  DungeonGate,
  Novel,
  GrowthLog,
  AppSettings,
  TalentNode,
  TalentRankTier,
  MonsterMaterial,
} from './types';
import {
  INITIAL_PLAYER_STATS,
  INITIAL_DAILY_QUESTS,
  INITIAL_CUSTOM_GOALS,
  INITIAL_STREAK_REWARDS,
  INITIAL_SHOP_ITEMS,
  INITIAL_SKILLS,
  INITIAL_SHADOW_SOLDIERS,
  INITIAL_DUNGEONS,
  INITIAL_NOVELS,
  INITIAL_GROWTH_LOGS,
  getDailyShopSelection,
} from './data/initialData';
import {
  INITIAL_TALENT_NODES,
  INITIAL_TALENT_RANK_TIERS,
  INITIAL_MONSTER_MATERIALS,
} from './data/talentsData';
import { soundFx } from './utils/soundEffects';
import { HeaderHUD } from './components/HeaderHUD';
import { NavigationTabs } from './components/NavigationTabs';
import { StatusTab } from './components/tabs/StatusTab';
import { QuestTab } from './components/tabs/QuestTab';
import { TalentTab } from './components/tabs/TalentTab';
import { DungeonTab } from './components/tabs/DungeonTab';
import { ShopTab } from './components/tabs/ShopTab';
import { ProfileTab } from './components/tabs/ProfileTab';
import { NovelTab } from './components/tabs/NovelTab';
import { SettingsTab } from './components/tabs/SettingsTab';
import { PenaltyModal } from './components/modals/PenaltyModal';
import { NotificationModal, SystemNotificationItem } from './components/modals/NotificationModal';
import { ParticleEffect } from './components/effects/ParticleEffect';
import { ManaBurnEffect } from './components/effects/ManaBurnEffect';

export default function App() {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<TabType>('status');

  // Reset storage once if version is not v4_zero_start to ensure everything starts strictly from Level 1, 0 skills
  const APP_VERSION = 'v4_zero_start';
  if (typeof window !== 'undefined' && localStorage.getItem('sl_app_version') !== APP_VERSION) {
    localStorage.clear();
    localStorage.setItem('sl_app_version', APP_VERSION);
  }

  // Persistence loader helper
  const loadStorage = <T,>(key: string, fallback: T): T => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return fallback;
  };

  // State initialization - ALL FROM ZERO
  const [stats, setStats] = useState<PlayerStats>(() => loadStorage('sl_stats', INITIAL_PLAYER_STATS));
  const [dailyQuests, setDailyQuests] = useState<DailyQuestItem[]>(() => loadStorage('sl_daily_quests', INITIAL_DAILY_QUESTS));
  const [customGoals, setCustomGoals] = useState<CustomGoal[]>(() => loadStorage('sl_custom_goals', INITIAL_CUSTOM_GOALS));
  const [streak, setStreak] = useState<number>(() => loadStorage('sl_streak', 0));
  const [bestStreak, setBestStreak] = useState<number>(() => loadStorage('sl_best_streak', 0));
  const [lastDateStr, setLastDateStr] = useState<string>(() => loadStorage('sl_last_date', new Date().toDateString()));
  const [dailyRewardClaimed, setDailyRewardClaimed] = useState<boolean>(() => loadStorage('sl_daily_claimed', false));
  const [streakRewards, setStreakRewards] = useState<StreakReward[]>(() => loadStorage('sl_streak_rewards', INITIAL_STREAK_REWARDS));
  const [shopItems, setShopItems] = useState<ShopItem[]>(() => loadStorage('sl_shop', INITIAL_SHOP_ITEMS));
  const [skills, setSkills] = useState<Skill[]>(() => loadStorage('sl_skills', INITIAL_SKILLS));
  const [shadowArmy, setShadowArmy] = useState<ShadowSoldier[]>(() => loadStorage('sl_shadows', INITIAL_SHADOW_SOLDIERS));
  const [novels, setNovels] = useState<Novel[]>(() => loadStorage('sl_novels', INITIAL_NOVELS));
  const [growthLogs, setGrowthLogs] = useState<GrowthLog[]>(() => loadStorage('sl_logs', INITIAL_GROWTH_LOGS));
  const [talentNodes, setTalentNodes] = useState<TalentNode[]>(() => loadStorage('sl_talent_nodes', INITIAL_TALENT_NODES));
  const [talentRankTiers, setTalentRankTiers] = useState<TalentRankTier[]>(() => loadStorage('sl_talent_rank_tiers', INITIAL_TALENT_RANK_TIERS));
  const [monsterMaterials, setMonsterMaterials] = useState<MonsterMaterial[]>(() => loadStorage('sl_monster_materials', INITIAL_MONSTER_MATERIALS));

  const [settings, setSettings] = useState<AppSettings>(() =>
    loadStorage('sl_settings', {
      soundEnabled: true,
      sfxVolume: 0.8,
      screenShake: true,
      themeColor: 'blue',
      readingTheme: 'dark',
      fontSize: 16,
      autoNotifications: true,
    })
  );

  const [notifications, setNotifications] = useState<SystemNotificationItem[]>([
    {
      id: 'notif-welcome',
      timestamp: 'Khởi đầu',
      title: 'Hệ Thống Thức Tỉnh [Cấp 1 - Hạng E]',
      message: 'Chào mừng Người Chơi! Mọi kỹ năng, cấp độ, trang bị và quân đoàn của bạn bắt đầu từ con số 0. Hãy hoàn thành nhiệm vụ hàng ngày để mạnh mẽ hơn!',
      type: 'level',
    },
  ]);

  // Modal open states
  const [isPenaltyModalOpen, setIsPenaltyModalOpen] = useState(false);
  const [isNotifModalOpen, setIsNotifModalOpen] = useState(false);

  // Time remaining countdown to midnight
  const [timeRemainingStr, setTimeRemainingStr] = useState('00:00:00');
  const [isPenaltyWarning, setIsPenaltyWarning] = useState(false);

  // Level Up Toast
  const [levelUpMessage, setLevelUpMessage] = useState<string | null>(null);

  // Advanced Visual Effects: Violent Screen Shake & Dimensional Flash
  const [epicShake, setEpicShake] = useState(false);
  const [novaFlash, setNovaFlash] = useState<'cyan' | 'purple' | null>(null);
  const [streakUpdated, setStreakUpdated] = useState(false);
  const [isRaidActive, setIsRaidActive] = useState(false);
  const [particleActive, setParticleActive] = useState(false);
  const [particleType, setParticleType] = useState<'cyan' | 'gold' | 'purple' | 'rainbow'>('cyan');

  // Visual 'Mana Burn' effect on character when using skills or spending MP
  const [manaBurnActive, setManaBurnActive] = useState(false);
  const [manaBurnCost, setManaBurnCost] = useState(25);

  const handleTriggerManaBurn = useCallback((mpCost: number, skillName: string) => {
    setStats((prev) => {
      if (prev.mp < mpCost) return prev;
      return { ...prev, mp: Math.max(0, prev.mp - mpCost) };
    });
    setManaBurnCost(mpCost);
    setManaBurnActive(true);
    setTimeout(() => setManaBurnActive(false), 2000);
  }, []);

  // Sync BGM with Raid Status: Epic Orchestral in Dungeon, Ambient in Normal Tabs
  useEffect(() => {
    if (isRaidActive) {
      soundFx.setBgmMode('epic');
    } else {
      soundFx.setBgmMode('ambient');
    }
  }, [isRaidActive]);

  // Start BGM on first user interaction with the window
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (soundFx.getBgmEnabled() && soundFx.getBgmMode() === 'off') {
        soundFx.setBgmMode(isRaidActive ? 'epic' : 'ambient');
      }
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('pointerdown', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [isRaidActive]);

  // Daily Shop Auto-Reset & Rotating Stock
  useEffect(() => {
    const todayStr = new Date().toDateString();
    const lastShopReset = localStorage.getItem('sl_shop_last_reset_date');
    if (lastShopReset !== todayStr) {
      localStorage.setItem('sl_shop_last_reset_date', todayStr);
      setShopItems((prevOwned) => getDailyShopSelection(todayStr, prevOwned));
    }
  }, []);

  // Ensure all 22 active skills are populated and skills matching level requirements are unlocked
  useEffect(() => {
    setSkills((prevSaved) => {
      const mergedMap = new Map<string, Skill>();
      INITIAL_SKILLS.forEach((initSk) => mergedMap.set(initSk.id, initSk));

      prevSaved.forEach((savedSk) => {
        if (mergedMap.has(savedSk.id)) {
          const init = mergedMap.get(savedSk.id)!;
          mergedMap.set(savedSk.id, {
            ...init,
            level: savedSk.level || init.level,
            unlocked: savedSk.unlocked || init.unlocked,
            equipped: savedSk.equipped !== undefined ? savedSk.equipped : init.equipped,
          });
        } else {
          mergedMap.set(savedSk.id, savedSk);
        }
      });

      let equippedActiveCount = Array.from(mergedMap.values()).filter((s) => s.type === 'active' && s.unlocked && s.equipped).length;

      const updatedList = Array.from(mergedMap.values()).map((sk) => {
        const isMinLevelMet = sk.minLevelToUnlock && sk.minLevelToUnlock <= stats.level;
        const isDefaultSkill = sk.id === 'skill-slash' || sk.id === 'skill-passive-dagger-mastery';
        const isUnlockedNow = sk.unlocked || isMinLevelMet || isDefaultSkill;

        // Passive skills are infinitely equipped when unlocked
        if (sk.type === 'passive') {
          return {
            ...sk,
            unlocked: isUnlockedNow,
            equipped: isUnlockedNow,
          };
        }

        // Active combat skills (max 5 slots)
        if (!sk.unlocked && (isMinLevelMet || isDefaultSkill)) {
          const shouldEquip = equippedActiveCount < 5;
          if (shouldEquip) equippedActiveCount++;
          return { ...sk, unlocked: true, equipped: shouldEquip };
        }

        // Strictly enforce: locked active skills CANNOT be equipped in combat slots
        if (!isUnlockedNow) {
          return { ...sk, unlocked: false, equipped: false };
        }

        return sk;
      });

      return updatedList;
    });
  }, [stats.level]);

  // Auto-sync stats.rank with the highest unlocked talent rank tier
  useEffect(() => {
    const unlockedTiers = talentRankTiers.filter((t) => t.unlocked);
    if (unlockedTiers.length > 0) {
      const highestTier = unlockedTiers[unlockedTiers.length - 1];
      if (highestTier.rank !== stats.rank) {
        setStats((prev) => ({
          ...prev,
          rank: highestTier.rank as 'E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'National' | 'Monarch',
        }));
      }
    }
  }, [talentRankTiers]);
  const handleManualResetShop = useCallback(() => {
    const seed = new Date().toDateString() + '-' + Date.now();
    setShopItems((prevOwned) => getDailyShopSelection(seed, prevOwned));
  }, []);

  const triggerParticles = useCallback((type: 'cyan' | 'gold' | 'purple' | 'rainbow' = 'cyan') => {
    setParticleType(type);
    setParticleActive(true);
    setTimeout(() => setParticleActive(false), 2400);
  }, []);

  const [achievementPopup, setAchievementPopup] = useState<{
    type: 'streak' | 'quest' | 'milestone';
    title: string;
    subtitle: string;
    reward?: string;
  } | null>(null);

  // Trigger Complex CSS Animations (Screen Shake, Dimensional Flash, Shockwave)
  const triggerEpicMilestone = useCallback((
    type: 'streak' | 'quest' | 'milestone',
    title: string,
    subtitle: string,
    reward?: string
  ) => {
    // 1. Violent Screen Shake
    if (settings.screenShake) {
      setEpicShake(true);
      setTimeout(() => setEpicShake(false), 800);
    }

    // 2. Fullscreen Nova Flash & Flying Crystal Particle Shards
    setNovaFlash(type === 'milestone' ? 'purple' : 'cyan');
    setTimeout(() => setNovaFlash(null), 1050);
    triggerParticles(type === 'milestone' ? 'purple' : type === 'streak' ? 'gold' : 'cyan');

    // 3. Streak Surge Highlight
    if (type === 'streak' || type === 'milestone') {
      setStreakUpdated(true);
      setTimeout(() => setStreakUpdated(false), 4000);
    }

    // 4. Milestone Holographic Shockwave Banner
    setAchievementPopup({ type, title, subtitle, reward });
    setTimeout(() => setAchievementPopup(null), 4200);
  }, [settings.screenShake, triggerParticles]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('sl_stats', JSON.stringify(stats));
  }, [stats]);
  useEffect(() => {
    localStorage.setItem('sl_daily_quests', JSON.stringify(dailyQuests));
  }, [dailyQuests]);
  useEffect(() => {
    localStorage.setItem('sl_custom_goals', JSON.stringify(customGoals));
  }, [customGoals]);
  useEffect(() => {
    localStorage.setItem('sl_streak', JSON.stringify(streak));
  }, [streak]);
  useEffect(() => {
    localStorage.setItem('sl_best_streak', JSON.stringify(bestStreak));
  }, [bestStreak]);
  useEffect(() => {
    localStorage.setItem('sl_last_date', JSON.stringify(lastDateStr));
  }, [lastDateStr]);
  useEffect(() => {
    localStorage.setItem('sl_daily_claimed', JSON.stringify(dailyRewardClaimed));
  }, [dailyRewardClaimed]);
  useEffect(() => {
    localStorage.setItem('sl_streak_rewards', JSON.stringify(streakRewards));
  }, [streakRewards]);
  useEffect(() => {
    localStorage.setItem('sl_shop', JSON.stringify(shopItems));
  }, [shopItems]);
  useEffect(() => {
    localStorage.setItem('sl_skills', JSON.stringify(skills));
  }, [skills]);
  useEffect(() => {
    localStorage.setItem('sl_shadows', JSON.stringify(shadowArmy));
  }, [shadowArmy]);
  useEffect(() => {
    localStorage.setItem('sl_novels', JSON.stringify(novels));
  }, [novels]);
  useEffect(() => {
    localStorage.setItem('sl_logs', JSON.stringify(growthLogs));
  }, [growthLogs]);
  useEffect(() => {
    localStorage.setItem('sl_talent_nodes', JSON.stringify(talentNodes));
  }, [talentNodes]);
  useEffect(() => {
    localStorage.setItem('sl_talent_rank_tiers', JSON.stringify(talentRankTiers));
  }, [talentRankTiers]);
  useEffect(() => {
    localStorage.setItem('sl_monster_materials', JSON.stringify(monsterMaterials));
  }, [monsterMaterials]);
  useEffect(() => {
    localStorage.setItem('sl_settings', JSON.stringify(settings));
    soundFx.setEnabled(settings.soundEnabled);
    soundFx.setVolume(settings.sfxVolume);
  }, [settings]);

  // Real-time Countdown & Streak Verification Loop
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const todayStr = now.toDateString();

      // Check if day changed
      if (todayStr !== lastDateStr) {
        setLastDateStr(todayStr);

        // Check if user completed at least 1 task yesterday
        const lastCredited = localStorage.getItem('sl_streak_credited_date');
        const yesterdayStr = new Date(Date.now() - 86400000).toDateString();
        const hasAccomplishment = lastCredited === yesterdayStr || lastCredited === todayStr;

        if (!hasAccomplishment && streak > 0) {
          // Streak broken only if 0 tasks completed!
          setStreak(0);
          soundFx.playPenaltyWarning();
          setNotifications((prev) => [
            {
              id: `notif-streak-broken-${Date.now()}`,
              timestamp: 'Hôm nay',
              title: 'CẢNH BÁO: CHUỖI ĐÃ BỊ MẤT!',
              message: 'Bạn đã không hoàn thành bài tập nào của ngày hôm qua. Chuỗi ngày đã bị thiết lập về 0!',
              type: 'penalty',
            },
            ...prev,
          ]);
        }

        // Reset daily quests for the new day
        setDailyQuests(INITIAL_DAILY_QUESTS.map((q) => ({ ...q, current: 0, completed: false })));
        setDailyRewardClaimed(false);
      }

      // Calculate time left till midnight
      const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
      const diffMs = midnight.getTime() - now.getTime();

      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diffMs % (1000 * 60)) / 1000);

      const formatted = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      setTimeRemainingStr(formatted);

      // Warning when under 2 hours remaining and quests incomplete
      const anyIncomplete = dailyQuests.some((q) => q.current < q.target);
      setIsPenaltyWarning(hours < 2 && anyIncomplete);
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [lastDateStr, dailyQuests]);

  // Add Log Helper
  const addLog = useCallback((title: string, description: string, category: GrowthLog['category']) => {
    const newLog: GrowthLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      title,
      description,
      category,
    };
    setGrowthLogs((prev) => [newLog, ...prev.slice(0, 40)]);
  }, []);

  // Add Notification Helper
  const addNotification = useCallback((title: string, message: string, type: SystemNotificationItem['type']) => {
    const newNotif: SystemNotificationItem = {
      id: `notif-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      title,
      message,
      type,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  }, []);

  // Experience gain and Level Up check
  const gainExp = useCallback((amount: number) => {
    setStats((prev) => {
      let currentExp = prev.exp + amount;
      let currentLevel = prev.level;
      let currentMaxExp = prev.maxExp;
      let statPointsGained = 0;
      let didLevelUp = false;

      while (currentExp >= currentMaxExp) {
        currentExp -= currentMaxExp;
        currentLevel += 1;
        currentMaxExp = Math.round(currentMaxExp * 1.35);
        statPointsGained += 5;
        didLevelUp = true;
      }

      if (didLevelUp) {
        soundFx.playLevelUp();
        setLevelUpMessage(`CHÚC MỪNG! BẠN ĐÃ THĂNG LÊN CẤP ${currentLevel}! (+${statPointsGained} ĐIỂM THUỘC TÍNH)`);
        setTimeout(() => setLevelUpMessage(null), 4000);

        addLog(
          `Thăng Cấp Lên Cấp ${currentLevel}`,
          `Nhận thêm +${statPointsGained} Điểm chỉ số sức mạnh tự do. HP và MP được hồi phục tối đa!`,
          'level'
        );

        addNotification(
          `THĂNG CẤP THỢ SĂN: CẤP ${currentLevel}`,
          `Bạn đã đạt cấp độ ${currentLevel}! Hệ thống đã cấp thêm +${statPointsGained} điểm chỉ số.`,
          'level'
        );

        // Auto unlock skills that match level requirement
        setSkills((prevSkills) => {
          let equippedCount = prevSkills.filter((s) => s.unlocked && s.equipped).length;
          return prevSkills.map((sk) => {
            if (!sk.unlocked && sk.minLevelToUnlock && sk.minLevelToUnlock <= currentLevel) {
              const shouldEquip = equippedCount < 5;
              if (shouldEquip) equippedCount++;
              addNotification(
                `LĨNH NGỘ KỸ NĂNG: ${sk.name.toUpperCase()}`,
                `Đạt Cấp ${currentLevel}, bạn đã lĩnh ngộ kỹ năng ${sk.vietnameseName}! ${shouldEquip ? 'Tự động trang bị vào bộ kỹ năng xuất chiến.' : ''}`,
                'level'
              );
              return { ...sk, unlocked: true, equipped: shouldEquip };
            }
            return sk;
          });
        });

        // Update rank if milestone reached
        let newRank = prev.rank;
        let newJob = prev.job;
        if (currentLevel >= 40) {
          newRank = 'Monarch';
          newJob = 'Chúa Tể Bóng Tối Tối Cao';
        } else if (currentLevel >= 30) {
          newRank = 'S';
          newJob = 'Chúa Tể Bóng Tối';
        } else if (currentLevel >= 20) {
          newRank = 'A';
        } else if (currentLevel >= 15) {
          newRank = 'B';
        }

        return {
          ...prev,
          level: currentLevel,
          exp: currentExp,
          maxExp: currentMaxExp,
          statPoints: prev.statPoints + statPointsGained,
          hp: prev.maxHp + 80,
          maxHp: prev.maxHp + 80,
          mp: prev.maxMp + 40,
          maxMp: prev.maxMp + 40,
          rank: newRank,
          job: newJob,
        };
      }

      return { ...prev, exp: currentExp };
    });
  }, [addLog, addNotification]);

  // Allocate Stat Points
  const handleAllocateStat = (
    statKey: keyof Pick<PlayerStats, 'strength' | 'agility' | 'intelligence' | 'vitality' | 'perception'>,
    amount: number
  ) => {
    if (stats.statPoints < amount) return;

    setStats((prev) => {
      const updated = {
        ...prev,
        statPoints: prev.statPoints - amount,
        [statKey]: prev[statKey] + amount,
      };

      // Recalculate Max HP & MP when VIT or INT increases
      if (statKey === 'vitality') {
        const hpIncrease = amount * 18;
        updated.maxHp += hpIncrease;
        updated.hp += hpIncrease;
      } else if (statKey === 'intelligence') {
        const mpIncrease = amount * 12;
        updated.maxMp += mpIncrease;
        updated.mp += mpIncrease;
      }

      return updated;
    });

    addLog(
      `Cộng Điểm ${statKey.toUpperCase()}`,
      `Đã phân bổ +${amount} điểm vào chỉ số ${statKey.toUpperCase()}.`,
      'stat'
    );
  };

  // Full Recovery Potion Usage
  const handleUseFullRecovery = () => {
    const recoveryPotion = shopItems.find((i) => i.id === 'item-full-recovery-potion');
    if (!recoveryPotion || recoveryPotion.quantity <= 0) return;

    setShopItems((prev) =>
      prev.map((i) =>
        i.id === 'item-full-recovery-potion' ? { ...i, quantity: i.quantity - 1 } : i
      )
    );

    setStats((prev) => ({
      ...prev,
      hp: prev.maxHp,
      mp: prev.maxMp,
      fatigue: 0,
    }));

    addLog('Sử Dụng Bình Hồi Phục Toàn Phần', 'HP, MP đầy 100% và xóa sạch toàn bộ điểm mệt mỏi.', 'shop');
  };

  // Auto-increment streak when ANY single daily exercise or custom goal is completed!
  const checkAutoIncrementStreak = useCallback((missionName: string) => {
    const todayStr = new Date().toDateString();
    const lastCreditedDate = localStorage.getItem('sl_streak_credited_date');

    if (lastCreditedDate !== todayStr) {
      localStorage.setItem('sl_streak_credited_date', todayStr);
      setStreak((prevStreak) => {
        const nextStreak = prevStreak + 1;
        setBestStreak((prevBest) => Math.max(prevBest, nextStreak));

        // Trigger violent screen shake, dimensional flash, celebratory banner, and flying particles!
        triggerEpicMilestone(
          'streak',
          `TỰ ĐỘNG LÊN CHUỖI: ${nextStreak} NGÀY LIÊN TIẾP!`,
          `Hoàn thành nhiệm vụ: "${missionName}". Hệ Thống đã tự động ghi nhận chuỗi ngày mới!`,
          '+1 NGÀY CHUỖI · +500 VÀNG · +2 STATS'
        );

        setStats((prevStats) => ({
          ...prevStats,
          gold: prevStats.gold + 500,
          statPoints: prevStats.statPoints + 2,
        }));

        addLog(
          'Tự Động Lên Chuỗi Ngày',
          `Hoàn thành nhiệm vụ "${missionName}", chuỗi ngày tự động tăng lên ${nextStreak} ngày!`,
          'quest'
        );

        addNotification(
          `GHI NHẬN CHUỖI MỚI: ${nextStreak} NGÀY`,
          `Bạn đã hoàn thành 1 nhiệm vụ ("${missionName}"). Hệ Thống đã tự động gia tăng chuỗi thêm 1 ngày!`,
          'quest'
        );

        return nextStreak;
      });
    }
  }, [triggerEpicMilestone, addLog, addNotification]);

  // Daily Quest Progress Update
  const handleUpdateDailyProgress = (id: string, amount: number) => {
    setDailyQuests((prev) =>
      prev.map((q) => {
        if (q.id === id) {
          const newCurrent = Math.min(q.target, Math.max(0, q.current + amount));
          const justFinished = newCurrent >= q.target && !q.completed;
          if (justFinished) {
            triggerParticles('cyan');
            soundFx.playSystemNotification();
          }
          return {
            ...q,
            current: newCurrent,
            completed: newCurrent >= q.target,
          };
        }
        return q;
      })
    );
  };

  // Claim Daily Quest Reward
  const handleClaimDailyQuestReward = () => {
    if (dailyRewardClaimed) return;

    setDailyRewardClaimed(true);
    const todayStr = new Date().toDateString();
    const lastCreditedDate = localStorage.getItem('sl_streak_credited_date');
    let currentStreak = streak;

    if (lastCreditedDate !== todayStr) {
      localStorage.setItem('sl_streak_credited_date', todayStr);
      currentStreak = streak + 1;
      setStreak(currentStreak);
      if (currentStreak > bestStreak) {
        setBestStreak(currentStreak);
      }
    }

    // Trigger violent screen shake, dimensional cyan flash, and milestone popup!
    triggerEpicMilestone(
      'streak',
      `HOÀN THÀNH TẤT CẢ MỤC TIÊU NGÀY!`,
      'Bạn đã hoàn thành 100% mục tiêu rèn luyện hàng ngày!',
      '+3 STATS · +800 VÀNG · 1 BÌNH HỒI PHỤC TOÀN PHẦN'
    );

    // Add stats points, gold, and recovery potion
    setStats((prev) => ({
      ...prev,
      gold: prev.gold + 800,
      statPoints: prev.statPoints + 3,
      fatigue: 0,
    }));

    // Add potion to inventory
    setShopItems((prev) =>
      prev.map((item) =>
        item.id === 'item-full-recovery-potion'
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );

    gainExp(450);

    addLog(
      'Hoàn Thành Nhiệm Vụ Hàng Ngày',
      `Đạt chuỗi ${currentStreak} ngày liên tiếp! Nhận +3 Điểm chỉ số, +800 Vàng và 1 Bình Thuốc Hồi Phục Toàn Phần.`,
      'quest'
    );

    addNotification(
      'NHIỆM VỤ HÀNG NGÀY HOÀN THÀNH',
      `Chúc mừng bạn đã hoàn thành bài tập rèn luyện thể chất! Chuỗi tăng lên ${currentStreak} ngày.`,
      'quest'
    );
  };

  // Claim Streak Milestone Reward
  const handleClaimStreakReward = (days: number) => {
    const reward = streakRewards.find((r) => r.days === days);
    if (!reward || reward.claimed) return;

    // Trigger violent screen shake, dimensional purple flash, and milestone banner!
    triggerEpicMilestone(
      'milestone',
      `MỐC CHUỖI ${days} NGÀY: ${reward.title}!`,
      reward.rewardText,
      `+${reward.gold.toLocaleString()} VÀNG · +${reward.statPoints} STATS TỰ DO`
    );

    setStreakRewards((prev) =>
      prev.map((r) => (r.days === days ? { ...r, claimed: true } : r))
    );

    setStats((prev) => ({
      ...prev,
      gold: prev.gold + reward.gold,
      statPoints: prev.statPoints + reward.statPoints,
    }));

    addLog(
      `Nhận Thưởng Chuỗi ${days} Ngày`,
      `Nhận phần thưởng mốc: ${reward.rewardText} (+${reward.gold} G, +${reward.statPoints} STATS).`,
      'quest'
    );

    addNotification(
      `PHẦN THƯỞNG MỐC ${days} NGÀY CHUỖI`,
      `Bạn đã nhận phần thưởng cho mốc chuỗi ${days} ngày kiên trì!`,
      'quest'
    );
  };

  // Add Daily Exercise
  const handleAddDailyQuest = (newQuest: { name: string; target: number; unit: string }) => {
    const item: DailyQuestItem = {
      id: `ex-${Date.now()}`,
      name: newQuest.name,
      target: newQuest.target,
      current: 0,
      unit: newQuest.unit,
      completed: false,
      type: 'custom',
    };
    setDailyQuests((prev) => [...prev, item]);
    addLog('Thêm Bài Tập Rèn Luyện', `Đã thêm bài tập mới: "${item.name} (${item.target} ${item.unit})".`, 'quest');
    addNotification('THÊM BÀI TẬP THÀNH CÔNG', `Đã thêm bài tập "${item.name}" vào lịch rèn luyện hàng ngày.`, 'quest');
  };

  // Edit Daily Exercise
  const handleEditDailyQuest = (id: string, updated: { name: string; target: number; unit: string }) => {
    setDailyQuests((prev) =>
      prev.map((q) =>
        q.id === id
          ? {
              ...q,
              name: updated.name,
              target: updated.target,
              unit: updated.unit,
              completed: q.current >= updated.target,
            }
          : q
      )
    );
    addLog('Chỉnh Sửa Bài Tập', `Đã cập nhật bài tập: "${updated.name} (${updated.target} ${updated.unit})".`, 'quest');
  };

  // Delete Daily Exercise
  const handleDeleteDailyQuest = (id: string) => {
    setDailyQuests((prev) => prev.filter((q) => q.id !== id));
    addLog('Xóa Bài Tập', 'Đã xóa bài tập khỏi danh sách rèn luyện hàng ngày.', 'quest');
  };

  // Reset Default Daily Exercises
  const handleResetDefaultDailyQuests = () => {
    setDailyQuests(INITIAL_DAILY_QUESTS);
    addLog('Khôi Phục Bài Tập Gốc', 'Đã đặt lại 4 bài tập chuẩn mực Solo Leveling.', 'quest');
  };

  // Custom Goal Creation
  const handleAddCustomGoal = (goalData: Omit<CustomGoal, 'id' | 'completed' | 'createdAt'>) => {
    const newGoal: CustomGoal = {
      ...goalData,
      id: `goal-${Date.now()}`,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setCustomGoals((prev) => [newGoal, ...prev]);
    addLog('Tạo Mục Tiêu Mới', `Đã thiết lập mục tiêu cá nhân: "${newGoal.title}".`, 'quest');
  };

  // Update Custom Goal
  const handleUpdateCustomGoalProgress = (id: string, amount: number) => {
    setCustomGoals((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          const nextVal = Math.min(g.target, Math.max(0, g.current + amount));
          const isFinished = nextVal >= g.target;
          if (isFinished && !g.completed) {
            triggerParticles('cyan');
            soundFx.playSystemNotification();
            const isHardMission = g.difficulty === 'B' || g.difficulty === 'A' || g.difficulty === 'S';

            if (isHardMission) {
              // Trigger violent screen shake, flash and celebration for difficult mission!
              triggerEpicMilestone(
                'quest',
                `CHIẾN TÍCH: HOÀN THÀNH NHIỆM VỤ HẠNG ${g.difficulty}!`,
                g.title,
                `+${g.rewardExp} EXP · +${g.rewardGold} VÀNG THƯỞNG`
              );
            }

            // Give reward
            gainExp(g.rewardExp);
            setStats((s) => ({ ...s, gold: s.gold + g.rewardGold }));
            addLog(
              `Hoàn Thành Mục Tiêu: ${g.title}`,
              `Nhận thưởng: +${g.rewardExp} EXP và +${g.rewardGold} Vàng!`,
              'quest'
            );
          }
          return { ...g, current: nextVal, completed: isFinished };
        }
        return g;
      })
    );
  };

  const handleDeleteCustomGoal = (id: string) => {
    setCustomGoals((prev) => prev.filter((g) => g.id !== id));
  };

  // Dungeon Victory Handler
  const handleDungeonVictory = (gate: DungeonGate, rewards: { exp: number; gold: number; drops: string[] }) => {
    gainExp(rewards.exp);
    setStats((prev) => ({
      ...prev,
      gold: prev.gold + rewards.gold,
      fatigue: Math.min(prev.maxFatigue, prev.fatigue + 15),
    }));

    addLog(
      `Hạ Gục Trùm: ${gate.bossName}`,
      `Chiến thắng ${gate.name}! Nhận +${rewards.exp} EXP, +${rewards.gold} Vàng và chiến lợi phẩm: ${rewards.drops.join(', ')}.`,
      'boss'
    );

    // Progressive skill unlocking & shadow recruitment based on dungeon progression
    if (gate.rank === 'E') {
      setSkills((prev) =>
        prev.map((s) => (s.id === 'skill-slash' && !s.unlocked ? { ...s, unlocked: true } : s))
      );
      addNotification(
        'MỞ KHÓA KỸ NĂNG: CHÉM CHỚP NHOÁNG',
        'Sau khi hạ gục Sói Chúa Lycan, bạn đã lĩnh ngộ được kỹ năng Chém Chớp Nhoáng (Dagger Rush)!',
        'level'
      );
      addLog('Lĩnh Ngộ Kỹ Năng Mới', 'Mở khóa kỹ năng: Chém Chớp Nhoáng (Dagger Rush).', 'level');
    } else if (gate.rank === 'D') {
      setSkills((prev) =>
        prev.map((s) => (s.id === 'skill-venom' && !s.unlocked ? { ...s, unlocked: true } : s))
      );
      addNotification(
        'MỞ KHÓA KỸ NĂNG: ĐÒN ĐỘC TÊ LIỆT',
        'Sau khi tiêu diệt Độc Xà Rasaka, bạn đã hấp thụ được nọc độc và học được Đòn Độc Tê Liệt (Venom Strike)!',
        'level'
      );
      addLog('Lĩnh Ngộ Kỹ Năng Mới', 'Mở khóa kỹ năng: Đòn Độc Tê Liệt (Venom Strike).', 'level');
    } else if (gate.rank === 'C') {
      setSkills((prev) =>
        prev.map((s) => (s.id === 'skill-stealth' && !s.unlocked ? { ...s, unlocked: true } : s))
      );
      addNotification(
        'MỞ KHÓA KỸ NĂNG: TÀNG HÌNH ẨN THÂN',
        'Sau khi đánh bại Baruka, bạn đã học được kỹ năng Tàng Hình Ẩn Thân (Stealth)!',
        'level'
      );
      addLog('Lĩnh Ngộ Kỹ Năng Mới', 'Mở khóa kỹ năng: Tàng Hình Ẩn Thân (Stealth).', 'level');
    } else if (gate.rank === 'B') {
      setSkills((prev) =>
        prev.map((s) => (s.id === 'skill-authority' && !s.unlocked ? { ...s, unlocked: true } : s))
      );
      addNotification(
        'MỞ KHÓA KỸ NĂNG: QUYỀN NĂNG THỐNG TRỊ',
        'Sau khi chinh phục Lâu Đài Quỷ, bạn đã thức tỉnh Quyền Năng Thống Trị (Ruler Authority)!',
        'level'
      );
      addLog('Lĩnh Ngộ Kỹ Năng Mới', 'Mở khóa kỹ năng: Quyền Năng Thống Trị.', 'level');
    } else if (gate.rank === 'A') {
      setSkills((prev) =>
        prev.map((s) => (s.id === 'skill-arise' && !s.unlocked ? { ...s, unlocked: true } : s))
      );
      setShadowArmy((prev) => {
        if (prev.some((s) => s.id === 'shadow-igris')) return prev;
        return [
          {
            id: 'shadow-igris',
            name: 'Igris Huyết Kỵ Sĩ',
            originalName: 'Hiệp Sĩ Đỏ Blood-Red Igris',
            rank: 'Đại Tướng Quân',
            count: 1,
            power: 1450,
            avatarType: 'knight',
            description: 'Trung thần hộ vệ bóng tối vĩ đại nhất, sử dụng trường kiếm chém tan mọi cản trở.',
          },
          ...prev,
        ];
      });
      setStats((prev) => ({
        ...prev,
        job: 'Chúa Tể Bóng Tối',
        title: 'Chúa Tể Bất Tử',
        rank: 'S',
      }));
      soundFx.playArise();
      addNotification(
        'CHUYỂN NGHỀ: CHÚA TỂ BÓNG TỐI!',
        'Bạn đã vượt qua thử thách Đền Thờ, chính thức trở thành CHÚA TỂ BÓNG TỐI, mở khóa kỹ năng ARISE và thu phục Igris Huyết Kỵ Sĩ!',
        'level'
      );
      addLog('Chuyển Nghề Chúa Tể Bóng Tối', 'Mở khóa kỹ năng ARISE (TRỖI DẬY) và thu phục Igris Huyết Kỵ Sĩ!', 'level');
    } else if (gate.rank === 'RED') {
      setShadowArmy((prev) => {
        if (prev.some((s) => s.id === 'shadow-beru')) return prev;
        soundFx.playArise();
        addNotification(
          'TRÍCH XUẤT BÓNG TỐI: VUA KIẾN BERU',
          'Bạn đã trích xuất thành công linh hồn Vua Kiến Beru vào Đội Quân Bóng Tối của Chúa Tể!',
          'level'
        );
        return [
          {
            id: 'shadow-beru',
            name: 'Beru (Vua Kiến Bóng Tối)',
            originalName: 'Đại Tướng Quân Beru',
            rank: 'Đại Tướng Quân',
            count: 1,
            power: 2800,
            avatarType: 'ant',
            description: 'Chiến binh bóng tối trung thành và hung bạo nhất, có thể bay với tốc độ siêu thanh.',
          },
          ...prev,
        ];
      });
    }

    // Monster Material Drops for Talent Tree Breakthrough
    setMonsterMaterials((prevMats) => {
      const dropMap: Record<string, string[]> = {
        'E': ['mat-wolf-fang', 'mat-copper-ore'],
        'D': ['mat-rasaka-fang', 'mat-lizard-scale'],
        'C': ['mat-frost-crystal', 'mat-ice-feather'],
        'B': ['mat-igris-soul', 'mat-demon-core'],
        'A': ['mat-beru-chitin', 'mat-baran-lightning'],
        'S': ['mat-kamish-fang', 'mat-antares-heart'],
        'RED': ['mat-beru-chitin', 'mat-baran-lightning'],
        'MYTHIC': ['mat-kamish-fang', 'mat-antares-heart'],
      };
      const targets = dropMap[gate.rank] || ['mat-wolf-fang'];
      return prevMats.map((m) => {
        if (targets.includes(m.id)) {
          const qty = Math.floor(Math.random() * 2) + 1;
          return { ...m, count: m.count + qty };
        }
        return m;
      });
    });
  };

  // Talent Node Unlock Handler
  const handleUnlockTalentNode = (nodeId: string): boolean => {
    const node = talentNodes.find((n) => n.id === nodeId);
    if (!node || node.unlocked) return false;

    if (stats.gold < node.goldCost) {
      addNotification('KHÔNG ĐỦ VÀNG', `Bạn cần ${node.goldCost.toLocaleString()} Vàng để kích hoạt tài năng này!`, 'penalty');
      return false;
    }

    // Deduct gold & apply stats
    setStats((prev) => {
      const updated = { ...prev, gold: prev.gold - node.goldCost };
      if (node.statsBonus) {
        const b = node.statsBonus;
        if (b.strength) updated.strength += b.strength;
        if (b.agility) updated.agility += b.agility;
        if (b.intelligence) updated.intelligence += b.intelligence;
        if (b.vitality) updated.vitality += b.vitality;
        if (b.perception) updated.perception += b.perception;
        if (b.hp) { updated.maxHp += b.hp; updated.hp += b.hp; }
        if (b.mp) { updated.maxMp += b.mp; updated.mp += b.mp; }
      }
      return updated;
    });

    setTalentNodes((prev) =>
      prev.map((n) => (n.id === nodeId ? { ...n, unlocked: true } : n))
    );

    // If node unlocks a skill, unlock and auto equip if space available
    if (node.unlockedSkillId) {
      setSkills((prev) => {
        let equippedActiveCount = prev.filter((s) => (s.type === 'active' || !s.type) && s.unlocked && s.equipped).length;
        return prev.map((sk) => {
          if (sk.id === node.unlockedSkillId) {
            const isPassive = sk.type === 'passive';
            const shouldEquip = isPassive ? true : equippedActiveCount < 5;
            return { ...sk, unlocked: true, equipped: shouldEquip };
          }
          return sk;
        });
      });
    }

    triggerParticles('gold');
    addNotification(
      'KÍCH HOẠT TÀI NĂNG THÀNH CÔNG',
      `Đã kích hoạt [${node.vietnameseName}]! Các chỉ số và kỹ năng đã được gia tăng sức mạnh.`,
      'level'
    );
    addLog('Kích Hoạt Tài Năng', `Khai mở tài năng: ${node.vietnameseName} (${node.name}).`, 'stat');
    return true;
  };

  // Rank Breakthrough Handler
  const handleBreakthroughRank = (currentRank: 'E' | 'D' | 'C' | 'B' | 'A' | 'S'): boolean => {
    const tier = talentRankTiers.find((t) => t.rank === currentRank);
    if (!tier) return false;

    if (stats.gold < tier.breakthroughRequirements.gold) {
      addNotification('KHÔNG ĐỦ VÀNG ĐỘT PHÁ', `Cần ${tier.breakthroughRequirements.gold.toLocaleString()} Vàng để đột phá bậc!`, 'penalty');
      return false;
    }

    // Check materials
    const notEnoughMat = tier.breakthroughRequirements.materials.find((req: { materialId: string; requiredCount: number; name: string }) => {
      const mat = monsterMaterials.find((m) => m.id === req.materialId);
      return !mat || mat.count < req.requiredCount;
    });

    if (notEnoughMat) {
      addNotification('THIẾU NGUYÊN LIỆU', `Bạn chưa đủ ${notEnoughMat.name} (cần ${notEnoughMat.requiredCount}) để đột phá!`, 'penalty');
      return false;
    }

    // Deduct gold and materials
    setStats((prev) => ({ ...prev, gold: prev.gold - tier.breakthroughRequirements.gold }));
    setMonsterMaterials((prev) =>
      prev.map((m) => {
        const req = tier.breakthroughRequirements.materials.find((r: { materialId: string; requiredCount: number }) => r.materialId === m.id);
        if (req) {
          return { ...m, count: Math.max(0, m.count - req.requiredCount) };
        }
        return m;
      })
    );

    // Unlock next rank tier
    const rankOrder: ('E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'Monarch')[] = ['E', 'D', 'C', 'B', 'A', 'S', 'Monarch'];
    const nextIdx = rankOrder.indexOf(currentRank) + 1;
    const nextRank = rankOrder[nextIdx];

    const nextTier = talentRankTiers.find((t) => t.rank === nextRank);
    if (nextTier && nextTier.unlocked) {
      addNotification('ĐÃ ĐỘT PHÁ BẬC NÀY', `Bạn đã đột phá Rank ${currentRank} lên Rank ${nextRank} rồi!`, 'level');
      return false;
    }

    if (nextRank) {
      setTalentRankTiers((prev) =>
        prev.map((t) => (t.rank === nextRank ? { ...t, unlocked: true } : t))
      );

      triggerEpicMilestone(
        'milestone',
        `ĐỘT PHÁ BẬC THÀNH CÔNG: RANK ${nextRank}!`,
        `Bạn đã đột phá giới hạn và mở khóa nhánh tài năng Bậc ${nextRank}!`,
        '+15 STATS · KHAI MỞ CÂY TÀI NĂNG MỚI'
      );

      setStats((prev) => ({
        ...prev,
        rank: nextRank as 'E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'National' | 'Monarch',
        title: nextRank === 'Monarch' ? 'Chúa Tể Bất Tử' : nextRank === 'S' ? 'Thợ Săn Hạng S' : nextRank === 'A' ? 'Thợ Săn Hạng A' : prev.title,
        statPoints: prev.statPoints + 15,
      }));
    }

    return true;
  };

  // Shop item purchase
  const handleBuyShopItem = (item: ShopItem) => {
    if (stats.gold < item.price) return;

    setStats((prev) => ({ ...prev, gold: prev.gold - item.price }));
    setShopItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
    );

    addLog('Mua Vật Phẩm', `Đã mua ${item.name} với giá ${item.price} Vàng.`, 'shop');
  };

  // Equip / Unequip Item
  const handleToggleEquipItem = (item: ShopItem) => {
    const isNowEquipped = !item.equipped;

    setShopItems((prev) =>
      prev.map((i) => {
        if (i.id === item.id) {
          return { ...i, equipped: isNowEquipped };
        }
        // If same slot type (e.g. only 1 weapon), unequip other weapons
        if (isNowEquipped && i.type === item.type && i.id !== item.id) {
          return { ...i, equipped: false };
        }
        return i;
      })
    );

    // Apply stat bonus
    setStats((prev) => {
      const mult = isNowEquipped ? 1 : -1;
      const b = item.statsBonus;
      return {
        ...prev,
        strength: prev.strength + (b.strength || 0) * mult,
        agility: prev.agility + (b.agility || 0) * mult,
        intelligence: prev.intelligence + (b.intelligence || 0) * mult,
        vitality: prev.vitality + (b.vitality || 0) * mult,
        perception: prev.perception + (b.perception || 0) * mult,
        maxHp: prev.maxHp + (b.hp || 0) * mult,
        hp: Math.min(prev.maxHp + (b.hp || 0) * mult, prev.hp + (b.hp || 0) * mult),
        maxMp: prev.maxMp + (b.mp || 0) * mult,
        mp: Math.min(prev.maxMp + (b.mp || 0) * mult, prev.mp + (b.mp || 0) * mult),
      };
    });

    addLog(
      isNowEquipped ? `Trang Bị: ${item.name}` : `Tháo Trang Bị: ${item.name}`,
      `Chỉ số của bạn đã được cập nhật tương ứng.`,
      'shop'
    );
  };

  // Drink potion from shop
  const handleDrinkPotion = (item: ShopItem) => {
    if (item.quantity <= 0) return;

    setShopItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i))
    );

    if (item.id === 'item-full-recovery-potion') {
      setStats((prev) => ({
        ...prev,
        hp: prev.maxHp,
        mp: prev.maxMp,
        fatigue: 0,
      }));
      addLog('Uống Bình Hồi Phục Toàn Phần', 'HP, MP đầy 100% và xóa sạch điểm mệt mỏi.', 'shop');
    } else if (item.id === 'item-stat-elixir') {
      setStats((prev) => ({
        ...prev,
        statPoints: prev.statPoints + 3,
      }));
      addLog('Uống Thần Dược Thể Lực', 'Nhận ngay vĩnh viễn +3 Điểm Thuộc Tính Tự Do!', 'shop');
    }
  };

  // Equip / Unequip Skill in 5-Skill Loadout Deck
  const handleToggleEquipSkill = (skillId: string) => {
    setSkills((prev) => {
      const target = prev.find((s) => s.id === skillId);
      if (!target || !target.unlocked) return prev;

      // Passive skills are automatically active 100% of the time and do not use combat slots
      if (target.type === 'passive') {
        return prev.map((s) => (s.id === skillId ? { ...s, equipped: true } : s));
      }

      const currentlyEquippedActiveCount = prev.filter(
        (s) => (s.type === 'active' || !s.type) && s.equipped && s.unlocked
      ).length;

      // If equipping an active skill and already has 5 active skills equipped
      if (!target.equipped && currentlyEquippedActiveCount >= 5) {
        soundFx.playPenaltyWarning();
        addNotification(
          'GIỚI HẠN BỘ KỸ NĂNG XUẤT CHIẾN',
          'Mỗi trận chỉ được trang bị tối đa 5 kỹ năng CHỦ ĐỘNG! Hãy tháo bớt 1 kỹ năng chủ động trước khi lắp thêm.',
          'penalty'
        );
        return prev;
      }

      soundFx.playClick();
      return prev.map((s) => (s.id === skillId ? { ...s, equipped: !s.equipped } : s));
    });
  };

  // Upgrade Skill
  const handleUpgradeSkill = (skillId: string) => {
    const skill = skills.find((s) => s.id === skillId);
    if (!skill || skill.level >= skill.maxLevel) return;

    const cost = skill.level * 1500;
    if (stats.gold < cost) return;

    setStats((prev) => ({ ...prev, gold: prev.gold - cost }));
    setSkills((prev) =>
      prev.map((s) =>
        s.id === skillId
          ? {
              ...s,
              level: s.level + 1,
              damageMultiplier: Math.round((s.damageMultiplier + 0.6) * 10) / 10,
            }
          : s
      )
    );

    addLog(`Nâng Cấp Kỹ Năng: ${skill.name}`, `Tăng lên Cấp ${skill.level + 1}.`, 'level');
  };

  // Novel - Simulate new chapter publishing & auto-notification
  const handleTriggerNewChapter = (novelId: string) => {
    setNovels((prev) =>
      prev.map((n) => {
        if (n.id === novelId) {
          const nextNum = n.chapters.length + 1;
          const newCh = {
            id: Date.now(),
            chapterNumber: nextNum,
            title: `Chương ${nextNum}: Bí Ẩn Vùng Đất Hư Không (Mới Nhất)`,
            publishDate: 'Vừa xong',
            isNew: true,
            content: [
              `[THÔNG BÁO TỰ ĐỘNG CỦA HỆ THỐNG]: Chương ${nextNum} của bộ tiểu thuyết "${n.title}" vừa được cập nhật!`,
              'Những luồng ma lực cổ xưa đang hội tụ lại nơi rìa thế giới. Jin-woo khẽ nhắm mắt, cảm nhận từng nhịp đập của không gian.',
              '"Thưa Chúa Tể, quân đoàn đã tề tựu đầy đủ và sẵn sàng." Igris xuất hiện trong tư thế quỳ một gối tôn kính.',
              'Jin-woo nhìn lên bầu trời sao vô tận: "Được rồi. Hãy để bọn chúng biết ai mới là kẻ thống trị thực sự của bóng tối."'
            ],
          };
          return { ...n, chapters: [...n.chapters, newCh] };
        }
        return n;
      })
    );

    addNotification(
      'CHƯƠNG TIỂU THUYẾT MỚI ĐÃ RA MẮT!',
      `Hệ thống vừa cập nhật chương mới cho bộ tiểu thuyết của bạn. Hãy vào tab XẢ STRESS để đọc ngay!`,
      'novel'
    );
  };

  const handleReadChapter = (novelId: string, chapterId: number) => {
    setNovels((prev) =>
      prev.map((n) => {
        if (n.id === novelId) {
          return {
            ...n,
            chapters: n.chapters.map((c) => (c.id === chapterId ? { ...c, isNew: false } : c)),
          };
        }
        return n;
      })
    );
  };

  // Export / Import / Reset System
  const handleExportData = () => {
    const backup = {
      stats,
      dailyQuests,
      customGoals,
      streak,
      bestStreak,
      streakRewards,
      shopItems,
      skills,
      shadowArmy,
      growthLogs,
      settings,
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `solo_leveling_system_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.stats) setStats(data.stats);
        if (data.dailyQuests) setDailyQuests(data.dailyQuests);
        if (data.customGoals) setCustomGoals(data.customGoals);
        if (data.streak !== undefined) setStreak(data.streak);
        if (data.bestStreak !== undefined) setBestStreak(data.bestStreak);
        if (data.shopItems) setShopItems(data.shopItems);
        if (data.skills) setSkills(data.skills);
        if (data.shadowArmy) setShadowArmy(data.shadowArmy);
        if (data.growthLogs) setGrowthLogs(data.growthLogs);
        soundFx.playLevelUp();
        alert('Đã khôi phục dữ liệu Hệ Thống thành công!');
      } catch {
        alert('File dữ liệu không hợp lệ!');
      }
    };
    reader.readAsText(file);
  };

  const handleResetData = () => {
    localStorage.clear();
    setStats(INITIAL_PLAYER_STATS);
    setDailyQuests(INITIAL_DAILY_QUESTS);
    setCustomGoals(INITIAL_CUSTOM_GOALS);
    setStreak(0);
    setBestStreak(0);
    setStreakRewards(INITIAL_STREAK_REWARDS);
    setShopItems(INITIAL_SHOP_ITEMS);
    setSkills(INITIAL_SKILLS);
    setShadowArmy(INITIAL_SHADOW_SOLDIERS);
    setNovels(INITIAL_NOVELS);
    setGrowthLogs(INITIAL_GROWTH_LOGS);
    soundFx.playSystemNotification();
  };

  const recoveryPotionItem = shopItems.find((i) => i.id === 'item-full-recovery-potion');
  const recoveryPotionsCount = recoveryPotionItem?.quantity || 0;
  const equippedItems = shopItems.filter((i) => i.equipped);
  const unclaimedQuestsCount = dailyQuests.filter((q) => q.current >= q.target).length;

  return (
    <div className={`min-h-screen bg-[#030712] text-slate-100 system-grid relative flex flex-col selection:bg-cyan-500 selection:text-slate-950 font-chakra transition-transform duration-100 ${
      epicShake ? 'animate-screen-shake-violent' : ''
    }`}>
      {/* Background ambient scanlines */}
      <div className="fixed inset-0 scanlines pointer-events-none z-10 opacity-30" />

      {/* Fullscreen Dimensional Nova Flash & Expanding Shockwave Rings */}
      {novaFlash && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden flex items-center justify-center">
          <div
            className={`absolute inset-0 ${
              novaFlash === 'purple' ? 'animate-nova-flash-purple' : 'animate-nova-flash-cyan'
            }`}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-4 border-cyan-300 animate-shockwave-ring" />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-4 border-purple-400 animate-shockwave-ring"
            style={{ animationDelay: '0.15s' }}
          />
        </div>
      )}

      {/* Epic Milestone / Difficult Quest Completed Hologram Shockwave Pop-up */}
      {achievementPopup && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center p-4">
          <div className="relative max-w-md w-full p-6 bg-gradient-to-b from-slate-950/95 via-cyan-950/95 to-slate-950/95 border-2 border-cyan-400 rounded-sm shadow-[0_0_50px_rgba(0,229,255,0.7),inset_0_0_30px_rgba(0,229,255,0.3)] animate-bounce text-center overflow-hidden">
            {/* Spinning Light Rays background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-20 pointer-events-none animate-light-ray-spin bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-400 via-transparent to-transparent" />
            <div className="hud-corner-tl" />
            <div className="hud-corner-tr" />
            <div className="hud-corner-bl" />
            <div className="hud-corner-br" />

            <div className="relative z-10">
              <span className="text-[11px] font-mono tracking-widest text-cyan-300 uppercase block animate-pulse">
                [HỆ THỐNG GHI NHẬN THÀNH TÍCH ĐẶC BIỆT]
              </span>

              <h2 className="text-xl sm:text-2xl font-black text-white font-chakra text-glow-blue mt-1 tracking-wide uppercase">
                {achievementPopup.title}
              </h2>

              <p className="text-xs text-slate-300 font-chakra mt-1 max-w-xs mx-auto">
                {achievementPopup.subtitle}
              </p>

              {achievementPopup.reward && (
                <div className="mt-4 py-1.5 px-3 bg-cyan-950/80 border border-cyan-400 text-cyan-200 text-xs font-bold font-orbitron inline-block rounded-xs shadow-[0_0_15px_rgba(0,210,255,0.4)]">
                  {achievementPopup.reward}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Particles Burst on Mission Completion & Achievements */}
      <ParticleEffect active={particleActive} type={particleType} count={60} />

      {/* Visual Mana Burn Shards Eruption on Skill / Mana Consumption */}
      <ManaBurnEffect active={manaBurnActive} mpCost={manaBurnCost} />

      {/* Top Header HUD Bar */}
      {!isRaidActive && (
        <HeaderHUD
          stats={stats}
          streak={streak}
          timeRemainingStr={timeRemainingStr}
          isPenaltyWarning={isPenaltyWarning}
          soundEnabled={settings.soundEnabled}
          onToggleSound={() => setSettings((s) => ({ ...s, soundEnabled: !s.soundEnabled }))}
          onOpenPenaltyModal={() => setIsPenaltyModalOpen(true)}
          onOpenNotifications={() => setIsNotifModalOpen(true)}
          unreadCount={notifications.length}
          streakUpdated={streakUpdated}
        />
      )}

      {/* System Navigation Tabs */}
      {!isRaidActive && (
        <NavigationTabs
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          availablePoints={stats.statPoints}
          unclaimedQuestsCount={unclaimedQuestsCount}
        />
      )}

      {/* Level Up Banner Notification */}
      {levelUpMessage && (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 text-white font-black font-chakra text-sm sm:text-base rounded-sm border border-cyan-300 shadow-[0_0_30px_rgba(0,210,255,0.8)] animate-bounce text-center">
          {levelUpMessage}
        </div>
      )}

      {/* Main Tab Content View */}
      <main className={isRaidActive ? "fixed inset-0 z-[100] bg-[#030712] overflow-hidden" : "flex-1 pb-16 pt-3 relative z-20 w-full max-w-7xl mx-auto px-2 sm:px-4 box-border overflow-x-hidden"}>
        {activeTab === 'status' && (
          <StatusTab
            stats={stats}
            equippedItems={equippedItems}
            skills={skills}
            onAllocateStat={handleAllocateStat}
            onUseFullRecovery={handleUseFullRecovery}
            onTriggerManaBurn={handleTriggerManaBurn}
            recoveryPotionsCount={recoveryPotionsCount}
            onToggleEquipSkill={handleToggleEquipSkill}
            onUpgradeSkill={handleUpgradeSkill}
          />
        )}

        {activeTab === 'quests' && (
          <QuestTab
            dailyQuests={dailyQuests}
            customGoals={customGoals}
            streak={streak}
            bestStreak={bestStreak}
            timeRemainingStr={timeRemainingStr}
            isPenaltyWarning={isPenaltyWarning}
            streakRewards={streakRewards}
            onUpdateDailyProgress={handleUpdateDailyProgress}
            onClaimDailyQuestReward={handleClaimDailyQuestReward}
            onClaimStreakReward={handleClaimStreakReward}
            onAddCustomGoal={handleAddCustomGoal}
            onUpdateCustomGoalProgress={handleUpdateCustomGoalProgress}
            onDeleteCustomGoal={handleDeleteCustomGoal}
            dailyRewardClaimed={dailyRewardClaimed}
            onAddDailyQuest={handleAddDailyQuest}
            onEditDailyQuest={handleEditDailyQuest}
            onDeleteDailyQuest={handleDeleteDailyQuest}
            onResetDefaultDailyQuests={handleResetDefaultDailyQuests}
          />
        )}

        {activeTab === 'talents' && (
          <TalentTab
            stats={stats}
            talentNodes={talentNodes}
            talentRankTiers={talentRankTiers}
            materials={monsterMaterials}
            onUnlockTalentNode={handleUnlockTalentNode}
            onBreakthroughRank={handleBreakthroughRank}
          />
        )}

        {activeTab === 'dungeon' && (
          <DungeonTab
            stats={stats}
            dungeons={INITIAL_DUNGEONS}
            skills={skills}
            onVictory={handleDungeonVictory}
            onDefeat={() => {
              setStats((s) => ({ ...s, fatigue: Math.min(s.maxFatigue, s.fatigue + 25) }));
              addLog('Thất Bại Trong Ải', 'Bạn đã bị trùm hạ gục. Mức mệt mỏi tăng lên.', 'boss');
            }}
            onUseBattlePotion={() => {
              if (recoveryPotionsCount <= 0) return false;
              handleUseFullRecovery();
              return true;
            }}
            recoveryPotionsCount={recoveryPotionsCount}
            onRaidStateChange={setIsRaidActive}
            onToggleEquipSkill={handleToggleEquipSkill}
          />
        )}

        {activeTab === 'shop' && (
          <ShopTab
            stats={stats}
            shopItems={shopItems}
            onBuyItem={handleBuyShopItem}
            onToggleEquipItem={handleToggleEquipItem}
            onDrinkPotion={handleDrinkPotion}
            onManualResetShop={handleManualResetShop}
            timeUntilShopReset={timeRemainingStr}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileTab
            stats={stats}
            skills={skills}
            shadowArmy={shadowArmy}
            growthLogs={growthLogs}
            onUpgradeSkill={handleUpgradeSkill}
            onToggleEquipSkill={handleToggleEquipSkill}
          />
        )}

        {activeTab === 'novel' && (
          <NovelTab
            novels={novels}
            onTriggerNewChapter={handleTriggerNewChapter}
            onReadChapter={handleReadChapter}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsTab
            settings={settings}
            onUpdateSettings={(newSet) => setSettings((s) => ({ ...s, ...newSet }))}
            onResetData={handleResetData}
            onExportData={handleExportData}
            onImportData={handleImportData}
          />
        )}
      </main>

      {/* Penalty Warning Modal */}
      <PenaltyModal
        isOpen={isPenaltyModalOpen}
        onClose={() => setIsPenaltyModalOpen(false)}
        timeRemainingStr={timeRemainingStr}
        isPenaltyWarning={isPenaltyWarning}
        streak={streak}
        onGoToQuests={() => {
          setActiveTab('quests');
          setIsPenaltyModalOpen(false);
        }}
      />

      {/* System Notifications Modal */}
      <NotificationModal
        isOpen={isNotifModalOpen}
        onClose={() => setIsNotifModalOpen(false)}
        notifications={notifications}
        onClearAll={() => setNotifications([])}
      />
    </div>
  );
}
