import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { buildDownloadHtml } from "./download.ts";

describe("ダウンロード用HTMLを組み立てる", () => {
  it("base64とファイル名をJavaScriptの文字列として埋め込む", () => {
    const html = buildDownloadHtml("QUJD", "tsuduri_output.zip");
    expect(html).toContain('var BASE64 = "QUJD";');
    expect(html).toContain('var FILE_NAME = "tsuduri_output.zip";');
  });

  it("引用符を含むファイル名でもスクリプトが壊れない", () => {
    const html = buildDownloadHtml("QUJD", 'my"dict.zip');
    expect(html).toContain('var FILE_NAME = "my\\"dict.zip";');
  });

  it("ダウンロードを起動するボタンを含む", () => {
    const html = buildDownloadHtml("QUJD", "tsuduri_output.zip");
    expect(html).toContain('id="download"');
    expect(html).toContain("addEventListener");
  });

  it("Driveへ保存せずBlobとして扱う", () => {
    const html = buildDownloadHtml("QUJD", "tsuduri_output.zip");
    expect(html).toContain("createObjectURL");
    expect(html).not.toContain("DriveApp");
  });
});
