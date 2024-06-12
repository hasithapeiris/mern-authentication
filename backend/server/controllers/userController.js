import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc Auth user/set token
// route POST /api/users/auth
// @access Public
const authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id);
      res.status(200).json(user);
    } else {
      res.status(401);
      throw new Error("Invalid email or password!");
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc Register user
// route POST /api/users
// @access Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    const savedUser = await newUser.save();

    generateToken(res, savedUser._id);

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc Logout user
// route POST /api/users
// @access Private
const logoutUser = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out" });
};

// @desc Get user profile
// route GET /api/users/id
// @access Private
const getUserProfile = async (req, res) => {
  res.status(200).json({ message: "Get user profile" });
};

// @desc Update user profile
// route PUT /api/users/id
// @access Private
const updateUserProfile = (req, res) => {
  res.status(200).json({ message: "Update user profile" });
};

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
