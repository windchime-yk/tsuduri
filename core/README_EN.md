# @tsuduri/core

[![deno doc](https://jsr.io/badges/@tsuduri/core)](https://jsr.io/@tsuduri/core/doc)

日本語版は[こちら](./README.md)。

Core conversion logic of [Tsuduri](https://github.com/windchime-yk/tsuduri), a
tool that builds IME user dictionaries (Japanese) from a single source file.
This package converts CSV/JSON dictionary data into the native user dictionary
formats of Google Japanese IME, macOS Japanese Input Method, Microsoft IME, and
Gboard.

> **What is an IME?** An Input Method Editor is system software for typing
> languages with far more characters than keyboard keys, such as Japanese: it
> converts keystrokes (e.g. romaji) into kana and kanji. Japanese IMEs let users
> register their own words and readings in a _user dictionary_ — the files this
> package generates.

If you just want the command-line tool, use
[`@tsuduri/cli`](https://jsr.io/@tsuduri/cli) instead.

## Install

```bash
deno add jsr:@tsuduri/core
```

## Usage

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

| Export                   | Description                                                          |
| ------------------------ | -------------------------------------------------------------------- |
| `parsedCsvToJson`        | Parse dictionary CSV text into rows                                  |
| `isValidJson`            | Validate rows against the dictionary schema (`Result` of entries)    |
| `isValidFileExtention`   | Check that a filename is a supported input format (`.csv` / `.json`) |
| `convertJsonToTextData`  | Convert validated entries into an IME-specific dictionary text       |
| `readFile`               | Read a file as a UTF-8 string                                        |
| `generateDictionaryFile` | Write a dictionary text to disk with the IME's encoding              |
| `compressFile`           | Zip a directory                                                      |
| `FileTypeError`          | Error for unsupported input file extensions                          |
| `DataPropertyError`      | Error for dictionary entries with unexpected properties              |

Exported types: `ImeType`, `InputUserDictionary`, `Wordclass`, `YesOrNo`,
`Result`, `SuccessResult`, `ErrorResult`.

## Supported IMEs

| Name                        | Format | Genre | Word class |
| --------------------------- | ------ | ----- | ---------- |
| Google IME                  | TSV    | ✔     | ✔          |
| macOS Japanese Input Method | CSV    | ✗     | ✔          |
| Gboard                      | TSV    | ✗     | ✗          |
| Microsoft IME               | TSV    | ✗     | ✔          |

## License

[MIT](https://github.com/windchime-yk/tsuduri/blob/main/LICENSE)
