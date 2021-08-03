/**
 * @param {string} path
 * @returns {string}
 */
export async function jsonFetcher(...args) {
  const res = await fetch(...args);
  return res.json();
}
