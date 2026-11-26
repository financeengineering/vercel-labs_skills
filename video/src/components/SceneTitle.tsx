import React from 'react';
import {useCurrentFrame} from 'remotion';
import {theme} from '../theme';
import {appear, riseIn} from './anim';

export const SceneTitle: React.FC<{children: React.ReactNode; size?: number}> = ({children, size = theme.size.h1}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{marginBottom: 56}}>
      <div style={{fontSize: size, fontWeight: 900, lineHeight: 1.05, color: theme.colors.text, ...riseIn(frame, 4)}}>
        {children}
      </div>
      <div
        style={{
          marginTop: 24,
          height: 8,
          width: 180 * appear(frame, 12, 20),
          backgroundColor: theme.colors.yellow,
        }}
      />
    </div>
  );
};

/** Sahne içeriği için güvenli alan. Alt kısım alt yazıya ayrılmıştır. */
export const SafeArea: React.FC<{children: React.ReactNode; center?: boolean}> = ({children, center}) => (
  <div
    style={{
      position: 'absolute',
      top: 150,
      left: theme.safeX,
      right: theme.safeX,
      bottom: 210,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: center ? 'center' : 'flex-start',
      fontFamily: theme.font,
    }}
  >
    {children}
  </div>
);
