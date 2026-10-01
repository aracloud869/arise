import React, { useState } from 'react';
import { DailyQuestItem, CustomGoal, StreakReward } from '../../types';
import {
  QuestIcon,
  FlameStreakIcon,
  CheckIcon,
  PlusIcon,
  AlertGlyphIcon,
  GoldCoinIcon,
  TargetIcon,
  CloseIcon,
  EditPencilIcon,
  TrashIcon,
  RefreshIcon,
} from '../icons/SystemIcons';
import { soundFx } from '../../utils/soundEffects';

interface QuestTabProps {
  dailyQuests: DailyQuestItem[];
  customGoals: CustomGoal[];
  streak: number;
  bestStreak: number;
  timeRemainingStr: string;
  isPenaltyWarning: boolean;
  streakRewards: StreakReward[];
  onUpdateDailyProgress: (id: string, amount: number) => void;
  onClaimDailyQuestReward: () => void;
  onClaimStreakReward: (days: number) => void;
  onAddCustomGoal: (goal: Omit<CustomGoal, 'id' | 'completed' | 'createdAt'>) => void;
  onUpdateCustomGoalProgress: (id: string, amount: number) => void;
  onDeleteCustomGoal: (id: string) => void;
  dailyRewardClaimed: boolean;
  onAddDailyQuest: (quest: { name: string; target: number; unit: string }) => void;
  onEditDailyQuest: (id: string, updated: { name: string; target: number; unit: string }) => void;
  onDeleteDailyQuest: (id: string) => void;
  onResetDefaultDailyQuests: () => void;
}

export const QuestTab: React.FC<QuestTabProps> = ({
  dailyQuests,
  customGoals,
  streak,
  bestStreak,
  timeRemainingStr,
  isPenaltyWarning,
  streakRewards,
  onUpdateDailyProgress,
  onClaimDailyQuestReward,
  onClaimStreakReward,
  onAddCustomGoal,
  onUpdateCustomGoalProgress,
  onDeleteCustomGoal,
  dailyRewardClaimed,
  onAddDailyQuest,
  onEditDailyQuest,
  onDeleteDailyQuest,
  onResetDefaultDailyQuests,
}) => {
  // Sub-tab: Daily System Quest vs Custom Goals vs Streak Rewards
  const [subTab, setSubTab] = useState<'system' | 'custom' | 'streak'>('system');

  // Add Exercise Modal state
  const [showAddExerciseModal, setShowAddExerciseModal] = useState(false);
  const [newExName, setNewExName] = useState('');
  const [newExTarget, setNewExTarget] = useState<number>(50);
  const [newExUnit, setNewExUnit] = useState('lần');

  // Edit Exercise Modal state
  const [editingExercise, setEditingExercise] = useState<DailyQuestItem | null>(null);
  const [editExName, setEditExName] = useState('');
  const [editExTarget, setEditExTarget] = useState<number>(100);
  const [editExUnit, setEditExUnit] = useState('lần');

  // Custom Mission creation modal state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'physical' | 'study' | 'mental' | 'habit'>('study');
  const [newTarget, setNewTarget] = useState<number>(30);
  const [newUnit, setNewUnit] = useState('phút');
  const [newDifficulty, setNewDifficulty] = useState<'E' | 'D' | 'C' | 'B' | 'A' | 'S'>('C');

  // Check if all daily quests are finished
  const allDailyCompleted = dailyQuests.every((q) => q.current >= q.target);

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const diffMultipliers: Record<string, { exp: number; gold: number }> = {
      E: { exp: 80, gold: 150 },
      D: { exp: 140, gold: 300 },
      C: { exp: 220, gold: 500 },
      B: { exp: 400, gold: 900 },
      A: { exp: 750, gold: 1800 },
      S: { exp: 1500, gold: 4000 },
    };

    const multiplier = diffMultipliers[newDifficulty] || { exp: 150, gold: 300 };

    onAddCustomGoal({
      title: newTitle.trim(),
      category: newCategory,
      target: Number(newTarget) || 1,
      current: 0,
      unit: newUnit.trim() || 'lần',
      difficulty: newDifficulty,
      rewardExp: multiplier.exp,
      rewardGold: multiplier.gold,
    });

    soundFx.playSystemNotification();
    setShowCreateModal(false);
    setNewTitle('');
    setNewTarget(30);
  };

  // Open Edit Exercise modal
  const handleOpenEditExercise = (quest: DailyQuestItem) => {
    soundFx.playClick();
    setEditingExercise(quest);
    setEditExName(quest.name);
    setEditExTarget(quest.target);
    setEditExUnit(quest.unit);
  };

  // Save Edit Exercise
  const handleSaveEditExercise = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExercise || !editExName.trim() || editExTarget <= 0) return;
    soundFx.playClick();
    onEditDailyQuest(editingExercise.id, {
      name: editExName.trim(),
      target: editExTarget,
      unit: editExUnit.trim() || 'lần',
    });
    setEditingExercise(null);
  };

  // Submit Add Exercise
  const handleAddExerciseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExName.trim() || newExTarget <= 0) return;
    soundFx.playSystemNotification();
    onAddDailyQuest({
      name: newExName.trim(),
      target: newExTarget,
      unit: newExUnit.trim() || 'lần',
    });
    setNewExName('');
    setNewExTarget(50);
    setShowAddExerciseModal(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-3 sm:p-6 space-y-6">
      {/* Real-time Streak & Penalty Warning Alert Box */}
      <div
        className={`p-4 sm:p-5 rounded-sm relative border transition-all duration-300 ${
          isPenaltyWarning
            ? 'system-window-penalty animate-pulse border-red-500/80 shadow-[0_0_25px_rgba(239,68,68,0.4)]'
            : 'system-window border-cyan-500/40'
        }`}
      >
        <div className="hud-corner-tl" />
        <div className="hud-corner-tr" />
        <div className="hud-corner-bl" />
        <div className="hud-corner-br" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div
              className={`p-3 rounded-sm border ${
                isPenaltyWarning
                  ? 'bg-red-950/80 border-red-500 text-red-400 animate-bounce'
                  : 'bg-cyan-950/80 border-cyan-400 text-cyan-300'
              }`}
            >
              <FlameStreakIcon className="w-8 h-8" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-chakra font-bold tracking-widest text-slate-400">
                  CƠ CHẾ CHUỖI THỜI GIAN THỰC (REAL-TIME STREAK)
                </span>
                <span className="px-2 py-0.2 text-[10px] font-bold rounded-xs bg-cyan-950 border border-cyan-400 text-cyan-300 font-mono">
                  KỶ LỤC: {bestStreak} NGÀY
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white font-chakra tracking-wide flex items-center gap-2 mt-0.5">
                <span>CHUỖI HIỆN TẠI:</span>
                <span className="text-cyan-300 font-orbitron text-glow-blue">{streak} NGÀY LIÊN TIẾP</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1 max-w-xl">
                Hệ thống ghi nhận chuỗi theo thời gian thực mỗi 24h. Nếu không hoàn thành nhiệm vụ hàng ngày trước nửa đêm, chuỗi sẽ mất và bạn sẽ bị chuyển tới Vùng Phạt (Penalty Zone)!
              </p>
            </div>
          </div>

          {/* Countdown timer */}
          <div className="flex flex-col items-start md:items-end justify-center px-4 py-2 bg-slate-950/80 border border-current rounded-sm">
            <span className="text-[10px] uppercase font-bold text-slate-400 font-chakra">
              THỜI GIAN CÒN LẠI TRONG NGÀY
            </span>
            <span
              className={`text-xl sm:text-2xl font-black font-mono tracking-wider ${
                isPenaltyWarning ? 'text-red-400 animate-pulse' : 'text-cyan-300'
              }`}
            >
              {timeRemainingStr}
            </span>
          </div>
        </div>
      </div>

      {/* Segmented Filter Control */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyan-500/20 pb-2">
        <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 border border-cyan-500/30 rounded-sm">
          <button
            onClick={() => {
              soundFx.playClick();
              setSubTab('system');
            }}
            className={`px-3 py-1.5 text-xs font-bold font-chakra rounded-xs transition-colors cursor-pointer ${
              subTab === 'system'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_10px_rgba(0,210,255,0.5)]'
                : 'text-slate-400 hover:text-cyan-300'
            }`}
          >
            NHIỆM VỤ HÀNG NGÀY ({dailyQuests.filter(q => q.current >= q.target).length}/4)
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setSubTab('custom');
            }}
            className={`px-3 py-1.5 text-xs font-bold font-chakra rounded-xs transition-colors cursor-pointer ${
              subTab === 'custom'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_10px_rgba(0,210,255,0.5)]'
                : 'text-slate-400 hover:text-cyan-300'
            }`}
          >
            MỤC TIÊU CÁ NHÂN ({customGoals.length})
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setSubTab('streak');
            }}
            className={`px-3 py-1.5 text-xs font-bold font-chakra rounded-xs transition-colors cursor-pointer ${
              subTab === 'streak'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_10px_rgba(0,210,255,0.5)]'
                : 'text-slate-400 hover:text-cyan-300'
            }`}
          >
            PHẦN THƯỞNG CHUỖI
          </button>
        </div>

        {subTab === 'custom' && (
          <button
            onClick={() => {
              soundFx.playClick();
              setShowCreateModal(true);
            }}
            className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-slate-950 font-chakra font-bold text-xs rounded-xs shadow-[0_0_12px_rgba(0,210,255,0.4)] cursor-pointer"
          >
            <PlusIcon className="w-3.5 h-3.5 text-slate-950" />
            <span>TỰ TẠO MỤC TIÊU MỚI</span>
          </button>
        )}
      </div>

      {/* SUBTAB 1: SYSTEM DAILY QUEST */}
      {subTab === 'system' && (
        <div className="space-y-4">
          <div className="system-window p-4 sm:p-6 rounded-sm relative">
            <div className="hud-corner-tl" />
            <div className="hud-corner-br" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-cyan-500/20 mb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 tracking-wider">
                  [NHIỆM VỤ HÀNG NGÀY: RÈN LUYỆN ĐỂ TRỞ NÊN MẠNH MẼ HƠN]
                </span>
                <h3 className="text-xl font-black text-white font-chakra mt-0.5">
                  BÀI TẬP THỂ CHẤT BẮT BUỘC CỦA CHÚA TỂ BÓNG TỐI
                </h3>
              </div>

              {/* Claim reward button */}
              {allDailyCompleted ? (
                dailyRewardClaimed ? (
                  <div className="px-4 py-2 bg-slate-900 border border-emerald-500/50 text-emerald-400 font-chakra font-bold text-xs rounded-xs flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-emerald-400" />
                    <span>ĐÃ NHẬN THƯỞNG HÔM NAY (+1 CHUỖI)</span>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      soundFx.playLevelUp();
                      onClaimDailyQuestReward();
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-chakra font-black text-sm rounded-xs shadow-[0_0_20px_rgba(16,185,129,0.7)] animate-pulse hover:brightness-110 cursor-pointer flex items-center gap-2"
                  >
                    <span>NHẬN THƯỞNG HỆ THỐNG (+3 ĐIỂM STATS, +800 VÀNG, BÌNH HỒI MÁU)</span>
                  </button>
                )
              ) : (
                <div className="px-3 py-1.5 bg-slate-950/80 border border-amber-500/40 text-amber-300 font-chakra text-xs rounded-xs">
                  Hoàn thành toàn bộ bài tập để nhận thưởng
                </div>
              )}
            </div>

            {/* Daily Exercises Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-slate-950/80 border border-cyan-500/25 rounded-xs mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white font-chakra">
                  DANH SÁCH BÀI TẬP ({dailyQuests.length} Bài)
                </span>
                <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                  (Tự do thêm hoặc tùy chỉnh số lượng theo thể trạng)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setShowAddExerciseModal(true);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-slate-950 font-bold font-chakra text-xs rounded-xs shadow-[0_0_8px_rgba(0,210,255,0.4)] cursor-pointer"
                >
                  <PlusIcon className="w-3.5 h-3.5 text-slate-950" />
                  <span>THÊM BÀI TẬP</span>
                </button>

                <button
                  onClick={() => {
                    if (window.confirm('Khôi phục lại danh sách 4 bài tập thể chất gốc của Solo Leveling (100 Hít đất, 100 Gập bụng, 100 Squat, 10km Chạy)?')) {
                      soundFx.playClick();
                      onResetDefaultDailyQuests();
                    }
                  }}
                  className="flex items-center gap-1 px-2.5 py-1 bg-slate-900 border border-slate-700 hover:border-cyan-500/40 text-slate-400 hover:text-slate-200 text-xs font-chakra rounded-xs transition-colors cursor-pointer"
                  title="Khôi phục 4 bài tập gốc"
                >
                  <RefreshIcon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">KHÔI PHỤC GỐC</span>
                </button>
              </div>
            </div>

            {/* Daily Exercises List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dailyQuests.map((quest) => {
                const isFinished = quest.current >= quest.target;
                const percent = Math.min(100, Math.round((quest.current / quest.target) * 100));

                return (
                  <div
                    key={quest.id}
                    className={`p-4 rounded-sm border transition-all ${
                      isFinished
                        ? 'bg-emerald-950/30 border-emerald-500/50'
                        : 'bg-slate-950/80 border-cyan-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${isFinished ? 'bg-emerald-400' : 'bg-cyan-400'}`} />
                        <h4 className="font-bold text-sm text-white font-chakra">{quest.name}</h4>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-orbitron text-xs font-bold text-cyan-300">
                          {quest.current} / {quest.target} {quest.unit}
                        </span>

                        {/* Edit Exercise Button */}
                        <button
                          onClick={() => handleOpenEditExercise(quest)}
                          className="p-1 rounded-xs bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
                          title="Chỉnh sửa bài tập này"
                        >
                          <EditPencilIcon className="w-3 h-3" />
                        </button>

                        {/* Delete Exercise Button */}
                        {dailyQuests.length > 1 && (
                          <button
                            onClick={() => {
                              if (window.confirm(`Bạn có chắc muốn xóa bài tập "${quest.name}" khỏi danh sách hàng ngày?`)) {
                                soundFx.playClick();
                                onDeleteDailyQuest(quest.id);
                              }
                            }}
                            className="p-1 rounded-xs bg-slate-900 border border-slate-700 hover:border-red-400 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                            title="Xóa bài tập này"
                          >
                            <TrashIcon className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2.5 bg-slate-900 border border-slate-700 rounded-xs overflow-hidden mb-3">
                      <div
                        className={`h-full transition-all duration-300 ${
                          isFinished
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                            : 'bg-gradient-to-r from-blue-600 to-cyan-400'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>

                    {/* Increment actions */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] text-slate-400 font-mono">Tiến độ: {percent}%</span>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            soundFx.playClick();
                            onUpdateDailyProgress(quest.id, quest.unit === 'km' ? 0.5 : 1);
                          }}
                          className="px-2 py-1 bg-cyan-950 border border-cyan-500/40 hover:border-cyan-300 text-cyan-200 text-xs font-bold rounded-xs cursor-pointer"
                        >
                          +{quest.unit === 'km' ? '0.5' : '1'}
                        </button>
                        <button
                          onClick={() => {
                            soundFx.playClick();
                            onUpdateDailyProgress(quest.id, quest.unit === 'km' ? 2 : 10);
                          }}
                          className="px-2 py-1 bg-cyan-950 border border-cyan-500/40 hover:border-cyan-300 text-cyan-200 text-xs font-bold rounded-xs cursor-pointer"
                        >
                          +{quest.unit === 'km' ? '2' : '10'}
                        </button>
                        <button
                          onClick={() => {
                            soundFx.playClick();
                            onUpdateDailyProgress(quest.id, quest.target - quest.current);
                          }}
                          disabled={isFinished}
                          className={`px-2.5 py-1 text-xs font-bold rounded-xs border transition-colors cursor-pointer ${
                            isFinished
                              ? 'bg-slate-900 border-slate-700 text-slate-500 cursor-not-allowed'
                              : 'bg-emerald-950 border-emerald-500/50 hover:border-emerald-400 text-emerald-300'
                          }`}
                        >
                          XONG
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Penalty Zone Notice */}
            <div className="mt-5 p-3.5 bg-red-950/30 border border-red-500/40 rounded-xs flex items-center gap-3">
              <AlertGlyphIcon className="w-6 h-6 text-red-400 shrink-0" />
              <p className="text-xs text-red-200/90 leading-relaxed font-chakra">
                <strong>HÌNH PHẠT CỦA HỆ THỐNG:</strong> Người chơi không hoàn thành đủ 100 cái hít đất, 100 cái gập bụng, 100 cái squat và 10km chạy bộ trước khi hết ngày sẽ lập tức bị kéo vào <strong>VÙNG PHẠT SA MẠC</strong> sinh tồn 4 giờ với bầy rết khổng lồ và toàn bộ chuỗi sẽ bị đứt!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: CUSTOM GOALS / TỰ TẠO MỤC TIÊU */}
      {subTab === 'custom' && (
        <div className="space-y-4">
          <div className="system-window p-4 sm:p-6 rounded-sm relative">
            <div className="hud-corner-tl" />
            <div className="hud-corner-br" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-cyan-500/20 mb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 tracking-wider">
                  [MỤC TIÊU CÁ NHÂN HÓA DO THỢ SĂN THIẾT LẬP]
                </span>
                <h3 className="text-xl font-black text-white font-chakra mt-0.5">
                  TỰ RÈN LUYỆN TRÍ TUỆ, THÓI QUEN & TINH THẦN
                </h3>
              </div>
            </div>

            {customGoals.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs italic">
                Bạn chưa tạo mục tiêu riêng nào. Hãy nhấn nút &quot;TỰ TẠO MỤC TIÊU MỚI&quot; để thêm mục tiêu học tập, rèn luyện kỹ năng của bạn!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {customGoals.map((goal) => {
                  const isDone = goal.current >= goal.target;
                  const progressPct = Math.min(100, Math.round((goal.current / goal.target) * 100));
                  const isHardGoal = goal.difficulty === 'B' || goal.difficulty === 'A' || goal.difficulty === 'S';

                  return (
                    <div
                      key={goal.id}
                      className={`p-4 rounded-sm border transition-all relative ${
                        isDone && isHardGoal
                          ? 'animate-border-glow-epic bg-gradient-to-br from-cyan-950/60 via-slate-950/90 to-purple-950/60'
                          : isDone
                          ? 'bg-purple-950/20 border-purple-500/40'
                          : 'bg-slate-950/80 border-cyan-500/30'
                      }`}
                    >
                      <button
                        onClick={() => {
                          soundFx.playClick();
                          onDeleteCustomGoal(goal.id);
                        }}
                        className="absolute top-2 right-2 p-1 text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
                        title="Xóa mục tiêu này"
                      >
                        <CloseIcon className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`px-1.5 py-0.2 text-[9px] font-bold border rounded-xs font-orbitron ${
                          isHardGoal ? 'border-amber-400 text-amber-300 bg-amber-950/80' : 'border-cyan-400 text-cyan-300 bg-cyan-950/70'
                        }`}>
                          HẠNG {goal.difficulty}
                        </span>
                        <span className="text-[10px] text-slate-400 uppercase font-chakra font-semibold">
                          {goal.category === 'study' ? 'Học Tập' : goal.category === 'physical' ? 'Thể Chất' : goal.category === 'mental' ? 'Tinh Thần' : 'Thói Quen'}
                        </span>
                        {isDone && isHardGoal && (
                          <span className="text-[10px] text-cyan-300 font-bold font-mono px-1 bg-cyan-900/60 border border-cyan-400 rounded-xs animate-pulse">
                            CHIẾN TÍCH HOÀN THÀNH
                          </span>
                        )}
                      </div>

                      <h4 className="font-bold text-sm text-white font-chakra pr-6 mb-2">
                        {goal.title}
                      </h4>

                      <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5">
                        <span>Tiến độ:</span>
                        <span className="font-orbitron font-bold text-cyan-300">
                          {goal.current} / {goal.target} {goal.unit}
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full h-2 bg-slate-900 border border-slate-800 rounded-xs overflow-hidden mb-3">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-300"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>

                      {/* Rewards & action */}
                      <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800/80">
                        <div className="flex items-center gap-2 text-[11px]">
                          <span className="text-yellow-400 font-semibold">+{goal.rewardExp} EXP</span>
                          <span className="text-amber-400 font-semibold">+{goal.rewardGold} VÀNG</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              soundFx.playClick();
                              onUpdateCustomGoalProgress(goal.id, 1);
                            }}
                            className="px-2 py-0.8 bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold rounded-xs text-[11px] cursor-pointer"
                          >
                            +1 {goal.unit}
                          </button>
                          <button
                            onClick={() => {
                              soundFx.playLevelUp();
                              onUpdateCustomGoalProgress(goal.id, goal.target - goal.current);
                            }}
                            disabled={isDone}
                            className={`px-2 py-0.8 font-bold rounded-xs text-[11px] border cursor-pointer ${
                              isDone
                                ? 'bg-slate-900 border-slate-700 text-slate-500 cursor-not-allowed'
                                : 'bg-emerald-950 border-emerald-500/50 text-emerald-300 hover:border-emerald-400'
                            }`}
                          >
                            {isDone ? 'HOÀN THÀNH' : 'ĐẠT MỤC TIÊU'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUBTAB 3: STREAK REWARDS */}
      {subTab === 'streak' && (
        <div className="space-y-4">
          <div className="system-window p-4 sm:p-6 rounded-sm relative">
            <div className="hud-corner-tl" />
            <div className="hud-corner-br" />

            <div className="pb-3 border-b border-cyan-500/20 mb-4">
              <span className="text-xs font-mono text-cyan-400 tracking-wider">
                [HỆ THỐNG PHẦN THƯỞNG DUY TRÌ CHUỖI RÈN LUYỆN]
              </span>
              <h3 className="text-xl font-black text-white font-chakra mt-0.5">
                KHO BÁU BẤT TẬN CHO Ý CHÍ KIÊN ĐỊNH
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Mỗi mốc chuỗi đạt được mở khóa rương báu độc quyền, điểm chỉ số tự do và vàng thưởng!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {streakRewards.map((reward) => {
                const isUnlocked = streak >= reward.days;

                return (
                  <div
                    key={reward.days}
                    className={`p-4 rounded-sm border transition-all ${
                      reward.claimed
                        ? 'bg-slate-950/60 border-slate-800 opacity-60'
                        : isUnlocked
                        ? 'bg-gradient-to-br from-amber-950/40 to-cyan-950/40 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                        : 'bg-slate-950/80 border-cyan-500/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <FlameStreakIcon className={`w-5 h-5 ${isUnlocked ? 'text-amber-400 animate-pulse' : 'text-slate-500'}`} />
                        <h4 className="font-bold text-sm text-white font-chakra">
                          MỐC {reward.days} NGÀY CHUỖI: {reward.title}
                        </h4>
                      </div>
                      <span className="text-xs font-mono font-bold text-cyan-300">
                        {streak}/{reward.days} Ngày
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 mb-3">
                      {reward.rewardText}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-amber-400 font-semibold font-orbitron">+{reward.gold.toLocaleString()} G</span>
                        <span className="text-cyan-300 font-semibold font-orbitron">+{reward.statPoints} STATS</span>
                      </div>

                      {reward.claimed ? (
                        <span className="text-xs text-slate-500 font-bold font-chakra">ĐÃ NHẬN</span>
                      ) : (
                        <button
                          onClick={() => {
                            if (isUnlocked) {
                              soundFx.playLevelUp();
                              onClaimStreakReward(reward.days);
                            }
                          }}
                          disabled={!isUnlocked}
                          className={`px-3 py-1.5 text-xs font-bold font-chakra rounded-xs border transition-all cursor-pointer ${
                            isUnlocked
                              ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 border-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.5)] hover:brightness-110'
                              : 'bg-slate-900 border-slate-800 text-slate-500 cursor-not-allowed'
                          }`}
                        >
                          {isUnlocked ? 'NHẬN THƯỞNG MỐC' : 'CHƯA ĐẠT'}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Modal: Create Custom Goal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="system-window w-full max-w-lg p-5 sm:p-6 rounded-sm relative border-cyan-400 shadow-[0_0_30px_rgba(0,210,255,0.4)]">
            <div className="hud-corner-tl" />
            <div className="hud-corner-tr" />
            <div className="hud-corner-bl" />
            <div className="hud-corner-br" />

            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/30 mb-4">
              <h3 className="text-lg font-bold text-white font-chakra flex items-center gap-2">
                <TargetIcon className="w-5 h-5 text-cyan-400" />
                <span>THIẾT LẬP MỤC TIÊU RÈN LUYỆN MỚI</span>
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateGoal} className="space-y-4 text-xs font-chakra">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Tên mục tiêu / Nhiệm vụ:
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ví dụ: Đọc 25 trang sách, Học ngoại ngữ 40 phút, Uống 2L nước..."
                  className="w-full px-3 py-2 bg-slate-950/90 border border-cyan-500/40 rounded-xs text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Phân loại:</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as 'physical' | 'study' | 'mental' | 'habit')}
                    className="w-full px-3 py-2 bg-slate-950/90 border border-cyan-500/40 rounded-xs text-white focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="study">Học tập & Trí tuệ</option>
                    <option value="physical">Thể chất & Sức khỏe</option>
                    <option value="mental">Tinh thần & Thiền</option>
                    <option value="habit">Thói quen tích cực</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Độ khó hệ thống:</label>
                  <select
                    value={newDifficulty}
                    onChange={(e) => setNewDifficulty(e.target.value as 'E' | 'D' | 'C' | 'B' | 'A' | 'S')}
                    className="w-full px-3 py-2 bg-slate-950/90 border border-cyan-500/40 rounded-xs text-white focus:border-cyan-400 focus:outline-none font-orbitron"
                  >
                    <option value="E">Hạng E (Dễ - 80 EXP, 150 Vàng)</option>
                    <option value="D">Hạng D (Thường - 140 EXP, 300 Vàng)</option>
                    <option value="C">Hạng C (Vừa - 220 EXP, 500 Vàng)</option>
                    <option value="B">Hạng B (Khó - 400 EXP, 900 Vàng)</option>
                    <option value="A">Hạng A (Cao cấp - 750 EXP, 1800 Vàng)</option>
                    <option value="S">Hạng S (Thử thách tối thượng - 1500 EXP, 4000 Vàng)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Mục tiêu số lượng:</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newTarget}
                    onChange={(e) => setNewTarget(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950/90 border border-cyan-500/40 rounded-xs text-white focus:border-cyan-400 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Đơn vị đo:</label>
                  <input
                    type="text"
                    required
                    value={newUnit}
                    onChange={(e) => setNewUnit(e.target.value)}
                    placeholder="trang, phút, km, cái, ly, giờ..."
                    className="w-full px-3 py-2 bg-slate-950/90 border border-cyan-500/40 rounded-xs text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-cyan-500/20">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-slate-900 border border-slate-700 text-slate-300 rounded-xs hover:bg-slate-800 cursor-pointer"
                >
                  HỦY BỎ
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold rounded-xs shadow-[0_0_15px_rgba(0,210,255,0.5)] hover:brightness-110 cursor-pointer"
                >
                  TẠO NHIỆM VỤ NGAY
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add New Daily Exercise */}
      {showAddExerciseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="system-window w-full max-w-md p-5 sm:p-6 rounded-sm relative border-cyan-400 shadow-[0_0_30px_rgba(0,210,255,0.4)]">
            <div className="hud-corner-tl" />
            <div className="hud-corner-tr" />
            <div className="hud-corner-bl" />
            <div className="hud-corner-br" />

            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/30 mb-4">
              <h3 className="text-lg font-bold text-white font-chakra flex items-center gap-2">
                <PlusIcon className="w-5 h-5 text-cyan-400" />
                <span>THÊM BÀI TẬP RÈN LUYỆN HÀNG NGÀY</span>
              </h3>
              <button
                onClick={() => setShowAddExerciseModal(false)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddExerciseSubmit} className="space-y-4 text-xs font-chakra">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Tên bài tập:
                </label>
                <input
                  type="text"
                  required
                  value={newExName}
                  onChange={(e) => setNewExName(e.target.value)}
                  placeholder="Ví dụ: Plank siết cơ bụng, Kéo xà đơn, Nhảy dây, Chống đẩy kim cương..."
                  className="w-full px-3 py-2 bg-slate-950/90 border border-cyan-500/40 rounded-xs text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Mục tiêu hàng ngày:
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newExTarget}
                    onChange={(e) => setNewExTarget(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3 py-2 bg-slate-950/90 border border-cyan-500/40 rounded-xs text-white focus:border-cyan-400 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Đơn vị đo:
                  </label>
                  <input
                    type="text"
                    required
                    value={newExUnit}
                    onChange={(e) => setNewExUnit(e.target.value)}
                    placeholder="lần, cái, giây, phút, km, hiệp..."
                    className="w-full px-3 py-2 bg-slate-950/90 border border-cyan-500/40 rounded-xs text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <p className="text-[11px] text-slate-400 italic">
                Bài tập mới sẽ được thêm vào danh sách rèn luyện hàng ngày và tính vào điều kiện hoàn thành để nhận thưởng chuỗi!
              </p>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-cyan-500/20">
                <button
                  type="button"
                  onClick={() => setShowAddExerciseModal(false)}
                  className="px-4 py-2 bg-slate-900 border border-slate-700 text-slate-300 rounded-xs hover:bg-slate-800 cursor-pointer"
                >
                  HỦY BỎ
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold rounded-xs shadow-[0_0_15px_rgba(0,210,255,0.5)] hover:brightness-110 cursor-pointer"
                >
                  THÊM VÀO NHIỆM VỤ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Existing Daily Exercise */}
      {editingExercise && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="system-window w-full max-w-md p-5 sm:p-6 rounded-sm relative border-cyan-400 shadow-[0_0_30px_rgba(0,210,255,0.4)]">
            <div className="hud-corner-tl" />
            <div className="hud-corner-tr" />
            <div className="hud-corner-bl" />
            <div className="hud-corner-br" />

            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/30 mb-4">
              <h3 className="text-lg font-bold text-white font-chakra flex items-center gap-2">
                <EditPencilIcon className="w-5 h-5 text-cyan-400" />
                <span>CHỈNH SỬA BÀI TẬP RÈN LUYỆN</span>
              </h3>
              <button
                onClick={() => setEditingExercise(null)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditExercise} className="space-y-4 text-xs font-chakra">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Tên bài tập:
                </label>
                <input
                  type="text"
                  required
                  value={editExName}
                  onChange={(e) => setEditExName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950/90 border border-cyan-500/40 rounded-xs text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Mục tiêu số lượng:
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={editExTarget}
                    onChange={(e) => setEditExTarget(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3 py-2 bg-slate-950/90 border border-cyan-500/40 rounded-xs text-white focus:border-cyan-400 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Đơn vị đo:
                  </label>
                  <input
                    type="text"
                    required
                    value={editExUnit}
                    onChange={(e) => setEditExUnit(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950/90 border border-cyan-500/40 rounded-xs text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-cyan-500/20">
                {dailyQuests.length > 1 ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(`Bạn có chắc muốn xóa bài tập "${editingExercise.name}"?`)) {
                        soundFx.playClick();
                        onDeleteDailyQuest(editingExercise.id);
                        setEditingExercise(null);
                      }
                    }}
                    className="px-3 py-2 bg-red-950 border border-red-500/60 hover:border-red-400 text-red-300 rounded-xs cursor-pointer flex items-center gap-1.5"
                  >
                    <TrashIcon className="w-3.5 h-3.5" />
                    <span>XÓA BÀI TẬP</span>
                  </button>
                ) : (
                  <div />
                )}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingExercise(null)}
                    className="px-4 py-2 bg-slate-900 border border-slate-700 text-slate-300 rounded-xs hover:bg-slate-800 cursor-pointer"
                  >
                    HỦY
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold rounded-xs shadow-[0_0_15px_rgba(0,210,255,0.5)] hover:brightness-110 cursor-pointer"
                  >
                    LƯU THAY ĐỔI
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
