//! Require all the node package and file necessary
//? Node package for comand prompt instruction
const inquirer = require("inquirer");
//? File where the DB call is
const connection = require("./DB/dbConnection.js")

//! Arrays for DB info
let rolesArray = [];
let managerArray = [];
let deptArray = [];

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
            "Add a new department, role or employee",
            "View a department, role or employee",
            "Update a department, role or employee",
            "Exit app"
        ]
    }).then(function (answer) {
        switch (answer.action) {
            case "Add a new department, role or employee":
                addNew();
                break;
            case "View a department, role or employee":
                require("./view");
                break
            case "Update a department, role or employee":
                require("./update");
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
    rolesArray = await rolesChoices();
    managerArray = await managerChoices();
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
        choices: rolesArray
    }, {
        name: "managerId",
        type: "rawlist",
        message: "What is the manager id?",
        choices: managerArray
    }])
    let insert = await connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answer.firstName}","${answer.lastName}","${answer.roleId}","${answer.managerId}")`)
    console.log(`New employee created ${answer.firstName} ${answer.lastName} with the ID ${insert.insertId}`);
    connection.end();
    inic();
}

//! New role async function (need wait for DB responce)
const addNewRole = async () => {
    deptArray = await departmentChoices();
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
        choices: deptArray,
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



inic();