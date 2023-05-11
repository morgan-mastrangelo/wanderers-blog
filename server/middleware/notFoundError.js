const notFoundError = (req, res, next) => {
	res.status(404).send("Lol! Don't try to access an undefined route!");
};

export default notFoundError;
