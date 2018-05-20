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
    var nombre = req.body.nombre;
    db.oneOrNone('SELECT _id, nombre, email, password, role, img, social FROM usuarios WHERE nombre=$1', [nombre])
        .then(usuario => {
            if (!usuario) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error en el login',
                    errors: { message: 'Usuario no encontrado' }
                });
            }

            if (usuario) {
                // Si la contraseña no coincide entre el password enviado con el password de BD
                if (!bcrypt.compareSync(password, usuario.password)) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error en el login',
                        errors: { message: 'Verifique la contraseña' }
                    });
                }

                // En este punto el usuario y la contraseña son válidos
                // Crear un token (en este punto el correo y el password ya son correctos)
                usuario.password = '💩';
                var token = jwt.sign({ usuario: usuario }, SEED, { expiresIn: CADUCIDAD_TOKEN });

                res.status(200).json({
                    ok: true,
                    usuario: usuario,
                    token: token,
                    id: usuario._id
                    //menu: obtenerMenu(usuarioBD.role)
                });
            }
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        });
}

module.exports = app;