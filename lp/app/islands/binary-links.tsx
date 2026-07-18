import { useEffect, useState } from "hono/jsx";
import { type BinaryTarget, fetchBinaryUrls } from "../lib/releases.ts";

type Props = {
  targets: BinaryTarget[];
  fallbackUrl: string;
};

/**
 * シングルバイナリのダウンロードリンク一覧。
 * 静的にはリリース一覧ページへリンクし、表示時にGitHub APIから
 * 最新のcli@リリースのアセット直リンクへ差し替える
 */
export default function BinaryLinks({ targets, fallbackUrl }: Props) {
  const [assetUrls, setAssetUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchBinaryUrls().then(setAssetUrls);
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
