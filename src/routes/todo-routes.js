const express = require("express");
const todo = express.Router();
const { body } = require("express-validator");
const utilController = require("../controllers/util-controllers");
const todo_controller = require("../controllers/todo-controllers");
const middleware = require("../middlewares/verify_user");

// @route   POST /add
// @desc    add task in the todo list with title and description
// @access  Private
todo.post(
  "/add",
  middleware.isValidUser,
  [
    body("title", "Invalid Credentials").isString().exists(),
    body("description", "Invalid Credentials").isString().exists(),
    body("dueDate", "date is required").isString().exists(),
  ],
  utilController.validateRequest,
  todo_controller.add_task
);

// @route   GET /get/all
// @desc    get all tasks
// @access  Private
todo.get("/get/all", middleware.isValidUser, todo_controller.get_all_tasks);

// @route   GET /get/completed
// @desc    get all tasks which are completed
// @access  Private
todo.get(
  "/get/completed",
  middleware.isValidUser,
  todo_controller.get_completed_tasks
);

// @route   GET /get/due
// @desc    get all tasks which are due
// @access  Private
todo.get("/get/due", middleware.isValidUser, todo_controller.get_due_tasks);

// @route   POST /mark
// @desc    mark a task to complete
// @access  Private
todo.post(
  "/mark",
  middleware.isValidUser,
  [body("id", "id is required").exists()],
  utilController.validateRequest,
  todo_controller.mark_task
);

// @route   PATCH /
// @desc    edit a task
// @access  Private
todo.patch(
  "/",
  middleware.isValidUser,
  [body("id", "id is required").exists()],
  utilController.validateRequest,
  todo_controller.edit_task
);

// @route   DELETE /
// @desc    delete a task
// @access  Private
todo.delete(
  "/",
  middleware.isValidUser,
  [body("id", "id is required").exists()],
  utilController.validateRequest,
  todo_controller.delete_task
);

module.exports = todo;
