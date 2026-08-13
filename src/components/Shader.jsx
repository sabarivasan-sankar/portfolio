import React, { useEffect, useRef } from 'react';

export const RippleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    let time = 0;

    const render = () => {
      time += 0.012;
      ctx.clearRect(0, 0, width, height);

      // Smooth drifting movement across the canvas
      const baseX = width > 768 ? width * 0.62 : width * 0.5;
      const baseY = height * 0.5;

      const blobX = baseX + Math.sin(time * 0.5) * (width * 0.18);
      const blobY = baseY + Math.cos(time * 0.7) * (height * 0.2);

      // Growth cycle: Grows from 0 to full scale (~1.3) and scales down smoothly back toward 0
      const rawScale = (Math.sin(time * 0.4) + 1) / 2; // 0 to 1
      const scale = Math.pow(rawScale, 1.2) * 1.3;

      if (scale > 0.01) {
        ctx.save();
        ctx.translate(blobX, blobY);
        ctx.scale(scale, scale);

        const baseRadius = Math.min(width, height) * 0.35;

        // Generate points for smooth organic curve
        const numPoints = 8;
        const points = [];

        for (let i = 0; i < numPoints; i++) {
          const angle = (i / numPoints) * Math.PI * 2;
          // Smooth, non-polygonal organic deformation
          const wobble =
            Math.sin(angle * 2 + time * 1.2) * 28 +
            Math.cos(angle * 3 - time * 0.8) * 20;
          const r = baseRadius + wobble;
          points.push({
            x: Math.cos(angle) * r,
            y: Math.sin(angle) * r,
          });
        }

        // Draw perfectly smooth, curvy blob using quadratic curves through midpoints
        ctx.beginPath();
        const lastPt = points[numPoints - 1];
        const firstPt = points[0];
        ctx.moveTo((lastPt.x + firstPt.x) / 2, (lastPt.y + firstPt.y) / 2);

        for (let i = 0; i < numPoints; i++) {
          const curr = points[i];
          const next = points[(i + 1) % numPoints];
          const midX = (curr.x + next.x) / 2;
          const midY = (curr.y + next.y) / 2;
          ctx.quadraticCurveTo(curr.x, curr.y, midX, midY);
        }
        ctx.closePath();

        // Fill with rich organic gray gradient
        const grad = ctx.createRadialGradient(0, 0, baseRadius * 0.1, 0, 0, baseRadius * 1.1);
        grad.addColorStop(0, '#c4cbd4');
        grad.addColorStop(0.5, '#a4adb9');
        grad.addColorStop(0.85, '#88919e');
        grad.addColorStop(1, 'rgba(120, 128, 140, 0)');

        ctx.fillStyle = grad;
        ctx.shadowColor = 'rgba(100, 110, 125, 0.2)';
        ctx.shadowBlur = 35;
        ctx.fill();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none -z-10"
    />
  );
};

export default RippleCanvas;