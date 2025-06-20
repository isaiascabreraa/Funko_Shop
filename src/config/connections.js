const { Pool } = require('pg')

const { DATABASE_URL } = process.env
const connection = DATABASE_URL

if (!connection) {
  console.error('Recuerda configurar el archivo .env para test y dev')
}

const pool = new Pool({
  connectionString: connection
})

pool.connect((error, client, release) => {
  if (error) {
    console.error('No se pudo establecer una conexión -', error.stack)
  } else {
    console.log('Conexión exitosa a la Base de Datos PostgreSQL')
    release()
  }
})

module.exports = {
  conn: pool
}
