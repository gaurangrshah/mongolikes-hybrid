/**
 * @param {string} path
 * @returns {string}
 */
async function jsonFetcher(path) {
  const res = await fetch(path);
  return res.json();
}
