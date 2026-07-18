import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { encodeDictionaryText } from "./build.ts";

describe("ユーザー辞書テキストをIMEごとのバイト列に変換する", () => {
  it("Google IMEはBOMなしUTF-8", () => {
    const bytes = encodeDictionaryText("あ", "Google IME");
    expect(Array.from(bytes)).toEqual([0xe3, 0x81, 0x82]);
  });
  it("Microsoft IMEはBOMつきUTF-16 LE", () => {
    const bytes = encodeDictionaryText("あ", "Microsoft IME");
    expect(Array.from(bytes)).toEqual([0xff, 0xfe, 0x42, 0x30]);
  });
});
