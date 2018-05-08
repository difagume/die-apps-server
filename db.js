const Promise = require('bluebird');
const initOptions = {
    promiseLib: Promise
};
const pgp = require('pg-promise')(initOptions);
// or without Initialization Options:
// const pgp = require('pg-promise')();

const connectionString = 'postgres://waiyaki:@localhost:5432/puppies';
const db = pgp(connectionString);

  module.exports = db;
