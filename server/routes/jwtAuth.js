const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
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

    
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);


     let newUser = await pool.query(
       "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
       [name, email, bcryptPassword]
     );




    res.json(newUser.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});







module.exports = router;
