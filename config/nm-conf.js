require('dotenv').config();
var path = require('path');
var hbs = require('nodemailer-express-handlebars'),
    email = process.env.MAILER_EMAIL_ID,
    pass = process.env.MAILER_PASSWORD
nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport({
    //service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
    service: process.env.MAILER_SERVICE_PROVIDER || 'Mailgun',
    auth: {
        user: email,
        pass: pass
    }
});

var handlebarsOptions = {
    viewEngine: 'handlebars',
    viewPath: path.resolve('./templates/'),
    extName: '.html'
};

smtpTransport.use('compile', hbs(handlebarsOptions));

module.exports = smtpTransport;