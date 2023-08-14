const express = require("express");
const router = express.Router();
const purchaseOrderController = require("../controllers/purchaseOrder.controller");

router.post("/getAll", purchaseOrderController.getAll);
router.post("/register", purchaseOrderController.register)
module.exports = router;