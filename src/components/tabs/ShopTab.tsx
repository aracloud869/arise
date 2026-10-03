import React, { useState } from 'react';
import { PlayerStats, ShopItem, ShadowSoldier, MonsterMaterial } from '../../types';
import {
  ShopIcon,
  GoldCoinIcon,
  PotionIcon,
  CrownMonarchIcon,
  CheckIcon,
  AriseIcon,
  FlameStreakIcon,
} from '../icons/SystemIcons';
import { soundFx } from '../../utils/soundEffects';

interface ShopTabProps {
  stats: PlayerStats;
  shopItems: ShopItem[];
  shadowArmy?: ShadowSoldier[];
  monsterMaterials?: MonsterMaterial[];
  onBuyItem: (item: ShopItem) => void;
  onToggleEquipItem: (item: ShopItem) => void;
  onDrinkPotion: (item: ShopItem) => void;
  onManualResetShop?: () => void;
  timeUntilShopReset?: string;
  onRecruitCompanion?: (companionId: string) => void;
  onUpgradeCompanion?: (companionId: string) => void;
  onDeployCompanion?: (companionId: string) => void;
}

export const ShopTab: React.FC<ShopTabProps> = ({
  stats,
  shopItems,
  shadowArmy = [],
  monsterMaterials = [],
  onBuyItem,
  onToggleEquipItem,
  onDrinkPotion,
  onManualResetShop,
  timeUntilShopReset = '23:59:59',
  onRecruitCompanion,
  onUpgradeCompanion,
  onDeployCompanion,
}) => {
  const [activeStoreTab, setActiveStoreTab] = useState<'items' | 'companions'>('items');
  const [filterType, setFilterType] = useState<'all' | 'weapon' | 'armor' | 'potion' | 'accessory'>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredItems = shopItems.filter((item) => {
    if (filterType === 'all') return true;
    return item.type === filterType;
  });

  const handleRefreshClick = () => {
    soundFx.playSystemNotification();
    setIsRefreshing(true);
    onManualResetShop?.();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const getMaterial = (matId?: string) => {
    if (!matId) return null;
    return monsterMaterials.find((m) => m.id === matId) || null;
  };

  const deployedCompanion = shadowArmy.find((s) => s.isDeployed && s.isRecruited);

  return (
    <div className="w-full max-w-7xl mx-auto p-3 sm:p-6 space-y-6 box-border">
      {/* Header Window */}
      <div className="system-window p-4 sm:p-6 rounded-sm relative">
        <div className="hud-corner-tl" />
        <div className="hud-corner-tr" />
        <div className="hud-corner-bl" />
        <div className="hud-corner-br" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-cyan-500/20">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>HỆ THỐNG / CỬA HÀNG KHÔNG GIAN BỐN CHIỀU</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-chakra tracking-wide mt-1 flex items-center gap-2">
              <ShopIcon className="w-7 h-7 text-cyan-400" />
              <span>SYSTEM STORE & COMPANIONS</span>
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Mua sắm trang bị thần thoại, thần dược tăng chỉ số vĩnh viễn, chiêu mộ và thăng cấp Quân Đoàn Trợ Thủ Bóng Tối xuất chiến!
            </p>
          </div>

          {/* Right Header: Reset Timer, Manual Refresh, and Gold Balance */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Daily Reset Countdown Timer */}
            <div className="px-3 py-2 bg-slate-950/80 border border-cyan-500/40 rounded-xs flex items-center gap-2 text-xs font-mono shadow-[0_0_12px_rgba(0,210,255,0.15)]">
              <span className="text-slate-400 text-[11px] font-chakra font-bold">LÀM MỚI HÀNG NGÀY:</span>
              <span className="font-orbitron font-bold text-cyan-300 text-sm animate-pulse">
                {timeUntilShopReset}
              </span>
            </div>

            {/* Manual Restock Button */}
            <button
              onClick={handleRefreshClick}
              disabled={isRefreshing}
              className={`px-3 py-2 border rounded-xs text-xs font-chakra font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                isRefreshing
                  ? 'bg-cyan-900 border-cyan-400 text-cyan-200'
                  : 'bg-slate-900/90 border-cyan-500/60 text-cyan-300 hover:bg-cyan-950 hover:border-cyan-300 shadow-[0_0_10px_rgba(0,210,255,0.2)]'
              }`}
              title="Làm mới vật phẩm cửa hàng ngay"
            >
              <span className={isRefreshing ? 'animate-spin' : ''}>🔄</span>
              <span>{isRefreshing ? 'ĐANG LÀM MỚI...' : 'LÀM MỚI NGAY'}</span>
            </button>

            {/* User's Gold Wallet */}
            <div className="flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-amber-950/80 to-slate-900 border border-amber-400/80 rounded-sm shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              <GoldCoinIcon className="w-5 h-5 text-amber-400" />
              <div className="flex flex-col">
                <span className="text-[10px] text-amber-300 uppercase font-semibold font-chakra leading-tight">
                  VÀNG KHẢ DỤNG
                </span>
                <span className="text-base font-bold font-orbitron text-amber-300 leading-tight">
                  {stats.gold.toLocaleString('vi-VN')} G
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* PRIMARY SUB-TAB NAVIGATION: ITEMS vs SHADOW COMPANIONS */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-2 border-b border-slate-800">
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveStoreTab('items');
            }}
            className={`px-4 py-2 text-xs font-black font-chakra rounded-t-xs border-t border-x transition-all flex items-center gap-2 cursor-pointer ${
              activeStoreTab === 'items'
                ? 'bg-slate-900 border-cyan-400 text-cyan-200 shadow-[0_-4px_15px_rgba(0,229,255,0.25)] border-b-2 border-b-transparent -mb-[1px]'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShopIcon className="w-4 h-4 text-cyan-400" />
            <span>🎒 KHO TRANG BỊ & DƯỢC PHẨM ({shopItems.length})</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveStoreTab('companions');
            }}
            className={`px-4 py-2 text-xs font-black font-chakra rounded-t-xs border-t border-x transition-all flex items-center gap-2 cursor-pointer ${
              activeStoreTab === 'companions'
                ? 'bg-purple-950/80 border-purple-400 text-purple-200 shadow-[0_-4px_15px_rgba(168,85,247,0.35)] border-b-2 border-b-transparent -mb-[1px]'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-purple-300'
            }`}
          >
            <CrownMonarchIcon className="w-4 h-4 text-purple-400" />
            <span>👑 CHIÊU MỘ & NÂNG CẤP TRỢ THỦ ({shadowArmy.length})</span>
            {deployedCompanion && (
              <span className="px-1.5 py-0.2 bg-purple-900 border border-purple-400 text-[9px] font-mono text-purple-200 rounded-xs">
                XUẤT TRẬN: {deployedCompanion.name.split(' ')[0]}
              </span>
            )}
          </button>
        </div>

        {/* Filter categories for Items tab */}
        {activeStoreTab === 'items' && (
          <div className="flex flex-wrap items-center gap-1.5 mt-4">
            {[
              { id: 'all', label: 'TẤT CẢ VẬT PHẨM' },
              { id: 'weapon', label: 'VŨ KHÍ TẤN CÔNG' },
              { id: 'armor', label: 'GIÁP TRỤ BẢO HỘ' },
              { id: 'potion', label: 'DƯỢC PHẨM & THẦN DƯỢC' },
              { id: 'accessory', label: 'TRANG SỨC PHỤ KIỆN' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  soundFx.playClick();
                  setFilterType(cat.id as typeof filterType);
                }}
                className={`px-3 py-1.5 text-xs font-bold font-chakra rounded-xs border transition-colors cursor-pointer ${
                  filterType === cat.id
                    ? 'bg-cyan-500 border-cyan-400 text-slate-950 shadow-[0_0_10px_rgba(0,210,255,0.4)]'
                    : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/30'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 1. ITEMS VIEW */}
      {/* ========================================================================= */}
      {activeStoreTab === 'items' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item, idx) => {
            const isOwned = item.quantity > 0;
            const canAfford = stats.gold >= item.price;
            const isPotion = item.type === 'potion';
            const isDailyDeal = idx === 0 || idx === 1;

            return (
              <div
                key={item.id}
                className={`p-4 rounded-sm border flex flex-col justify-between transition-all relative overflow-hidden ${
                  item.equipped
                    ? 'bg-gradient-to-b from-emerald-950/30 to-slate-950/90 border-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                    : isOwned
                    ? 'bg-slate-950/90 border-cyan-500/40'
                    : 'bg-slate-950/70 border-slate-800 hover:border-cyan-500/30'
                }`}
              >
                {/* Daily Deal Corner Ribbon */}
                {isDailyDeal && (
                  <div className="absolute -top-1 -right-1 px-3 py-0.5 bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 text-[10px] font-black font-chakra rounded-bl-sm shadow-md uppercase">
                    ƯU ĐÃI HÔM NAY -30%
                  </div>
                )}

                <div>
                  {/* Top: Rank badge & Type */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 text-[10px] font-bold border border-cyan-400 text-cyan-300 bg-cyan-950/80 rounded-xs font-orbitron">
                        HẠNG {item.rank}
                      </span>

                      <span className="text-[10px] font-mono text-cyan-400/80 bg-cyan-950/50 px-1.5 py-0.5 border border-cyan-500/20 rounded-xs">
                        MỖI NGÀY RESET
                      </span>
                    </div>

                    <span className="text-[11px] font-mono text-slate-400 uppercase">
                      {item.type === 'weapon' ? 'Vũ Khí' : item.type === 'armor' ? 'Giáp Trụ' : item.type === 'potion' ? 'Dược Phẩm' : 'Phụ Kiện'}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-base text-white font-chakra mb-1 flex items-center gap-1.5">
                    <span>{item.name}</span>
                  </h3>

                  <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Stat Bonuses */}
                  {Object.keys(item.statsBonus).length > 0 && (
                    <div className="p-2.5 bg-slate-900/90 border border-cyan-500/20 rounded-xs mb-3 space-y-1 text-xs">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block font-chakra">
                        HIỆU ỨNG TĂNG CHỈ SỐ:
                      </span>
                      <div className="flex flex-wrap gap-2 text-cyan-300 font-mono font-bold">
                        {Object.entries(item.statsBonus).map(([k, v]) => (
                          <span key={k} className="bg-cyan-950/60 px-1.5 py-0.5 rounded-xs border border-cyan-500/30">
                            +{v} {k.toUpperCase()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Row: Quantity, Price, Action Button */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between mt-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <GoldCoinIcon className="w-4 h-4 text-amber-400" />
                      <span className="text-sm font-bold font-orbitron text-amber-300">
                        {item.price.toLocaleString('vi-VN')} G
                      </span>
                    </div>
                    {isOwned && (
                      <span className="text-[10px] font-mono text-emerald-400 block mt-0.5">
                        Đang sở hữu: {item.quantity} cái
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Buy Button */}
                    <button
                      onClick={() => onBuyItem(item)}
                      disabled={!canAfford}
                      className={`px-3 py-1.5 rounded-xs text-xs font-bold font-chakra transition-all cursor-pointer ${
                        canAfford
                          ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 border border-cyan-300 shadow-[0_0_10px_rgba(0,210,255,0.4)]'
                          : 'bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed'
                      }`}
                    >
                      MUA THÊM
                    </button>

                    {/* Drink / Use Button for Potions */}
                    {isPotion && isOwned && (
                      <button
                        onClick={() => onDrinkPotion(item)}
                        className="px-3 py-1.5 rounded-xs text-xs font-bold font-chakra bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-400 cursor-pointer shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                      >
                        SỬ DỤNG
                      </button>
                    )}

                    {/* Equip / Unequip Toggle */}
                    {!isPotion && isOwned && (
                      <button
                        onClick={() => onToggleEquipItem(item)}
                        className={`px-3 py-1.5 rounded-xs text-xs font-bold font-chakra border transition-all cursor-pointer flex items-center gap-1 ${
                          item.equipped
                            ? 'bg-emerald-950 border-emerald-400 text-emerald-200'
                            : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-cyan-400'
                        }`}
                      >
                        {item.equipped ? (
                          <>
                            <CheckIcon className="w-3.5 h-3.5 text-emerald-400" />
                            <span>ĐÃ TRANG BỊ</span>
                          </>
                        ) : (
                          <span>TRANG BỊ</span>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. COMPANIONS RECRUITMENT & UPGRADE VIEW */}
      {/* ========================================================================= */}
      {activeStoreTab === 'companions' && (
        <div className="space-y-4">
          <div className="p-3 bg-purple-950/40 border border-purple-500/40 rounded-xs flex items-center justify-between text-xs font-mono">
            <span className="text-purple-300 font-bold flex items-center gap-2">
              <CrownMonarchIcon className="w-4 h-4 text-purple-400" />
              <span>QUÂN ĐOÀN CHIẾN BINH BÓNG TỐI: {shadowArmy.filter((s) => s.isRecruited).length} / {shadowArmy.length} ĐÃ THỨC TỈNH</span>
            </span>
            <span className="text-slate-400 text-[11px]">
              Trợ thủ được chọn "XUẤT TRẬN" sẽ tham chiến cùng bạn trong Hầm Ngục & khiêu chiến Trùm!
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {shadowArmy.map((comp) => {
              const isRecruited = comp.isRecruited ?? false;
              const isDeployed = comp.isDeployed ?? false;
              const currentLevel = comp.level || 1;
              const maxLevel = comp.maxLevel || 10;
              const isMaxLevel = currentLevel >= maxLevel;

              // Upgrade material
              const upMat = getMaterial(comp.upgradeCostMaterialId);
              const hasUpMat = (upMat?.count || 0) >= (comp.upgradeCostMaterialCount || 1);
              const canAffordUpgrade = stats.gold >= (comp.upgradeCostGold || 2500) && hasUpMat && !isMaxLevel;

              // Recruit material
              const recMat = getMaterial(comp.recruitCostMaterialId);
              const hasRecMat = !comp.recruitCostMaterialId || ((recMat?.count || 0) >= (comp.recruitCostMaterialCount || 1));
              const canAffordRecruit = stats.gold >= (comp.recruitCostGold || 0) && hasRecMat;

              return (
                <div
                  key={comp.id}
                  className={`p-4 rounded-sm border flex flex-col justify-between transition-all relative overflow-hidden ${
                    isDeployed
                      ? 'bg-gradient-to-b from-purple-950/90 via-slate-950 to-slate-950 border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.35)] ring-1 ring-purple-400/50'
                      : isRecruited
                      ? 'bg-slate-950/90 border-slate-700 hover:border-purple-500/50 shadow-md'
                      : 'bg-slate-950/70 border-slate-800 opacity-80 hover:opacity-100'
                  }`}
                >
                  {/* Deployed Badge */}
                  {isDeployed && (
                    <div className="absolute top-2 right-2 px-2.5 py-0.5 bg-purple-900 border border-purple-300 text-purple-200 text-[10px] font-black font-chakra rounded-xs shadow-md flex items-center gap-1 animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-300 animate-ping" />
                      <span>ĐANG XUẤT TRẬN</span>
                    </div>
                  )}

                  <div>
                    {/* Header: Rank, Role, Level */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 text-[10px] font-bold border border-purple-400 text-purple-300 bg-purple-950/80 rounded-xs font-orbitron">
                        {comp.rank}
                      </span>
                      <span className="px-2 py-0.5 text-[10px] font-bold border border-cyan-400/60 text-cyan-300 bg-cyan-950/60 rounded-xs font-chakra uppercase">
                        {comp.combatRole === 'dps'
                          ? '⚔️ ĐAO PHỦ SÁT THƯƠNG'
                          : comp.combatRole === 'tank'
                          ? '🛡️ CHIẾN BINH HỘ VỆ'
                          : comp.combatRole === 'healer'
                          ? '💚 TRỊ LIỆU SINH MỆNH'
                          : comp.combatRole === 'mage'
                          ? '🔮 ĐẠI PHÁP SƯ'
                          : '🗡️ SÁT THỦ ÂM THANH'}
                      </span>
                      {isRecruited && (
                        <span className="text-[10px] font-mono text-amber-300 font-bold ml-auto">
                          CẤP {currentLevel}/{maxLevel}
                        </span>
                      )}
                    </div>

                    {/* Name & Title */}
                    <h3 className="font-bold text-lg text-white font-chakra mb-0.5 flex items-center gap-2">
                      <CrownMonarchIcon className="w-5 h-5 text-purple-400 shrink-0" />
                      <span>{comp.name}</span>
                    </h3>
                    <span className="text-[11px] font-mono text-purple-300/80 block mb-2">
                      {comp.originalName}
                    </span>

                    <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                      {comp.description}
                    </p>

                    {/* Combat Stats & Signature Skill */}
                    <div className="p-2.5 bg-slate-900/90 border border-purple-500/30 rounded-xs mb-3 space-y-1.5 text-xs font-mono">
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="text-slate-400">LỰC CHIẾN ĐỘI QUÂN:</span>
                        <span className="text-amber-300 font-bold font-orbitron">
                          {((comp.power || 1000) * (1 + (currentLevel - 1) * 0.35)).toFixed(0)} CP
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="text-slate-400">SÁT THƯƠNG KHI TRIỆU HỒI:</span>
                        <span className="text-rose-400 font-bold font-orbitron">
                          {((comp.combatDamage || 1500) * (1 + (currentLevel - 1) * 0.40)).toFixed(0)} DMG
                        </span>
                      </div>
                      {comp.signatureSkill && (
                        <div className="pt-1.5 border-t border-slate-800">
                          <span className="text-cyan-300 font-bold block text-[11px]">
                            ⚡ Tuyệt Kỹ: {comp.signatureSkill}
                          </span>
                          <span className="text-[10px] text-slate-400 leading-tight block mt-0.5 font-chakra">
                            {comp.signatureSkillDesc}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom Action Area */}
                  <div className="pt-3 border-t border-slate-800/80 space-y-2 mt-2">
                    {/* NOT RECRUITED YET: RECRUITMENT BUTTON */}
                    {!isRecruited ? (
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-slate-400">CHI PHÍ CHIÊU MỘ:</span>
                          <div className="flex items-center gap-2">
                            <span className="text-amber-300 font-bold">
                              {(comp.recruitCostGold || 0).toLocaleString()} G
                            </span>
                            {recMat && (
                              <span className="text-purple-300 font-bold">
                                +{comp.recruitCostMaterialCount} {recMat.name} ({recMat.count}/{comp.recruitCostMaterialCount})
                              </span>
                            )}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRecruitCompanion?.(comp.id)}
                          disabled={!canAffordRecruit}
                          className={`w-full py-2 rounded-xs text-xs font-chakra font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                            canAffordRecruit
                              ? 'bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                              : 'bg-slate-900 border border-slate-800 text-slate-600 cursor-not-allowed'
                          }`}
                        >
                          <AriseIcon className="w-4 h-4 text-purple-300" />
                          <span>CHIÊU MỘ TRỢ THỦ BÓNG TỐI</span>
                        </button>
                      </div>
                    ) : (
                      /* RECRUITED: UPGRADE & DEPLOY TOGGLE */
                      <div className="space-y-2">
                        {/* Upgrade row */}
                        {!isMaxLevel && (
                          <div className="flex items-center justify-between text-[11px] font-mono p-1.5 bg-slate-900/80 rounded-xs border border-slate-800">
                            <div>
                              <span className="text-slate-400 block text-[10px]">CHI PHÍ NÂNG CẤP:</span>
                              <span className="text-amber-300 font-bold">
                                {(comp.upgradeCostGold || 2500).toLocaleString()} G
                              </span>
                              {upMat && (
                                <span className={`ml-1 text-[10px] ${hasUpMat ? 'text-emerald-400' : 'text-rose-400'}`}>
                                  +{comp.upgradeCostMaterialCount} {upMat.name} ({upMat.count}/{comp.upgradeCostMaterialCount})
                                </span>
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={() => onUpgradeCompanion?.(comp.id)}
                              disabled={!canAffordUpgrade}
                              className={`px-3 py-1.5 rounded-xs text-xs font-chakra font-black transition-all cursor-pointer ${
                                canAffordUpgrade
                                  ? 'bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold shadow-[0_0_10px_rgba(0,229,255,0.4)]'
                                  : 'bg-slate-900 border border-slate-800 text-slate-600 cursor-not-allowed'
                              }`}
                            >
                              <span>+ NÂNG CẤP CẤP {currentLevel + 1}</span>
                            </button>
                          </div>
                        )}

                        {isMaxLevel && (
                          <div className="text-center py-1 text-[11px] font-mono text-amber-400 bg-amber-950/40 border border-amber-500/40 rounded-xs">
                            ★ ĐÃ ĐẠT CẤP ĐỘ TỐI ĐA (MAX LEVEL 10)
                          </div>
                        )}

                        {/* Deploy toggle button */}
                        <button
                          type="button"
                          onClick={() => onDeployCompanion?.(comp.id)}
                          className={`w-full py-2 rounded-xs text-xs font-chakra font-black border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                            isDeployed
                              ? 'bg-purple-900/90 border-purple-400 text-purple-100 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                              : 'bg-slate-900 hover:bg-slate-850 border-slate-700 text-slate-300 hover:text-white'
                          }`}
                        >
                          <CrownMonarchIcon className="w-4 h-4 text-purple-400" />
                          <span>{isDeployed ? '✓ ĐANG XUẤT TRẬN' : 'ĐẶT LÀM TRỢ THỦ XUẤT TRẬN'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
