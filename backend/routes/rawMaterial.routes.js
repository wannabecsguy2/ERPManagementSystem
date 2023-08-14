const rawMaterialController = require("../controllers/rawMaterial.controller");
const express = require("express");
const router = express.Router();

router.post("/getAll", rawMaterialController.getAll);
router.post("/register", rawMaterialController.register);

module.exports = router;