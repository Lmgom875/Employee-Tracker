const mysql = require("mysql");

const pass = require("./password");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: pass,
    database: "EmpTrackerDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as ID: " + connection.threadId);
    testDB();
})

function testDB() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    })
}