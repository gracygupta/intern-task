const express = require("express");
const app = express();
const rateLimit = require("express-rate-limit");
var logger = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const dbConnect = require("./db/conn").dbConnect;

const indexRoutes = require("./routes/index");
const todoRoutes = require("./routes/todo-routes");

dbConnect();

dotenv.config();
const PORT = process.env.PORT || 5000;

const limiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 10 minutes
	max: 2500, // limit each IP to 400 requests per windowMs
});

app.set('trust proxy', 1);
app.use(limiter);

app.get("/", (req, res) => {
    res.status(200).json({
      message: "Connected to the Server",
    });
  });
  
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));

//Cors Policy
app.use(
  cors({
    origin: "*",
  })
);

//router
app.use("/api", indexRoutes);
app.use("/api/task", todoRoutes);

// catch 404 error
app.use(function (req, res, next) {
    return res.json({ message: "404 Not Found"});
  });

app.listen(PORT, () => {
    console.log(`Server is up at port ${PORT}`);
  });
  