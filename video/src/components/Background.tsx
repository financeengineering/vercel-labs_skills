import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {theme} from '../theme';

/** Asfalt zemin + hafifçe kayan mavi proje ızgarası + köşe ikaz şeridi. */
export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const shift = interpolate(frame, [0, 600], [0, 80]);
  return (
    <AbsoluteFill style={{backgroundColor: theme.colors.bg}}>
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${theme.colors.grid} 1px, transparent 1px), linear-gradient(90deg, ${theme.colors.grid} 1px, transparent 1px), linear-gradient(rgba(120,170,220,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(120,170,220,0.035) 1px, transparent 1px)`,
          backgroundSize: '160px 160px, 160px 160px, 32px 32px, 32px 32px',
          backgroundPosition: `${shift}px ${shift}px`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse at 30% 20%, rgba(245,183,0,0.07), transparent 60%), radial-gradient(ellipse at 80% 90%, rgba(78,168,255,0.06), transparent 55%)',
        }}
      />
    </AbsoluteFill>
  );
};

/** Sarı-siyah ikaz şeridi. */
export const HazardStripe: React.FC<{width: number | string; height: number; style?: React.CSSProperties}> = ({
  width,
  height,
  style,
}) => (
  <div
    style={{
      width,
      height,
      backgroundImage: `repeating-linear-gradient(-45deg, ${theme.colors.yellow} 0 22px, #111 22px 44px)`,
      ...style,
    }}
  />
);
