import Users from 'meteor/vulcan:users';

// note: leverage weak dependencies on packages
const Comments = Package['vulcan:comments'] ? Package['vulcan:comments'].default : null;

const notificationsGroup = {
  name: "notifications",
  order: 2
};

// Add notifications options to user profile settings
Users.addField([
  {
    fieldName: 'notifications_posts',
    fieldSchema: {
      label: 'New posts',
      type: Boolean,
      optional: true,
      defaultValue: false,
      control: "checkbox",
      viewableBy: ['guests'],
      insertableBy: ['members'],
      editableBy: ['members'],
      group: notificationsGroup,
    }
  }
]);

if (!!Comments) {
  Users.addField([
    {
      fieldName: 'auto_subscribe_posts',
      fieldSchema: {
        label: 'Subscribe to comments on my posts',
        type: Boolean,
        optional: true,
        defaultValue: true,
        control: "checkbox",
        viewableBy: ['guests'],
        insertableBy: ['members'],
        editableBy: ['members'],
        group: notificationsGroup,
      }
    }
  ]);
}
