const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')

const logger = require('morgan');
const bodyParser = require('body-parser');
const PUERTO = require('./config/config').PUERTO;

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
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Importar rutas
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');

app.get('/times', (req, res) => {
  let result = ''
  const times = process.env.TIMES || 5
  for (i = 0; i < times; i++) {
    result += i + ' '
  }
  res.send(result)
})

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

app.use(express.static(path.join(__dirname, 'public')))
  .use('/usuario', usuarioRoutes)
  .use('/login', loginRoutes)
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/cool', (req, res) => res.send(cool()))
  .listen(PUERTO, () => console.log('Express server escuchando en el puerto ' + PUERTO + ': \x1b[32m%s\x1b[0m', 'online'))