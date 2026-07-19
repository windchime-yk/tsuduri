# @tsuduri/gas

English version is [here](./README_EN.md).

[Tsuduri](https://github.com/windchime-yk/tsuduri)のGoogle Apps
Script（GAS）版です。Google
Spreadsheetで管理している辞書データから、Google日本語入力・macOS日本語IM・Microsoft
IME・Gboard向けのIMEユーザー辞書（日本語）を生成し、zipにまとめてダウンロードできます。

生成したファイルはGoogle
Driveには保存されません。そのため、このスクリプトがDriveのファイルへアクセスすることはありません。

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

## 導入方法

テンプレートのスプレッドシートをコピーするだけで利用できます。claspのインストールやGoogle
Apps Scriptの操作は必要ありません。

1. [配布用テンプレート](https://docs.google.com/spreadsheets/d/1I2lEn7Df3eR4It2JvW2eUBNTeIDqphdmvFMvBd5xpd4/copy)を開きます
2. 「コピーを作成」を押して、自分のGoogle Driveにコピーします
3. コピーしたスプレッドシートを開くと、メニューに「Tsuduri」が追加されます

初回実行時はGoogleの承認画面が表示されます。スプレッドシートの読み取りとダイアログ表示のみを要求し、Driveへのアクセス権限は要求しません。

## 開発者向けセットアップ

テンプレートを更新したり、自分のスプレッドシートへ直接スクリプトを配置したりする場合の手順です。

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

メニューの「Tsuduri」から「ユーザー辞書ファイルを生成」を実行すると、全対応IMEのユーザー辞書ファイルをまとめた`tsuduri_output.zip`が作られ、ダイアログにダウンロードボタンが表示されます。押すとそのままブラウザにダウンロードされます。

対象になるのは開いているシート（タブ）で、生成されるファイル名にはそのシート名が使われます。シート名が`example`なら`example-googleime.txt`のようになります。

## テンプレートを公開する

メンテナ向けの手順です。

1. 新しいスプレッドシートを作成し、「スプレッドシートの形式」のヘッダー行を用意します
2. そのスプレッドシートに紐づくコンテナバインドスクリプトへ、「開発者向けセットアップ」の手順でアップロードします
3. スプレッドシートの共有設定を「リンクを知っている全員」が閲覧できる状態にします
4. 共有URLの末尾`/edit`以降を`/copy`に置き換えたURLを配布します。開いた利用者にコピーの確認画面が表示されます

## 開発

```bash
# テスト
deno task test

# バンドルのみ（dist/に出力）
deno task bundle
```
