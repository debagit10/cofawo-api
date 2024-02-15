const router = require("express").Router();
const { addWaterData } = require("../controllers/waterController");

router.post("/addWaterData", addWaterData);

module.exports = router;
