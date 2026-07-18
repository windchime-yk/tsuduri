// エラー実装の参考: https://uga-box.hatenablog.com/entry/2022/01/07/000000

/**
 * ファイル形式がCSV/JSON以外だった場合に投げられるエラー
 */
export class FileTypeError extends Error {
  /**
   * ファイル名を含むエラーメッセージを組み立てる
   * @param filename 対象のファイル名
   */
  constructor(filename: string) {
    super(
      `${filename}は想定したファイル形式ではありません。CSVかJSONを使ってください`,
    );
    this.name = this.constructor.name;
  }
}

/**
 * ユーザー辞書データに想定外のプロパティが存在した場合に投げられるエラー
 */
export class DataPropertyError extends Error {
  constructor() {
    super(`想定していないプロパティが存在します。データを再確認してください`);
    this.name = this.constructor.name;
  }
}
