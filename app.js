const inquirer = require('inquirer');

// Prompt an user for information such as email id and specific information 

function promptUser() {
    return inquirer.prompt([
        {
            type : 'input',
            name : 'emailID',
            message: 'Email id : '
        },
        {
            type: 'list',
            name : 'categories',
            message: 'Choose whether Intern or Engineer',
            choices : ['Engineer', 'Intern', 'Manager'],
            default: 'Manager'
        },
        {
            type: 'input',
            name: 'schoolName',
            message: 'Interns school name : ',
            when : (answers) => answers.categories === 'Intern'
        },
        {
            type: 'input',
            name: 'github',
            message: 'Github User name : ',
            when : (answers) => answers.categories === 'Engineer'
        }
    ])
}

async function asyncCall() {
    const answers = await promptUser();
}

// Function Calls

asyncCall();