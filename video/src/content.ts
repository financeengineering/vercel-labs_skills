import type {VideoSpec} from './types';

// Asıl videonun içeriği. Bilgiler geldiğinde bu dosya doldurulacak.
// Sahne tipleri ve alanları için src/types.ts ve README.md'ye bakın.
export const video: VideoSpec = {
  marka: 'ESTA Construction',
  logo: {tam: 'logo.png', ikon: 'logo-kalkan.png'},
  sahneler: [
    {
      tip: 'kapak',
      saniye: 5,
      ustBaslik: 'Hazırlanıyor',
      baslik: 'İçerik bekleniyor',
      altBaslik: 'Bu video, bilgiler eklendiğinde oluşturulacak.',
    },
  ],
};
