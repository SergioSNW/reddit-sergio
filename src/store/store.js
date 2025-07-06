import { configureStore, combineReducers } from '@reduxjs/toolkit';
import redditReducer from './redditSlice';
import subredditReducer from './subredditSlice';

// I am starting with the initial idea of the solution, which is separating into 2
// Slices and reducers, to me seems alien to separate between reddit and subreddit.
// I understand that reddit is complex and manages everything basically. I will be
// expanding to a third reducer for the search when I am more confident.
export default configureStore({
  reducer: combineReducers({
    reddit: redditReducer,
    subreddits: subredditReducer,
  }),
});
