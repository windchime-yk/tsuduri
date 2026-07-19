import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { Utf8TextEncoder } from "./polyfill.ts";

/** ポリフィルと標準のTextEncoderの出力を比較する */
const expectSameBytes = (input: string) => {
  expect(Array.from(new Utf8TextEncoder().encode(input))).toEqual(
    Array.from(new TextEncoder().encode(input)),
  );
};

describe("TextEncoderのポリフィル", () => {
  it("encodingはutf-8を返す", () => {
    expect(new Utf8TextEncoder().encoding).toBe("utf-8");
  });

  it("空文字は空のバイト列になる", () => {
    expect(Array.from(new Utf8TextEncoder().encode(""))).toEqual([]);
    expect(Array.from(new Utf8TextEncoder().encode())).toEqual([]);
  });

  it("1〜4バイトになる文字を標準実装と同じバイト列にする", () => {
    for (
      const input of [
        "abc",
        "AZ09!#",
        "éü",
        "あいうえお",
        "漢字とかな",
        "🎉👨‍👩‍👧‍👦",
        "IME辞書\tTsuduri\n",
      ]
    ) {
      expectSameBytes(input);
    }
  });

  it("対になっていないサロゲートをU+FFFDへ置き換える", () => {
    for (
      const input of [
        "\ud800",
        "\udc00",
        "a\ud800b",
        "\ud83c🎉",
        "\udfff😀",
      ]
    ) {
      expectSameBytes(input);
    }
  });

  it("コードポイントを網羅的に走査しても標準実装と一致する", () => {
    for (let code = 0; code <= 0xffff; code += 7) {
      expectSameBytes(String.fromCharCode(code));
    }
    for (let code = 0x10000; code <= 0x10ffff; code += 1237) {
      expectSameBytes(String.fromCodePoint(code));
    }
  });
});
