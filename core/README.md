# @tsuduri/core

[![deno doc](https://jsr.io/badges/@tsuduri/core)](https://jsr.io/@tsuduri/core/doc)

English version is [here](./README_EN.md).

[Tsuduri](https://github.com/windchime-yk/tsuduri)のコア変換ロジックです。一つのファイルからIMEユーザー辞書（日本語）を生成するためのパッケージで、CSV/JSONの辞書データをGoogle日本語入力・macOS日本語IM・Microsoft
IME・Gboardの各形式に変換します。

コマンドラインツールとして使う場合は[`@tsuduri/cli`](https://jsr.io/@tsuduri/cli)を利用してください。

## インストール方法

```bash
deno add jsr:@tsuduri/core
```

## 使用方法

```ts
import {
  convertJsonToTextData,
  isValidJson,
  parsedCsvToJson,
} from "@tsuduri/core";

const csv = `type,word,reading,isSuppress,isSuggest,description
人名,遊馬賀樋香,あそまかといか,NO,NO,テスト`;

const rows = parsedCsvToJson(csv);
const validated = isValidJson(rows);
if (!validated.success) throw validated.error;

const output = convertJsonToTextData(validated.result, "Google IME");
// => "あそまかといか\t遊馬賀樋香\t人名\n"
```

## API

| エクスポート             | 説明                                                         |
| ------------------------ | ------------------------------------------------------------ |
| `parsedCsvToJson`        | 辞書CSVテキストを行データにパースする                        |
| `isValidJson`            | 行データを辞書スキーマで検証する（エントリの`Result`を返す） |
| `isValidFileExtention`   | 対応入力形式（`.csv` / `.json`）かを確認する                 |
| `convertJsonToTextData`  | 検証済みエントリをIME固有の辞書テキストに変換する            |
| `readFile`               | ファイルをUTF-8文字列として読み込む                          |
| `generateDictionaryFile` | 辞書テキストをIMEのエンコーディングでファイル出力する        |
| `compressFile`           | ディレクトリをZIP圧縮する                                    |
| `FileTypeError`          | 非対応の入力ファイル拡張子のエラー                           |
| `DataPropertyError`      | 想定外のプロパティを持つ辞書エントリのエラー                 |

エクスポートされる型:
`ImeType`、`InputUserDictionary`、`Wordclass`、`YesOrNo`、`Result`、`SuccessResult`、`ErrorResult`

## 対応IME

| IME名                       | データ形式 | ジャンル名は設定できるか | 品詞は設定できるか |
| --------------------------- | ---------- | ------------------------ | ------------------ |
| Google IME                  | TSV        | ✔                        | ✔                  |
| macOS Japanese Input Method | CSV        | ✗                        | ✔                  |
| Gboard                      | TSV        | ✗                        | ✗                  |
| Microsoft IME               | TSV        | ✗                        | ✔                  |

## ライセンス

[MIT](https://github.com/windchime-yk/tsuduri/blob/main/LICENSE)
