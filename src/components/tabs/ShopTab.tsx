import React, { useState } from 'react';
import { PlayerStats, ShopItem } from '../../types';
import {
  ShopIcon,
  GoldCoinIcon,
  PotionIcon,
  SwordSlashIcon,
  CheckIcon,
} from '../icons/SystemIcons';
import { soundFx } from '../../utils/soundEffects';

interface ShopTabProps {
  stats: PlayerStats;
  shopItems: ShopItem[];
  onBuyItem: (item: ShopItem) => void;
  onToggleEquipItem: (item: ShopItem) => void;
  onDrinkPotion: (item: ShopItem) => void;
  onManualResetShop?: () => void;
  timeUntilShopReset?: string;
}

export const ShopTab: React.FC<ShopTabProps> = ({
  stats,
  shopItems,
  onBuyItem,
  onToggleEquipItem,
  onDrinkPotion,
  onManualResetShop,
  timeUntilShopReset = '23:59:59',
}) => {
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

  return (
    <div className="w-full max-w-7xl mx-auto p-3 sm:p-6 space-y-6">
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
              <span>SYSTEM STORE & INVENTORY</span>
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Cửa hàng tự động làm mới mỗi ngày lúc 00:00! Đổi Vàng để mua trang bị, dược phẩm quý hiếm và thần dược tăng điểm thuộc tính.
            </p>
          </div>

          {/* Right Header: Daily Reset Timer, Manual Refresh, and Gold Balance */}
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

        {/* Filter categories */}
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
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item, idx) => {
          const isOwned = item.quantity > 0;
          const canAfford = stats.gold >= item.price;
          const isPotion = item.type === 'potion';
          const isDailyDeal = idx === 0 || idx === 1; // Featured rotating item

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

              {/* Action & Price Footer */}
              <div className="pt-3 border-t border-slate-800">
                <div className="flex items-center justify-between mb-2 text-xs">
                  <div className="flex items-center gap-1 text-amber-400 font-bold font-orbitron">
                    <GoldCoinIcon className="w-3.5 h-3.5 text-amber-400" />
                    <span>{item.price.toLocaleString()} G</span>
                  </div>

                  {isOwned && (
                    <span className="text-[11px] text-cyan-300 font-mono font-semibold">
                      Sở hữu: x{item.quantity}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {/* Buy Button */}
                  <button
                    onClick={() => {
                      if (canAfford) {
                        soundFx.playStatAllocated();
                        onBuyItem(item);
                      }
                    }}
                    disabled={!canAfford}
                    className={`flex-1 py-1.5 text-xs font-bold font-chakra rounded-xs border transition-colors cursor-pointer ${
                      canAfford
                        ? 'bg-amber-950/80 border-amber-500/70 text-amber-300 hover:bg-amber-900'
                        : 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed'
                    }`}
                  >
                    MUA VẬT PHẨM
                  </button>

                  {/* Equip / Use Button if owned */}
                  {isOwned && (
                    isPotion ? (
                      <button
                        onClick={() => {
                          soundFx.playPotion();
                          onDrinkPotion(item);
                        }}
                        className="flex-1 py-1.5 bg-emerald-950/90 border border-emerald-500/70 text-emerald-300 font-bold font-chakra text-xs rounded-xs hover:bg-emerald-900 cursor-pointer"
                      >
                        SỬ DỤNG NGAY
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          soundFx.playClick();
                          onToggleEquipItem(item);
                        }}
                        className={`flex-1 py-1.5 text-xs font-bold font-chakra rounded-xs border transition-colors cursor-pointer ${
                          item.equipped
                            ? 'bg-emerald-900/60 border-emerald-400 text-emerald-200'
                            : 'bg-cyan-950 border-cyan-500/60 text-cyan-300 hover:bg-cyan-900'
                        }`}
                      >
                        {item.equipped ? 'THÁO TRANG BỊ' : 'TRANG BỊ'}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
