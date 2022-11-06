import { parse } from "https://deno.land/std@0.119.0/flags/mod.ts";

import { getRedirects } from "./mod.ts";

const flags = parse(Deno.args, {
  string: ["baseURL", "changelog", "target"],
});
const changelog = await Deno.readTextFile(flags.changelog as string);
const redirects = getRedirects(changelog, flags.baseURL as string);

await Deno.writeTextFile(flags.target as string, redirects);
