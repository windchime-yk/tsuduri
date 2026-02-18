import type { ImeConfig, WordclassMapping } from "./model.ts";

export const TAB = "\t";
export const COMMA = ",";
export const NEW_LINE = "\n";

export const imeConfig: ImeConfig = {
  "Google IME": {
    lang: "ja-JP",
    encoding: "utf-8",
    dataType: "TSV",
    hasWordClass: true,
    hasWordIgnore: true,
  },
  "macOS IME": {
    lang: "ja-JP",
    encoding: "utf-8",
    dataType: "CSV",
    hasWordClass: true,
    hasWordIgnore: false,
  },
  "Microsoft IME": {
    lang: "ja-JP",
    encoding: "utf16le",
    bom: true,
    dataType: "TSV",
    hasWordClass: true,
    hasWordIgnore: false,
  },
  "GBoard": {
    lang: "ja-JP",
    encoding: "utf-8",
    dataType: "TSV",
    hasWordClass: false,
    hasWordIgnore: false,
  },
};

export const wordclassMapping: WordclassMapping = {
  "普通名詞": {
    "Google IME": "名詞",
    "macOS IME": "普通名詞",
    "Microsoft IME": "名詞",
  },
  "固有名詞": {
    "Google IME": "固有名詞",
    "macOS IME": "その他の固有名詞",
    "Microsoft IME": "固有名詞",
  },
  "サ変名詞": {
    "Google IME": "名詞サ変",
    "macOS IME": "サ変名詞",
    "Microsoft IME": "さ変名詞",
  },
  "ザ変名詞": {
    "Google IME": "名詞",
    "macOS IME": "普通名詞",
    "Microsoft IME": "ざ変名詞",
  },
  "形容詞": {
    "Google IME": "形容詞",
    "macOS IME": "形容詞",
    "Microsoft IME": "形容詞",
  },
  "形動名詞": {
    "Google IME": "名詞",
    "macOS IME": "形動名詞",
    "Microsoft IME": "形動名詞",
  },
  "副詞": {
    "Google IME": "副詞",
    "macOS IME": "副詞",
    "Microsoft IME": "副詞",
  },
  "連体詞": {
    "Google IME": "連体詞",
    "macOS IME": "連体詞",
    "Microsoft IME": "連体詞",
  },
  "接続詞": {
    "Google IME": "接続詞",
    "macOS IME": "接続詞",
    "Microsoft IME": "接続詞",
  },
  "感動詞": {
    "Google IME": "感動詞",
    "macOS IME": "感動詞",
    "Microsoft IME": "感動詞",
  },
  "カ行五段動詞": {
    "Google IME": "動詞カ行五段",
    "macOS IME": "カ行五段",
    "Microsoft IME": "か行五段",
  },
  "ガ行五段動詞": {
    "Google IME": "動詞ガ行五段",
    "macOS IME": "ガ行五段",
    "Microsoft IME": "が行五段",
  },
  "サ行五段動詞": {
    "Google IME": "動詞サ行五段",
    "macOS IME": "サ行五段",
    "Microsoft IME": "さ行五段",
  },
  "タ行五段動詞": {
    "Google IME": "動詞タ行五段",
    "macOS IME": "タ行五段",
    "Microsoft IME": "た行五段",
  },
  "ナ行五段動詞": {
    "Google IME": "動詞ナ行五段",
    "macOS IME": "ナ行五段",
    "Microsoft IME": "な行五段",
  },
  "バ行五段動詞": {
    "Google IME": "動詞バ行五段",
    "macOS IME": "バ行五段",
    "Microsoft IME": "ば行五段",
  },
  "マ行五段動詞": {
    "Google IME": "動詞マ行五段",
    "macOS IME": "マ行五段",
    "Microsoft IME": "ま行五段",
  },
  "ラ行五段動詞": {
    "Google IME": "動詞ラ行五段",
    "macOS IME": "ラ行五段",
    "Microsoft IME": "ら行五段",
  },
  "ワ行五段動詞": {
    "Google IME": "動詞ワ行五段",
    "macOS IME": "ワ行五段",
    "Microsoft IME": "あわ行五段",
  },
  "一段動詞": {
    "Google IME": "動詞一段",
    "macOS IME": "一段動詞",
    "Microsoft IME": "一段動詞",
  },
  "短縮よみ": {
    "Google IME": "短縮よみ",
    "macOS IME": "無品詞",
    "Microsoft IME": "短縮よみ",
  },
  "人名": {
    "Google IME": "人名",
    "macOS IME": "人名",
    "Microsoft IME": "人名",
  },
  "人名接頭語": {
    "Google IME": "接頭語",
    "macOS IME": "人名",
    "Microsoft IME": "姓名接頭語",
  },
  "人名接尾語": {
    "Google IME": "接尾人名",
    "macOS IME": "人名接尾語",
    "Microsoft IME": "姓名接尾語",
  },
  "姓": {
    "Google IME": "姓",
    "macOS IME": "姓",
    "Microsoft IME": "姓",
  },
  "名": {
    "Google IME": "名",
    "macOS IME": "名",
    "Microsoft IME": "名",
  },
  "組織名": {
    "Google IME": "組織",
    "macOS IME": "組織名",
    "Microsoft IME": "固有名詞",
  },
  "組織名接頭語": {
    "Google IME": "接頭語",
    "macOS IME": "組織名",
    "Microsoft IME": "接頭語",
  },
  "組織名接尾語": {
    "Google IME": "接尾一般",
    "macOS IME": "組織名接尾語",
    "Microsoft IME": "接尾語",
  },
  "地名": {
    "Google IME": "地名",
    "macOS IME": "単純地名",
    "Microsoft IME": "地名",
  },
  "地名接頭語": {
    "Google IME": "接頭語",
    "macOS IME": "単純地名",
    "Microsoft IME": "地名接頭語",
  },
  "地名接尾語": {
    "Google IME": "接尾地名",
    "macOS IME": "地名接尾語",
    "Microsoft IME": "地名接尾語",
  },
  "数字接頭語": {
    "Google IME": "接頭語",
    "macOS IME": "数字列接頭語",
    "Microsoft IME": "接頭語",
  },
  "数字接尾語": {
    "Google IME": "助数詞",
    "macOS IME": "数字列接尾語",
    "Microsoft IME": "助数詞",
  },
  "記号": {
    "Google IME": "記号",
    "macOS IME": "その他の固有名詞",
    "Microsoft IME": "名詞",
  },
  "顔文字": {
    "Google IME": "顔文字",
    "macOS IME": "無品詞",
    "Microsoft IME": "顔文字",
  },
  "慣用句": {
    "Google IME": "固有名詞",
    "macOS IME": "成句",
    "Microsoft IME": "慣用句",
  },
};
