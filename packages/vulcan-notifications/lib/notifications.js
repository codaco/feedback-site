import Users from 'meteor/vulcan:users';
import VulcanEmail from 'meteor/vulcan:email';
import { getSetting } from 'meteor/vulcan:core';

export const createNotification = (userIds, notificationName, data) => {
  console.log(`Creating notification- ids: ${userIds} name: ${notificationName}`)

  if (getSetting('emailNotifications', true)) {
    // if userIds is not an array, wrap it in one
    if (!Array.isArray(userIds)) userIds = [userIds];

    userIds.forEach(userId => {

      const user = Users.findOne(userId);
      const email = VulcanEmail.emails[notificationName];
      const properties = email.getProperties(data);
      const subject = typeof email.subject === 'function' ? email.subject(properties) : email.subject;
      const html = VulcanEmail.getTemplate(email.template)(properties);

      const userEmail = Users.getEmail(user);
      if (!!userEmail) {
        VulcanEmail.buildAndSendHTML(Users.getEmail(user), subject, html);
      } else {
        console.log(`// Couldn't send notification: admin user ${user._id} doesn't have an email`); // eslint-disable-line
      }
    });
  }

};
