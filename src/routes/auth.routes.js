const app = require("express");
const router = app.Router();
const authController = require("../controllers/auth.controller");

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
