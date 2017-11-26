# Network Canvas feedback site

## Usage

Install:

    npm install -D

Start:

    npm start

## Deployment

The site is deployed with Meteor Up:

    npm install -g mup

Get the `.deploy/` directory from someone who already has it (it's not checked
into git). Then:

    cd .deploy
    mup deploy

See the [Meteor Up docs](https://github.com/zodern/meteor-up) for other
commands and options.

## User administration

Go to [/users](http://localhost:3000/users) to see a list of users.

### Via node console

Open the Meteor shell:

    meteor shell

Then find and modify users:

    const Users = require('meteor/vulcan:users').default
    let u = Users.findOne({username: 'usermcuser'})   // or {email: 'xxxxx'}

Remove old guest accounts:

    const Accounts = require('meteor/vulcan:accounts').default
    Accounts.removeOldGuests()

## Code

All React components live in `packages/network-canvas/lib/components`.

