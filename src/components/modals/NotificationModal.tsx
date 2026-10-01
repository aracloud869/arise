import React from 'react';
import { CloseIcon, AlertGlyphIcon } from '../icons/SystemIcons';
import { soundFx } from '../../utils/soundEffects';

export interface SystemNotificationItem {
  id: string;
  timestamp: string;
  title: string;
  message: string;
  type: 'quest' | 'novel' | 'level' | 'penalty';
}

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: SystemNotificationItem[];
  onClearAll: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="system-window max-w-lg w-full p-5 sm:p-6 rounded-sm relative border-cyan-400 shadow-[0_0_30px_rgba(0,210,255,0.4)]">
        <div className="hud-corner-tl" />
        <div className="hud-corner-tr" />
        <div className="hud-corner-bl" />
        <div className="hud-corner-br" />

        <div className="flex items-center justify-between pb-3 border-b border-cyan-500/30 mb-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-cyan-400 font-orbitron">[!]</span>
            <h3 className="text-lg font-bold text-white font-chakra">
              HỘP THƯ THÔNG BÁO HỆ THỐNG
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

        {notifications.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-xs italic">
            Không có thông báo mới nào từ Hệ Thống.
          </div>
        ) : (
          <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
            {notifications.map((n) => (
              <div
                key={n.id}
                className="p-3 bg-slate-950/80 border border-cyan-500/20 rounded-xs space-y-1"
              >
                <div className="flex items-center justify-between text-xs font-chakra">
                  <span className="font-bold text-cyan-300">{n.title}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{n.timestamp}</span>
                </div>
                <p className="text-xs text-slate-300 font-chakra leading-relaxed">
                  {n.message}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-5 pt-3 border-t border-cyan-500/20 flex items-center justify-between">
          <button
            onClick={() => {
              soundFx.playClick();
              onClearAll();
            }}
            disabled={notifications.length === 0}
            className="text-xs text-slate-400 hover:text-red-400 font-chakra disabled:opacity-30 cursor-pointer"
          >
            XÓA TẤT CẢ THÔNG BÁO
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="px-4 py-1.5 bg-cyan-950 border border-cyan-400 text-cyan-300 font-bold font-chakra text-xs rounded-xs hover:bg-cyan-900 cursor-pointer"
          >
            ĐÓNG
          </button>
        </div>
      </div>
    </div>
  );
};
