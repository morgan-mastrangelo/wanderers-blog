import { BadRequestError, UnauthenticatedError } from "../errors/index.js";

const authorize = (req, res, next) => {
	const { id } = req.params;

	if (!id) {
		throw new BadRequestError("Please provide an id");
	}
	if (id !== req.user.userID) {
		throw new UnauthenticatedError("Don't try to access a forbidden page");
	}
	next();
};

export default authorize;
