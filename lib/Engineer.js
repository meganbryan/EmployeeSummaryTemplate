const Employee = require("../lib/Employee")

function Engineer (name, id, email, github) {
    Employee.name = name;
    Employee.id = id;
    Employee.email = email;
    this.github = github;
    this.getRole = () => "Engineer";
    this.getGithub = () => this.github;
}

module.exports = Engineer
