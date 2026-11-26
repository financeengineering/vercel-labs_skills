import {loadFont} from '@remotion/fonts';
import {staticFile} from 'remotion';

// Türkçe karakterleri (ç, ğ, ı, İ, ö, ş, ü) eksiksiz destekleyen Inter fontu
// public/fonts altından yüklenir; render internet bağlantısı gerektirmez.
const weights = [
  ['Regular', '400'],
  ['SemiBold', '600'],
  ['Bold', '700'],
  ['Black', '900'],
] as const;

export const fontsLoaded = Promise.all(
  weights.map(([name, weight]) =>
    loadFont({
      family: 'Inter',
      url: staticFile(`fonts/Inter-${name}.otf`),
      weight,
    }),
  ),
);
