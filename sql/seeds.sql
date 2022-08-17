/* Allows the employeeDB to be incorperated into the project */
USE employeeDB;

/* This inserts the values into the department table */
INSERT INTO department
(name)

VALUES
('Marketing'),
('Engineering'),
('Advertising'),
('Business');


INSERT INTO role
(title, salary, department_id)

VALUES 
('Marketing Manager', 100000, 1),
('Marketing Associate',67000, 1),
('Lead Engineering Manager', 107000, 2),
('Engineer', 95000, 2),
('Advertising Manager', 105000, 3),
('Advertising Asscociate', 86000, 3),
('Business Manager', 150000, 4),
('Businessman', 120000, 4);

INSERT INTO employee
(first_name, last_name, role_id, manager_id)

VALUES
('James', 'Verano', 1, 2),
('Carl', 'Wheezer', 2, 1),
('Cherry', 'Mooredell', 3, 4),
('Naruto', 'Uzumaki', 4, 3),
('Fabio', 'Breezehair', 5, 6),
('Lisa', 'Simpson', 6, 5),
('Draco', 'Mouffoy', 7, 8),
('Kirby', 'Moore', 8, 7);