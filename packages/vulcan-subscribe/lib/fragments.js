import { extendFragment, registerFragment } from 'meteor/vulcan:core';

extendFragment(`
  fragment UsersCurrent on User {
    subscribedItems
  }`);
