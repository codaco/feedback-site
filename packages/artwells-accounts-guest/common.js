import { extendFragment, addCallback } from 'meteor/vulcan:lib';
import Users from 'meteor/vulcan:users';

export const AccountsGuest = {
  forced: true,   /* default to making loginVisitor automatic, and on logout */
  enabled: true,  /* on 'false'  Meteor.loginVisitor() will fail */
  name: false,    /* defaults to returning "null" for user's name */
  anonymous: false, /* defaults to using guests with randomly generated usernames/emails */
};

Users.addField({
  fieldName: 'isGuest',
  fieldSchema: {
    type: Boolean,
    label: 'Guest user',
    control: 'checkbox',
    optional: true,
    insertableBy: ['admins'],
    editableBy: ['admins'],
    viewableBy: ['guests'],
  }
})

extendFragment('UsersCurrent', `
  isGuest
`);

function setupGuestUser(user, options) {
  if (user.profile && user.profile.guest) {
    user.isGuest = true;
    user.groups = user.groups || [];
    user.groups.push('guests');
  } else {
    user.isGuest = false;
  }
  console.log('syncing user', user)

  return user;
}

addCallback('users.new.sync', setupGuestUser);

Users.isGuest = function(userOrId) {
  try {
    const user = Users.getUser(userOrId);
    return !user || !!user.isGuest;
  } catch (e) {
    return true;  // Return true if not logged in
  }
}

export default AccountsGuest;