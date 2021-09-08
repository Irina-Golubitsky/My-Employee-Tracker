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
INSERT INTO employee (first_name, last_name, role_id) 
VALUES 
("John", "Doe", 1),
("Mike", "Chan", 2),
("Ashley", "Rodrigues", 2),
("Kevin", "Tupik", 4),
("malia", "Brown", 5),
("Sarah", "Lourd", 5),
("Tom", "Allen", 7),
("Chritian", "Eckenrode", 2);

--change employee table; add manager id

UPDATE employee SET manager_id = 1 WHERE id = 2;
UPDATE employee SET manager_id = 1 WHERE id = 2;
UPDATE employee SET manager_id = 3 WHERE id = 1;
UPDATE employee SET manager_id = 6 WHERE id = 7;
UPDATE employee SET manager_id = 2 WHERE id = 8;


