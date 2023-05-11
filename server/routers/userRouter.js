import { Router } from "express";
const router = Router();
import authenticateUser from "../middleware/authentication.js";
import authorize from "../middleware/authorize.js";

import {
	getUser,
	editUser,
	deleteUser,
} from "../controllers/usersController.js";

router
	.route("/:id")
	.get(authenticateUser, getUser)
	.patch(authenticateUser, authorize, editUser)
	.delete(authenticateUser, authorize, deleteUser);

export default router;
