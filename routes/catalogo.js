var express = require('express');
var db = require('../config/db');
// const pgp = require('pg-promise');
var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

/**
 * Rutas
 */
app.get('/menu', obtenerMenu);
app.get('/productos', obtenerTodosLosProductos);
app.post('/articulo', mdAutenticacion.verficaToken, crearArticulo);
app.get('/articulos', obtenerTodosLosArticulo);

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

function crearArticulo(req, res) {
    let articulo = req.body;
    db.tx(t => {
        console.log("-- insertando artículo --");
        return t.one('INSERT INTO articulo(nombre, valor, activo, id_menu, tiempo_preparacion) VALUES (${nombre}, ${valor}, ${activo}, ${id_menu}, ${tiempo_preparacion}) RETURNING id, nombre', articulo)
            .then(nuevoArt => {

                articulo.articuloDetalle.forEach(ad => {
                    ad.id_articulo = nuevoArt.id;
                });
                // console.log('articuloD:', articulo.articuloDetalle);
                console.log("-- insertando artículo detalle --");
                //return t.one('INSERT INTO articulo_detalle(id_articulo, id_producto, activo, cantidad) VALUES (${id_articulo}, ${id_producto}, ${activo}, ${cantidad})', articulo.articuloDetalle)
                // const insertAD = () => pgp.helpers.insert(articulo.articuloDetalle, ['id_articulo', 'id_producto', 'activo', 'cantidad'], 'articulo_detalle');
                //return t.none(insertAD)
                const inserts = articulo.articuloDetalle.map(ad => {
                    return t.none('INSERT INTO articulo_detalle(id_articulo, id_producto, activo, cantidad) VALUES (${id_articulo}, ${id_producto}, ${activo}, ${cantidad})', ad);
                });
                return t.batch(inserts).then(() => nuevoArt);
                /* .then(() => {
                return promise.resolve(nuevoArt.id); 
            });*/
            });
    })
        .then(articuloCreado => {
            res.status(200)
                .json({
                    ok: true,
                    articulo: articuloCreado,
                    name: 'Artículo creado 😏',
                    message: `El artículo: ${articuloCreado.nombre} ha sido creado`
                });
        }, reason => {
            mensajeError(res, reason, 'Error al crear el artículo');
        });
}

function obtenerTodosLosArticulo(req, res) {
    db.task(t => {
        return t.map('SELECT id, nombre, valor, id_menu, tiempo_preparacion FROM articulo where activo = true', [], articulo => {
            return t.any('SELECT id, id_producto, (SELECT nombre FROM producto WHERE activo = true and id=id_producto) as producto, cantidad FROM public.articulo_detalle where activo = true and id_articulo = $1', articulo.id)
                .then(productos => {
                    articulo.productos = productos;
                    return articulo;
                });
        }).then(t.batch);
    })
        .then(data => {
            res.status(200)
                .json({
                    ok: true,
                    articulos: data
                });
        })
        .catch(err => {
            mensajeError(res, err, 'Error al obtener los artículos');
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
            error: { name: `${mensaje} 😪`, message: 'El artículo ingresado ya existe' }
        });
    } else {
        res.status(400).send({
            ok: false,
            error: { name: `${mensaje} 😱`, message: 'Existe un error en la sintaxis' }
        });
    }
}

module.exports = app;
