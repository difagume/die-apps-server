const Promise = require('bluebird');
const initOptions = {
    promiseLib: Promise
};
const pgp = require('pg-promise')(initOptions);
// or without Initialization Options:
// const pgp = require('pg-promise')();

const connectionString = process.env.DATABASE_URL || 'postgres://waiyaki:@localhost:5432/hospitaldb';
const db = pgp(connectionString);

module.exports = db;

/* CREATE TABLE usuarios
(
    _id serial PRIMARY KEY,
    nombre text,
    email text,
    password text,
    role text,
    img text,
    social boolean
) */