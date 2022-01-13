const express = require("express");
router = express.Router();
order_controller = require("../controllers/orderController");

router.get("/", order_controller.order_list)

module.exports = router;
