import Users from 'meteor/vulcan:users';

Users.avatar.setOptions({
  "gravatarDefault": "mm",
  "defaultImageUrl": "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&f=y"
});

import { AccountsGuest } from 'meteor/artwells-accounts-guest-custom';
AccountsGuest.forced = false;
