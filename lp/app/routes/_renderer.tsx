import { jsxRenderer } from "hono/jsx-renderer";

const CSS = `
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
  font-family: "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Yu Gothic",
    "Noto Sans JP", sans-serif;
  color: var(--color-text);
  background: var(--color-bg);
  line-height: 1.8;
}

a {
  color: var(--color-accent);
}

.wrapper {
  max-width: 52rem;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.hero {
  padding: 5rem 0 4rem;
  text-align: center;
  border-bottom: 1px solid var(--color-border);
}

.hero h1 {
  font-size: 3rem;
  letter-spacing: 0.35em;
  text-indent: 0.35em;
  font-weight: 600;
}

.hero .subtitle {
  margin-top: 1rem;
  font-size: 1.15rem;
  color: var(--color-muted);
}

.hero .description {
  margin-top: 2rem;
  text-align: left;
  display: inline-block;
}

section {
  padding: 3rem 0;
  border-bottom: 1px solid var(--color-border);
}

section h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.ime-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
  gap: 0.75rem;
  list-style: none;
}

.ime-list li {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  text-align: center;
}

.download-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: 1.5rem;
}

.download-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  padding: 1.5rem;
}

.download-card h3 {
  font-size: 1.15rem;
  margin-bottom: 0.75rem;
}

.download-card p {
  color: var(--color-muted);
  font-size: 0.95rem;
  margin-bottom: 1rem;
}

.download-card ul {
  list-style: none;
}

.download-card li + li {
  margin-top: 0.5rem;
}

.button {
  display: inline-block;
  background: var(--color-accent);
  color: #fff;
  border-radius: 0.5rem;
  padding: 0.6rem 1.2rem;
  text-decoration: none;
  transition: background 0.2s;
}

.button:hover {
  background: var(--color-accent-dark);
}

.binary-link {
  color: var(--color-accent);
}

.note {
  margin-top: 1rem;
  font-size: 0.85rem;
  color: var(--color-muted);
}

pre {
  background: #2d2a26;
  color: #f5f2ec;
  border-radius: 0.5rem;
  padding: 1rem 1.25rem;
  overflow-x: auto;
  font-size: 0.9rem;
}

footer {
  padding: 2.5rem 0;
  text-align: center;
  color: var(--color-muted);
  font-size: 0.9rem;
}

footer a {
  color: var(--color-accent);
}
`;

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
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
      </head>
      <body>{children}</body>
    </html>
  );
});
