import { parse } from "@std/csv";
import { detectDelimiter, detectWordclass } from "./validation.ts";
import { imeConfig, NEW_LINE, wordclassMapping } from "./config.ts";
import type {
  ImeType,
  InputUserDictionary,
  OutputUserDictionary,
} from "../model.ts";

/**
 * CSVからJSONに変換する
 * @param csv ユーザーが入力するCSVデータ
 * @returns CSVから出力されたJSONデータ
 */
export const parsedCsvToJson = (
  csv: string,
): Record<string, string | undefined>[] => {
  return parse(csv, { skipFirstRow: true });
};

/** IMEごとに必要な単語情報の絞り込みと順番整理を行なう */
const orderdDictionary = (
  dictionary: InputUserDictionary,
  imeType: ImeType,
): OutputUserDictionary => {
  const { lang } = imeConfig[imeType];
  const { type, word, reading, description, isSuggest, isSuppress } =
    dictionary;

  if (imeType === "GBoard") {
    return {
      reading,
      word,
      lang,
    };
  }

  const wordclass = detectWordclass(
    wordclassMapping[type][imeType],
    imeType,
    isSuggest,
    isSuppress,
  );

  if (imeType === "Microsoft IME") {
    return {
      reading,
      word,
      type: wordclass,
      description,
    };
  }

  return {
    reading,
    word,
    type: wordclass,
  };
};

/**
 * @param dictionary ユーザーから入力されたユーザー辞書データ
 * @param imeType 対象IME
 * @returns
 */
const insertDelimiter = (
  dictionary: OutputUserDictionary,
  imeType: ImeType,
): string[] => {
  const { dataType } = imeConfig[imeType];
  const delimiter = detectDelimiter(dataType);
  const wordList: string[] = [];
  for (const key in dictionary) {
    wordList.push(dictionary[key as keyof OutputUserDictionary]);
    wordList.push(delimiter);
  }
  wordList.pop();
  return wordList;
};

/**
 * 対象IME向けのユーザー辞書テキストに変換
 * @param dictionaries ユーザーから入力されたユーザー辞書データ
 * @param imeType 対象IME
 * @returns
 */
export const convertJsonToTextData = (
  dictionaries: InputUserDictionary[],
  imeType: ImeType,
): string => {
  return dictionaries.map((dictionary) => {
    const orderd = orderdDictionary(dictionary, imeType);
    return insertDelimiter(orderd, imeType).join("");
  }).join(NEW_LINE) + NEW_LINE;
};

export const readFile = async (path: string): Promise<string> => {
  const decoder = new TextDecoder();
  const data = await Deno.readFile(path);
  return decoder.decode(data);
};
