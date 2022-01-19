const express = require("express");
router = express.Router();
user_controller = require("../controllers/userController");

router.get("/:id", user_controller.selected_user)

module.exports = router;
