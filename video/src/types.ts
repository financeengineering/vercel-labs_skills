// Videonun içeriği bu tiplerle tanımlanır. Yeni bir video için yalnızca
// src/content.ts dosyasındaki sahne listesini doldurmak yeterlidir.

type SceneBase = {
  /** Sahnenin ekranda kalma süresi (saniye). */
  saniye: number;
  /** Üst köşede görünen bölüm etiketi, ör. "01 · Temel". */
  bolum?: string;
  /**
   * Alt yazı. Tek metin verilirse sahne boyunca kalır; dizi verilirse
   * satırlar sahne süresine eşit bölünerek sırayla gösterilir.
   */
  altyazi?: string | string[];
};

export type TitleScene = SceneBase & {
  tip: 'kapak';
  ustBaslik?: string;
  baslik: string;
  altBaslik?: string;
};

export type BulletsScene = SceneBase & {
  tip: 'maddeler';
  baslik: string;
  maddeler: string[];
};

export type StatScene = SceneBase & {
  tip: 'rakam';
  baslik: string;
  deger: number;
  onEk?: string;
  sonEk?: string;
  ondalik?: number;
  aciklama?: string;
};

export type BarChartScene = SceneBase & {
  tip: 'cubukGrafik';
  baslik: string;
  birim?: string;
  veriler: {etiket: string; deger: number; vurgu?: boolean}[];
};

export type TimelineScene = SceneBase & {
  tip: 'zamanCizelgesi';
  baslik: string;
  adimlar: {zaman: string; baslik: string; aciklama?: string}[];
};

export type ProgressScene = SceneBase & {
  tip: 'ilerleme';
  baslik: string;
  kalemler: {etiket: string; yuzde: number}[];
};

export type CompareScene = SceneBase & {
  tip: 'karsilastirma';
  baslik: string;
  sol: {baslik: string; maddeler: string[]};
  sag: {baslik: string; maddeler: string[]};
};

export type QuoteScene = SceneBase & {
  tip: 'vurgu';
  metin: string;
  kaynak?: string;
};

export type EndScene = SceneBase & {
  tip: 'kapanis';
  baslik: string;
  altBaslik?: string;
};

export type Scene =
  | TitleScene
  | BulletsScene
  | StatScene
  | BarChartScene
  | TimelineScene
  | ProgressScene
  | CompareScene
  | QuoteScene
  | EndScene;

export type VideoSpec = {
  /** Sol alt köşede sürekli görünen kısa marka/proje adı. */
  marka?: string;
  /** public/ altındaki logo dosyaları. Verilirse kapak, kapanış ve köşede gösterilir. */
  logo?: {tam: string; ikon: string};
  sahneler: Scene[];
};
