const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');

// Dependencies
const inquirer = require('inquirer');
const fs = require("fs");

// Prompt an user for information such as email id and specific information

let team = [];
const questionManager = [
    {
        type: "input",
        name: "name",
        message: "Enter manager name: ",
        validate: async(input) => {
            // /{regex is here}/
            // ^{regex}$ is meaning started and ended in the middle regex
            // \s metacharacter is used to find a whitespace character
            // test() method executes a search for a match b/w regex and a specified string
            if(input == "" || /\s/.test(input)) {
                return "Please enter first or last name";
            }
            return true;
        }
    },
    {
        type: "input",
        name: "email",
        message: "Enter manager's email: ",
        validate: async(input) => {
            // \w+ matches 1 or more word characters (a-z, A-Z, 0-9 and underscore)
            // [.-] matches character . or -.
            // \ escape code, which restore the original literal meaning of the following character
            // [.-]? matches 0 or 1 occurence of [.-]
            // ([\.-]?\w+)* => a group of [an optional period (.) or dash (-) followed by any word repeated one or more times] that can be repeated 0 or more times
            // The sub-expression \w+([.-]?\w+)* is used to match the username in the email, before the @ sign.
            // The @ matches itself
            //The sub-expression .\w{2,3} matches a . followed by two or three word characters
            if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
                return true;
            }
            return "Please enter a valid email address";
        }
    },
    {
        type: "input",
        name: "officeNumber",
        message: "Enter office number : ",
        validate: async (input) => {
            if(isNaN(input)) {
                return "Please enter a number";
            }
            return true;
        }
    },
    {
        type: "list",
        name: "teamMember",
        message: "Do you have any team members?",
        choices: ["Yes", "No"]
    }
]

const questionEmployee = [
    {
        type: "input",
        name: "name",
        message: "Enter employee name: ",
        validate: async (input) => {
            if(input == "") {
                return "Please enter a name";
            }
            return true;
        }
    },
    {
        type: "input",
        name: "email",
        message: "Enter email address: ",
        validate: async(input) => {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
                return true;
            }
            return "Please enter a valid email address.";
        }
    },
    {
        type: "list",
        name: "role",
        message: "What is their role?",
        choices: ["Engineer", "Intern"]
    },
    {
        when: input => {
            return input.role == "Engineer"
        },
        type: "input",
        name: "github",
        message: "Engineer, Enter your github username: ",
        validate: async (input) => {
            if(input == "" || /\s/.test(input)) {
                return "Please enter a valid github username";
            }
            return true;
        }
    },
    {
        when: input => {
            return input.role == "Intern"
        },
        type: "input",
        name: "school",
        message: "Intern, Enter your school name: ",
        validate: async(input) => {
            if(input == "") {
                return "Please enter a name";
            }
            return true;
        }
    },
    {
        type: "list",
        name: "extra",
        message: "Add another team member",
        choices: ["Yes", "No"]
    }
]

function teamBuild() {
    inquirer.prompt(questionEmployee).then( data => {
        if(data.role == "Engineer") {
            var newMember = new Engineer(data.name, team.length + 1, data.email, data.github);
        } 
        else {
            var newMember = new Intern(data.name, team.length + 1, data.email, data.school);
        }
        team.push(newMember);
        
        if(data.extra === "Yes") {
            console.log(" ");
            teamBuild();
        }
        else {
            renderHTML();
        }
    })
}

function renderHTML() {
    let htmlFile = fs.readFileSync("./templates/main.html");
    fs.writeFileSync("./output/team.html", htmlFile, function(err){
        if(err) throw err;
    })
    
    for(element of team) {
        if(element.getRole() == "Manager") {
            htmlCard("Manager", element.getName(), element.getId(), element.getEmail(), "Office: " + element.getOfficeNumber());
        }
        else if(element.getRole() == "Engineer") {
            htmlCard("Engineer", element.getName(), element.getId(), element.getEmail(), "Github: " + element.getGithub());
        }
        else if(element.getRole() == "Intern") {
            htmlCard("Intern", element.getName(), element.getId(), element.getEmail(), "School: " +element.getSchool());
        }
    }
    fs.appendFileSync("./output/team.html", "</div></main></body></html>", function(err) {
        if(err) throw err;
    });
}

function htmlCard(position, name, id, email, value) {
    let data = fs.readFileSync(`./templates/${position}.html`, 'utf8');
    data = data.replace("Name", name);
    data = data.replace("ID", `ID: ${id}`);
    data = data.replace("Email", `Email: <a href="mailto:${email}">${email}</a>`);
    data = data.replace("Property", value);
    fs.appendFileSync("./output/team.html", data, err => {
        if(err) throw err;
    })
}

function init() {
    inquirer.prompt(questionManager).then(data => {
        let teamManager = new Manager(data.name, 1, data.email, data.officeNumber);
        team.push(teamManager);
        console.log(" ");
        if(data.teamMember === "Yes") {
            teamBuild();
        } else {
            renderHTML();
        }
    })
}

// Function call 

init();