# Tsuduri
[![deno doc](https://jsr.io/badges/@whyk/tsuduri)](https://jsr.io/@whyk/tsuduri/doc)
[![codecov](https://codecov.io/github/windchime-yk/tsuduri/graph/badge.svg?token=CVL3AFDJQQ)](https://codecov.io/github/windchime-yk/tsuduri)

Denoで作られた、IMEユーザー辞書統一出力ツール。  
すべてのIMEユーザー辞書を一つのファイルから作成することを目標にしています。

## 対応言語
- 日本語

## 対応IME
- Google Japanese IME
- macOS Japanese Input Method
- Gboard
- Microsoft IME

## IMEユーザー辞書テーブル
| IME名                          | データ形式 | ジャンル名は設定できるか | 品詞は設定できるか |
| ----------------------------- | ---------- | ------------- | ------------------ |
| Google IME                    | TSV        | ✔             | ✔                  |
| macOS Japanese Input Method   | CSV        | ✗             | ✔                  |
| Gboard                        | TSV        | ✗             | ✗                  |
| Microsoft IME                 | TSV        | ✗             | ✔                  |

## 提供手段
- [ ] API
- [x] CLI
- [ ] Web App

## インストール方法
``` bash
deno install -g --RWE --allow-run -n tsuduri https://jsr.io/@whyk/tsuduri/cli
```

## 対応ファイル形式
以下の入力ファイル形式に対応しています。

- CSV
- JSON

また、Microsoft Excelなどの表計算ソフトウェアでの利用を想定し、`.xlsx`と`.ods`の実例ファイルも同梱しています。  
詳しくは`example/input`を確認してください。

## 使用方法
### すべての対応IMEユーザー辞書を出力
``` bash
tsuduri --dir=example/input/raw --all
```

### 特定の対応IMEユーザー辞書を出力
``` bash
tsuduri --dir=example/input/raw --google --macos --microsoft --gboard
```

### 出力したユーザー辞書ファイル群を圧縮
``` bash
tsuduri --dir=example/input/raw --all --compress
```

## GitHub Actionsでの設定例
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
        uses: denoland/setup-deno@v1
        with:
          deno-version: v1.x
      - name: Output dictionary data
        run: |
          deno install --allow-read --allow-write -n tsuduri https://jsr.io/@whyk/tsuduri/cli
          tsuduri --dir=example/input/raw --all
      - name: Archive production artifacts
        uses: actions/upload-artifact@v4
        with:
          name: dictionary
          path: tsuduri_output
          retention-days: 30
```
