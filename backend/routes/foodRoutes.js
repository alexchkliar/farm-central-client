const express = require("express");
router = express.Router();
food_controller = require("../controllers/foodController");

// router.get("/", food_controller.foodController)
router.get("/", food_controller.food_list)

module.exports = router;
