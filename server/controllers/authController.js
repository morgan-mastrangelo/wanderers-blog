import { StatusCodes } from "http-status-codes";
import { randomBytes } from "crypto";
import User from "../models/userModel.js";
import Token from "../models/tokenModel.js";
import {
	BadRequestError,
	NotFoundError,
	UnauthenticatedError,
} from "../errors/index.js";
import {
	attachCookiesToResponse,
	createTokenUser,
	sendVerificationEmail,
	sendResetPasswordEmail,
	createHash,
} from "../utils/index.js";

const register = async (req, res) => {
	const { name, email, password } = req.body;

	let isUser = await User.find({ email });
	if (isUser.length > 0) {
		throw new BadRequestError("Already an user.");
	}

	const verificationTokenExpirationDate = new Date(Date.now() + 1000 * 60 * 30);
	const verificationToken = randomBytes(40).toString("hex");
	const user = await User.create({
		name,
		email,
		password,
		verificationToken: createHash(verificationToken),
		verificationTokenExpirationDate,
	});

	await sendVerificationEmail({
		name: user.name,
		email: user.email,
		verificationToken: user.verificationToken,
	});
	res.status(StatusCodes.CREATED).json({ status: "Registered" });
};

const verifyEmail = async (req, res) => {
	const { verificationToken, email } = req.body;
	if (!verificationToken || !email) {
		throw new CustomError.BadRequestError(
			"Please provide a verification token and email"
		);
	}
	const user = await User.findOne({ email });

	if (!user) {
		throw new UnauthenticatedError("verification failed");
	} else {
		const currentDate = new Date();
		if (
			user.verificationToken !== verificationToken &&
			user.verificationTokenExpirationDate < currentDate
		) {
			throw new UnauthenticatedError("verification failed");
		}
	}

	user.isVerified = true;
	user.verified = Date.now();
	user.verificationToken = "";
	user.verificationTokenExpirationDate = null;
	await user.save();

	res.status(StatusCodes.OK).json({
		status: "Email verified",
	});
};

const login = async (req, res) => {
	const { email, password } = req.body;
	if (!email) {
		throw new BadRequestError("Please provide an email");
	}
	if (!password) {
		throw new BadRequestError("Please provide a password");
	}

	const user = await User.findOne({ email });
	if (!user) {
		throw new NotFoundError("No user found!");
	}
	const isPasswordCorrect = await user.comparePassword(password);

	if (!isPasswordCorrect) {
		throw new UnauthenticatedError("Invalid credentials");
	}

	if (!user.isVerified) {
		const verificationTokenExpirationDate = new Date(
			Date.now() + 1000 * 60 * 30
		);
		const verificationToken = randomBytes(40).toString("hex");
		user.verificationToken = verificationToken;
		user.verificationTokenExpirationDate = verificationTokenExpirationDate;
		await user.save();

		await sendVerificationEmail({
			name: user.name,
			email: user.email,
			verificationToken: user.verificationToken,
		});

		return res.status(StatusCodes.OK).json({
			status: "success",
			message:
				"Already an user, but unverified one. We have sent a new verification link to you",
		});
	}

	const tokenUser = createTokenUser(user);
	let refreshToken = "";
	const existingToken = await Token.findOne({ user: user._id });
	if (existingToken) {
		const { isValid } = existingToken;
		if (!isValid) {
			throw new UnauthenticatedError("Invalid credentials");
		}
		refreshToken = existingToken.refreshToken;
	} else {
		refreshToken = randomBytes(40).toString("hex");
		const userAgent = req.headers["user-agent"];
		const ip = req.ip;
		const userToken = { refreshToken, ip, userAgent, user: user._id };
		await Token.create(userToken);
	}
	attachCookiesToResponse({ res, user: tokenUser, refreshToken });
	res
		.status(StatusCodes.OK)
		.json({ status: "success", tokenUser, message: "Logged In" });
};

const logout = async (req, res) => {
	await Token.findOneAndDelete({
		user: req.user.userID,
	});

	res.cookie("accessToken", null, {
		httpOnly: true,
		expires: new Date(Date.now()),
		secure: true,
		signed: true,
		sameSite: "none",
	});

	res.cookie("refreshToken", null, {
		httpOnly: true,
		expires: new Date(Date.now()),
		secure: true,
		signed: true,
		sameSite: "none",
	});

	req.user = null;
	res.status(StatusCodes.OK).json({ status: "logout" });
};

const forgotPassword = async (req, res) => {
	const { email } = req.body;

	if (!email) {
		throw new BadRequestError("Please provide an email");
	}

	const user = await User.findOne({ email });
	if (user) {
		const passwordToken = randomBytes(70).toString("hex");
		const passwordTokenExpirationDate = new Date(Date.now() + 1000 * 60 * 10);

		user.passwordToken = createHash(passwordToken);
		user.passwordTokenExpirationDate = passwordTokenExpirationDate;
		await user.save();
	}

	await sendResetPasswordEmail({
		name: user.name,
		email: user.email,
		token: user.passwordToken,
	});
	res
		.status(StatusCodes.OK)
		.json({ status: "Please check your email for reset password link" });
};

const resetPassword = async (req, res) => {
	const { token, email, password } = req.body;

	if (!token) {
		throw new BadRequestError("Please provide the token");
	}
	if (!email) {
		throw new BadRequestError("Please provide an email");
	}
	if (!password) {
		throw new BadRequestError("Please provide the password");
	}

	const user = await User.findOne({ email });

	if (user.email !== email) {
		throw new BadRequestError("Provide the registered email");
	}

	if (user) {
		const currentDate = new Date();
		if (
			user.passwordToken === token &&
			user.passwordTokenExpirationDate > currentDate
		) {
			user.password = password;
			user.passwordToken = null;
			user.passwordTokenExpirationDate = null;
			await user.save();
		}
	}

	res.status(StatusCodes.OK).json({ status: "Password updated" });
};

const isLoggedIn = async (req, res) => {
	const { user } = req;

	let dbUser = user;

	if (user) {
		dbUser = await User.findById(user.userID).populate("blogs");
		if (!dbUser) {
			throw new BadRequestError("No user found");
		}
	}

	res.status(StatusCodes.OK).json({ status: "success", user: dbUser });
};

export {
	register,
	login,
	logout,
	forgotPassword,
	resetPassword,
	isLoggedIn,
	verifyEmail,
};
