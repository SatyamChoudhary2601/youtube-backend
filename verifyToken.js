import { createError } from "./error.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) throw next(createError(401, "No token"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) throw next(createError(401, "Invalid token"));
    req.user = user;
    next();
  });
};
