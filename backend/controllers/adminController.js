const pool = require("../db.js");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  const { name, password } = req.body;
  try {
    const response = await pool.query(
      "INSERT INTO admin(name, password) VALUES($1,$2)",
      [name, password]
    );

    const token = jwt.sign({ name }, "secret", { expiresIn: "1hr" });

    if (response.command === "INSERT") {
      res.json({ message: "Sign up successful", token });
    }
  } catch (error) {
    res.send(error);
  }
};

const login = async (req, res) => {
  const { adminID, password } = req.body;
  try {
    const admin = await pool.query("SELECT * FROM admin WHERE name=$1", [
      adminID,
    ]);
    //res.json(admin);
    if (!admin.rows.length) {
      res.json({ detail: "Wrong adminID" });
    }

    const token = jwt.sign({ name }, "secret", { expiresIn: "1hr" });

    if (admin.rows[0].password === password) {
      res.json({ success: "Login successful", token });
    } else {
      res.send({ error: "Incorrect password" });
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const changePassword = async (req, res) => {
  const { name, newPassword } = req.body;
  try {
    const response = await pool.query(
      "UPDATE admin SET password = $1 WHERE name = $2",
      [newPassword, name]
    );

    if (response.command === "UPDATE") {
      res.json({ message: "Password changed successfully" });
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

module.exports = { signUp, login, changePassword };
