const router = require("express").Router();

const { addReport, getReports } = require("../controllers/reportControllers");

router.post("/add", addReport);
router.get("/get", getReports);

module.exports = router;
