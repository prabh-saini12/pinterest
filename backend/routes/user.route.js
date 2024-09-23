import express from "express";
import { followAndUnfollowUser, login, logout, myProfile, register, userProfile } from "../controllers/user.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login",login)
router.get("/logout",isAuth,logout)
router.get('/me',isAuth,myProfile)
router.get('/:id',isAuth,userProfile)
router.post("/follow/:id",isAuth,followAndUnfollowUser)

export default router;
