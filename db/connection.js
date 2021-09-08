const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  // My MySQL username,
  user: 'root',
  // My MySQL password
  password: 'sqlpass47',
  database: 'employee_database'
});

module.exports = db;
