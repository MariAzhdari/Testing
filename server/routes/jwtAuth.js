const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");

//1
router.post("/register", validInfo, async (req, res) => {
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
    const { user_name, user_email } = newUser.rows[0];
    res.json({ token, user_email, user_name });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//login route

router.post("/login", validInfo, async (req, res) => {
  //1
  const { email, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    //2

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Credential");
    }
    //3
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );
    //    console.log(validPassword)

    if (!validPassword) {
      return res.status(401).json("Invalid Credential");
    }

    //4
    const token = jwtGenerator(user.rows[0].user_id);

    res.json({ token });
  } catch (err) {
    console.error(err.message);
  }
});

//it is just for now  I will remove it when i done frontend
router.get("/is-verify", authorize, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
