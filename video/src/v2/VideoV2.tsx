import React from 'react';
import {AbsoluteFill, continueRender, delayRender, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {TransitionSeries} from '@remotion/transitions';
import {fontsLoaded} from '../fonts';
import {C} from './kit';
import {Clash, LogoIntro} from './scenes1';
import {Cable, Donut, Equipment, Outro, Variant} from './scenes2';
import {WaterfallV2} from './WaterfallV2';

/** Sahne geçişlerinde ekranı çapraz kesen altın ışık bandı. */
const Sweep: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames, width} = useVideoConfig();
  const x = interpolate(frame, [0, durationInFrames], [-width * 0.9, width * 1.3]);
  return (
    <AbsoluteFill style={{pointerEvents: 'none', overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          top: -400,
          bottom: -400,
          left: x,
          width: width * 0.75,
          rotate: '18deg',
          background: `linear-gradient(90deg, transparent, rgba(201,168,106,0.0) 10%, ${C.bg} 35%, ${C.bg} 65%, rgba(201,168,106,0.0) 90%, transparent)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: -400,
          bottom: -400,
          left: x + width * 0.75 * 0.66,
          width: 18,
          rotate: '18deg',
          backgroundColor: C.gold,
          boxShadow: `0 0 60px 20px rgba(201,168,106,0.6)`,
        }}
      />
    </AbsoluteFill>
  );
};

export const SCENES = {
  logo: 110,
  clash: 150,
  waterfall: 330,
  cable: 200,
  equipment: 240,
  donut: 150,
  variant: 260,
  outro: 120,
};
export const totalV2 = Object.values(SCENES).reduce((a, b) => a + b, 0);

const T = {
  subtitle: '110-SPPC · Sözleşme bedeli',
  clash: {left: 'ESTA', right: 'İŞVEREN', diff: 'milyar ₽ fark'},
  wf: {
    kicker: 'Fark nereden geliyor?',
    start: 'ESTA',
    end: 'İşveren',
    running: 'ARA TOPLAM · MİLYAR ₽',
    focus: 'Farkın %94’ü bu iki kalemde',
    steps: [
      {label: 'Elektrik', value: -3.233},
      {label: 'Ekipman', value: -1.584},
      {label: 'Ek işler', value: -0.5},
      {label: 'Ankraj', value: -0.374},
      {label: 'Betonarme', value: -0.343},
      {label: 'Borular', value: -0.153},
      {label: 'Diğer', value: -0.014},
      {label: 'GY payı', value: 1.061},
    ],
  },
  cable: {kicker: 'Elektrik montaj', esta: 'ESTA', client: 'İŞVEREN', unit: 'milyon m', missing: '−%36', total: '−3,23 milyar ₽', note: 'Birim fiyatlar aynı, fark yalnızca metrajda'},
  equipment: {kicker: 'Teknolojik ekipman', tons: 'TONAJ', price: 'TON FİYATI', volEffect: '−1,08 milyar ₽', priceEffect: '−0,50 milyar ₽', total: '−1,58 milyar ₽'},
  donut: {
    kicker: 'Net farkın dağılımı',
    center: 'elektrik + ekipman',
    items: [
      {label: 'Elektrik', pct: 63, color: C.gold},
      {label: 'Ekipman', pct: 31, color: C.goldLight},
      {label: 'Diğer (net)', pct: 6, color: '#6E6A66'},
    ],
  },
  variant: {
    kicker: 'Varyant 1',
    current: 'MEVCUT SÖZLEŞME · MİLYAR ₽',
    excluded: 'kapsam dışı',
    gc: '%22 GY payı',
    newPrice: 'Yeni sözleşme bedeli',
    unit: 'milyar ₽',
    pieces: [
      {label: 'Gaz kanalları', value: 2.154},
      {label: '3.2 Elektrik', value: 1.105},
      {label: '3.6.2', value: 0.947},
      {label: '3.18', value: 0.916},
      {label: '3.7.2', value: 0.897},
      {label: '3.7', value: 0.627},
      {label: 'Ankraj', value: 0.375},
      {label: 'Diğer', value: 0.214},
    ],
  },
  outro: 'TEŞEKKÜRLER',
};

const waitForFonts = () => {
  const handle = delayRender('Fontlar yükleniyor');
  fontsLoaded.then(() => continueRender(handle));
};

export const VideoV2: React.FC = () => {
  React.useState(waitForFonts);
  const seq = (key: keyof typeof SCENES, node: React.ReactNode) => (
    <TransitionSeries.Sequence key={key} name={key} durationInFrames={SCENES[key]}>
      {node}
    </TransitionSeries.Sequence>
  );
  const sweep = (k: string) => (
    <TransitionSeries.Overlay key={`o-${k}`} durationInFrames={24}>
      <Sweep />
    </TransitionSeries.Overlay>
  );
  return (
    <AbsoluteFill lang="tr" style={{backgroundColor: C.bg}}>
      <TransitionSeries>
        {seq('logo', <LogoIntro subtitle={T.subtitle} />)}
        {sweep('1')}
        {seq('clash', <Clash left={T.clash.left} right={T.clash.right} diffLabel={T.clash.diff} />)}
        {sweep('2')}
        {seq(
          'waterfall',
          <WaterfallV2 kicker={T.wf.kicker} startLabel={T.wf.start} endLabel={T.wf.end} start={54.709} steps={T.wf.steps} focus={[1, 2]} focusText={T.wf.focus} runningLabel={T.wf.running} />,
        )}
        {sweep('3')}
        {seq('cable', <Cable t={T.cable} />)}
        {sweep('4')}
        {seq('equipment', <Equipment t={T.equipment} />)}
        {sweep('5')}
        {seq('donut', <Donut t={T.donut} />)}
        {sweep('6')}
        {seq('variant', <Variant t={T.variant} />)}
        {sweep('7')}
        {seq('outro', <Outro text={T.outro} />)}
      </TransitionSeries>
    </AbsoluteFill>
  );
};
