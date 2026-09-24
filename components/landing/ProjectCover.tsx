// Portadas generativas para proyectos sin hero_image.
// Todo se calcula en el servidor a partir del slug: mismo proyecto, misma portada.

interface ProjectCoverProps {
  seed: string;
  className?: string;
}

// hash FNV-1a, suficiente para repartir variantes sin depender de crypto
function hashSeed(seed: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

const W = 200;
const H = 150;
const CX = W / 2;
const CY = H / 2;

function Rings({ h }: { h: number }) {
  const count = 5 + (h % 4);
  return (
    <g fill="none" stroke="#f66661">
      {Array.from({ length: count }, (_, i) => (
        <circle
          key={i}
          cx={CX}
          cy={CY}
          r={10 + i * 9}
          strokeWidth={i === 2 ? 1.4 : 0.6}
          strokeOpacity={0.85 - i * 0.1}
          strokeDasharray={i % 2 ? "2 4" : undefined}
        />
      ))}
      <circle cx={CX} cy={CY} r={3} fill="#f66661" stroke="none" />
    </g>
  );
}

function Waves({ h }: { h: number }) {
  const lines = 9;
  const freq = 0.035 + ((h >> 3) % 4) * 0.008;
  const paths = Array.from({ length: lines }, (_, l) => {
    const phase = l * 0.45;
    const amp = 8 + l * 2.2;
    let d = "";
    for (let x = 0; x <= W; x += 4) {
      // envolvente gaussiana para que la onda se concentre en el centro
      const env = Math.exp(-((x - CX) ** 2) / 2600);
      const y = CY + Math.sin(x * freq + phase) * amp * env;
      d += `${x === 0 ? "M" : "L"}${x},${y.toFixed(1)} `;
    }
    return d;
  });
  return (
    <g fill="none" stroke="#ffffff">
      {paths.map((d, i) => (
        <path key={i} d={d} strokeWidth={0.7} strokeOpacity={0.25 + i * 0.07} />
      ))}
    </g>
  );
}

function DotGrid({ h }: { h: number }) {
  const cols = 16;
  const rows = 12;
  const dots = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = 10 + c * 12;
      const y = 9 + r * 12;
      const dist = Math.hypot(x - CX, y - CY);
      const lit = ((c * 7 + r * 13 + h) % 11) === 0 && dist < 60;
      dots.push(
        <circle
          key={`${r}-${c}`}
          cx={x}
          cy={y}
          r={lit ? 2 : 0.9}
          fill={lit ? "#f66661" : "#ffffff"}
          fillOpacity={lit ? 1 : Math.max(0.08, 0.5 - dist / 160)}
        />
      );
    }
  }
  return <g>{dots}</g>;
}

function Hexes({ h }: { h: number }) {
  const hex = (r: number) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i - Math.PI / 2;
      return `${(CX + r * Math.cos(a)).toFixed(1)},${(CY + r * Math.sin(a)).toFixed(1)}`;
    }).join(" ");
  const layers = 4 + (h % 3);
  return (
    <g fill="none" stroke="#ffffff">
      {Array.from({ length: layers }, (_, i) => (
        <polygon
          key={i}
          points={hex(12 + i * 11)}
          strokeWidth={i === 0 ? 1.4 : 0.6}
          stroke={i === 0 ? "#f66661" : "#ffffff"}
          strokeOpacity={i === 0 ? 1 : 0.55 - i * 0.07}
        />
      ))}
      <line x1={CX} y1={CY - 12} x2={CX} y2={CY + 12} stroke="#f66661" strokeWidth={1} />
    </g>
  );
}

const VARIANTS = [Rings, Waves, DotGrid, Hexes];

export default function ProjectCover({ seed, className }: ProjectCoverProps) {
  const h = hashSeed(seed);
  const Variant = VARIANTS[h % VARIANTS.length];
  // el id del gradiente debe ser único por tarjeta o se pisan entre SVGs
  const gradId = `cover-${h.toString(36)}`;
  const glowX = 30 + (h % 40);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={gradId} cx={`${glowX}%`} cy="100%" r="90%">
          <stop offset="0%" stopColor="#ca2b26" stopOpacity="0.45" />
          <stop offset="60%" stopColor="#ca2b26" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#0d0a0a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={W} height={H} fill="#0d0a0a" />
      <rect width={W} height={H} fill={`url(#${gradId})`} />
      <Variant h={h} />
    </svg>
  );
}
