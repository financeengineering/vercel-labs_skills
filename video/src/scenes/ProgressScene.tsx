import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {easeOut, riseIn} from '../components/anim';
import {SafeArea, SceneTitle} from '../components/SceneTitle';
import {theme} from '../theme';
import type {ProgressScene as T} from '../types';

/** Dairesel ilerleme göstergeleri (ör. iş kalemlerinin tamamlanma oranı). */
export const ProgressScene: React.FC<{scene: T}> = ({scene}) => {
  const frame = useCurrentFrame();
  const r = 120;
  const c = 2 * Math.PI * r;
  return (
    <SafeArea>
      <SceneTitle>{scene.baslik}</SceneTitle>
      <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', flex: 1}}>
        {scene.kalemler.map((k, i) => {
          const start = 20 + i * 10;
          const p = interpolate(frame, [start, start + 45], [0, k.yuzde / 100], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut});
          const color = k.yuzde >= 100 ? theme.colors.green : theme.colors.accent;
          return (
            <div key={i} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', ...riseIn(frame, start - 8)}}>
              <div style={{position: 'relative', width: 2 * r + 40, height: 2 * r + 40}}>
                <svg width={2 * r + 40} height={2 * r + 40} style={{rotate: '-90deg'}}>
                  <circle cx={r + 20} cy={r + 20} r={r} stroke={theme.colors.panel} strokeWidth={26} fill="none" />
                  <circle cx={r + 20} cy={r + 20} r={r} stroke={color} strokeWidth={26} fill="none" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - p)} />
                </svg>
                <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 72, fontWeight: 900, color: theme.colors.text, fontVariantNumeric: 'tabular-nums'}}>
                  %{Math.round(p * 100)}
                </div>
              </div>
              <div style={{marginTop: 26, fontSize: 40, fontWeight: 700, color: theme.colors.concrete, textAlign: 'center', maxWidth: 380}}>{k.etiket}</div>
            </div>
          );
        })}
      </div>
    </SafeArea>
  );
};
