const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) {
      return res
        .status(400)
        .json({ error: "All Fields are required", success: false });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "user already exists!!!", success: false });
    }

    const hashedPwd = await bcrypt.hash(password, 10);
    const profilePhoto = `https://avatar.iran.liara.run/public/boy`;
    await User.create({
      fullname,
      email,
      password: hashedPwd,
      profilePhoto,
    });

    return res.status(201).json({
      message: "Account Created Successfully",
      success: true
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "All Fields are required", success: false });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Incorrect email or password", success: fakse });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ message: "Incorrect email or password", success: fakse });
    }

    const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: true
      })
      .json({
        message: `${user.fullname} logged in successfully.`,
        user,
        success: true
      });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server Error" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
    });
    return res.status(200).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  register,
  login,
  logout
};
