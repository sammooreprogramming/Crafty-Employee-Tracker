// Requirements / dependencies listed below.
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
 

// The below is dotenv & it is used for password encryption and security purposes.
require('dotenv').config()
// Database conncection (password hidden with dotenv).
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.CHALLENGE_PASSWORD,
    database: 'employee_db'
});

// if error is returned throw the error
connection.connect(function (err) {
if (err) throw err;
console.log('Connection to id ' + connection.threadId + ' is live!');
whenConnectionIsLive();
});

// when connection is live display using chalk a piece of string art to greet the user appropriately.
function whenConnectionIsLive() {
console.log(' Nifty Employee Tracker!');
centralPrompt();
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
                }]).then(answers => {
                    switch (answers.choices) {
                        case 'view all departments':
                        viewAllDepartments();
                        break;
                     
                        case 'view all roles':
                        viewAllRoles();
                        break;
                       
                        case 'view all employees':
                        viewAllEmployees();
                        break;
                      
                        case 'Add department':
                        addADepartment();
                        break;
                      
                        case 'add role':
                        addARole();
                        break;
                       
                        case 'add employee':
                        addAnEmployee();
                        break;
                      
                        case 'Update an employee role':
                        updateAnEmployeeRole();
                        break
                      
                        case 'Update an employee manager':
                        updateAnEmployeeManger();
                        break;
                       
                        case 'View employees by department':
                        viewAllEmployeeByDepartment();

                    // } switch (answers.choice) {
                    //    case 'Delete department:
                    //     deleteADepartment();

                    // } switch (answers.choice) {
                    //    case 'Delete role':
                    //     deleteARole();

                    // } switch (answers.choice) {
                        // case 'Delete employee:
                    //     deleteAnEmployee();
                        
                    // } if (answers === 'View entire budget') {
                    //     viewEntireBudget();

                        case 'Exit application':
                        connection.end();
                        process.exit();
                    }
                });



// All functions are listed below.


function viewAllDepartments() {

    console.log('Displaying all of the departments shortly...');
    const sqlQuery = `SELECT * FROM department`;
    
    connection.query(sqlQuery, function (err, res) {
        if (err) throw err;
    // console.table displays all of the departments in the table.   
        console.table(res);
        centralPrompt();
     });
    };
    
    
    function viewAllRoles () {
    
    console.log('Displaying all of the roles shortly...');
    
    const sqlQuery = `SELECT * FROM role`;
    
    connection.query(sqlQuery, function (err, res) {
        if (err) throw err;
    // console.table displays all of the roles in the table.
    console.table(res);
    centralPrompt();
    });
    };
    
    
    function viewAllEmployees () {
    
    console.log('Displaying all of the employees shortly...');
    
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
                // constants to hold the answers and the SQL statement
                const sqlParametersRole  = [answers.nameOfRole, answers.roleSalary, answers.departmentId];
                const sqlQueryForRole = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
    
                connection.query(sqlQueryForRole, sqlParametersRole, function () {
                    if (err) throw err;
                    // console.table displays all of the added roles from the response in the table.
                    console.table(res);
                    centralPrompt();
                });
            });
          };
    
    
          function addAnEmployee() {
            inquirer.prompt([
              {
                type: "input",
                message: "What's the first name of the employee?",
                name: "employeesFirstName"
              },
              {
                type: "input",
                message: "What's the last name of the employee?",
                name: "employeesLastName"
              },
              {
                type: "input",
                message: "What is the employee's role id number?",
                name: "employeesRoleId"
              },
              {
                type: "input",
                message: "What is the manager id number?",
                name: "ManagersId"
              }
            ]).then(function (answers) {
                // constants to hold the answers and the SQL statement.
                const sqlQueryEmployee = `INSERT INTO employee (first_name, last_name, department_id, employee_role_id,) VALUES (?,?,?,?)`;
                const sqlParametersEmployee = [answers.employeesFirstName, answers.employeesLastName, answers.employeesRoleId, answers.ManagersId];
    
                connection.query(sqlQueryEmployee, sqlParametersEmployee, function () {
                    if (err) throw err;
                    // console.table displays all of the added roles from the response in the table.
                    console.table(res);
                    centralPrompt();
                });
             });
          };
    
         function updateAnEmployeeRole() {
            inquirer.prompt([
                {
                 type: input,
                 message: 'Please specify the name of the emplpoyee whose role you want to update',
                 name: updateEmployeeRoleName
                },
                {
                type: input,
                message: 'What is the new role of the employee you want to update?',
                name: updatedEmployeeRole
                }
            ]).then(function (answers) {
            // constants to hold the answers and the SQL statement.
            const sqlQueryUpdateEmployee = `UPDATE employee SET role_id = ? WHERE first_name = ?`;
            const sqlParametersUpdateEmployee = [answers.updateEmployeeRoleName, answers.updatedEmployeeRole];
    
            connection.query(sqlQueryUpdateEmployee, sqlParametersUpdateEmployee, function () {
                if (err) throw err;
                 // console.table displays all of the added roles from the response in the table.
                 console.table(res);
                 centralPrompt();
            });
        });
    };
    
    
    
    // BONUS //
    
    function updateAnEmployeeManger () {
        inquirer.prompt([
            {
             type: input,
             name: updateManager,
             message: 'Please specify the name of the employee to update.'
            },
            {
             type: input,
             name: employeesManager,
             message: 'What is the name of this employees manager?'
            }
        ]).then(function (answers) {
            // constants to hold the answers and the SQL statement.
            const sqlQueryUpdateManager = `UPDATE employee SET manager_id = ? WHERE id = ?`;
            const sqlParametersUpdateManager = [answers.updateManager, answers.employeesManager]
            connection.query(sqlQueryUpdateManager, sqlParametersUpdateManager, function () {
                if (err) throw err;
            // console.table displays all of the added roles from the response in the table.
                 console.table(res);
                 centralPrompt();
            });
        });
    };
    

};
    