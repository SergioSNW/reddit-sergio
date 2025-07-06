import { createSlice } from '@reduxjs/toolkit';
import { getSubreddits } from '../api/reddit';

const initialState = {
  subreddits: [],
  isLoading: false,
  error: false,
};

const subredditSlice = createSlice({
  name: 'subreddits',
  initialState: initialState,
  reducers: {
    getSubredditsPending(state) {
      state.isLoading = true;
      state.error = false;
    },
    getSubredditsSuccess(state, action) {
      state.subreddits = action.payload;
      state.isLoading = false;
      state.error = false;
    },
    getSubredditsRejected(state) {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const {
  getSubredditsPending,
  getSubredditsSuccess,
  getSubredditsRejected,
} = subredditSlice.actions;

export default subredditSlice.reducer;

// Redux thunk for fetching Subreddits
export const fetchSubreddits = async (dispatch) => {
  try {
    dispatch(getSubredditsPending());
    const subreddits = await getSubreddits();
    dispatch(getSubredditsSuccess(subreddits));
  } catch (error) {
    dispatch(getSubredditsRejected());
  }
};

export const selectSubreddits = (state) => state.subreddits.subreddits;
