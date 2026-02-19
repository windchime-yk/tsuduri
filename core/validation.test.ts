import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { DataPropertyError, FileTypeError } from "./error.ts";
import { isValidFileExtention, isValidJson } from "./validation.ts";

describe("ファイル形式がCSVかJSONかを確認する", () => {
  it("CSVは有効", () => {
    expect(isValidFileExtention("test/mock.test.csv")).toMatchObject({
      success: true,
      result: ".csv",
    });
  });
  it("JSONは有効", () => {
    expect(isValidFileExtention("test/mock.test.json")).toMatchObject({
      success: true,
      result: ".json",
    });
  });
  it("CSV・JSON以外はエラー", () => {
    const error = new FileTypeError("test/mock.test.yml");
    expect(isValidFileExtention("test/mock.test.yml")).toMatchObject({
      success: false,
      error: { name: error.name, message: error.message },
    });
  });
  it("拡張子なしはエラー", () => {
    const error = new FileTypeError("test/LICENSE");
    expect(isValidFileExtention("test/LICENSE")).toMatchObject({
      success: false,
      error: { name: error.name, message: error.message },
    });
  });
});

describe("JSONプロパティが想定されたものか検査する", () => {
  it("想定内のプロパティは有効", () => {
    const VALID_JSON = [
      {
        type: "人名",
        word: "遊馬賀樋香",
        reading: "あそまかといか",
        isSuppress: "NO",
        isSuggest: "NO",
        description: "なんとなく思いついた名前",
      },
      {
        type: "姓",
        word: "遊馬賀",
        reading: "あそまか",
        isSuppress: "NO",
        isSuggest: "NO",
        description: "なんとなく思いついた名前",
      },
      {
        type: "名",
        word: "樋香",
        reading: "といか",
        isSuppress: "NO",
        isSuggest: "NO",
        description: "なんとなく思いついた名前",
      },
    ];
    expect(isValidJson(VALID_JSON)).toMatchObject({
      success: true,
      result: VALID_JSON,
    });
  });
  it("想定外のプロパティはエラー", () => {
    const error = new DataPropertyError();
    expect(
      isValidJson([
        {
          type: "人名",
          word: "遊馬賀樋香",
          read: "あそまかといか",
          isSuppress: "NO",
          isSuggest: "NO",
          description: "なんとなく思いついた名前",
        },
        {
          type: "姓",
          word: "遊馬賀",
          reading: "あそまか",
        },
        {
          type: "名",
          word: "樋香",
          reading: "といか",
          isSuppress: "NO",
        },
      ]),
    ).toMatchObject({
      success: false,
      error: { name: error.name, message: error.message },
    });
  });
});
