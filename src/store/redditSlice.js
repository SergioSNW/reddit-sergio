import { createSlice, createSelector } from '@reduxjs/toolkit';
import { getComments, getSubredditPosts } from '../api/reddit';

const initialState = {
  posts: [],
  error: false,
  isLoading: false,
  searchTerm: '',
  selectedSubreddit: 'r/gshock',
};

const redditSlice = createSlice({
  name: 'redditPosts',
  initialState: initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    getPostsPending(state) {
      state.isLoading = true;
      state.error = false;
    },
    getPostsSuccess(state, action) {
      state.posts = action.payload;
      state.isLoading = false;
      state.error = false;
    },
    getPostsRejected(state) {
      state.isLoading = false;
      state.error = true;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setSelectedSubreddit(state, action) {
      state.selectedSubreddit = action.payload;
      state.searchTerm = '';
    },
    toggleShowingComments(state, action) {
      state.posts[action.payload].showingComments =
        !state.posts[action.payload].showingComments;
    },
    getCommentsPending(state, action) {
      // If comments are hidden, we return.
      // state.posts[action.payload].showingComments =
      //   !state.posts[action.payload].showingComments;
      // if (!state.posts[action.payload].showingComments) {
      //   return;
      // }
      state.posts[action.payload].showingComments = true; /// new line instead of the block above
      state.posts[action.payload].loadingComments = true;
      state.posts[action.payload].error = false;
    },
    getCommentsSuccess(state, action) {
      state.posts[action.payload].comments = action.payload.comments;
      state.posts[action.payload].loadingComments = false;
      state.posts[action.payload].error = false;
    },
    getCommentsRejected(state, action) {
      state.posts[action.payload].loadingComments = false;
      state.posts[action.payload].error = true;
      state.posts[action.payload].showingComments = false; /// Optional due to block commented on pending.
    },
  },
});

export const {
  setPosts,
  getPostsPending,
  getPostsSuccess,
  getPostsRejected,
  setSearchTerm,
  setSelectedSubreddit,
  toggleShowingComments,
  getCommentsPending,
  getCommentsSuccess,
  getCommentsRejected,
} = redditSlice.actions;

export default redditSlice.reducer;

// Redux thunks for getting posts, comments,
export const fetchPosts = (subreddit) => async (dispatch) => {
  try {
    dispatch(getPostsPending());
    console.log('fetchPosts thunk called with:', subreddit);
    const posts = await getSubredditPosts(subreddit);
    console.log('fetchPosts thunk got posts:', posts);
    // We need to add extra fields for showing the comments of the Posts.
    // This is done here due to needing to call another API endpoint to display
    // the comments.
    // *********** NEW CONCEPT FOR ME ***************
    // We update the object of a post with more fields on the go?
    const postsWithMetaData = posts.map((post) => ({
      ...post,
      showingComments: false,
      comments: [],
      loadingComments: false,
      errorComments: false,
    }));
    dispatch(getPostsSuccess(postsWithMetaData));
  } catch (error) {
    console.error('fetchPosts thunk error:', error);
    dispatch(getPostsRejected());
  }
};

export const fetchComments = (index, permalink) => async (dispatch) => {
  try {
    dispatch(getCommentsPending(index));
    console.log('Fetching comments for:', permalink, 'at index:', index);
    const comments = await getComments(permalink);
    console.log('Fetched comments:', comments);

    dispatch(getCommentsSuccess({ index, comments }));
  } catch (error) {
    console.error('Error fetching comments:', error);
    dispatch(getCommentsRejected(index));
  }
};

// ****** Still need to understand this. never saw it in lessons ******
const selectPosts = (state) => state.reddit.posts;
const selectSearchTerm = (state) => state.reddit.searchTerm;
export const selectSelectedSubreddit = (state) =>
  state.reddit.selectedSubreddit;

// This function does the selecting posts rendered on the screen depending on the
// search term of the input field.
export const selectFilteredPosts = createSelector(
  [selectPosts, selectSearchTerm],
  (posts, searchTerm) => {
    if (searchTerm !== '') {
      return posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }
);
