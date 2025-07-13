import './Comment.css';
import moment from 'moment';
import Avatar from '../Avatar/Avatar';
import ReactMarkdown from 'react-markdown';

const Comment = (props) => {
  const { comment } = props;

  // Before the {comment.body} was the only thing within the <ReactMarkdown></ReactMarkdown>
  // and it was affecting the style of the comments and all previews. This way feels more Reddity.
  return (
    <div className="comment">
      <div className="comment-metadata">
        <Avatar name={comment.author} />
        <p className="comment-author">{comment.author}</p>
        <p className="comment-createdAt">
          {moment.unix(comment.created_utc).fromNow()}
        </p>
      </div>
      <ReactMarkdown
        components={{
          a: ({ href, children }) =>
            /\.(jpeg|jpg|gif|png|webp|svg)$/i.test(href) ? (
              <img
                src={href}
                alt=""
                style={{
                  maxWidth: '100%',
                  borderRadius: '8px',
                  margin: '8px 0',
                }}
              />
            ) : (
              <a href={href} target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            ),
        }}
      >
        {comment.body}
      </ReactMarkdown>
    </div>
  );
};

export default Comment;
