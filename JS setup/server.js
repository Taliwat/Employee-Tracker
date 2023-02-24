// call all the files and packages needed to start the app
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require("inquirer");

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username and pass needed:
    user: 'root',
    password: 'Grymdir213yo!',
    database: 'emp_track'
  },
  console.log(`Connected to the emp_track database!`)
);

const menu = ()  => {
  inquirer.prompt([
  {
    type: "list",
    message: "What would you like to do?",
    name: "menu",
    choices: ["View all Employees", "View all Roles", "View all Departments"]
  }
])
}




