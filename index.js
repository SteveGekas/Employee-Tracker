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
                //'Delete',
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

                // case 'Delete':
                //     deleteSearch();
                //     break;

                case 'Exit':
                    connection.end();
                    break;

            }
        });
}

const addSearch = () => {
    inquirer.prompt({
        type: 'list',
        message: 'Please choose one of the following: ',
        choices: ['Departments', 'Roles', 'Employee', 'Exit'],
        name: 'toAdd'
    }).then(answer => {

        //    switch (answer.action) {
        //        case 'Department'
        //    }
    })
}

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

        runList();
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

const updateSearch = () => {
    inquirer.prompt({
        type: 'list',
        message: 'Please choose one of the following: ',
        choices: ['Department', 'Role', 'Employee'],
        name: 'toUpdate'
    }).then(answer => {
        table('UPDATING...', answer.toUpdate);
    })
}

// const deleteSearch =()=> {
//     inquirer.prompt({
//         type: 'list',
//         message:'Please choose one of the following: ',
//         choices: ['Department', 'Role', 'Employee'],
//         name: 'toDelete'
//     }).then(answer => {
//         console.log('DELETING...', answer.toDelete);
//     })
// }

