# @tsuduri/gas

English version is [here](./README_EN.md).

[Tsuduri](https://github.com/windchime-yk/tsuduri)のGoogle Apps
Script（GAS）版です。Google
Spreadsheetで管理している辞書データから、Google日本語入力・macOS日本語IM・Microsoft
IME・Gboard向けのIMEユーザー辞書（日本語）を生成し、zipにまとめてGoogle
Driveへ保存します。

このパッケージはJSRには公開されません。

## スプレッドシートの形式

1行目をヘッダー行とし、以下の列を用意してください（[Excelテンプレート](../example/input/tsuduri-example.xlsx)と同じ形式です）。

| 列名          | 説明                                       |
| ------------- | ------------------------------------------ |
| `type`        | 品詞                                       |
| `word`        | 対象文言                                   |
| `reading`     | 読み方                                     |
| `isSuppress`  | 抑制単語かどうか（`YES` / `NO`）           |
| `isSuggest`   | サジェストのみに表示するか（`YES` / `NO`） |
| `description` | 対象文言についての説明                     |

## セットアップ

1. [clasp](https://github.com/google/clasp)にログインします

   ```bash
   deno run -A --no-lock npm:@google/clasp@3 login
   ```

2. 対象のスプレッドシートに紐づくコンテナバインドスクリプトを用意し、`.clasp.json.example`をコピーして`scriptId`を設定します

   ```bash
   cp .clasp.json.example .clasp.json
   ```

3. バンドルしてGASへアップロードします

   ```bash
   deno task deploy
   ```

## 使用方法

アップロード後にスプレッドシートを開き直すと、メニューに「Tsuduri」が追加されます。「ユーザー辞書ファイルを生成」を実行すると、全対応IMEのユーザー辞書ファイルをまとめた`tsuduri_output.zip`がGoogle
Driveに保存され、ダイアログにファイルのURLが表示されます。

## 開発

```bash
# テスト
deno task test

# バンドルのみ（dist/に出力）
deno task bundle
```
