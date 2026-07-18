import { run } from "./run.ts";

export { run };

if (import.meta.main) {
  await run(Deno.args);
}
