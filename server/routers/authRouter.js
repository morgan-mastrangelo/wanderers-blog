import { Router } from "express";
const router = Router();

import {
	register,
	login,
	logout,
	forgotPassword,
	resetPassword,
	isLoggedIn,
	verifyEmail,
} from "../controllers/authController.js";
import authenticateUser from "../middleware/authentication.js";

router.post("/register", register);
router.post("/login", login);
router.delete("/logout", authenticateUser, logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.route("/isLoggedIn").get(authenticateUser, isLoggedIn);
router.route("/verify-email").post(verifyEmail);

export default router;
