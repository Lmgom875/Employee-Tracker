//! Require all the node package and file necessary
//? Node package for comand prompt instruction
const inquirer = require("inquirer");
const { printTable } = require('console-table-printer');
//? File where the DB call is
const connection = require("./DB/dbConnection.js")

//! Arrays for DB info
let dbArray1 = [];
let dbArray2 = [];

//! Function for get Choises info from DB
//TODO Improve code UPDATE igual code
async function rolesChoices() {
    let roles = await connection.query("SELECT * FROM role")
    roleMap = roles.map(role => { return { name: role.title, value: role.id } });
    return roleMap;
}

//! Function for get managers info from DB
//TODO Improve code UPDATE igual code
async function employeeChoices() {
    let employee = await connection.query("SELECT * FROM employee")
    employeeMap = employee.map(elem => { return { name: elem.first_name + " " + elem.last_name, value: elem.id } });
    return employeeMap;
}

//! Function for get departments info from DB
//TODO Improve code UPDATE igual code
async function departmentChoices() {
    let dept = await connection.query("SELECT * FROM department")
    deptMap = dept.map(elem => { return { name: elem.name, value: elem.id } });
    return deptMap;
}

//! APP start here
const inic = () => {
    inquirer.prompt({
        name: "action",
        type: "rawlist",
        message: "What would you want to do?",
        choices: [
            "Add a new employee, role or department",
            "View employees, roles or departments",
            "Update a employee, role or department",
            "Exit app"
        ]
    }).then(function (answer) {
        switch (answer.action) {
            case "Add a new employee, role or department":
                addNew();
                break;
            case "View employees, roles or departments":
                viewInfo();
                break
            case "Update a employee, role or department":
                updateInfo();
                break;
            case "Exit app":
                connection.end();
                console.log("BYE :{");
                break;
        }
    })
}

//! Adds functions start here
const addNew = () => {
    inquirer.prompt({
        name: "action",
        type: "rawlist",
        message: "What would you want to do?",
        choices: [
            "Add a new employee",
            "Add a new role",
            "Add a new department",
        ]
    }).then(function (answer) {
        switch (answer.action) {
            case "Add a new employee":
                addNewEmployee();
                break;
            case "Add a new role":
                addNewRole();
                break
            case "Add a new department":
                addNewDepartment();
                break;
        }
    })
}

//! New employee async function (need wait for DB responce)
const addNewEmployee = async () => {
    dbArray1 = await rolesChoices();
    dbArray2 = await employeeChoices();
    let answer = await inquirer.prompt([{
        name: "firstName",
        type: "input",
        message: "Employee first name?"
    }, {
        name: "lastName",
        type: "input",
        message: "Employee last name?",
    }, {
        name: "roleId",
        type: "rawlist",
        message: "Employee role?",
        choices: dbArray1
    }, {
        name: "managerId",
        type: "rawlist",
        message: "What is the manager name?",
        choices: dbArray2
    }])
    let insert = await connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answer.firstName}","${answer.lastName}","${answer.roleId}","${answer.managerId}")`)
    console.log(`New employee created ${answer.firstName} ${answer.lastName} with the ID ${insert.insertId}`);
    inic();
}

//! New role async function (need wait for DB responce)
const addNewRole = async () => {
    dbArray1 = await departmentChoices();
    let answer = await inquirer.prompt([{
        name: "newTitle",
        type: "input",
        message: "What is the new title?"
    }, {
        name: "salary",
        type: "input",
        message: "What is the salary?",
    }, {
        name: "deptName",
        type: "list",
        message: "Which department?",
        choices: dbArray1,
    }])
    let insertRole = await connection.query(`INSERT INTO role (title, salary, department_id) VALUES ("${answer.newTitle}","${answer.salary}","${answer.deptName}")`)
    console.log(`New role created ${answer.newTitle} with the ID ${insertRole.insertId}`);
    inic();
}

//! New department async function (need wait for DB responce)
const addNewDepartment = async () => {
    let answer = await inquirer.prompt({
        name: "newDeptName",
        type: "input",
        message: "What is the new department name?"
    })
    let insertDept = await connection.query(`INSERT INTO department (name) VALUES ("${answer.newDeptName}")`)
    console.log(`New department created ${answer.newDeptName} with the ID ${insertDept.insertId}`);
    inic();
}

//! View functions start here
const viewInfo = () => {
    inquirer.prompt({
        name: "action",
        type: "rawlist",
        message: "What would you want to view?",
        choices: [
            "View employees",
            "View roles",
            "View departments",
            "View managers",
            "View all"
        ]
    }).then(function (answer) {
        switch (answer.action) {
            case "View employees":
                viewEmployees();
                break;
            case "View roles":
                viewRoles();
                break
            case "View departments":
                viewDepartments();
                break;
            case "View managers":
                viewManagers();
                break;
            case "View all":
                viewALL();
                break;
        }
    })
}

//! Employee view function
async function viewEmployees() {
    let viewEmpInfo = await connection.query("SELECT first_name, last_name FROM employee")
    viewEmpInfoMap = viewEmpInfo.map(viewEmpInfo => { return { FirstName: viewEmpInfo.first_name, LastName: viewEmpInfo.last_name } });
    dbArray1 = await viewEmpInfoMap;
    const empTable = dbArray1;
    printTable(empTable);
    inic();
}

//! Role view function
async function viewRoles() {
    let viewRoleInfo = await connection.query("SELECT first_name, last_name, role.title, role.salary FROM employee INNER JOIN role ON employee.role_id = role.id")
    viewRoleInfoMap = viewRoleInfo.map(viewRoleInfo => { return { FirstName: viewRoleInfo.first_name, LastName: viewRoleInfo.last_name, Title: viewRoleInfo.title, Salary: viewRoleInfo.salary } });
    dbArray1 = await viewRoleInfoMap;
    const roleTable = dbArray1;
    printTable(roleTable);
    inic();
}

//! Department view function
async function viewDepartments() {
    let viewDeptInfo = await connection.query("SELECT first_name, last_name, department.name FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id")
    viewDeptInfoMap = viewDeptInfo.map(viewDeptInfo => { return { FirstName: viewDeptInfo.first_name, LastName: viewDeptInfo.last_name, DeptName: viewDeptInfo.name } });
    dbArray1 = await viewDeptInfoMap;
    const deptTable = dbArray1;
    printTable(deptTable);
    inic();
}

//! Manager view function
async function viewManagers() {
    const query = `SELECT e.id empID, CONCAT(e.first_name, " ", e.last_name) AS Employee, CONCAT(m.first_name, " ", m.last_name) AS Manager
                   FROM employee e
                   JOIN role r ON e.role_id = r.id
                   LEFT JOIN employee m ON m.id = e.manager_id`;
    let viewManagerInfo = await connection.query(query)
    viewManagerInfoMap = viewManagerInfo.map(elem => { return { empID: elem.empID, name: elem.Employee, mgrName: elem.Manager } });
    dbArray1 = await viewManagerInfo;
    const mgrTable = dbArray1;
    printTable(mgrTable);
    inic();
}

//! All view function
async function viewALL() {
    let viewAllInfo = await connection.query("SELECT first_name, last_name, role.title, role.salary, department.name FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id")
    viewAllInfoMap = viewAllInfo.map(viewAllInfo => { return { FirstName: viewAllInfo.first_name, LastName: viewAllInfo.last_name, Title: viewAllInfo.title, Salary: viewAllInfo.salary, DeptName: viewAllInfo.name } });
    dbArray1 = await viewAllInfoMap;
    const allTable = dbArray1;
    printTable(allTable);
    inic();
}

//! Update function start here
const updateInfo = () => {
    inquirer.prompt({
        name: "action",
        type: "rawlist",
        message: "What would you want to update?",
        choices: [
            "Update employee",
            "Update role",
            "Update department",
        ]
    }).then(function (answer) {
        switch (answer.action) {
            case "Update employee":
                updateEmployee();
                break;
            case "Update role":
                updateRoles();
                break
            case "Update department":
                updateDepartments();
                break;
        }
    })
}

//! Update employees functions

const updateEmployee = async () => {
    dbArray2 = await employeeChoices();
    let empChoise = await inquirer.prompt({
        name: "empOldName",
        type: "list",
        message: "What employee do you want to update?",
        choices: dbArray2
    })
    dbArray1 = await rolesChoices();
    dbArray2 = await employeeChoices();
    let answer = await inquirer.prompt([{
        name: "firstName",
        type: "input",
        message: "Employee first name?"
    }, {
        name: "lastName",
        type: "input",
        message: "Employee last name?",
    }, {
        name: "roleId",
        type: "rawlist",
        message: "Employee role?",
        choices: dbArray1
    }, {
        name: "managerId",
        type: "rawlist",
        message: "What is the manager name?",
        choices: dbArray2
    }])
    const query = `UPDATE employee SET first_name = "${answer.firstName}", last_name = "${answer.lastName}", role_id = "${answer.roleId}", manager_id = "${answer.managerId}" WHERE id = ${empChoise.empOldName}`
    let insert = await connection.query(query, function (err, res) {
        if (err) throw err;
        console.log(`Employee updated`);
        inic();
    })
}

//! Update roles
const updateRoles = async () => {
    dbArray1 = await rolesChoices();
    let answer = await inquirer.prompt([{
        name: "oldRole",
        type: "list",
        message: "What role do you want to update?",
        choices: dbArray1,
    }, {
        name: "newRole",
        type: "input",
        message: "What is the new title for the role?",
    }])
    let query = `UPDATE role SET title = "${answer.newRole}" WHERE id = ${answer.oldRole}`
    let updateRole = await connection.query(query)
    console.log(`Role updated`);
    inic();
}

//! Update departments
const updateDepartments = async () => {
    dbArray1 = await departmentChoices();
    let answer = await inquirer.prompt([{
        name: "oldDept",
        type: "list",
        message: "What department do you want to update?",
        choices: dbArray1,
    }, {
        name: "newDept",
        type: "input",
        message: "What is the new name for the department?",
    }])
    let query = `UPDATE department SET name = "${answer.newDept}" WHERE id = ${answer.oldDept}`
    let updateDept = await connection.query(query)
    console.log(`Department updated`);
    inic();
}

inic();
