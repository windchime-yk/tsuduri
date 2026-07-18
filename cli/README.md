# @tsuduri/cli

[![deno doc](https://jsr.io/badges/@tsuduri/cli)](https://jsr.io/@tsuduri/cli/doc)

English version is [here](./README_EN.md).

[Tsuduri](https://github.com/windchime-yk/tsuduri)のCLIです。一つのファイルからIMEユーザー辞書（日本語）を生成します。CSVまたはJSONの辞書データを、Google日本語入力・macOS日本語IM・Microsoft
IME・Gboardの各形式に変換します。

## インストール方法

```bash
deno install -g -RWE --allow-run -n tsuduri jsr:@tsuduri/cli
```

## 使用方法

```bash
# すべての対応IMEユーザー辞書を出力
tsuduri --dir=path/to/input --all

# 特定の対応IMEユーザー辞書を出力
tsuduri --dir=path/to/input --google --macos --microsoft --gboard

# すべて出力して圧縮
tsuduri --dir=path/to/input --all --compress
```

### オプション

| オプション    | 説明                                                 |
| ------------- | ---------------------------------------------------- |
| `--dir`       | （必須）入力ファイルを置いたディレクトリ             |
| `--all`       | すべての対応IMEのユーザー辞書を出力                  |
| `--google`    | Google日本語入力のユーザー辞書を出力                 |
| `--macos`     | macOS日本語IMのユーザー辞書を出力                    |
| `--microsoft` | Microsoft IMEのユーザー辞書を出力                    |
| `--gboard`    | Gboardのユーザー辞書を出力                           |
| `--compress`  | 出力ディレクトリを`tsuduri_output_archive.zip`に圧縮 |

## 入力ファイル

CSVとJSONに対応しています。表計算ソフトウェア向けの`.xlsx` /
`.ods`のテンプレートを含む実例は[`example/input`](https://github.com/windchime-yk/tsuduri/tree/main/example/input)を確認してください。

```csv
type,word,reading,isSuppress,isSuggest,description
人名,遊馬賀樋香,あそまかといか,NO,NO,なんとなく思いついた名前
```

```json
{
  "dictionaries": [
    {
      "type": "人名",
      "word": "遊馬賀樋香",
      "reading": "あそまかといか",
      "isSuppress": "NO",
      "isSuggest": "NO",
      "description": "なんとなく思いついた名前"
    }
  ]
}
```

## 出力

カレントディレクトリの`tsuduri_output/<入力ファイル名>/`に、IMEごとに1ファイルずつ出力されます。

```
tsuduri_output/
└── mydict/
    ├── mydict-googleime.txt
    ├── mydict-macosime.txt
    ├── mydict-microsoftime.txt
    └── mydict-gboard.txt
```

## プログラムからの利用

変換ロジックは[`@tsuduri/core`](https://jsr.io/@tsuduri/core)にあります。CLIのエントリポイントは`run`としてもエクスポートされています。

```ts
import { run } from "jsr:@tsuduri/cli";

await run(["--dir", "path/to/input", "--all"]);
```

## ライセンス

[MIT](https://github.com/windchime-yk/tsuduri/blob/main/LICENSE)
