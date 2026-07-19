/**
 * GASのV8ランタイムに存在しないTextEncoderを補うUTF-8専用の実装。
 * UTF-16 LEへの変換は@tsuduri/core側が独自に行うため、ここではUTF-8だけを扱う
 */
export class Utf8TextEncoder {
  get encoding(): string {
    return "utf-8";
  }

  /**
   * 文字列をUTF-8のバイト列へ変換する
   * @param input 変換対象の文字列
   * @returns UTF-8でエンコードされたバイト列
   */
  encode(input?: string): Uint8Array {
    const str = input === undefined ? "" : String(input);
    const bytes: number[] = [];

    for (let index = 0; index < str.length; index++) {
      let code = str.charCodeAt(index);

      // サロゲートペアは結合し、対になっていないものはU+FFFDへ置き換える(TextEncoderと同じ挙動)
      if (code >= 0xd800 && code <= 0xdbff) {
        const low = str.charCodeAt(index + 1);
        if (low >= 0xdc00 && low <= 0xdfff) {
          code = 0x10000 + ((code - 0xd800) << 10) + (low - 0xdc00);
          index++;
        } else {
          code = 0xfffd;
        }
      } else if (code >= 0xdc00 && code <= 0xdfff) {
        code = 0xfffd;
      }

      if (code < 0x80) {
        bytes.push(code);
      } else if (code < 0x800) {
        bytes.push(0xc0 | (code >> 6), 0x80 | (code & 0x3f));
      } else if (code < 0x10000) {
        bytes.push(
          0xe0 | (code >> 12),
          0x80 | ((code >> 6) & 0x3f),
          0x80 | (code & 0x3f),
        );
      } else {
        bytes.push(
          0xf0 | (code >> 18),
          0x80 | ((code >> 12) & 0x3f),
          0x80 | ((code >> 6) & 0x3f),
          0x80 | (code & 0x3f),
        );
      }
    }

    return new Uint8Array(bytes);
  }
}

// GASにはTextEncoderが存在しないため、未定義の環境でのみ補う
if (typeof TextEncoder === "undefined") {
  (globalThis as unknown as Record<string, unknown>).TextEncoder =
    Utf8TextEncoder;
}
