const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const pool = require("../db");

const jwtGenerator = require("../utils/jwtGenerator");

//1
router.post("/register", async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);
//2
     if (user.rows.length > 0) {
       return res.status(401).json("User already exist!");
     }

    //3
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

//4
     let newUser = await pool.query(
       "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
       [name, email, bcryptPassword]
     );

//5
    const token = jwtGenerator(newUser.rows[0].user_id);

    res.json({token});

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


//login route

router.post("/login",  async (req, res) => {


  try {
    
   
  } catch (err) {
    console.error(err.message);
  }
})






module.exports = router;
