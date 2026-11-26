import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {easeOut, riseIn} from '../components/anim';
import {SafeArea, SceneTitle} from '../components/SceneTitle';
import {theme} from '../theme';
import type {TimelineScene as T} from '../types';

/** Yatay zaman çizelgesi; çizgi ilerledikçe aşamalar açılır. */
export const TimelineScene: React.FC<{scene: T}> = ({scene}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const n = scene.adimlar.length;
  const end = Math.max(40, durationInFrames * 0.65);
  const line = interpolate(frame, [18, end], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut});
  return (
    <SafeArea>
      <SceneTitle>{scene.baslik}</SceneTitle>
      <div style={{position: 'relative', flex: 1, marginTop: 30}}>
        <div style={{position: 'absolute', top: 40, left: 0, right: 0, height: 6, backgroundColor: theme.colors.panel}} />
        <div style={{position: 'absolute', top: 40, left: 0, width: `${line * 100}%`, height: 6, backgroundColor: theme.colors.yellow}} />
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          {scene.adimlar.map((a, i) => {
            const pos = n === 1 ? 0.5 : i / (n - 1);
            const at = 18 + pos * (end - 18);
            const reached = line >= pos - 0.001;
            return (
              <div key={i} style={{width: `${100 / n}%`, display: 'flex', flexDirection: 'column', alignItems: i === 0 ? 'flex-start' : i === n - 1 ? 'flex-end' : 'center', textAlign: i === 0 ? 'left' : i === n - 1 ? 'right' : 'center'}}>
                <div style={{width: 46, height: 46, marginTop: 20, borderRadius: 23, border: `6px solid ${reached ? theme.colors.yellow : theme.colors.panel}`, backgroundColor: reached ? theme.colors.yellow : theme.colors.bg}} />
                <div style={{marginTop: 30, ...riseIn(frame, at)}}>
                  <div style={{fontSize: 30, fontWeight: 800, color: theme.colors.yellow, letterSpacing: 2}}>{a.zaman}</div>
                  <div style={{fontSize: 42, fontWeight: 800, color: theme.colors.text, marginTop: 10}}>{a.baslik}</div>
                  {a.aciklama ? <div style={{fontSize: 30, color: theme.colors.muted, marginTop: 10, lineHeight: 1.3, maxWidth: 360}}>{a.aciklama}</div> : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SafeArea>
  );
};
