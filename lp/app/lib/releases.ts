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

type NavigatorUAData = {
  getHighEntropyValues?: (
    hints: string[],
  ) => Promise<{ architecture?: string }>;
};

/**
 * アクセスしている環境のOS・アーキテクチャからダウンロード対象のターゲットを判定する。
 * 判定できない場合(スマートフォンなど)はundefinedを返す
 */
export const detectTarget = async (): Promise<string | undefined> => {
  const ua = navigator.userAgent;

  if (/Windows/.test(ua)) return "x86_64-pc-windows-msvc";

  if (/Macintosh|Mac OS X/.test(ua)) {
    // Chromium系はアーキテクチャを取得できる。取得できない場合はApple Siliconを既定にする
    const uaData =
      (navigator as Navigator & { userAgentData?: NavigatorUAData })
        .userAgentData;
    if (uaData?.getHighEntropyValues) {
      try {
        const { architecture } = await uaData.getHighEntropyValues([
          "architecture",
        ]);
        if (architecture === "x86") return "x86_64-apple-darwin";
      } catch {
        // 取得できない場合はApple Silicon扱いにする
      }
    }
    return "aarch64-apple-darwin";
  }

  if (/Linux/.test(ua) && !/Android/.test(ua)) {
    if (/aarch64|arm64/i.test(ua)) return "aarch64-unknown-linux-gnu";
    return "x86_64-unknown-linux-gnu";
  }

  return undefined;
};
