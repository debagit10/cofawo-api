const pool = require("../db");
const { v4: uuidv4 } = require("uuid");

const addReport = async (req, res) => {
  const { alert, detail, isConfidential, location, notify, symptoms } =
    req.body;
  const id = uuidv4();
  try {
    const report = await pool.query(
      "INSERT INTO reports(id, alert, confidential, location, detail, notify,symptoms) VALUES($1,$2,$3,$4,$5,$6,$7)",
      [id, alert, isConfidential, location, detail, notify, symptoms]
    );
    if (report.command == "INSERT") {
      res.json({ message: "Report successfully submitted" });
    }
  } catch (error) {
    console.log(error);
  }
};

const getReports = async (req, res) => {
  try {
    const reports = await pool.query("SELECT * FROM reports");
    res.json(reports.rows);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addReport, getReports };
