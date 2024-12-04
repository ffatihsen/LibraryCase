# Library Management System

This project is a Library Management Application developed to manage users and book borrowing. It provides an API to interact with users and books. Users can list, borrow, return and rate books.

## Features

- **User Management:**
  - List all users
  - View user information (name, books borrowed in the past and their ratings, currently borrowed books)
  - Creating a new user

- **Book Management:**
  - List all books
  - View book information (name and average score)
  - Creating a new book

- **Borrowing Books:**
  - Borrowing books
  - Returning and rating books

## Technical Requirements

The application meets the following technical requirements:

- **Git** Version control is achieved using (code is hosted on GitHub).
- A **REST API** has been developed using **Node.js** and **Express.js**.
- **Relational Database Management System** (MySQL) was used.
- **Sequelize ORM** was used for database operations.
- API request bodies are validated with **Joi**.
- Errors are managed effectively (e.g. borrowing a book by a non-existent user or trying to borrow a book that has already been borrowed).

## Installation Instructions

To run the project in your local environment, you can follow the steps below:

1. Clone the repository:
    ```bash
    git clone https://github.com/ffatihsen/LibraryCase.git
    ```

2. Install dependencies:
    ```bash
    cd LibraryCase
    npm install
    ```

3. Configure the database:
    - Make sure your database is working.
    - `config/database.js` Update the database credentials in the file.

4. Start the app:
    ```bash
    npm start
    ```



## Database Schema

The database schema contains tables for **Users** and **Books**. The following are the DDL commands to use to create the required tables:

```sql
-- Users table
CREATE TABLE Users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL
);

-- Table of books
CREATE TABLE Books (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL
);

-- Books on Loan table
CREATE TABLE Borrows (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT,
  bookId INT,
  borrowDate DATE,
  returnDate DATE,
  score INT,
  FOREIGN KEY (user_id) REFERENCES Users(id),
  FOREIGN KEY (book_id) REFERENCES Books(id)
);
