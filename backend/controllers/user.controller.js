import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      res
        .status(400)
        .json({ message: "Already have an account with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    generateToken(user._id, res);

    res.status(201).json({
      user,
      message: "User Registered",
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: "No user with this email" });
    }
    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(400).json({ message: "incorrect password" });
    }

    generateToken(user._id, res);

    res.status(200).json({ user, message: "Logged In" });
  } catch (error) {
    console.log(error);
  }
};

export const myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

export const userProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.json(user)
  } catch (error) {
    console.log(error);
  }
};

export const followAndUnfollowUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const loggedInUser = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({ message: "No user with this id" });
    }
    if (user._id.toString() === loggedInUser._id.toString()) {
      return res.status(400).status({ message: "You can't follow yourself" });
    }

    if (user.followers.includes(loggedInUser._id)) {
      const indexFollwoing = loggedInUser.following.indexOf(user._id);

      const indexFollwers = user.followers.indexOf(loggedInUser._id);

      loggedInUser.following.splice(indexFollwoing, 1);
      user.followers.splice(indexFollwers, 1);

      await loggedInUser.save();
      await user.save();

      return res.json({ message: "User unfollowed" });
    } else {
      loggedInUser.following.push(user._id);
      user.followers.push(loggedInUser._id);
    }

    await loggedInUser.save();
    await user.save();

    return res.json({ message: "followed" });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    return res.json({
      message: "Logged out succesfully",
    });
  } catch (error) {
    console.log(error);
  }
};
