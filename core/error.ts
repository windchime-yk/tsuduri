/**
 * 各エラーの共通処理を持つ基底クラス
 * @see https://uga-box.hatenablog.com/entry/2022/01/07/000000
 * @internal
 */
class BaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

/**
 * ファイル形式がCSV/JSON以外だった場合に投げられるエラー
 */
export class FileTypeError extends BaseError {
  /**
   * ファイル名を含むエラーメッセージを組み立てる
   * @param filename 対象のファイル名
   */
  constructor(filename: string) {
    super(
      `${filename}は想定したファイル形式ではありません。CSVかJSONを使ってください`,
    );
  }
}

/**
 * ユーザー辞書データに想定外のプロパティが存在した場合に投げられるエラー
 */
export class DataPropertyError extends BaseError {
  constructor() {
    super(`想定していないプロパティが存在します。データを再確認してください`);
  }
}
