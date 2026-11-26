import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {easeOut, riseIn} from '../components/anim';
import {SafeArea} from '../components/SceneTitle';
import {theme} from '../theme';
import type {StatScene as T} from '../types';

const fmt = (n: number, decimals: number) =>
  n.toLocaleString('tr-TR', {minimumFractionDigits: decimals, maximumFractionDigits: decimals});

/** Büyük rakam sayacı. */
export const StatScene: React.FC<{scene: T}> = ({scene}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const value = interpolate(frame, [10, 10 + 1.6 * fps], [0, scene.deger], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOut,
  });
  return (
    <SafeArea center>
      <div style={{fontSize: theme.size.h2, fontWeight: 700, color: theme.colors.concrete, ...riseIn(frame, 2)}}>{scene.baslik}</div>
      <div
        style={{
          fontSize: 260,
          fontWeight: 900,
          lineHeight: 1,
          color: theme.colors.yellow,
          marginTop: 20,
          fontVariantNumeric: 'tabular-nums',
          ...riseIn(frame, 8, 30),
        }}
      >
        {scene.onEk ?? ''}
        {fmt(value, scene.ondalik ?? 0)}
        <span style={{fontSize: 120, color: theme.colors.text}}>{scene.sonEk ?? ''}</span>
      </div>
      {scene.aciklama ? (
        <div style={{marginTop: 30, fontSize: theme.size.body, color: theme.colors.text, maxWidth: 1300, lineHeight: 1.3, ...riseIn(frame, 40)}}>
          {scene.aciklama}
        </div>
      ) : null}
    </SafeArea>
  );
};
