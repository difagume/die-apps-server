var express = require('express');
var db = require('../config/db');

var app = express();

/**
 * Rutas
 */
app.get('/', obtenerTodosLosProductos);

/**
 * Funciones
 */
function obtenerTodosLosProductos(req, res) {
    db.any('select * from producto where activo = true order by nombre')
        .then(data => {
            res.status(200)
                .json({
                    ok: true,
                    productos: data
                });
        })
        .catch(err => {
            mensajeError(res, err, 'Error al obtener los productos');
        });
}

function mensajeError(res, err, mensaje) {
    console.log('errorrrrrrr', err);
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