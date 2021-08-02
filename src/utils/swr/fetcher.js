export async function fetcher(...args) {
  const [url, token] = args;
  const [name, value] = token.split("");
  const res = await fetch(`${url}?${name}=${value}`);
  return res.json();
}

// @link: https://laptrinhx.com/data-fetching-in-react-and-next-js-with-useswr-to-impress-your-friends-at-parties-687608872/
