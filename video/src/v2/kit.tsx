import React from 'react';
import {noise2D} from '@remotion/noise';
import {AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {theme} from '../theme';

export const C = {
  bg: '#141213',
  gold: '#C9A86A',
  goldDeep: '#856E4B',
  goldLight: '#E8D3A6',
  text: '#F4F1EC',
  muted: '#9C958C',
  red: '#E9806E',
  green: '#86C98F',
  steel: '#C8C2BA',
  panel: '#2A2627',
};

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
export const ease = Easing.bezier(0.16, 1, 0.3, 1);
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);

/** Sınırlandırılmış interpolate kısayolu. */
export const ip = (f: number, input: [number, number], output: [number, number], easing = ease) =>
  interpolate(f, input, output, {...clamp, easing});

/** Yaylı giriş (0 → 1, hafif taşmalı). */
export const useSpring = (delay: number, damping = 12, mass = 0.8) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: frame - delay, fps, config: {damping, mass, stiffness: 120}});
};

export const fmt = (n: number, d = 2) => n.toLocaleString('tr-TR', {minimumFractionDigits: d, maximumFractionDigits: d});
export const signed = (n: number, d = 2) => `${n < 0 ? '−' : '+'}${fmt(Math.abs(n), d)}`;

/** Sayaç: değere doğru yumuşakça sayar. */
export const Counter: React.FC<{from?: number; to: number; start: number; dur?: number; d?: number; style?: React.CSSProperties; prefix?: string; suffix?: React.ReactNode}> = ({
  from = 0,
  to,
  start,
  dur = 40,
  d = 2,
  style,
  prefix = '',
  suffix,
}) => {
  const frame = useCurrentFrame();
  const v = ip(frame, [start, start + dur], [from, to]);
  return (
    <span style={{fontVariantNumeric: 'tabular-nums', ...style}}>
      {prefix}
      {fmt(v, d)}
      {suffix}
    </span>
  );
};

/** Harf harf yükselerek beliren başlık. */
export const SplitText: React.FC<{text: string; start: number; stagger?: number; style?: React.CSSProperties}> = ({text, start, stagger = 1.5, style}) => {
  const frame = useCurrentFrame();
  return (
    <span style={{display: 'inline-block', whiteSpace: 'pre', ...style}}>
      {[...text].map((ch, i) => {
        const p = ip(frame, [start + i * stagger, start + i * stagger + 14], [0, 1]);
        return (
          <span key={i} style={{display: 'inline-block', opacity: p, translate: `0px ${(1 - p) * 40}px`, filter: `blur(${(1 - p) * 8}px)`}}>
            {ch}
          </span>
        );
      })}
    </span>
  );
};

/** Altın toz parçacıkları + gezinen ışık lekeleri (CSS ışık sızması). */
export const Atmosphere: React.FC<{intensity?: number}> = ({intensity = 1}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const particles = React.useMemo(() => new Array(46).fill(0).map((_, i) => i), []);
  const t = frame / 30;
  const blob = (seed: number, size: number, alpha: number) => {
    const x = (noise2D(`bx${seed}`, t * 0.08, 0) * 0.5 + 0.5) * width;
    const y = (noise2D(`by${seed}`, t * 0.08, 0) * 0.5 + 0.5) * height;
    return `radial-gradient(${size}px ${size}px at ${x}px ${y}px, rgba(201,168,106,${alpha * intensity}), transparent 70%)`;
  };
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <AbsoluteFill style={{background: [blob(1, 900, 0.16), blob(2, 700, 0.12), blob(3, 1100, 0.08)].join(','), mixBlendMode: 'screen'}} />
      {particles.map((i) => {
        const x = (noise2D(`px${i}`, t * 0.05, i) * 0.5 + 0.5) * width;
        const y = ((noise2D(`py${i}`, i, 0) * 0.5 + 0.5) * height - t * (12 + (i % 7) * 4) + height * 2) % height;
        const s = 2 + (i % 4);
        const a = (0.25 + 0.35 * (noise2D(`pa${i}`, t * 0.5, 0) * 0.5 + 0.5)) * intensity;
        return <div key={i} style={{position: 'absolute', left: x, top: y, width: s, height: s, borderRadius: s, backgroundColor: C.goldLight, opacity: a, boxShadow: `0 0 ${s * 3}px ${C.gold}`}} />;
      })}
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)'}} />
    </AbsoluteFill>
  );
};

/** Tüm sahneler için zemin. */
export const Stage: React.FC<{children: React.ReactNode; zoom?: [number, number]}> = ({children, zoom = [1, 1.04]}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  return (
    <AbsoluteFill style={{fontFamily: theme.font, color: C.text}}>
      <AbsoluteFill style={{scale: `${interpolate(frame, [0, durationInFrames], zoom)}`}}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Küçük, harf aralıklı bölüm etiketi. */
export const Kicker: React.FC<{text: string; start?: number; style?: React.CSSProperties}> = ({text, start = 0, style}) => {
  const frame = useCurrentFrame();
  const p = ip(frame, [start, start + 18], [0, 1]);
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 18, color: C.gold, fontSize: 30, fontWeight: 700, letterSpacing: 6, textTransform: 'uppercase', opacity: p, ...style}}>
      <div style={{width: 60 * p, height: 4, backgroundColor: C.gold}} />
      {text}
    </div>
  );
};
