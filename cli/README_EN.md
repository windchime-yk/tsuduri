# @tsuduri/cli

[![deno doc](https://jsr.io/badges/@tsuduri/cli)](https://jsr.io/@tsuduri/cli/doc)

日本語版は[こちら](./README.md)。

CLI for [Tsuduri](https://github.com/windchime-yk/tsuduri), a tool that builds
IME user dictionaries (Japanese) from a single source file. It converts CSV or
JSON dictionary data into the native formats of Google Japanese IME, macOS
Japanese Input Method, Microsoft IME, and Gboard.

> **What is an IME?** An Input Method Editor is system software for typing
> languages with far more characters than keyboard keys, such as Japanese: it
> converts keystrokes (e.g. romaji) into kana and kanji. Japanese IMEs let users
> register their own words and readings in a _user dictionary_ — the files this
> tool generates.

## Install

```bash
deno install -g -RWE --allow-run -n tsuduri jsr:@tsuduri/cli
```

## Usage

```bash
# Generate dictionaries for all supported IMEs
tsuduri --dir=path/to/input --all

# Generate dictionaries for specific IMEs
tsuduri --dir=path/to/input --google --macos --microsoft --gboard

# Generate all dictionaries and zip the output
tsuduri --dir=path/to/input --all --compress
```

### Options

| Option        | Description                                                |
| ------------- | ---------------------------------------------------------- |
| `--dir`       | (Required) Directory containing the input files            |
| `--all`       | Generate dictionaries for all supported IMEs               |
| `--google`    | Generate a Google Japanese IME dictionary                  |
| `--macos`     | Generate a macOS Japanese Input Method dictionary          |
| `--microsoft` | Generate a Microsoft IME dictionary                        |
| `--gboard`    | Generate a Gboard dictionary                               |
| `--compress`  | Zip the output directory into `tsuduri_output_archive.zip` |

## Input files

CSV and JSON files are supported. See
[`example/input`](https://github.com/windchime-yk/tsuduri/tree/main/example/input)
for full examples, including `.xlsx` / `.ods` templates for spreadsheet
software.

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

## Output

Dictionaries are written to `tsuduri_output/<input name>/` in the current
directory, one file per IME:

```
tsuduri_output/
└── mydict/
    ├── mydict-googleime.txt
    ├── mydict-macosime.txt
    ├── mydict-microsoftime.txt
    └── mydict-gboard.txt
```

## Programmatic use

The conversion logic lives in [`@tsuduri/core`](https://jsr.io/@tsuduri/core).
The CLI entrypoint is also exported as `run` if you need to embed it:

```ts
import { run } from "jsr:@tsuduri/cli";

await run(["--dir", "path/to/input", "--all"]);
```

## License

[MIT](https://github.com/windchime-yk/tsuduri/blob/main/LICENSE)
