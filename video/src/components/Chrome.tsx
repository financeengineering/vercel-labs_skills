import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {theme} from '../theme';
import {slideIn} from './anim';

/** Sol üstte bölüm etiketi. */
export const ChapterTag: React.FC<{label: string}> = ({label}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: 'absolute',
        top: 56,
        left: theme.safeX,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        color: theme.colors.yellow,
        fontSize: 28,
        fontWeight: 700,
        letterSpacing: 4,
        textTransform: 'uppercase',
        ...slideIn(frame, 2),
      }}
    >
      <div style={{width: 40, height: 6, backgroundColor: theme.colors.yellow}} />
      {label}
    </div>
  );
};

/** Tüm video boyunca altta ilerleme çubuğu + sol altta marka. */
export const GlobalOverlay: React.FC<{marka?: string}> = ({marka}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  return (
    <>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 8, backgroundColor: 'rgba(255,255,255,0.06)'}}>
        <div
          style={{
            width: `${(frame / (durationInFrames - 1)) * 100}%`,
            height: '100%',
            backgroundColor: theme.colors.yellow,
          }}
        />
      </div>
      {marka ? (
        <div
          style={{
            position: 'absolute',
            top: 56,
            right: theme.safeX,
            color: theme.colors.muted,
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: 3,
            textTransform: 'uppercase',
          }}
        >
          {marka}
        </div>
      ) : null}
    </>
  );
};
