const User = require("../models/user");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getUser = (req, res, next) => {
  const userId = req.params.userId;
  const user = {
    userId: userId,
    name: "karim Esmael",
    age: "26",
  };
  res.status(200).json({ user: user });
};

exports.signUp = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError(errors.array()[0].msg, 422);
    return next(error);
  }
  const { name, password, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = new User({
    name: name,
    email: email,
    password: hashedPassword,
  });
  await user.save();
  res.status(200).json({ message: "new user created", user: user });
};

exports.logIn = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    const error = new HttpError("wrong email or password", "403");
    return next(error);
  }
  const passwordChecked = await bcrypt.compare(password, user.password);
  if (!passwordChecked) {
    const error = new HttpError("wrong email or password", 403);
    return next(error);
  }

  let token = jwt.sign(
    { userId: user._id, email: user.email },
    "mysupersecretpassword",
    { expiresIn: "1h" }
  );
  res.status(200).json({ Authenticated: passwordChecked, token: token });
};
