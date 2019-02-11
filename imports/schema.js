/* Modifying builtin types */

import { Posts }from 'meteor/example-forum';
import { Categories } from 'meteor/example-forum';
import Users from 'meteor/vulcan:users';
// import Votes from 'meteor/vulcan:voting';

//Categories.removeField('image');    // removeField doesn't do what I think?
//Categories.removeField('parentId');


/**
 Contact info for the user
 */
Users.addField({
  fieldName: "contactInfo",
  fieldSchema: {
    type: String,
    optional: true,
    control: "text",
    insertableBy: ['members'],
    editableBy: ['members'],
    viewableBy: ['guests'],
    order: 50,
  }
});

Users.addField({
  fieldName: "karma",
  fieldSchema: {
      type: Number,
      optional: true,
      viewableBy: ['guests'],
  }
});

Users.removeField( "twitterUsername");
Users.removeField( "website");
