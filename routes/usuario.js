var express = require('express');
var db = require('../db');
var bcrypt = require('bcryptjs');

var app = express();

/**
 * Rutas
 */
app.get('/', obtenerTodosLosUsuarios);
app.post('/', crearUsuario);
app.put('/:id', actualizarUsuario);

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
          usuarios: data
        });
    })
    .catch(err => {
      mensajeError(res, err, 'Error al obtener los usuarios');
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
            mensajeError(res, err, 'Error al crear el usuario');
          });
      }
    })
    .catch(err => {
      mensajeError(res, err, 'Error al buscar el usuario');
    });
}

function actualizarUsuario(req, res) {
  var id = req.params.id;
  var usuario = req.body;
  db.result('UPDATE public.usuarios SET username=$1, email=$2, rol=$3, ' +
    'img=$4, social=$5, nombre=$6, apellido=$7 WHERE id=$8;',
    [usuario.username, usuario.email, usuario.rol, usuario.img,
    usuario.social, usuario.nombre, usuario.apellido, id])
    .then(result => {
      if (result.rowCount > 0) {
        res.status(200)
          .json({
            ok: true,
            name: 'Usuario actualizado 😏',
            message: `El usuario ${usuario.username} ha sido actualizado`
          });
      } else {
        res.status(400).send({
          ok: false,
          error: { name: 'Error en la actualización 🤔', message: 'El usuario no fue encontrado' }
        });
      }
    })
    .catch(err => {
      mensajeError(res, err, 'Error al actualizar el usuario');
    });
}

function mensajeError(res, err, mensaje) {
  if (err.code === 'ECONNREFUSED') {
    res.status(400).send({
      ok: false,
      error: { name: `${mensaje} 😪`, message: 'Verifique la conexión con la bd' }
    });
  } else {
    res.status(400).send({
      ok: false,
      error: { name: `${mensaje} 😱`, message: 'Existe un error en la sintaxis' }
    });
  }
}

module.exports = app;
