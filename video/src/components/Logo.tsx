import React from 'react';
import {Img, staticFile, useCurrentFrame} from 'remotion';
import type {VideoSpec} from '../types';
import {appear} from './anim';

export const LogoContext = React.createContext<VideoSpec['logo']>(undefined);

/** Kurumsal logo; hafif büyüyerek ve belirerek girer. */
export const Logo: React.FC<{variant: 'tam' | 'ikon'; height: number; start?: number; style?: React.CSSProperties}> = ({
  variant,
  height,
  start = 0,
  style,
}) => {
  const logo = React.useContext(LogoContext);
  const frame = useCurrentFrame();
  if (!logo) return null;
  const p = appear(frame, start, 24);
  return (
    <Img
      src={staticFile(logo[variant])}
      style={{height, width: 'auto', opacity: p, scale: `${0.92 + 0.08 * p}`, ...style}}
    />
  );
};
