import User from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
};

export const createUser = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};
