const express = require("express");
const router = express.Router();
const pool = require("../db");


router.post("/register", async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

     if (user.rows.length > 0) {
       return res.status(401).json("User already exist!");
     }

    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});







module.exports = router;
