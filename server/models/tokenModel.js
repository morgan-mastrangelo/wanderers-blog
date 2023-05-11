import mongoose from "mongoose";
const { Schema, model } = mongoose;

const TokenSchema = new Schema(
	{
		refreshToken: { type: String, required: true },
		ip: { type: String, required: true },
		userAgent: { type: String, required: true },
		isValid: { type: Boolean, default: true },
		user: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
);

export default model("Token", TokenSchema);
