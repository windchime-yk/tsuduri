import { afterAll, describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { join } from "@std/path";
import { exists } from "@std/fs";
import { CliError } from "./error.ts";
import { run } from "./run.ts";

const rootDir = join(import.meta.dirname!, "..");
const MOCK_DIR = "core/test/mock";
const OUTPUT_DIR = join(rootDir, "tsuduri_output");

describe("CLI", () => {
  afterAll(async () => {
    await Deno.remove(OUTPUT_DIR, { recursive: true });
  });

  it("--dir未指定でエラー終了する", async () => {
    await expect(run([], rootDir)).rejects.toBeInstanceOf(CliError);
  });

  it("IME未指定でエラー終了する", async () => {
    await expect(run(["--dir", MOCK_DIR], rootDir)).rejects.toBeInstanceOf(
      CliError,
    );
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
});
