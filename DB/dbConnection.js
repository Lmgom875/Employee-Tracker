//! Require all the node package necessary
//? For SQL calls
const mysql = require("mysql");
//? For pass the password for the DB
const pass = require("../password");
//? For create a Promise from the DB call info
const util = require("util");
//! SQL DB info for make a connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: pass,
    database: "EmpTrackerDB"
});

//! DB connection
connection.connect()
//! Convert the DB query into a promise
connection.query = util.promisify(connection.query)

//! Function for test DB connection !!!NOT IN USE!!!
function testDB() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    })
}


module.exports = connection;




