const pool = require("../db");
const { v4: uuidv4 } = require("uuid");

const addFoodData = async (req, res) => {
  const { diagnosis, gender, treatment, recommendation, symptoms } = req.body;
  const id = uuidv4();
  try {
    const food = await pool.query(
      "INSERT INTO food(id,diagnosis,gender,treatment,recommendation,symptoms) VALUES($1,$2,$3,$4,$5,$6)",
      [id, diagnosis, gender, treatment, recommendation, symptoms]
    );

    if (food.command == "INSERT") {
      res.json({ message: "Successfully added a new data to water." });
    }
  } catch (error) {
    console.log(error);
  }
};

const getFoodData = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM food");
    res.json(response.rows);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addFoodData, getFoodData };
