const router = require("express").Router();

const { addFoodData, getFoodData } = require("../controllers/foodController");

router.post("/add", addFoodData);
router.get("/get", getFoodData);

module.exports = router;
