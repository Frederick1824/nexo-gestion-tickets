import { useEffect, useRef } from "react";

interface TechNetworkProps {
  intensity?: "hero" | "subtle";
  variant?: "dark" | "light" | "adaptive";
  className?: string;
}

interface NodePoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
}

interface ContrastZone {
  top: number;
  bottom: number;
  darkness: number;
}

const mix = (light: number, dark: number, amount: number) =>
  Math.round(light + (dark - light) * amount);

const rgba = (
  light: [number, number, number],
  dark: [number, number, number],
  amount: number,
  alpha: number,
) =>
  `rgba(${mix(light[0], dark[0], amount)}, ${mix(light[1], dark[1], amount)}, ${mix(light[2], dark[2], amount)}, ${alpha})`;

export function TechNetwork({
  intensity = "hero",
  variant = "dark",
  className = "",
}: TechNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const device = navigator as Navigator & { deviceMemory?: number };
    const lowPower =
      (navigator.hardwareConcurrency || 4) <= 4 ||
      (device.deviceMemory || 4) <= 2;
    const nodeLimit = intensity === "hero" ? 44 : 25;
    const particleLimit = intensity === "hero" ? 9 : 4;
    const nodes: NodePoint[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let lastTime = 0;
    let resizeTimer = 0;
    let zones: ContrastZone[] = [];

    const refreshZones = () => {
      if (variant !== "adaptive") return;
      const landing = canvas.closest(".landing");
      if (!landing) return;
      zones = Array.from(
        landing.querySelectorAll<HTMLElement>("main > section"),
      ).map((section) => {
        const bounds = section.getBoundingClientRect();
        const darkness = Number.parseFloat(
          getComputedStyle(section).getPropertyValue("--network-dark"),
        );
        return {
          top: bounds.top + window.scrollY,
          bottom: bounds.bottom + window.scrollY,
          darkness: Number.isFinite(darkness) ? darkness : 0,
        };
      });
    };

    const darknessAt = (viewportY: number) => {
      if (variant === "dark") return 1;
      if (variant === "light" || !zones.length) return 0;

      const pageY = viewportY + window.scrollY;
      const transition = 110;
      const boundaries = zones.slice(0, -1).map((zone, index) => {
        const next = zones[index + 1];
        return (zone.bottom + next.top) / 2;
      });
      let index = boundaries.findIndex((boundary) => pageY < boundary);
      if (index === -1) index = zones.length - 1;
      if (index > 0) {
        const boundary = boundaries[index - 1];
        if (Math.abs(pageY - boundary) < transition) {
          const progress = (pageY - (boundary - transition)) / (transition * 2);
          const eased = progress * progress * (3 - 2 * progress);
          return (
            zones[index - 1].darkness +
            (zones[index].darkness - zones[index - 1].darkness) * eased
          );
        }
      }
      return zones[index].darkness;
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, lowPower ? 1 : 1.5);
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const responsiveLimit =
        width < 640 ? Math.ceil(nodeLimit * 0.55) : nodeLimit;
      nodes.length = 0;
      for (let index = 0; index < responsiveLimit; index += 1) {
        const speed = reducedMotion ? 0 : lowPower ? 0.035 : 0.06;
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          radius: 1.2 + Math.random() * 1.8,
          phase: Math.random() * Math.PI * 2,
        });
      }
      refreshZones();
    };

    const draw = (time = 0) => {
      const delta = Math.min(32, time - lastTime || 16);
      lastTime = time;
      context.clearRect(0, 0, width, height);
      const connectionDistance = width < 640 ? 105 : 145;
      const connections: Array<[NodePoint, NodePoint]> = [];

      nodes.forEach((node) => {
        node.x += node.vx * delta;
        node.y += node.vy * delta;
        if (node.x < -10 || node.x > width + 10) node.vx *= -1;
        if (node.y < -10 || node.y > height + 10) node.vy *= -1;
      });

      for (let left = 0; left < nodes.length; left += 1) {
        for (let right = left + 1; right < nodes.length; right += 1) {
          const first = nodes[left];
          const second = nodes[right];
          const distance = Math.hypot(first.x - second.x, first.y - second.y);
          if (distance < connectionDistance) {
            const darkness = darknessAt((first.y + second.y) / 2);
            const opacity =
              (1 - distance / connectionDistance) *
              (intensity === "hero" ? 0.26 - darkness * 0.04 : 0.1);
            context.beginPath();
            context.moveTo(first.x, first.y);
            context.lineTo(second.x, second.y);
            context.strokeStyle = rgba(
              [18, 100, 181],
              [63, 220, 235],
              darkness,
              opacity,
            );
            context.lineWidth = 0.9 + darkness * 0.1;
            context.stroke();
            connections.push([first, second]);
          }
        }
      }

      if (!reducedMotion && !lowPower && connections.length) {
        const count = Math.min(particleLimit, connections.length);
        for (let index = 0; index < count; index += 1) {
          const [start, end] =
            connections[(index * 7 + 3) % connections.length];
          const progress = (time * 0.000055 + index / count) % 1;
          const x = start.x + (end.x - start.x) * progress;
          const y = start.y + (end.y - start.y) * progress;
          const darkness = darknessAt(y);
          context.beginPath();
          context.arc(x, y, 1.8 - darkness * 0.25, 0, Math.PI * 2);
          context.fillStyle = rgba(
            [0, 105, 196],
            [143, 244, 255],
            darkness,
            0.92,
          );
          context.shadowColor = rgba([9, 91, 181], [56, 217, 239], darkness, 1);
          context.shadowBlur = 7;
          context.fill();
          context.shadowBlur = 0;
        }
      }

      nodes.forEach((node) => {
        const darkness = darknessAt(node.y);
        const glow = reducedMotion
          ? 0.65
          : 0.65 + Math.sin(time * 0.001 + node.phase) * 0.2;
        context.beginPath();
        context.arc(
          node.x,
          node.y,
          node.radius * (1.25 - darkness * 0.15),
          0,
          Math.PI * 2,
        );
        context.fillStyle = rgba(
          [3, 92, 177],
          [58, 222, 239],
          darkness,
          Math.min(1, glow + 0.2 - darkness * 0.08),
        );
        context.shadowColor = rgba([7, 85, 174], [32, 205, 227], darkness, 1);
        context.shadowBlur = intensity === "hero" ? 11 : 5;
        context.fill();
        context.shadowBlur = 0;
      });

      if (!reducedMotion) frame = requestAnimationFrame(draw);
    };

    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 120);
    };
    resize();
    draw();
    window.addEventListener("resize", onResize, { passive: true });
    const resizeObserver = new ResizeObserver(refreshZones);
    const landingMain = canvas.closest(".landing")?.querySelector("main");
    if (landingMain) resizeObserver.observe(landingMain);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      resizeObserver.disconnect();
    };
  }, [intensity, variant]);

  return (
    <canvas
      ref={canvasRef}
      className={`tech-network ${className}`}
      aria-hidden="true"
    />
  );
}
