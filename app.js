const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeList = []

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
    console.log (employeeList)
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
            const renderEmployees = render(employeeList)
            fs.writeToFile(outputPath, renderEmployees);
        }
    })
    .catch(error => {
        if(error) {
            console.error(error)
        }
    })
}

function chooseType () {
    inquirer
    .prompt(employeeQuestions)
    .then((answers) => {
        if (answers.employmentType === "Manager") {
            addManager();
        }
        else if (answers.employmentType === "Engineer") {
            addEngineer();
        }
        else if (answers.employmentType === "Intern") {
            addIntern();
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

function addManager () {
    inquirer
    .prompt(
        {
            type: 'input',
            message: 'What is their office number?',
            name: 'officeNumber'
        }
    )
    .then((answers) => {
        const newManager = Manager (answers)
        employeeList.push(newManager)
        init ();
    })
    .catch(error => {
        if(error) {
            console.error(error)
        }
    })
}

function addEngineer () {
    inquirer
    .prompt(
        {
            type: 'input',
            message: 'What is their GitHub URL?',
            name: 'github'
        }
    )
    .then((answers) => {
        const newEngineer = Engineer (answers);
        employeeList.push(newEngineer)
        init ();
    })
    .catch(error => {
        if(error) {
            console.error(error)
        }
    })
}

function addIntern () {
    inquirer
    .prompt(
        {
            type: 'input',
            message: 'What school are they attending?',
            name: 'school'
        }
    )
    .then((answers) => {
        const newIntern = Intern (answers);
        employeeList.push(newIntern)
        init ();
    })
    .catch(error => {
        if(error) {
            console.error(error)
        }
    })
}


// function call to initialize program
init();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
