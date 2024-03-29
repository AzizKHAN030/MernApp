import Mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = (req, res) => {
  const post = req.body;

  const newPost = new PostMessage(post);
  try {
    newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!Mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No posts with that id");
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!Mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No posts with that id");
  }
  const deletedPost = await PostMessage.findByIdAndDelete(_id);
  res.json(deletedPost);
};

export const likePost = async (req, res) => {
  const { id: _id } = req.params;
  const { likeCount } = req.body;

  if (!Mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No posts with that id");
  }

  const likePost = await PostMessage.findByIdAndUpdate(_id, {
    $set: { likeCount: parseInt(likeCount) + 1 },
  });

  res.json(likePost);
};
