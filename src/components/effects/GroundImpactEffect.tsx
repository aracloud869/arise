import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  rotation: number;
  shape: 'rock' | 'dust' | 'spark';
}

interface GroundImpactEffectProps {
  active: boolean;
  intensity?: 'normal' | 'heavy' | 'colossal';
  xPercent?: number;
  yPercent?: number;
}

export const GroundImpactEffect: React.FC<GroundImpactEffectProps> = ({
  active,
  intensity = 'heavy',
  xPercent = 30, // Position on the monster side
  yPercent = 60,
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [shockwaves, setShockwaves] = useState<number[]>([]);

  useEffect(() => {
    if (!active) {
      setParticles([]);
      setShockwaves([]);
      return;
    }

    // Spawn shockwave ripples
    setShockwaves([1, 2, 3]);

    const count = intensity === 'colossal' ? 36 : intensity === 'heavy' ? 24 : 16;
    const dustColors = [
      '#a89f91', // warm dust
      '#78716c', // rock grey
      '#57534e', // dark stone
      '#00f0ff', // cyan mana dust
      '#9333ea', // shadow dark purple
      '#d97706', // earth amber
    ];

    const newParticles: Particle[] = Array.from({ length: count }, (_, i) => {
      const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.4 - 0.2);
      const speed = (intensity === 'colossal' ? 6 : 4) * (0.6 + Math.random() * 0.8);
      
      return {
        id: Date.now() + i,
        x: xPercent + (Math.random() * 8 - 4),
        y: yPercent + (Math.random() * 6 - 3),
        vx: Math.cos(angle) * speed * (Math.random() > 0.5 ? 1 : -1),
        vy: -Math.abs(Math.sin(angle) * speed * 1.4) - 2.5, // Erupt upwards
        size: Math.random() * 8 + 4,
        opacity: 0.95,
        color: dustColors[Math.floor(Math.random() * dustColors.length)],
        rotation: Math.random() * 360,
        shape: Math.random() > 0.6 ? 'rock' : Math.random() > 0.3 ? 'dust' : 'spark',
      };
    });

    setParticles(newParticles);

    // Animation frame step
    let animFrame: number;
    let elapsed = 0;

    const animate = () => {
      elapsed += 16;
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx * 0.18,
            y: p.y + p.vy * 0.18,
            vy: p.vy + 0.18, // gravity pulls down
            opacity: Math.max(0, p.opacity - 0.025),
            size: p.size * 0.98,
            rotation: p.rotation + 4,
          }))
          .filter((p) => p.opacity > 0.05)
      );

      if (elapsed < 1200) {
        animFrame = requestAnimationFrame(animate);
      }
    };

    animFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrame);
    };
  }, [active, intensity, xPercent, yPercent]);

  if (!active && particles.length === 0 && shockwaves.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
      {/* 1. Expanding Ground Impact Shockwave Rings */}
      {shockwaves.map((sw, idx) => (
        <div
          key={sw}
          className="absolute rounded-full border-2 border-cyan-400/80 animate-ping shadow-[0_0_20px_rgba(0,229,255,0.8)]"
          style={{
            left: `${xPercent}%`,
            top: `${yPercent}%`,
            width: `${(idx + 1) * 70}px`,
            height: `${(idx + 1) * 35}px`,
            transform: 'translate(-50%, -50%)',
            animationDuration: '0.85s',
            animationDelay: `${idx * 0.12}s`,
          }}
        />
      ))}

      {/* 2. Ground Fracture / Crater Lines */}
      <div
        className="absolute w-36 h-16 pointer-events-none -translate-x-1/2 -translate-y-1/2 animate-pulse opacity-85"
        style={{ left: `${xPercent}%`, top: `${yPercent}%` }}
      >
        <svg viewBox="0 0 100 50" className="w-full h-full drop-shadow-[0_0_8px_#00f0ff]">
          <path
            d="M 10 25 L 35 22 L 50 35 L 68 18 L 90 26 M 35 22 L 45 10 M 50 35 L 55 45 M 68 18 L 80 12"
            stroke="#00f0ff"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          <ellipse cx="50" cy="25" rx="30" ry="12" fill="rgba(0, 229, 255, 0.15)" />
        </svg>
      </div>

      {/* 3. Flying Dust Clouds, Rocks, and Sparks */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute pointer-events-none transition-transform"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            transform: `translate(-50%, -50%) rotate(${p.rotation}deg)`,
          }}
        >
          {p.shape === 'rock' ? (
            <div
              className="w-full h-full rounded-xs shadow-[0_0_6px_rgba(0,0,0,0.8)]"
              style={{ backgroundColor: p.color }}
            />
          ) : p.shape === 'dust' ? (
            <div
              className="w-full h-full rounded-full blur-[1px]"
              style={{
                backgroundColor: p.color,
                boxShadow: `0 0 10px ${p.color}`,
              }}
            />
          ) : (
            <div
              className="w-full h-full rounded-full bg-cyan-300 shadow-[0_0_8px_#00f0ff]"
            />
          )}
        </div>
      ))}
    </div>
  );
};
