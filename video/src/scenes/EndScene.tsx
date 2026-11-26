import React from 'react';
import {useCurrentFrame} from 'remotion';
import {HazardStripe} from '../components/Background';
import {appear, riseIn} from '../components/anim';
import {Logo} from '../components/Logo';
import {SafeArea} from '../components/SceneTitle';
import {theme} from '../theme';
import type {EndScene as T} from '../types';

export const EndScene: React.FC<{scene: T}> = ({scene}) => {
  const frame = useCurrentFrame();
  return (
    <>
      <SafeArea center>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
          <Logo variant="tam" height={340} style={{marginBottom: 40}} />
          <div style={{fontSize: theme.size.h1, fontWeight: 900, color: theme.colors.text, lineHeight: 1.05, ...riseIn(frame, 6, 50)}}>{scene.baslik}</div>
          <div style={{marginTop: 36, height: 10, width: 260 * appear(frame, 18, 24), backgroundColor: theme.colors.accent}} />
          {scene.altBaslik ? <div style={{marginTop: 36, fontSize: theme.size.body, color: theme.colors.concrete, ...riseIn(frame, 26)}}>{scene.altBaslik}</div> : null}
        </div>
      </SafeArea>
      <HazardStripe width={`${appear(frame, 10, 30) * 100}%`} height={26} style={{position: 'absolute', bottom: 8, right: 0}} />
    </>
  );
};
