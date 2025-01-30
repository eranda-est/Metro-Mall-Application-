const User = require("../models/user.model");

//register User
const register = async (req, res) => {
  try {
    const { username, email, password, mobile } = req.body;

    const newUser = {
      username: username,
      email: email,
      password: password,
      mobile: mobile,
    };

    const SaveNewUser = new User(newUser);
    await SaveNewUser.save();

    return res.status(200).send({
      status: true,
      message: "Registration Successfully Done",
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: err.message,
    });
  }
};

// Login User
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email, password: password });

    if (user) {
      const temp = {
        username: user.username,
        email: user.email,
        role: user.role,
        _id: user._id,
      };
      res.send(temp);
    } else {
      return res.status(400).json({ message: "Login Failed" });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};

//getAll users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({role: "user"});
    return res.status(200).send({
      status: true,
      message: "Successfully",
      allusers: users,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: err.message,
    });
  }
};

//get all shop owners
const getAllShopOwners=async(req,res)=>{
  try {
    const users = await User.find({ role: "shopOwner" });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

//get all admins
const getAllAdmins=async(req,res)=>{
  try {
    const users = await User.find({ role: "admin" });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

//getOneUser
const getOneUser = async (req, res) => {
  try {
    const userID = req.params.id;
    const users = await User.findById(userID);
    return res.status(200).send({
      status: true,
      message: "user received successfully",
      allusers: users,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: err.message,
    });
  }
};

//updateUser
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email, password, mobile } = req.body;

    const updateUser = {
      username: username,
      email: email,
      password: password,
      mobile: mobile,
    };

    const updatedUser = await User.findByIdAndUpdate(userId, updateUser);

    return res.status(200).send({
      status: true,
      message: "Store updated successfully",
      allusers: updatedUser,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: err.message,
    });
  }
};

//deleteUser
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const deleteUser = await User.findByIdAndDelete(userId);

    return res.status(200).send({
      status: true,
      message: "Store Deleted Successfully",
      deleteuser: deleteUser,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: err.message,
    });
  }
};

module.exports = {
  register,
  login,
  getAllUsers,
  getOneUser,
  deleteUser,
  updateUser,
  getAllShopOwners,
  getAllAdmins
};
