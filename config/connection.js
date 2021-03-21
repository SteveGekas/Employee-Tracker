const sql = require('mysql2');
require('dotenv').config();

const connection = sql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    //use your sql Workbench password!!!!!
    password: process.env.DB_PASSWORD,
    database: 'Employee_TrackerDB',
});

module.exports = connection;