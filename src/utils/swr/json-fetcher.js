/**
 * @param {string} path
 * @returns {string}
 */
export async function jsonFetcher(path) {
  const res = await fetch(path);
  return res.json();
}
