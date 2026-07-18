export type {
  ErrorResult,
  ImeType,
  InputUserDictionary,
  Result,
  SuccessResult,
  Wordclass,
  YesOrNo,
} from "./model.ts";

export { convertJsonToTextData, parsedCsvToJson, readFile } from "./convert.ts";

export { isValidFileExtention, isValidJson } from "./validation.ts";

export { compressFile, generateDictionaryFile } from "./build.ts";

export { DataPropertyError, FileTypeError } from "./error.ts";
