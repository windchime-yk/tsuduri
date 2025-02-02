import { assertEquals } from "@std/assert";
import {
  convertJsonToTextData,
  parsedCsvToJson,
  readFile,
} from "../core/convert.ts";
import { isValidFileExtention, isValidJson } from "../core/validation.ts";
import { DataPropertyError, FileTypeError } from "../core/error.ts";

Deno.test("ファイル形式がCSVかJSONかを確認する", async (t) => {
  await t.step("CSV", () => {
    assertEquals(isValidFileExtention("test/mock.test.csv"), {
      success: true,
      result: ".csv",
    });
  });
  await t.step("JSON", () => {
    assertEquals(isValidFileExtention("test/mock.test.json"), {
      success: true,
      result: ".json",
    });
  });
  await t.step("それ以外", () => {
    assertEquals(isValidFileExtention("test/mock.test.yml"), {
      success: false,
      error: new FileTypeError("test/mock.test.yml"),
    });
  });
  await t.step("拡張子なし", () => {
    assertEquals(isValidFileExtention("test/LICENSE"), {
      success: false,
      error: new FileTypeError("test/LICENSE"),
    });
  });
});

Deno.test("ユーザーから受け取ったCSVをJSONに変換する", () => {
  const VALID_CSV =
    `type,word,reading,isSuppress,isSuggest,description\n人名,遊馬賀樋香,あそまかといか,NO,NO,なんとなく思いついた名前\n姓,遊馬賀,あそまか,NO,NO,なんとなく思いついた名前\n名,樋香,といか,NO,NO,なんとなく思いついた名前`;

  assertEquals(parsedCsvToJson(VALID_CSV), [
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
  ]);
});

Deno.test("JSONプロパティが想定されたものか検査する", async (t) => {
  await t.step("想定内", () => {
    assertEquals(
      isValidJson([
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
      ]),
      {
        success: true,
        result: [
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
        ],
      },
    );
  });
  await t.step("想定外", () => {
    assertEquals(
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
        error: new DataPropertyError(),
      },
    );
  });
});

Deno.test("IMEごとのユーザー辞書データに変換", async (t) => {
  await t.step("Google IME", () => {
    assertEquals(
      convertJsonToTextData([
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
          isSuppress: "YES",
          isSuggest: "NO",
          description: "なんとなく思いついた名前",
        },
        {
          type: "名",
          word: "樋香",
          reading: "といか",
          isSuppress: "NO",
          isSuggest: "YES",
          description: "なんとなく思いついた名前",
        },
        {
          type: "カ行五段動詞",
          word: "書かない",
          reading: "かかない",
          isSuppress: "NO",
          isSuggest: "NO",
          description: "typeの出し分けテスト",
        },
      ], "Google IME"),
      "あそまかといか\t遊馬賀樋香\t人名\nあそまか\t遊馬賀\t抑制単語\nといか\t樋香\tサジェストのみ\nかかない\t書かない\t動詞カ行五段\n",
    );
  });
  await t.step("macOS IME", () => {
    assertEquals(
      convertJsonToTextData([
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
          isSuppress: "YES",
          isSuggest: "NO",
          description: "なんとなく思いついた名前",
        },
        {
          type: "名",
          word: "樋香",
          reading: "といか",
          isSuppress: "NO",
          isSuggest: "YES",
          description: "なんとなく思いついた名前",
        },
        {
          type: "カ行五段動詞",
          word: "書かない",
          reading: "かかない",
          isSuppress: "NO",
          isSuggest: "NO",
          description: "typeの出し分けテスト",
        },
      ], "macOS IME"),
      "あそまかといか,遊馬賀樋香,人名\nあそまか,遊馬賀,姓\nといか,樋香,名\nかかない,書かない,カ行五段\n",
    );
  });
  await t.step("Microsoft IME", () => {
    assertEquals(
      convertJsonToTextData([
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
          isSuppress: "YES",
          isSuggest: "NO",
          description: "なんとなく思いついた名前",
        },
        {
          type: "名",
          word: "樋香",
          reading: "といか",
          isSuppress: "NO",
          isSuggest: "YES",
          description: "なんとなく思いついた名前",
        },
        {
          type: "カ行五段動詞",
          word: "書かない",
          reading: "かかない",
          isSuppress: "NO",
          isSuggest: "NO",
          description: "typeの出し分けテスト",
        },
      ], "Microsoft IME"),
      "あそまかといか\t遊馬賀樋香\t人名\tなんとなく思いついた名前\nあそまか\t遊馬賀\t姓\tなんとなく思いついた名前\nといか\t樋香\t名\tなんとなく思いついた名前\nかかない\t書かない\tか行五段\ttypeの出し分けテスト\n",
    );
  });
  await t.step("GBoard", () => {
    assertEquals(
      convertJsonToTextData([
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
          isSuppress: "YES",
          isSuggest: "NO",
          description: "なんとなく思いついた名前",
        },
        {
          type: "名",
          word: "樋香",
          reading: "といか",
          isSuppress: "NO",
          isSuggest: "YES",
          description: "なんとなく思いついた名前",
        },
        {
          type: "カ行五段動詞",
          word: "書かない",
          reading: "かかない",
          isSuppress: "NO",
          isSuggest: "NO",
          description: "typeの出し分けテスト",
        },
      ], "GBoard"),
      "あそまかといか\t遊馬賀樋香\tja-JP\nあそまか\t遊馬賀\tja-JP\nといか\t樋香\tja-JP\nかかない\t書かない\tja-JP\n",
    );
  });
});

Deno.test("ファイル読み込み", async () => {
  assertEquals(
    await readFile("test/mock/private.csv"),
    "type,word,reading,isSuppress,isSuggest,description\n人名,遊馬賀樋香,あそまかといか,NO,NO,なんとなく思いついた名前\n姓,遊馬賀,あそまか,NO,NO,なんとなく思いついた名前\n名,樋香,といか,NO,NO,なんとなく思いついた名前",
  );
});
