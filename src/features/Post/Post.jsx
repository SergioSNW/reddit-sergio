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
};

export default Post;
