const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET_TOKEN;

exports.register = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "user already exist",
      });
    }

    await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    })
      .then((data) => {
        let user = {
          id: data._id,
          email: data.email,
          username: username,
        };

        //token will expire in 28 days
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 28 * 24 * 60 * 60,
            data: user,
          },
          secret
        );

        return res.status(200).json({
          success: true,
          message: "user created successfully",
          data: user,
          token: token,
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

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      $or: [{ username: username }, { email: username }],
    });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return res.status(400).json({
        success: false,
        message: "invalid credentials",
      });
    }

    let data = {
      id: user._id,
      email: user.email,
      username: user.username,
    };

    //token will expire in 28 days
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 28 * 24 * 60 * 60,
        data: data,
      },
      secret
    );
    return res.status(200).json({
      success: true,
      message: "login successfull",
      data: data,
      token: token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
