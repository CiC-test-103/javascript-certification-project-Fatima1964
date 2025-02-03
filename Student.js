class Student {
  // Public Fields
  name               // String(fullname no space in between)
  year               // Number
  email              // String
  specialization     // String(must be written in camelCase)

  /**
   * REQUIRES:  The fields specified above
   * EFFECTS:   Creates a new Student instance
   * RETURNS:   None
   */
  constructor(name, year, email, specialization) {
    this.name = name;
    this.year = year;
    this.email = email;
    this.specialization = specialization;
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   The student name (String)
   */
  getName() {
    return this.name;
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   The student year (Number)
   */
  getYear() {
    return this.year;
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   The student email (String)
   */
  getEmail() {
    return this.email;
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   The student specialization (String)
   */
  getSpecialization() {
    return this.specialization; 
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   Student object as string
   */
  getString() {
    return `Name: ${this.name}, Year: ${this.year}, Email: ${this.email}, Specialization: ${this.specialization}`;
  }

  /**
   * REQUIRES:  The student's new email (String)
   * EFFECTS:   Modifies the student's email to match
   * RETURNS:   None
   */
  setEmail(newEmail) {
    this.email = newEmail;
  }

  /**
   * REQUIRES:  The student's new specialization (String)
   * EFFECTS:   Modifies the student's specialization to match
   * RETURNS:   The student specialization (String)
   */
  setSpecialization(newSpecialization) {
    this.specialization = newSpecialization;
  }

  // MY COMMENTS: Add a method to update the student's year
  /**
   * REQUIRES:  The student's new year (Number)
   * EFFECTS:   Modifies the student's year to match
   * RETURNS:   None
   */
  setYear(newYear) {
    this.year = newYear;     
  }

  // MY COMMENTS: Add a method to check if the student is in their final year
  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   Boolean (true if the student is in their final year, otherwise false)
   */
  isFinalYear() {
    return this.year === 4; // Assuming 4 is the final year
  }
}

module.exports = { Student }