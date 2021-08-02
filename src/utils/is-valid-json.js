/**
 * @params {string} json
 * @returns {boolean}
 */
export function isValidJson(string) {
  if (typeof string !== "string") return false;
  try {
    JSON.parse(string);
    return true;
  } catch (error) {
    return false;
  }
}
