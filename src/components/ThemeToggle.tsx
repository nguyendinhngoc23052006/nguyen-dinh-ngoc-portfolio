import { Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const FIREWORK_HUES = [
  [345, 355, 15], // pink burst (headed to light)
  [200, 230, 260, 280], // cool burst (headed to dark)
];

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  hue: number;
  size: number;
};

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

function playBang() {
  if (typeof window === "undefined") return;
  // biome-ignore lint/suspicious/noExplicitAny: webkit prefix for older Safari
  const Ctx = window.AudioContext || (window as any).webkitAudioContext;
  if (!Ctx) return;
  const ctx = new Ctx();
  const now = ctx.currentTime;

  const bufferSize = ctx.sampleRate * 0.6;
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuffer;

  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = "lowpass";
  noiseFilter.frequency.setValueAtTime(3000, now);
  noiseFilter.frequency.exponentialRampToValueAtTime(120, now + 0.5);

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.9, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);

  noise.connect(noiseFilter).connect(noiseGain).connect(ctx.destination);
  noise.start(now);
  noise.stop(now + 0.6);

  const thump = ctx.createOscillator();
  thump.type = "sine";
  thump.frequency.setValueAtTime(160, now);
  thump.frequency.exponentialRampToValueAtTime(35, now + 0.35);
  const thumpGain = ctx.createGain();
  thumpGain.gain.setValueAtTime(0.8, now);
  thumpGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
  thump.connect(thumpGain).connect(ctx.destination);
  thump.start(now);
  thump.stop(now + 0.45);

  setTimeout(() => ctx.close(), 800);
}

function launchFireworks(
  originX: number,
  originY: number,
  next: "light" | "dark",
) {
  if (typeof window === "undefined") return;
  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.inset = "0";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "9999";
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    canvas.remove();
    return;
  }
  ctx.scale(dpr, dpr);

  const hues = FIREWORK_HUES[next === "light" ? 0 : 1];
  const particles: Particle[] = [];
  const burstCount = 3;
  const spread = 220;

  for (let b = 0; b < burstCount; b++) {
    const bx = originX + (Math.random() - 0.5) * spread;
    const by = originY + (Math.random() - 0.5) * spread * 0.6;
    const count = 70 + Math.floor(Math.random() * 30);
    const hue = hues[Math.floor(Math.random() * hues.length)];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.2;
      const speed = 4 + Math.random() * 6;
      particles.push({
        x: bx,
        y: by,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        hue: hue + (Math.random() - 0.5) * 20,
        size: 2 + Math.random() * 2,
      });
    }
  }

  let raf = 0;
  const start = performance.now();
  const tick = (t: number) => {
    const elapsed = t - start;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "lighter";
    let alive = 0;
    for (const p of particles) {
      if (p.life <= 0) continue;
      alive++;
      p.vy += 0.12;
      p.vx *= 0.985;
      p.vy *= 0.985;
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.014;
      const a = Math.max(0, p.life);
      ctx.fillStyle = `hsla(${p.hue}, 95%, 60%, ${a})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * a, 0, Math.PI * 2);
      ctx.fill();
    }
    if (alive === 0 || elapsed > 2500) {
      cancelAnimationFrame(raf);
      canvas.remove();
      return;
    }
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
}

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const busyRef = useRef(false);

  useEffect(() => {
    setMounted(true);
    const current =
      (document.documentElement.getAttribute("data-theme") as
        | "light"
        | "dark") || "dark";
    setTheme(current);
  }, []);

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (busyRef.current) return;
    busyRef.current = true;
    window.setTimeout(() => {
      busyRef.current = false;
    }, 800);

    const next = theme === "dark" ? "light" : "dark";
    const x = e.clientX;
    const y = e.clientY;
    const apply = () => {
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      setTheme(next);
    };

    if (!prefersReducedMotion()) {
      playBang();
      launchFireworks(x, y, next);
    }

    // biome-ignore lint/suspicious/noExplicitAny: View Transitions API not in default TS lib
    const doc = document as any;
    if (typeof doc.startViewTransition !== "function") {
      apply();
      return;
    }
    document.documentElement.style.setProperty("--transition-x", `${x}px`);
    document.documentElement.style.setProperty("--transition-y", `${y}px`);
    doc.startViewTransition(apply);
  };

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground"
      >
        <span style={{ width: 20, height: 20, display: "inline-block" }} />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
