import express from "express";
import {
  addVideo,
  deleteVideo,
  getByTag,
  getVideo,
  getView,
  random,
  search,
  sub,
  trend,
  updateVideo,
} from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";
const router = express.Router();

router.post("/", verifyToken, addVideo);
router.post("/:id", verifyToken, updateVideo);
router.post("/:id", verifyToken, deleteVideo);
router.post("/find/:id", getVideo);
router.get("/view/:id", getView);
router.get("/trend", trend);
router.get("/random", random);
router.get("/sub",verifyToken, sub);
router.get("/tags",verifyToken, getByTag);
router.get("/search",verifyToken, search);

export default router;
