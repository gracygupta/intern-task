const User = require("../model/user");
const Task = require("../model/task");

const convertTime = (date) => {
  const inputDate = new Date(date);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    fractionalSecondDigits: 3,
    timeZone: "Asia/Kolkata", // Indian Standard Time (IST)
  };

  const outputDateString = inputDate.toLocaleString("en-US", options);
  const newdate = outputDateString.split(", ");
  return newdate[0];
};

exports.add_task = async (req, res, next) => {
  try {
    const title = req.body.title;
    const desc = req.body.description ?? "";
    const dueDate = convertTime(req.body.dueDate);
    const user = req.user;

    if (title == "" || title == null || title == undefined) {
      return res.status(400).json({
        success: false,
        message: "title must not be empty",
      });
    }

    if (
      !req.body.dueDate ||
      req.body.dueDate == "" ||
      req.body.dueDate == undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "invalid due date",
      });
    }

    await Task.create({
      title: title,
      description: desc,
      dueDate: dueDate,
      user: user.id,
    })
      .then((data) => {
        return res.status(200).json({
          success: true,
          message: "task created",
          data: data,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "some error occured",
        });
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

exports.delete_task = async (req, res, next) => {
  try {
    const { id } = req.body;
    const user = req.user;
    const task = await Task.findOne({ $and: [{ _id: id }, { user: user.id }] });

    if (!task) {
      return res.status(400).json({
        success: false,
        message: "task not found",
      });
    }

    await Task.deleteOne({ _id: id });
    return res.status(200).json({
      success: true,
      message: "task deleted",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

exports.mark_task = async (req, res, next) => {
  try {
    const { id } = req.body;
    const user = req.user;
    const task = await Task.findOne({ $and: [{ _id: id }, { user: user.id }] });
    if (!task) {
      return res.status(400).json({
        success: false,
        message: "task not found",
      });
    }

    if (task.completed == true) {
      return res.status(400).json({
        success: false,
        message: "task already completed",
      });
    }

    task.completed = true;
    task
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          message: "task completed",
          data: task,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "some error occured",
        });
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

exports.get_all_tasks = async (req, res, next) => {
  try {
    const user = req.user;
    const tasks = await Task.find({ user: user.id });
    if (tasks.length == 0) {
      return res.status(200).json({
        success: true,
        message: "no task found",
        data: [],
      });
    }
    return res.status(200).json({
      success: true,
      message: "tasks found",
      data: tasks,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

exports.get_completed_tasks = async (req, res, next) => {
  try {
    const user = req.user;
    const tasks = await Task.find({
      $and: [{ user: user.id }, { completed: true }],
    });
    if (tasks.length == 0) {
      return res.status(200).json({
        success: true,
        message: "no task completed",
        data: [],
      });
    }
    return res.status(200).json({
      success: true,
      message: "tasks found",
      data: tasks,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

exports.get_due_tasks = async (req, res, next) => {
  try {
    const user = req.user;
    const tasks = await Task.find({
      $and: [{ user: user.id }, { completed: false }],
    });
    if (tasks.length == 0) {
      return res.status(200).json({
        success: true,
        message: "no due task",
        data: [],
      });
    }
    return res.status(200).json({
      success: true,
      message: "tasks found",
      data: tasks,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

exports.edit_task = async (req, res, next) => {
  try {
    const id = req.body.id;
    const user = req.user;
    const task = await Task.findOne({ $and: [{ _id: id }, { user: user.id }] });
    if (!task) {
      return res.status(400).json({
        success: false,
        message: "task not found",
      });
    }
    if (req.body.title) {
      task.title = req.body.title;
    }
    if (req.body.description) {
      task.description = req.body.description;
    }
    if (req.body.dueDate) {
      task.dueDate = convertTime(req.body.dueDate);
    }

    task
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          message: "task edited",
          data: task,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "some error occured",
        });
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
