import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {theme} from '../theme';

/** Koyu zemin + hafifçe kayan altın tonlu proje ızgarası. */
export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const shift = interpolate(frame, [0, 600], [0, 80]);
  return (
    <AbsoluteFill style={{backgroundColor: theme.colors.bg}}>
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${theme.colors.grid} 1px, transparent 1px), linear-gradient(90deg, ${theme.colors.grid} 1px, transparent 1px), linear-gradient(rgba(201,168,106,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,106,0.03) 1px, transparent 1px)`,
          backgroundSize: '160px 160px, 160px 160px, 32px 32px, 32px 32px',
          backgroundPosition: `${shift}px ${shift}px`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse at 30% 20%, rgba(201,168,106,0.10), transparent 60%), radial-gradient(ellipse at 80% 90%, rgba(133,110,75,0.10), transparent 55%)',
        }}
      />
    </AbsoluteFill>
  );
};

/** Altın-siyah ikaz şeridi. */
export const HazardStripe: React.FC<{width: number | string; height: number; style?: React.CSSProperties}> = ({
  width,
  height,
  style,
}) => (
  <div
    style={{
      width,
      height,
      backgroundImage: `repeating-linear-gradient(-45deg, ${theme.colors.accent} 0 22px, #111 22px 44px)`,
      ...style,
    }}
  />
);
