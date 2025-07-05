// Root of the Reddit API URL, used by fetching methods
export const API_ROOT = 'http://api.reddit.com';

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
