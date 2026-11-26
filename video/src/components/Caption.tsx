import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {theme} from '../theme';
import {appear} from './anim';

/**
 * Alt yazı bandı. Dizi verilirse satırlar sahne süresine eşit bölünür.
 * Kelimeler soldan sağa hızla belirir; seslendirme olmadığı için okuma
 * kolaylığı önceliklidir.
 */
export const Caption: React.FC<{text: string | string[]}> = ({text}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const lines = Array.isArray(text) ? text : [text];
  const per = durationInFrames / lines.length;
  const index = Math.min(lines.length - 1, Math.floor(frame / per));
  const local = frame - index * per;
  const words = lines[index].split(' ');
  const boxIn = appear(frame, 6, 14);
  const lineOut = interpolate(local, [per - 8, per], [1, lines.length > 1 && index < lines.length - 1 ? 0 : 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 70,
        display: 'flex',
        justifyContent: 'center',
        opacity: boxIn,
      }}
    >
      <div
        style={{
          maxWidth: 1500,
          padding: '18px 36px',
          borderRadius: 14,
          backgroundColor: 'rgba(10, 12, 15, 0.82)',
          borderLeft: `6px solid ${theme.colors.accent}`,
          color: theme.colors.text,
          fontSize: theme.size.caption,
          fontWeight: 600,
          lineHeight: 1.35,
          textAlign: 'center',
          opacity: lineOut,
        }}
      >
        {words.map((w, i) => (
          <span key={`${index}-${i}`} style={{opacity: appear(local, 4 + i * 1.6, 6)}}>
            {w}{' '}
          </span>
        ))}
      </div>
    </div>
  );
};
