# @tsuduri/gas

日本語版は[こちら](./README.md)。

The Google Apps Script (GAS) edition of
[Tsuduri](https://github.com/windchime-yk/tsuduri). It generates Japanese IME
user dictionaries for Google Japanese Input, macOS Japanese IM, Microsoft IME,
and Gboard from dictionary data managed in a Google Spreadsheet, then lets you
download them as a single zip file.

Generated files are not saved to Google Drive, so this script never accesses
your Drive files.

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

## Getting started

Just copy the template spreadsheet. You do not need to install clasp or touch
Google Apps Script.

1. Open the
   [template](https://docs.google.com/spreadsheets/d/1I2lEn7Df3eR4It2JvW2eUBNTeIDqphdmvFMvBd5xpd4/copy)
2. Click "Make a copy" to copy it to your own Google Drive
3. Open the copied spreadsheet and a "Tsuduri" menu will appear

The first run shows a Google authorization screen. It only asks to read the
current spreadsheet and show dialogs, never for access to your Drive.

## Setup for developers

Follow these steps to update the template, or to install the script directly
into your own spreadsheet.

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

Run "ユーザー辞書ファイルを生成" from the "Tsuduri" menu. It builds
`tsuduri_output.zip`, which contains user dictionary files for all supported
IMEs, and shows a download button in a dialog. Clicking it downloads the file
straight to your browser.

Only the sheet (tab) selected when you run it is processed. Other tabs are never
read, even if the spreadsheet has several. To generate dictionaries for another
tab, switch to it and run the menu item again.

The sheet name is used in the generated file names: a sheet named `example`
produces `example-googleime.txt` and so on.

## Publishing the template

Steps for maintainers.

1. Create a new spreadsheet with the header row described in "Spreadsheet
   format"
2. Upload to the container-bound script attached to that spreadsheet, following
   "Setup for developers"
3. Share the spreadsheet so that anyone with the link can view it
4. Replace `/edit` and everything after it in the share URL with `/copy`, then
   distribute that URL. Anyone who opens it gets a copy confirmation screen

## Development

```bash
# Test
deno task test

# Bundle only (output to dist/)
deno task bundle
```
