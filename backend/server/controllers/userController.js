// @desc Auth user/set token
// route POST /api/users/auth
// @access Public
const authUser = (req, res) => {
  res.status(401);
  throw new Error("Something went wrong");
  res.status(200).json({ message: "Auth user" });
};

export { authUser };
