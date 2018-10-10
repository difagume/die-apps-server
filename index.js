const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')

const logger = require('morgan');
const bodyParser = require('body-parser');
const PUERTO = require('./config/config').PUERTO;

// Agrego postgraphile como HTTP middleware
const { postgraphile } = require("postgraphile");
const PostGraphileNestedMutations = require('postgraphile-plugin-nested-mutations');
const mdAutenticacion = require('./middlewares/autenticacion');

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
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Token"); // Agregar el nombre del header que pasa el cliente. ejm: token, Authorization
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    next();
});

// Importar rutas
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');
var rolRoutes = require('./routes/rol')
var catalogoRoutes = require('./routes/catalogo')

/* app.get('/times', (req, res) => {
    let result = ''
    const times = process.env.TIMES || 5
    for (i = 0; i < times; i++) {
        result += i + ' '
    }
    res.send(result)
}) */

/* app.get('/db', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM test_table');
    res.render('pages/db', result);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}); */

// Middleware para headers 
/* const getJWTToken = (req, res) => (
    jwt.encode({
        aud: 'postgraphql',
        role: postgraphqlRole,
        user_id: (req.user && req.user.id) || undefined,
    }, process.env.JWT_SECRET)
); */

/* const populateJWT = (req, res, next) => {
    // req.headers.authorization = 'bearer ' + getJWTToken(req, res);
    console.log(req.headers.token);
    next();
}; */


// app.use('/graphiql', populateJWT);
// app.use('/graphql', populateJWT);
app.use('/graphql', mdAutenticacion.verficaTokenHeader)

// Conecto con la base de datos y configuro opcines de postgraphile
app.use(postgraphile(process.env.DATABASE_URL, "public", {
    /* additionalGraphQLContextFromRequest: req => ({
        headers: req.headers
    }), */
    appendPlugins: [
        PostGraphileNestedMutations,
    ],
    dynamicJson: true,
    graphiql: true,
    // exportGqlSchemaPath: path.join(__dirname, './schema.graphql')
}))


app.use(express.static(path.join(__dirname, 'public')))
    .use('/login', loginRoutes)
    .use('/usuario', usuarioRoutes)
    .use('/rol', rolRoutes)
    .use('/catalogo', catalogoRoutes)
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'))
    .get('/cool', (req, res) => res.send(cool()))
    // .use('/die', bodyParser.json(), mdAutenticacion.verficaTokenHeader, (req, res) => res.redirect('/graphql'))
    // .use('/die', (req, res) => { console.log(req.headers) })

.listen(PUERTO, () => console.log('Express server escuchando en el puerto ' + PUERTO + ': \x1b[32m%s\x1b[0m', 'online'))