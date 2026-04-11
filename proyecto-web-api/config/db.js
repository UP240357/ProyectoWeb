const mysql = require("mysql2/promise");
require("dotenv").config();

const datos = mysql.createPool({
    host: process.env.db_uuu
});