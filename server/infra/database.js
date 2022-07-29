const pgp = require('pg-promise')();
const db = pgp({
    user: 'postgres',
    password: '',
    host: 'localhost',
    port: 5432,
    database: 'agenda_telefonica'
});

module.exports = db;
