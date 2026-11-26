import React from 'react';
import {evolvePath, getLength} from '@remotion/paths';
import {Highlight} from '@remotion/rough-notation';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Atmosphere, C, Counter, fmt, ip, Kicker, signed, SplitText, Stage, useSpring} from './kit';

const Chip: React.FC<{text: string; delay: number; color?: string; size?: number; style?: React.CSSProperties}> = ({text, delay, color = C.red, size = 56, style}) => {
  const s = useSpring(delay, 10, 0.6);
  return (
    <div
      style={{
        display: 'inline-block',
        padding: '14px 34px',
        borderRadius: 16,
        border: `3px solid ${color}`,
        backgroundColor: `${color}22`,
        color,
        fontSize: size,
        fontWeight: 900,
        fontVariantNumeric: 'tabular-nums',
        scale: `${0.4 + 0.6 * s}`,
        opacity: Math.min(1, s * 2),
        ...style,
      }}
    >
      {text}
    </div>
  );
};

const wave = (w: number, amp: number, waves: number) => {
  const pts: string[] = [];
  const steps = 160;
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * w;
    const yv = Math.sin((i / steps) * Math.PI * 2 * waves) * amp;
    pts.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${yv.toFixed(1)}`);
  }
  return pts.join(' ');
};

/** Elektrik: iki kablo çizilir, işverenin kablosu %64'te durur, eksik kısım kırmızı yanar. */
export const Cable: React.FC<{t: {kicker: string; esta: string; client: string; unit: string; missing: string; total: string; note: string}}> = ({t}) => {
  const frame = useCurrentFrame();
  const W = 1300;
  const path = wave(W, 26, 4.5);
  const ratio = 2074068 / 3262435;
  const p1 = ip(frame, [12, 70], [0, 1]);
  const p2 = ip(frame, [30, 88], [0, ratio]);
  const e1 = evolvePath(p1, path);
  const e2 = evolvePath(p2, path);
  const missingOn = ip(frame, [96, 120], [0, 1]);
  const blink = frame > 96 ? 0.55 + 0.45 * Math.sin(frame / 4) : 0;
  const row = (label: string, color: string, e: {strokeDasharray: string; strokeDashoffset: number}, top: number, value: React.ReactNode, extra?: React.ReactNode) => (
    <div style={{position: 'absolute', left: 140, top, width: 1640}}>
      <div style={{fontSize: 36, fontWeight: 800, letterSpacing: 4, color}}>{label}</div>
      <div style={{display: 'flex', alignItems: 'center', gap: 40, marginTop: 10}}>
        <svg width={W} height={90} viewBox={`0 -45 ${W} 90`} style={{overflow: 'visible'}}>
          <path d={path} fill="none" stroke={C.panel} strokeWidth={14} strokeLinecap="round" />
          {extra}
          <path d={path} fill="none" stroke={color} strokeWidth={14} strokeLinecap="round" strokeDasharray={e.strokeDasharray} strokeDashoffset={e.strokeDashoffset} style={{filter: `drop-shadow(0 0 10px ${color})`}} />
        </svg>
        <div style={{fontSize: 64, fontWeight: 900, color, whiteSpace: 'nowrap'}}>{value}</div>
      </div>
    </div>
  );
  const len = getLength(path);
  return (
    <Stage>
      <Atmosphere intensity={0.6} />
      <Kicker text={t.kicker} style={{position: 'absolute', left: 140, top: 90}} />
      {row(t.esta, C.steel, e1, 230, <Counter to={3.26} start={12} dur={58} suffix={<span style={{fontSize: 34, color: C.muted}}> {t.unit}</span>} />)}
      {row(
        t.client,
        C.gold,
        e2,
        450,
        <Counter to={2.07} start={30} dur={58} suffix={<span style={{fontSize: 34, color: C.muted}}> {t.unit}</span>} />,
        <path
          d={path}
          fill="none"
          stroke={C.red}
          strokeWidth={14}
          strokeLinecap="round"
          strokeDasharray={`0 ${len * ratio} ${len * (1 - ratio)} ${len}`}
          opacity={missingOn * blink}
          style={{filter: `drop-shadow(0 0 12px ${C.red})`}}
        />,
      )}
      <div style={{position: 'absolute', left: 140 + W * ratio + W * (1 - ratio) * 0.5 - 90, top: 610, fontSize: 64, fontWeight: 900, color: C.red, opacity: missingOn}}>{t.missing}</div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 760, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26}}>
        <Chip text={t.total} delay={120} size={72} />
        <div style={{fontSize: 38, fontWeight: 600, color: C.text, opacity: ip(frame, [140, 156], [0, 1])}}>
          <Highlight progress={ip(frame, [146, 170], [0, 1])} color="rgba(201,168,106,0.35)">
            {t.note}
          </Highlight>
        </div>
      </div>
    </Stage>
  );
};

/** Teknolojik ekipman: 35 blok dizilir, 6'sı kırmızıya döner ve düşer; sonra ton fiyatı iner. */
export const Equipment: React.FC<{t: {kicker: string; tons: string; price: string; volEffect: string; priceEffect: string; total: string}}> = ({t}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const cols = 7;
  const rows = 5;
  const size = 78;
  const gap = 12;
  const falling = [34, 33, 27, 26, 20, 19];
  const tonFrom = 35431;
  const tonTo = 29796;
  const tons = ip(frame, [80, 112], [tonFrom, tonTo]);
  const price = ip(frame, [140, 172], [191744, 174843]);
  const priceIn = spring({frame: frame - 122, fps, config: {damping: 13}});
  return (
    <Stage>
      <Atmosphere intensity={0.6} />
      <Kicker text={t.kicker} style={{position: 'absolute', left: 140, top: 90}} />
      <div style={{position: 'absolute', left: 140, top: 190}}>
        <div style={{fontSize: 34, fontWeight: 700, color: C.muted, letterSpacing: 3}}>{t.tons}</div>
        <div style={{fontSize: 110, fontWeight: 900, color: C.text, fontVariantNumeric: 'tabular-nums', lineHeight: 1.05}}>
          {Math.round(tons).toLocaleString('tr-TR')}
          <span style={{fontSize: 50, color: C.muted}}> t</span>
        </div>
      </div>
      <div style={{position: 'absolute', left: 140, top: 380, width: cols * (size + gap), height: rows * (size + gap)}}>
        {new Array(cols * rows).fill(0).map((_, i) => {
          const c = i % cols;
          const r = rows - 1 - Math.floor(i / cols);
          const pop = spring({frame: frame - (4 + i * 1.2), fps, config: {damping: 11, mass: 0.6}});
          const fi = falling.indexOf(i);
          const isFalling = fi >= 0;
          const red = isFalling ? ip(frame, [66, 74], [0, 1]) : 0;
          const ft = Math.max(0, frame - (80 + fi * 3));
          const fallY = isFalling ? 0.9 * ft * ft : 0;
          const rot = isFalling ? ft * (fi % 2 ? 3 : -3) : 0;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: c * (size + gap),
                top: r * (size + gap) + fallY,
                width: size,
                height: size,
                borderRadius: 10,
                background: red > 0.5 ? `linear-gradient(135deg, ${C.red}, #A9503F)` : `linear-gradient(135deg, ${C.goldLight}, ${C.goldDeep})`,
                boxShadow: 'inset 0 -8px 0 rgba(0,0,0,0.25)',
                scale: `${pop}`,
                rotate: `${rot}deg`,
                opacity: isFalling ? ip(frame, [100 + fi * 3, 120 + fi * 3], [1, 0]) : 1,
              }}
            />
          );
        })}
      </div>
      <div style={{position: 'absolute', left: 140, top: 860}}>
        <Chip text={t.volEffect} delay={104} size={48} />
      </div>

      <div style={{position: 'absolute', left: 1020, top: 330, width: 760, scale: `${0.6 + 0.4 * priceIn}`, opacity: Math.min(1, priceIn * 2), rotate: `${(1 - priceIn) * -8}deg`}}>
        <div style={{backgroundColor: '#1F1C1D', border: `3px solid ${C.gold}`, borderRadius: 24, padding: '40px 50px'}}>
          <div style={{fontSize: 34, fontWeight: 700, color: C.muted, letterSpacing: 3}}>{t.price}</div>
          <div style={{fontSize: 108, fontWeight: 900, color: C.gold, fontVariantNumeric: 'tabular-nums', lineHeight: 1.1}}>
            {Math.round(price).toLocaleString('tr-TR')} <span style={{fontSize: 56}}>₽</span>
          </div>
          <div style={{marginTop: 20}}>
            <Chip text={t.priceEffect} delay={168} size={44} />
          </div>
        </div>
        <div style={{marginTop: 50, textAlign: 'center'}}>
          <Chip text={t.total} delay={190} size={72} />
        </div>
      </div>
    </Stage>
  );
};

/** Halka grafik: net farkın dağılımı, ortada %94 sayacı. */
export const Donut: React.FC<{t: {kicker: string; center: string; items: {label: string; pct: number; color: string}[]}}> = ({t}) => {
  const frame = useCurrentFrame();
  const r = 270;
  const sw = 80;
  const c = 2 * Math.PI * r;
  let acc = 0;
  const focus = t.items[0].pct + t.items[1].pct;
  return (
    <Stage>
      <Atmosphere intensity={0.8} />
      <Kicker text={t.kicker} style={{position: 'absolute', left: 140, top: 90}} />
      <svg width={760} height={760} style={{position: 'absolute', left: 170, top: 190, rotate: '-90deg'}}>
        <circle cx={380} cy={380} r={r} fill="none" stroke={C.panel} strokeWidth={sw} />
        {t.items.map((it, i) => {
          const start = 14 + i * 22;
          const p = ip(frame, [start, start + 30], [0, 1]);
          const len = (it.pct / 100) * c * p;
          const off = -acc;
          acc += (it.pct / 100) * c;
          return (
            <circle
              key={i}
              cx={380}
              cy={380}
              r={r}
              fill="none"
              stroke={it.color}
              strokeWidth={sw + (i < 2 ? ip(frame, [100, 115], [0, 18]) : 0)}
              strokeDasharray={`${len} ${c}`}
              strokeDashoffset={off}
            />
          );
        })}
      </svg>
      <div style={{position: 'absolute', left: 170, top: 190, width: 760, height: 760, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{fontSize: 170, fontWeight: 900, color: C.gold, lineHeight: 1}}>
          %<Counter to={focus} start={60} dur={40} d={0} />
        </div>
        <div style={{fontSize: 34, fontWeight: 700, color: C.steel, marginTop: 10, textAlign: 'center', maxWidth: 380, opacity: ip(frame, [90, 106], [0, 1])}}>{t.center}</div>
      </div>
      <div style={{position: 'absolute', left: 1040, top: 360, display: 'flex', flexDirection: 'column', gap: 46}}>
        {t.items.map((it, i) => {
          const s = ip(frame, [20 + i * 22, 38 + i * 22], [0, 1]);
          return (
            <div key={i} style={{display: 'flex', alignItems: 'center', gap: 28, opacity: s, translate: `${(1 - s) * 60}px 0px`}}>
              <div style={{width: 40, height: 40, borderRadius: 10, backgroundColor: it.color}} />
              <div style={{fontSize: 46, fontWeight: 800, color: C.text, width: 420}}>{it.label}</div>
              <div style={{fontSize: 56, fontWeight: 900, color: it.color}}>%{fmt(it.pct, 0)}</div>
            </div>
          );
        })}
      </div>
    </Stage>
  );
};

type Piece = {label: string; value: number};

/** Varyant 1: ana bar → kapsam dışı parça kopar ve dağılır → %22 geri gelir → yeni bedel. */
export const Variant: React.FC<{t: {kicker: string; current: string; excluded: string; gc: string; newPrice: string; unit: string; pieces: Piece[]}}> = ({t}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const L = 140;
  const scale = 1640 / 54.709;
  const barTop = 300;
  const barH = 110;
  const grow = spring({frame: frame - 8, fps, config: {damping: 16}});
  const sep = ip(frame, [62, 90], [0, 1]);
  const morph = (i: number) => ip(frame, [96 + i * 5, 124 + i * 5], [0, 1]);
  const gcFly = ip(frame, [172, 200], [0, 1]);
  const mainW = (54.709 - 7.234 * sep + 1.592 * gcFly) * scale * grow;
  const value = 54.709 - 7.234 * sep + 1.592 * gcFly;
  const chunkX = L + (54.709 - 7.234) * scale;
  const chunkW = 7.234 * scale;
  const rowsTop = 560;
  const rowH = 44;
  const rowGap = 10;
  const maxV = Math.max(...t.pieces.map((p) => p.value));
  const rowW = (v: number) => (v / maxV) * 900;
  const finalOn = ip(frame, [206, 226], [0, 1]);
  const pulse = frame > 206 ? 0.5 + 0.5 * Math.sin((frame - 206) / 5) : 0;
  const dimRows = ip(frame, [160, 175], [1, 0.35]) * ip(frame, [198, 212], [1, 0]);
  return (
    <Stage zoom={[1, 1.03]}>
      <Atmosphere intensity={0.7} />
      <Kicker text={t.kicker} style={{position: 'absolute', left: L, top: 90}} />
      <div style={{position: 'absolute', left: L, top: barTop - 90, opacity: ip(frame, [196, 206], [1, 0]), fontSize: 30, fontWeight: 700, color: C.muted, letterSpacing: 3}}>{t.current}</div>
      <div style={{position: 'absolute', left: L, top: barTop - 60, fontSize: 0}} />
      <div
        style={{
          position: 'absolute',
          left: L,
          top: barTop,
          height: barH,
          width: mainW,
          borderRadius: 12,
          background: frame < 200 ? `linear-gradient(90deg, #8E8880, ${C.steel})` : `linear-gradient(90deg, ${C.goldDeep}, ${C.goldLight})`,
          boxShadow: frame >= 200 ? `0 0 ${20 + 40 * pulse}px rgba(201,168,106,0.6)` : 'none',
        }}
      />
      <div style={{position: 'absolute', left: L + mainW - 330, top: barTop + 14, width: 310, textAlign: 'right', fontSize: 76, fontWeight: 900, color: '#141213', fontVariantNumeric: 'tabular-nums'}}>{fmt(value)}</div>

      {/* Kopan parça */}
      <div
        style={{
          position: 'absolute',
          left: chunkX,
          top: barTop + sep * 150,
          width: chunkW * grow,
          height: barH,
          borderRadius: 12,
          backgroundColor: C.red,
          opacity: sep > 0 ? ip(frame, [96, 110], [1, 0]) : 0,
          rotate: `${sep * 4}deg`,
        }}
      />
      <div style={{position: 'absolute', left: chunkX - 40, top: barTop + 150 + barH + 14, fontSize: 40, fontWeight: 900, color: C.red, opacity: ip(frame, [80, 92], [0, 1]) * ip(frame, [100, 112], [1, 0])}}>
        −7,23 {t.excluded}
      </div>

      {/* Parçaların dağıldığı satırlar */}
      <div style={{position: 'absolute', left: L, top: rowsTop - 56, fontSize: 32, fontWeight: 800, color: C.red, opacity: ip(frame, [110, 124], [0, 1]) * dimRows}}>
        −7,23 {t.unit} · {t.excluded}
      </div>
      {t.pieces.map((p, i) => {
        const m = morph(i);
        const tx = interpolate(m, [0, 1], [chunkX, L + 330]);
        const ty = interpolate(m, [0, 1], [barTop + 150, rowsTop + i * (rowH + rowGap)]);
        const tw = interpolate(m, [0, 1], [chunkW, rowW(p.value)]);
        const th = interpolate(m, [0, 1], [barH, rowH]);
        return (
          <React.Fragment key={i}>
            <div style={{position: 'absolute', left: tx, top: ty, width: tw, height: th, borderRadius: 8, backgroundColor: i === 0 ? C.red : '#B9665A', opacity: (m > 0 ? 1 : 0) * dimRows}} />
            <div style={{position: 'absolute', left: L, width: 310, top: rowsTop + i * (rowH + rowGap) + 4, textAlign: 'right', fontSize: 28, fontWeight: 700, color: C.steel, opacity: m * dimRows}}>{p.label}</div>
            <div style={{position: 'absolute', left: L + 330 + rowW(p.value) + 16, top: rowsTop + i * (rowH + rowGap) + 2, fontSize: 32, fontWeight: 900, color: C.text, opacity: ip(frame, [110 + i * 5, 124 + i * 5], [0, 1]) * dimRows}}>{fmt(p.value)}</div>
          </React.Fragment>
        );
      })}

      {/* %22 geri dönen pay */}
      <div
        style={{
          position: 'absolute',
          left: interpolate(gcFly, [0, 1], [1300, L + (54.709 - 7.234) * scale]),
          top: interpolate(gcFly, [0, 1], [700, barTop]),
          width: 1.592 * scale,
          height: barH,
          borderRadius: 10,
          backgroundColor: C.green,
          opacity: frame >= 160 && frame < 202 ? ip(frame, [160, 170], [0, 1]) : 0,
          boxShadow: `0 0 30px ${C.green}`,
        }}
      />
      <div style={{position: 'absolute', left: 1180, top: 640, opacity: ip(frame, [158, 170], [0, 1]) * ip(frame, [204, 214], [1, 0])}}>
        <Chip text={`+1,59 · ${t.gc}`} delay={158} color={C.green} size={44} />
      </div>

      <div style={{position: 'absolute', left: 0, right: 0, top: 560, textAlign: 'center', opacity: finalOn, translate: `0px ${(1 - finalOn) * 40}px`}}>
        <div style={{fontSize: 40, fontWeight: 700, letterSpacing: 6, color: C.muted, textTransform: 'uppercase'}}>{t.newPrice}</div>
        <div style={{fontSize: 200, fontWeight: 900, color: C.gold, lineHeight: 1.05}}>
          49,07 <span style={{fontSize: 70, color: C.text}}>{t.unit}</span>
        </div>
      </div>
    </Stage>
  );
};

/** Kapanış: logo + parlama. */
export const Outro: React.FC<{text: string}> = ({text}) => {
  const frame = useCurrentFrame();
  const s = useSpring(4, 14);
  const shine = ip(frame, [24, 60], [-60, 160]);
  const logoH = 440;
  const logoW = (logoH * 685) / 747;
  return (
    <Stage zoom={[1, 1.05]}>
      <Atmosphere intensity={1.3} />
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 40}}>
        <div style={{position: 'relative', width: logoW, height: logoH, scale: `${0.7 + 0.3 * s}`, opacity: Math.min(1, s * 1.5)}}>
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
        <div style={{fontSize: 44, fontWeight: 700, letterSpacing: 10, color: C.steel}}>
          <SplitText text={text} start={30} stagger={2} />
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

export {signed};
