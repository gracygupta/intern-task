const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const todoRoutes = require("./todo-routes");

router.use("/api", authRoutes);
router.use("/api/task", todoRoutes);

module.exports = router;
