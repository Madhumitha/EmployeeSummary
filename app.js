const inquirer = require('inquirer');

// Prompt an user for information such as email id and specific information

function promptUser() {
    return inquirer.prompt([
        {
            type: 'list',
            name : 'categories',
            message: 'Choose whether Manager, Intern or Engineer',
            choices : ['Engineer', 'Intern', 'Manager']
        }, 
        {
            type: 'input',
            name : 'officeNo.',
            message: 'Managers office number : ',
            when: (answers) => answers.categories === 'Manager'
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
        },
        {
            type: 'input',
            name: 'email-id',
            message: 'Email-id : '
        },
        ])
}

// Generate a HTML page

async function asyncCall() {
    try {
        const answers = await promptUser();
        let reply = await inquirer.prompt(
            {
                type: 'list',
                name: 'moreInput',
                message: 'Do you want to add members for EmployeeSummary : ',
                choices: ['Yes', 'No']
            })
        
        if(reply.moreInput === 'Yes') {
            asyncCall();
        }
    }
    catch (err) {
        console.log(err);
    }
}

// Function Calls 

asyncCall();
