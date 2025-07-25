import './Home.css';
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import randomNumber from '../../otherFunctions/randomNumber';
import PostLoading from '../Post/PostLoading';
import Post from '../Post/Post';
import {
  fetchPosts,
  setSearchTerm,
  fetchComments,
  toggleShowingComments,
} from '../../store/redditSlice';

const Home = () => {
  const reddit = useSelector((state) => state.reddit);
  const { posts, isLoading, error, searchTerm, selectedSubreddit } = reddit;
  // const posts = useSelector(selectFilteredPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(
      'useEffect running: dispatching fetchPosts for',
      selectedSubreddit
    );
    dispatch(fetchPosts(selectedSubreddit));
  }, [dispatch, selectedSubreddit]);

  // *** FUNCTION TO HANDLE Click events on comments to toggle
  // const onToggleComments = (index) => {
  //   const getComments = (permalink) => {
  //     dispatch(fetchComments(index, permalink));
  //   };

  //   return getComments;
  // };

  // console.log(
  //   'Redux state:',
  //   useSelector((state) => state)
  // );
  // console.log('Home component rendered');

  // console.log('NOW ITS THE HOME.JSX');
  // console.log(`Selected Subreddit: ` + selectedSubreddit);
  // console.log(`Posts:  ${posts}`);

  if (isLoading) {
    return (
      <div>
        <AnimatePresence>
          {Array.from({ length: randomNumber(3, 10) }).map((_, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <PostLoading />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );
  }

  if (error) {
    return (
      <div className="errorDiv">
        <h2>Failed to Load Posts</h2>
        <button
          type="button"
          onClick={() => dispatch(fetchPosts(selectedSubreddit))}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!posts) {
    return (
      <div className="errorDiv">
        <h2>No Posts matching your search "{searchTerm}"</h2>
        <button type="button" onClick={() => dispatch(setSearchTerm(''))}>
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div>
      {posts.map((post, index) => {
        return (
          <Post
            key={post.id}
            post={post}
            onToggleComments={() => {
              if (!post.showingComments && post.comments.length === 0) {
                // Fetches and displays comments if they are not shown or not loaded
                dispatch(fetchComments(post.id, post.permalink));
              } else {
                // If they are shown or loaded, just hide them.
                dispatch(toggleShowingComments(post.id));
              }
            }}
            // onToggleComments={onToggleComments(index)}
          />
        );
      })}
    </div>
  );
};

export default Home;
