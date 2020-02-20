/* Schema for SQL database/table. We haven't discussed this type of file yet */
DROP DATABASE IF EXISTS EmpTrackerDB;

/* Create database */
CREATE DATABASE EmpTrackerDB;
USE EmpTrackerDB;

/** Create new table with a primary key that auto-increments, and a text field */
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL (10, 2) NOT NULL,
  department_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE deparment (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Luis", "Gomez", 1,1),
		("Enid", "Claudio", 2,1),
        ("Stephanie", "Gomez", 4,2);
INSERT INTO department (name)
VALUES ("Gerencia"),
		("Mecadeo"),
        ("Ventas"),
        ("Mantenimiento"),
        ("Produccion"); 
        
INSERT INTO role (title, salary, department_id)
VALUES ("Gerente", 5000, 1),
		("Secretaria", 3000, 1),
        ("Asistente", 2500, 1),
        ("Supervisor", 3500, 2),
        ("Oficial", 3000, 2),
        ("Oficial_2", 2700, 2),
        ("Sup_Ventas", 3500, 3),
        ("Vendedor", 2500, 3),
        ("Vendedor2", 2300, 3),
        ("Emp_Mant", 1800, 4),
        ("Sup_Mant", 2000, 4),
        ("Sup_Prod", 2200, 5),
        ("Emp_Prod", 1800, 5);
 SELECT first_name, last_name, role.title, role.salary, department.name
 FROM employee 
 INNER JOIN role ON employee.role_id = role.id
 INNER JOIN department ON role.department_id = department.id;
 
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Jeremy","Cannon",12,5),
        ("Earl","Roussel",1,5),
        ("Martha","Brown",1,5),
        ("Mark","Gadd",1,5),
        ("Caridad","Sanders",2,3),
        ("Joseph","Williams",2,3),
        ("Rita","McDowell",2,3),
        ("John","Schmidt",1,3),
        ("Laura","Cowley",1,3),
        ("Suzette","Burke",1,3),
        ("Mary","Cook",1,3),
        ("Daniel","Edwards",1,3),
        ("Joe","Rau",1,3),
        ("Ryan","Davis",1,2),
        ("Esther","Comeaux",1,4),
        ("Faith","Day",1,4),
        ("Kimberly","Ramos",1,4),
        ("George","Fallin",2,4),
        ("Heather","Merchant",2,4),
        ("Richard","Martinez",2,2),
        ("Maria","Bevis",2,2),
        ("Susan","Skinner",2,2),
        ("Sonja","Larios",2,2),
        ("Ryan","Fletcher",2,2),
        ("Jason","Grover",2,2),
        ("Stephanie","Hayes",2,2),
        ("Roberto","Martin",4,2),
        ("Brandon","Starkey",4,2),
        ("Joshua","Barriga",4,1),
        ("Herman","Harris",4,1),
        ("Clorinda","Noe",4,1),
        ("Sam","Cooper",4,1),
        ("Alex","Basile",4,1),
        ("Richard","Schlosser",3,1),
        ("Otis","Stephenson",3,1),
        ("Wendy","Ringer",3,1),
        ("Susan","Carpenter",3,1),
        ("Judy","Morrison",5,1),
        ("Linda","Waddell",5,1),
        ("Michael","Park",5,3),
        ("Linda","Brand",5,3),
        ("Stephen","Linch",6,3),
        ("Dorothy","Pagan",6,3),
        ("Micheal","Thomson",6,3),
        ("Evelyn","Hebb",6,3),
        ("Brenda","Todd",6,3),
        ("Michael","Ferebee",6,3),
        ("Ralph","Bill",7,3),
        ("Erma","Wood",7,3),
        ("Alethia","Pleasants",7,3),
        ("David","Rosenfeld",7,2),
        ("Clarence","Walker",7,2),
        ("Helen","Corrales",7,2),
        ("Gregory","Foster",7,2),
        ("Marie","Brumbaugh",7,2),
        ("Ricky","Sitz",7,2),
        ("Howard","Marquez",7,2),
        ("Charles","Oberg",8,2),
        ("John","Walker",8,2),
        ("Irene","Fields",8,2),
        ("Carol","Sievers",8,2),
        ("James","Bolton",8,4),
        ("Howard","Garman",8,4),
        ("Lynne","Joseph",8,4),
        ("Ronald","Emmert",8,4),
        ("Gregg","Blevins",8,4),
        ("Sue","Huls",9,4),
        ("Greg","Hudson",9,4),
        ("Carrie","Reeves",9,4),
        ("Melissa","Nickerson",9,4),
        ("Patricia","Reiter",9,4),
        ("Jason","Lineberry",9,4),
        ("Stella","Tartaglia",9,4),
        ("Deborah","Starling",9,4),
        ("Frank","Kopp",9,4),
        ("James","Antle",9,4),
        ("Shaunna","Cook",9,4),
        ("Wanda","Banks",10,4),
        ("Misty","Law",10,5),
        ("William","Jones",10,5),
        ("Steven","Blackstock",10,5),
        ("Heather","Duncan",10,5),
        ("Jerry","Robinson",10,5),
        ("Mario","Hoyos",10,5),
        ("Antonio","Jaramillo",10,5),
        ("Evelyn","Pressler",10,5),
        ("Sean","Hardin",10,5),
        ("Ruth","Raleigh",10,5),
        ("James","Chapman",10,5),
        ("Timothy","Spence",11,5),
        ("Anthony","Harris",11,5),
        ("Monique","Drummond",11,5),
        ("John","Stollings",11,5),
        ("David","Hicks",11,5),
        ("Robert","Sack",11,5),
        ("Barbara","Johnson",11,1),
        ("Aletha","Crawford",11,1),
        ("David","Pyle",12,1),
        ("John","Ernst",12,1),
        ("Matthew","Hughes",12,1);
        
        
