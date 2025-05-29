
const mysql = require('mysql2');

const pool_connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: process.env.DB_CONNECTION_LIMIT,
    queueLimit: 0
});

pool_connection.getConnection((error, connection) => {
    if (error) {
        console.error("No se pudo establecer una conexión", error);
    } else {
        console.log("Conexión exitosa a la Base de Datos");
        connection.release();
    }
});

module.exports = {
    conn: pool_connection.promise()
};