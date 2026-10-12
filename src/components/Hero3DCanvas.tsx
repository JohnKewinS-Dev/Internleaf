import React, { useEffect, useRef } from 'react';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Particle3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  alpha: number;
  color: string;
}

export const Hero3DCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || 600;
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const relativeX = (e.clientX - rect.left) / width - 0.5;
      const relativeY = (e.clientY - rect.top) / height - 0.5;
      mouseRef.current.targetX = relativeX * 0.8;
      mouseRef.current.targetY = relativeY * 0.8;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Create 3D Polyhedron Geometries (Glass Icosahedron/Prism)
    // Vertices for a 3D dual-ring prism
    const baseRadius = Math.min(width, height) * 0.28;
    const vertices: Point3D[] = [];
    const segments = 6;
    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      vertices.push({
        x: Math.cos(angle) * baseRadius,
        y: Math.sin(angle) * baseRadius,
        z: -baseRadius * 0.6
      });
      vertices.push({
        x: Math.cos(angle + Math.PI / segments) * baseRadius * 1.25,
        y: Math.sin(angle + Math.PI / segments) * baseRadius * 1.25,
        z: baseRadius * 0.4
      });
    }
    // Top and bottom apex points
    vertices.push({ x: 0, y: 0, z: baseRadius * 1.4 });
    vertices.push({ x: 0, y: 0, z: -baseRadius * 1.4 });

    // Inner orbiting rings
    const ringPoints: Point3D[] = [];
    const ringCount = 28;
    for (let i = 0; i < ringCount; i++) {
      const angle = (i / ringCount) * Math.PI * 2;
      ringPoints.push({
        x: Math.cos(angle) * baseRadius * 1.45,
        y: Math.sin(angle) * baseRadius * 1.45,
        z: Math.sin(angle * 2) * 40
      });
    }

    // Floating glowing mint particles
    const particles: Particle3D[] = [];
    const particleCount = 45;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.2,
        y: (Math.random() - 0.5) * height * 1.2,
        z: (Math.random() - 0.5) * 600,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -0.2 - Math.random() * 0.4,
        vz: (Math.random() - 0.5) * 0.3,
        size: 1.5 + Math.random() * 3,
        alpha: 0.2 + Math.random() * 0.5,
        color: Math.random() > 0.4 ? '#31C48D' : '#98F6D5'
      });
    }

    let rotX = 0.2;
    let rotY = 0.3;
    let rotZ = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      rotX += 0.003 + mouseRef.current.y * 0.01;
      rotY += 0.005 + mouseRef.current.x * 0.01;
      rotZ += 0.002;

      const cx = width * 0.52;
      const cy = height * 0.5;
      const fov = 500;

      // Project 3D to 2D function
      const project = (p: Point3D): { x: number; y: number; scale: number; depth: number } => {
        // Rotate around Y
        let cosY = Math.cos(rotY);
        let sinY = Math.sin(rotY);
        let x1 = p.x * cosY + p.z * sinY;
        let z1 = -p.x * sinY + p.z * cosY;

        // Rotate around X
        let cosX = Math.cos(rotX);
        let sinX = Math.sin(rotX);
        let y2 = p.y * cosX - z1 * sinX;
        let z2 = p.y * sinX + z1 * cosX;

        // Rotate around Z
        let cosZ = Math.cos(rotZ);
        let sinZ = Math.sin(rotZ);
        let x3 = x1 * cosZ - y2 * sinZ;
        let y3 = x1 * sinZ + y2 * cosZ;

        let scale = fov / (fov + z2 + 350);
        return {
          x: cx + x3 * scale,
          y: cy + y3 * scale,
          scale,
          depth: z2
        };
      };

      // Draw background ambient glow
      const radialGlow = ctx.createRadialGradient(cx, cy, 20, cx, cy, baseRadius * 1.8);
      radialGlow.addColorStop(0, 'rgba(152, 246, 213, 0.28)');
      radialGlow.addColorStop(0.5, 'rgba(221, 251, 240, 0.16)');
      radialGlow.addColorStop(1, 'rgba(244, 255, 249, 0)');
      ctx.fillStyle = radialGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius * 1.8, 0, Math.PI * 2);
      ctx.fill();

      // Draw ambient particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        if (p.y < -height * 0.6) p.y = height * 0.6;
        if (p.x < -width * 0.6) p.x = width * 0.6;
        if (p.x > width * 0.6) p.x = -width * 0.6;

        const prj = project({ x: p.x, y: p.y, z: p.z });
        if (prj.scale > 0) {
          ctx.beginPath();
          ctx.arc(prj.x, prj.y, p.size * prj.scale, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha * Math.min(1, Math.max(0.1, prj.scale * 1.2));
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1;

      // Project all mesh vertices
      const projVertices = vertices.map(project);
      const projRing = ringPoints.map(project);

      // Draw orbital floating ring
      ctx.beginPath();
      for (let i = 0; i < projRing.length; i++) {
        const pt = projRing[i];
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(49, 196, 141, 0.35)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Draw glass lattice lines between vertices
      ctx.lineWidth = 1.3;
      for (let i = 0; i < vertices.length; i++) {
        for (let j = i + 1; j < vertices.length; j++) {
          const dx = vertices[i].x - vertices[j].x;
          const dy = vertices[i].y - vertices[j].y;
          const dz = vertices[i].z - vertices[j].z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < baseRadius * 1.5) {
            const p1 = projVertices[i];
            const p2 = projVertices[j];

            const avgDepth = (p1.depth + p2.depth) / 2;
            const alpha = Math.max(0.12, Math.min(0.65, (avgDepth + 300) / 600));

            const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            grad.addColorStop(0, `rgba(49, 196, 141, ${alpha * 0.8})`);
            grad.addColorStop(0.5, `rgba(152, 246, 213, ${alpha})`);
            grad.addColorStop(1, `rgba(18, 60, 50, ${alpha * 0.4})`);

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = grad;
            ctx.stroke();
          }
        }
      }

      // Draw glass vertex gems
      projVertices.forEach((pt) => {
        const radius = Math.max(2, 5.5 * pt.scale);
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = 'rgba(152, 246, 213, 0.8)';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, radius + 2, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(49, 196, 141, 0.7)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      <canvas ref={canvasRef} className="w-full h-full block opacity-85" />
    </div>
  );
};
