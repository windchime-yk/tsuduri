import { afterAll, describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { join } from "@std/path";
import { exists } from "@std/fs";

const rootDir = join(import.meta.dirname!, "..");
const CLI_PATH = join(rootDir, "cli", "mod.ts");
const MOCK_DIR = "core/test/mock";
const OUTPUT_DIR = join(rootDir, "tsuduri_output");

async function runCli(
  args: string[],
): Promise<{ code: number; stdout: string; stderr: string }> {
  const cmd = new Deno.Command(Deno.execPath(), {
    args: ["run", "-RWE", CLI_PATH, ...args],
    stdout: "piped",
    stderr: "piped",
    cwd: rootDir,
  });
  const output = await cmd.output();
  return {
    code: output.code,
    stdout: new TextDecoder().decode(output.stdout),
    stderr: new TextDecoder().decode(output.stderr),
  };
}

describe("CLI", () => {
  afterAll(async () => {
    await Deno.remove(OUTPUT_DIR, { recursive: true });
  });

  it("--dir未指定でエラー終了する", async () => {
    const { code } = await runCli([]);
    expect(code).not.toBe(0);
  });

  it("IME未指定でエラー終了する", async () => {
    const { code } = await runCli(["--dir", MOCK_DIR]);
    expect(code).not.toBe(0);
  });

  it("--google指定でCSVから辞書ファイルを生成する", async () => {
    const { code } = await runCli(["--dir", MOCK_DIR, "--google"]);
    expect(code).toBe(0);
    expect(await exists(join(OUTPUT_DIR, "private/private-googleime.txt")))
      .toBe(true);
    expect(await exists(join(OUTPUT_DIR, "public/public-googleime.txt"))).toBe(
      true,
    );
  });

  it("--all指定で全IMEの辞書ファイルを生成する", async () => {
    const { code } = await runCli(["--dir", MOCK_DIR, "--all"]);
    expect(code).toBe(0);
    for (const prefix of ["private", "public"]) {
      for (const ime of ["googleime", "macosime", "microsoftime", "gboard"]) {
        expect(
          await exists(join(OUTPUT_DIR, `${prefix}/${prefix}-${ime}.txt`)),
        ).toBe(true);
      }
    }
  });
});
