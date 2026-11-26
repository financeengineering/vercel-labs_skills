import {Easing, interpolate} from 'remotion';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);

/** 0 → 1 arası, gecikmeli ve yumuşak giriş. */
export const appear = (frame: number, start: number, duration = 18) =>
  interpolate(frame, [start, start + duration], [0, 1], {...clamp, easing: easeOut});

/** Aşağıdan kayarak beliren öğe stili. */
export const riseIn = (frame: number, start: number, distance = 40) => {
  const p = appear(frame, start);
  return {opacity: p, translate: `0px ${(1 - p) * distance}px`};
};

/** Soldan kayarak beliren öğe stili. */
export const slideIn = (frame: number, start: number, distance = 60) => {
  const p = appear(frame, start);
  return {opacity: p, translate: `${(p - 1) * distance}px 0px`};
};
