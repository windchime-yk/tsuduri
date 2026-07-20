/**
 * ヘッダー行つきのシート値を@tsuduri/coreが受け取れるレコード配列へ変換する。空行は除外する
 * @param values SpreadsheetのgetValues()で取得した二次元配列
 * @returns CSVパース結果と同形式のレコード配列
 */
export const sheetValuesToRecords = (
  values: ReadonlyArray<ReadonlyArray<unknown>>,
): Record<string, string | undefined>[] => {
  const [header, ...rows] = values;
  if (!header) return [];
  const keys = header.map((cell) => String(cell));
  return rows
    .filter((row) => row.some((cell) => String(cell ?? "") !== ""))
    .map((row) =>
      Object.fromEntries(
        keys.map((key, index) => [key, String(row[index] ?? "")]),
      )
    );
};

/**
 * GASのUtilities.newBlobへ渡すために符号つきバイト配列へ変換する
 * @param bytes 変換対象のバイト列
 * @returns -128〜127の範囲に変換されたバイト配列
 */
export const toSignedBytes = (bytes: Uint8Array): number[] =>
  Array.from(bytes, (byte) => (byte > 127 ? byte - 256 : byte));
