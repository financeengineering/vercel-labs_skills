import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {appear, easeOut} from '../components/anim';
import {SafeArea, SceneTitle} from '../components/SceneTitle';
import {theme} from '../theme';
import type {BarChartScene as T} from '../types';

/** Yatay çubuk grafik; çubuklar sırayla uzar, değerler sayarak artar. */
export const BarChartScene: React.FC<{scene: T}> = ({scene}) => {
  const frame = useCurrentFrame();
  const max = Math.max(...scene.veriler.map((v) => v.deger));
  const anyHighlight = scene.veriler.some((v) => v.vurgu);
  // Çok kalemli grafiklerde satırlar sıkışır, yazılar küçülür.
  const dense = scene.veriler.length > 5;
  const barH = dense ? 46 : 58;
  const font = dense ? 34 : 40;
  return (
    <SafeArea>
      <SceneTitle>{scene.baslik}</SceneTitle>
      <div style={{display: 'flex', flexDirection: 'column', gap: dense ? 14 : 26, flex: 1, justifyContent: 'center'}}>
        {scene.veriler.map((v, i) => {
          const start = 22 + i * 8;
          const p = interpolate(frame, [start, start + 36], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut});
          const color = anyHighlight ? (v.vurgu ? theme.colors.accent : '#5E5853') : theme.chart[i % theme.chart.length];
          return (
            <div key={i} style={{display: 'flex', alignItems: 'center', gap: 28, opacity: appear(frame, start - 6, 10)}}>
              <div style={{width: dense ? 420 : 340, flexShrink: 0, fontSize: font - 2, fontWeight: 600, color: theme.colors.text, textAlign: 'right'}}>{v.etiket}</div>
              <div style={{flex: 1, display: 'flex', alignItems: 'center', gap: 20}}>
                <div style={{height: barH, width: `${(v.deger / max) * 85 * p}%`, backgroundColor: color, borderRadius: '0 10px 10px 0'}} />
                <div style={{fontSize: font, fontWeight: 800, color: theme.colors.text, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap'}}>
                  {Math.round(v.deger * p).toLocaleString('tr-TR')}
                  {scene.birim ? <span style={{color: theme.colors.muted, fontWeight: 600}}> {scene.birim}</span> : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </SafeArea>
  );
};
