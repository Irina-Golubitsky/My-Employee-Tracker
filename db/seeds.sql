USE employee_database;
-- Department table
INSERT INTO department (department_name) 
VALUES 
("Sales"),
("Engineering"),
("Finance"),
("Legal");
-- Role Table
INSERT INTO role (title, salary, department_id) 
VALUES 
("Sailes Lead", 100000.00, 1),
("Salesperson", 80000.00, 1),
("Lead Engineer", 150000.00, 2),
("Software Engineer", 120000.00, 2),
("Accountant", 125000.00, 3),
("Legal Team Lead", 250000.00, 4),
("Lawer", 190000.00, 4);
-- Employee table 
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES 
("John", "Doe", 1,3),
("Mike", "Chan", 2,1),
("Ashley", "Rodrigues", 2, NULL),
("Kevin", "Tupik", 4,3),
("malia", "Brown", 5, NULL),
("Sarah", "Lourd", 5, NULL),
("Tom", "Allen", 7,6),
("Chritian", "Eckenrode", 2,2),