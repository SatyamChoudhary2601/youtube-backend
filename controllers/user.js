import { createError } from "../error.js";
import User from "../models/User.js";

export const updateUser = async (req, res, next) => {
  console.log(req.params.id);
  console.log(req.user.id, "userrr");
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
      console.log(error);
      next(error);
    }
  } else {
    throw next(createError(401, "You are not authorized to update this user"));
  }
};
export const deleteUser = (req, res, next) => {};
export const getUser = (req, res, next) => {};
export const subscribe = (req, res, next) => {};
export const unsubscribe = (req, res, next) => {};
export const like = (req, res, next) => {};
export const dislike = (req, res, next) => {};
