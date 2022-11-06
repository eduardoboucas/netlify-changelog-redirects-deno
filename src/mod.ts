import { tokens } from "https://deno.land/x/rusty_markdown@v0.4.1/mod.ts";
import * as semver from "https://deno.land/x/semver@v1.4.1/mod.ts";

function getVersions(changelog: string) {
  const source = tokens(changelog);
  const versions: string[] = [];

  let insideH2 = false;

  source.forEach((item) => {
    if (item.type === "start" && item.tag === "heading" && item.level === 2) {
      insideH2 = true;
    } else if (
      item.type === "end" &&
      item.tag === "heading" &&
      item.level === 2
    ) {
      insideH2 = false;
    }

    if (insideH2 && item.type === "text") {
      const [candidate] = item.content.split(" ");

      if (semver.valid(candidate)) {
        versions.push(candidate);
      }
    }
  });

  return versions.reverse();
}

export function getRedirects(changelog: string, baseURL: string) {
  const url = new URL(baseURL);
  const versions = getVersions(changelog);
  const redirects = versions.map(
    (version) => `/${version}/*  https://v${version}--${url.host}/:splat  200`
  );

  return redirects;
}
