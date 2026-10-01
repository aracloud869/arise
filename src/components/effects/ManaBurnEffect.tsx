import React, { useEffect, useState } from 'react';

interface ManaParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rot: number;
  rotSpeed: number;
  color: string;
  shape: 'shard' | 'flame' | 'spark' | 'rune';
  opacity: number;
}

interface ManaBurnEffectProps {
  active: boolean;
  mpCost?: number;
}

export const ManaBurnEffect: React.FC<ManaBurnEffectProps> = ({ active, mpCost = 25 }) => {
  const [particles, setParticles] = useState<ManaParticle[]>([]);
  const [shockwaves, setShockwaves] = useState<number[]>([]);

  useEffect(() => {
    if (!active) {
      setParticles([]);
      setShockwaves([]);
      return;
    }

    // Trigger 2 successive expanding mana rings
    setShockwaves([1, 2]);
    const shockwaveTimer = setTimeout(() => setShockwaves([]), 1400);

    const colors = [
      '#00f0ff', // Vivid Cyan
      '#38bdf8', // Sky Blue
      '#0284c7', // Deep Mana Blue
      '#ffffff', // White Core
      '#a5f3fc', // Ice Cyan
      '#818cf8', // Arcane Indigo
    ];

    const shapes: ManaParticle['shape'][] = ['shard', 'flame', 'spark', 'rune'];
    const particleCount = 65;

    // Generate upward erupting and swirling mana particles
    const generated: ManaParticle[] = Array.from({ length: particleCount }).map((_, i) => {
      const angle = (Math.PI * 2 * i) / particleCount + (Math.random() * 0.5 - 0.25);
      const speed = Math.random() * 7 + 3;
      const shape = shapes[Math.floor(Math.random() * shapes.length)];

      return {
        id: i,
        x: 50 + (Math.random() * 8 - 4), // Center around 50%
        y: 60 + (Math.random() * 6 - 3), // Slightly below center so it erupts upward
        vx: Math.cos(angle) * speed * 0.85,
        vy: -Math.abs(Math.sin(angle) * speed * 1.3) - 2.5, // Strong upward burst
        size: shape === 'shard' ? Math.random() * 14 + 6 : Math.random() * 8 + 3,
        rot: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 22,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape,
        opacity: 1,
      };
    });

    setParticles(generated);

    let animId: number;
    const startTime = Date.now();
    const duration = 1800; // ms

    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / duration;

      if (progress >= 1) {
        setParticles([]);
        return;
      }

      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          x: p.x + p.vx * 0.1,
          y: p.y + p.vy * 0.1, // Rising upward and spreading
          vy: p.vy * 0.96 - 0.05, // Float upwards like hot mana flames
          rot: p.rot + p.rotSpeed,
          opacity: Math.max(0, 1 - progress * 1.15),
        }))
      );

      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(shockwaveTimer);
    };
  }, [active]);

  if (!active && particles.length === 0 && shockwaves.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden flex items-center justify-center">
      {/* 1. Dimensional Mana Flash Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/30 via-transparent to-transparent animate-pulse" />

      {/* 2. Expanding Arcane Mana Shockwave Rings */}
      {shockwaves.length > 0 && (
        <>
          <div className="absolute w-64 h-64 sm:w-96 sm:h-96 rounded-full border-2 border-cyan-300 shadow-[0_0_50px_#00e5ff] animate-ping opacity-75" />
          <div className="absolute w-80 h-80 sm:w-[480px] sm:h-[480px] rounded-full border border-sky-400 shadow-[0_0_80px_#0284c7] animate-ping opacity-50" />
        </>
      )}

      {/* 3. Floating Mana Shards & Flames */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.opacity,
            transform: `translate(-50%, -50%) rotate(${p.rot}deg)`,
          }}
        >
          {p.shape === 'shard' && (
            <div
              style={{
                width: `${p.size}px`,
                height: `${p.size * 2.2}px`,
                backgroundColor: p.color,
                clipPath: 'polygon(50% 0%, 100% 70%, 50% 100%, 0% 70%)',
                boxShadow: `0 0 16px ${p.color}, 0 0 28px #00e5ff`,
              }}
            />
          )}

          {p.shape === 'flame' && (
            <div
              style={{
                width: `${p.size * 1.5}px`,
                height: `${p.size * 2.5}px`,
                backgroundColor: p.color,
                borderRadius: '50% 50% 20% 20%',
                boxShadow: `0 0 20px ${p.color}, 0 0 35px #38bdf8`,
                filter: 'blur(0.5px)',
              }}
            />
          )}

          {p.shape === 'spark' && (
            <div
              className="rounded-full animate-ping"
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: '#ffffff',
                boxShadow: `0 0 12px ${p.color}, 0 0 20px #00e5ff`,
              }}
            />
          )}

          {p.shape === 'rune' && (
            <div
              style={{
                width: `${p.size * 1.2}px`,
                height: `${p.size * 1.2}px`,
                border: `1.5px solid ${p.color}`,
                transform: 'rotate(45deg)',
                boxShadow: `0 0 14px ${p.color}`,
              }}
            />
          )}
        </div>
      ))}

      {/* 4. Mana Burn Center Energy Badge */}
      <div className="relative text-center animate-bounce z-10 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-slate-950/90 border border-cyan-400/80 shadow-[0_0_25px_rgba(0,229,255,0.6)] backdrop-blur-md">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-chakra font-black text-sm sm:text-base text-cyan-200 tracking-wider text-glow-blue uppercase">
            MANA BURN: -{mpCost} MP
          </span>
          <span className="text-[10px] font-mono text-cyan-400 border-l border-cyan-500/40 pl-2">
            [GIẢI PHÓNG MA LỰC]
          </span>
        </div>
      </div>
    </div>
  );
};
