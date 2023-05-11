import { Router } from "express";
const router = Router();
import authenticateUser from "../middleware/authentication.js";
import {
	getAllBlogs,
	getBlog,
	createBlog,
	deleteBlog,
} from "../controllers/blogsController.js";

router.route("/").get(getAllBlogs);
router.route("/create").post(authenticateUser, createBlog);
router.route("/:id").get(getBlog).delete(authenticateUser, deleteBlog);

export default router;
