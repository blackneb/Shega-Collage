CREATE TABLE Courses (
    course_id INT PRIMARY KEY,
    title VARCHAR(255),
    course_code VARCHAR(20) UNIQUE,
    description TEXT,
    credit_hours INT
);

CREATE TABLE Students (
    student_id INT PRIMARY KEY,
    name VARCHAR(255),
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    email VARCHAR(255),
    phone_number VARCHAR(255)
);


CREATE TABLE Enrollments (
    enrollment_id INT PRIMARY KEY,
    student_id INT,
    course_id INT,
    FOREIGN KEY (student_id) REFERENCES Students(student_id),
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);


CREATE TABLE Grades (
    grade_id INT PRIMARY KEY,
    student_id INT,
    course_id INT,
    academic_period VARCHAR(20),
    letter_grade VARCHAR(2),
    FOREIGN KEY (student_id) REFERENCES Students(student_id),
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);