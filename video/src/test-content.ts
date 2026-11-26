import type {VideoSpec} from './types';

// Örnek (uydurma) verilerle tüm sahne tiplerini gösteren test klibi.
// Buradaki rakamlar gerçek değildir; yalnızca şablonu denemek içindir.
export const testVideo: VideoSpec = {
  marka: 'Test Klibi',
  sahneler: [
    {
      tip: 'kapak',
      saniye: 4,
      ustBaslik: 'Örnek proje',
      baslik: 'Bir Binanın Yükselişi',
      altBaslik: 'Temelden çatıya inşaat sürecine kısa bir bakış',
      altyazi: 'Bu bir test klibidir; tüm rakamlar örnektir.',
    },
    {
      tip: 'zamanCizelgesi',
      saniye: 5,
      bolum: '01 · Süreç',
      baslik: 'Proje aşamaları',
      adimlar: [
        {zaman: 'Ay 1–2', baslik: 'Hafriyat', aciklama: 'Zemin etüdü ve kazı'},
        {zaman: 'Ay 3–5', baslik: 'Temel', aciklama: 'Radye temel ve yalıtım'},
        {zaman: 'Ay 6–12', baslik: 'Kaba yapı', aciklama: 'Kolon, kiriş, döşeme'},
        {zaman: 'Ay 13–18', baslik: 'İnce işler', aciklama: 'Cephe, tesisat, iç mekân'},
      ],
      altyazi: ['Her aşama bir öncekinin üzerine kurulur.', 'Toplam süre yaklaşık 18 ay.'],
    },
    {
      tip: 'maddeler',
      saniye: 4.5,
      bolum: '02 · Güvenlik',
      baslik: 'Şantiyede temel kurallar',
      maddeler: ['Baret ve yelek her zaman zorunlu', 'Yüksekte çalışmada emniyet kemeri', 'Günlük iş güvenliği brifingi'],
      altyazi: 'Güvenlik, üretimden önce gelir.',
    },
    {
      tip: 'rakam',
      saniye: 3.5,
      bolum: '03 · Malzeme',
      baslik: 'Kullanılan inşaat demiri',
      deger: 1250,
      sonEk: ' ton',
      aciklama: 'Kaba yapı boyunca sahaya giren toplam miktar',
    },
    {
      tip: 'cubukGrafik',
      saniye: 4.5,
      bolum: '03 · Malzeme',
      baslik: 'Malzeme dağılımı',
      birim: 'ton',
      veriler: [
        {etiket: 'Beton', deger: 9400, vurgu: true},
        {etiket: 'Demir', deger: 1250},
        {etiket: 'Tuğla', deger: 860},
        {etiket: 'Cam', deger: 210},
      ],
      altyazi: 'Ağırlığın büyük kısmını beton oluşturuyor.',
    },
    {
      tip: 'ilerleme',
      saniye: 4,
      bolum: '04 · Durum',
      baslik: 'İş kalemleri ilerlemesi',
      kalemler: [
        {etiket: 'Kaba yapı', yuzde: 100},
        {etiket: 'Cephe', yuzde: 72},
        {etiket: 'Tesisat', yuzde: 45},
      ],
    },
    {
      tip: 'karsilastirma',
      saniye: 4.5,
      bolum: '05 · Yöntem',
      baslik: 'Geleneksel ve modern',
      sol: {baslik: 'Geleneksel', maddeler: ['Yerinde döküm', 'Uzun kür süresi']},
      sag: {baslik: 'Modern', maddeler: ['Prefabrik elemanlar', 'Daha hızlı montaj']},
    },
    {
      tip: 'vurgu',
      saniye: 3.5,
      metin: 'Sağlam bir yapı, sağlam bir planla başlar.',
      kaynak: 'Şantiye şefi',
    },
    {
      tip: 'kapanis',
      saniye: 3,
      baslik: 'Teşekkürler',
      altBaslik: 'Altyapı testi tamamlandı',
    },
  ],
};
