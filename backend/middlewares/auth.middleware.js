import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    // console.log(token);
    

    if (!token) {
      return res.status(403).json({ message: "Please Login" });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decodedData);
    

    if (!decodedData) {
      return res.status(403).json({ message: "Token expired" });
    }

    req.user = await User.findById(decodedData.id);
    // console.log(req.user);
    

    next();
  } catch (error) {
    console.log(error);
  }
};
