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
  var t;
  db.one("SELECT count(*) FROM usuarios")
    .then(data => {
      //return parseInt(data.count);
      t = parseInt(data.count);
    })

  db.any('select * from usuarios')
    .then(data => {
      res.status(200)
        .json({
          ok: true,
          usuarios: data,
          total: t
        });
    })
    .catch(err => {
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