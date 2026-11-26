import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {appear, easeOut, riseIn} from '../components/anim';
import {fmtNum} from '../components/format';
import {SafeArea, SceneTitle} from '../components/SceneTitle';
import {theme} from '../theme';
import type {TwoStatScene as T} from '../types';

const Panel: React.FC<{label: string; value: number; dec: number; unit: string; accent: string; start: number}> = ({label, value, dec, unit, accent, start}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const v = interpolate(frame, [start, start + 1.4 * fps], [0, value], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut});
  return (
    <div style={{flex: 1, backgroundColor: theme.colors.bgSoft, borderTop: `10px solid ${accent}`, borderRadius: 18, padding: '40px 48px', ...riseIn(frame, start - 8)}}>
      <div style={{fontSize: 40, fontWeight: 800, color: accent, letterSpacing: 2}}>{label}</div>
      <div style={{fontSize: 150, fontWeight: 900, color: theme.colors.text, lineHeight: 1.05, marginTop: 16, fontVariantNumeric: 'tabular-nums'}}>
        {fmtNum(v, dec)}
      </div>
      <div style={{fontSize: 40, fontWeight: 600, color: theme.colors.muted}}>{unit}</div>
    </div>
  );
};

/** İki büyük rakamı yan yana sayar ve aradaki farkı gösterir. */
export const TwoStatScene: React.FC<{scene: T}> = ({scene}) => {
  const frame = useCurrentFrame();
  const dec = scene.ondalik ?? 2;
  const diff = scene.sag.deger - scene.sol.deger;
  const pct = (diff / scene.sol.deger) * 100;
  return (
    <SafeArea>
      {scene.baslik ? <SceneTitle size={theme.size.h2}>{scene.baslik}</SceneTitle> : null}
      <div style={{display: 'flex', gap: 48}}>
        <Panel label={scene.sol.etiket} value={scene.sol.deger} dec={dec} unit={scene.birim ?? ''} accent={theme.colors.concrete} start={16} />
        <Panel label={scene.sag.etiket} value={scene.sag.deger} dec={dec} unit={scene.birim ?? ''} accent={theme.colors.accent} start={26} />
      </div>
      <div style={{display: 'flex', justifyContent: 'center', marginTop: 40, ...riseIn(frame, 70)}}>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 20,
            padding: '18px 40px',
            borderRadius: 14,
            backgroundColor: 'rgba(233,128,110,0.14)',
            border: `2px solid ${theme.colors.red}`,
            scale: `${0.95 + 0.05 * appear(frame, 70)}`,
          }}
        >
          <span style={{fontSize: 36, fontWeight: 700, color: theme.colors.text}}>{scene.farkEtiketi ?? 'Fark'}</span>
          <span style={{fontSize: 56, fontWeight: 900, color: theme.colors.red, fontVariantNumeric: 'tabular-nums'}}>
            −{fmtNum(Math.abs(diff), dec)} {scene.birim ?? ''}
          </span>
          <span style={{fontSize: 36, fontWeight: 700, color: theme.colors.muted}}>(%{fmtNum(Math.abs(pct), 1)})</span>
        </div>
      </div>
    </SafeArea>
  );
};
