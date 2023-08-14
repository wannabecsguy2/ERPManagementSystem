const productController = require("../controllers/product.controller");
const express = require("express");
const router = express.Router();

router.post("/getAll", productController.getAll);
router.post("/register", productController.register);
module.exports = router;