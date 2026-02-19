import { assertEquals } from "@std/assert";
import { join } from "@std/path";
import {
  convertJsonToTextData,
  parsedCsvToJson,
  readFile,
} from "./convert.ts";

const testDir = import.meta.dirname!;

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
    await readFile(join(testDir, "test/mock/private.csv")),
    "type,word,reading,isSuppress,isSuggest,description\n人名,遊馬賀樋香,あそまかといか,NO,NO,なんとなく思いついた名前\n姓,遊馬賀,あそまか,NO,NO,なんとなく思いついた名前\n名,樋香,といか,NO,NO,なんとなく思いついた名前",
  );
});
