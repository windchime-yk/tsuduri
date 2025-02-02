type SuccessResult<T> = {
  success: true;
  result: T;
};
type ErrorResult = {
  success: false;
  error: Error;
};
export type Result<T> = SuccessResult<T> | ErrorResult;

/** 対応しているIME */
export type ImeType = "Google IME" | "macOS IME" | "Microsoft IME" | "GBoard";
/** YESかNOか */
export type YesOrNo = "YES" | "NO";
/** Node.js Buffer準拠のエンコーディング */
export type Encoding =
  | "ascii"
  | "utf8"
  | "utf-8"
  | "utf16le"
  | "ucs2"
  | "ucs-2"
  | "base64"
  | "base64url"
  | "latin1"
  | "binary"
  | "hex";

/** IME設定 */
export type ImeConfig = {
  /** 各種IMEの名前 */
  [name in ImeType]: {
    /** 対象言語（現状はja-JPのみ） */
    lang: "ja-JP";
    /** （Node.js Buffer準拠） */
    encoding: Encoding;
    /** BOMがつくかどうか */
    bom?: boolean;
    /** ユーザー辞書のデータ形式 */
    dataType: "CSV" | "TSV";
    /** ユーザー辞書内に品詞欄があるか */
    hasWordClass: boolean;
    /** 抑制単語を品詞に持っているか */
    hasWordIgnore?: boolean;
  };
};

/**
 * 入力されるユーザー辞書の型定義
 */
export type InputUserDictionary = {
  /** 品詞 */
  type: Wordclass;
  /** 対象文言 */
  word: string;
  /** 読み方 */
  reading: string;
  /** 抑制単語かどうか */
  isSuppress: YesOrNo;
  /** サジェストのみに表示するかどうか */
  isSuggest: YesOrNo;
  /** 対象文言についての説明 */
  description: string;
};

/**
 * 出力されるユーザー辞書の型定義
 */
export type OutputUserDictionary =
  | Pick<InputUserDictionary, "word" | "reading">
    & Pick<ImeConfig[ImeType], "lang">
  | { type: string }
    & Pick<InputUserDictionary, "word" | "reading" | "description">
  | { type: string } & Pick<InputUserDictionary, "word" | "reading">;

/** Google IMEがデフォルトで持っている品詞名 */
type GoogleImeNativeWordclass =
  | "名詞"
  | "短縮よみ"
  | "固有名詞"
  | "人名"
  | "姓"
  | "名"
  | "組織"
  | "地名"
  | "名詞サ変"
  | "名詞形動"
  | "数"
  | "アルファベット"
  | "記号"
  | "顔文字"
  | "副詞"
  | "連体詞"
  | "接続詞"
  | "感動詞"
  | "接頭語"
  | "助数詞"
  | "接尾一般"
  | "接尾人名"
  | "接尾地名"
  | "動詞カ行五段"
  | "動詞ガ行五段"
  | "動詞サ行五段"
  | "動詞タ行五段"
  | "動詞ナ行五段"
  | "動詞バ行五段"
  | "動詞マ行五段"
  | "動詞ラ行五段"
  | "動詞ワ行五段"
  | "動詞ハ行四段"
  | "動詞一段"
  | "動詞カ変"
  | "動詞サ変"
  | "動詞ザ変"
  | "動詞ラ変"
  | "形容詞"
  | "終助詞"
  | "句読点"
  | "独立語";

/** macOS IMEがデフォルトで持っている品詞名 */
type MacosImeNativeWordclass =
  | "普通名詞"
  | "人名"
  | "姓"
  | "名"
  | "その他の人名"
  | "組織名"
  | "単純地名"
  | "接尾語付き地名"
  | "その他の固有名詞"
  | "サ変名詞"
  | "形動名詞"
  | "副詞"
  | "連体詞"
  | "接続詞"
  | "感動詞"
  | "数字列接頭語"
  | "数字列接尾語"
  | "人名接尾語"
  | "地名接尾語"
  | "組織名接尾語"
  | "カ行五段"
  | "ガ行五段"
  | "サ行五段"
  | "タ行五段"
  | "ナ行五段"
  | "バ行五段"
  | "マ行五段"
  | "ラ行五段"
  | "ワ行五段"
  | "五段動詞"
  | "一段動詞"
  | "サ変動詞"
  | "ザ変動詞"
  | "形容詞"
  | "成句"
  | "無品詞";

/** Microsoft IMEがデフォルトで持っている品詞名 */
type MicrosoftImeNativeWordclass =
  | "名詞"
  | "人名"
  | "姓"
  | "名"
  | "地名"
  | "短縮よみ"
  | "顔文字"
  | "さ変形動名詞"
  | "固有名詞"
  | "形容詞"
  | "形容動詞"
  | "副詞"
  | "連体詞"
  | "接続詞"
  | "感動詞"
  | "慣用句"
  | "さ変名詞"
  | "ざ変名詞"
  | "形動名詞"
  | "副詞的名詞"
  | "接頭語"
  | "姓名接頭語"
  | "地名接頭語"
  | "接尾語"
  | "姓名接尾語"
  | "地名接尾語"
  | "助数詞"
  | "あわ行五段"
  | "か行五段"
  | "が行五段"
  | "さ行五段"
  | "た行五段"
  | "な行五段"
  | "ば行五段"
  | "ま行五段"
  | "ら行五段"
  | "一段動詞";

/** Tsuduriで利用可能な品詞名 */
export type Wordclass =
  | "普通名詞"
  | "固有名詞"
  | "サ変名詞"
  | "ザ変名詞"
  | "形容詞"
  | "形動名詞"
  | "副詞"
  | "連体詞"
  | "接続詞"
  | "感動詞"
  | "カ行五段動詞"
  | "ガ行五段動詞"
  | "サ行五段動詞"
  | "タ行五段動詞"
  | "ナ行五段動詞"
  | "バ行五段動詞"
  | "マ行五段動詞"
  | "ラ行五段動詞"
  | "ワ行五段動詞"
  | "一段動詞"
  | "短縮よみ"
  | "人名"
  | "人名接頭語"
  | "人名接尾語"
  | "姓"
  | "名"
  | "組織名"
  | "組織名接頭語"
  | "組織名接尾語"
  | "地名"
  | "地名接頭語"
  | "地名接尾語"
  | "数字接頭語"
  | "数字接尾語"
  | "記号"
  | "顔文字"
  | "慣用句";

/**
 * 品詞マッピングの型定義
 */
export type WordclassMapping = {
  /** Tsuduriで利用する品詞 */
  [word in Wordclass]: {
    /** 各IMEの対応品詞 */
    "Google IME": GoogleImeNativeWordclass;
    "macOS IME": MacosImeNativeWordclass;
    "Microsoft IME": MicrosoftImeNativeWordclass;
  };
};
