export function renderSearch(results: any[]) {
  return "SEARCH\n\n" + results.map((r) => `> ${r.title}`).join("\n");
}