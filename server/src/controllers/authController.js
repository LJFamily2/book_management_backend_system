const User = require("../models/User");
const bcrypt = require("bcrypt");
const { registerSchema, loginSchema } = require("../validators/authValidation");

module.exports = {
  register,
  login,
};

async function register(req, res) {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    // Exclude password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json(userResponse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function login(req, res) {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    res.status(501).json({ message: "Login not implemented yet" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
