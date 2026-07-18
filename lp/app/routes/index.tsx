import { createRoute } from "honox/factory";

const REPO_URL = "https://github.com/windchime-yk/tsuduri";
const RELEASES_URL = `${REPO_URL}/releases`;

const BINARY_TARGET_LIST = [
  { target: "aarch64-apple-darwin", label: "macOS (Apple Silicon)" },
  { target: "x86_64-apple-darwin", label: "macOS (Intel)" },
  { target: "x86_64-unknown-linux-gnu", label: "Linux (x86_64)" },
  { target: "aarch64-unknown-linux-gnu", label: "Linux (ARM64)" },
  { target: "x86_64-pc-windows-msvc", label: "Windows (x86_64)" },
];

// 最新のcliリリースからシングルバイナリの直接ダウンロードURLを取得してリンクを書き換える。
// 取得できない場合はリリース一覧ページへの静的リンクのまま利用する
const RESOLVE_BINARY_LINKS_SCRIPT = `
(async () => {
  try {
    const response = await fetch(
      "https://api.github.com/repos/windchime-yk/tsuduri/releases?per_page=20",
    );
    if (!response.ok) return;
    const releases = await response.json();
    const cliRelease = releases.find((release) =>
      release.tag_name.startsWith("cli@") && release.assets.length > 0
    );
    if (!cliRelease) return;
    for (const anchor of document.querySelectorAll("[data-binary-target]")) {
      const asset = cliRelease.assets.find((asset) =>
        asset.name.includes(anchor.dataset.binaryTarget)
      );
      if (asset) anchor.href = asset.browser_download_url;
    }
  } catch {
    // ネットワークエラー時は静的リンクのまま
  }
})();
`;

export default createRoute((c) => {
  return c.render(
    <>
      <header class="hero">
        <div class="wrapper">
          <h1>Tsuduri</h1>
          <p class="subtitle">
            ひとつの辞書データから、すべてのIMEユーザー辞書へ。
          </p>
          <p class="description">
            Tsuduri（つづり）は、CSVまたはJSONで管理している辞書データから、
            各IME向けの日本語ユーザー辞書ファイルを一括生成するツールです。
          </p>
        </div>
      </header>

      <main>
        <section>
          <div class="wrapper">
            <h2>対応IME</h2>
            <ul class="ime-list">
              <li>Google 日本語入力</li>
              <li>macOS 日本語IM</li>
              <li>Microsoft IME</li>
              <li>Gboard</li>
            </ul>
          </div>
        </section>

        <section>
          <div class="wrapper">
            <h2>ダウンロード</h2>
            <div class="download-grid">
              <div class="download-card">
                <h3>Excelテンプレート</h3>
                <p>
                  辞書データの管理に使えるテンプレートです。ExcelなどでデータをつくってCSVに書き出せば、そのままTsuduriで変換できます。
                </p>
                <ul>
                  <li>
                    <a
                      class="button"
                      href={`${REPO_URL}/raw/main/example/input/tsuduri-example.xlsx`}
                    >
                      xlsx形式
                    </a>
                  </li>
                  <li>
                    <a
                      class="button"
                      href={`${REPO_URL}/raw/main/example/input/tsuduri-example.ods`}
                    >
                      ods形式
                    </a>
                  </li>
                </ul>
              </div>
              <div class="download-card">
                <h3>シングルバイナリ</h3>
                <p>
                  Denoのインストール不要で使えるCLIの実行ファイルです。お使いの環境のものをダウンロードしてください。
                </p>
                <ul>
                  {BINARY_TARGET_LIST.map(({ target, label }) => (
                    <li>
                      <a
                        class="binary-link"
                        data-binary-target={target}
                        href={RELEASES_URL}
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
                <p class="note">
                  リンク先が取得できない場合は
                  <a href={RELEASES_URL}>リリース一覧</a>の<code>cli@</code>
                  リリースからダウンロードできます。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div class="wrapper">
            <h2>Denoで使う</h2>
            <p>
              Denoをお使いの場合は、<a href="https://jsr.io/@tsuduri/cli">
                JSR
              </a>
              からCLIをインストールできます。
            </p>
            <pre>
              <code>
                deno install -g -RWE --allow-run -n tsuduri jsr:@tsuduri/cli
              </code>
            </pre>
          </div>
        </section>
      </main>

      <footer>
        <div class="wrapper">
          <p>
            <a href={REPO_URL}>GitHub</a> / MIT License
          </p>
        </div>
      </footer>

      <script
        dangerouslySetInnerHTML={{ __html: RESOLVE_BINARY_LINKS_SCRIPT }}
      />
    </>,
  );
});
