import { useEffect, useRef } from 'react';
import { useTheme } from '@/hooks/useTheme';

export default function NetworkBackground() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Network particles
    const particles = [];
    const particleCount = 50;

    // Colours come from the CSS tokens rather than a hardcoded pair, so the
    // canvas follows the palette instead of duplicating it. Re-read on every
    // theme change because the effect depends on `theme`.
    const styles = getComputedStyle(document.documentElement);
    const token = (name, fallback) =>
      styles.getPropertyValue(name).trim() || fallback;

    const isDark = theme === 'dark';
    const primary = token('--qs-primary', isDark ? '#22d3ee' : '#0e7490');
    const pageBg = token('--qs-bg', isDark ? '#060810' : '#eef1f8');

    const alpha = (hex, a) => {
      const h = hex.replace('#', '');
      if (h.length !== 6) return hex;
      const r = parseInt(h.slice(0, 2), 16);
      const g = parseInt(h.slice(2, 4), 16);
      const b = parseInt(h.slice(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${a})`;
    };

    const lineColor = alpha(primary, isDark ? 0.12 : 0.1);
    const particleColor = alpha(primary, isDark ? 0.35 : 0.3);
    const glowColor = alpha(primary, 0.25);
    const trailColor = alpha(pageBg, isDark ? 0.05 : 0.1);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = (Math.random() - 0.5) * 1;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off walls
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Keep in bounds
        this.x = Math.max(0, Math.min(canvas.width, this.x));
        this.y = Math.max(0, Math.min(canvas.height, this.y));
      }

      draw(ctx) {
        ctx.fillStyle = particleColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();

        // Glow effect for dark theme
        if (isDark) {
          ctx.strokeStyle = glowColor;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    let animationId;
    const animate = () => {
      // Clear canvas with slight trail effect
      ctx.fillStyle = trailColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update();
        particle.draw(ctx);
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = distance > 100 ? 0.5 : 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.4 }}
    />
  );
}
