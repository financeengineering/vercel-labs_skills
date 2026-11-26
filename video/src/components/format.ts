/** Türkçe sayı biçimi: 54,71 / 1.250 */
export const fmtNum = (n: number, decimals = 0) =>
  n.toLocaleString('tr-TR', {minimumFractionDigits: decimals, maximumFractionDigits: decimals});

/** İşaretli biçim: +1,06 / −3,23 (gerçek eksi işareti). */
export const fmtSigned = (n: number, decimals = 0) => `${n < 0 ? '−' : '+'}${fmtNum(Math.abs(n), decimals)}`;
