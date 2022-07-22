import express from "express";
import { deleteUser, dislike, getUser, like, subscribe, unsubscribe, updateUser } from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();


// Update user
router.put("/:id", verifyToken, updateUser);

// Delete user
router.delete("/:id", deleteUser);

// get a user
router.get("/find/:id", getUser);

// subscribe a user
router.put("/sub/:id", subscribe);

// unsubscribe a user
router.put("/unsub/:id", unsubscribe);

// like a video
router.put("/like/:videoId", like);

// dislike a video
router.put("/dislike/:videoId/", dislike);

// comment a video
export default router;

// git remote add origin https://github.com/SatyamChoudhary2601/youtube-backend.git
// git branch -M  "main"
// git push -u origin "main"