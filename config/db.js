require('dotenv').config();
const Promise = require('bluebird');
const initOptions = {
    promiseLib: Promise
    // capSQL: true // generate capitalized SQL 
};
const pgp = require('pg-promise')(initOptions);

// or without Initialization Options:
// const pgp = require('pg-promise')();

const connectionString = process.env.DATABASE_URL;

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

/* CREATE TABLE general.usuarios (
    ID SERIAL PRIMARY KEY,
    nombre VARCHAR,
    email VARCHAR,
    password VARCHAR,
    img VARCHAR,
    role VARCHAR,
      social BOOLEAN
  );
  
  INSERT INTO general.usuarios(
      nombre, email, password, img, role, social)
      VALUES ('Diego Fabricio', 'difagume@gmail.com', '123456', null,  'ADMIN_ROLE', false); */