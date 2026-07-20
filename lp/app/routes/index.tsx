import { css } from "hono/css";
import { createRoute } from "honox/factory";
import { binaryDownloadUrl } from "../lib/releases.ts";

const REPO_URL = "https://github.com/windchime-yk/tsuduri";
const RELEASES_URL = `${REPO_URL}/releases`;
const TEMPLATE_COPY_URL =
  "https://docs.google.com/spreadsheets/d/1I2lEn7Df3eR4It2JvW2eUBNTeIDqphdmvFMvBd5xpd4/copy";

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

const heroCtaClass = css`
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.9rem;
`;

const heroCtaButtonClass = css`
  display: inline-block;
  background: var(--color-accent);
  color: #fff;
  border-radius: 0.5rem;
  padding: 0.85rem 2rem;
  font-size: 1.05rem;
  text-decoration: none;
  transition: background 0.2s;

  &:hover {
    background: var(--color-accent-dark);
  }
`;

const heroCtaSubClass = css`
  font-size: 0.9rem;

  & a {
    color: var(--color-muted);
  }
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

const stepsClass = css`
  list-style: none;
  counter-reset: step;
  display: grid;
  gap: 1.25rem;

  & li {
    position: relative;
    padding-left: 3rem;
    counter-increment: step;
  }

  & li::before {
    content: counter(step);
    position: absolute;
    left: 0;
    top: 0.1rem;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-accent);
    color: #fff;
    border-radius: 50%;
    font-size: 0.95rem;
  }

  & li strong {
    display: block;
    margin-bottom: 0.1rem;
  }

  & li span {
    color: var(--color-muted);
    font-size: 0.95rem;
  }
`;

const formatTableClass = css`
  margin-top: 1.75rem;
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;

  & caption {
    text-align: left;
    color: var(--color-muted);
    font-size: 0.9rem;
    margin-bottom: 0.75rem;
  }

  & th,
  & td {
    border: 1px solid var(--color-border);
    padding: 0.5rem 0.75rem;
    text-align: left;
  }

  & th {
    background: var(--color-surface);
    white-space: nowrap;
  }

  & code {
    font-size: 0.9em;
  }
`;

const subNoteClass = css`
  margin-top: 1.75rem;
  padding: 1rem 1.25rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  font-size: 0.9rem;
  color: var(--color-muted);
`;

const sectionLeadClass = css`
  margin-bottom: 2rem;
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
            Tsuduri（つづり）は、Googleスプレッドシートで管理している辞書データから、
            各IME向けの日本語ユーザー辞書ファイルをボタンひとつで一括生成できるツールです。
            インストールは不要。テンプレートをコピーするだけで使えます。
          </p>
          <div class={heroCtaClass}>
            <a class={heroCtaButtonClass} href={TEMPLATE_COPY_URL}>
              スプレッドシートテンプレートをコピー
            </a>
            <span class={heroCtaSubClass}>
              <a href="#cli">コマンドライン（CLI）で使いたい方はこちら</a>
            </span>
          </div>
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

        <section class={sectionClass}>
          <div class={wrapperClass}>
            <h2>スプレッドシートで使う</h2>
            <p class={sectionLeadClass}>
              Googleスプレッドシートで辞書を管理すれば、インストールやコマンド操作は一切不要。
              メニューのボタンひとつで、全対応IMEのユーザー辞書をまとめて生成できます。
            </p>
            <ol class={stepsClass}>
              <li>
                <strong>テンプレートをコピーする</strong>
                <span>
                  下のボタンからテンプレートを開き、「コピーを作成」で自分のGoogle
                  Driveに保存します。
                </span>
              </li>
              <li>
                <strong>辞書データを入力する</strong>
                <span>
                  シートに登録したい単語を追記します。列の形式はテンプレートにあらかじめ用意されています。
                </span>
              </li>
              <li>
                <strong>メニューから生成する</strong>
                <span>
                  スプレッドシート上部のメニュー「Tsuduri」→「ユーザー辞書ファイルを生成」を実行します。
                </span>
              </li>
              <li>
                <strong>zipをダウンロードする</strong>
                <span>
                  全対応IMEのユーザー辞書をまとめた<code>tsuduri_output.zip</code>
                  が作られ、そのままダウンロードできます。
                </span>
              </li>
            </ol>

            <div class={heroCtaClass}>
              <a class={heroCtaButtonClass} href={TEMPLATE_COPY_URL}>
                スプレッドシートテンプレートをコピー
              </a>
            </div>

            <table class={formatTableClass}>
              <caption>スプレッドシートの列（1行目をヘッダー行にします）</caption>
              <thead>
                <tr>
                  <th>列名</th>
                  <th>説明</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>type</code>
                  </td>
                  <td>品詞</td>
                </tr>
                <tr>
                  <td>
                    <code>word</code>
                  </td>
                  <td>対象文言</td>
                </tr>
                <tr>
                  <td>
                    <code>reading</code>
                  </td>
                  <td>読み方</td>
                </tr>
                <tr>
                  <td>
                    <code>isSuppress</code>
                  </td>
                  <td>抑制単語かどうか（YES / NO）</td>
                </tr>
                <tr>
                  <td>
                    <code>isSuggest</code>
                  </td>
                  <td>サジェストのみに表示するか（YES / NO）</td>
                </tr>
                <tr>
                  <td>
                    <code>description</code>
                  </td>
                  <td>対象文言についての説明</td>
                </tr>
              </tbody>
            </table>

            <p class={subNoteClass}>
              生成したファイルはGoogle
              Driveには保存されません。スクリプトが要求するのはスプレッドシートの読み取りとダイアログ表示だけで、Driveへのアクセス権限は求めません。
            </p>
          </div>
        </section>

        <section id="cli" class={sectionClass}>
          <div class={wrapperClass}>
            <h2>CLIで使う</h2>
            <p class={sectionLeadClass}>
              コマンドラインで一括生成したい方や、CSV /
              JSONで辞書を管理している方向けです。お使いの環境の実行ファイルをダウンロードするか、Denoからインストールしてください。
            </p>
            <div id="download" class={downloadGridClass}>
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
                <ul>
                  {BINARY_TARGET_LIST.map(({ target, label }) => (
                    <li>
                      <a class="binary-link" href={binaryDownloadUrl(target)}>
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
                <p class={noteClass}>
                  うまくダウンロードできない場合は
                  <a href={RELEASES_URL}>リリース一覧</a>の<code>cli@</code>
                  リリースからダウンロードできます。
                </p>
              </div>
            </div>

            <h3 class={css`margin-top: 2.5rem; margin-bottom: 0.75rem;`}>
              Denoで使う
            </h3>
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
