// constants
const express = require('express');
const db = require('./db/connection');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();


// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        AskUser();
    });
});
// main menu
function AskUser() {
    inquirer
        .prompt({
            type: "list",
            name: "mainMenu",
            message: "What would you like to do?",
            choices: [
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "Add a Department",
                "Add a Role",
                "Add an Employee",
                "Update an Employee Role"
            ]
        })
        .then(function (answer) {
            switch (answer.mainMenu) {

                case "View All Departments":
                    viewAllDept();
                    break;

                case "View All Roles":
                    viewAllRoles();
                    break;

                case "View All Employees":
                    viewAllEmployees();
                    break;

                case "Add a Department":
                    addDept();
                    break;

                case "Add a Role":
                    addRole();
                    break;

                case "Add an Employee":
                    addEmployee();
                    break;

                case "Update an Employee Role":
                    updateEmployeeRole();
                    break;
            }
        });
}
// show all employee with role name, department name, and manager first and lastname
function viewAllEmployees() {
    var query = `SELECT employee.id, employee.first_name, employee.last_name, role.title,
                 department.department_name AS department, role.salary, CONCAT(manager.first_name, " " , manager.last_name) AS 'manager'
                FROM employee 
                LEFT JOIN role ON employee.role_id = role.id 
                LEFT JOIN department on role.department_id = department.id
                LEFT JOIN employee manager on manager.id = employee.manager_id;
                `
    db.query(query, function (err, res) {
        console.table(res);
        AskUser();
    });
}
// show department table
function viewAllDept() {
    var query = "SELECT id, department_name AS department FROM department"
    db.query(query, function (err, res) {
        console.table(res);
        AskUser();
    });
}
// show role table with department name
function viewAllRoles() {
    var query = `SELECT  role.id,role.title, department.department_name AS department, role.salary
      FROM role
      LEFT JOIN department on role.department_id = department.id`
    db.query(query, function (err, res) {
        console.table(res);
        AskUser();
    });
}
// add new department
function addDept() {
    inquirer
        .prompt({
            type: "input",
            message: "Enter the name of a new department",
            name: "newDep",
            validate: depInput => {
                if (depInput) {
                  return true;
                } else {
                  console.log("Please enter new role's title!");
                  return false;
                }
              }
        })
        .then(function (res) {
            const newDepartment = res.newDep;
            const query = `INSERT INTO department (department_name) VALUES ("${newDepartment}")`;
            db.query(query, function (err, res) {
                if (err) {
                    throw err;
                }
                console.log(newDepartment + " was added");
                AskUser();
            });
        });
}
// create an array of managers from employee table
function getManagers() {
    let managerArray = [];
    const query = 'SELECT * FROM employee'
    db.query(query, (error, response) => {
        if (error) throw error;
        response.forEach((employee) => {
            managerArray.push(employee.id + ' - ' + employee.first_name + " " + employee.last_name);
        })
    });
    return managerArray;
}
// array of roles from role table
function getRoles() {
    let rolesArray = [];
    const query = 'SELECT * FROM role'
    db.query(query, (error, response) => {
        if (error) throw error;
        response.forEach((role) => {
            rolesArray.push(role.id + ' - ' + role.title);
        })
    });
    return rolesArray;
}
// add new role to role table
function addRole() {
    let departmentArray = [];
    const query = 'SELECT * FROM department'
    db.query(query, (error, response) => {
        if (error) throw error;
        response.forEach((department) => {
            departmentArray.push(department.id + ' - ' + department.department_name);
        })
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "Enter new role's title",
                    name: "roleTitle",
                    validate: roleInput => {
                        if (roleInput) {
                          return true;
                        } else {
                          console.log("Please enter new role's title!");
                          return false;
                        }
                      }
                },
                {
                    type: "input",
                    message: "Enter new role's salary",
                    name: "roleSalary",
                    validate: roleSalary => {
                        if (roleSalary.valueOf()>0) {
                          return true;
                        } else {
                          console.log("Please enter new role's salary!");
                          return false;
                        }
                      }
                },
                {
                    type: "list",
                    message: "Select the department new role belongs to",
                    name: "departmentID",
                    choices: departmentArray
                }
            ])
            .then(function (res) {
                const title = res.roleTitle;
                const salary = res.roleSalary;
                let departmentID = parseInt(res.departmentID.substring(0, res.departmentID.search(' ')));
                console.log(departmentID);
                const query = `INSERT INTO role (title, salary, department_id) VALUES ("${title}", "${salary}", "${departmentID}")`;
                db.query(query, function (err, res) {
                    if (err) {
                        throw err;
                    }
                    console.log(title + " was added to role table");
                    AskUser();
                });
            });
    });

}
// add new employee to employee table
async function addEmployee() {
    let rolesArray = await getRoles();
    let managersArray = getManagers();
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter new employee's first name",
                name: "firstName",
                validate: empName => {
                    if (empName ) {
                      return true;
                    } else {
                      console.log("Please enter new employee's first name");
                      return false;
                    }
                  }
            },
            {
                type: "input",
                message: "Enter new employee's last name",
                name: "lastName",
                validate: empLastname => {
                    if (empLastname) {
                      return true;
                    } else {
                      console.log("Please enter new employee's first name");
                      return false;
                    }
                  }
            },
            {
                type: "list",
                message: "Select the employee's role",
                name: "role",
                choices: rolesArray
            },
            {
                type: "list",
                message: "Select the employee's manager",
                name: "manager",
                choices: managersArray
            }
        ])
        .then(function (res) {
            const firstName = res.firstName;
            const lastName = res.lastName;
            const roleID = parseInt(res.role.substring(0, res.role.search(' ')));
            const managerID = parseInt(res.manager.substring(0, res.manager.search(' ')));
            const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", "${roleID}", "${managerID}")`;
            db.query(query, function (err, res) {
                if (err) {
                    throw err;
                }
                console.log(firstName+" " +lastName + " was added to employee table");
                AskUser();
            });
        });
}
// change the employee role; update employee table
function updateEmployeeRole() {
    let rolesArray = getRoles();
    let employeeArray = [];
    const query = 'SELECT * FROM employee'
    db.query(query, (error, response) => {
        if (error) throw error;
        response.forEach((employee) => {
            employeeArray.push(employee.id + ' - ' + employee.first_name + " " + employee.last_name);
        })
        inquirer
            .prompt([
                {
                    type: "list",
                    message: "Select the employee",
                    name: "employee",
                    choices: employeeArray
                },
                {
                    type: "list",
                    message: "Select the employee's role",
                    name: "role",
                    choices: rolesArray
                }
            ])
            .then(function (res) {
                const roleID = parseInt(res.role.substring(0, res.role.search(' ')));
                const employeeID = parseInt(res.employee.substring(0, res.employee.search(' ')));
                const queryUpdate = `UPDATE employee SET role_id = "${roleID}" WHERE id = "${employeeID}"`;
                db.query(queryUpdate, function (err, res) {
                    if (err) {
                        throw err;
                    }
                    console.log("The role was changed");
                    AskUser();
                })
            });
    });


}
