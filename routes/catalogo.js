var express = require('express');
var db = require('../config/db');

var app = express();

/**
 * Rutas
 */
app.get('/menu', obtenerMenu);
app.get('/productos', obtenerTodosLosProductos);
app.post('/articulo', mdAutenticacion.verficaToken, crearArticulo);

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

function obtenerMenu(req, res) {
    db.any('select * from menu where activo = true order by id')
        .then(data => {
            res.status(200)
                .json({
                    ok: true,
                    menu: data
                });
        })
        .catch(err => {
            mensajeError(res, err, 'Error al obtener el menú');
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