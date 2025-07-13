import { getRedditToken } from '../otherFunctions/getRedditToken';
// Root of the Reddit API URL, used by fetching methods
export const API_ROOT = 'https://oauth.reddit.com';
// Previous URL was https://www.reddit.com
// https://www.reddit.com/r/reddit.com/wiki/api/
// Check previous address for registration in order to use the api
const USER_AGENT = 'sergio-client/0.1 by SergioTom';

// We are going to need several methods. One for fetching Posts of a Subreddit, Subreddits, Comments.

// console.log('Reddit posts JSON:', json);

// Method for fetching Subreddits
export const getSubreddits = async () => {
  const token = await getRedditToken();
  const response = await fetch(`${API_ROOT}/subreddits.json`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'User-Agent': USER_AGENT,
    },
  });
  const json = await response.json();
  console.log(json);
  console.log('Hello, this is getSubreddits async method from reddit.js.');
  console.log(json.data.children.map((subreddit) => subreddit.data));
  return json.data.children.map((subreddit) => subreddit.data);
};

// Method for getting Posts within a Subreddit
export const getSubredditPosts = async (subreddit) => {
  try {
    const token = await getRedditToken();
    const response = await fetch(`${API_ROOT}/${subreddit}.json`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'User-Agent': USER_AGENT,
      },
    });

    const json = await response.json();
    console.log(
      'Hello, this is getSubredditPosts async method from reddit.js.'
    );
    return json.data.children.map((post) => post.data);
  } catch (err) {
    console.error('Failed to fetch posts: ', err);
    return [];
  }
};

// Method for getting a post's comments
export const getComments = async (permalink) => {
  console.log('API call to Reddit comments:', permalink);
  const token = await getRedditToken();
  const response = await fetch(`${API_ROOT}${permalink}.json`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'User-Agent': USER_AGENT,
    },
  });
  const json = await response.json();
  console.log('Hello, this is getComments async method from reddit.js.');
  return json[1].data.children.map((comments) => comments.data);
};

// *************** MY ORIGINAL METHOD FOR THE SEARCH BAR ***********************
// ********************** NOT IN USE NOW ***************************************
// export const fetchSubreddit = async (searchTerm) => {
//   const token = await getRedditToken();
//   const response = await fetch(
//     `${API_ROOT}/search/.json?q=${searchTerm}&type=sr`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'User-Agent': USER_AGENT,
//       },
//     }
//   );
//   const json = await response.json();
//   console.log('Hello, this is fetchSubreddits async method from reddit.js.');
//   return json.data.children.map((element) => element.data);
// };

// ******** AUTOCOMPLETE REDDIT OWN ROUTE ***********
// export async function fetchSubredditSuggestions(query) {
//   const token = await getRedditToken();
//   const response = await fetch(`${API_ROOT}/api/search_reddit_names`, {
//     method: 'POST',
//     headers: {
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ query }),
//   });
//   if (!response.ok) return [];
//   const data = await response.json();
//   return data.names || [];
// };

export async function fetchSubredditSuggestions(query) {
  const response = await fetch('http://localhost:5050/api/search-subreddits', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });
  if (!response.ok) return [];
  const data = await response.json();
  return data.names || [];
}
