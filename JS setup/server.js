// call all the files and packages needed to start the app
const mysql = require('mysql2');
const consTable = require('console.table');
const inquirer = require("inquirer");

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username and pass needed:
    user: 'root',
    password: 'Grym213yo!',
    database: 'emp_track',
  });
  
  db.connect(function (err) {
    if (err) throw (err)
    console.log(`Connected to the emp_track database!`)
    menu();
  });

const menu = ()  => {
  inquirer.prompt([
  {
    type: "list",
    message: "What would you like to do?",
    name: "menu",
    choices: ["View all Employees", "View all Roles", "View all Departments", "Add Employee", "Add Role", "Add Department", "Update Employee", "Quit"]
  }
]).then(res => {
  if(res.menu === "View all Employees") {
    viewAllEmployees()
  }
  else if(res.menu === "View all Roles") {
    viewAllRoles()
  }
  else if(res.menu === "View all Departments") {
    viewAllDepartments()
  }
  else if(res.menu === "Add Employee") {
    addEmployee()
  }
  else if(res.menu === "Add Role") {
    addRole()
  }
  else if(res.menu === "Add Department") {
    addDepartment()
  }
  else if(res.menu === "Update Employee") {
    updateEmployee()
  }
  else if(res.menu === "Quit") {
    console.log("Goodbye!")
  }
})
};

function viewAllEmployees() {
  const query = 'SELECT * FROM employee';
  db.query(query, 
    function (err, res) {
      if (err) throw err
      console.table(res)
      menu()
    })
};

function viewAllRoles() {
  const query = 'SELECT * FROM role';
  db.query(query, 
    function (err, res) {
      if (err) throw err
      console.table(res)
      menu()
    })
};

function viewAllDepartments() {
  const query = 'SELECT * FROM department';
  db.query(query, 
    function (err, res) {
      if (err) throw err
      console.table(res)
      menu()
    })
};

function addEmployee() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: "What is the employee's first name?"
    },
    {
      type: 'input',
      name: 'lastName',
      message: "What is the employee's last name?"
    },
    {
      type: 'input',
      name: 'employeeRole',
      message: "What is the employee's role id#?"
    },
    {
      type: 'input',
      name: 'manager',
      message: "What is their manager's id#?"
    },
  ])
  .then(res => {
    const query = 'INSERT INTO employee SET'
    db.query(
      query, {
        first_name: res.firstName,
        last_name: res.lastName,
        role_id: res.employeeRole,
        manager_id: res.manager
      }
    )
    console.log('You have added ${res.first_name} ${res.last_name} to the database!');
    menu()
  })
}

function addRole() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'roleName',
      message: 'What will be the name of the new role being added?'
    },{
      type: 'input',
      name: 'empSalary',
      message: 'What is the salary of the new role?'
    },
    {
      type: 'input',
      name: 'roleDepartment',
      message: 'What department does this new role fall under?'
    },
  ])
  .then(res => {
    const query = 'INSERT INTO role SET'
    db.query(
      query, {
        title: res.roleName,
        salary: res.empSalary,
        department_id: res.roleDepartment
      }
    )
    console.log('Added ${res.roleName} to the database!');
  })
}

function addDepartment() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'departmentName',
      message: 'What is the name of the new department being added?'
    }
  ])
  .then(res => {
    const query = 'INSERT INTO department SET'
    db.query(
      query, {
        department_name: res.departmentName
      }
    )
    console.log('Added ${res.departmentName} to the database!');
  })
}

function updateEmployee() {
  const updEmployee = 'SELECT * FROM employee';
  db.query(updEmployee, (err, data) => {
    if (err) throw (err);

    const employees = data.map(({id, first_name, last_name}) => ({name: first_name + "" + last_name, value:id}));
    inquirer.prompt ([
      {
        type: 'list',
        name: 'name',
        message: 'Which one of the employees would you like to update?',
        choices: employees
      }
    ])
    .then(empSelect => {
      const employee = empSelect.name;
      const params = [];
      params.push(employee);

      const updRole = 'SELECT * FROM role';
      db.query(updRole, (err, data) => {
        if (err) throw (err);
        const role = data.map(({id, title}) => ({name: title, value: id}));
      
        inquirer.prompt([
          {
            type: 'list',
            name: 'role',
            message: "What is the employee's new role?",
            choices: role
          }
        ])
        .then(roleSel => {
          const role = roleSel.role;
          params.push(role);

          let employee = params[0]
          params[0] = role
          params[1] = employee

          const sel = 'UPDATE employee SET role_id = ? WHERE id = ?'

          db.query(sel, params, (err, result) => {
            if (err) throw (err);
            console.log("The employee has been updated in the database!")
            menu();
          });
        });
    });
  });
});
};



