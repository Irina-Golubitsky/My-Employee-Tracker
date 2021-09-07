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

  