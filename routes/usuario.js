var express = require('express');
var db = require('../db');

var app = express();

/**
 * Rutas
 */
app.get('/', obtenerTodosLosUsuarios);

/**
 * Funciones
 */
function obtenerTodosLosUsuarios(req, res, next) {
  db.any('select * from usuarios')
    .then(data=> {
      // console.log('DATA:', data); // print data;
      res.status(200)
        .json({
          status: 'ok',
          data: data,
          message: 'Usuarios retornados'
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