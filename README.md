# Task Management API

This project is a simple Task Management API that allows users to create, view, edit, mark as completed, and delete tasks. The API is designed with user authentication using JWT tokens.

## Table of Contents

- [Postman Documentation](#postman-documentation)
- [How to Run the Project](#how-to-run-the-project)
  - [1. Clone the Project](#1-clone-the-project)
  - [2. Install Dependencies](#2-install-dependencies)
  - [3. Create .env File](#3-create-env-file)
  - [4. Run the Project](#4-run-the-project)
  - [5. Run Unit Tests](#5-run-unit-tests)
- [Routes](#routes)
  - [1. Login](#1-login)
  - [2. Register](#2-register)
  - [3. Add Task](#3-add-task)
  - [4. Get All Tasks](#4-get-all-tasks)
  - [5. Get Completed Tasks](#5-get-completed-tasks)
  - [6. Get Due Tasks](#6-get-due-tasks)
  - [7. Mark Task as Complete](#7-mark-task-as-complete)
  - [8. Edit Task](#8-edit-task)
  - [9. Delete Task](#9-delete-task)

## Postman Documentation
- [Link](https://documenter.getpostman.com/view/24067724/2s9YysE2rE)

## How to Run the Project

### 1. Clone the Project:
```bash
git clone https://github.com/gracygupta/intern-task.git
```

### 2. Install Dependencies:
```bash
npm install
```

### 3. Create .env File:
Create a `.env` file in the project root and copy the following content:
```bash
PORT=3000
DB_URI=mongodb+srv://gracy:JPvdcX92jDDI4i46@theinternetfolks.eh2oyqm.mongodb.net/chaintech?retryWrites=true&w=majority
SECRET_TOKEN=chaintechnetwork
```

### 4. Run the Project:
```bash
npm run start
```

### 5. Run Unit Tests:

  a. **Download Dev Dependencies:**
   ```bash
   npm install --dev
   ```

  b. **Run Tests:**
  ```bash
   npm run test
  ```

  c. **To exit the test, press `ctrl+c`**

## Routes

### 1. Register

- **Route**: `POST /api/register`
- **Description**: Register user and return JWT token and user object.
- **Access**: Public

#### Requires

- Body:
  - `email`: Email
  - `username`: Username
  - `password`: Password

#### Error Handled

- User already exists
- Password must contain at least one special character, one uppercase alphabet, and a mix of alphanumeric characters
- Invalid email format

### 2. Login

- **Route**: `POST /api/login`
- **Description**: Login user and return JWT token and user object.
- **Access**: Public

#### Requires

- Body:
  - `username`: Email or username
  - `password`: Password (greater than 6 characters with at least one special character and uppercase alphabet)

#### Error Handled

- Wrong username
- Wrong password

### 3. Add Task

- **Route**: `POST /api/task/add`
- **Description**: Add a task to the todo list with title, description, and due date.
- **Access**: Private

#### Requires

- Header: `token`
- Body:
  - `title`: Task title
  - `description`: Task description
  - `dueDate`: Due date for the task

#### Error Handled

- Title must not be empty
- Invalid due date format

### 4. Get All Tasks

- **Route**: `GET /api/task/get/all`
- **Description**: Get all tasks.
- **Access**: Private

#### Requires

- Header: `token`

### 5. Get Completed Tasks

- **Route**: `GET /api/task/get/completed`
- **Description**: Get all tasks that are completed.
- **Access**: Private

#### Requires

- Header: `token`

#### Error Handled

- If no completed tasks are found, return a message: "No completed tasks."

### 6. Get Due Tasks

- **Route**: `GET /api/task/get/due`
- **Description**: Get all tasks that are due.
- **Access**: Private

#### Requires

- Header: `token`

#### Error Handled

- If all tasks are completed, return a message: "No due tasks."

### 7. Mark Task as Complete

- **Route**: `POST /api/task/mark`
- **Description**: Mark a task as complete.
- **Access**: Private

#### Requires

- Header: `token`
- Body:
  - `id`: Task ID

#### Error Handled

- If the task ID is wrong, return a message: "No task found."

### 8. Edit Task

- **Route**: `PATCH /api/task`
- **Description**: Edit a task.
- **Access**: Private

#### Requires

- Header: `token`
- Body:
  - `id`: Task ID
  - `(title or description or dueDate or all)`: Fields to be edited

#### Error Handled

- If the task ID is wrong, return a message: "Task not found."

### 9. Delete Task

- **Route**: `DELETE /api/task`
- **Description**: Delete a task.
- **Access**: Private

#### Requires

- Header: `token`
- Body:
  - `id`: Task ID
```