import { assertEquals, assertNotEquals } from "@std/assert";
import { exists } from "@std/fs";

const CLI_PATH = "cli/mod.ts";

async function runCli(
  args: string[],
): Promise<{ code: number; stdout: string; stderr: string }> {
  const cmd = new Deno.Command(Deno.execPath(), {
    args: ["run", "-RWE", CLI_PATH, ...args],
    stdout: "piped",
    stderr: "piped",
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
    const { code } = await runCli(["--dir", "core/test/mock"]);
    assertNotEquals(code, 0);
  });

  await t.step("--google指定でCSVから辞書ファイルを生成する", async () => {
    const { code } = await runCli([
      "--dir",
      "core/test/mock",
      "--google",
    ]);
    assertEquals(code, 0);
    assertEquals(
      await exists("tsuduri_output/private/private-googleime.txt"),
      true,
    );
    assertEquals(
      await exists("tsuduri_output/public/public-googleime.txt"),
      true,
    );
  });

  await t.step("--all指定で全IMEの辞書ファイルを生成する", async () => {
    const { code } = await runCli([
      "--dir",
      "core/test/mock",
      "--all",
    ]);
    assertEquals(code, 0);

    for (const prefix of ["private", "public"]) {
      for (
        const ime of ["googleime", "macosime", "microsoftime", "gboard"]
      ) {
        assertEquals(
          await exists(`tsuduri_output/${prefix}/${prefix}-${ime}.txt`),
          true,
          `${prefix}-${ime}.txt が存在しない`,
        );
      }
    }
  });

  // テストで生成した出力ディレクトリを削除
  await Deno.remove("tsuduri_output", { recursive: true });
});
