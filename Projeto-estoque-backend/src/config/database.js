require("dotenv").config();
const { Sequelize } = require("sequelize");

const {
    DB_ADAPTOR,
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWD,
    DB_DATABASE
} = process.env;

const URI = `${DB_ADAPTOR}://${DB_USER}:${DB_PASSWD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

console.log(URI);

let database = new Sequelize(URI, {dialect: DB_ADAPTOR});

module.exports = database;