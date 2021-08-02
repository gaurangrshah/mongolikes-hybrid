/**
 * @params {array} array - array of objects to flatten
 * @params {string} key - key to flatten on
 * @returns {array} - of objects
 */
export function flattenObjects(arr, key = "label") {
  if (!arr?.length) throw new Error("cannot flatten", JSON.stringify(arr));
  const object = arr?.reduce(
    (obj, item) => Object.assign(obj, { [item[key]]: item.value }),
    {}
  );
  return object;
}
