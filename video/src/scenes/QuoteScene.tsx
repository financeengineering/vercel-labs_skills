import React from 'react';
import {useCurrentFrame} from 'remotion';
import {appear, riseIn} from '../components/anim';
import {SafeArea} from '../components/SceneTitle';
import {theme} from '../theme';
import type {QuoteScene as T} from '../types';

/** Tek bir önemli mesajı kelime kelime büyük puntoyla gösterir. */
export const QuoteScene: React.FC<{scene: T}> = ({scene}) => {
  const frame = useCurrentFrame();
  const words = scene.metin.split(' ');
  return (
    <SafeArea center>
      <div style={{fontSize: 200, lineHeight: 0.6, color: theme.colors.accent, fontWeight: 900, opacity: appear(frame, 0)}}>“</div>
      <div style={{fontSize: 84, fontWeight: 800, lineHeight: 1.18, color: theme.colors.text, maxWidth: 1550}}>
        {words.map((w, i) => (
          <span key={i} style={{display: 'inline-block', marginRight: '0.25em', ...riseIn(frame, 8 + i * 3, 24)}}>
            {w}
          </span>
        ))}
      </div>
      {scene.kaynak ? (
        <div style={{marginTop: 40, fontSize: 38, color: theme.colors.muted, fontWeight: 600, ...riseIn(frame, 12 + words.length * 3)}}>— {scene.kaynak}</div>
      ) : null}
    </SafeArea>
  );
};
