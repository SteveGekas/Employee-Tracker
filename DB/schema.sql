DROP DATABASE IF EXISTS Employee_TrackerDB;

CREATE DATABASE Employee_TrackerDB;

USE Employee_TrackerDB;

CREATE TABLE department (
	id INTEGER AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NOT NULL,
    
    PRIMARY KEY (id)
);

CREATE TABLE role (
	id INTEGER AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(7, 2) NOT NULL,
    department_id INTEGER,
    
    PRIMARY KEY (id)
);

CREATE TABLE employee (
	id INTEGER AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    
    PRIMARY KEY (id)
);

USE Employee_TrackerDB;

ALTER TABLE role
ADD FOREIGN KEY (department_id) REFERENCES
employee (id);

ALTER TABLE employee
ADD FOREIGN KEY (role_id) REFERENCES
employee (id),
ADD FOREIGN KEY (manager_id) REFERENCES
employee (id);