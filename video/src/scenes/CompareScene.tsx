import React from 'react';
import {useCurrentFrame} from 'remotion';
import {riseIn, slideIn} from '../components/anim';
import {SafeArea, SceneTitle} from '../components/SceneTitle';
import {theme} from '../theme';
import type {CompareScene as T} from '../types';

const Column: React.FC<{title: string; items: string[]; accent: string; start: number}> = ({title, items, accent, start}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{flex: 1, backgroundColor: theme.colors.bgSoft, borderTop: `10px solid ${accent}`, borderRadius: 18, padding: '40px 48px', ...riseIn(frame, start)}}>
      <div style={{fontSize: 52, fontWeight: 900, color: accent, marginBottom: 30}}>{title}</div>
      {items.map((m, i) => (
        <div key={i} style={{display: 'flex', gap: 20, alignItems: 'baseline', fontSize: 40, color: theme.colors.text, lineHeight: 1.3, marginBottom: 22, ...slideIn(frame, start + 14 + i * 10, 30)}}>
          <span style={{color: accent, fontWeight: 900}}>■</span>
          {m}
        </div>
      ))}
    </div>
  );
};

/** İki sütunlu karşılaştırma (ör. önce / sonra, geleneksel / modern). */
export const CompareScene: React.FC<{scene: T}> = ({scene}) => (
  <SafeArea>
    <SceneTitle>{scene.baslik}</SceneTitle>
    <div style={{display: 'flex', gap: 48, flex: 1}}>
      <Column title={scene.sol.baslik} items={scene.sol.maddeler} accent={theme.colors.concrete} start={16} />
      <Column title={scene.sag.baslik} items={scene.sag.maddeler} accent={theme.colors.yellow} start={28} />
    </div>
  </SafeArea>
);
