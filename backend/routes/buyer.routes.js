const express = require("express");
const router = express.Router();
const buyerController = require("../controllers/buyer.controller");

//router.post('/:id', buyerController.getBuyerDetailsById);
router.post("/register", buyerController.register);
router.post("/getAll", buyerController.getAll)
module.exports = router;