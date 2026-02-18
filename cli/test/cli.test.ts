import { assertEquals, assertNotEquals } from "@std/assert";
import { join } from "@std/path";
import { exists } from "@std/fs";

const rootDir = join(import.meta.dirname!, "..", "..");
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

Deno.test("CLI", async (t) => {
  await t.step("--dir未指定でエラー終了する", async () => {
    const { code } = await runCli([]);
    assertNotEquals(code, 0);
  });

  await t.step("IME未指定でエラー終了する", async () => {
    const { code } = await runCli(["--dir", MOCK_DIR]);
    assertNotEquals(code, 0);
  });

  await t.step("--google指定でCSVから辞書ファイルを生成する", async () => {
    const { code } = await runCli([
      "--dir",
      MOCK_DIR,
      "--google",
    ]);
    assertEquals(code, 0);
    assertEquals(
      await exists(join(OUTPUT_DIR, "private/private-googleime.txt")),
      true,
    );
    assertEquals(
      await exists(join(OUTPUT_DIR, "public/public-googleime.txt")),
      true,
    );
  });

  await t.step("--all指定で全IMEの辞書ファイルを生成する", async () => {
    const { code } = await runCli([
      "--dir",
      MOCK_DIR,
      "--all",
    ]);
    assertEquals(code, 0);

    for (const prefix of ["private", "public"]) {
      for (
        const ime of ["googleime", "macosime", "microsoftime", "gboard"]
      ) {
        assertEquals(
          await exists(join(OUTPUT_DIR, `${prefix}/${prefix}-${ime}.txt`)),
          true,
          `${prefix}-${ime}.txt が存在しない`,
        );
      }
    }
  });

  // テストで生成した出力ディレクトリを削除
  await Deno.remove(OUTPUT_DIR, { recursive: true });
});
