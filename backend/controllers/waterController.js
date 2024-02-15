const { v4: uuidv4 } = require("uuid");
const pool = require("../db");

const addWaterData = async (req, res) => {
  const { gender, hostel, disease, action, domestic_use, suggestion } =
    req.body;
  const id = uuidv4();
  try {
    const water = await pool.query(
      "INSERT INTO water(id,gender,hostel,disease,action,domestic_use,suggestion) VALUES($1,$2,$3,$4,$5,$6,$7)",
      [id, gender, hostel, disease, action, domestic_use, suggestion]
    );

    if (water.command == "INSERT") {
      res.json({ message: "Successfully added a new data to water." });
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { addWaterData };
