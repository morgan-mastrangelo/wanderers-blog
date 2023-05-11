import {
	BadRequestError,
	NotFoundError,
	UnauthenticatedError,
} from "../errors/index.js";

import Blogs from "../models/blogModel.js";
import { StatusCodes } from "http-status-codes";

const getAllBlogs = async (req, res) => {
	const { search } = req.query;
	const regex = new RegExp(search, "i");

	const blogs = await Blogs.find({ title: { $regex: regex } })
		.populate("author", "_id name email numOfBlogs description")
		.sort("title");

	if (blogs.length < 1) {
		return res.status(StatusCodes.OK).json({
			status: "error",
			data: [],
			length: 0,
		});
	}

	res.status(StatusCodes.OK).json({
		status: "success",
		data: blogs,
		length: blogs.length,
	});
};

const createBlog = async (req, res) => {
	const { title, locationName, blogDesc } = req.body;
	const { user } = req;

	if (!title || !locationName || !blogDesc) {
		throw new BadRequestError("Please provide a title, location name and blog");
	}
	if (!user) {
		throw new UnauthenticatedError("Unauthorized");
	}

	const blog = await Blogs.create({
		title,
		locationName,
		blogDesc,
		author: user.userID,
	});

	res.status(StatusCodes.CREATED).json({ status: "CREATED", blog });
};

const getBlog = async (req, res) => {
	const { id } = req.params;
	if (!id) {
		throw new BadRequestError("Please provide a blog id");
	}

	const blog = await Blogs.findById(id).populate("author");

	if (!blog) {
		throw new BadRequestError(`No blog found with this id ${id}`);
	}

	res.status(StatusCodes.OK).json({ status: "success", blog });
};

const deleteBlog = async (req, res) => {
	const { id } = req.params;
	if (!id) {
		throw new BadRequestError("Please provide a blog id");
	}
	const blog = await Blogs.findById(id);
	if (!blog) {
		throw new NotFoundError(`No blog found with this id ${id}`);
	}
	await blog.remove();
	res.status(StatusCodes.OK).json({ status: "deleted" });
};

export { getAllBlogs, createBlog, getBlog, deleteBlog };
