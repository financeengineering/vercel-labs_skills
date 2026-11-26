import React from 'react';
import {AbsoluteFill, continueRender, delayRender} from 'remotion';
import {TransitionSeries, linearTiming, type TransitionPresentation} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';
import {wipe} from '@remotion/transitions/wipe';
import {Background} from './components/Background';
import {Caption} from './components/Caption';
import {ChapterTag, GlobalOverlay} from './components/Chrome';
import {fontsLoaded} from './fonts';
import {BarChartScene} from './scenes/BarChartScene';
import {BulletsScene} from './scenes/BulletsScene';
import {CompareScene} from './scenes/CompareScene';
import {EndScene} from './scenes/EndScene';
import {ProgressScene} from './scenes/ProgressScene';
import {QuoteScene} from './scenes/QuoteScene';
import {StatScene} from './scenes/StatScene';
import {TimelineScene} from './scenes/TimelineScene';
import {TitleScene} from './scenes/TitleScene';
import {theme} from './theme';
import type {Scene, VideoSpec} from './types';

export const FPS = 30;
export const TRANSITION_FRAMES = 15;

export const sceneFrames = (s: Scene) => Math.round(s.saniye * FPS);

/** Geçişler sahneleri üst üste bindirdiği için toplam süreden düşülür. */
export const totalFrames = (spec: VideoSpec) =>
  Math.max(
    1,
    spec.sahneler.reduce((sum, s) => sum + sceneFrames(s), 0) - TRANSITION_FRAMES * Math.max(0, spec.sahneler.length - 1),
  );

const SceneBody: React.FC<{scene: Scene}> = ({scene}) => {
  switch (scene.tip) {
    case 'kapak':
      return <TitleScene scene={scene} />;
    case 'maddeler':
      return <BulletsScene scene={scene} />;
    case 'rakam':
      return <StatScene scene={scene} />;
    case 'cubukGrafik':
      return <BarChartScene scene={scene} />;
    case 'zamanCizelgesi':
      return <TimelineScene scene={scene} />;
    case 'ilerleme':
      return <ProgressScene scene={scene} />;
    case 'karsilastirma':
      return <CompareScene scene={scene} />;
    case 'vurgu':
      return <QuoteScene scene={scene} />;
    case 'kapanis':
      return <EndScene scene={scene} />;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const transitionFor = (i: number): TransitionPresentation<any> => {
  const kind = i % 3;
  if (kind === 0) return fade();
  if (kind === 1) return slide({direction: 'from-right'});
  return wipe({direction: 'from-left'});
};

const waitForFonts = () => {
  const handle = delayRender('Fontlar yükleniyor');
  fontsLoaded.then(() => continueRender(handle));
};

export const InfoVideo: React.FC<{spec: VideoSpec}> = ({spec}) => {
  React.useState(waitForFonts);
  return (
    <AbsoluteFill lang="tr" style={{fontFamily: theme.font, color: theme.colors.text}}>
      <Background />
      <TransitionSeries>
        {spec.sahneler.flatMap((scene, i) => {
          const seq = (
            <TransitionSeries.Sequence key={`s${i}`} name={`${i + 1}. ${scene.tip}`} durationInFrames={sceneFrames(scene)}>
              <AbsoluteFill>
                <SceneBody scene={scene} />
                {scene.bolum ? <ChapterTag label={scene.bolum} /> : null}
                {scene.altyazi ? <Caption text={scene.altyazi} /> : null}
              </AbsoluteFill>
            </TransitionSeries.Sequence>
          );
          if (i === 0) return [seq];
          return [
            <TransitionSeries.Transition key={`t${i}`} presentation={transitionFor(i)} timing={linearTiming({durationInFrames: TRANSITION_FRAMES})} />,
            seq,
          ];
        })}
      </TransitionSeries>
      <GlobalOverlay marka={spec.marka} />
    </AbsoluteFill>
  );
};
