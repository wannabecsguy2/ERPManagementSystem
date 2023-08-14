const express = require("express");
const router = express.Router();
const supplierController = require("../controllers/supplier.controller");

//router.post('/:id', buyerController.getBuyerDetailsById);
router.post("/register", supplierController.register);
router.post("/getAll", supplierController.getAll);
module.exports = router;