// GASが実行対象として認識できるよう、バンドルの後ろに連結されるトップレベル関数定義

// deno-lint-ignore no-unused-vars
function onOpen() {
  return globalThis.tsuduri.onOpen();
}

// deno-lint-ignore no-unused-vars
function generateDictionaryFiles() {
  return globalThis.tsuduri.generateDictionaryFiles();
}
