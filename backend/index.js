const express = require("express");
const cors = require("cors");
const pool = require("./db");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const PORT = 5000;

const app = express();

app.use(express.json());

app.use(cors());

app.get("/test", (req, res) => {
  res.send("Api working");
});

app.post("/login", async (req, res) => {
  const { adminID, password } = req.body;
  try {
    const admin = await pool.query("SELECT * FROM admin WHERE name=$1", [
      adminID,
    ]);
    console.log(admin);
    if (!admin.rows.length) {
      res.json({ detail: "Wrong adminID" });
    }

    const token = jwt.sign({ adminID }, "secret", { expiresIn: "1hr" });

    if (admin.rows[0].password === password) {
      res.json({ success: "Login successful", token });
    } else {
      res.json({ error: "Incorrect password" });
    }
  } catch (error) {}
});

app.post("/report", async (req, res) => {
  const { alert, detail, isConfidential, location, notify, symptoms } =
    req.body;
  const id = uuidv4();
  const report = await pool.query(
    "INSERT INTO reports(id, alert, confidential, location, detail, notify,symptoms) VALUES($1,$2,$3,$4,$5,$6,$7)",
    [id, alert, isConfidential, location, detail, notify, symptoms]
  );
  if (report) {
    res.json({
      id,
      alert,
      isConfidential,
      location,
      detail,
      notify,
      symptoms,
    });
  }
});

app.get("/report", async (req, res) => {
  const report = await pool.query("SELECT * FROM reports");

  res.json(report.rows);
});

app.post("/food", async (req, res) => {
  const { diagnosis, gender, treatment, recommendation, symptoms } = req.body;
  const id = uuidv4();
  const food = await pool.query(
    "INSERT INTO food(id,diagnosis,gender,treatment,recommendation,symptoms) VALUES($1,$2,$3,$4,$5,$6)",
    [id, diagnosis, gender, treatment, recommendation, symptoms]
  );
  if (food) {
    res.json({ id, diagnosis, gender, treatment, recommendation, symptoms });
  }
});

app.post("/water", async (req, res) => {
  const { gender, hostel, disease, action, domesticUse, suggestion } = req.body;
  const id = uuidv4();
  try {
    const water = await pool.query(
      "INSERT INTO water(id,gender,hostel,disease,action,domesticuse,suggestion) VALUES($1,$2,$3,$4,$5,$6,$7)",
      [id, gender, hostel, disease, action, domesticUse, suggestion]
    );
    if (water) {
      res.json({
        id,
        gender,
        hostel,
        disease,
        action,
        domesticUse,
        suggestion,
      });
    }
  } catch (error) {
    console.error(error);
  }
});

app.post("/comment", async (req, res) => {
  const { report_id, comment } = req.body;
  const id = uuidv4();
  const response = await pool.query(
    "INSERT INTO comments(id,report_id,comment) VALUES($1,$2,$3)",
    [id, report_id, comment]
  );
  if (response) {
    res.json({ id, report_id, comment });
  }
});

app.post("/viewComment", async (req, res) => {
  const { report_id } = req.body;
  try {
    const response = await pool.query(
      "SELECT comment FROM comments WHERE report_id = $1",
      [report_id]
    );
    if (response) {
      console.log(response.rows);
      res.json(response.rows);
    }
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, console.log(`Server listening on PORT ${PORT}`));
