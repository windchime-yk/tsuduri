import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { join } from "@std/path";
import { encodeDictionaryText, generateDictionaryFile } from "./build.ts";

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

describe("ユーザー辞書ファイルを生成する", () => {
  it("IMEに応じたエンコーディングでファイルに書き出す", async () => {
    const dir = await Deno.makeTempDir();
    const path = join(dir, "test-microsoftime.txt");
    await generateDictionaryFile("あ\n", path, "Microsoft IME");
    const written = await Deno.readFile(path);
    expect(Array.from(written)).toEqual(
      Array.from(encodeDictionaryText("あ\n", "Microsoft IME")),
    );
  });
});
