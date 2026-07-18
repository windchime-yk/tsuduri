import { useEffect, useState } from "hono/jsx";
import {
  binaryDownloadUrl,
  type BinaryTarget,
  detectTarget,
} from "../lib/releases.ts";

type Props = {
  targets: BinaryTarget[];
  fallbackUrl: string;
};

/**
 * ヒーロー直下のダウンロードCTA。
 * アクセスした環境のOSを判定してシングルバイナリの直リンクを出し分け、
 * 判定できない場合はリリース一覧ページへリンクする
 */
export default function DownloadCta({ targets, fallbackUrl }: Props) {
  const [label, setLabel] = useState<string | undefined>(undefined);
  const [href, setHref] = useState(fallbackUrl);

  useEffect(() => {
    (async () => {
      const target = await detectTarget();
      if (!target) return;

      const matched = targets.find((binaryTarget) =>
        binaryTarget.target === target
      );
      if (!matched) return;

      setLabel(matched.label);
      setHref(binaryDownloadUrl(target));
    })();
  }, []);

  return (
    <div class="download-cta">
      <a class="download-cta-button" href={href}>
        {label ? `${label} 用にダウンロード` : "ダウンロード"}
      </a>
      <span class="download-cta-other">
        <a href="#download">その他のOS・ダウンロード方法はこちら</a>
      </span>
    </div>
  );
}
