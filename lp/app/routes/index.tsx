import { css } from "hono/css";
import { createRoute } from "honox/factory";
import BinaryLinks from "../islands/binary-links.tsx";
import DownloadCta from "../islands/download-cta.tsx";

const REPO_URL = "https://github.com/windchime-yk/tsuduri";
const RELEASES_URL = `${REPO_URL}/releases`;

const BINARY_TARGET_LIST = [
  { target: "aarch64-apple-darwin", label: "macOS (Apple Silicon)" },
  { target: "x86_64-apple-darwin", label: "macOS (Intel)" },
  { target: "x86_64-unknown-linux-gnu", label: "Linux (x86_64)" },
  { target: "aarch64-unknown-linux-gnu", label: "Linux (ARM64)" },
  { target: "x86_64-pc-windows-msvc", label: "Windows (x86_64)" },
];

const wrapperClass = css`
  max-width: 52rem;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const heroClass = css`
  padding: 5rem 0 4rem;
  text-align: center;
  border-bottom: 1px solid var(--color-border);

  & h1 {
    font-size: 3rem;
    letter-spacing: 0.35em;
    text-indent: 0.35em;
    font-weight: 600;
  }
`;

const heroSubtitleClass = css`
  margin-top: 1rem;
  font-size: 1.15rem;
  color: var(--color-muted);
`;

const heroDescriptionClass = css`
  margin-top: 2rem;
  text-align: left;
  display: inline-block;
`;

const sectionClass = css`
  padding: 3rem 0;
  border-bottom: 1px solid var(--color-border);

  & h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const imeListClass = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
  gap: 0.75rem;
  list-style: none;

  & li {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    padding: 0.75rem 1rem;
    text-align: center;
  }
`;

const downloadGridClass = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: 1.5rem;
`;

const downloadCardClass = css`
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  padding: 1.5rem;

  & h3 {
    font-size: 1.15rem;
    margin-bottom: 0.75rem;
  }

  & > p {
    color: var(--color-muted);
    font-size: 0.95rem;
    margin-bottom: 1rem;
  }

  & ul {
    list-style: none;
  }

  & li + li {
    margin-top: 0.5rem;
  }
`;

const buttonClass = css`
  display: inline-block;
  background: var(--color-accent);
  color: #fff;
  border-radius: 0.5rem;
  padding: 0.6rem 1.2rem;
  text-decoration: none;
  transition: background 0.2s;

  &:hover {
    background: var(--color-accent-dark);
  }
`;

const noteClass = css`
  margin-top: 1rem;
  font-size: 0.85rem;
  color: var(--color-muted);
`;

const codeBlockClass = css`
  background: #2d2a26;
  color: #f5f2ec;
  border-radius: 0.5rem;
  padding: 1rem 1.25rem;
  overflow-x: auto;
  font-size: 0.9rem;
`;

const footerClass = css`
  padding: 2.5rem 0;
  text-align: center;
  color: var(--color-muted);
  font-size: 0.9rem;
`;

export default createRoute((c) => {
  return c.render(
    <>
      <header class={heroClass}>
        <div class={wrapperClass}>
          <h1>Tsuduri</h1>
          <p class={heroSubtitleClass}>
            ひとつの辞書データから、すべてのIMEユーザー辞書へ。
          </p>
          <p class={heroDescriptionClass}>
            Tsuduri（つづり）は、CSVまたはJSONで管理している辞書データから、
            各IME向けの日本語ユーザー辞書ファイルを一括生成するツールです。
          </p>
          <DownloadCta
            targets={BINARY_TARGET_LIST}
            fallbackUrl={RELEASES_URL}
          />
        </div>
      </header>

      <main>
        <section class={sectionClass}>
          <div class={wrapperClass}>
            <h2>対応IME</h2>
            <ul class={imeListClass}>
              <li>Google 日本語入力</li>
              <li>macOS 日本語IM</li>
              <li>Microsoft IME</li>
              <li>Gboard</li>
            </ul>
          </div>
        </section>

        <section id="download" class={sectionClass}>
          <div class={wrapperClass}>
            <h2>ダウンロード</h2>
            <div class={downloadGridClass}>
              <div class={downloadCardClass}>
                <h3>Excelテンプレート</h3>
                <p>
                  辞書データの管理に使えるテンプレートです。ExcelなどでデータをつくってCSVに書き出せば、そのままTsuduriで変換できます。
                </p>
                <ul>
                  <li>
                    <a
                      class={buttonClass}
                      href={`${REPO_URL}/raw/main/example/input/tsuduri-example.xlsx`}
                    >
                      xlsx形式
                    </a>
                  </li>
                  <li>
                    <a
                      class={buttonClass}
                      href={`${REPO_URL}/raw/main/example/input/tsuduri-example.ods`}
                    >
                      ods形式
                    </a>
                  </li>
                </ul>
              </div>
              <div class={downloadCardClass}>
                <h3>シングルバイナリ</h3>
                <p>
                  Denoのインストール不要で使えるCLIの実行ファイルです。お使いの環境のものをダウンロードしてください。
                </p>
                <BinaryLinks
                  targets={BINARY_TARGET_LIST}
                  fallbackUrl={RELEASES_URL}
                />
                <p class={noteClass}>
                  リンク先が取得できない場合は
                  <a href={RELEASES_URL}>リリース一覧</a>の<code>cli@</code>
                  リリースからダウンロードできます。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section class={sectionClass}>
          <div class={wrapperClass}>
            <h2>Denoで使う</h2>
            <p>
              Denoをお使いの場合は、<a href="https://jsr.io/@tsuduri/cli">
                JSR
              </a>
              からCLIをインストールできます。
            </p>
            <pre class={codeBlockClass}>
              <code>
                deno install -g -RWE --allow-run -n tsuduri jsr:@tsuduri/cli
              </code>
            </pre>
          </div>
        </section>
      </main>

      <footer class={footerClass}>
        <div class={wrapperClass}>
          <p>
            <a href={REPO_URL}>GitHub</a> / MIT License
          </p>
        </div>
      </footer>
    </>,
  );
});
