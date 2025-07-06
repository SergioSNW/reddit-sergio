// Root of the Reddit API URL, used by fetching methods
export const API_ROOT = 'https://api.reddit.com';
// Previous URL was https://www.reddit.com
// https://www.reddit.com/r/reddit.com/wiki/api/
// Check previous address for registration in order to use the api

// We are going to need several methods. One for fetching Posts of a Subreddit, Subreddits, Comments.

// Method for fetching Subreddits
export const getSubreddits = async () => {
  const response = await fetch(`${API_ROOT}/subreddits.json`);
  const json = await response.json();

  return json.data.children.map((subreddit) => subreddit.data);
};

// Method for getting Posts within a Subreddit
export const getSubredditPosts = async (subreddit) => {
  const response = await fetch(`${API_ROOT}/${subreddit}.json`);
  const json = await response.json();

  return json.data.children.map((post) => post.data);
};

// Method for getting a post's comments
export const getComments = async (permalink) => {
  const response = await fetch(`${API_ROOT}${permalink}.json`);
  const json = await response.json();

  return json[1].data.children.map((comments) => comments.data);
};

// I want a method for finding a specific Subreddit
export const fetchSubreddit = async (searchTerm) => {
  const response = await fetch(
    `${API_ROOT}/search/.json?q=${searchTerm}&type=sr`
  );
  const json = await response.json();

  return json.data.children.map((element) => element.data);
};
