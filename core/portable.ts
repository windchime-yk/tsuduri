/**
 * ファイルシステムやWeb Streams APIに依存しない機能だけを公開するエントリポイント。
 *
 * 既定の`@tsuduri/core`はファイル出力やzip圧縮を含むため、Denoランタイム外では読み込めない。
 * Google Apps Scriptのようにこれらのプラットフォーム機能を持たない環境では、こちらを利用する
 *
 * @module
 */

export type {
  ErrorResult,
  ImeType,
  InputUserDictionary,
  Result,
  SuccessResult,
  Wordclass,
  YesOrNo,
} from "./model.ts";

export { convertJsonToTextData } from "./convert.ts";

export { encodeDictionaryText } from "./encode.ts";

export { isValidJson } from "./validation.ts";

export { DataPropertyError } from "./error.ts";
