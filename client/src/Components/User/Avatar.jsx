import PropTypes from "prop-types";
import Avvvatars from "avvvatars-react";

const Avatar = ({ user }) => {
  return (
    <div>
      <div className="avatar flex flex-col">
        <div className="w-20 rounded-full">
          {user?.profileImageURL ? (
            <img src={user.profileImageURL}></img>
          ) : (
            <Avvvatars value={user?.fullName} size={80} />
          )}
        </div>
        <div>{user?.fullName}</div>
      </div>
    </div>
  );
};

Avatar.propTypes = {
  user: PropTypes.shape({
    profileImageURL: PropTypes.string,
    fullName: PropTypes.string,
  }),
};

export default Avatar;
