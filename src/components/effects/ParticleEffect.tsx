import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  rotSpeed: number;
  size: number;
  color: string;
  shape: 'shard' | 'dust' | 'spark' | 'rune';
  opacity: number;
}

interface ParticleEffectProps {
  active: boolean;
  type?: 'cyan' | 'gold' | 'purple' | 'rainbow';
  count?: number;
}

export const ParticleEffect: React.FC<ParticleEffectProps> = ({
  active,
  type = 'cyan',
  count = 50,
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }

    // Generate burst of particles
    const colorPalette = {
      cyan: ['#00e5ff', '#38bdf8', '#0077ff', '#ffffff', '#67e8f9'],
      gold: ['#facc15', '#f59e0b', '#fbbf24', '#ffffff', '#fef08a'],
      purple: ['#c084fc', '#a855f7', '#e879f9', '#ffffff', '#9333ea'],
      rainbow: ['#00e5ff', '#facc15', '#c084fc', '#ffffff', '#4ade80', '#f43f5e'],
    }[type];

    const shapes: Particle['shape'][] = ['shard', 'dust', 'spark', 'rune'];

    const newParticles: Particle[] = Array.from({ length: count }).map((_, i) => {
      const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.4 - 0.2);
      const speed = Math.random() * 8 + 4; // Velocity
      const shape = shapes[Math.floor(Math.random() * shapes.length)];

      return {
        id: i,
        x: 50, // Center %
        y: 48, // Center %
        vx: Math.cos(angle) * speed * (0.8 + Math.random() * 0.6),
        vy: Math.sin(angle) * speed * (0.8 + Math.random() * 0.6) - 2.5, // Slight upward pop
        rot: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 20,
        size: shape === 'shard' ? Math.random() * 12 + 6 : Math.random() * 6 + 3,
        color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
        shape,
        opacity: 1,
      };
    });

    setParticles(newParticles);

    // Animation frame physics
    let animId: number;
    let startTime = Date.now();
    const duration = 2200; // ms

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
          x: p.x + p.vx * 0.12,
          y: p.y + p.vy * 0.12 + 0.15, // Gravity pulling down
          vy: p.vy + 0.1, // Gravity acceleration
          rot: p.rot + p.rotSpeed,
          opacity: Math.max(0, 1 - progress * 1.2),
        }))
      );

      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animId);
  }, [active, type, count]);

  if (!active || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {particles.map((p) => {
        if (p.shape === 'shard') {
          // Sharp Glass / Crystal Shard
          return (
            <div
              key={p.id}
              className="absolute"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size * 1.6}px`,
                backgroundColor: p.color,
                opacity: p.opacity,
                transform: `rotate(${p.rot}deg)`,
                clipPath: 'polygon(50% 0%, 100% 70%, 50% 100%, 0% 40%)',
                boxShadow: `0 0 10px ${p.color}`,
                filter: `drop-shadow(0 0 6px ${p.color})`,
              }}
            />
          );
        }

        if (p.shape === 'spark') {
          // Diamond Energy Spark
          return (
            <div
              key={p.id}
              className="absolute"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: p.color,
                opacity: p.opacity,
                transform: `rotate(${p.rot}deg)`,
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                boxShadow: `0 0 12px ${p.color}`,
              }}
            />
          );
        }

        // Circular Mana Dust Mote
        return (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              opacity: p.opacity,
              boxShadow: `0 0 8px ${p.color}`,
            }}
          />
        );
      })}
    </div>
  );
};
