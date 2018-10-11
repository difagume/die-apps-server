var jwt = require('express-jwt');

var SEED = process.env.SEED;

//=============================
// Verificar token desde el header
//=============================
exports.verficaToken = jwt({ secret: process.env.SEED }),
    (err, req, res, next) => {
        //console.log('---> ', req.headers.authorization);
        if (err) return res.status(401).json({ error: err });
        // if (!req.user) return res.sendStatus(401).send({ auth: false, message: 'No token provided.' + req.user.usuario });
        res.sendStatus(200);
        next();
    }

