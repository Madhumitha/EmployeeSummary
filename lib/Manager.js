const Employee = require('./Employee');

class Manager extends Employee {
    constructor(name, id, email) {
        super(name, id, email, officeNumber);
        this.title = 'Manager';
        this.officeNumber = officeNumber;
    }
    getRole() {
        return this.title;
    }
    getOfficeNumber() {
        return this.officeNumber;
    }
}

module.exports = Manager;