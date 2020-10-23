// @ts-nocheck
const {execSync} = require('child_process');

const username = execSync('git config --get user.name', {encoding: 'utf8', silent: true});
console.log(username);

// process.exit(1);
