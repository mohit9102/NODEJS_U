// Import the built-in 'fs' module for file system operations
const fs = require("fs");

// Define the path to the JSON file where tasks will be stored
const filePath = "./tasks.json";

// Function to load tasks from the JSON file
const loadTasks = () => {
  try {
    // Read the file content as a binary buffer
    const dataBuffer = fs.readFileSync(filePath);
    // Convert the binary buffer to a string (JSON format)
    const dataJSON = dataBuffer.toString();
    // Parse the JSON string into a JavaScript object (array of tasks)
    return JSON.parse(dataJSON);
  } catch (error) {
    // If an error occurs (e.g., file not found), return an empty array
    return [];
  }
};

// Function to save tasks to the JSON file
const saveTasks = (tasks) => {
  // Convert the JavaScript array of tasks into a JSON string
  const dataJSON = JSON.stringify(tasks);
  // Write the JSON string to the file, replacing its content
  fs.writeFileSync(filePath, dataJSON);
};

// Function to add a new task
const addTask = (task) => {
  // Load the existing tasks from the file
  const tasks = loadTasks();
  // Add the new task as an object to the tasks array
  tasks.push({ task });
  // Save the updated tasks array back to the file
  saveTasks(tasks);
  // Log a confirmation message
  console.log("Task added:", task);
};

// Function to list all tasks
const listTasks = () => {
  // Load the tasks from the file
  const tasks = loadTasks();
  // Iterate through the tasks array and display each task with its index
  tasks.forEach((task, index) => console.log(`${index + 1} - ${task.task}`));
};

// Capture the command and argument from the command-line input
const command = process.argv[2]; // The command, e.g., "add" or "list"
const argument = process.argv[3]; // The argument, e.g., task text or index

// Handle the command based on user input
if (command === "add") {
  // If the command is "add", call the addTask function with the argument
  addTask(argument);
} else if (command === "list") {
  // If the command is "list", call the listTasks function to display tasks
  listTasks();
} else if (command === "remove") {
  // Placeholder: If the command is "remove", call a (yet to be implemented) removeTask function
  removeTask(parseInt(argument));
} else {
  // If the command is unrecognized, display an error message
  console.log("Command not found!");
}
