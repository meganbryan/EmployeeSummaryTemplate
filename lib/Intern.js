const Employee = require("../lib/Employee")

function Intern (name, id, email, school) {
    Employee.name = name;
    Employee.id = id;
    Employee.email = email;
    this.school = school;
    this.getRole = () => "Intern";
    this.getSchool = () => this.school;
}

module.exports = Intern