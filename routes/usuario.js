var express = require('express');
var db = require('../db');
var bcrypt = require('bcryptjs');

var app = express();

/**
 * Rutas
 */
app.get('/', obtenerTodosLosUsuarios);
app.post('/', crearUsuario);

/**
 * Funciones
 */
function obtenerTodosLosUsuarios(req, res) {
  /* var t;
  db.one("SELECT count(*) FROM usuarios")
    .then(data => {
      //return parseInt(data.count);
      t = parseInt(data.count);
    }) */

  db.any('select * from usuarios')
    .then(data => {
      res.status(200)
        .json({
          ok: true,
          usuarios: data/*,
          total: t*/
        });
    })
    .catch(err => {
      return res.status(400).send(err.name + ': ' + err.message);
    });
  // .finally(db.$pool.end);
}

function crearUsuario(req, res) {
  var username = req.body.username;
  db.oneOrNone('SELECT count(id) FROM public.usuarios WHERE username = $1', [username])
    .then(data => {
      if (parseInt(data.count) > 0) { //Verifico que el username no exista
        return res.status(400).json({
          ok: false,
          error: { name: 'Error al crear usuario 😩', message: `El username ${username} ya existe` }
        });
      }
      else { // Creo el usuario
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        //req.body.age = parseInt(req.body.age);
        db.one('insert into usuarios(username, email, password, nombre, apellido, rol, img, social)' +
          'values(${username}, ${email}, ${password}, ${nombre}, ${apellido}, ${rol}, ${img}, ${social})' +
          'RETURNING *', req.body)
          .then(usuarioCreado => {
            res.status(200)
              .json({
                ok: true,
                usuario: usuarioCreado,
                message: 'Usuario agregado'
              });
          })
          .catch(err => {
            return res.status(400).send(err.name + ': ' + err.message);
          });
      }
    })
    .catch(err => {
      return res.status(400).send(err.name + ': ' + err.message);
    });
}

module.exports = app;

  /*module.exports = {
    getAllPuppies: getAllPuppies  ,
    getSinglePuppy: getSinglePuppy,
    createPuppy: createPuppy,
    updatePuppy: updatePuppy,
    removePuppy: removePuppy
  };*/