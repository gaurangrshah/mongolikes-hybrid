import { isValidJson } from "./is-valid-json";

/**
 * @params {string} val1
 * @params {string} val2
 * @returns {boolean}
 */
export function jsonCompare(val1, val2) {
  let compare1, compare2;
  const values = [val1, val2];

  const comparators = values.map((val) =>
    isValidJson(val) ? val : JSON.stringify(val)
  );

  return comparators[0] === comparators[1];
}
