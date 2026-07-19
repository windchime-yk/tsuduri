import { imeConfig } from "./config.ts";
import type { Encoding, ImeType } from "./model.ts";

/**
 * 文字列を指定エンコーディングのバイト列に変換する
 * @param str 変換対象の文字列
 * @param encoding 変換先エンコーディング
 */
const encodeString = (str: string, encoding: Encoding): Uint8Array => {
  if (encoding === "utf16le") {
    const buf = new Uint8Array(str.length * 2);
    for (let i = 0; i < str.length; i++) {
      const code = str.charCodeAt(i);
      buf[i * 2] = code & 0xff;
      buf[i * 2 + 1] = (code >> 8) & 0xff;
    }
    return buf;
  }
  return new TextEncoder().encode(str);
};

/**
 * ユーザー辞書テキストを対象IMEのエンコーディングに合わせたバイト列に変換する。必要に応じてBOMを付与する
 * @param rawdata 変換対象のユーザー辞書テキスト
 * @param imeType 対象IME
 * @returns 対象IMEのエンコーディングに変換されたバイト列
 */
export const encodeDictionaryText = (
  rawdata: string,
  imeType: ImeType,
): Uint8Array => {
  const { encoding, bom } = imeConfig[imeType];
  const bomString = bom ? `\ufeff${rawdata}` : rawdata;
  return encodeString(bomString, encoding);
};
