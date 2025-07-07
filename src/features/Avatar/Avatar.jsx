import './Avatar.css';

const Avatar = (props) => {
  const { name } = props;

  return (
    <img
      src={`https://api.adorable.io/avatars/10/${name}`}
      alt={`${name}'s profile avatar`}
      className="avatar-profile-image"
    />
  );
};

export default Avatar;
