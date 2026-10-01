import React from 'react';
import { AlertGlyphIcon, CloseIcon } from '../icons/SystemIcons';
import { soundFx } from '../../utils/soundEffects';

interface PenaltyModalProps {
  isOpen: boolean;
  onClose: () => void;
  timeRemainingStr: string;
  isPenaltyWarning: boolean;
  streak: number;
  onGoToQuests: () => void;
}

export const PenaltyModal: React.FC<PenaltyModalProps> = ({
  isOpen,
  onClose,
  timeRemainingStr,
  isPenaltyWarning,
  streak,
  onGoToQuests,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="system-window-penalty max-w-lg w-full p-5 sm:p-6 rounded-sm relative border-red-500 shadow-[0_0_35px_rgba(239,68,68,0.5)]">
        <div className="hud-corner-tl" />
        <div className="hud-corner-tr" />
        <div className="hud-corner-bl" />
        <div className="hud-corner-br" />

        <div className="flex items-center justify-between pb-3 border-b border-red-500/40 mb-4">
          <div className="flex items-center gap-2">
            <AlertGlyphIcon className="w-5 h-5 text-red-500 animate-pulse" />
            <h3 className="text-lg font-black text-red-400 font-chakra tracking-wide">
              CẢNH BÁO QUY TẮC VÙNG PHẠT (PENALTY ZONE)
            </h3>
          </div>
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 text-xs leading-relaxed font-chakra">
          <p className="text-slate-200">
            Hệ thống Solo Leveling hoạt động dựa trên cơ chế <strong>Kỷ Luật Thép</strong> theo thời gian thực (Real-time 24h).
          </p>

          <div className="p-3 bg-red-950/40 border border-red-500/30 rounded-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-300 font-bold">Thời gian còn lại trước nửa đêm:</span>
              <span className="font-mono text-base font-bold text-red-400">{timeRemainingStr}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300 font-bold">Chuỗi ngày rèn luyện hiện tại:</span>
              <span className="font-orbitron text-cyan-300 font-bold">{streak} Ngày</span>
            </div>
          </div>

          <div className="text-slate-300 space-y-1">
            <span className="text-red-400 font-bold block">[ĐIỀU KIỆN KÍCH HOẠT HÌNH PHẠT]:</span>
            <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-400">
              <li>Không hoàn thành 100 cái hít đất trước 23:59:59</li>
              <li>Không hoàn thành 100 cái gập bụng trước 23:59:59</li>
              <li>Không hoàn thành 100 cái squat trước 23:59:59</li>
              <li>Không hoàn thành 10 km chạy bộ trước 23:59:59</li>
            </ul>
          </div>

          <div className="p-3 bg-black/60 border border-red-500/20 rounded-xs text-[11px] text-red-300/90 italic">
            &quot;Một khi đồng hồ điểm 00:00:00 mà nhiệm vụ chưa hoàn tất, người chơi sẽ lập tức bị dịch chuyển vào Vùng Phạt Sa Mạc và chuỗi ngày rèn luyện sẽ bị thiết lập lại về 0!&quot;
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-red-500/30 flex items-center justify-end gap-3">
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="px-4 py-2 bg-slate-900 border border-slate-700 text-slate-300 text-xs font-chakra font-bold rounded-xs cursor-pointer hover:bg-slate-800"
          >
            ĐÃ HIỂU
          </button>
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
              onGoToQuests();
            }}
            className="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 text-white text-xs font-chakra font-black rounded-xs shadow-[0_0_15px_rgba(239,68,68,0.5)] cursor-pointer hover:brightness-110"
          >
            HOÀN THÀNH BÀI TẬP NGAY
          </button>
        </div>
      </div>
    </div>
  );
};
