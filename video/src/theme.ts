// ESTA Construction kurumsal renkleri (altın + siyah) ve ölçüler (1920x1080 için).
export const theme = {
  colors: {
    bg: '#151314', // logo siyahı tonunda zemin
    bgSoft: '#1F1C1D',
    panel: '#2C2829',
    grid: 'rgba(201, 168, 106, 0.07)', // altın tonlu proje ızgarası
    accent: '#C9A86A', // okunabilir açık altın (metin ve vurgular)
    brand: '#856E4B', // logodaki kurumsal altın
    orange: '#FF7A1A',
    concrete: '#C8C2BA',
    text: '#F4F5F7',
    muted: '#9C958C',
    green: '#3DD68C',
    red: '#FF5A5F',
    blue: '#4EA8FF',
  },
  chart: ['#C9A86A', '#E8DCC4', '#856E4B', '#8FA3B0', '#B07A4F', '#6E6A66'],
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
