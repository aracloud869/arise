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
  | 'companion_igris'
  | 'companion_beru'
  | 'companion_tusk'
  | 'companion_tank'
  | 'companion_kaisel'
  | 'companion_bellion'
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

    // High resolution scaling for retina displays
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

    // Generate specialized particles
    const particles: Particle[] = [];
    const startTime = performance.now();
    const isBigSkill =
      activeVFX === 'arise' ||
      activeVFX === 'monarch_domain' ||
      activeVFX === 'boss_ultimate' ||
      activeVFX === 'companion_bellion' ||
      activeVFX === 'companion_beru' ||
      activeVFX === 'companion_tusk';

    const duration = isBigSkill ? 560 : 420;

    // Spawn Particles per VFX Type
    if (activeVFX === 'basic_slash' || activeVFX === 'quicksilver') {
      for (let i = 0; i < 28; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 5.5;
        particles.push({
          x: monsterX + (Math.random() * 20 - 10),
          y: monsterY + (Math.random() * 20 - 10),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 1.5 + Math.random() * 2.8,
          color: Math.random() > 0.4 ? '#00e5ff' : '#ffffff',
          alpha: 1,
          life: 0,
          maxLife: 22 + Math.random() * 16,
        });
      }
    } else if (activeVFX === 'venom_strike' || activeVFX === 'rasaka_flurry') {
      for (let i = 0; i < 32; i++) {
        const angle = (Math.PI / 2) + (Math.random() * 1.6 - 0.8);
        const speed = 1.8 + Math.random() * 4.5;
        particles.push({
          x: monsterX + (Math.random() * 32 - 16),
          y: monsterY - 10 + (Math.random() * 20 - 10),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 2 + Math.random() * 3.2,
          color: Math.random() > 0.35 ? '#22c55e' : '#a855f7',
          alpha: 1,
          life: 0,
          maxLife: 26 + Math.random() * 16,
          gravity: 0.16,
        });
      }
    } else if (activeVFX === 'vital_strike' || activeVFX === 'bloodlust_aura') {
      for (let i = 0; i < 35; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2.5 + Math.random() * 5.5;
        particles.push({
          x: monsterX,
          y: monsterY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 2 + Math.random() * 3,
          color: Math.random() > 0.4 ? '#ef4444' : '#f43f5e',
          alpha: 1,
          life: 0,
          maxLife: 24 + Math.random() * 18,
        });
      }
    } else if (activeVFX === 'kamish_wrath' || activeVFX === 'dragon_breath' || activeVFX === 'companion_tusk') {
      for (let i = 0; i < 40; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2.5 + Math.random() * 6.5;
        particles.push({
          x: monsterX + (Math.random() * 24 - 12),
          y: monsterY + (Math.random() * 24 - 12),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1,
          size: 2.2 + Math.random() * 3.5,
          color: Math.random() > 0.5 ? '#f59e0b' : '#ef4444',
          alpha: 1,
          life: 0,
          maxLife: 28 + Math.random() * 18,
          gravity: -0.06,
        });
      }
    } else if (
      activeVFX === 'arise' ||
      activeVFX === 'monarch_domain' ||
      activeVFX === 'shadow_extraction' ||
      activeVFX === 'companion_bellion'
    ) {
      for (let i = 0; i < 45; i++) {
        particles.push({
          x: width * 0.12 + Math.random() * (width * 0.76),
          y: height * 0.88 + Math.random() * 15,
          vx: (Math.random() - 0.5) * 2,
          vy: -(2 + Math.random() * 4),
          size: 2.5 + Math.random() * 3.8,
          color: Math.random() > 0.4 ? '#a855f7' : '#c084fc',
          alpha: 0.95,
          life: 0,
          maxLife: 32 + Math.random() * 22,
        });
      }
    } else if (activeVFX === 'companion_igris') {
      for (let i = 0; i < 35; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2.5 + Math.random() * 5.5;
        particles.push({
          x: monsterX + (Math.random() * 20 - 10),
          y: monsterY + (Math.random() * 20 - 10),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 2.5 + Math.random() * 3,
          color: Math.random() > 0.3 ? '#dc2626' : '#991b1b',
          alpha: 1,
          life: 0,
          maxLife: 26 + Math.random() * 16,
        });
      }
    } else if (activeVFX === 'companion_beru') {
      for (let i = 0; i < 40; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 3.5 + Math.random() * 6;
        particles.push({
          x: monsterX,
          y: monsterY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 2 + Math.random() * 3,
          color: Math.random() > 0.5 ? '#eab308' : '#a855f7',
          alpha: 1,
          life: 0,
          maxLife: 28 + Math.random() * 16,
        });
      }
    } else if (activeVFX === 'companion_tank') {
      for (let i = 0; i < 35; i++) {
        const angle = Math.PI + Math.random() * Math.PI;
        const speed = 2 + Math.random() * 5;
        particles.push({
          x: monsterX + (Math.random() * 30 - 15),
          y: height * 0.78,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 2.5 + Math.random() * 3.5,
          color: Math.random() > 0.4 ? '#38bdf8' : '#e0f2fe',
          alpha: 1,
          life: 0,
          maxLife: 25 + Math.random() * 15,
          gravity: 0.12,
        });
      }
    }

    // Ground impact particles if triggered
    if (groundImpactActive) {
      const dustCount = groundImpactIntensity === 'colossal' ? 28 : groundImpactIntensity === 'heavy' ? 18 : 12;
      for (let i = 0; i < dustCount; i++) {
        const angle = Math.PI + (Math.random() * Math.PI);
        const speed = 1.8 + Math.random() * 4.8;
        particles.push({
          x: monsterX + (Math.random() * 34 - 17),
          y: height * 0.78,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 2 + Math.random() * 3.6,
          color: Math.random() > 0.5 ? '#78716c' : '#38bdf8',
          alpha: 0.85,
          life: 0,
          maxLife: 22 + Math.random() * 16,
          gravity: 0.14,
        });
      }
    }

    let animFrameId: number;

    const render = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const alpha = Math.max(0, 1 - progress);

      ctx.clearRect(0, 0, width, height);

      // =========================================================================
      // DRAW PROCEDURAL CINEMATIC SKILL GEOMETRY
      // =========================================================================

      // 1. BASIC SLASH: Twin High-Speed Curved Plasma Blade Arcs
      if (activeVFX === 'basic_slash') {
        ctx.save();
        ctx.lineCap = 'round';

        // Outer glow
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#00e5ff';

        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 229, 255, ${alpha * 0.95})`;
        ctx.lineWidth = 10;
        ctx.moveTo(monsterX - 55 + progress * 20, monsterY + 45 - progress * 10);
        ctx.quadraticCurveTo(monsterX, monsterY - 18, monsterX + 55 + progress * 20, monsterY - 40);
        ctx.stroke();

        // White razor core
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = 3.5;
        ctx.moveTo(monsterX - 50 + progress * 20, monsterY + 42 - progress * 10);
        ctx.quadraticCurveTo(monsterX, monsterY - 18, monsterX + 50 + progress * 20, monsterY - 38);
        ctx.stroke();

        // Cross blade
        ctx.beginPath();
        ctx.strokeStyle = `rgba(56, 189, 248, ${alpha * 0.85})`;
        ctx.lineWidth = 7;
        ctx.moveTo(monsterX + 50 - progress * 15, monsterY + 38);
        ctx.quadraticCurveTo(monsterX, monsterY - 8, monsterX - 50 - progress * 15, monsterY - 32);
        ctx.stroke();

        ctx.restore();
      }

      // 2. DAGGER THROW: 6 Converging Laser Piercing Daggers
      if (activeVFX === 'dagger_throw') {
        ctx.save();
        ctx.lineCap = 'round';
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#38bdf8';

        ctx.beginPath();
        ctx.strokeStyle = `rgba(56, 189, 248, ${alpha * 0.85})`;
        ctx.lineWidth = 2.5;
        ctx.arc(monsterX, monsterY, 26 * (1 - progress * 0.3), 0, Math.PI * 2);
        ctx.stroke();

        const daggerAngles = [0, 1.05, 2.1, 3.14, 4.19, 5.24];
        daggerAngles.forEach((ang) => {
          const dist = 75 * (1 - easeProgress);
          const startX = monsterX + Math.cos(ang) * (dist + 35);
          const startY = monsterY + Math.sin(ang) * (dist + 35);
          const endX = monsterX + Math.cos(ang) * dist;
          const endY = monsterY + Math.sin(ang) * dist;

          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 229, 255, ${alpha * 0.95})`;
          ctx.lineWidth = 4.5;
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.stroke();

          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.lineWidth = 2;
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.stroke();
        });
        ctx.restore();
      }

      // 3. VITAL STRIKE: Crimson Sniper Reticle & Heart Laser Spike
      if (activeVFX === 'vital_strike') {
        ctx.save();
        ctx.shadowBlur = 18;
        ctx.shadowColor = '#ef4444';

        ctx.beginPath();
        ctx.strokeStyle = `rgba(239, 68, 68, ${alpha * 0.95})`;
        ctx.lineWidth = 3;
        ctx.arc(monsterX, monsterY, 35 * (1 - progress * 0.2), 0, Math.PI * 2);
        ctx.stroke();

        // Crosshairs
        ctx.beginPath();
        ctx.moveTo(monsterX, monsterY - 50);
        ctx.lineTo(monsterX, monsterY + 50);
        ctx.moveTo(monsterX - 50, monsterY);
        ctx.lineTo(monsterX + 50, monsterY);
        ctx.stroke();

        // Piercing heart spike
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = 5;
        ctx.moveTo(monsterX, monsterY - 55);
        ctx.lineTo(monsterX, monsterY + 55);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = `rgba(239, 68, 68, ${alpha * 0.8})`;
        ctx.arc(monsterX, monsterY, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 4. VENOM STRIKE & RASAKA FLURRY
      if (activeVFX === 'venom_strike' || activeVFX === 'rasaka_flurry') {
        ctx.save();
        ctx.shadowBlur = 16;
        ctx.shadowColor = '#22c55e';

        // Dual Toxic Vipers Fangs
        ctx.fillStyle = `rgba(34, 197, 94, ${alpha * 0.9})`;
        ctx.strokeStyle = `rgba(134, 239, 172, ${alpha})`;
        ctx.lineWidth = 2.5;

        ctx.beginPath();
        ctx.moveTo(monsterX - 30, monsterY - 40);
        ctx.quadraticCurveTo(monsterX - 6, monsterY - 6, monsterX, monsterY);
        ctx.quadraticCurveTo(monsterX - 22, monsterY - 18, monsterX - 30, monsterY - 40);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(monsterX + 30, monsterY - 40);
        ctx.quadraticCurveTo(monsterX + 6, monsterY - 6, monsterX, monsterY);
        ctx.quadraticCurveTo(monsterX + 22, monsterY - 18, monsterX + 30, monsterY - 40);
        ctx.fill();
        ctx.stroke();

        if (activeVFX === 'rasaka_flurry') {
          // Extra venom slash arcs
          for (let i = 0; i < 4; i++) {
            const rot = (Math.PI / 4) * i + progress * 2;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(168, 85, 247, ${alpha * 0.85})`;
            ctx.lineWidth = 4;
            ctx.arc(monsterX, monsterY, 38 + i * 8, rot, rot + 1.2);
            ctx.stroke();
          }
        }
        ctx.restore();
      }

      // 5. MUTILATE X: Execution Cleave
      if (activeVFX === 'mutilate_x') {
        ctx.save();
        ctx.lineCap = 'round';
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#f43f5e';
        const span = 50 * easeProgress;

        ctx.beginPath();
        ctx.strokeStyle = `rgba(244, 63, 94, ${alpha * 0.95})`;
        ctx.lineWidth = 11;
        ctx.moveTo(monsterX - span, monsterY - span);
        ctx.lineTo(monsterX + span, monsterY + span);
        ctx.moveTo(monsterX + span, monsterY - span);
        ctx.lineTo(monsterX - span, monsterY + span);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = 4;
        ctx.moveTo(monsterX - span, monsterY - span);
        ctx.lineTo(monsterX + span, monsterY + span);
        ctx.moveTo(monsterX + span, monsterY - span);
        ctx.lineTo(monsterX - span, monsterY + span);
        ctx.stroke();
        ctx.restore();
      }

      // 6. KAMISH WRATH: Volcanic Dragon Magma Jaws
      if (activeVFX === 'kamish_wrath') {
        ctx.save();
        ctx.shadowBlur = 22;
        ctx.shadowColor = '#f59e0b';
        ctx.fillStyle = `rgba(245, 158, 11, ${alpha * 0.85})`;
        ctx.strokeStyle = `rgba(254, 240, 138, ${alpha})`;
        ctx.lineWidth = 3;

        ctx.beginPath();
        ctx.moveTo(monsterX - 52, monsterY - 35);
        ctx.quadraticCurveTo(monsterX, monsterY - 50, monsterX + 52, monsterY - 12);
        ctx.quadraticCurveTo(monsterX, monsterY - 18, monsterX - 52, monsterY - 35);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(monsterX - 52, monsterY + 35);
        ctx.quadraticCurveTo(monsterX, monsterY + 50, monsterX + 52, monsterY + 12);
        ctx.quadraticCurveTo(monsterX, monsterY + 18, monsterX - 52, monsterY + 35);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }

      // 7. STEALTH & SHADOW ARMOR
      if (activeVFX === 'stealth_invisible' || activeVFX === 'shadow_armor') {
        ctx.save();
        const color = activeVFX === 'shadow_armor' ? '129, 140, 248' : '0, 229, 255';
        ctx.strokeStyle = `rgba(${color}, ${alpha * 0.9})`;
        ctx.lineWidth = 2.5;

        const hexRadius = 28 * (0.8 + progress * 0.25);
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

      // 8. BLOODLUST AURA: Demonic Giant Red Eye Glare
      if (activeVFX === 'bloodlust_aura') {
        ctx.save();
        ctx.shadowBlur = 24;
        ctx.shadowColor = '#dc2626';

        // Outer red pulsing rings
        ctx.beginPath();
        ctx.strokeStyle = `rgba(220, 38, 38, ${alpha * 0.85})`;
        ctx.lineWidth = 4;
        ctx.arc(monsterX, monsterY, 45 * easeProgress, 0, Math.PI * 2);
        ctx.stroke();

        // Demonic Eye
        ctx.beginPath();
        ctx.fillStyle = `rgba(185, 28, 28, ${alpha * 0.9})`;
        ctx.ellipse(monsterX, monsterY, 32, 16, 0, 0, Math.PI * 2);
        ctx.fill();

        // Slit Pupil
        ctx.beginPath();
        ctx.fillStyle = '#000000';
        ctx.ellipse(monsterX, monsterY, 5, 14, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 9. RULER'S AUTHORITY: Vertical Gravitational Slam
      if (activeVFX === 'ruler_authority') {
        ctx.save();
        ctx.lineCap = 'round';
        ctx.shadowBlur = 18;
        ctx.shadowColor = '#00e5ff';
        const slamY = height * easeProgress;

        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 229, 255, ${alpha * 0.9})`;
        ctx.lineWidth = 10;
        ctx.moveTo(monsterX - 28, 0);
        ctx.lineTo(monsterX - 28, slamY);
        ctx.moveTo(monsterX + 28, 0);
        ctx.lineTo(monsterX + 28, slamY);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = 4;
        ctx.moveTo(monsterX, 0);
        ctx.lineTo(monsterX, slamY);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
        ctx.lineWidth = 3.5;
        ctx.ellipse(monsterX, height * 0.78, 52 * easeProgress, 16 * easeProgress, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // 10. SPATIAL COLLAPSE: Singularity Black Hole Vortex
      if (activeVFX === 'spatial_collapse') {
        ctx.save();
        ctx.shadowBlur = 24;
        ctx.shadowColor = '#a855f7';
        const rot = progress * Math.PI * 5;

        ctx.beginPath();
        ctx.strokeStyle = `rgba(168, 85, 247, ${alpha * 0.95})`;
        ctx.lineWidth = 4;
        ctx.arc(monsterX, monsterY, 36, rot, rot + Math.PI * 1.5);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 229, 255, ${alpha * 0.85})`;
        ctx.lineWidth = 3;
        ctx.arc(monsterX, monsterY, 48, rot + Math.PI, rot + Math.PI * 2.3);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = '#000000';
        ctx.arc(monsterX, monsterY, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
      }

      // 11. ARISE & MONARCH DOMAIN: Giant Demonic Runes
      if (activeVFX === 'arise' || activeVFX === 'monarch_domain' || activeVFX === 'shadow_extraction') {
        ctx.save();
        ctx.shadowBlur = 26;
        ctx.shadowColor = '#a855f7';
        const floorY = height * 0.82;
        const rx = width * 0.40 * easeProgress;
        const ry = 20 * easeProgress;

        ctx.beginPath();
        ctx.strokeStyle = `rgba(168, 85, 247, ${alpha * 0.95})`;
        ctx.lineWidth = 3.5;
        ctx.ellipse(width * 0.5, floorY, rx, ry, 0, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = `rgba(192, 132, 252, ${alpha * 0.75})`;
        ctx.lineWidth = 2;
        ctx.ellipse(width * 0.5, floorY, rx * 0.68, ry * 0.68, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Rising shadow pillars
        for (let i = -3; i <= 3; i++) {
          const px = width * 0.5 + (i * 38);
          const py = floorY - (Math.sin(progress * Math.PI) * 45);
          ctx.beginPath();
          ctx.strokeStyle = `rgba(147, 51, 234, ${alpha * 0.7})`;
          ctx.lineWidth = 3;
          ctx.moveTo(px, floorY);
          ctx.lineTo(px, py);
          ctx.stroke();
        }
        ctx.restore();
      }

      // 12. DRAGON BREATH: Massive Plasma Torrent
      if (activeVFX === 'dragon_breath') {
        ctx.save();
        ctx.lineCap = 'round';
        ctx.shadowBlur = 28;
        ctx.shadowColor = '#00e5ff';

        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 229, 255, ${alpha * 0.8})`;
        ctx.lineWidth = 28 * (1 - progress * 0.25);
        ctx.moveTo(hunterX, monsterY);
        ctx.lineTo(monsterX - 45, monsterY);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = 9;
        ctx.moveTo(hunterX, monsterY);
        ctx.lineTo(monsterX - 45, monsterY);
        ctx.stroke();
        ctx.restore();
      }

      // 13. DEMON LIGHTNING: 5 Jagged Heaven Bolts
      if (activeVFX === 'demon_lightning') {
        ctx.save();
        ctx.lineCap = 'round';
        ctx.shadowBlur = 22;
        ctx.shadowColor = '#38bdf8';

        const points = [
          { x: monsterX + 6, y: 0 },
          { x: monsterX - 22, y: height * 0.24 },
          { x: monsterX + 20, y: height * 0.50 },
          { x: monsterX - 15, y: height * 0.74 },
          { x: monsterX, y: monsterY },
        ];

        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 229, 255, ${alpha * 0.95})`;
        ctx.lineWidth = 8;
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = 3;
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
        ctx.restore();
      }

      // 14. VOID CLEAVE: Diagonal Reality Tear
      if (activeVFX === 'void_cleave') {
        ctx.save();
        ctx.lineCap = 'round';
        ctx.shadowBlur = 26;
        ctx.shadowColor = '#c084fc';

        ctx.beginPath();
        ctx.strokeStyle = `rgba(168, 85, 247, ${alpha * 0.95})`;
        ctx.lineWidth = 16;
        ctx.moveTo(monsterX - 60, monsterY + 55);
        ctx.lineTo(monsterX + 60, monsterY - 55);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 7;
        ctx.moveTo(monsterX - 60, monsterY + 55);
        ctx.lineTo(monsterX + 60, monsterY - 55);
        ctx.stroke();
        ctx.restore();
      }

      // =========================================================================
      // COMPANION SUMMON SIGNATURE VFX
      // =========================================================================

      // 15. COMPANION IGRIS: Blood-Red Claymore Overhead Cleave
      if (activeVFX === 'companion_igris') {
        ctx.save();
        ctx.lineCap = 'round';
        ctx.shadowBlur = 26;
        ctx.shadowColor = '#dc2626';

        // Massive Blood Cleave Arc
        ctx.beginPath();
        ctx.strokeStyle = `rgba(220, 38, 38, ${alpha * 0.95})`;
        ctx.lineWidth = 14;
        ctx.moveTo(monsterX - 65, monsterY - 45);
        ctx.lineTo(monsterX + 65, monsterY + 45);
        ctx.stroke();

        // White razor edge
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = 4;
        ctx.moveTo(monsterX - 65, monsterY - 45);
        ctx.lineTo(monsterX + 65, monsterY + 45);
        ctx.stroke();

        // Blood Cross Aura
        ctx.beginPath();
        ctx.strokeStyle = `rgba(239, 68, 68, ${alpha * 0.8})`;
        ctx.lineWidth = 8;
        ctx.moveTo(monsterX + 50, monsterY - 40);
        ctx.lineTo(monsterX - 50, monsterY + 40);
        ctx.stroke();
        ctx.restore();
      }

      // 16. COMPANION BERU: Supersonic Blitz Mantis Claw
      if (activeVFX === 'companion_beru') {
        ctx.save();
        ctx.lineCap = 'round';
        ctx.shadowBlur = 26;
        ctx.shadowColor = '#eab308';

        // Supersonic Blitz Trails
        for (let i = -2; i <= 2; i++) {
          const off = i * 16;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(234, 179, 8, ${alpha * 0.85})`;
          ctx.lineWidth = 4.5;
          ctx.moveTo(monsterX - 45 + off, monsterY + 35);
          ctx.lineTo(monsterX + 45 + off, monsterY - 35);
          ctx.stroke();
        }

        // Golden Impact Spark
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.arc(monsterX, monsterY, 20 * (1 - progress * 0.5), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 17. COMPANION TUSK: Volcanic Pillar of Avarice
      if (activeVFX === 'companion_tusk') {
        ctx.save();
        ctx.shadowBlur = 30;
        ctx.shadowColor = '#f97316';

        // Giant flame pillar
        ctx.beginPath();
        ctx.fillStyle = `rgba(249, 115, 22, ${alpha * 0.85})`;
        ctx.fillRect(monsterX - 32, 0, 64, height);

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
        ctx.fillRect(monsterX - 12, 0, 24, height);
        ctx.restore();
      }

      // 18. COMPANION TANK: Arctic Bear Ground Smash
      if (activeVFX === 'companion_tank') {
        ctx.save();
        ctx.shadowBlur = 22;
        ctx.shadowColor = '#38bdf8';

        ctx.beginPath();
        ctx.strokeStyle = `rgba(56, 189, 248, ${alpha * 0.9})`;
        ctx.lineWidth = 5;
        ctx.ellipse(monsterX, height * 0.78, 55 * easeProgress, 18 * easeProgress, 0, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
        ctx.lineWidth = 2.5;
        ctx.ellipse(monsterX, height * 0.78, 38 * easeProgress, 12 * easeProgress, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // 19. COMPANION BELLION: Centipede Blade Screen Cleave
      if (activeVFX === 'companion_bellion') {
        ctx.save();
        ctx.lineCap = 'round';
        ctx.shadowBlur = 28;
        ctx.shadowColor = '#a855f7';

        // Sweeping Centipede Blade Whip
        ctx.beginPath();
        ctx.strokeStyle = `rgba(168, 85, 247, ${alpha * 0.95})`;
        ctx.lineWidth = 14;
        ctx.moveTo(0, height * 0.65);
        ctx.quadraticCurveTo(monsterX, height * 0.2, width, height * 0.75);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = 4;
        ctx.moveTo(0, height * 0.65);
        ctx.quadraticCurveTo(monsterX, height * 0.2, width, height * 0.75);
        ctx.stroke();
        ctx.restore();
      }

      // 20. BOSS ATTACKS: Claw / Combo / Ultimate
      if (activeVFX === 'boss_claw' || activeVFX === 'boss_combo') {
        ctx.save();
        ctx.lineCap = 'round';
        ctx.shadowBlur = 18;
        ctx.shadowColor = '#ef4444';

        [-18, 0, 18].forEach((offset) => {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(239, 68, 68, ${alpha * 0.95})`;
          ctx.lineWidth = 6;
          ctx.moveTo(hunterX + offset - 28, hunterY - 38);
          ctx.lineTo(hunterX + offset + 28, hunterY + 38);
          ctx.stroke();

          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.lineWidth = 2;
          ctx.moveTo(hunterX + offset - 28, hunterY - 38);
          ctx.lineTo(hunterX + offset + 28, hunterY + 38);
          ctx.stroke();
        });
        ctx.restore();
      }

      if (activeVFX === 'boss_ultimate') {
        ctx.save();
        ctx.shadowBlur = 32;
        ctx.shadowColor = '#dc2626';

        // Apocalyptic Dark Nova detonating on player
        ctx.beginPath();
        ctx.fillStyle = `rgba(220, 38, 38, ${alpha * 0.85})`;
        ctx.arc(hunterX, hunterY, 50 * easeProgress, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.arc(hunterX, hunterY, 20 * easeProgress, 0, Math.PI * 2);
        ctx.fill();
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
