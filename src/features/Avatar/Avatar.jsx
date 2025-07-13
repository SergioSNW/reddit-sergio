import './Avatar.css';

const Avatar = (props) => {
  const { name } = props;

  return (
    <img
      src={`https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(
        name
      )}`}
      alt={`${name}'s profile avatar`}
      className="avatar-profile-image"
    />
  );
};

export default Avatar;
