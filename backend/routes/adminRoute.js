const { signUp, login } = require("../controllers/adminController.js");

const router = require("express").Router();

router.post("/signup", signUp);
router.post("/login", login);

module.exports = router;
