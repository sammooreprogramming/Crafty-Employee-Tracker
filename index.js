// Requirements / dependencies listed below.
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require(console.table);
// The below is dotenv & it is used for password encryption and security purposes.
require('dotenv').config()
// Chalk is used for string art to make the challenge more fun 
// and also to smooth out the challenge with art for professionality.
import chalk from 'chalk';
// Database conncection (password hidden with dotenv).
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.CHALLENGE_PASSWORD,
    database: 'employee_db'
});

// if error is returned throw the error
connection.connect(function error() {
if (err) throw err;
console.log('Connection to id' + connection.threadId + 'is live!');
whenConnectionIsLive();
});

// when connection is live display using chalk a piece of string art to greet the user appropriately.
function whenConnectionIsLive() {
console.log(chalk.blue.bold(' Nifty Employee Tracker!')).then(centralPrompt());
};

// Functionality begins here for the actual challenge using an inquirer prompt.
function centralPrompt() {
    inquirer.prompt([{
          type: 'list',
          name: 'choices', 
          message: 'What would you like to do?',
          choices: ['View all departments', 
                    'View all roles', 
                    'View all employees', 
                    'Add department', 
                    'Add role', 
                    'Add employee', 
                    'Update an employee role',
                    'Update an employee manager',
                    "View employees by department",
                    'Delete department',
                    'Delete role',
                    'Delete employee',
                    'View entire budget',
                    'Exit application']
// Using the answers from the user, the data (or 'answers') is used to navigate to the function required for the specified choice.
                }]).then(function (answers) {
                    if (answers === 'View all departments') {
                        viewAllDepartments();

                    } if (answers === 'View all roles') {
                        viewAllRoles();
                        
                    } if (answers === 'View all employees') {
                        viewAllEmployees();

                    } if (answers === 'Add department') {
                        addADepartment();

                    } if (answers === 'Add role') {
                        addARole();

                    } if (answers === 'add employee') {
                        addAnEmployee();

                    } if (answers === 'Update an employee role') {
                        updateAnEmployeeRole();

                    } if (answers === 'Update an employee manager') {
                        updateAnEmployeeManger();

                    } if (answers === 'View employees by department') {
                        viewAllEmployeeByDepartment();

                    } if (answers === 'Delete department') {
                        deleteADepartment();

                    } if (answers === 'Delete role') {
                        deleteARole();

                    } if (answers === 'Delete employee') {
                        deleteAnEmployee();
                        
                    } if (answers === 'View entire budget') {
                        viewEntireBudget();

                    } if (answers === 'Exit application') {
                        EndApplication();
                    }
                });
};