import type {VideoSpec} from './types';

// Kaynak: "Объёмы для ОМ2.xlsx" (sayfalar СВОД, Varyant, Итого исключение)
// ve Varyant 1 ekran görüntüsü. Tutarlar ruble, milyar cinsinden yuvarlanmıştır.
//
// ESTA 54.708.946.978,28 ₽ · İşveren (РГП) 49.569.020.422,87 ₽ · Fark 5.139.926.555,41 ₽
// Varyant 1: kapsam dışı 7.234.542.153,40 ₽, GY payı %22 = 1.591.599.273,75 ₽,
// yeni sözleşme bedeli 49.066.004.098,62 ₽.

export const video: VideoSpec = {
  marka: '',
  logo: {tam: 'logo.png', ikon: 'logo-kalkan.png'},
  sahneler: [
    {
      tip: 'kapak',
      saniye: 5.5,
      ustBaslik: 'Proje 110-SPPC · Sözleşme bedeli',
      baslik: 'İki hesap,\n5,14 milyar ₽ fark',
      altBaslik: 'İşverenin hesabıyla bizim hesabımız arasındaki fark hangi işlerden geliyor?',
    },
    {
      tip: 'ikiRakam',
      saniye: 7,
      bolum: '01 · Tablo',
      baslik: 'Potansiyel sözleşme bedeli',
      sol: {etiket: 'ESTA', deger: 54.71},
      sag: {etiket: 'İŞVEREN (РГП)', deger: 49.57},
      birim: 'milyar ₽',
      farkEtiketi: 'Fark',
      altyazi: 'Aynı proje için iki hesap arasında 5,14 milyar ruble fark var.',
    },
    {
      tip: 'selale',
      saniye: 12,
      bolum: '02 · Fark nereden geliyor?',
      baslik: '54,71 milyardan 49,57 milyara',
      birim: 'milyar ₽',
      eksenAlt: 44,
      baslangic: {etiket: 'ESTA', deger: 54.709},
      adimlar: [
        {etiket: 'Elektrik montaj', deger: -3.233},
        {etiket: 'Teknolojik ekipman', deger: -1.584},
        {etiket: 'Ek işler', deger: -0.5},
        {etiket: 'Refrakter ankrajı', deger: -0.374},
        {etiket: 'Betonarme', deger: -0.343},
        {etiket: 'Proses boruları', deger: -0.153},
        {etiket: 'Diğer küçük kalemler', deger: -0.014},
        {etiket: 'Genel yüklenici payı', deger: 1.061},
      ],
      bitis: {etiket: 'İşveren'},
      altyazi: [
        'İşveren kalemleri toplam 6,24 milyar ruble düşürüyor.',
        'Ama kendi hesabına 1,06 milyarlık genel yüklenici payı ekliyor.',
        'Net fark: 5,14 milyar ruble.',
      ],
    },
    {
      tip: 'cubukGrafik',
      saniye: 7,
      bolum: '03 · En büyük kalem: Elektrik',
      baslik: 'Elektrik montaj metrajı',
      birim: 'm',
      veriler: [
        {etiket: 'ESTA', deger: 3262435},
        {etiket: 'İşveren', deger: 2074068, vurgu: true},
      ],
      altyazi: ['Birim fiyatlar iki tarafta da aynı.', 'Farkın tamamı metrajdan geliyor: %36 daha az, −3,23 milyar ₽.'],
    },
    {
      tip: 'degisim',
      saniye: 7.5,
      bolum: '04 · Teknolojik ekipman',
      baslik: 'Hem tonaj hem fiyat düşüyor',
      satirlar: [
        {etiket: 'Tonaj', eski: '35.431 t', yeni: '29.796 t', etki: '−1,08 milyar ₽'},
        {etiket: 'Ton fiyatı', eski: '191.744 ₽', yeni: '174.843 ₽', etki: '−0,50 milyar ₽'},
      ],
      altyazi: 'Teknolojik ekipmanda toplam fark: −1,58 milyar ₽.',
    },
    {
      tip: 'degisim',
      saniye: 9,
      bolum: '05 · Diğer kalemler',
      baslik: 'Kalan farklar',
      satirlar: [
        {etiket: 'Ek işler', eski: '500 milyon ₽', yeni: '0 ₽', etki: '−0,50 milyar ₽', not: 'Onaylı + müellif kararıyla'},
        {etiket: 'Refrakter ankrajı', eski: '1,71 milyon adet', yeni: '0,86 milyon adet', etki: '−0,37 milyar ₽', not: 'Henüz anlaşılmadı'},
        {etiket: 'Betonarme', eski: '75.542 ₽/m³', yeni: '70.443 ₽/m³', etki: '−0,34 milyar ₽', not: 'İşçilik birim fiyatı'},
        {etiket: 'Proses boruları', eski: '58.094 ₽/m', yeni: '17.108 ₽/m', etki: '−0,15 milyar ₽', not: 'Metraj aynı, işçilik fiyatı'},
      ],
    },
    {
      tip: 'rakam',
      saniye: 6,
      bolum: '06 · Özet',
      baslik: 'Elektrik ve ekipmanın net farktaki payı',
      deger: 94,
      onEk: '%',
      aciklama: '4,82 milyar ₽ · Kalan 14 iş kaleminde iki hesap arasında fark yok.',
    },
    {
      tip: 'selale',
      saniye: 9,
      bolum: '07 · Varyant 1',
      baslik: 'Yeni sözleşme bedeli',
      birim: 'milyar ₽',
      eksenAlt: 40,
      baslangic: {etiket: 'Mevcut sözleşme', deger: 54.709},
      adimlar: [
        {etiket: 'Kapsamdan çıkan iş', deger: -7.234},
        {etiket: 'Genel yüklenici payı (%22)', deger: 1.592},
      ],
      bitis: {etiket: 'Yeni sözleşme'},
      altyazi: [
        'İşveren, taşeronlara verilecek 7,23 milyarlık işi sözleşmeden çıkarıp kendisi alıyor.',
        'Bu işin %22’si, 1,59 milyar ₽, bize genel yüklenici payı olarak ödeniyor.',
      ],
    },
    {
      tip: 'cubukGrafik',
      saniye: 9,
      bolum: '08 · Kapsamdan çıkan iş',
      baslik: '7,23 milyar ₽ nereden oluşuyor?',
      birim: 'milyon ₽',
      veriler: [
        {etiket: 'Gaz kanalları 1 ve 2', deger: 2154, vurgu: true},
        {etiket: '3.2 Elektrik montaj', deger: 1105},
        {etiket: 'Bölüm 3.6.2', deger: 947},
        {etiket: 'Bölüm 3.18', deger: 916},
        {etiket: 'Bölüm 3.7.2', deger: 897},
        {etiket: 'Bölüm 3.7', deger: 627},
        {etiket: 'Refrakter ankrajı', deger: 375},
        {etiket: 'Diğer', deger: 214},
      ],
      altyazi: [
        'En büyük parça gaz kanalları: çıkan işin yaklaşık %30’u.',
        'Diğer: 3.9 aspirasyon, galeriler ve elektrik projeleri.',
      ],
    },
    {
      tip: 'maddeler',
      saniye: 9,
      bolum: '09 · Sonuç',
      baslik: 'Akılda kalması gerekenler',
      maddeler: [
        'İşveren 49,57, ESTA 54,71 milyar ₽: fark 5,14 milyar',
        'Farkın %94’ü elektrik metrajı ve teknolojik ekipmandan',
        'Refrakter ankrajında henüz anlaşma yok',
        'Varyant 1 ile yeni sözleşme bedeli 49,07 milyar ₽',
      ],
    },
    {
      tip: 'kapanis',
      saniye: 4.5,
      baslik: 'Teşekkürler',
      altBaslik: 'Proje 110-SPPC',
    },
  ],
};
