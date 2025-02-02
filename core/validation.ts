import { z } from "zod";
import { extname } from "@std/path";
import type {
  ImeConfig,
  ImeType,
  InputUserDictionary,
  Result,
  YesOrNo,
} from "../model.ts";
import { COMMA, TAB } from "./config.ts";
import { DataPropertyError, FileTypeError } from "./error.ts";

/**
 * ファイル名がCSVかJSONか確認する
 * @param filename ファイル名
 * @returns 拡張子かファイルタイプエラーを返すResult型
 */
export const isValidFileExtention = (filename: string): Result<string> => {
  const VALID_EXT_LIST = [".csv", ".json"];
  const ext = extname(filename);
  if (VALID_EXT_LIST.includes(ext)) {
    return {
      success: true,
      result: ext,
    };
  } else {
    return {
      success: false,
      error: new FileTypeError(filename),
    };
  }
};

/**
 * JSONデータの中に想定したプロパティのみが入っているか検査する
 * @param jsonData 検査対象のJSONデータ
 * @returns 検査済みのJSONデータかデータプロパティエラーを返すResult型
 */
export const isValidJson = (
  jsonData: Record<string, string | undefined>[],
): Result<InputUserDictionary[]> => {
  const InputuserDictionarySchema = z.object({
    type: z.string(),
    word: z.string(),
    reading: z.string(),
    isSuppress: z.string(),
    isSuggest: z.string(),
    description: z.string(),
  }).array();

  if (!InputuserDictionarySchema.safeParse(jsonData).success) {
    return {
      success: false,
      error: new DataPropertyError(),
    };
  }

  return {
    success: true,
    result: jsonData as InputUserDictionary[],
  };
};

export const detectWordclass = (
  wordclass: string,
  imeType: ImeType,
  isSuggest: YesOrNo,
  isSuppress: YesOrNo,
) => {
  if (imeType === "Google IME" && isSuggest === "YES") return "サジェストのみ";
  if (imeType === "Google IME" && isSuppress === "YES") return "抑制単語";
  return wordclass;
};

/**
 * 対象IMEを検知してデリミタを返す
 * @param type 対象IMEのデータタイプ
 * @returns カンマかタブ
 */
export const detectDelimiter = (type: ImeConfig[ImeType]["dataType"]) => {
  return type === "CSV" ? COMMA : TAB;
};
