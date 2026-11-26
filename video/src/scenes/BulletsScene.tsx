import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {slideIn} from '../components/anim';
import {SafeArea, SceneTitle} from '../components/SceneTitle';
import {theme} from '../theme';
import type {BulletsScene as T} from '../types';

/** Maddeler sahne süresine yayılarak tek tek belirir; son eklenen vurgulanır. */
export const BulletsScene: React.FC<{scene: T}> = ({scene}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const start = 20;
  const gap = Math.max(10, Math.min(45, (durationInFrames * 0.55 - start) / scene.maddeler.length));
  return (
    <SafeArea>
      <SceneTitle>{scene.baslik}</SceneTitle>
      <div style={{display: 'flex', flexDirection: 'column', gap: 30}}>
        {scene.maddeler.map((m, i) => {
          const at = start + i * gap;
          const isLatest = frame >= at && (i === scene.maddeler.length - 1 || frame < start + (i + 1) * gap);
          return (
            <div key={i} style={{display: 'flex', alignItems: 'center', gap: 32, ...slideIn(frame, at)}}>
              <div
                style={{
                  flexShrink: 0,
                  width: 64,
                  height: 64,
                  borderRadius: 12,
                  backgroundColor: isLatest ? theme.colors.yellow : theme.colors.panel,
                  color: isLatest ? '#111' : theme.colors.yellow,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 32,
                  fontWeight: 900,
                }}
              >
                {i + 1}
              </div>
              <div style={{fontSize: theme.size.body, fontWeight: 600, color: isLatest ? theme.colors.text : theme.colors.concrete, lineHeight: 1.25}}>
                {m}
              </div>
            </div>
          );
        })}
      </div>
    </SafeArea>
  );
};
