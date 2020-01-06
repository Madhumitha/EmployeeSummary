const Employee = require('./Employee');

class Intern extends Employee {
    constructor(name, id, email) {
        super(name, id, email, school)
        this.title = 'Intern';
        this.school = school;
    }
    getSchool() {
        return this.school;
    }
    getRole() {
        return this.title;
    }
}

module.exports = Intern;