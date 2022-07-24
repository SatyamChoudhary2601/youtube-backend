import Comment from "../models/Comment.js";
import Video from "../models/Video.js";
import {createError} from "../error.js";

export const addComment = async (req, res, next) => {
  try {
    const comment = await new Comment({ ...req.body, userId: req.user.id });
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const video = await Video.findById(req.params.id);
    if(req.user.id === comment.userId || req.user.id === video.userId) {
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json("Comment deleted");
    }
    else{
        next(createError(403, "You are not authorized to delete this comment"));
    }
  } catch (error) {
    next(error);
  }
};

export const getComment = async (req, res, next) => {
  try {
    const comments = await Comment.find({videoId: req.params.videoId});
    console.log(req.params.videoId,"comments")
    if(!comments) throw next(createError(404, "Comment not found"));
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};
