import './Comment.css';
import moment from 'moment';
import Avatar from '../Avatar/Avatar';
import ReactMarkdown from 'react-markdown';

const Comment = (props) => {
  const { comment } = props;

  return (
    <div className="comment">
      <div className="comment-metadata">
        <Avatar name={comment.author} />
        <p className="comment-author">{comment.author}</p>
        <p className="comment-createdAt">
          {moment.unix(comment.created_utc).fromNow()}
        </p>
      </div>
      <ReactMarkdown source={comment.body} />
    </div>
  );
};

export default Comment;
