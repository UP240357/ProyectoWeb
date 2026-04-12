const mysql = require("mysql2/promise");
require("dotenv").config();

const datos = mysql.createPool({
  host: process.env.db_Host,
  user: process.env.db_usuario,
  password: process.env.db_contrasenia,
  database: process.env.db_nombre
});

module.exports = datos;