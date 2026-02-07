import { Buffer } from "node:buffer";
import { BlobReader, Uint8ArrayWriter, ZipWriter } from "@zip-js/zip-js";
import { getFileList } from "@whyk/utils/file";
import { imeConfig } from "./config.ts";
import type { ImeType } from "../model.ts";

/**
 * 非同期でユーザー辞書ファイルを作成する
 * @param rawdata ファイルに書き込まれるユーザー辞書データ
 * @param filepath ファイル名
 * @param imeType 対象IME
 */
const writeFile = async (
  rawdata: string,
  filePath: string,
  imeType: ImeType,
): Promise<void> => {
  const { encoding, bom } = imeConfig[imeType];
  const bomString = bom ? `\ufeff${rawdata}` : rawdata;
  const data = Buffer.from(bomString, encoding);
  await Deno.writeFile(filePath, data);
};

/**
 * 非同期でファイルを圧縮する
 * @param filePath 圧縮対象
 * @param archivePath 圧縮後の保存先
 */
export const compressFile = async (
  filePath: string,
  archivePath: string,
): Promise<void> => {
  const fileList = await getFileList(filePath);
  const uintWriter = new Uint8ArrayWriter();
  const zipWriter = new ZipWriter(uintWriter);

  for await (const file of fileList) {
    const data = await Deno.readFile(file.path);
    await zipWriter.add(file.name, new BlobReader(new Blob([data])));
  }

  const zipData = await zipWriter.close();
  await Deno.writeFile(`${archivePath}.zip`, zipData);
};

/** ファイル出力ログを生成 */
const outputBuildLog = (pathname: string) =>
  console.log(`build complate ${pathname}`);

/** ユーザー辞書ファイルの生成 */
export const generateDictionaryFile = async (
  data: string,
  path: string,
  imeType: ImeType,
) => {
  await writeFile(data, path, imeType);
  outputBuildLog(path);
};
