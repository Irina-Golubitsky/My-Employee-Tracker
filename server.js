const express = require('express');
const db = require('./db/connection');
const inquirer = require('inquirer');
const consoleTable= require('console.table');

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
  
  function viewAllDept() {
    var query = "SELECT id, department_name AS department FROM department"
    db.query(query, function (err, res) {
      console.table(res);
      AskUser();
    });
  }
  
  function viewAllRoles() {
    var query = `SELECT  role.id,role.title, department.department_name AS department, role.salary
      FROM role
      LEFT JOIN department on role.department_id = department.id`
    db.query(query, function (err, res) {
      console.table(res);
      AskUser();
    });
  }
  
  