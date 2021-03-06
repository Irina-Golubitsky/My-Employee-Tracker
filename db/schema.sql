
DROP DATABASE IF EXISTS employee_database;
CREATE DATABASE employee_database;
USE employee_database;

-- Department table
CREATE TABLE department (
  id INTEGER NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

-- Role table
CREATE TABLE role (
  id INTEGER NOT NULL AUTO_INCREMENT ,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INTEGER NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES department(id)
 
);

-- Emoloyee table
CREATE TABLE employee (
  id INTEGER NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER NOT NULL,
  manager_id INTEGER,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
  );