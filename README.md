# node-js-getting-started

A barebones Node.js app using [Express 4](http://expressjs.com/).

This application supports the [Getting Started with Node on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs) article - check it out.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku CLI](https://cli.heroku.com/) installed.

```sh
$ git clone git@github.com:heroku/node-js-getting-started.git # or clone your own fork
$ cd node-js-getting-started
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
$ heroku create
$ git push heroku master
$ heroku open
```
or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Documentation

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)
# die-apps-server
# Actualizar paquetes npm
https://docs.npmjs.com/getting-started/updating-local-packages

# Consultas sql
https://github.com/vitaly-t/pg-promise/blob/master/examples/select-insert.md

# Recuperar contraseña
https://www.codementor.io/olatundegaruba/password-reset-using-jwt-ag2pmlck0

# env
https://codeburst.io/how-to-easily-set-up-node-environment-variables-in-your-js-application-d06740f9b9bd

# Servidor smtp
https://app.mailgun.com/app/dashboard

# Imprimir variables de Heroku
heroku run printenv -a die-apps-server


## Graphile ejemplos GraphQL
https://www.graphile.org/postgraphile/examples/


## Usando PostGraphile como una librería
https://www.graphile.org/postgraphile/usage-library/
https://github.com/mlipscombe/postgraphile-plugin-nested-mutations
#
https://github.com/graphile/postgraphile/issues/346#issuecomment-277989713
https://github.com/graphile/postgraphile/issues/824#issuecomment-411549029
# URL para consultas
http://localhost:5000/graphql
# URL interfaz de consultas
http://localhost:5000/graphiql



######## package.json --> webpack ########
"scripts": {
        "prestart": "webpack",
        "start": "nodemon index.js",
        "test": "node test.js"
    }
##########################################