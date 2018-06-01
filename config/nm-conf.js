var path = require('path');
var hbs = require('nodemailer-express-handlebars'),
    email = process.env.MAILER_EMAIL_ID || 'auth_email_address@gmail.com',
    pass = process.env.MAILER_PASSWORD || 'auth_email_pass'
nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport({
    service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
    auth: {
        user: 'xxxx@gmail.com',
        pass: 'xxxx'
    }
});

var handlebarsOptions = {
    viewEngine: 'handlebars',
    viewPath: path.resolve('./templates/'),
    extName: '.html'
};

smtpTransport.use('compile', hbs(handlebarsOptions));

module.exports = smtpTransport;