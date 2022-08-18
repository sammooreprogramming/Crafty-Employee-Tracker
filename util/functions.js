// Requirements
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require(console.table);

// All functions are listed below.
function viewAllDepartments() {

console.log('Displaying all of the departments shortly');
const sqlQuery = `SELECT * FROM department`;

connection.query(sqlQuery, function (err, res) {
    if (err) throw err;
// console.table displays all of the departments in the table.   
    console.table(res);
    centralPrompt();
 });
};


function viewAllRoles () {
console.log('Displaying all of the roles shortly');
const sqlQuery = `SELECT * FROM role`;

connection.query(sqlQuery, function (err, res) {
    if (err) throw err;
// console.table displays all of the roles in the table.
console.table(res);
centralPrompt();
});
};


function viewAllEmployees () {
console.log('Displaying all of the employees shortly');
const sqlQuery = `SELECT * FROM employees`;
    
connection.query(sqlQuery, function (err, res) {
if (err) throw err;
// console.table displays all of your employees in the table.
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


function addARole() {
    inquirer.prompt([
            {
            type: input,
            message: 'What is the name of the role you would like to add?',
            name: nameOfRole,
            validate: function createARole () {
                if (createARole === true) {
                    return true;
                } else console.log('please enter the name the name of the role you would like to add.');
                return false;
            }
            },
            {
            type: input,
            message: 'What is the salary of this role?',
            name: roleSalary,
            validate: function roleSalary () {
                if (Number.isNaN(roleSalary)) {
                    return true;
                } else {
                    console.log('Please enter a salary for this role.')
                    return false;
                }
            }
            },
            {
            type: input,
            message: 'For this role, what is the ID for the department?',
            name: departmentId,
            validate: function departmentId () {
                if (Number.isNaN(departmentId)) {
                    return true;
                } else {
                    console.log('Please enter a department ID for this role.')
                    return false;
                }
            }
            }
            ]).then(function (answers) {
            // constant to hold the answers
            const sqlParameters  = [answers.nameOfRole, answers.roleSalary, answers.departmentId];
            const sqlQueryForRole = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
            connection.query(sqlQueryForRole, sqlParameters, function () {
                if (err) throw err;
                // console.table displays all of the added roles from the response in the table.
                console.table(res);
                centralPrompt();
            });
        });
      };

      


module.exports = {viewAllDepartments, viewAllRoles, viewAllEmployees, 
    addADepartment, addARole, addAnEmployee, updateAnEmployeeRole, updateAnEmployeeManger, 
    viewAllEmployeeByDepartment, deleteADepartment, deleteARole, deleteAnEmployee, viewEntireBudget, EndApplication}