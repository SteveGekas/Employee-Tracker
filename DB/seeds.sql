INSERT INTO department(name)
VALUES("Programmer"), ("Designer"), ("Developer"), ("Tester");

INSERT INTO role(title, salary, department_id)
VALUES("Programmer", 75000.00, 1), ("Tester", 50000.00, 4), ("Developer", 66000.00, 3), ("Designer", 58000.00, 2);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Keyser", "Sozei", 2, null), ("Bill", "Ding", 1, 3), ("Meek", "Mills", 3, 1), ("Method", "Man", 2, 2);
