export function randomString(min = 2, max = 5) {
  return (
    Math.random().toString(36).substring(min, max) +
    Math.random().toString(36).substring(min, max)
  );
}
