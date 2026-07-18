import { useEffect, useState } from "hono/jsx";

type BinaryTarget = {
  target: string;
  label: string;
};

type Props = {
  targets: BinaryTarget[];
  fallbackUrl: string;
};

type ReleaseAsset = {
  name: string;
  browser_download_url: string;
};

type Release = {
  tag_name: string;
  assets: ReleaseAsset[];
};

/**
 * シングルバイナリのダウンロードリンク一覧。
 * 静的にはリリース一覧ページへリンクし、表示時にGitHub APIから
 * 最新のcli@リリースのアセット直リンクへ差し替える
 */
export default function BinaryLinks({ targets, fallbackUrl }: Props) {
  const [assetUrls, setAssetUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://api.github.com/repos/windchime-yk/tsuduri/releases?per_page=20",
        );
        if (!response.ok) return;
        const releases: Release[] = await response.json();
        const cliRelease = releases.find((release) =>
          release.tag_name.startsWith("cli@") && release.assets.length > 0
        );
        if (!cliRelease) return;

        const urls: Record<string, string> = {};
        for (const { target } of targets) {
          const asset = cliRelease.assets.find((asset) =>
            asset.name.includes(target)
          );
          if (asset) urls[target] = asset.browser_download_url;
        }
        setAssetUrls(urls);
      } catch {
        // 取得できない場合はリリース一覧ページへの静的リンクのまま
      }
    })();
  }, []);

  return (
    <ul>
      {targets.map(({ target, label }) => (
        <li>
          <a class="binary-link" href={assetUrls[target] ?? fallbackUrl}>
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
}
