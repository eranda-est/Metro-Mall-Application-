const express = require("express");
const UserRouter = express.Router();

const {
  register,
  login,
  getAllUsers,
  getOneUser,
  getAllShopOwners,
  deleteUser,
  updateUser,
  getAllAdmins,
} = require("../controllers/user.controller");

UserRouter.post("/create", register);
UserRouter.post("/login", login);
UserRouter.get("/getAllUsers", getAllUsers);
UserRouter.delete("/deleteUser/:id", deleteUser);
UserRouter.get("/getOneUser/:id", getOneUser);
UserRouter.patch("/updateUser/:id", updateUser);
UserRouter.get("/getAllShopOwners", getAllShopOwners);
UserRouter.get("/getAllAdmins", getAllAdmins);

module.exports = UserRouter;
