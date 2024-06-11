import User from "../models/userModel.js";

// @desc Auth user/set token
// route POST /api/users/auth
// @access Public
const authUser = (req, res) => {
  res.status(200).json({ message: "Auth user" });
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
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc Logout user
// route POST /api/users
// @access Private
const logoutUser = (req, res) => {
  res.status(200).json({ message: "Logout user" });
};

// @desc Get user profile
// route GET /api/users/id
// @access Private
const getUserProfile = (req, res) => {
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
