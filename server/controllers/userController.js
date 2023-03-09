const userModel = require("../models/userModel");

exports.getUser = async (req, res) => {
  try {
    const userId = req.query.id;
    let user = await userModel.findById(userId);
    if (Object.is(user, null)) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.error(
      "🚀 ~ file: userController.js:35 ~ exports.getUser= ~ err:",
      err
    );
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.query.id;
    const newUser = { ...req.body, updatedAt: new Date().toISOString() };
    let user = await userModel.findById(userId);
    if (Object.is(user, null)) {
      return res.status(404).json({ error: "User not found" });
    }
    const updatedUser = await userModel.findByIdAndUpdate(userId, newUser, {
      new: true,
    }); //new true return new user
    return res.status(200).json(updatedUser);
  } catch (err) {
    console.error(
      "🚀 ~ file: userController.js:50 ~ exports.updateUser= ~ err:",
      err
    );
    return res.status(500).json({ error: "Errore del server" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.query.id;
    let user = await userModel.findById(userId);
    if (Object.is(user, null)) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.role === "admin") {
      return res.status(400).json({ error: "Admin can't be deleted" });
    }
    await userModel.findByIdAndDelete(userId);
    return res.status(200).json({ description: "User deleted" });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.usersList = async (req, res) => {
  try {
    let users = await userModel.find({});
    return res.status(200).json(users);
  } catch (err) {
    console.error(
      "🚀 ~ file: userController.js:41 ~ exports.usersList= ~ err:",
      err
    );
    return res.status(500).json({ error: "Errore del server" });
  }
};
