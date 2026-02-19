import { assertResult } from "./test/common/asserts.ts";
import { DataPropertyError, FileTypeError } from "./error.ts";
import { isValidFileExtention, isValidJson } from "./validation.ts";

Deno.test("ファイル形式がCSVかJSONかを確認する", async (t) => {
  await t.step("CSV", () => {
    assertResult(isValidFileExtention("test/mock.test.csv"), {
      success: true,
      result: ".csv",
    });
  });
  await t.step("JSON", () => {
    assertResult(isValidFileExtention("test/mock.test.json"), {
      success: true,
      result: ".json",
    });
  });
  await t.step("それ以外", () => {
    const error = new FileTypeError("test/mock.test.yml");
    assertResult(isValidFileExtention("test/mock.test.yml"), {
      success: false,
      error: { name: error.name, message: error.message },
    });
  });
  await t.step("拡張子なし", () => {
    const error = new FileTypeError("test/LICENSE");
    assertResult(isValidFileExtention("test/LICENSE"), {
      success: false,
      error: { name: error.name, message: error.message },
    });
  });
});

Deno.test("JSONプロパティが想定されたものか検査する", async (t) => {
  await t.step("想定内", () => {
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
  await t.step("想定外", () => {
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
