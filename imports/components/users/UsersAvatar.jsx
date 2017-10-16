import { registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import Users from 'meteor/vulcan:users';
import { Link } from 'react-router';
import classNames from 'classnames';

const UsersAvatar = ({className, user, link}) => {
  const gravatarUrl = user.avatarUrl || Users.avatar.getGravatarUrl(user);

  let avatar;
  if (Users.isGuest(user)) {
    avatar = <img className="avatar-image" src={Users.avatar.options.defaultImageUrl} title="Guest"/>;
  } else if (gravatarUrl) {
    avatar = <img alt={Users.getDisplayName(user)} className="avatar-image" src={gravatarUrl} title={user.username}/>;
  } else {
    avatar = <span className="avatar-initials"><span>{Users.avatar.getInitials(user) || '?'}</span></span>;
  }

  const url = Users.getProfileUrl(user);

  return (
    <div className={classNames('avatar', className)}>
      {link && url ?
        <Link to={url}>
          <span>{avatar}</span>
        </Link>
        : <span>{avatar}</span>
      }
    </div>
  );

}

UsersAvatar.propTypes = {
  user: PropTypes.object.isRequired,
  size: PropTypes.string,
  link: PropTypes.bool
}

UsersAvatar.defaultProps = {
  size: 'medium',
  link: true
}

UsersAvatar.displayName = 'UsersAvatar';

registerComponent('UsersAvatar', UsersAvatar);
