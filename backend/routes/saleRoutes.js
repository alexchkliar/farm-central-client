const express = require("express");
router = express.Router();
sale_controller = require("../controllers/saleController");

router.get("/", sale_controller.sale_list)

module.exports = router;
