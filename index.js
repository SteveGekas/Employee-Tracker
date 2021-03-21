const connection = require('./config/connection');
const inquirer = require('inquirer');
const table = require('console.table');
const chalk = require('chalk');
const fig = require('figlet');



connection.connect((err) => {
    if (err) throw err;
    console.log(chalk.red.bold(`******************************************************************`));
    console.log(``);
    console.log(chalk.yellow.bold(fig.textSync('Employee')));
    console.log(``);
    console.log(chalk.yellow.bold(fig.textSync('                             Tracker')));
    console.log(``);
    console.log(chalk.red.bold(`******************************************************************`));
    runList();
});

const runList = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to accomplish?',
            choices: [
                'Add',
                'View',
                'Update',
                'Delete',
                'Exit'
                //'Update an Employee',
                //'Update a Manager of an Employee',
                //'View an Employee by Manager',
                //'Delete an Employee',
                //'View Total Department Budget'
            ]
        }).then(answer => {
            switch (answer.action) {
                case 'Add':
                    addSearch();
                    break;

                case 'View':
                    viewSearch();
                    break;

                case 'Update':
                    updateSearch();
                    break;

                case 'Delete':
                    deleteSearch();
                    break;

                case 'Exit':
                    connection.end();
                    break;

            }
        });
};


const addSearch = () => {
    inquirer.prompt({
        type: 'list',
        message: 'Please choose one of the following: ',
        choices: ['Departments', 'Roles', 'Employee', 'Exit'],
        name: 'toAdd'
    }).then(answer => {

        if (answer.toAdd === 'Departments') {
            addDept();
        }

        if (answer.toAdd === 'Roles') {
            addRole();
        }

        if (answer.toAdd === 'Employees') {
            addEmp();
        }

        if (answer.toAdd === 'Exit') {
            connection.end();
        }

    });
}

const addDept = () => {
    inquirer.prompt({
        type: 'input',
        message: 'Please enter the name of the new department.',
        name: 'newDept'
    }).then(answer => {
        const AND = `INSERT INTO department(name) VALUES (?)`;
        connection.query(AND, answer.newDept, (err, res) => {
            if (err) throw err;
            console.table(res);

            viewDeptSearch();
        });
    });
};

const addRole = () => {
    inquirer.prompt({
        type: 'input',
        message: 'Please enter the new role title.',
        name: 'newTitle'
    }).then(answer => {
        const title = `INSERT INTO role(title) VALUES (?)`;
        connection.query(title, answer.newTitle, (err, res) => {
            if (err) throw err;
            //     console.log('Next input...');
        })
        inquirer.prompt({
            type: 'input',
            message: 'Please enter salary.',
            name: 'newSalary'
        }).then(answer => {
            const salary = `INSERT INTO role(salary) VALUES (?)`;
            connection.query(salary, answer.newSalary, (err, res) => {
                if (err) throw err;
                //     console.log('Last input...');
            })
            inquirer.prompt({
                type: 'input',
                message: 'Please enter department ID.',
                name: 'newID'
            }).then(answer => {
                const newDeptId = `INSERT INTO role(department_id) VALUES (?)`;
                connection.query(newDeptId, answer.newID, (err, res) => {
                    if (err) throw err;
                    console.table(answer.newTitle, answer.newSalary, answer.newID);

                    viewRoleSearch();
                })
            })
        });
    });
    const viewSearch = () => {
        inquirer.prompt({
            type: 'list',
            message: 'Please choose one of the following: ',
            choices: ['Departments', 'Roles', 'Employees', 'Exit'],
            name: 'toView'
        }).then((answer) => {

            if (answer.toView === 'Departments') {
                viewDeptSearch();
            }

            if (answer.toView === 'Roles') {
                viewRoleSearch();
            }

            if (answer.toView === 'Employees') {
                viewEmpSearch();
            }

            if (answer.toView === 'Exit') {
                connection.end();
            }

        })
    }




    const viewDeptSearch = () => {
        const deptSql = `SELECT department.id AS id, department.name AS department FROM department`;
        connection.query(deptSql, (err, res) => {
            if (err) throw err;
            console.table(res);

            viewSearch();
        });
    };

    const viewRoleSearch = () => {
        const roleSql = `SELECT role.id AS id, role.title AS title, role.salary AS salary, role.department_id AS department_id FROM role`;
        connection.query(roleSql, (err, res) => {
            if (err) throw err;
            console.table(res);

            runList();
        });
    };

    const viewEmpSearch = () => {
        const empSql = `SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name, employee.role_id AS role_id, employee.manager_id AS manager_id FROM employee`;
        connection.query(empSql, (err, res) => {
            if (err) throw err;
            console.table(res);

            runList();
        });
    };
}
const updateSearch = () => {
    inquirer.prompt({

        type: 'list',
        message: 'Do you want to update an employee?',
        choices: ['Yes', 'No'],
        name: 'toUpdate'
    }).then((answer) => {

        if (answer.toUpdate === 'Yes') {

            connection.query(`SELECT * FROM employee`, (err, res) => {
                if (err) throw err;
                console.table('\n', res);
            });
            updateSql();
        }

        if (answer.toUpdate === 'No') {
            runList();
        }
    });

    const updateSql = () => {
        inquirer.prompt({
            type: 'input',
            message: 'Enter the ID of the employee.',
            name: 'sqlUpdate'
        }).then((answer) => {

            const empUpdate = `UPDATE SET first_name = ?, last_name = ?, role_id = ?, manager_id = ? WHERE id = ?`;
            connection.query(empUpdate, answer.id, (err, res) => {
                if (err) throw err;
                console.table(res);

            });

        });
    };
}

// inquirer.prompt({

//     type: 'input',
//     message: '\n Enter ID of employee to update.',
//     name: 'toUpdate'
//     })


//runList();






const deleteSearch = () => {
    inquirer.prompt({
        type: 'list',
        message: 'Please choose one of the following: ',
        choices: ['Department', 'Role', 'Employee'],
        name: 'toDelete'
    }).then(answer => {
        if (answer.toDelete === 'Departments') {
            delDept();
        }

        if (answer.toDelete === 'Roles') {
            delRole();
        }

        if (answer.toDelete === 'Employees') {
            delEmp();
        }

        if (answer.toDelete === 'Exit') {
            connection.end();
        }

    })

        const delEmp = () => {
            let empSql = `SELECT * FROM employee`;

            connection.query(empSql, (err, res) => {
                if (err) throw err;
                let employeeArray = [];
                response.forEach((employee) => { employeeArray.push(`${employee.first_name} ${employee.last_name} ${employee.role_id} ${employee.manager_id}`); });

                inquirer
                    .prompt([
                        {
                            name: 'empChoice',
                            type: 'list',
                            message: 'Which employee would you like to delete?',
                            choices: employeeArray
                        }
                    ])
                    .then((answer) => {
                        let empId;

                        res.forEach((employee) => {
                            if (answer.empChoice === `${employee.first_name} ${employee.last_name} ${employee.role_id} ${employee.manager_id}`
                            ) {
                                empId = employee.id;
                            }
                        });

                        let delEmpSql = `DELETE FROM employee WHERE employee.id = ?`;
                        connection.query(delEmpSql, [empId], (err, res) => {
                            if (err) throw err;
                            console.table(res);
                        });
                    });
            });
        };

        const delRole = () => {
            let roleSql = `SELECT * FROM role`;

            connection.query(roleSql, (err, res) => {
                if (err) throw err;
                let roleArray = [];
                res.forEach((role) => { roleArray.push (role.title), (role.salary), (role.department_id); });

                inquirer
                    .prompt([
                        {
                            name: 'roleChoice',
                            type: 'list',
                            message: 'Which role would you like to remove?',
                            choices: roleArray
                        }
                    ])
                    .then((answer) => {
                        let roleId;

                        res.forEach((role) => {
                            if (answer.roleChoice === (role.title) || (role.salary) || (role.department_id))  {
                            roleId = role.id;
                        }
                    });

                let delRoleSql = `DELETE FROM role WHERE role.id = ?`;
                connection.query(delRoleSql, [roleId], (err, res) => {
                    if (err) throw err;
                    console.table(res);
                });
            });
        });
    };
};

    const delDept = () => {
        let deptSql = `SELECT department.id, department.name FROM department`;
        connection.query(deptSql, (err, res) => {
            if (err) throw err;
            let departmentArray = [];
            res.forEach((department) => { departmentArray.push(department.name); });

            inquirer
                .prompt([
                    {
                        name: 'deptChoice',
                        type: 'list',
                        message: 'Which department would you like to remove?',
                        choices: departmentArray
                    }
                ])
                .then((answer) => {
                    let departmentId;

                    res.forEach((department) => {
                        if (answer.deptChoice === department.name) {
                            departmentId = department.id;
                        }
                    });

                    let delDeptSql = `DELETE FROM department WHERE department.id = ?`;
                    connection.query(delDeptql, [departmentId], (err, res) => {
                        if (err) throw err;
                        console.table(res)
                    });
                });
        });
    };
