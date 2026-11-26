import React from 'react';
import {useCurrentFrame} from 'remotion';
import {HazardStripe} from '../components/Background';
import {appear, riseIn} from '../components/anim';
import {Logo} from '../components/Logo';
import {SafeArea} from '../components/SceneTitle';
import {theme} from '../theme';
import type {TitleScene as T} from '../types';

export const TitleScene: React.FC<{scene: T}> = ({scene}) => {
  const frame = useCurrentFrame();
  const p = appear(frame, 0, 30);
  return (
    <>
      <HazardStripe width={`${p * 100}%`} height={26} style={{position: 'absolute', top: 0, left: 0}} />
      <SafeArea center>
        {scene.ustBaslik ? (
          <div style={{fontSize: 36, fontWeight: 700, color: theme.colors.accent, letterSpacing: 6, textTransform: 'uppercase', marginBottom: 28, ...riseIn(frame, 6)}}>
            {scene.ustBaslik}
          </div>
        ) : null}
        <div style={{fontSize: theme.size.hero, fontWeight: 900, lineHeight: 1.02, color: theme.colors.text, maxWidth: 1050, ...riseIn(frame, 12, 60)}}>
          {scene.baslik}
        </div>
        <div style={{marginTop: 40, height: 10, width: 260 * appear(frame, 22, 24), backgroundColor: theme.colors.accent}} />
        {scene.altBaslik ? (
          <div style={{marginTop: 40, fontSize: theme.size.body, color: theme.colors.concrete, maxWidth: 1000, lineHeight: 1.35, ...riseIn(frame, 28)}}>
            {scene.altBaslik}
          </div>
        ) : null}
      </SafeArea>
      <div style={{position: 'absolute', right: theme.safeX, top: 0, bottom: 0, display: 'flex', alignItems: 'center'}}>
        <Logo variant="tam" height={560} start={4} />
      </div>
    </>
  );
};
