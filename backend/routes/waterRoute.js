const router = require("express").Router();
const {
  addWaterData,
  getWaterData,
} = require("../controllers/waterController");

router.post("/add", addWaterData);
router.get("/get", getWaterData);

module.exports = router;
