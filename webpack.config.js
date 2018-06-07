const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const variables = require('./config/config');

module.exports = {
    target: 'node',
    entry: './config/config.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/restablecer_template.html',
            filename: 'restablecer.html',
            back_url: `${variables.BACK_URL}/login/restablecer`,
            front_url: `${variables.FRONT_URL}/login`
                //back_url: `${process.env.BACK_URL}/login/restablecer`,
                //front_url: `${process.env.FRONT_URL}/login`
                //url: variables.url
        })
    ]
};