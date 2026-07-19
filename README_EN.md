# Tsuduri
[![deno doc](https://jsr.io/badges/@tsuduri/core)](https://jsr.io/@tsuduri/core/doc)
[![deno doc](https://jsr.io/badges/@tsuduri/cli)](https://jsr.io/@tsuduri/cli/doc)
[![codecov](https://codecov.io/github/windchime-yk/tsuduri/graph/badge.svg?token=CVL3AFDJQQ)](https://codecov.io/github/windchime-yk/tsuduri)

build IME dictionary.  
Created by Deno.

The goal is to create all IME user dictionaries from a single file.

## Language Support
- Japanese

## Dictionary Support
- Google Japanese IME
- macOS Japanese Input Method
- Gboard
- Microsoft IME

## Dictionary Table
| Name                          | Split Type | Can Set Genre | Can Set Word class |
| ----------------------------- | ---------- | ------------- | ------------------ |
| Google IME                    | TSV        | ✔             | ✔                  |
| macOS Japanese Input Method   | CSV        | ✗             | ✔                  |
| Gboard                        | TSV        | ✗             | ✗                  |
| Microsoft IME                 | TSV        | ✗             | ✔                  |

## Feature
- [ ] API
- [x] CLI
- [x] Google Spreadsheet (GAS)
- [ ] Web App

## Install
``` bash
deno install -g -RWE --allow-run -n tsuduri jsr:@tsuduri/cli
```

## Input File Extensions Support
- CSV
- JSON

Example files in `.xlsx` and `.ods` are included for use with spreadsheet software such as Microsoft Excel.  
Please check `example/input` for details.

## Usage
### All dictionaries
``` bash
tsuduri --dir=example/input/raw --all
```

### Specific dictionaries
``` bash
tsuduri --dir=example/input/raw --google --macos --microsoft --gboard
```

### Compress dictionaries
``` bash
tsuduri --dir=example/input/raw --all --compress
```

## Use with Google Spreadsheet
You can generate user dictionary files from dictionary data managed in a Google
Spreadsheet, straight from a menu on the sheet.  
Just copy the [template](https://docs.google.com/spreadsheets/d/1I2lEn7Df3eR4It2JvW2eUBNTeIDqphdmvFMvBd5xpd4/copy) to get started.
See [`gas/README_EN.md`](./gas/README_EN.md) for setup and usage.

## Build dictionary workflow example
``` yml
name: Build IME dictionary
on:
  pull_request:
    types: [closed]

jobs:
  upload:
    if: github.event.pull_request.merged == true
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      - name: Setup Deno
        uses: denoland/setup-deno@v2
        with:
          deno-version: v2.x
      - name: Output dictionary data
        run: |
          deno install -g -RWE --allow-run -n tsuduri jsr:@tsuduri/cli
          tsuduri --dir=example/input/raw --all
      - name: Archive production artifacts
        uses: actions/upload-artifact@v4
        with:
          name: dictionary
          path: tsuduri_output
          retention-days: 30
```
