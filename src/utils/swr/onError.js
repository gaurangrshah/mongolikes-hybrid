export function onErrorRetry(error, key, option, revalidate, { retryCount }) {
  if (retryCount >= 10) return;
  if (error.status === 404) return;

  // retry after 5 seconds
  setTimeout(() => revalidate({ retryCount: retryCount + 1 }), 5000);
}
// @link: https://github.com/vercel/swr#error-retries
