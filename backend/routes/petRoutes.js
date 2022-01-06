const express = require("express");
router = express.Router();
pet_controller = require("../controllers/petController");

// router.get("/", pet_controller.petController)
router.get("/", pet_controller.pet_list)

module.exports = router;
