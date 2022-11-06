import { parse } from "https://deno.land/std@0.119.0/flags/mod.ts";

import { getRedirects } from "./mod.ts";

const flags = parse(Deno.args, {
  string: ["baseURL", "changelog", "target"],
});
const baseURL = (flags.baseURL as string) ?? Deno.env.get("URL");

let changelog = "";

try {
  changelog = await Deno.readTextFile(flags.changelog as string);
} catch (error) {
  if (error instanceof Deno.errors.NotFound) {
    console.log("Changelog not found, skipped redirect generation.");

    Deno.exit();
  }

  throw error;
}

const redirects = getRedirects(changelog, baseURL);

await Deno.writeTextFile(flags.target as string, redirects.join("\n"));

console.log(
  `Finished writing ${redirects.length} redirects to ${flags.target}.`
);
