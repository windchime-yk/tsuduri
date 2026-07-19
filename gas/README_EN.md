# @tsuduri/gas

日本語版は[こちら](./README.md)。

The Google Apps Script (GAS) edition of
[Tsuduri](https://github.com/windchime-yk/tsuduri). It generates Japanese IME
user dictionaries for Google Japanese Input, macOS Japanese IM, Microsoft IME,
and Gboard from dictionary data managed in a Google Spreadsheet, then saves them
to Google Drive as a single zip file.

This package is not published to JSR.

## Spreadsheet format

Use the first row as a header row with the following columns (the same format as
the [Excel template](../example/input/tsuduri-example.xlsx)).

| Column        | Description                                           |
| ------------- | ----------------------------------------------------- |
| `type`        | Word class                                            |
| `word`        | Target word                                           |
| `reading`     | Reading                                               |
| `isSuppress`  | Whether it is a suppressed word (`YES` / `NO`)        |
| `isSuggest`   | Whether it only appears in suggestions (`YES` / `NO`) |
| `description` | Description of the target word                        |

## Setup

1. Log in to [clasp](https://github.com/google/clasp)

   ```bash
   deno run -A --no-lock npm:@google/clasp@3 login
   ```

2. Prepare a container-bound script attached to the target spreadsheet, then
   copy `.clasp.json.example` and set your `scriptId`

   ```bash
   cp .clasp.json.example .clasp.json
   ```

3. Bundle and upload to GAS

   ```bash
   deno task deploy
   ```

## Usage

After uploading, reopen the spreadsheet and a "Tsuduri" menu will appear.
Running "ユーザー辞書ファイルを生成" saves `tsuduri_output.zip`, which contains
user dictionary files for all supported IMEs, to Google Drive and shows the file
URL in a dialog.

## Development

```bash
# Test
deno task test

# Bundle only (output to dist/)
deno task bundle
```
