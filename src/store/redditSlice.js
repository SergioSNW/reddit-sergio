import { createSlice } from '@reduxjs/toolkit';
import { getComments, getSubredditPosts } from '../api/reddit';

const initialState = {
  posts: [],
  error: false,
  isLoading: false,
  searchTerm: '',
  selectedSubreddit: '/r/gshock/',
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
      state.posts[action.payload].showingComments =
        !state.posts[action.payload].showingComments;
      if (!state.posts[action.payload].showingComments) {
        return;
      }
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
