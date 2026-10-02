import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('System Uncaught Exception:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.clear();
    } catch {
      // ignore
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#030712] text-slate-100 flex items-center justify-center p-4 font-chakra">
          <div className="max-w-md w-full p-6 bg-slate-950 border-2 border-cyan-400 rounded-sm shadow-[0_0_50px_rgba(0,229,255,0.4)] text-center relative overflow-hidden">
            <div className="w-16 h-16 rounded-full bg-cyan-950 border-2 border-cyan-400 flex items-center justify-center mx-auto mb-4 animate-pulse">
              <span className="text-2xl text-cyan-300 font-bold">⚠️</span>
            </div>

            <span className="text-[11px] font-mono tracking-widest text-cyan-400 uppercase block mb-1">
              [HỆ THỐNG THỨC TỈNH · BẢO VỆ PHÒNG NGỰ]
            </span>

            <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider mb-2">
              SỰ CỐ KHỞI ĐỘNG HỆ THỐNG
            </h1>

            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Trình duyệt đã kích hoạt cơ chế bảo vệ ma pháp. Hãy nhấn nút bên dưới để khôi phục trạng thái chuẩn mực.
            </p>

            {this.state.error && (
              <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xs text-[11px] font-mono text-red-400 mb-4 text-left overflow-x-auto max-h-24">
                {this.state.error.message || String(this.state.error)}
              </div>
            )}

            <button
              onClick={this.handleReset}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-sm uppercase tracking-wider rounded-xs shadow-[0_0_20px_rgba(0,229,255,0.5)] cursor-pointer transition-all"
            >
              🔄 KHÔI PHỤC HỆ THỐNG & TẢI LẠI
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
