import { SyncedCron } from 'meteor/percolatestudio:synced-cron';
import moment from 'moment';
import Accounts from 'meteor/vulcan:accounts';

SyncedCron.options = {
  log: false,
  collectionName: 'cronHistory',
  utc: false,
  collectionTTL: 172800
};

const addJob = function () {
  SyncedCron.add({
    name: 'cleanupGuestUsers',
    schedule(parser) {
      return parser.text('every 5 minutes');
    },
    job() {
      const before = moment().subtract(1, 'days').toDate();
      Accounts.removeOldGuests(before);
    }
  });
};

Meteor.startup(function () {
  addJob();
});

