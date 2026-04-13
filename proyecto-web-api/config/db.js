const mysql = require("mysql2/promise");
require("dotenv").config();

const datos = mysql.createPool({
  host: process.env.db_Host || "localhost",
  user: process.env.db_usuario || "root",
  password: process.env.db_contrasenia || "",
  database: process.env.db_nombre || "webdb"
});

module.exports = datos;