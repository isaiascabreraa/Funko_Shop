
require('dotenv').config();
const app = require('./app');

//Information
const IP = process.env.IP || '0.0.0.0'
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://${IP}:${PORT}`);
});