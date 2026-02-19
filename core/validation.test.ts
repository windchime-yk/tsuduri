import { describe, it } from "@std/testing/bdd";
import { assertResult } from "./test/common/asserts.ts";
import { DataPropertyError, FileTypeError } from "./error.ts";
import { isValidFileExtention, isValidJson } from "./validation.ts";

describe("ファイル形式がCSVかJSONかを確認する", () => {
  it("CSVは有効", () => {
    assertResult(isValidFileExtention("test/mock.test.csv"), {
      success: true,
      result: ".csv",
    });
  });
  it("JSONは有効", () => {
    assertResult(isValidFileExtention("test/mock.test.json"), {
      success: true,
      result: ".json",
    });
  });
  it("CSV・JSON以外はエラー", () => {
    const error = new FileTypeError("test/mock.test.yml");
    assertResult(isValidFileExtention("test/mock.test.yml"), {
      success: false,
      error: { name: error.name, message: error.message },
    });
  });
  it("拡張子なしはエラー", () => {
    const error = new FileTypeError("test/LICENSE");
    assertResult(isValidFileExtention("test/LICENSE"), {
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
    assertResult(isValidJson(VALID_JSON), {
      success: true,
      result: VALID_JSON,
    });
  });
  it("想定外のプロパティはエラー", () => {
    const error = new DataPropertyError();
    assertResult(
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
      {
        success: false,
        error: { name: error.name, message: error.message },
      },
    );
  });
});
