const { signUp } = require("../controllers/adminController.js");

const router = require("express").Router();

router.post("/signup", signUp);
