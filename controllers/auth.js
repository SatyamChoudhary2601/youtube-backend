import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const salt = await bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hashSync(req.body.password, salt);
  try {
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).send("User has been created!");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) throw createError(401, "User not found");

    const isValid = await bcrypt.compareSync(password, user.password);
    if (!isValid) throw createError(401, "Invalid password");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .send(user);
  } catch (error) {
    next(error);
  }
};
