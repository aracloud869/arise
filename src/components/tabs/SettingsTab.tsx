import React from 'react';
import { AppSettings } from '../../types';
import {
  SettingsIcon,
  VolumeIcon,
  CheckIcon,
} from '../icons/SystemIcons';
import { soundFx } from '../../utils/soundEffects';

interface SettingsTabProps {
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
  onResetData: () => void;
  onExportData: () => void;
  onImportData: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({
  settings,
  onUpdateSettings,
  onResetData,
  onExportData,
  onImportData,
}) => {
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
              <span>HIỆU SUẤT & ĐỒ HỌA MƯỢT MÀ</span>
            </h3>

            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-xs text-slate-200 block">Hiệu ứng rung màn hình khi đánh Boss</span>
                <span className="text-[11px] text-slate-400">Rung màn hình khi boss vung vuốt trúng đòn hoặc Arise</span>
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
                <span className="font-bold text-xs text-slate-200 block">Thông báo tự động chương tiểu thuyết mới</span>
                <span className="text-[11px] text-slate-400">Tự động hiện popup chuông báo khi có chương truyện mới</span>
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
            <h3 className="text-sm font-bold text-white font-chakra border-b border-cyan-500/20 pb-2">
              LƯU TRỮ VÀ SAO LƯU DỮ LIỆU THỢ SĂN
            </h3>

            <p className="text-xs text-slate-400">
              Tiến trình nhân vật của bạn được tự động lưu vào trình duyệt. Bạn có thể xuất file sao lưu JSON hoặc khôi phục dữ liệu gốc bất cứ lúc nào.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button
                onClick={() => {
                  soundFx.playClick();
                  onExportData();
                }}
                className="px-3 py-1.5 bg-slate-900 border border-cyan-500/50 hover:border-cyan-400 text-cyan-300 text-xs font-bold font-chakra rounded-xs cursor-pointer"
              >
                XUẤT DỮ LIỆU (JSON)
              </button>

              <label className="px-3 py-1.5 bg-slate-900 border border-cyan-500/50 hover:border-cyan-400 text-cyan-300 text-xs font-bold font-chakra rounded-xs cursor-pointer">
                NHẬP DỮ LIỆU
                <input
                  type="file"
                  accept=".json"
                  onChange={onImportData}
                  className="hidden"
                />
              </label>

              <button
                onClick={() => {
                  if (window.confirm('Bạn có chắc chắn muốn thiết lập lại toàn bộ tiến trình Hệ Thống về ban đầu?')) {
                    soundFx.playPenaltyWarning();
                    onResetData();
                  }
                }}
                className="px-3 py-1.5 bg-red-950/80 border border-red-500/60 hover:border-red-400 text-red-300 text-xs font-bold font-chakra rounded-xs cursor-pointer"
              >
                KHÔI PHỤC MẶC ĐỊNH
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
