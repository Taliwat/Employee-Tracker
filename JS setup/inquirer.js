// Where we will write the blueprint for the questions to be asked for the challenge.
const inquirer = require("inquirer")
const fs = require('fs')

inquirer
    .prompt([
        {
            name: "Intro/start question",
            type: "list",
            message: "What would you like to do?",
            choices: ["View All Employees", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"]
        }
        ]);