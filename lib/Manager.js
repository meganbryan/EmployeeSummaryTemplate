const Employee = require("../lib/Employee")

function Manager (name, id, email, officeNumber) {
    Employee.name = name;
    Employee.id = id;
    Employee.email = email;
    this.officeNumber = officeNumber;
    this.getRole = () => "Manager";
    this.getOfficeNumber = () => this.officeNumber;
}

module.exports = Manager