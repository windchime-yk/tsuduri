/// <reference types="npm:@types/google-apps-script@^2.0.11" />

import {
  convertJsonToTextData,
  encodeDictionaryText,
  type ImeType,
  isValidJson,
} from "@tsuduri/core";
import { sheetValuesToRecords, toSignedBytes } from "./convert.ts";
import { buildDownloadHtml } from "./download.ts";

const IME_TYPE_LIST: ImeType[] = [
  "Google IME",
  "macOS IME",
  "Microsoft IME",
  "GBoard",
];
const OUTPUT_ARCHIVE_NAME = "tsuduri_output.zip";

/** スプレッドシートを開いたときにTsuduriメニューを追加する */
export const onOpen = (): void => {
  SpreadsheetApp.getUi()
    .createMenu("Tsuduri")
    .addItem("ユーザー辞書ファイルを生成", "generateDictionaryFiles")
    .addToUi();
};

/** アクティブなシートの辞書データから全IME向けのユーザー辞書ファイルを生成し、zipにまとめてダイアログからダウンロードさせる */
export const generateDictionaryFiles = (): void => {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const records = sheetValuesToRecords(sheet.getDataRange().getValues());
  const isValidJsonResult = isValidJson(records);

  if (!isValidJsonResult.success) throw isValidJsonResult.error;

  const blobs = IME_TYPE_LIST.map((imeType) => {
    const textData = convertJsonToTextData(isValidJsonResult.result, imeType);
    return Utilities.newBlob(
      toSignedBytes(encodeDictionaryText(textData, imeType)),
      "text/plain",
      `${sheet.getName()}-${imeType.toLowerCase().replace(" ", "")}.txt`,
    );
  });

  const archive = Utilities.zip(blobs, OUTPUT_ARCHIVE_NAME);
  const dialog = HtmlService
    .createHtmlOutput(
      buildDownloadHtml(
        Utilities.base64Encode(archive.getBytes()),
        OUTPUT_ARCHIVE_NAME,
      ),
    )
    .setWidth(320)
    .setHeight(140);

  SpreadsheetApp.getUi().showModalDialog(dialog, "Tsuduri");
};

Object.assign(globalThis, { tsuduri: { onOpen, generateDictionaryFiles } });
