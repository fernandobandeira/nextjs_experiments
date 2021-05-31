You can run the examples locally:

You'll need the latest LTS node.js version or newer as well as yarn installed.

```
yarn
yarn dev
```

## Example 01 - Incremental Static Regeneration

This example is available at: https://nextjs-experiments-xi.vercel.app/nationalize/fernando

Code is here: https://github.com/fernandobandeira/nextjs_experiments/blob/main/pages/nationalize/%5Bname%5D.tsx

You can replace ```fernando``` with your name or another name. This example uses an API to predict the nationality of the name provided.

When someone requests a new name, it'll generate a new page and display a (loading...) indicator. Subsequent requests to the server will return a cached response.

We can also get rid of the loading indicator by forcing the server to fetch and cache it before returning the response to the first user. However, this would increase the initial response time of the website for the first access. (by removing the ``` fallback: true ``` from the ``` getStaticPaths ``` return value).

## Example 02 - Stale While Revalidate

This example is available at: https://nextjs-experiments-xi.vercel.app/bitcoin

Code is here: https://github.com/fernandobandeira/nextjs_experiments/blob/main/pages/bitcoin.tsx

This example caches a stale version of the page for 1 minute. Content is refreshed and cached again after this period.

We're refreshing the data every time the app is back to focus. Meaning that if the user scrolls down and them up again or switches tabs/windows, the content gets refreshed.

One improvement is adding pooling for the data, refetching it after every 60 seconds on the browser. We achieve this by passing a ``` refreshInterval ``` value (in ms) to the useSWR hook.

## Example 03 - Auth

This example is available at: https://nextjs-experiments-xi.vercel.app/login

Protected page available at: https://nextjs-experiments-xi.vercel.app/protected

Code is here: https://github.com/fernandobandeira/nextjs_experiments/blob/main/pages/login.tsx, https://github.com/fernandobandeira/nextjs_experiments/blob/main/pages/protected.tsx

Here we're checking if an authorization cookie gets set. If it's not, we force the user to login to see the protected page.

We're adding a redirect using ``` window.location ``` in the HTML head, the user doesn't have to wait for the react app to load before redirecting to the right place.

If the cookie got tampered (token isn't valid anymore), we catch it during the loading phase and redirect it to the correct location.

Another thing commonly done in this situation is putting a ``` display:none ``` on the page's HTML style and only rendering the content after checking the cookie inside the script tag that we injected in the head tag.

The pattern applied in this example is used on big tech companies, including https://vercel.com/, to achieve a faster speed on their apps.
