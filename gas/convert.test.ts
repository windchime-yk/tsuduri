import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { sheetValuesToRecords, toSignedBytes } from "./convert.ts";

describe("シート値をレコード配列に変換する", () => {
  it("ヘッダー行をキーにしてレコード化する", () => {
    const values = [
      ["type", "word", "reading", "isSuppress", "isSuggest", "description"],
      ["人名", "Ryan Dahl", "らいあんだーる", "NO", "NO", "Denoの生みの親"],
    ];
    expect(sheetValuesToRecords(values)).toEqual([
      {
        type: "人名",
        word: "Ryan Dahl",
        reading: "らいあんだーる",
        isSuppress: "NO",
        isSuggest: "NO",
        description: "Denoの生みの親",
      },
    ]);
  });
  it("空セルは空文字列になる", () => {
    const values = [
      ["type", "word", "reading", "isSuppress", "isSuggest", "description"],
      ["人名", "Ryan Dahl", "らいあんだーる", "NO", "NO", ""],
    ];
    expect(sheetValuesToRecords(values)).toEqual([
      {
        type: "人名",
        word: "Ryan Dahl",
        reading: "らいあんだーる",
        isSuppress: "NO",
        isSuggest: "NO",
        description: "",
      },
    ]);
  });
  it("すべて空のセルの行は除外する", () => {
    const values = [
      ["type", "word", "reading", "isSuppress", "isSuggest", "description"],
      ["", "", "", "", "", ""],
      [null, null, null, null, null, null],
      ["人名", "Ryan Dahl", "らいあんだーる", "NO", "NO", ""],
    ];
    expect(sheetValuesToRecords(values)).toHaveLength(1);
  });
  it("欠けているセルやnullのセルは空文字列になる", () => {
    const values = [
      ["type", "word", "reading", "isSuppress", "isSuggest", "description"],
      ["人名", "Ryan Dahl", "らいあんだーる", "NO", "NO", null],
      ["人名", "Brendan Eich", "ぶれんだんあいく", "NO", "NO"],
    ];
    expect(sheetValuesToRecords(values)).toEqual([
      {
        type: "人名",
        word: "Ryan Dahl",
        reading: "らいあんだーる",
        isSuppress: "NO",
        isSuggest: "NO",
        description: "",
      },
      {
        type: "人名",
        word: "Brendan Eich",
        reading: "ぶれんだんあいく",
        isSuppress: "NO",
        isSuggest: "NO",
        description: "",
      },
    ]);
  });
  it("値が空なら空配列を返す", () => {
    expect(sheetValuesToRecords([])).toEqual([]);
  });
});

describe("バイト列を符号つきバイト配列に変換する", () => {
  it("127以下はそのまま、128以上は負数になる", () => {
    expect(toSignedBytes(new Uint8Array([0x00, 0x7f, 0x80, 0xff]))).toEqual([
      0,
      127,
      -128,
      -1,
    ]);
  });
});
