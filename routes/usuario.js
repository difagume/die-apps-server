var express = require('express');
var db = require('../db');

var app = express();

/**
 * Rutas
 */
app.get('/puppies', getAllPuppies);

/**
 * Funciones
 */
function getAllPuppies(req, res, next) {
    db.any('select * from pups')
      .then(data=> {
        // console.log('DATA:', data); // print data;
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved ALL puppies'
          });
      })
      .catch(err=> {
        return next(err);
      });
      // .finally(db.$pool.end);
  }

  module.exports = app;

  /*module.exports = {
    getAllPuppies: getAllPuppies  ,
    getSinglePuppy: getSinglePuppy,
    createPuppy: createPuppy,
    updatePuppy: updatePuppy,
    removePuppy: removePuppy
  };*/