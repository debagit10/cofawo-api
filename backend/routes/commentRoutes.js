const router = require("express").Router();

const {
  addComment,
  getComments,
} = require("../controllers/commentControllers");

router.post("/add", addComment);
router.get("/view", getComments);

module.exports = router;
