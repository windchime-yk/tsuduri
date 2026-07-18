import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { join } from "@std/path";
import { Uint8ArrayReader, ZipReader } from "@zip-js/zip-js";
import {
  compressFile,
  encodeDictionaryText,
  generateDictionaryFile,
} from "./build.ts";

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

describe("ファイルを圧縮する", () => {
  it("対象ディレクトリ内のファイルをzipにまとめる", async () => {
    const inputDir = await Deno.makeTempDir();
    const archiveDir = await Deno.makeTempDir();
    await generateDictionaryFile(
      "あ\n",
      join(inputDir, "test-googleime.txt"),
      "Google IME",
    );
    const archivePath = join(archiveDir, "archive");
    await compressFile(inputDir, archivePath);

    const zipData = await Deno.readFile(`${archivePath}.zip`);
    const zipReader = new ZipReader(new Uint8ArrayReader(zipData));
    const entries = await zipReader.getEntries();
    expect(entries.map((entry) => entry.filename)).toEqual([
      "test-googleime.txt",
    ]);
    await zipReader.close();
  });
});
