//! Require all the node package and file necessary
//? Node package for comand prompt instruction
const inquirer = require("inquirer");
const { printTable } = require('console-table-printer');
//const cTable = require('console.table');
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
async function managerChoices() {
    let manager = await connection.query("SELECT * FROM employee")
    managerMap = manager.map(elem => { return { name: elem.last_name, value: elem.id } });
    return managerMap;
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
    dbArray2 = await managerChoices();
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
        message: "What is the manager id?",
        choices: dbArray2
    }])
    let insert = await connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answer.firstName}","${answer.lastName}","${answer.roleId}","${answer.managerId}")`)
    console.log(`New employee created ${answer.firstName} ${answer.lastName} with the ID ${insert.insertId}`);
    connection.end();
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
    console.log(answer);
    let insertRole = await connection.query(`INSERT INTO role (title, salary, department_id) VALUES ("${answer.newTitle}","${answer.salary}","${answer.deptName}")`)
    console.log(`New role created ${answer.newTitle} with the ID ${insertRole.insertId}`);
    connection.end();
    inic();
}

//! New department async function (need wait for DB responce)
const addNewDepartment = async () => {
    let answer = await inquirer.prompt({
        name: "newDeptName",
        type: "input",
        message: "What is the new department name?"
    })
    console.log(answer);
    let insertDept = await connection.query(`INSERT INTO department (name) VALUES ("${answer.newDeptName}")`)
    console.log(`New department created ${answer.newDeptName} with the ID ${insertDept.insertId}`);
    connection.end();
    inic();
}

//! View functions start here
const viewInfo = () => {
    inquirer.prompt({
        name: "action",
        type: "rawlist",
        message: "What would you want to do?",
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
    connection.end();
    inic();
}

//! Role view function
async function viewRoles() {
    let viewRoleInfo = await connection.query("SELECT first_name, last_name, role.title, role.salary FROM employee INNER JOIN role ON employee.role_id = role.id")
    viewRoleInfoMap = viewRoleInfo.map(viewRoleInfo => { return { FirstName: viewRoleInfo.first_name, LastName: viewRoleInfo.last_name, Title: viewRoleInfo.title, Salary: viewRoleInfo.salary } });
    dbArray1 = await viewRoleInfoMap;
    const roleTable = dbArray1;
    printTable(roleTable);
    connection.end();
    inic();
}

//! Department view function
async function viewDepartments() {
    let viewDeptInfo = await connection.query("SELECT first_name, last_name, department.name FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id")
    viewDeptInfoMap = viewDeptInfo.map(viewDeptInfo => { return { FirstName: viewDeptInfo.first_name, LastName: viewDeptInfo.last_name, DeptName: viewDeptInfo.name } });
    dbArray1 = await viewDeptInfoMap;
    const deptTable = dbArray1;
    printTable(deptTable);
    connection.end();
    inic();
}

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
    connection.end();
    inic();
}

//! All view function
async function viewALL() {
    let viewAllInfo = await connection.query("SELECT first_name, last_name, role.title, role.salary, department.name FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id")
    viewAllInfoMap = viewAllInfo.map(viewAllInfo => { return { FirstName: viewAllInfo.first_name, LastName: viewAllInfo.last_name, Title: viewAllInfo.title, Salary: viewAllInfo.salary, DeptName: viewAllInfo.name } });
    dbArray1 = await viewAllInfoMap;
    const allTable = dbArray1;
    printTable(allTable);
    connection.end();
    inic();
}

inic();
