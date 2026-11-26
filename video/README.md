# İnşaat bilgilendirme videoları (Remotion)

Seslendirme ve müzik olmadan, ekrandaki metin, alt yazı, metin animasyonları ve
grafiklerle anlatılan sunum tarzı videolar üretir. Çıktı: 1920×1080, 30 fps,
sessiz MP4.

## Kurulum

```bash
cd video
npm install
```

## Komutlar

| Komut                 | Ne yapar                                                    |
| --------------------- | ----------------------------------------------------------- |
| `npm run studio`      | Tarayıcıda canlı önizleme (Remotion Studio)                 |
| `npm run render`      | Asıl videoyu `out/video.mp4` olarak üretir                   |
| `npm run render:test` | Tüm sahne tiplerini gösteren test klibini üretir            |
| `npm run still`       | Test klibinden tek kare PNG alır                            |
| `npm run typecheck`   | İçerik dosyasındaki yazım/alan hatalarını yakalar           |

Remotion ilk render'da kendi Chrome Headless Shell'ini indirir. İnternetsiz
ortamda mevcut bir Chromium'u `--browser-executable=/yol/chrome` ile verin.

## İçerik nasıl eklenir

Yalnızca `src/content.ts` dosyasındaki `sahneler` listesi doldurulur. Her
sahnenin bir `tip`'i ve `saniye` cinsinden süresi vardır. Ortak isteğe bağlı
alanlar:

- `bolum`: sol üstte bölüm etiketi, ör. `"02 · Kaba yapı"`
- `altyazi`: alt yazı bandı. Dizi verilirse satırlar sahne süresine eşit bölünür.

| `tip`            | Kullanım                          | Alanlar                                         |
| ---------------- | --------------------------------- | ----------------------------------------------- |
| `kapak`          | Açılış                            | `ustBaslik`, `baslik`, `altBaslik`              |
| `maddeler`       | Sırayla beliren madde listesi     | `baslik`, `maddeler[]`                          |
| `rakam`          | Sayarak büyüyen tek büyük rakam   | `baslik`, `deger`, `onEk`, `sonEk`, `ondalik`, `aciklama` |
| `cubukGrafik`    | Animasyonlu yatay çubuk grafik    | `baslik`, `birim`, `veriler[{etiket, deger, vurgu}]` |
| `zamanCizelgesi` | Proje aşamaları / takvim          | `baslik`, `adimlar[{zaman, baslik, aciklama}]`  |
| `ilerleme`       | Dairesel yüzde göstergeleri       | `baslik`, `kalemler[{etiket, yuzde}]`           |
| `karsilastirma`  | İki sütun (önce/sonra vb.)        | `baslik`, `sol{baslik, maddeler}`, `sag{...}`   |
| `vurgu`          | Tek önemli mesaj, kelime kelime   | `metin`, `kaynak`                               |
| `kapanis`        | Kapanış                           | `baslik`, `altBaslik`                           |

Örnek kullanım için `src/test-content.ts` dosyasına bakın (oradaki rakamlar
uydurmadır). Sahneler arasında otomatik olarak sırayla solma, kayma ve silme
geçişleri uygulanır; altta tüm video boyunca bir ilerleme çubuğu görünür.

## Görünüm

Renkler ve punto boyları `src/theme.ts` içindedir: ESTA Construction kurumsal
renkleri (altın + siyah), altın tonlu proje ızgarası ve ikaz şeridi. Logo
dosyaları `public/logo.png` (tam logo) ve `public/logo-kalkan.png` (kalkan
ikonu); `content.ts` içindeki `logo` alanı verilirse kapakta, kapanışta ve sağ
üst köşede gösterilir. Font, Türkçe karakterleri
eksiksiz destekleyen Inter'dir ve `public/fonts` altından yüklenir (SIL OFL).

## Remotion skill'i

Bu repo `skills` CLI'ını içerir. Ajanlarla çalışırken Remotion'un resmi
skill'leri şu komutla eklenebilir:

```bash
npx skills add remotion-dev/skills
```

Not: Remotion, 3 kişiden büyük şirketlerde ticari kullanım için lisans
gerektirir (https://remotion.dev/license).
