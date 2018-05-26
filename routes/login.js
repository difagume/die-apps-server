var express = require('express');
var db = require('../db');
var bcrypt = require('bcryptjs'); // https://github.com/dcodeIO/bcrypt.js
var jwt = require('jsonwebtoken'); // https://github.com/auth0/node-jsonwebtoken

var SEED = require('../config/config').SEED;
var CADUCIDAD_TOKEN = require('../config/config').CADUCIDAD_TOKEN;

var app = express();

/**
 * Rutas
 */
app.post('/', login);

/**
 * Funciones
 */
function login(req, res) {
    var password = req.body.password;
    var usuario = req.body.usuario;
    db.oneOrNone('SELECT id, usuario, email, password, nombre, apellido, rol, img, social FROM usuarios WHERE usuario=$1 AND activo=true', [usuario])
        .then(usuario => {
            if (!usuario) {
                return res.status(400).json({
                    ok: false,
                    error: { name: 'Error en el login 😞', message: 'Usuario no encontrado' }
                });
            }

            if (usuario) {
                // Si la contraseña no coincide entre el password enviado con el password de BD
                if (!bcrypt.compareSync(password, usuario.password)) {
                    return res.status(400).json({
                        ok: false,
                        error: { name: 'Error en el login 😞', message: 'Verifique la contraseña' }
                    });
                }

                // En este punto el usuario y la contraseña son válidos
                // Crear un token (en este punto el correo y el password ya son correctos)
                usuario.password = '💩';
                var token = jwt.sign({ usuario: usuario }, SEED, { expiresIn: CADUCIDAD_TOKEN });
                usuario.token = token;

                res.status(200).json({
                    ok: true,
                    usuario: usuario,
                    //token: token,
                    id: usuario.id
                    //menu: obtenerMenu(usuarioBD.role)
                });
            }
        })
        .catch(err => {
            res.status(400).send({
                ok: false,
                error: { name: 'Error en la conexión 😨', message: 'Verifique la conexión con la bd' }
            });
        });
}

module.exports = app;