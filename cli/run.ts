import { parseArgs } from "@std/cli";
import { join } from "@std/path";
import { ensureDir, walk } from "@std/fs";
import { CliError } from "./error.ts";
import {
  compressFile,
  convertJsonToTextData,
  generateDictionaryFile,
  type ImeType,
  isValidFileExtention,
  isValidJson,
  parsedCsvToJson,
  readFile,
} from "@tsuduri/core";

const OUTPUT_BASE_DIR_NAME = "tsuduri_output";
const OUTPUT_ARCHIVE_BASE_NAME = "tsuduri_output_archive";

/**
 * CLIのエントリーポイント。指定ディレクトリ内のCSV/JSONファイルを読み込み、指定IME向けのユーザー辞書ファイルを生成する
 * @param rawArgs CLIに渡されたコマンドライン引数
 * @param cwd 処理の基準となるディレクトリ（省略時はカレントディレクトリ）
 */
export const run = async (
  rawArgs: string[],
  cwd: string = Deno.cwd(),
): Promise<void> => {
  const args = parseArgs(rawArgs, {
    boolean: ["all", "google", "macos", "microsoft", "gboard", "compress"],
    string: ["dir"],
  });

  if (!args.dir) throw new CliError("--dirでディレクトリを指定してください");

  const processedInputPathByPrefix = new Map<string, string>();

  for await (const dirEntry of walk(join(cwd, args.dir))) {
    if (dirEntry.isFile) {
      const isValidFileExtentionResult = isValidFileExtention(dirEntry.name);

      if (!isValidFileExtentionResult.success) {
        throw isValidFileExtentionResult.error;
      }

      const OUTPUT_FILE_PREFIX = dirEntry.name.split(".").at(0)!;
      const processedInputPath = processedInputPathByPrefix.get(
        OUTPUT_FILE_PREFIX,
      );

      if (processedInputPath) {
        throw new CliError(
          `出力先が重複するため処理を中断しました。「${processedInputPath}」と「${dirEntry.path}」はどちらも「${OUTPUT_FILE_PREFIX}」として出力されます。ファイル名が重複しないように変更してください`,
        );
      }

      processedInputPathByPrefix.set(OUTPUT_FILE_PREFIX, dirEntry.path);

      let data: Record<string, string | undefined>[] = [];

      switch (isValidFileExtentionResult.result) {
        case ".csv": {
          data = parsedCsvToJson(await readFile(dirEntry.path));
          break;
        }
        default:
          data = JSON.parse(await readFile(dirEntry.path)).dictionaries;
          break;
      }

      const isValidJsonResult = isValidJson(data);

      if (!isValidJsonResult.success) {
        throw isValidJsonResult.error;
      }

      let imeTypeList: ImeType[] = [];

      if (args.all) {
        imeTypeList = ["Google IME", "macOS IME", "Microsoft IME", "GBoard"];
      } else {
        if (args.google) imeTypeList.push("Google IME");
        if (args.macos) imeTypeList.push("macOS IME");
        if (args.microsoft) imeTypeList.push("Microsoft IME");
        if (args.gboard) imeTypeList.push("GBoard");
        if (imeTypeList.length === 0) {
          throw new CliError("--allや--googleなどでIMEを指定してください");
        }
      }

      const OUTPUT_DIR_NAME = join(
        cwd,
        OUTPUT_BASE_DIR_NAME,
        OUTPUT_FILE_PREFIX,
      );

      await ensureDir(OUTPUT_DIR_NAME);

      for await (const imeType of imeTypeList) {
        await generateDictionaryFile(
          convertJsonToTextData(isValidJsonResult.result, imeType),
          join(
            OUTPUT_DIR_NAME,
            `${OUTPUT_FILE_PREFIX}-${
              imeType.toLowerCase().replace(" ", "")
            }.txt`,
          ),
          imeType,
        );
      }
    }
  }

  if (args.compress) {
    await compressFile(
      join(cwd, OUTPUT_BASE_DIR_NAME),
      join(cwd, OUTPUT_ARCHIVE_BASE_NAME),
    );
  }
};
