const clientId = process.env.REDDIT_SERGIO_CLIENT_ID;
const secret = process.env.REDDIT_SERGIO_SECRET;

export const getRedditToken = async () => {
  const credentials = btoa(`${clientId}:${secret}`);
  const response = await fetch('https://www.reddit.com/api/v1/access_token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();
  return data.access_token; // This token will be used in the API requests.
};
