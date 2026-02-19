/**
 * @see https://uga-box.hatenablog.com/entry/2022/01/07/000000
 */
class BaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class FileTypeError extends BaseError {
  constructor(filename: string) {
    super(
      `${filename}は想定したファイル形式ではありません。CSVかJSONを使ってください`,
    );
  }
}

export class DataPropertyError extends BaseError {
  constructor() {
    super(`想定していないプロパティが存在します。データを再確認してください`);
  }
}

