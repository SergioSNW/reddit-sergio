import { useDispatch, useSelector } from 'react-redux';
import './Subreddits.css';
import { fetchSubreddits, selectSubreddits } from '../../store/subredditSlice';
import {
  selectSelectedSubreddit,
  setSelectedSubreddit,
} from '../../store/redditSlice';
import Card from '../Card/Card';
import { useEffect } from 'react';

const Subreddits = () => {
  const dispatch = useDispatch();
  const subreddits = useSelector(selectSubreddits);
  const selectedSubreddit = useSelector(selectSelectedSubreddit);

  useEffect(() => {
    dispatch(fetchSubreddits());
  }, [dispatch]);

  // console.log(subreddits);

  if (!subreddits) {
    return (
      <div>
        <h2>Subreddits</h2>
        <p>There was some kind of error</p>
      </div>
    );
  }

  return (
    <Card className="subreddit-card">
      <h2>Subreddits</h2>
      <ul className="subreddits-list">
        {subreddits.map((subreddit) => (
          <li
            key={subreddit.id}
            className={`${
              selectedSubreddit === subreddit.url && `selected-subreddit`
            }`}
          >
            <button
              type="button"
              onClick={() => dispatch(setSelectedSubreddit(subreddit.url))}
            >
              <img
                src={
                  subreddit.icon_img ||
                  `https://api.adorable.io/avatars/25/${subreddit.display_name}`
                }
                alt={`${subreddit.display_name}`}
                className="subreddit-icon"
                style={{ border: `3px solid ${subreddit.primary_color} ` }}
              />
              <strong>
                {subreddit.display_name_prefixed ||
                  `r/${subreddit.display_name}`}
              </strong>
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default Subreddits;
