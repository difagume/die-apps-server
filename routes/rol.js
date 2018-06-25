var express = require('express');
var db = require('../config/db');
// var bcrypt = require('bcryptjs');
var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

/**
 * Rutas
 */
app.get('/', obtenerTodosLosRoles);
app.post('/', mdAutenticacion.verficaToken, crearRol);
app.put('/:id', mdAutenticacion.verficaToken, actualizarRol);
app.put('/eliminar/:id', mdAutenticacion.verficaToken, eliminarRol);

/**
 * Funciones
 */
function obtenerTodosLosRoles(req, res) {
    db.any('select * from rol where activo = true order by 1')
        .then(data => {
            res.status(200)
                .json({
                    ok: true,
                    roles: data
                });
        })
        .catch(err => {
            mensajeError(res, err, 'Error al obtener los roles');
        });
}

function crearRol(req, res) {
    var rol = req.body.nombre;
    db.one('insert into rol(nombre) values(${nombre})' +
        'RETURNING *', req.body)
        .then(rolCreado => {
            res.status(200)
                .json({
                    ok: true,
                    rol: rolCreado,
                    name: 'Rol creado 😏',
                    message: `El rol: ${rolCreado.nombre} ha sido creado`
                });
        })
        .catch(err => {
            mensajeError(res, err, 'Error al crear el rol');
        });
}

function actualizarRol(req, res) {
    var id = req.params.id;
    var rol = req.body.nombre;
    db.result('UPDATE rol SET nombre=$1 WHERE id=$2;', [rol, id])
        .then(result => {
            if (result.rowCount > 0) {
                res.status(200)
                    .json({
                        ok: true,
                        name: 'Rol actualizado 😏',
                        message: `El rol ${rol} ha sido actualizado`
                    });
            } else {
                res.status(400).send({
                    ok: false,
                    error: { name: 'Error en la actualización 🤔', message: 'El rol no fue encontrado' }
                });
            }
        })
        .catch(err => {
            mensajeError(res, err, 'Error al actualizar el rol');
        });
}

function eliminarRol(req, res) {
    var id = req.params.id;
    var rol = req.body.nombre;
    db.result('UPDATE rol SET activo = false WHERE id=$1;', [id])
        .then(result => {
            if (result.rowCount > 0) {
                res.status(200)
                    .json({
                        ok: true,
                        name: 'Rol eliminado 😪',
                        message: `El rol ${rol} ha sido eliminado`
                    });
            } else {
                res.status(400).send({
                    ok: false,
                    error: { name: 'Error en la eliminación 😲', message: 'El rol no fue encontrado' }
                });
            }
        })
        .catch(err => {
            mensajeError(res, err, 'Error al eliminar el rol');
        });
}

function mensajeError(res, err, mensaje) {
    // console.log('errorrrrrrr', err);
    if (err.code === 'ECONNREFUSED') {
        res.status(400).send({
            ok: false,
            error: { name: `${mensaje} 😪`, message: 'Verifique la conexión con la bd' }
        });
    } else if (err.code === '23505') {
        res.status(400).send({
            ok: false,
            error: { name: `${mensaje} 😪`, message: 'El rol ingresado ya existe' }
        });
    } else {
        res.status(400).send({
            ok: false,
            error: { name: `${mensaje} 😱`, message: 'Existe un error en la sintaxis' }
        });
    }
}

module.exports = app;