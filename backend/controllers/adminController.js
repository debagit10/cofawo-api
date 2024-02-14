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

const login = async (req, res) => {
  const { name, password } = req.body;
  try {
    const admin = await pool.query("SELECT * FROM admin WHERE name=$1", [name]);
    console.log(admin);
    if (!admin.rows.length) {
      res.json({ detail: "Wrong adminID" });
    }

    const token = jwt.sign({ name }, "secret", { expiresIn: "1hr" });

    if (admin.rows[0].password === password) {
      res.json({ success: "Login successful", token });
    } else {
      res.json({ error: "Incorrect password" });
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

module.exports = { signUp, login };
