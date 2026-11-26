import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {appear, easeOut} from '../components/anim';
import {fmtNum, fmtSigned} from '../components/format';
import {SafeArea, SceneTitle} from '../components/SceneTitle';
import {theme} from '../theme';
import type {WaterfallScene as T} from '../types';

const CHART_H = 420;

/**
 * Şelale grafiği: başlangıç toplamından adım adım artış/azalışlarla bitiş
 * toplamına gidiş. Her adım sırayla düşer, sağ üstte ara toplam sayar.
 */
export const WaterfallScene: React.FC<{scene: T}> = ({scene}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const dec = scene.ondalik ?? 2;
  const unit = scene.birim ? ` ${scene.birim}` : '';

  type Bar = {etiket: string; lo: number; hi: number; delta: number; total: boolean; level: number};
  const bars: Bar[] = [];
  let run = scene.baslangic.deger;
  bars.push({etiket: scene.baslangic.etiket, lo: 0, hi: run, delta: run, total: true, level: run});
  for (const a of scene.adimlar) {
    const next = run + a.deger;
    bars.push({etiket: a.etiket, lo: Math.min(run, next), hi: Math.max(run, next), delta: a.deger, total: false, level: next});
    run = next;
  }
  bars.push({etiket: scene.bitis.etiket, lo: 0, hi: run, delta: run, total: true, level: run});

  const min = scene.eksenAlt ?? 0;
  const max = Math.max(...bars.map((b) => b.hi)) * 1.02;
  const y = (v: number) => (Math.max(v, min) - min) / (max - min) * CHART_H;

  const n = bars.length;
  const start = 22;
  const gap = Math.max(8, (durationInFrames * 0.62 - start) / n);
  const prog = bars.map((_, i) =>
    interpolate(frame, [start + i * gap, start + i * gap + 16], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut}),
  );
  // Ara toplam: o ana kadar düşen adımların toplamı.
  let running = scene.baslangic.deger * prog[0];
  for (let i = 1; i < n - 1; i++) running += bars[i].delta * prog[i];

  return (
    <SafeArea>
      <SceneTitle size={theme.size.h2}>{scene.baslik}</SceneTitle>
      <div style={{position: 'absolute', top: 0, right: 0, textAlign: 'right', opacity: appear(frame, 14)}}>
        <div style={{fontSize: 26, fontWeight: 700, color: theme.colors.muted, letterSpacing: 3, textTransform: 'uppercase'}}>Ara toplam</div>
        <div style={{fontSize: 64, fontWeight: 900, color: theme.colors.accent, fontVariantNumeric: 'tabular-nums'}}>
          {fmtNum(running, dec)}
          <span style={{fontSize: 34, color: theme.colors.text}}>{unit}</span>
        </div>
      </div>
      <div style={{position: 'relative', height: CHART_H, marginTop: 'auto', borderBottom: `3px solid ${theme.colors.panel}`}}>
        {bars.map((b, i) => {
          const colW = 100 / n;
          const p = prog[i];
          const neg = !b.total && b.delta < 0;
          const color = b.total ? (i === 0 ? theme.colors.concrete : theme.colors.accent) : neg ? theme.colors.red : theme.colors.green;
          const top = y(b.hi);
          const bottom = y(b.lo);
          const full = top - bottom;
          // Negatif adımlar üstten aşağı, diğerleri alttan yukarı büyür.
          const h = Math.max(3, full * p);
          const barBottom = neg ? top - h : bottom;
          const labelAbove = !neg;
          return (
            <div key={i} style={{position: 'absolute', left: `${i * colW}%`, width: `${colW}%`, top: 0, bottom: 0, opacity: p > 0 ? 1 : 0}}>
              <div
                style={{
                  position: 'absolute',
                  left: '18%',
                  right: '18%',
                  bottom: barBottom,
                  height: h,
                  backgroundColor: color,
                  borderRadius: 6,
                }}
              />
              {b.total && min > 0 ? (
                <div style={{position: 'absolute', left: '10%', right: '10%', bottom: 18, height: 18, rotate: '-8deg', borderTop: `6px solid ${theme.colors.bg}`, borderBottom: `6px solid ${theme.colors.bg}`}} />
              ) : null}
              {i < n - 1 ? (
                <div
                  style={{
                    position: 'absolute',
                    left: '82%',
                    width: '36%',
                    bottom: y(b.level),
                    borderTop: `2px dashed ${theme.colors.muted}`,
                    opacity: prog[i + 1] > 0 ? 0.7 : 0,
                  }}
                />
              ) : null}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  textAlign: 'center',
                  bottom: labelAbove ? barBottom + h + 10 : barBottom - 46,
                  fontSize: b.total ? 36 : 30,
                  fontWeight: 900,
                  color: b.total ? theme.colors.text : color,
                  fontVariantNumeric: 'tabular-nums',
                  opacity: appear(frame, start + i * gap + 8, 10),
                }}
              >
                {b.total ? fmtNum(b.delta, dec) : fmtSigned(b.delta, dec)}
              </div>
              <div
                style={{
                  position: 'absolute',
                  top: CHART_H + 14,
                  left: 4,
                  right: 4,
                  textAlign: 'center',
                  fontSize: 25,
                  fontWeight: b.total ? 800 : 600,
                  lineHeight: 1.15,
                  color: b.total ? theme.colors.text : theme.colors.concrete,
                }}
              >
                {b.etiket}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{height: 70}} />
    </SafeArea>
  );
};
