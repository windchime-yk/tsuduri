/**
 * 生成したzipをダイアログからダウンロードさせるHTMLを組み立てる。
 * Driveへ保存せずブラウザへ直接渡すことで、制限付きスコープのDrive権限を不要にしている
 * @param base64 zipファイルをbase64エンコードした文字列
 * @param fileName ダウンロード時のファイル名
 * @returns ダイアログに表示するHTML
 */
export const buildDownloadHtml = (
  base64: string,
  fileName: string,
): string =>
  `<!DOCTYPE html>
<style>
  body {
    margin: 0;
    padding: 16px;
    font-family: sans-serif;
    font-size: 13px;
  }
  button {
    padding: 8px 16px;
    font-size: 13px;
    cursor: pointer;
  }
</style>
<p>ユーザー辞書ファイルを生成しました。</p>
<button type="button" id="download">ダウンロード</button>
<script>
  var BASE64 = ${JSON.stringify(base64)};
  var FILE_NAME = ${JSON.stringify(fileName)};

  // サンドボックス内のiframeではクリック操作を伴わないダウンロードが妨げられるため、ボタン押下を起点にする
  document.getElementById("download").addEventListener("click", function () {
    var binary = atob(BASE64);
    var bytes = new Uint8Array(binary.length);
    for (var index = 0; index < binary.length; index++) {
      bytes[index] = binary.charCodeAt(index);
    }

    var url = URL.createObjectURL(
      new Blob([bytes], { type: "application/zip" }),
    );
    var anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = FILE_NAME;
    anchor.click();
    URL.revokeObjectURL(url);
  });
</script>
`;
