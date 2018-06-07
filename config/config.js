require('dotenv').config();
module.exports = {
    CADUCIDAD_TOKEN: 14400, // 4 horas
    PUERTO: process.env.PORT || 5000,
    FRONT_URL: process.env.FRONT_URL,
    BACK_URL: process.env.BACK_URL
}