const express = require("express");
const router = express.Router();
const {
  createItem,
  getAllItems,
  getItem,
  deleteItem,
  updateItem,
  getItemCount
} = require("../controllers/item.controller");

router.post("/createItem", createItem);
router.get("/getAllItems", getAllItems);
router.get("/getItemCount", getItemCount);
router.get("/getItem/:id", getItem);
router.delete("/deleteItem/:id", deleteItem);
router.patch("/updateItem/:id", updateItem);

module.exports = router;
