// Requirements
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require(console.table);

// All functions are listed here.

function viewAllDepartments() {

console.log('Displaying all of the departments shortly');
const sqlQuery = `SELECT * FROM department`;

connection.query(sqlQuery, function (err, res) {
    if (err) throw err;
// console.table displays all of the departments.   
    console.table(res);
    centralPrompt();
 });
};


function viewAllRoles () {
console.log('Displaying all of the roles shortly');
const sqlQuery = `SELECT * FROM role`;

connection.query(sqlQuery, function (err, res) {
    if (err) throw err;
// console.table displays all of the roles.
console.table(res);
centralPrompt();
});
};


function viewAllEmployees () {
console.log('Displaying all of the employees shortly');
const sqlQuery = `SELECT * FROM employees`;
    
connection.query(sqlQuery, function (err, res) {
if (err) throw err;
// console.table displays all of your employees.
console.table(res);
centralPrompt();
 });
};


function addADepartment () {
inquirer.prompt([{
    type: 'input',
    name: 'createADepartment',
    message: 'What is the name of the department you would like to add?',
    validate: function createADepartment () {
        if (createADepartment === true) {
            return true;
        } else console.log('please enter the name of the department you would like to add');
         return false;
    }
  }]).then(function (answer) {
    const sqlQuery = `INSERT INTO department (name) VALUES (?)`
    connection.query(sqlQuery, answer.createADepartment, function (err, res) {
    if (err) throw err;
    console.log(answer.createADepartment + 'was added to the department');
    viewAllDepartments();
    });
  });
};

module.exports = {viewAllDepartments, viewAllRoles, viewAllEmployees, 
    addADepartment, addARole, addAnEmployee, updateAnEmployeeRole, updateAnEmployeeManger, 
    viewAllEmployeeByDepartment, deleteADepartment, deleteARole, deleteAnEmployee, viewEntireBudget, EndApplication}