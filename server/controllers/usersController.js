import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import User from "../models/userModel.js";
import Token from "../models/tokenModel.js";

const getUser = async (req, res) => {
	const { id } = req.params;

	const user = await User.findById(id).select("-password").populate("blogs");
	if (!user) {
		throw new BadRequestError("No user found");
	}
	res.status(StatusCodes.OK).json({ status: "success", user });
};

const editUser = async (req, res) => {
	const { id } = req.params;
	const { name, email, description } = req.body;

	if (!name) {
		throw new BadRequestError("Please provide a name");
	}
	if (!email) {
		throw new BadRequestError("Please provide an email");
	}
	let updatedUserData = { name, email };
	if (description) {
		updatedUserData.description = description;
	}
	const user = await User.findByIdAndUpdate(id, updatedUserData, {
		new: true,
		runValidators: true,
	});
	if (!user) {
		throw new BadRequestError("No user found");
	}
	await user.save();

	res.status(StatusCodes.OK).json({ status: "Updated User", user: user });
};

const deleteUser = async (req, res) => {
	const { id } = req.params;

	const user = await User.findById(id);
	if (!user) {
		throw new NotFoundError("No user found");
	}

	await user.remove();

	await Token.findOneAndDelete({
		user: req.user.userID,
	});

	res.cookie("accessToken", "logout", {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		signed: true,
		expires: new Date(Date.now()),
	});

	res.cookie("refreshToken", "logout", {
		httpOnly: true,
		expires: new Date(Date.now()),
		secure: process.env.NODE_ENV === "production",
		signed: true,
	});
	req.user = null;

	res.status(StatusCodes.OK).json({ status: "Account Deleted" });
};

export { getUser, editUser, deleteUser };
