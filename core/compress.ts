import { join } from "@std/path";
import { exists } from "@std/fs";

/**
 * `deno-zip` compress function deep copy (Sorry `deno-zip` author, I'll be using it with modifications to match Deno v2 to move it to JSR.)
 * @see https://github.com/moncefplastin07/deno-zip/blob/main/compress.ts
 */

interface CompressOptions {
  overwrite?: boolean;
  flags: string[];
}

const compressProcess = async (
  files: string | string[],
  archiveName: string = "./archive.zip",
  options?: CompressOptions,
): Promise<boolean> => {
  if (await exists(archiveName) && !(options?.overwrite)) {
    throw `The archive file ${
      join(Deno.cwd(), archiveName)
    }.zip already exists, Use the {overwrite: true} option to overwrite the existing archive file`;
  }
  const isWindows = Deno.build.os === "windows";
  const filesList = typeof files === "string"
    ? files
    : files.join(isWindows ? ", " : " ");

  const compressCommandProcess = new Deno.Command(
    isWindows ? "PowerShell" : "zip",
    {
      args: isWindows
        ? [
          "Compress-Archive",
          "-Path",
          filesList,
          "-DestinationPath",
          archiveName,
          options?.overwrite ? "-Force" : "",
        ]
        : [
          "-r",
          ...options?.flags ?? [],
          archiveName,
          ...filesList.split(" "),
        ],
    },
  );

  const { success } = await compressCommandProcess.output();
  return success;
};

export const compress = async (
  files: string | string[],
  archiveName: string = "./archive.zip",
  options?: CompressOptions,
): Promise<boolean> => {
  return await compressProcess(files, archiveName, options);
};
