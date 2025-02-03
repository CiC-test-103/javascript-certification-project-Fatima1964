// Necessary Imports, DO NOT REMOVE
const { LinkedList } = require("./LinkedList");
const { Student } = require('./Student');
const readline = require('readline');

// Initialize terminal interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Creates the Student Management System as a Linked List
/**
 * studentManagementSystem is the object that the main() function will be modifying
 */
const studentManagementSystem = new LinkedList();

// Display available commands
function main() {
  console.log(`
      Available Commands:
      - add [name] [year] [email] [specialization]: Add a student
      - remove [email]: Remove a student by email
      - display: Show all students
      - find [email]: Find a student by email
      - save: Save the current linked list to the specified file
      - load [fileName]: Load a linked list from a file
      - clear: Clear the current linked list
      - q: Quit the terminal
  `);
}

// Command handling logic
async function handleCommand(command) {
  const [operation, ...args] = command.trim().split(' ');

  switch (operation) {
    case 'add':
      console.log('Adding student...');
      const [name, year, email, specialization] = args;
      // Create a new Student object using the provided arguments
      const newStudent = new Student(name, parseInt(year), email, specialization);
      // Add the new student to the linked list
      studentManagementSystem.addStudent(newStudent);
      // Display the added student's details and the updated list
      console.log(`Student added: ${newStudent.getString()}`);
      console.log(`Updated list: ${studentManagementSystem.displayStudents()}`);
      break;

    case 'remove':
      console.log('Removing student...');
      const [removeEmail] = args;
      // Remove the student with the specified email from the linked list
      studentManagementSystem.removeStudent(removeEmail);
      // Confirm removal and display the updated list
      console.log(`Student with email ${removeEmail} removed.`);
      console.log(`Updated list: ${studentManagementSystem.displayStudents()}`);
      break;

    case 'display':
      console.log('Displaying students...');
      // Display all students in the linked list
      console.log(`Students: ${studentManagementSystem.displayStudents()}`);
      break;

    case 'find':
      console.log('Finding student...');
      const [findEmail] = args;
      // Find the student with the specified email
      const foundStudent = studentManagementSystem.findStudent(findEmail);
      if (foundStudent !== -1) {
        // Display the student's details if found
        console.log(`Student found: ${foundStudent.getString()}`);
      } else {
        // Notify the user if the student does not exist
        console.log('Student does not exist.');
      }
      break;

    case 'save':
      console.log('Saving data...');
      const [saveFileName] = args;
      // Save the current linked list data to the specified JSON file
      await studentManagementSystem.saveToJson(saveFileName);
      // Confirm the save operation
      console.log(`Data saved to ${saveFileName}.`);
      break;

    case 'load':
      console.log('Loading data...');
      const [loadFileName] = args;
      // Load data from the specified JSON file into the linked list
      await studentManagementSystem.loadFromJSON(loadFileName);
      // Confirm the load operation and display the updated list
      console.log(`Data loaded from ${loadFileName}.`);
      console.log(`Updated list: ${studentManagementSystem.displayStudents()}`);
      break;

    case 'clear':
      console.log('Clearing data...');
      // Clear all data in the linked list
      studentManagementSystem.clearStudents();
      // Confirm the clear operation
      console.log('All data cleared.');
      break;

    case 'q':
      console.log('Exiting...');
      rl.close();
      break;

    default:
      console.log('Unknown command. Type "help" for a list of commands.');
      break;
  }
}

// Start terminal-based interaction (DO NOT MODIFY)
console.log('Welcome to the Student Management System!');
main();
rl.on('line', async (input) => {
  if (input.trim().toLowerCase() === 'help') {
    main();
  } else {
    await handleCommand(input);
  }
});
rl.on('close', () => {
  console.log('Goodbye!');
});
