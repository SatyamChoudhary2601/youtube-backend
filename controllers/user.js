import { createError } from "../error.js";
import User from "../models/User.js";

export const updateUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  } else {
    throw next(createError(401, "You are not authorized to update this user"));
  }
};
export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).send("User deleted successfully");
    } catch (error) {
      next(error);
    }
  } else {
    throw next(createError(401, "You are not authorized to delete this user"));
  }
};
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const subscribe = async (req, res, next) => {
  try {
    // const loggedInUser =
    await User.findByIdAndUpdate(
      { _id: req.user.id },
      { $push: { subscribedUsers: req.params.id } },
      { new: true }
    );
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res.status(200).json("Subscribed successfully");
  } catch (error) {
    next(error);
  }
};

export const unsubscribe = async (req, res, next) => {
  try {
    try {
      await User.findByIdAndUpdate(
        req.user.id,
        {
          $pull: { subscribedUsers: req.params.id },
        },
        { new: true }
      );
      await User.findByIdAndUpdate(req.params.id, {
        $inc: { subscribers: -1 },
      });
      res.status(200).json("Unsubscribed successfully");
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export const like = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const dislike = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
