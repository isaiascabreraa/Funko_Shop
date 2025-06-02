
const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    max: process.env.DB_CONNECTION_LIMIT,
});

pool.connect((error, client, release) => {
    if (error) {
        console.error('No se pudo establecer una conexión -', error.stack);
    } else {
        console.log('Conexión exitosa a la Base de Datos PostgreSQL');
        release();
    }
});

module.exports = {
    conn: pool
};