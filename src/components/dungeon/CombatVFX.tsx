import React, { useRef, useEffect } from 'react';

export type VFXType =
  | 'basic_slash'
  | 'dagger_throw'
  | 'vital_strike'
  | 'venom_strike'
  | 'rasaka_flurry'
  | 'mutilate_x'
  | 'kamish_wrath'
  | 'shadow_step'
  | 'stealth_invisible'
  | 'bloodlust_aura'
  | 'quicksilver'
  | 'ruler_authority'
  | 'spatial_collapse'
  | 'shadow_exchange'
  | 'arise'
  | 'shadow_extraction'
  | 'monarch_domain'
  | 'shadow_armor'
  | 'dragon_fear'
  | 'dragon_breath'
  | 'demon_lightning'
  | 'void_cleave'
  | 'boss_claw'
  | 'boss_combo'
  | 'boss_ultimate'
  | 'monster_evade'
  | null;

interface CombatVFXProps {
  activeVFX: VFXType;
  groundImpactActive?: boolean;
  groundImpactIntensity?: 'normal' | 'heavy' | 'colossal';
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
  gravity?: number;
}

export const CombatVFX: React.FC<CombatVFXProps> = ({
  activeVFX,
  groundImpactActive = false,
  groundImpactIntensity = 'heavy',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (!activeVFX && !groundImpactActive) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    // Set resolution with devicePixelRatio for ultra-sharp canvas rendering
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const width = rect.width || 360;
    const height = rect.height || 140;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.scale(dpr, dpr);

    const monsterX = width * 0.26;
    const monsterY = height * 0.50;
    const hunterX = width * 0.74;
    const hunterY = height * 0.50;

    // Generate particles depending on effect
    const particles: Particle[] = [];
    const startTime = performance.now();
    const duration = activeVFX === 'arise' || activeVFX === 'monarch_domain' || activeVFX === 'boss_ultimate' ? 520 : 400;

    // Initialize particles based on VFX type
    if (activeVFX === 'basic_slash') {
      for (let i = 0; i < 20; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 4.5;
        particles.push({
          x: monsterX + (Math.random() * 20 - 10),
          y: monsterY + (Math.random() * 20 - 10),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 1.5 + Math.random() * 2.5,
          color: Math.random() > 0.4 ? '#00e5ff' : '#ffffff',
          alpha: 1,
          life: 0,
          maxLife: 20 + Math.random() * 15,
        });
      }
    } else if (activeVFX === 'venom_strike') {
      for (let i = 0; i < 24; i++) {
        const angle = (Math.PI / 2) + (Math.random() * 1.4 - 0.7);
        const speed = 1.5 + Math.random() * 4;
        particles.push({
          x: monsterX + (Math.random() * 30 - 15),
          y: monsterY - 10 + (Math.random() * 20 - 10),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 2 + Math.random() * 3,
          color: Math.random() > 0.3 ? '#22c55e' : '#86efac',
          alpha: 1,
          life: 0,
          maxLife: 25 + Math.random() * 15,
          gravity: 0.15,
        });
      }
    } else if (activeVFX === 'rasaka_flurry' || activeVFX === 'mutilate_x') {
      for (let i = 0; i < 30; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 5.5;
        particles.push({
          x: monsterX,
          y: monsterY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 2 + Math.random() * 2.5,
          color: Math.random() > 0.5 ? '#f43f5e' : '#a855f7',
          alpha: 1,
          life: 0,
          maxLife: 22 + Math.random() * 16,
        });
      }
    } else if (activeVFX === 'kamish_wrath' || activeVFX === 'dragon_breath') {
      for (let i = 0; i < 35; i++) {
        const angle = (activeVFX === 'dragon_breath' ? -Math.PI : Math.random() * Math.PI * 2);
        const speed = 2.5 + Math.random() * 6;
        particles.push({
          x: activeVFX === 'dragon_breath' ? hunterX : monsterX,
          y: monsterY + (Math.random() * 24 - 12),
          vx: activeVFX === 'dragon_breath' ? -(2 + Math.random() * 6) : Math.cos(angle) * speed,
          vy: (Math.random() - 0.5) * 3,
          size: 2 + Math.random() * 3.5,
          color: Math.random() > 0.5 ? '#f59e0b' : '#ef4444',
          alpha: 1,
          life: 0,
          maxLife: 26 + Math.random() * 14,
          gravity: -0.05,
        });
      }
    } else if (activeVFX === 'arise' || activeVFX === 'monarch_domain') {
      for (let i = 0; i < 32; i++) {
        particles.push({
          x: width * 0.15 + Math.random() * (width * 0.7),
          y: height * 0.85 + Math.random() * 15,
          vx: (Math.random() - 0.5) * 1.5,
          vy: -(1.5 + Math.random() * 3.5),
          size: 2.5 + Math.random() * 3.5,
          color: Math.random() > 0.4 ? '#a855f7' : '#c084fc',
          alpha: 0.9,
          life: 0,
          maxLife: 30 + Math.random() * 20,
        });
      }
    }

    // Ground impact particles if triggered
    if (groundImpactActive) {
      const dustCount = groundImpactIntensity === 'colossal' ? 24 : groundImpactIntensity === 'heavy' ? 16 : 10;
      for (let i = 0; i < dustCount; i++) {
        const angle = Math.PI + (Math.random() * Math.PI); // Upward spray
        const speed = 1.5 + Math.random() * 4;
        particles.push({
          x: monsterX + (Math.random() * 30 - 15),
          y: height * 0.75,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 2 + Math.random() * 3.5,
          color: Math.random() > 0.5 ? '#78716c' : '#38bdf8',
          alpha: 0.8,
          life: 0,
          maxLife: 20 + Math.random() * 15,
          gravity: 0.12,
        });
      }
    }

    let animFrameId: number;

    const render = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Smooth ease-out

      ctx.clearRect(0, 0, width, height);

      // =========================================================================
      // DRAW CANVAS-BASED PROCEDURAL SKILL GEOMETRY
      // =========================================================================

      // 1. BASIC SLASH: Twin High-Speed Curved Plasma Blade Arcs
      if (activeVFX === 'basic_slash') {
        const alpha = Math.max(0, 1 - progress);
        ctx.save();
        ctx.lineCap = 'round';

        // Cyan blade crescent 1
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 229, 255, ${alpha * 0.9})`;
        ctx.lineWidth = 9;
        ctx.moveTo(monsterX - 50 + progress * 20, monsterY + 40 - progress * 10);
        ctx.quadraticCurveTo(monsterX, monsterY - 15, monsterX + 50 + progress * 20, monsterY - 35);
        ctx.stroke();

        // White razor core 1
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = 3;
        ctx.moveTo(monsterX - 45 + progress * 20, monsterY + 38 - progress * 10);
        ctx.quadraticCurveTo(monsterX, monsterY - 15, monsterX + 45 + progress * 20, monsterY - 33);
        ctx.stroke();

        // Counter Cross Blade 2
        ctx.beginPath();
        ctx.strokeStyle = `rgba(56, 189, 248, ${alpha * 0.85})`;
        ctx.lineWidth = 6;
        ctx.moveTo(monsterX + 45 - progress * 15, monsterY + 35);
        ctx.quadraticCurveTo(monsterX, monsterY - 5, monsterX - 45 - progress * 15, monsterY - 30);
        ctx.stroke();

        // Flash Core
        if (progress < 0.4) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 255, ${(0.4 - progress) * 2.5})`;
          ctx.arc(monsterX, monsterY, 16 * (1 + progress), 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // 2. DAGGER THROW: 5 Converging Piercing Dagger Laser Beams
      if (activeVFX === 'dagger_throw') {
        const alpha = Math.max(0, 1 - progress);
        ctx.save();
        ctx.lineCap = 'round';

        // Target reticle
        ctx.beginPath();
        ctx.strokeStyle = `rgba(56, 189, 248, ${alpha * 0.8})`;
        ctx.lineWidth = 2;
        ctx.arc(monsterX, monsterY, 24 * (1 - progress * 0.3), 0, Math.PI * 2);
        ctx.stroke();

        // 5 Inward Dagger Streaks
        const daggerAngles = [0, 1.25, 2.5, 3.75, 5.0];
        daggerAngles.forEach((ang) => {
          const dist = 70 * (1 - easeProgress);
          const startX = monsterX + Math.cos(ang) * (dist + 30);
          const startY = monsterY + Math.sin(ang) * (dist + 30);
          const endX = monsterX + Math.cos(ang) * dist;
          const endY = monsterY + Math.sin(ang) * dist;

          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 229, 255, ${alpha * 0.9})`;
          ctx.lineWidth = 4;
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.stroke();

          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.lineWidth = 1.8;
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.stroke();
        });
        ctx.restore();
      }

      // 3. VITAL STRIKE: Crimson Sniper Reticle & Heart Laser Spike
      if (activeVFX === 'vital_strike') {
        const alpha = Math.max(0, 1 - progress);
        ctx.save();
        // Crosshair ring
        ctx.beginPath();
        ctx.strokeStyle = `rgba(239, 68, 68, ${alpha * 0.9})`;
        ctx.lineWidth = 2.5;
        ctx.arc(monsterX, monsterY, 32 * (1 - progress * 0.2), 0, Math.PI * 2);
        ctx.stroke();

        // Cross lines
        ctx.beginPath();
        ctx.moveTo(monsterX, monsterY - 45);
        ctx.lineTo(monsterX, monsterY + 45);
        ctx.moveTo(monsterX - 45, monsterY);
        ctx.lineTo(monsterX + 45, monsterY);
        ctx.stroke();

        // Piercing heart laser spike
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = 4.5;
        ctx.moveTo(monsterX, monsterY - 50);
        ctx.lineTo(monsterX, monsterY + 50);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = `rgba(239, 68, 68, ${alpha * 0.7})`;
        ctx.arc(monsterX, monsterY, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 4. VENOM STRIKE: Dual Toxic Green Viper Fangs
      if (activeVFX === 'venom_strike') {
        const alpha = Math.max(0, 1 - progress);
        ctx.save();
        ctx.fillStyle = `rgba(34, 197, 94, ${alpha * 0.85})`;
        ctx.strokeStyle = `rgba(134, 239, 172, ${alpha})`;
        ctx.lineWidth = 2;

        // Top-left Fang
        ctx.beginPath();
        ctx.moveTo(monsterX - 25, monsterY - 35);
        ctx.quadraticCurveTo(monsterX - 5, monsterY - 5, monsterX, monsterY);
        ctx.quadraticCurveTo(monsterX - 20, monsterY - 15, monsterX - 25, monsterY - 35);
        ctx.fill();
        ctx.stroke();

        // Top-right Fang
        ctx.beginPath();
        ctx.moveTo(monsterX + 25, monsterY - 35);
        ctx.quadraticCurveTo(monsterX + 5, monsterY - 5, monsterX, monsterY);
        ctx.quadraticCurveTo(monsterX + 20, monsterY - 15, monsterX + 25, monsterY - 35);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }

      // 5. MUTILATE: Heavy Execution X-Cleave
      if (activeVFX === 'mutilate_x') {
        const alpha = Math.max(0, 1 - progress);
        ctx.save();
        ctx.lineCap = 'round';
        const span = 45 * easeProgress;

        // Line 1
        ctx.beginPath();
        ctx.strokeStyle = `rgba(244, 63, 94, ${alpha * 0.9})`;
        ctx.lineWidth = 10;
        ctx.moveTo(monsterX - span, monsterY - span);
        ctx.lineTo(monsterX + span, monsterY + span);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = 3.5;
        ctx.moveTo(monsterX - span, monsterY - span);
        ctx.lineTo(monsterX + span, monsterY + span);
        ctx.stroke();

        // Line 2
        ctx.beginPath();
        ctx.strokeStyle = `rgba(244, 63, 94, ${alpha * 0.9})`;
        ctx.lineWidth = 10;
        ctx.moveTo(monsterX + span, monsterY - span);
        ctx.lineTo(monsterX - span, monsterY + span);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = 3.5;
        ctx.moveTo(monsterX + span, monsterY - span);
        ctx.lineTo(monsterX - span, monsterY + span);
        ctx.stroke();
        ctx.restore();
      }

      // 6. KAMISH WRATH: Volcanic Dragon Magma Jaws
      if (activeVFX === 'kamish_wrath') {
        const alpha = Math.max(0, 1 - progress);
        ctx.save();
        ctx.fillStyle = `rgba(245, 158, 11, ${alpha * 0.8})`;
        ctx.strokeStyle = `rgba(254, 240, 138, ${alpha})`;
        ctx.lineWidth = 2.5;

        // Upper Magma Jaw
        ctx.beginPath();
        ctx.moveTo(monsterX - 45, monsterY - 30);
        ctx.quadraticCurveTo(monsterX, monsterY - 45, monsterX + 45, monsterY - 10);
        ctx.quadraticCurveTo(monsterX, monsterY - 15, monsterX - 45, monsterY - 30);
        ctx.fill();
        ctx.stroke();

        // Lower Magma Jaw
        ctx.beginPath();
        ctx.moveTo(monsterX - 45, monsterY + 30);
        ctx.quadraticCurveTo(monsterX, monsterY + 45, monsterX + 45, monsterY + 10);
        ctx.quadraticCurveTo(monsterX, monsterY + 15, monsterX - 45, monsterY + 30);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }

      // 7. STEALTH & SHADOW ARMOR: Hexagonal Crystalline Matrix
      if (activeVFX === 'stealth_invisible' || activeVFX === 'shadow_armor') {
        const alpha = Math.max(0, 1 - progress);
        const color = activeVFX === 'shadow_armor' ? '129, 140, 248' : '0, 229, 255';
        ctx.save();
        ctx.strokeStyle = `rgba(${color}, ${alpha * 0.85})`;
        ctx.lineWidth = 2;

        const hexRadius = 26 * (0.8 + progress * 0.25);
        for (let i = 0; i < 6; i++) {
          const ang = (Math.PI / 3) * i;
          const nextAng = (Math.PI / 3) * (i + 1);
          const x1 = hunterX + Math.cos(ang) * hexRadius;
          const y1 = hunterY + Math.sin(ang) * hexRadius;
          const x2 = hunterX + Math.cos(nextAng) * hexRadius;
          const y2 = hunterY + Math.sin(nextAng) * hexRadius;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
        ctx.restore();
      }

      // 8. RULER'S AUTHORITY: Vertical Telekinetic Gravity Slam
      if (activeVFX === 'ruler_authority') {
        const alpha = Math.max(0, 1 - progress);
        ctx.save();
        ctx.lineCap = 'round';
        const slamY = height * easeProgress;

        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 229, 255, ${alpha * 0.8})`;
        ctx.lineWidth = 8;
        ctx.moveTo(monsterX - 25, 0);
        ctx.lineTo(monsterX - 25, slamY);
        ctx.moveTo(monsterX + 25, 0);
        ctx.lineTo(monsterX + 25, slamY);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = 3;
        ctx.moveTo(monsterX, 0);
        ctx.lineTo(monsterX, slamY);
        ctx.stroke();

        // Floor impact compression wave
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
        ctx.lineWidth = 3;
        ctx.ellipse(monsterX, height * 0.78, 48 * easeProgress, 14 * easeProgress, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // 9. SPATIAL COLLAPSE: Singularity Black Hole & Accretion Ring
      if (activeVFX === 'spatial_collapse') {
        const alpha = Math.max(0, 1 - progress);
        ctx.save();
        const rot = progress * Math.PI * 4;

        // Accretion Ring
        ctx.beginPath();
        ctx.strokeStyle = `rgba(168, 85, 247, ${alpha * 0.9})`;
        ctx.lineWidth = 3.5;
        ctx.arc(monsterX, monsterY, 32, rot, rot + Math.PI * 1.4);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 229, 255, ${alpha * 0.8})`;
        ctx.lineWidth = 2.5;
        ctx.arc(monsterX, monsterY, 44, rot + Math.PI, rot + Math.PI * 2.2);
        ctx.stroke();

        // Pure black singularity core
        ctx.beginPath();
        ctx.fillStyle = '#000000';
        ctx.arc(monsterX, monsterY, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
      }

      // 10. ARISE & MONARCH DOMAIN: Grand Summoning Arrays
      if (activeVFX === 'arise' || activeVFX === 'monarch_domain') {
        const alpha = Math.max(0, 1 - progress);
        ctx.save();
        const floorY = height * 0.82;
        const rx = width * 0.38 * easeProgress;
        const ry = 18 * easeProgress;

        // Summoning Circle
        ctx.beginPath();
        ctx.strokeStyle = `rgba(168, 85, 247, ${alpha * 0.9})`;
        ctx.lineWidth = 3;
        ctx.ellipse(width * 0.5, floorY, rx, ry, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Inner glowing ring
        ctx.beginPath();
        ctx.strokeStyle = `rgba(192, 132, 252, ${alpha * 0.7})`;
        ctx.lineWidth = 1.5;
        ctx.ellipse(width * 0.5, floorY, rx * 0.65, ry * 0.65, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // 11. DRAGON BREATH: Massive Azure-White Plasma Torrent
      if (activeVFX === 'dragon_breath') {
        const alpha = Math.max(0, 1 - progress);
        ctx.save();
        ctx.lineCap = 'round';
        const beamY = monsterY;

        // Outer Flame Cyan Glow
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 229, 255, ${alpha * 0.7})`;
        ctx.lineWidth = 24 * (1 - progress * 0.3);
        ctx.moveTo(hunterX, beamY);
        ctx.lineTo(monsterX - 40, beamY);
        ctx.stroke();

        // Inner Core White Laser
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.95})`;
        ctx.lineWidth = 8;
        ctx.moveTo(hunterX, beamY);
        ctx.lineTo(monsterX - 40, beamY);
        ctx.stroke();
        ctx.restore();
      }

      // 12. DEMON LIGHTNING: Procedural Crashing Lightning Bolt
      if (activeVFX === 'demon_lightning') {
        const alpha = Math.max(0, 1 - progress);
        ctx.save();
        ctx.lineCap = 'round';

        const points = [
          { x: monsterX + 5, y: 0 },
          { x: monsterX - 18, y: height * 0.25 },
          { x: monsterX + 16, y: height * 0.50 },
          { x: monsterX - 12, y: height * 0.72 },
          { x: monsterX, y: monsterY },
        ];

        // Cyan lightning aura
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 229, 255, ${alpha * 0.85})`;
        ctx.lineWidth = 7;
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();

        // White core bolt
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = 2.5;
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
        ctx.restore();
      }

      // 13. VOID CLEAVE: Diagonal Reality Rift
      if (activeVFX === 'void_cleave') {
        const alpha = Math.max(0, 1 - progress);
        ctx.save();
        ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.strokeStyle = `rgba(168, 85, 247, ${alpha * 0.9})`;
        ctx.lineWidth = 14;
        ctx.moveTo(monsterX - 55, monsterY + 50);
        ctx.lineTo(monsterX + 55, monsterY - 50);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 6;
        ctx.moveTo(monsterX - 55, monsterY + 50);
        ctx.lineTo(monsterX + 55, monsterY - 50);
        ctx.stroke();
        ctx.restore();
      }

      // 14. BOSS CLAW / BOSS COMBO
      if (activeVFX === 'boss_claw' || activeVFX === 'boss_combo') {
        const alpha = Math.max(0, 1 - progress);
        ctx.save();
        ctx.lineCap = 'round';

        [-16, 0, 16].forEach((offset) => {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(239, 68, 68, ${alpha * 0.9})`;
          ctx.lineWidth = 5;
          ctx.moveTo(hunterX + offset - 25, hunterY - 35);
          ctx.lineTo(hunterX + offset + 25, hunterY + 35);
          ctx.stroke();

          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.lineWidth = 1.8;
          ctx.moveTo(hunterX + offset - 25, hunterY - 35);
          ctx.lineTo(hunterX + offset + 25, hunterY + 35);
          ctx.stroke();
        });
        ctx.restore();
      }

      // =========================================================================
      // UPDATE AND DRAW CANVAS PARTICLES
      // =========================================================================
      ctx.save();
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        if (p.gravity) p.vy += p.gravity;
        p.alpha = Math.max(0, 1 - (p.life / p.maxLife));

        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.arc(p.x, p.y, p.size * p.alpha, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Loop condition
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
  }, [activeVFX, groundImpactActive, groundImpactIntensity]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-40 w-full h-full select-none"
      style={{ contain: 'layout paint size' }}
    />
  );
};
