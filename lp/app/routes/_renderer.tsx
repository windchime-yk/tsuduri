import { css, Style } from "hono/css";
import { jsxRenderer } from "hono/jsx-renderer";

export default jsxRenderer(({ children }) => {
  return (
    <html lang="ja">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* アイコンなしの方針のため、favicon.icoへのリクエストを抑止する */}
        <link rel="icon" href="data:," />
        <title>Tsuduri - IMEユーザー辞書ジェネレーター</title>
        <meta
          name="description"
          content="TsuduriはCSV/JSONの辞書データからGoogle日本語入力・macOS日本語IM・Microsoft IME・Gboard向けのユーザー辞書を一括生成するツールです。"
        />
        <Style>
          {css`
            :root {
              --color-text: #2d2a26;
              --color-bg: #faf8f5;
              --color-accent: #8a2b2b;
              --color-accent-dark: #6e2222;
              --color-border: #e2ddd5;
              --color-surface: #ffffff;
              --color-muted: #6f6a62;
            }

            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }

            body {
              font-family: "Hiragino Sans", "Hiragino Kaku Gothic ProN",
                "Yu Gothic", "Noto Sans JP", sans-serif;
              color: var(--color-text);
              background: var(--color-bg);
              line-height: 1.8;
            }

            a {
              color: var(--color-accent);
            }

            /* islandsコンポーネント(binary-links)から参照するためグローバルに定義する */
            .binary-link {
              color: var(--color-accent);
            }
          `}
        </Style>
        {/* islandsをハイドレーションするクライアントスクリプト */}
        {import.meta.env.PROD
          ? <script type="module" src="/static/client.js"></script>
          : <script type="module" src="/app/client.ts"></script>}
      </head>
      <body>{children}</body>
    </html>
  );
});
