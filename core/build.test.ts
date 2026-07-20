import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { join } from "@std/path";
import { Uint8ArrayReader, ZipReader } from "@zip-js/zip-js";
import { compressFile, generateDictionaryFile } from "./build.ts";
import { encodeDictionaryText } from "./encode.ts";

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
