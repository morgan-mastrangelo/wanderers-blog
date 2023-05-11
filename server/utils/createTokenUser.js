const createTokenUser = (user) => {
	return { userID: user._id, username: user.name };
};

export default createTokenUser;
