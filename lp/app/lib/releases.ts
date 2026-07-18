export type BinaryTarget = {
  target: string;
  label: string;
};

type ReleaseAsset = {
  name: string;
  browser_download_url: string;
};

type Release = {
  tag_name: string;
  assets: ReleaseAsset[];
};

let binaryUrlsCache: Promise<Record<string, string>> | undefined;

/**
 * 最新のcli@リリースからシングルバイナリのターゲット別ダウンロードURLを取得する。
 * 複数のislandsから呼ばれても、取得は1回だけ行う
 */
export const fetchBinaryUrls = (): Promise<Record<string, string>> => {
  binaryUrlsCache ??= (async () => {
    try {
      const response = await fetch(
        "https://api.github.com/repos/windchime-yk/tsuduri/releases?per_page=20",
      );
      if (!response.ok) return {};
      const releases: Release[] = await response.json();
      const cliRelease = releases.find((release) =>
        release.tag_name.startsWith("cli@") && release.assets.length > 0
      );
      if (!cliRelease) return {};

      const urls: Record<string, string> = {};
      for (const asset of cliRelease.assets) {
        // アセット名は tsuduri-<target>[.exe] 形式
        const target = asset.name.replace(/^tsuduri-/, "").replace(
          /\.exe$/,
          "",
        );
        urls[target] = asset.browser_download_url;
      }
      return urls;
    } catch {
      // 取得できない場合はフォールバックリンクのまま
      return {};
    }
  })();
  return binaryUrlsCache;
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
