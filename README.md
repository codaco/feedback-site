# Network Canvas feedback site

## Usage

Start:

    npm run start

## User administration

Go to [/users](http://localhost:3000/users) to see a list of users.

### Via node console

Open the Meteor shell:

    meteor shell

Then find and modify users:

    let Users = require('meteor/vulcan:users').default
    let u = Users.findOne({username: 'usermcuser'})   // or {email: 'xxxxx'}

Remove old guest accounts:

    const Accounts = require('meteor/vulcan:accounts').default
    Accounts.removeOldGuests()

## Code

All React components live in `packages/network-canvas/lib/components`.

