// İnşaat temalı renk paleti ve ölçüler (1920x1080 için).
export const theme = {
  colors: {
    bg: '#14171C', // asfalt
    bgSoft: '#1E232B',
    panel: '#262C36',
    grid: 'rgba(120, 170, 220, 0.08)', // mavi proje (blueprint) ızgarası
    yellow: '#F5B700', // iş güvenliği sarısı
    orange: '#FF7A1A',
    concrete: '#B9BEC6',
    text: '#F4F5F7',
    muted: '#9AA3AF',
    green: '#3DD68C',
    red: '#FF5A5F',
    blue: '#4EA8FF',
  },
  chart: ['#F5B700', '#4EA8FF', '#FF7A1A', '#3DD68C', '#C084FC', '#B9BEC6'],
  font: 'Inter, sans-serif',
  safeX: 140,
  safeY: 110,
  size: {
    hero: 132,
    h1: 96,
    h2: 68,
    body: 48,
    small: 34,
    caption: 40,
  },
} as const;
