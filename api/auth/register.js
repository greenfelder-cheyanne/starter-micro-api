const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const passValid = require("password-validator");

let schema = new passValid();
schema
  .is()
  .min(8)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .symbols()
  .has()
  .not()
  .spaces();

module.exports = async (req, res) => {
  const { username, password, name, imei } = req.body;
  console.log("register", req.body);
  try {
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "user already exist" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        password: true,
        message: "Password must contain minimum 6 characters.",
      });
    }

    const newuser = new User(req.body);
    newuser.imei = imei;
    const salt = await bcrypt.genSalt(10);
    newuser.password = await bcrypt.hash(password, salt);
    newuser.isVerified = false;

    await newuser.save();

    const payload = {
      user: {
        id: newuser.id,
        username: username,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: 864000000000,
      },
      async (err, token) => {
        if (err) throw err;
        return res.status(200).json({
          token,
          username: username,
          name: name,
        });
      }
    );
  } catch (error) {
    console.log("error on singup page ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
