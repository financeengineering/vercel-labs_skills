import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Atmosphere, C, fmt, ip, Kicker, signed, Stage} from './kit';

export type WfStep = {label: string; value: number};

const LEFT = 150;
const WIDTH = 1620;
const BASE = 905;
const H = 560;
const MIN = 44;
const MAX = 55.6;
const y = (v: number) => BASE - ((v - MIN) / (MAX - MIN)) * H;

/**
 * Şelale: her kalem bir önceki sütunun tepesinden kopup kendi yerine kayar.
 * Sonunda en büyük iki kalem vurgulanır, diğerleri soluklaşır.
 */
export const WaterfallV2: React.FC<{
  kicker: string;
  startLabel: string;
  endLabel: string;
  start: number;
  steps: WfStep[];
  focus: number[];
  focusText: string;
  runningLabel: string;
}> = ({kicker, startLabel, endLabel, start, steps, focus, focusText, runningLabel}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const n = steps.length + 2;
  const col = WIDTH / n;
  const bw = col * 0.62;
  const cx = (i: number) => LEFT + col * i + (col - bw) / 2;
  const tStep = (i: number) => 36 + i * 22;
  const tEnd = tStep(steps.length) + 6;
  const focusOn = ip(frame, [tEnd + 40, tEnd + 60], [0, 1]);

  const levels: number[] = [start];
  steps.forEach((s) => levels.push(levels[levels.length - 1] + s.value));
  const end = levels[levels.length - 1];

  // Ara toplam sayacı
  let running = start;
  steps.forEach((s, i) => {
    running += s.value * ip(frame, [tStep(i), tStep(i) + 16], [0, 1]);
  });

  const grow = (delay: number) => spring({frame: frame - delay, fps, config: {damping: 14, mass: 0.9}});
  const labelStyle = (i: number, visible: number, dim: number): React.CSSProperties => ({
    position: 'absolute',
    left: LEFT + col * i,
    width: col,
    top: BASE + 18,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 700,
    lineHeight: 1.15,
    color: C.steel,
    opacity: visible * dim,
  });

  const g0 = grow(6);
  const gEnd = grow(tEnd);
  const pulse = 0.5 + 0.5 * Math.sin((frame - tEnd) / 6);

  return (
    <Stage zoom={[1, 1.05]}>
      <Atmosphere intensity={0.7} />
      <Kicker text={kicker} start={0} style={{position: 'absolute', left: LEFT, top: 90}} />
      <div style={{position: 'absolute', right: 140, top: 70, textAlign: 'right'}}>
        <div style={{fontSize: 26, fontWeight: 700, letterSpacing: 4, color: C.muted}}>{runningLabel}</div>
        <div style={{fontSize: 110, fontWeight: 900, color: C.gold, fontVariantNumeric: 'tabular-nums', lineHeight: 1}}>{fmt(running)}</div>
      </div>
      <div style={{position: 'absolute', left: LEFT, width: WIDTH, top: BASE, height: 3, backgroundColor: C.panel}} />

      {/* Başlangıç sütunu */}
      <div style={{position: 'absolute', left: cx(0), width: bw, top: y(start) + (BASE - y(start)) * (1 - g0), height: (BASE - y(start)) * g0, background: `linear-gradient(${C.steel}, #8E8880)`, borderRadius: 8, opacity: 1 - focusOn * 0.6}} />
      <div style={{position: 'absolute', left: LEFT, width: col, top: y(start) - 50, textAlign: 'center', fontSize: 36, fontWeight: 900, opacity: g0}}>{fmt(start)}</div>
      <div style={labelStyle(0, g0, 1)}>{startLabel}</div>

      {steps.map((s, i) => {
        const idx = i + 1;
        const t = tStep(i);
        const from = levels[i];
        const to = levels[i + 1];
        const top = y(Math.max(from, to));
        const h = Math.max(4, Math.abs(y(from) - y(to)));
        const neg = s.value < 0;
        const appear = ip(frame, [t, t + 6], [0, 1]);
        const slide = ip(frame, [t, t + 18], [0, 1]);
        const rise = grow(t);
        const isFocus = focus.includes(idx);
        const dim = 1 - focusOn * (isFocus ? 0 : 0.75);
        const left = neg ? cx(idx - 1) + (cx(idx) - cx(idx - 1)) * slide : cx(idx);
        const dy = neg ? 0 : (1 - rise) * 260;
        const color = neg ? C.red : C.green;
        return (
          <React.Fragment key={i}>
            <div
              style={{
                position: 'absolute',
                left,
                width: bw,
                top: top + dy,
                height: h,
                backgroundColor: color,
                borderRadius: 6,
                opacity: appear * dim,
                boxShadow: isFocus && focusOn > 0 ? `0 0 ${40 * focusOn * pulse}px ${color}` : 'none',
                scale: isFocus ? `${1 + focusOn * 0.06}` : '1',
              }}
            />
            <div style={{position: 'absolute', left: cx(idx - 1) + bw, width: cx(idx) - cx(idx - 1) - bw, top: y(from), borderTop: `2px dashed ${C.muted}`, opacity: appear * 0.6 * dim}} />
            <div
              style={{
                position: 'absolute',
                left: LEFT + col * idx,
                width: col,
                top: neg ? top + h + 10 : top - 46,
                textAlign: 'center',
                fontSize: isFocus ? 34 : 28,
                fontWeight: 900,
                color,
                opacity: ip(frame, [t + 10, t + 20], [0, 1]) * dim,
              }}
            >
              {signed(s.value)}
            </div>
            <div style={labelStyle(idx, appear, dim)}>{s.label}</div>
          </React.Fragment>
        );
      })}

      {/* Bitiş sütunu */}
      <div
        style={{
          position: 'absolute',
          left: cx(n - 1),
          width: bw,
          top: y(end) + (BASE - y(end)) * (1 - gEnd),
          height: (BASE - y(end)) * gEnd,
          background: `linear-gradient(${C.goldLight}, ${C.goldDeep})`,
          borderRadius: 8,
          boxShadow: `0 0 ${30 + 30 * pulse * (frame > tEnd + 15 ? 1 : 0)}px rgba(201,168,106,0.55)`,
          opacity: 1 - focusOn * 0.6,
        }}
      />
      <div style={{position: 'absolute', left: LEFT + col * (n - 1), width: col, top: y(end) - 50, textAlign: 'center', fontSize: 36, fontWeight: 900, opacity: gEnd}}>{fmt(end)}</div>
      <div style={labelStyle(n - 1, gEnd, 1)}>{endLabel}</div>

      <div
        style={{
          position: 'absolute',
          left: LEFT + col * 1.2,
          top: 250,
          fontSize: 52,
          fontWeight: 900,
          color: C.text,
          opacity: focusOn,
          translate: `0px ${(1 - focusOn) * 30}px`,
          padding: '14px 30px',
          borderLeft: `8px solid ${C.gold}`,
          backgroundColor: 'rgba(20,18,19,0.8)',
        }}
      >
        {focusText}
      </div>
    </Stage>
  );
};
