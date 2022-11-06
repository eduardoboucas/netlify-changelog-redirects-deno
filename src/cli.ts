import { parse } from "https://deno.land/std@0.119.0/flags/mod.ts";

import { getRedirects } from "./mod.ts";

const flags = parse(Deno.args, {
  string: ["baseURL", "changelog", "target"],
});
const baseURL = (flags.baseURL as string) ?? Deno.env.get("URL");
const changelog = await Deno.readTextFile(flags.changelog as string);
const redirects = getRedirects(changelog, baseURL);

await Deno.writeTextFile(flags.target as string, redirects);
