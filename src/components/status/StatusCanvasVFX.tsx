import React, { useRef, useEffect } from 'react';

interface StatusCanvasVFXProps {
  isManaBurning: boolean;
  activeSkillName?: string | null;
  activeRank?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

export const StatusCanvasVFX: React.FC<StatusCanvasVFXProps> = ({
  isManaBurning,
  activeSkillName,
  activeRank,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (!isManaBurning && !activeSkillName) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const width = rect.width || 160;
    const height = rect.height || 160;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.scale(dpr, dpr);

    const centerX = width * 0.5;
    const centerY = height * 0.5;

    // Pick palette based on active skill or rank
    let palette = ['#00e5ff', '#38bdf8', '#ffffff'];
    if (activeRank === 'Monarch' || activeSkillName?.toLowerCase().includes('void') || activeSkillName?.toLowerCase().includes('kamish')) {
      palette = ['#eab308', '#a855f7', '#f59e0b', '#ffffff'];
    } else if (activeRank === 'S' || activeSkillName?.toLowerCase().includes('arise') || activeSkillName?.toLowerCase().includes('domain')) {
      palette = ['#a855f7', '#c084fc', '#6366f1', '#ffffff'];
    } else if (activeSkillName?.toLowerCase().includes('venom')) {
      palette = ['#22c55e', '#4ade80', '#10b981', '#ffffff'];
    } else if (activeSkillName?.toLowerCase().includes('vital') || activeSkillName?.toLowerCase().includes('mutilate')) {
      palette = ['#ef4444', '#f43f5e', '#fb7185', '#ffffff'];
    }

    const particles: Particle[] = [];
    const count = 30;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.2 + Math.random() * 3.5;
      particles.push({
        x: centerX + (Math.random() * 20 - 10),
        y: centerY + (Math.random() * 20 - 10),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.8, // slight upward drift
        size: 1.5 + Math.random() * 3,
        color: palette[Math.floor(Math.random() * palette.length)],
        alpha: 1,
        life: 0,
        maxLife: 35 + Math.random() * 25,
      });
    }

    let animFrameId: number;
    let ringRadius = 15;
    const startTime = performance.now();
    const duration = 1400; // ms

    const render = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Expanding Energy Shockwave Rings
      const ringAlpha = Math.max(0, (1 - progress) * 0.7);
      ringRadius = 15 + progress * (width * 0.42);

      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = palette[0];
      ctx.lineWidth = 2.5 * (1 - progress * 0.5);
      ctx.globalAlpha = ringAlpha;
      ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Secondary Inner Ring
      if (progress < 0.7) {
        ctx.beginPath();
        ctx.strokeStyle = palette[1] || '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = ringAlpha * 0.8;
        ctx.arc(centerX, centerY, ringRadius * 0.65, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();

      // 2. Draw Floating Particles
      ctx.save();
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha = Math.max(0, 1 - p.life / p.maxLife);

        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.arc(p.x, p.y, p.size * (0.4 + p.alpha * 0.6), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      if (progress < 1) {
        animFrameId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameId);
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
  }, [isManaBurning, activeSkillName, activeRank]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-30 w-full h-full select-none"
      style={{ contain: 'layout paint size' }}
    />
  );
};
