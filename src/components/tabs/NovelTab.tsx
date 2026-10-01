import React, { useState, useMemo } from 'react';
import { Novel, NovelChapter } from '../../types';
import {
  NovelIcon,
  AlertGlyphIcon,
  CheckIcon,
} from '../icons/SystemIcons';
import { soundFx } from '../../utils/soundEffects';

interface NovelTabProps {
  novels: Novel[];
  onTriggerNewChapter: (novelId: string) => void;
  onReadChapter: (novelId: string, chapterId: number) => void;
}

export const NovelTab: React.FC<NovelTabProps> = ({
  novels,
  onTriggerNewChapter,
  onReadChapter,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedNovelId, setSelectedNovelId] = useState<string>(novels[0]?.id || '');
  const [selectedChapterId, setSelectedChapterId] = useState<number>(novels[0]?.chapters[0]?.id || 1);

  // Reading preferences
  const [readingTheme, setReadingTheme] = useState<'dark' | 'sepia' | 'system' | 'cyber'>('dark');
  const [fontSize, setFontSize] = useState<number>(16);

  // Categories config
  const categories = [
    { id: 'all', label: 'TẤT CẢ (40+ BỘ)', icon: '📚' },
    { id: 'psychology', label: 'TÂM LÝ HỌC & ĐỌC VỊ', icon: '🧠' },
    { id: 'solo_leveling', label: 'SOLO LEVELING UNIVERSE', icon: '👑' },
    { id: 'self_growth', label: 'KỶ LUẬT & TƯ DUY VUA', icon: '🔥' },
    { id: 'fantasy', label: 'VÕ THẦN & DỊ GIỚI', icon: '⚔️' },
  ];

  // Filter novels based on category and search query
  const filteredNovels = useMemo(() => {
    return novels.filter((n) => {
      const genreStr = n.genre || '';
      const authorStr = n.author || '';
      const titleStr = n.title || '';

      const matchCat =
        selectedCategory === 'all' ||
        n.category === selectedCategory ||
        (selectedCategory === 'psychology' && (genreStr.includes('Tâm Lý') || n.id.startsWith('psy')));
      const matchQuery =
        searchQuery.trim() === '' ||
        titleStr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        authorStr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        genreStr.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [novels, selectedCategory, searchQuery]);

  const currentNovel = novels.find((n) => n.id === selectedNovelId) || filteredNovels[0] || novels[0];
  const currentChapter = currentNovel?.chapters.find((c) => c.id === selectedChapterId) || currentNovel?.chapters[0];

  const handleSelectNovel = (novel: Novel) => {
    soundFx.playClick();
    setSelectedNovelId(novel.id);
    setSelectedChapterId(novel.chapters[0]?.id || 1);
  };

  const handleSelectChapter = (ch: NovelChapter) => {
    soundFx.playClick();
    setSelectedChapterId(ch.id);
    onReadChapter(selectedNovelId, ch.id);
  };

  // Navigate next/prev chapter
  const currentChapterIndex = currentNovel?.chapters.findIndex((c) => c.id === selectedChapterId) ?? 0;
  const prevChapter = currentChapterIndex > 0 ? currentNovel?.chapters[currentChapterIndex - 1] : null;
  const nextChapter =
    currentChapterIndex < (currentNovel?.chapters.length ?? 0) - 1
      ? currentNovel?.chapters[currentChapterIndex + 1]
      : null;

  // Theme styles for reading container
  const getThemeClasses = () => {
    switch (readingTheme) {
      case 'sepia':
        return 'bg-[#f5ede0] text-[#33251a] border-[#d8c8af]';
      case 'system':
        return 'bg-[#040e24] text-[#bde0fe] border-cyan-500/40 shadow-[0_0_30px_rgba(0,180,255,0.15)]';
      case 'cyber':
        return 'bg-[#021814] text-[#70f8ba] border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.15)]';
      case 'dark':
      default:
        return 'bg-[#090d16] text-[#e2e8f0] border-slate-800';
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-2 sm:p-4 space-y-5 box-border">
      {/* Header Banner */}
      <div className="system-window p-4 sm:p-6 rounded-sm relative overflow-hidden">
        <div className="hud-corner-tl" />
        <div className="hud-corner-tr" />
        <div className="hud-corner-bl" />
        <div className="hud-corner-br" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-cyan-500/20">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono tracking-widest uppercase">
              <span>KHÔNG GIAN XẢ STRESS & NÂNG TẦM TRÍ TUỆ / 40+ BỘ TRUYỆN ĐỈNH CAO</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-black text-white font-chakra tracking-wide mt-1 flex items-center gap-2">
              <NovelIcon className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400 shrink-0" />
              <span>HUNTER SANCTUARY & PSYCHOLOGY LIBRARY</span>
            </h1>
            <p className="text-xs text-slate-400 mt-0.5 max-w-2xl">
              Thư viện toàn năng quy tụ 40+ tuyệt tác: Tâm lý học hành vi, nghệ thuật thao túng & phòng vệ, thuật đọc vị, triết lý khắc kỷ của Chúa Tể, và vũ trụ Solo Leveling mở rộng.
            </p>
          </div>

          {/* Trigger New Chapter Button for simulation */}
          <button
            onClick={() => {
              soundFx.playSystemNotification();
              onTriggerNewChapter(selectedNovelId);
            }}
            className="flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-slate-950 font-chakra font-bold text-xs rounded-xs shadow-[0_0_15px_rgba(0,210,255,0.4)] cursor-pointer shrink-0"
          >
            <AlertGlyphIcon className="w-4 h-4 text-slate-950" />
            <span>CẬP NHẬT CHƯƠNG MỚI</span>
          </button>
        </div>

        {/* Category Filters & Search Bar */}
        <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Categories Tab Pill Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  soundFx.playClick();
                  setSelectedCategory(cat.id);
                }}
                className={`px-3 py-1.5 rounded-xs text-xs font-chakra font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 border ${
                  selectedCategory === cat.id
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-[0_0_12px_rgba(0,229,255,0.5)]'
                    : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[220px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên tác phẩm, tác giả..."
              className="w-full px-3 py-1.5 bg-slate-950/90 border border-slate-700 rounded-xs text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-chakra"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Novel Selection Carousel (Scrollable Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-4 max-h-[380px] overflow-y-auto pr-1">
          {filteredNovels.map((novel) => {
            const isCurrent = novel.id === selectedNovelId;
            const hasNew = novel.chapters.some((c) => c.isNew);

            return (
              <button
                key={novel.id}
                onClick={() => handleSelectNovel(novel)}
                className={`p-3 rounded-xs border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-gradient-to-br from-cyan-950/80 to-blue-950/70 border-cyan-400 shadow-[0_0_15px_rgba(0,210,255,0.35)] ring-1 ring-cyan-400'
                    : 'bg-slate-950/75 border-slate-800/90 hover:border-cyan-500/50 hover:bg-slate-900/60'
                }`}
              >
                {hasNew && (
                  <span className="absolute top-2 right-2 px-1.5 py-0.2 bg-red-500 text-white font-bold text-[9px] rounded-full animate-bounce">
                    MỚI
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between gap-1 text-[10px] text-cyan-400 font-mono mb-1">
                    <span className="truncate max-w-[80%]">{novel.genre}</span>
                    <span className="text-amber-400 font-bold shrink-0">★ {novel.rating || 4.9}</span>
                  </div>

                  <h3 className="font-bold text-sm text-white font-chakra line-clamp-1 leading-snug">
                    {novel.title}
                  </h3>

                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {novel.description}
                  </p>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>{novel.author}</span>
                  <span className="text-cyan-300 font-bold">{novel.chapters.length} Chương</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Reader Viewport */}
      {currentNovel && currentChapter && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Chapter Selector Sidebar (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="system-window p-3.5 rounded-sm">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-cyan-500/20">
                <h3 className="text-xs font-bold text-cyan-300 font-chakra uppercase">
                  DANH SÁCH CHƯƠNG ({currentNovel.chapters.length})
                </h3>
                <span className="text-[10px] font-mono text-slate-400">
                  {currentNovel.readTimeMinutes || 15} phút đọc
                </span>
              </div>

              <div className="space-y-1.5 max-h-[520px] overflow-y-auto pr-1">
                {currentNovel.chapters.map((ch) => {
                  const isChActive = ch.id === selectedChapterId;

                  return (
                    <button
                      key={ch.id}
                      onClick={() => handleSelectChapter(ch)}
                      className={`w-full p-2.5 rounded-xs border text-left transition-colors cursor-pointer text-xs ${
                        isChActive
                          ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200 shadow-[0_0_10px_rgba(0,229,255,0.25)]'
                          : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-mono font-bold text-[11px]">Chương {ch.chapterNumber}</span>
                        {ch.isNew && (
                          <span className="text-[9px] px-1 py-0.2 bg-red-600 text-white rounded-full">
                            Mới
                          </span>
                        )}
                      </div>
                      <div className="truncate text-[11px]">{ch.title}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Reading Area (9 cols) */}
          <div className="lg:col-span-9 space-y-4">
            {/* Reading Controls Bar */}
            <div className="p-3 bg-slate-950/85 border border-cyan-500/30 rounded-sm flex flex-wrap items-center justify-between gap-3 text-xs shadow-md">
              {/* Theme modes */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-slate-400 font-chakra font-semibold">Giao diện đọc:</span>
                {[
                  { id: 'dark', label: 'Ban Đêm (Tối)' },
                  { id: 'sepia', label: 'Giấy Da (Sepia)' },
                  { id: 'system', label: 'Hệ Thống (Cyan)' },
                  { id: 'cyber', label: 'Ma Trận (Lục)' },
                ].map((th) => (
                  <button
                    key={th.id}
                    onClick={() => setReadingTheme(th.id as typeof readingTheme)}
                    className={`px-2 py-1 rounded-xs border text-[11px] font-chakra transition-colors cursor-pointer ${
                      readingTheme === th.id
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                        : 'bg-slate-900 border-slate-700 text-slate-300'
                    }`}
                  >
                    {th.label}
                  </button>
                ))}
              </div>

              {/* Font size adjustments */}
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-chakra font-semibold">Cỡ chữ:</span>
                <button
                  onClick={() => setFontSize((f) => Math.max(13, f - 1))}
                  className="px-2 py-0.5 bg-slate-900 border border-slate-700 rounded-xs text-xs font-bold hover:border-cyan-400 cursor-pointer"
                >
                  A-
                </button>
                <span className="font-mono text-cyan-300">{fontSize}px</span>
                <button
                  onClick={() => setFontSize((f) => Math.min(26, f + 1))}
                  className="px-2 py-0.5 bg-slate-900 border border-slate-700 rounded-xs text-xs font-bold hover:border-cyan-400 cursor-pointer"
                >
                  A+
                </button>
              </div>
            </div>

            {/* Novel Content Reader Container */}
            <div
              className={`p-6 sm:p-10 rounded-sm border shadow-lg transition-all ${getThemeClasses()}`}
              style={{ fontSize: `${fontSize}px` }}
            >
              <div className="border-b border-current/20 pb-4 mb-6">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-mono opacity-80 mb-1">
                  <span>{currentNovel.genre}</span>
                  <span>·</span>
                  <span>{currentNovel.category === 'psychology' ? '🧠 Chuyên Mục Tâm Lý Học' : '👑 Solo Leveling'}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-chakra">
                  {currentChapter.title}
                </h2>
                <div className="flex flex-wrap items-center gap-3 text-xs opacity-75 mt-2 font-mono">
                  <span>Tác giả: {currentNovel.author}</span>
                  <span>·</span>
                  <span>Xuất bản: {currentChapter.publishDate}</span>
                  <span>·</span>
                  <span>Độ dài: ~{currentNovel.readTimeMinutes || 15} phút</span>
                </div>
              </div>

              {/* Paragraphs */}
              <div className="space-y-5 leading-relaxed font-sans">
                {currentChapter.content.map((p, i) => (
                  <p key={i} className="text-justify indent-6">
                    {p}
                  </p>
                ))}
              </div>

              {/* Chapter Next / Previous Navigation */}
              <div className="mt-10 pt-6 border-t border-current/20 flex items-center justify-between gap-3 text-xs font-chakra font-bold">
                {prevChapter ? (
                  <button
                    onClick={() => handleSelectChapter(prevChapter)}
                    className="px-4 py-2 border border-current rounded-xs hover:opacity-80 transition-opacity cursor-pointer"
                  >
                    ← CHƯƠNG TRƯỚC (Chương {prevChapter.chapterNumber})
                  </button>
                ) : (
                  <div />
                )}

                {nextChapter ? (
                  <button
                    onClick={() => handleSelectChapter(nextChapter)}
                    className="px-4 py-2 border border-current rounded-xs hover:opacity-80 transition-opacity cursor-pointer"
                  >
                    CHƯƠNG KẾ TIẾP (Chương {nextChapter.chapterNumber}) →
                  </button>
                ) : (
                  <span className="opacity-75 italic text-xs">
                    Bạn đã đọc đến chương mới nhất! Hãy nhấn &quot;Cập nhật chương mới&quot; để tạo thêm diễn biến.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
