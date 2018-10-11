const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')

const logger = require('morgan');
const bodyParser = require('body-parser');
var jwt = require('express-jwt');

const PUERTO = require('./config/config').PUERTO;

// Agrego postgraphile como HTTP middleware
const { postgraphile } = require("postgraphile");
const PostGraphileNestedMutations = require('postgraphile-plugin-nested-mutations');

/* const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
}); */

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"); // Agregar el nombre del header que pasa el cliente. ejm: token, Authorization
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  next();
});

// Importar rutas
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');
var rolRoutes = require('./routes/rol')
var catalogoRoutes = require('./routes/catalogo')

var pgraphileOpciones = {
  /* additionalGraphQLContextFromRequest: req => ({
      headers: req.headers
  }), */
  appendPlugins: [
    PostGraphileNestedMutations,
  ],
  dynamicJson: true,
  graphiql: true,
  // exportGqlSchemaPath: path.join(__dirname, './schema.graphql')
}


/* const populateJWT = (req, res, next) => {
  // req.headers.authorization = 'bearer ' + getJWTToken(req, res);
  console.log('<-> ', req.headers.authorization);
  next();
}; */
// app.use('/graphiql', populateJWT);
// app.use('/graphql', populateJWT);


app.use(express.static(path.join(__dirname, 'public')))
  .use('/login', loginRoutes)
  .use('/usuario', usuarioRoutes)
  .use('/rol', rolRoutes)
  .use('/catalogo', catalogoRoutes)
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/cool', (req, res) => res.send(cool()))
  // Verifica que el token que viene en el header.authorization sea válido para realizar las consultas de graphql
  .use('/graphql', jwt({ secret: process.env.SEED }), (err, req, res, next) => {
    //console.log('---> ', req.headers.authorization);
    if (err) return res.status(401).json({
      ok: false,
      error: { name: 'Sesión de usuario 🤨', message: 'Su sesión ha caducado, por favor vuelva a iniciar sesión' },
      sesionCaducada: true,
      err: err
    });
    res.sendStatus(200);
    next();
  })
  // Conecto con la base de datos y configuro opcines de postgraphile
  .use(postgraphile(process.env.DATABASE_URL, "public", pgraphileOpciones))
  .listen(PUERTO, () => console.log('Express server escuchando en el puerto ' + PUERTO + ': \x1b[32m%s\x1b[0m', 'online'))