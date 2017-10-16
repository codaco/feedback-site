import '/imports/main-modules';
import { getSetting } from 'meteor/vulcan:core';
import './cron';

Accounts.emailTemplates.from = getSetting('defaultEmail');
