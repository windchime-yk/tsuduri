export type BinaryTarget = {
  target: string;
  label: string;
};

/**
 * 最新のcliリリースのシングルバイナリへの直リンクを組み立てる。
 * Releaseワークフローがcli以外のリリースを--latest=falseで作成するため、
 * releases/latestは常に最新のcliリリースを指す
 * @param target ダウンロード対象のターゲットトリプル
 */
export const binaryDownloadUrl = (target: string): string => {
  const ext = target === "x86_64-pc-windows-msvc" ? ".exe" : "";
  return `https://github.com/windchime-yk/tsuduri/releases/latest/download/tsuduri-${target}${ext}`;
};
