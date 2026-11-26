import React from 'react';
import {Composition} from 'remotion';
import {video} from './content';
import {testVideo} from './test-content';
import {FPS, InfoVideo, totalFrames} from './Video';

export const RemotionRoot: React.FC = () => (
  <>
    {/* Asıl video: içerik src/content.ts dosyasından gelir. */}
    <Composition
      id="InsaatVideo"
      component={InfoVideo}
      durationInFrames={totalFrames(video)}
      fps={FPS}
      width={1920}
      height={1080}
      defaultProps={{spec: video}}
    />
    {/* Altyapıyı doğrulamak için tüm sahne tiplerini gösteren kısa klip. */}
    <Composition
      id="TestKlip"
      component={InfoVideo}
      durationInFrames={totalFrames(testVideo)}
      fps={FPS}
      width={1920}
      height={1080}
      defaultProps={{spec: testVideo}}
    />
  </>
);
