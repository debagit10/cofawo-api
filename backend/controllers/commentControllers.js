const pool = require("../db");
const { v4: uuidv4 } = require("uuid");

const addComment = async (req, res) => {
  const { report_id, comment } = req.body;
  const id = uuidv4();
  try {
    const response = await pool.query(
      "INSERT INTO comments(id,report_id,comment) VALUES($1,$2,$3)",
      [id, report_id, comment]
    );
    if (response.command == "INSERT") {
      res.json({ message: "Comment posted successfully" });
    }
  } catch (error) {
    console.log(error);
  }
};

const getComments = async (req, res) => {
  const { report_id } = req.query;
  try {
    const response = await pool.query(
      "SELECT * FROM comments WHERE report_id = $1",
      [report_id]
    );
    res.json(response.rows);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { addComment, getComments };
