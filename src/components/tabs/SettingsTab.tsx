import React, { useState } from 'react';
import { AppSettings } from '../../types';
import {
  SettingsIcon,
  VolumeIcon,
  CheckIcon,
  CrownMonarchIcon,
} from '../icons/SystemIcons';
import { soundFx } from '../../utils/soundEffects';

interface SettingsTabProps {
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
  onResetData: () => void;
  onExportData: () => void;
  onCopyData?: () => void;
  onImportData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImportJsonText?: (jsonText: string) => boolean;
  backupSummary?: {
    level: number;
    rank: string;
    gold: number;
    unlockedTalents: number;
    totalTalents: number;
    materialsCount: number;
    skillsCount: number;
    shadowsCount: number;
  };
}

export const SettingsTab: React.FC<SettingsTabProps> = ({
  settings,
  onUpdateSettings,
  onResetData,
  onExportData,
  onCopyData,
  onImportData,
  onImportJsonText,
  backupSummary,
}) => {
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [isPasteModalOpen, setIsPasteModalOpen] = useState(false);
  const [pasteInputText, setPasteInputText] = useState('');
  const [pasteError, setPasteError] = useState<string | null>(null);

  const handleCopy = () => {
    soundFx.playClick();
    onCopyData?.();
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const handleConfirmPaste = () => {
    if (!pasteInputText.trim()) {
      setPasteError('Vui lòng dán chuỗi JSON sao lưu!');
      return;
    }
    const success = onImportJsonText?.(pasteInputText.trim());
    if (success) {
      setPasteInputText('');
      setPasteError(null);
      setIsPasteModalOpen(false);
    } else {
      setPasteError('Định dạng JSON không hợp lệ hoặc dữ liệu bị thiếu!');
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-3 sm:p-6 space-y-6">
      {/* Header Window */}
      <div className="system-window p-4 sm:p-6 rounded-sm relative">
        <div className="hud-corner-tl" />
        <div className="hud-corner-tr" />
        <div className="hud-corner-bl" />
        <div className="hud-corner-br" />

        <div className="pb-4 border-b border-cyan-500/20">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono tracking-widest uppercase">
            <span>HỆ THỐNG / BẢNG THIẾT LẬP THIẾT BỊ VÀ HIỆU NĂNG</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-chakra tracking-wide mt-1 flex items-center gap-2">
            <SettingsIcon className="w-7 h-7 text-cyan-400" />
            <span>SYSTEM CONFIGURATION</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Tùy biến điều khiển linh hoạt trên mọi loại thiết bị (Điện thoại, Máy tính bảng, PC), tối ưu hiệu năng mượt mà và âm thanh.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Audio Controls */}
          <div className="p-4 bg-slate-950/80 border border-cyan-500/30 rounded-xs space-y-4">
            <h3 className="text-sm font-bold text-white font-chakra flex items-center gap-2 border-b border-cyan-500/20 pb-2">
              <VolumeIcon soundOn={settings.soundEnabled} className="w-4 h-4 text-cyan-400" />
              <span>ÂM THANH HIỆU ỨNG (AUDIO SFX)</span>
            </h3>

            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-xs text-slate-200 block">Kích hoạt âm thanh Hệ Thống</span>
                <span className="text-[11px] text-slate-400">Tiếng chém dao, Arise triệu hồi, tiếng ting ting thăng cấp</span>
              </div>
              <button
                onClick={() => {
                  soundFx.setEnabled(!settings.soundEnabled);
                  onUpdateSettings({ soundEnabled: !settings.soundEnabled });
                  if (!settings.soundEnabled) soundFx.playSystemNotification();
                }}
                className={`px-3 py-1.5 rounded-xs text-xs font-bold border transition-colors cursor-pointer ${
                  settings.soundEnabled
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-chakra'
                    : 'bg-slate-900 text-slate-500 border-slate-700 font-chakra'
                }`}
              >
                {settings.soundEnabled ? 'ĐANG BẬT' : 'ĐÃ TẮT'}
              </button>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-300">Âm lượng hiệu ứng:</span>
                <span className="font-mono text-cyan-300 font-bold">{Math.round(settings.sfxVolume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={settings.sfxVolume}
                onChange={(e) => {
                  const vol = parseFloat(e.target.value);
                  soundFx.setVolume(vol);
                  onUpdateSettings({ sfxVolume: vol });
                }}
                className="w-full accent-cyan-400"
              />
            </div>
          </div>

          {/* Performance & Visuals */}
          <div className="p-4 bg-slate-950/80 border border-cyan-500/30 rounded-xs space-y-4">
            <h3 className="text-sm font-bold text-white font-chakra flex items-center gap-2 border-b border-cyan-500/20 pb-2">
              <SettingsIcon className="w-4 h-4 text-cyan-400" />
              <span>HIỆU ỨNG HÌNH ẢNH & THÔNG BÁO</span>
            </h3>

            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-xs text-slate-200 block">Rung màn hình chấn động (Screen Shake)</span>
                <span className="text-[11px] text-slate-400">Rung động vật lý khi xuất đòn bạo kích hoặc bị quái đánh trúng</span>
              </div>
              <button
                onClick={() => {
                  soundFx.playClick();
                  onUpdateSettings({ screenShake: !settings.screenShake });
                }}
                className={`px-3 py-1.5 rounded-xs text-xs font-bold border transition-colors cursor-pointer ${
                  settings.screenShake
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-chakra'
                    : 'bg-slate-900 text-slate-500 border-slate-700 font-chakra'
                }`}
              >
                {settings.screenShake ? 'BẬT' : 'TẮT'}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-xs text-slate-200 block">Thông báo tự động Hệ Thống</span>
                <span className="text-[11px] text-slate-400">Tự động báo nhắc hoàn thành nhiệm vụ và cảnh báo hình phạt</span>
              </div>
              <button
                onClick={() => {
                  soundFx.playClick();
                  onUpdateSettings({ autoNotifications: !settings.autoNotifications });
                }}
                className={`px-3 py-1.5 rounded-xs text-xs font-bold border transition-colors cursor-pointer ${
                  settings.autoNotifications
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-chakra'
                    : 'bg-slate-900 text-slate-500 border-slate-700 font-chakra'
                }`}
              >
                {settings.autoNotifications ? 'BẬT' : 'TẮT'}
              </button>
            </div>
          </div>

          {/* Controls & Device Keybindings */}
          <div className="p-4 bg-slate-950/80 border border-cyan-500/30 rounded-xs space-y-3">
            <h3 className="text-sm font-bold text-white font-chakra border-b border-cyan-500/20 pb-2">
              SƠ ĐỒ PHÍM ĐIỀU KHIỂN LINH HOẠT
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 bg-slate-900/60 rounded-xs">
                <span className="text-slate-300">Tấn công thường liên hoàn:</span>
                <kbd className="px-2 py-0.5 bg-slate-950 border border-cyan-400 text-cyan-300 font-mono rounded-xs font-bold">
                  Phím SPACE / Chuột trái
                </kbd>
              </div>

              <div className="flex items-center justify-between p-2 bg-slate-900/60 rounded-xs">
                <span className="text-slate-300">Kích hoạt Kỹ năng 1 - 5:</span>
                <kbd className="px-2 py-0.5 bg-slate-950 border border-cyan-400 text-cyan-300 font-mono rounded-xs font-bold">
                  Phím 1, 2, 3, 4, 5
                </kbd>
              </div>

              <div className="flex items-center justify-between p-2 bg-slate-900/60 rounded-xs">
                <span className="text-slate-300">Điều khiển trên Điện thoại / Cảm ứng:</span>
                <span className="text-emerald-400 font-chakra font-semibold">
                  Tối ưu hóa nút bấm to rõ, nhạy 100%
                </span>
              </div>
            </div>
          </div>

          {/* Backup, Export & Reset */}
          <div className="p-4 bg-slate-950/80 border border-cyan-500/30 rounded-xs space-y-3">
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
              <h3 className="text-sm font-bold text-white font-chakra flex items-center gap-1.5">
                <CrownMonarchIcon className="w-4 h-4 text-cyan-400" />
                <span>SAO LƯU TOÀN DIỆN 100% (FULL BACKUP)</span>
              </h3>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-500/50 px-2 py-0.5 rounded-xs font-bold">
                BẢO VỆ DỮ LIỆU TÀI NĂNG
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Tính năng xuất dữ liệu tự động đóng gói <strong className="text-cyan-300">100% toàn bộ tiến trình</strong>: Cây Tài Năng (Tất cả Node & Bậc Đột Phá), Kho Nguyên Liệu Quái Vật, Bộ 22 Kỹ Năng, Quân Đoàn Bóng Tối, Chỉ Số Thợ Săn, Nhiệm Vụ và Chuỗi Ngày Streak.
            </p>

            {/* Live Data Summary Pills */}
            {backupSummary && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-2 bg-slate-900/70 border border-slate-800 rounded-xs text-[10px] font-mono">
                <div className="text-slate-300">
                  <span className="text-slate-400 block text-[9px]">CÂY TÀI NĂNG:</span>
                  <span className="text-cyan-300 font-bold">{backupSummary.unlockedTalents}/{backupSummary.totalTalents} Đã Mở</span>
                </div>
                <div className="text-slate-300">
                  <span className="text-slate-400 block text-[9px]">BẬC HIỆN TẠI:</span>
                  <span className="text-amber-300 font-bold">Rank {backupSummary.rank}</span>
                </div>
                <div className="text-slate-300">
                  <span className="text-slate-400 block text-[9px]">KỸ NĂNG:</span>
                  <span className="text-emerald-300 font-bold">{backupSummary.skillsCount} Chiêu</span>
                </div>
                <div className="text-slate-300">
                  <span className="text-slate-400 block text-[9px]">QUÂN ĐOÀN:</span>
                  <span className="text-purple-300 font-bold">{backupSummary.shadowsCount} Bóng</span>
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2 pt-2">
              {/* 1. Direct JSON File Download */}
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  onExportData();
                }}
                className="px-3 py-2 bg-cyan-950/90 hover:bg-cyan-900 border border-cyan-400 text-cyan-200 text-xs font-bold font-chakra rounded-xs cursor-pointer shadow-[0_0_12px_rgba(0,229,255,0.35)] flex items-center gap-1.5 transition-all"
              >
                <span>💾 XUẤT FULL FILE JSON</span>
              </button>

              {/* 2. Copy JSON Text to Clipboard */}
              <button
                type="button"
                onClick={handleCopy}
                className="px-3 py-2 bg-slate-900 hover:bg-slate-850 border border-cyan-500/60 text-cyan-300 text-xs font-bold font-chakra rounded-xs cursor-pointer flex items-center gap-1.5 transition-all"
              >
                <span>{copyFeedback ? '✓ ĐÃ SAO CHÉP!' : '📋 SAO CHÉP MÃ JSON'}</span>
              </button>

              {/* 3. Upload File to Import */}
              <label className="px-3 py-2 bg-slate-900 hover:bg-slate-850 border border-emerald-500/60 text-emerald-300 text-xs font-bold font-chakra rounded-xs cursor-pointer flex items-center gap-1.5 transition-all">
                <span>📂 NHẬP FILE JSON</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={onImportData}
                  className="hidden"
                />
              </label>

              {/* 4. Paste Text Import */}
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setIsPasteModalOpen(true);
                  setPasteError(null);
                }}
                className="px-3 py-2 bg-slate-900 hover:bg-slate-850 border border-slate-700 text-slate-300 text-xs font-bold font-chakra rounded-xs cursor-pointer transition-all"
              >
                <span>📝 DÁN MÃ ĐỂ KHÔI PHỤC</span>
              </button>

              {/* 5. Reset to Zero */}
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Bạn có chắc chắn muốn thiết lập lại toàn bộ tiến trình Hệ Thống về ban đầu (Level 1, Hạng E)?')) {
                    soundFx.playPenaltyWarning();
                    onResetData();
                  }
                }}
                className="px-3 py-2 bg-red-950/80 hover:bg-red-900 border border-red-500/60 text-red-300 text-xs font-bold font-chakra rounded-xs cursor-pointer transition-all"
              >
                KHÔI PHỤC MẶC ĐỊNH
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: PASTE RAW JSON BACKUP TEXT */}
      {isPasteModalOpen && (
        <div className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
          <div className="relative w-full max-w-xl bg-slate-950 border border-cyan-400 rounded-sm shadow-[0_0_35px_rgba(0,229,255,0.4)] p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-cyan-500/30 pb-3">
              <h3 className="text-base sm:text-lg font-black text-white font-chakra flex items-center gap-2">
                <CrownMonarchIcon className="w-5 h-5 text-cyan-400" />
                <span>DÁN MÃ DỮ LIỆU SAO LƯU (JSON TEXT)</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsPasteModalOpen(false)}
                className="text-slate-400 hover:text-white font-mono text-sm"
              >
                ✕ Đóng
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Dán toàn bộ nội dung JSON bạn đã sao lưu trước đó vào ô bên dưới để khôi phục đầy đủ tiến trình Cây Tài Năng, Kỹ Năng và Quân Đoàn:
            </p>

            <textarea
              value={pasteInputText}
              onChange={(e) => {
                setPasteInputText(e.target.value);
                setPasteError(null);
              }}
              rows={8}
              placeholder='Dán nội dung JSON vào đây (vd: { "stats": { ... }, "talentNodes": [ ... ] })'
              className="w-full p-2.5 bg-slate-900/90 border border-slate-700 focus:border-cyan-400 rounded-xs text-xs font-mono text-cyan-200 outline-none"
            />

            {pasteError && (
              <p className="text-xs font-bold text-rose-400 font-mono">
                ⚠️ {pasteError}
              </p>
            )}

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsPasteModalOpen(false)}
                className="px-4 py-1.5 bg-slate-900 border border-slate-700 text-slate-300 text-xs font-bold font-chakra rounded-xs cursor-pointer"
              >
                HỦY
              </button>
              <button
                type="button"
                onClick={handleConfirmPaste}
                className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 text-xs font-bold font-chakra rounded-xs cursor-pointer shadow-[0_0_15px_rgba(0,229,255,0.4)]"
              >
                KHÔI PHỤC TIẾN TRÌNH
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
