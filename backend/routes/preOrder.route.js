const express = require("express");
const router = express.Router();
const {
  addPreOrder,
  getAllPreOrders,
  getPreOrder,
  deletePreOrder,
  getPendingPreOrders,
  getCompletedPreOrders,
  updateStatus,
  pendingOrderCount,
  completedOrderCount
} = require("../controllers/preOrder.controller");

router.post("/addPreOrder", addPreOrder);
router.get("/getAllPreOrders", getAllPreOrders);
router.get("/getPreOrder/:id", getPreOrder);
router.delete("/deletePreOrder/:id", deletePreOrder);
router.get("/getPendingPreOrders", getPendingPreOrders);
router.get("/getCompletedPreOrders", getCompletedPreOrders);
router.patch("/updateStatus/:id", updateStatus);
router.get("/pendingOrderCount", pendingOrderCount);
router.get("/completedOrderCount", completedOrderCount);

module.exports = router;
