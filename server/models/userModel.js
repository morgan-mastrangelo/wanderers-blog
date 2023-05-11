import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import Blog from "../models/blogModel.js";

const { Schema, model } = mongoose;
const { isEmail } = validator;
const { genSalt, hash, compare } = bcryptjs;

const UserSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Please provide a name"],
			minlength: 2,
			maxlength: 50,
			trim: true,
		},
		email: {
			type: String,
			required: [true, "Please provide an email"],
			validate: {
				validator: isEmail,
				message: "Please provide a valid email",
			},
			trim: true,
			unique: true,
		},
		password: {
			type: String,
			required: [true, "Please provide a password"],
			minlength: 8,
			trim: true,
		},
		description: {
			type: String,
			trim: true,
		},
		avatar: {
			type: String,
		},
		numOfBlogs: {
			type: Number,
			default: 0,
		},
		verificationToken: String,
		isVerified: {
			type: Boolean,
			default: false,
		},
		verificationTokenExpirationDate: Date,
		verified: Date,
		passwordToken: String,
		passwordTokenExpirationDate: Date,
	},
	{ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

UserSchema.virtual("blogs", {
	ref: "Blog",
	localField: "_id",
	foreignField: "author",
	justOne: false,
});

UserSchema.pre("save", async function () {
	if (this.isModified("password")) {
		const salt = await genSalt(10);
		this.password = await hash(this.password, salt);
	}
});

UserSchema.pre("remove", async function (next) {
	await this.$model("Blog").deleteMany({ author: this._id });
	next();
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
	const isMatch = await compare(candidatePassword, this.password);
	return isMatch;
};

export default model("User", UserSchema);
