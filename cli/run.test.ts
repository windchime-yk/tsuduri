import { afterAll, describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { join } from "@std/path";
import { exists } from "@std/fs";
import { configure } from "jsr:@zip-js/zip-js";
import { CliError } from "./error.ts";
import { DataPropertyError, FileTypeError } from "@tsuduri/core";
import { run } from "./run.ts";

configure({ useWebWorkers: false });

const rootDir = join(import.meta.dirname!, "..");
const MOCK_DIR = "core/test/mock";
const OUTPUT_DIR = join(rootDir, "tsuduri_output");
const ARCHIVE_FILE = join(rootDir, "tsuduri_output_archive.zip");

describe("CLI", () => {
  afterAll(async () => {
    await Deno.remove(OUTPUT_DIR, { recursive: true });
    if (await exists(ARCHIVE_FILE)) {
      await Deno.remove(ARCHIVE_FILE);
    }
  });

  it("--dir未指定でエラー終了する", async () => {
    await expect(run([], rootDir)).rejects.toBeInstanceOf(CliError);
  });

  it("IME未指定でエラー終了する", async () => {
    await expect(run(["--dir", MOCK_DIR], rootDir)).rejects.toBeInstanceOf(
      CliError,
    );
  });

  it("サポート外の拡張子のファイルでエラーになる", async () => {
    const tempDir = await Deno.makeTempDir();
    await Deno.writeTextFile(join(tempDir, "test.yml"), "test: data");
    await expect(run(["--dir", "."], tempDir)).rejects.toBeInstanceOf(
      FileTypeError,
    );
    await Deno.remove(tempDir, { recursive: true });
  });

  it("不正なJSONプロパティでエラーになる", async () => {
    const tempDir = await Deno.makeTempDir();
    await Deno.writeTextFile(
      join(tempDir, "test.json"),
      JSON.stringify({ dictionaries: [{ invalid: "property" }] }),
    );
    await expect(run(["--dir", "."], tempDir)).rejects.toBeInstanceOf(
      DataPropertyError,
    );
    await Deno.remove(tempDir, { recursive: true });
  });

  it("--google指定でCSVから辞書ファイルを生成する", async () => {
    await run(["--dir", MOCK_DIR, "--google"], rootDir);
    expect(
      await exists(join(OUTPUT_DIR, "private/private-googleime.txt")),
    ).toBe(true);
    expect(
      await exists(join(OUTPUT_DIR, "public/public-googleime.txt")),
    ).toBe(true);
  });

  it("--macos指定でmacOS IMEの辞書ファイルを生成する", async () => {
    await run(["--dir", MOCK_DIR, "--macos"], rootDir);
    expect(
      await exists(join(OUTPUT_DIR, "private/private-macosime.txt")),
    ).toBe(true);
  });

  it("--microsoft指定でMicrosoft IMEの辞書ファイルを生成する", async () => {
    await run(["--dir", MOCK_DIR, "--microsoft"], rootDir);
    expect(
      await exists(join(OUTPUT_DIR, "private/private-microsoftime.txt")),
    ).toBe(true);
  });

  it("--gboard指定でGBoardの辞書ファイルを生成する", async () => {
    await run(["--dir", MOCK_DIR, "--gboard"], rootDir);
    expect(
      await exists(join(OUTPUT_DIR, "private/private-gboard.txt")),
    ).toBe(true);
  });

  it("--all指定で全IMEの辞書ファイルを生成する", async () => {
    await run(["--dir", MOCK_DIR, "--all"], rootDir);
    for (const prefix of ["private", "public"]) {
      for (const ime of ["googleime", "macosime", "microsoftime", "gboard"]) {
        expect(
          await exists(join(OUTPUT_DIR, `${prefix}/${prefix}-${ime}.txt`)),
        ).toBe(true);
      }
    }
  });

  it("--compress指定でZIPファイルを生成する", async () => {
    await run(["--dir", MOCK_DIR, "--all", "--compress"], rootDir);
    expect(await exists(ARCHIVE_FILE)).toBe(true);
  });
});
