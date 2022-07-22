import express from "express";
import { signup, signin } from "../controllers/auth.js";

const router = express.Router();
// CREATE USER
router.post("/signup", signup);

// SIGNIN
router.post("/signin", signin);

export default router;
