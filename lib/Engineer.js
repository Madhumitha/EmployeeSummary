const Employee = require('./Employee');

class Engineer extends Employee {
    constructor (name, id, email) {
        super(name, id, email, gitHubUser);
        this.title = 'Engineer';
        this.gitHubUser = gitHubUser;
    }

    getGithub() {
        return this.gitHubUser;
    }

    getRole() {
        return this.title;
    }
}

modules.exports = Engineer;