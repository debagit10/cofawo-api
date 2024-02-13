const pool = require("../db.js");

const signUp = async (req, res) => {
  const { name, password } = req.body;
  try {
    const response = await pool.query(
      "INSERT INTO admin name, password VALUES($1,$2)",
      [name, password]
    );
    res.json(response);
    console.log(response);
  } catch (error) {
    res.send(error);
  }
};

module.exports = { signUp };
