// Necessary Imports (you will need to use this)
const { Student } = require('./Student');

/**
 * Node Class (GIVEN, you will need to use this)
 */
class Node {
  // Public Fields
  data; // Student
  next; // Object

  /**
   * REQUIRES:  The fields specified above
   * EFFECTS:   Creates a new Node instance
   * RETURNS:   None
   */
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

/**
 * Create LinkedList Class (for student management)
 * The class should have the public fields:
 * - head, tail, length
 */
class LinkedList {
  // Public Fields
  head; // Object
  tail; // Object
  length; // Number representing size of LinkedList

  /**
   * REQUIRES:  None
   * EFFECTS:   Creates a new LinkedList instance (empty)
   * RETURNS:   None
   */
  constructor() {
    this.head = null; // Initialize head to null (empty list)
    this.tail = null; // Initialize tail to null (empty list)
    this.length = 0;  // Initialize length to 0 (no nodes in the list)
  }

  /**
   * REQUIRES:  A new student (Student)
   * EFFECTS:   Adds a Student to the end of the LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about adding to the 'end' of the LinkedList (Hint: tail)
   */
  addStudent(newStudent) {
    const newNode = new Node(newStudent); // Create a new node with the given student data
    if (!this.head) {
      this.head = newNode; // If the list is empty, set both head and tail to the new node
      this.tail = newNode;
    } else {
      this.tail.next = newNode; // If the list is not empty, add the new node to the end and update the tail
      this.tail = newNode;
    }
    this.length++; // Increment the length of the list
  }

  /**
   * REQUIRES:  email(String)
   * EFFECTS:   Removes a student by email (assume unique)
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about how removal might update head or tail
   */
  removeStudent(email) {
    if (!this.head) return; // If the list is empty, do nothing
    if (this.head.data.getEmail() === email) {
      this.head = this.head.next; // Update head to the next node
      if (!this.head) this.tail = null; // If list becomes empty, update tail to null
      this.length--; // Decrement the length of the list
      return;
    }
    let current = this.head;
    while (current.next) {
      if (current.next.data.getEmail() === email) {
        current.next = current.next.next; // Remove the node by bypassing it
        if (!current.next) this.tail = current; // If the last node is removed, update tail
        this.length--; // Decrement the length of the list
        return;
      }
      current = current.next;
    }
  }

  /**
   * REQUIRES:  email (String)
   * EFFECTS:   None
   * RETURNS:   The Student or -1 if not found
   */
  findStudent(email) {
    let current = this.head;
    while (current) {
      if (current.data.getEmail() === email) {
        return current.data; // Return the student if found
      }
      current = current.next;
    }
    return -1; // Return -1 if the student is not found
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   Clears all students from the Linked List
   * RETURNS:   None
   */
  #clearStudents() {
    this.head = null; // Reset head to null
    this.tail = null; // Reset tail to null
    this.length = 0;  // Reset length to 0
  }

  clearStudents() {
    this.#clearStudents(); // Call the private clear method
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   LinkedList as a String for console.log in caller
   * CONSIDERATIONS:
   *  - Let's assume you have a LinkedList with two people
   *  - Output should appear as: "JohnDoe, JaneDoe"
   */
  displayStudents() {
    let result = [];
    let current = this.head;
    while (current) {
      result.push(current.data.getName()); // Add each student's name to the result array
      current = current.next;
    }
    return result.join(", "); // Join the names into a single string separated by commas
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   A sorted array of students by name
   */
  #sortStudentsByName() {
    let students = [];
    let current = this.head;
    while (current) {
      students.push(current.data); // Add each student to the array
      current = current.next;
    }
    students.sort((a, b) => a.getName().localeCompare(b.getName())); // Sort students by name
    return students;
  }

  /**
   * REQUIRES:  specialization (String)
   * EFFECTS:   None
   * RETURNS:   An array of students matching the specialization, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterBySpecialization(specialization) {
    const sortedStudents = this.#sortStudentsByName(); // Get sorted students
    return sortedStudents.filter(student => student.getSpecialization() === specialization); // Filter by specialization
  }

  /**
   * REQUIRES:  minAge (Number)
   * EFFECTS:   None
   * RETURNS:   An array of students who are at least minAge, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterByMinAge(minAge) {
    const sortedStudents = this.#sortStudentsByName(); // Get sorted students
    return sortedStudents.filter(student => student.getYear() >= minAge); // Filter by minimum age
  }

  /**
   * REQUIRES:  A valid file name (String)
   * EFFECTS:   Writes the LinkedList to a JSON file with the specified file name
   * RETURNS:   None
   */
  async saveToJson(fileName) {
    const fs = require('fs').promises;
    let students = [];
    let current = this.head;
    while (current) {
      students.push({
        name: current.data.getName(),
        year: current.data.getYear(),
        email: current.data.getEmail(),
        specialization: current.data.getSpecialization()
      });
      current = current.next;
    }
    await fs.writeFile(fileName, JSON.stringify(students, null, 2));
  }

  /**
   * REQUIRES:  A valid file name (String) that exists
   * EFFECTS:   Loads data from the specified fileName, overwrites existing LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   *  - Use clearStudents() to perform overwriting
   */
  async loadFromJSON(fileName) {
    const fs = require('fs').promises;
    this.clearStudents(); // Call the public clear method
    const data = await fs.readFile(fileName, 'utf8');
    const students = JSON.parse(data);
    for (const student of students) {
      const newStudent = new Student(student.name, student.year, student.email, student.specialization);
      this.addStudent(newStudent);
    }
  }
}

module.exports = { LinkedList };
