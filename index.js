// Requirements / dependencies listed below.
const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require(console.table);
// The below is for password encryption and security purposes.
require('dotenv').config()

// Database conncection (password hidden with dotenv)
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.CHALLENGE_PASSWORD,
    database: 'employee_db'
});

// 