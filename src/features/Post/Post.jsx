import React, { useState } from 'react';
import './Post.css';
import Skeleton from 'react-loading-skeleton';
import {
  TiArrowUpOutline,
  TiArrowUpThick,
  TiArrowDownOutline,
  TiArrowDownThick,
  TiMessage,
} from 'react-icons/ti';
import moment from 'moment';
import shortenNumber from '../../otherFunctions/shortenNumber';
import Card from '../Card/Card';
import Comment from '../Comment/Comment';
import Avatar from '../Avatar/Avatar';

const Post = (props) => {
  const [voteCounter, setVoteCounter] = useState(0);
  const { post, onToggleComments } = props;

  let newValue;
  const onHandleVote = (newValue) => {
    if (newValue === voteCounter) {
      setVoteCounter(0);
    } else if (newValue === 1) {
      setVoteCounter(1);
    } else {
      setVoteCounter(-1);
    }
  };

  const renderUpVote = () => {
    if (voteCounter === 1) {
      return <TiArrowUpThick className="icon-action" />;
    }
    return <TiArrowUpOutline className="icon-action" />;
  };

  const renderDownVote = () => {
    if (voteCounter === -1) {
      return <TiArrowDownThick className="icon-action" />;
    }
    return <TiArrowDownOutline className="icon-action" />;
  };

  const getVoteType = () => {
    if (voteCounter === 1) {
      return 'up-vote';
    }
    if (voteCounter === -1) {
      return 'down-vote';
    }

    return '';
  };

  const renderComments = () => {
    if (post.renderComments) {
      return (
        <div>
          <h3>Error while loading this Post Comments</h3>
        </div>
      );
    }

    if (post.loadingComments) {
      return (
        <div>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      );
    }

    if (post.showingComments) {
      return (
        <div>
          {post.comments.map((comment) => (
            <Comment comment={comment} key={comment.id} />
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <article key={post.id}>
      <Card>
        <div className="post-wrapper">
          <div className="post-votes-container">
            <button
              type="button"
              className={`icon-action-button up-vote ${
                voteCounter === 1 && 'active'
              }`}
              onClick={() => onHandleVote(1)}
              aria-label="up vote"
            >
              {renderUpVote}
            </button>
            <p className={`post-votes-value ${getVoteType()}`}>
              {shortenNumber(postMessage.ups, 1)}
            </p>
            <button
              type="button"
              className={`icon-action-button down-vote ${
                voteCounter === -1 && 'active'
              }`}
              onClick={() => onHandleVote(-1)}
              aria-label="down vote"
            >
              {renderDownVote}
            </button>
          </div>
          <div className="post-container">
            <h3 className="post-title">{post.title}</h3>
            <div className="post-image-container">
              <img src={post.url} alt="" className="post-image" />
            </div>
            <div className="post-details">
              <span className="author-details">
                <Avatar name={post.author} />
                <span className="author-username">{post.author}</span>
              </span>
              <span>{moment.unix(post.created_utc).fromNow()}</span>
              <span className="post-comments-container">
                <button
                  type="button"
                  className={`icon-action-button ${
                    post.showingComments && 'showing-comments'
                  }`}
                  onClick={() => onToggleComments(post.permalink)}
                  aria-label="show comments"
                >
                  <TiMessage className="icon-action" />
                </button>
                {shortenNumber(post.num_comments, 1)}
              </span>
            </div>
            {renderComments()}
          </div>
        </div>
      </Card>
    </article>
  );
};

export default Post;
