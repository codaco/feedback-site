import '/imports/main-modules';
import { getSetting } from 'meteor/vulcan:core';

Accounts.emailTemplates.from = getSetting('defaultEmail');
