import getDataUrl from "../utils/urlGenerator.js";
import cloudinary from "cloudinary";
import { Pin } from "../models/pin.model.js";

export const createPin = async (req, res) => {
  try {
    const { title, pin } = req.body;

    const file = req.file;

    const fileUrl = getDataUrl(file);

    const cloud = await cloudinary.v2.uploader.upload(fileUrl.content);

    await Pin.create({
      title,
      pin,
      image: {
        id: cloud.public_id,
        url: cloud.secure_url,
      },
      owner: req.user._id,
    });

    res.json({
      message: "Pin created",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllPins = async (req, res) => {
  try {
    const pins = await Pin.find().sort({ createdAt: -1 });
    res.json(pins);
  } catch (error) {
    console.log(error);
  }
};

export const getSinglePin = async (req, res) => {
  try {
    const pin = await Pin.findById(req.params.id).populate(
      "owner",
      "-password"
    );

    res.json(pin);
  } catch (error) {
    console.log(error);
  }
};

export const commentOnPin = async (req, res) => {
  try {
    const pin = await Pin.findById(req.params.id);
    if (!pin) {
      return res.status(400).json({
        message: "No pin with this id",
      });
    }
    pin.comments.push({
      user: req.user._id,
      name: req.user.name,
      comment: req.body.comment,
    });

    await pin.save();

    res.json({
      message: "comment Added",
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = async (req, res) => {
  try {
    const pin = await Pin.findById(req.params.id);

    if (!pin)
      return res.status(400).json({
        message: "No Pin with this id",
      });

    if (!req.query.commentId)
      return res.status(404).json({
        message: "Please give comment id",
      });

    const commentIndex = pin.comments.findIndex(
      (item) => item._id.toString() === req.query.commentId.toString()
    );

    if (commentIndex === -1) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    const comment = pin.comments[commentIndex];

    if (comment.user.toString() === req.user._id.toString()) {
      pin.comments.splice(commentIndex, 1);

      await pin.save();

      return res.json({
        message: "Comment Deleted",
      });
    } else {
      return res.status(403).json({
        message: "You are not owner of this comment",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deletePin = async (req, res) => {
  try {
    const pin = await Pin.findById(req.params.id);

    if (!pin)
      return res.status(400).json({
        message: "No Pin with this id",
      });

    if (pin.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    await cloudinary.v2.uploader.destroy(pin.image.id);
    await pin.deleteOne();

    res.json({
      message: "Pin deleted",
    });
  } catch (error) {
    console.log(error);
  }
};

export const updatePin = async (req, res) => {
  try {
    const pin = await Pin.findById(req.params.id);

    if (!pin)
      return res.status(400).json({
        message: "No Pin with this id",
      });

    if (pin.owner.toString() !== req.user._id.toString())
      return res.status(403).json({
        message: "Unauthorized",
      });

    // pin.title = req.body.title;
    // pin.pin = req.body.pin;

    if (req.body.title) {
        pin.title = req.body.title;
      }
      if (req.body.pin) {
        pin.pin = req.body.pin;
      }
    await pin.save();

    res.json({
      message: "Pin updated",
    });
  } catch (error) {
    console.log(error);
  }
};
