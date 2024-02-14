const {
  signUp,
  login,
  changePassword,
} = require("../controllers/adminController.js");

const router = require("express").Router();

router.post("/signup", signUp);
router.post("/login", login);
router.put("/changePassword", changePassword);

module.exports = router;
