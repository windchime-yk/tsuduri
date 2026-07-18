import { BlobReader, Uint8ArrayWriter, ZipWriter } from "@zip-js/zip-js";
import { getFileList } from "@whyk/utils/file";
import { imeConfig } from "./config.ts";
import type { Encoding, ImeType } from "./model.ts";

/**
 * 文字列を指定エンコーディングのバイト列に変換する
 * @param str 変換対象の文字列
 * @param encoding 変換先エンコーディング
 */
const encodeString = (str: string, encoding: Encoding): Uint8Array => {
  if (encoding === "utf16le") {
    const buf = new Uint8Array(str.length * 2);
    for (let i = 0; i < str.length; i++) {
      const code = str.charCodeAt(i);
      buf[i * 2] = code & 0xff;
      buf[i * 2 + 1] = (code >> 8) & 0xff;
    }
    return buf;
  }
  return new TextEncoder().encode(str);
};

/**
 * ユーザー辞書テキストを対象IMEのエンコーディングに合わせたバイト列に変換する。必要に応じてBOMを付与する
 * @param rawdata 変換対象のユーザー辞書テキスト
 * @param imeType 対象IME
 * @returns 対象IMEのエンコーディングに変換されたバイト列
 */
export const encodeDictionaryText = (
  rawdata: string,
  imeType: ImeType,
): Uint8Array => {
  const { encoding, bom } = imeConfig[imeType];
  const bomString = bom ? `\ufeff${rawdata}` : rawdata;
  return encodeString(bomString, encoding);
};

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
  await Deno.writeFile(filePath, encodeDictionaryText(rawdata, imeType));
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
): Promise<void> => {
  await writeFile(data, path, imeType);
  outputBuildLog(path);
};
