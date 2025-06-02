
const postgres = require('pg');

const pool = postgres.create({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.connect((error, client, release) => {
    if (error) {
        console.error('No se pudo establecer una conexión', error.stack);
    } else {
        console.log('Conexión exitosa a la Base de Datos PostgreSQL');
        release();
    }
});

module.exports = {
    conn: pool
};