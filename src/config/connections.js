
const mysql = require('mysql2');

const pool_connection = mysql.createPool({
    host:'localhost',
    user:'root',
    paasword: 'rootpassword',
    database: 'Funko_DB',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool_connection.getConnection((error, connection) => {
    if (error) {
        console.error("Error al obtener una conexión", error);
    } else {
        console.log("Conexión exitosa a la Base de Datos");
        connection.release();
    }
});

module.exports = {
    conn: pool_connection.promise()
};