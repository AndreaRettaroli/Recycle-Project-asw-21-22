const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await userModel.findOne({ email: email });
    if (!Object.is(user, null) && !Object.is(user, undefined)) {
      return res.status(409).json({ error: "Email already used" });
    }
    encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      ...req.body,
      password: encryptedPassword,
      role: "user",
      createdAt: new Date().toISOString(),
    });
    await newUser.save();

    const token = jwt.sign(
      { user_id: newUser._id, email },
      process.env.TOKEN_KEY,
      {
        algorithm: "HS512",
        expiresIn: "8h",
      }
    );
    return res.status(200).json({ ...newUser._doc, token: token });
  } catch (err) {
    console.error(
      "🚀 ~ file: userController.js:21 ~ exports.signup= ~ err:",
      err
    );
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (Object.is(email, undefined) || Object.is(password, undefined)) {
      return res.status(400).json({ error: "All inputs are required" });
    }
    // Validate if user exist in our database
    const user = await userModel.findOne({ email });

    if (
      !Object.is(user, null) &&
      (await bcrypt.compare(password, user.password))
    ) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          algorithm: "HS512",
          expiresIn: "8h",
        }
      );
      return res.status(200).json({ ...user._doc, token: token });
    } else {
      return res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    console.error(
      "🚀 ~ file: authController.js:43 ~ exports.login= ~ err:",
      err
    );
    return res.status(500).json({ error: "Internal server error" });
  }
};
