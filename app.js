const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = []

const employeeQuestions = [
    { 
        type: 'input',
        message: 'What is their name?',
        name: 'name'
    },
    { 
        type: 'input',
        message: 'What is their ID number?',
        name: 'id'
    },
    { 
        type: 'input',
        message: 'What is their email address?',
        name: 'email'
    },
    { 
        type: 'list',
        message: 'What is their employment type?',
        choices: ["Manager", "Engineer", "Intern"],
        name: 'employmentType'
    }
]

function init() {
    inquirer
    .prompt(
        { 
            type: 'list',
            message: 'Would you like to add another employee?',
            choices: ["Yes", "No"],
            name: 'addEmployee'
        }
    )
    .then((answers) => {
        if (answers.addEmployee === "Yes") {
            chooseType ();
        }
        else {
            writeFile ()
        }
    })
    .catch(error => {
        if(error) {
            console.error(error)
        }
    })
}

async function writeFile () {
    let renderEmployees = await render(employees)
    fs.writeFile(outputPath, renderEmployees, function(err) {
        if(err) console.log('error', err);
    })
    console.log("HTML file successfully written!")
}

function chooseType () {
    inquirer
    .prompt(employeeQuestions)
    .then((answers) => {
        if (answers.employmentType === "Manager") {
            addManager(answers);
        }
        else if (answers.employmentType === "Engineer") {
            addEngineer(answers);
        }
        else if (answers.employmentType === "Intern") {
            addIntern(answers);
        }
        else {
            console.log ("error")
        }
    })
    .catch(error => {
        if(error) {
            console.error(error)
        }
    })
}

function addManager (managerAnswers) {
    inquirer
    .prompt(
        {
            type: 'input',
            message: 'What is their office number?',
            name: 'officeNumber'
        }
    )
    .then(async (answer) => {
        const {name, id, email} = managerAnswers
        let newManager = await new Manager (name, id, email, answer.officeNumber)
        employees.push(newManager)
        console.table (employees)
        init ();
    })
    .catch(error => {
        if(error) {
            console.error(error)
        }
    })
}

function addEngineer (engineerAnswers) {
    inquirer
    .prompt(
        {
            type: 'input',
            message: 'What is their GitHub username?',
            name: 'github'
        }
    )
    .then(async (answer) => {
        const {name, id, email} = engineerAnswers
        let newEngineer = await new Engineer (name, id, email, answer.github);
        employees.push(newEngineer)
        console.table (employees)
        init ();
    })
    .catch(error => {
        if(error) {
            console.error(error)
        }
    })
}

function addIntern (internAnswers) {
    inquirer
    .prompt(
        {
            type: 'input',
            message: 'What school are they attending?',
            name: 'school'
        }
    )
    .then(async (answer) => {
        const {name, id, email} = internAnswers
        let newIntern = await new Intern (name, id, email, answer.school);
        employees.push(newIntern)
        console.table (employees)
        init ();
    })
    .catch(error => {
        if(error) {
            console.error(error)
        }
    })
}

init();