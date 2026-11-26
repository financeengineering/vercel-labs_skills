import React from 'react';
import {Circle} from '@remotion/rough-notation';
import {noise2D} from '@remotion/noise';
import {AbsoluteFill, Img, staticFile, useCurrentFrame} from 'remotion';
import {Atmosphere, C, Counter, ip, Kicker, SplitText, Stage, useSpring} from './kit';

/** Logonun parlayarak geldiği açılış. */
export const LogoIntro: React.FC<{subtitle: string}> = ({subtitle}) => {
  const frame = useCurrentFrame();
  const s = useSpring(4, 14);
  const ring = (delay: number) => ip(frame, [delay, delay + 40], [0, 1]);
  const shine = ip(frame, [34, 70], [-60, 160]);
  const logoH = 520;
  const logoW = (logoH * 685) / 747;
  return (
    <Stage zoom={[1.06, 1]}>
      <Atmosphere intensity={1.2} />
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
        <svg width={1200} height={1200} style={{position: 'absolute'}}>
          {[0, 1, 2].map((i) => {
            const p = ring(8 + i * 8);
            const r = 300 + i * 70;
            const c = 2 * Math.PI * r;
            return (
              <circle
                key={i}
                cx={600}
                cy={600}
                r={r}
                fill="none"
                stroke={C.gold}
                strokeOpacity={0.35 - i * 0.09}
                strokeWidth={2}
                strokeDasharray={c}
                strokeDashoffset={c * (1 - p)}
                style={{rotate: `${-90 + i * 40 + frame * (0.3 + i * 0.1)}deg`, transformOrigin: '600px 600px'}}
              />
            );
          })}
        </svg>
        <div style={{position: 'relative', width: logoW, height: logoH, marginTop: -60, scale: `${0.55 + 0.45 * s}`, opacity: Math.min(1, s * 1.4), filter: `blur(${(1 - Math.min(1, s)) * 18}px)`}}>
          <Img src={staticFile('logo.png')} style={{width: logoW, height: logoH}} />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(105deg, transparent ${shine - 12}%, rgba(255,240,205,0.95) ${shine}%, transparent ${shine + 12}%)`,
              WebkitMaskImage: `url(${staticFile('logo.png')})`,
              WebkitMaskSize: '100% 100%',
              maskImage: `url(${staticFile('logo.png')})`,
              maskSize: '100% 100%',
              mixBlendMode: 'screen',
            }}
          />
        </div>
        <div style={{position: 'absolute', bottom: 150, fontSize: 40, fontWeight: 600, letterSpacing: 8, color: C.steel, textTransform: 'uppercase'}}>
          <SplitText text={subtitle} start={50} stagger={1.1} />
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

/** İki rakamın çarpıştığı ve farkın ortaya çıktığı sahne. */
export const Clash: React.FC<{left: string; right: string; diffLabel: string}> = ({left, right, diffLabel}) => {
  const frame = useCurrentFrame();
  const sl = useSpring(4, 13);
  const sr = useSpring(14, 13);
  const lift = ip(frame, [62, 84], [0, 1]);
  const slam = useSpring(78, 9, 0.6);
  const shake = frame >= 80 && frame < 96 ? (96 - frame) / 16 : 0;
  const sx = noise2D('sx', frame * 0.9, 0) * 22 * shake;
  const sy = noise2D('sy', frame * 0.9, 0) * 22 * shake;
  const big: React.CSSProperties = {fontSize: 230, fontWeight: 900, lineHeight: 1, letterSpacing: -4};
  return (
    <Stage>
      <Atmosphere />
      <AbsoluteFill style={{translate: `${sx}px ${sy}px`}}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 160, translate: `0px ${-lift * 170}px`, scale: `${1 - lift * 0.22}`}}>
          <div style={{textAlign: 'center', translate: `${(1 - sl) * -900}px 0px`, opacity: Math.min(1, sl * 2)}}>
            <div style={{fontSize: 40, fontWeight: 800, letterSpacing: 8, color: C.steel}}>{left}</div>
            <Counter to={54.71} start={4} dur={42} style={{...big, color: C.steel}} />
          </div>
          <div style={{width: 4, height: 300 * ip(frame, [20, 50], [0, 1]), backgroundColor: C.gold, opacity: 0.6}} />
          <div style={{textAlign: 'center', translate: `${(1 - sr) * 900}px 0px`, opacity: Math.min(1, sr * 2)}}>
            <div style={{fontSize: 40, fontWeight: 800, letterSpacing: 8, color: C.gold}}>{right}</div>
            <Counter to={49.57} start={14} dur={42} style={{...big, color: C.gold}} />
          </div>
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 580, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: frame >= 78 ? 1 : 0}}>
          <div style={{scale: `${1 + (1 - slam) * 2.2}`, opacity: Math.min(1, slam * 1.5)}}>
            <Circle progress={ip(frame, [96, 126], [0, 1])} color={C.red} strokeWidth={6} iterations={2} padding={{left: 36, right: 36, top: 20, bottom: 20}}>
              <span style={{fontSize: 210, fontWeight: 900, color: C.red, letterSpacing: -4}}>−5,14</span>
            </Circle>
          </div>
          <div style={{marginTop: 64, fontSize: 44, fontWeight: 700, color: C.text, opacity: ip(frame, [100, 118], [0, 1])}}>{diffLabel}</div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

export {Kicker};
