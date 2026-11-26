import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {appear, slideIn} from '../components/anim';
import {SafeArea, SceneTitle} from '../components/SceneTitle';
import {theme} from '../theme';
import type {ChangeScene as T} from '../types';

/** "Eski → yeni" satırları ve her satırın tutara etkisi. */
export const ChangeScene: React.FC<{scene: T}> = ({scene}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const start = 22;
  const gap = Math.max(12, Math.min(40, (durationInFrames * 0.5 - start) / scene.satirlar.length));
  return (
    <SafeArea>
      <SceneTitle size={theme.size.h2}>{scene.baslik}</SceneTitle>
      <div style={{display: 'flex', flexDirection: 'column', gap: 22}}>
        {scene.satirlar.map((r, i) => {
          const at = start + i * gap;
          const neg = r.etki?.trim().startsWith('−') || r.etki?.trim().startsWith('-');
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 28,
                backgroundColor: theme.colors.bgSoft,
                borderLeft: `8px solid ${theme.colors.accent}`,
                borderRadius: 14,
                padding: '22px 32px',
                ...slideIn(frame, at),
              }}
            >
              <div style={{width: 430, flexShrink: 0}}>
                <div style={{fontSize: 40, fontWeight: 800, color: theme.colors.text, lineHeight: 1.15}}>{r.etiket}</div>
                {r.not ? <div style={{fontSize: 26, color: theme.colors.muted, marginTop: 6}}>{r.not}</div> : null}
              </div>
              <div style={{flex: 1, display: 'flex', alignItems: 'center', gap: 24, fontSize: 40, fontWeight: 700, fontVariantNumeric: 'tabular-nums'}}>
                <span style={{color: theme.colors.muted}}>{r.eski}</span>
                <span style={{color: theme.colors.accent, fontWeight: 900, opacity: appear(frame, at + 8, 8)}}>→</span>
                <span style={{color: theme.colors.text, opacity: appear(frame, at + 12, 10)}}>{r.yeni}</span>
              </div>
              {r.etki ? (
                <div
                  style={{
                    flexShrink: 0,
                    padding: '10px 22px',
                    borderRadius: 10,
                    backgroundColor: neg ? 'rgba(233,128,110,0.16)' : 'rgba(127,196,138,0.16)',
                    color: neg ? theme.colors.red : theme.colors.green,
                    fontSize: 38,
                    fontWeight: 900,
                    fontVariantNumeric: 'tabular-nums',
                    opacity: appear(frame, at + 18, 10),
                  }}
                >
                  {r.etki}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </SafeArea>
  );
};
