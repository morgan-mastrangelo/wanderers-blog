import { UnauthenticatedError } from "../errors/index.js";
import { verifyJWT } from "../utils/index.js";
import Token from "../models/tokenModel.js";
import { attachCookiesToResponse } from "../utils/index.js";

const authenticateUser = async (req, res, next) => {
	const { refreshToken, accessToken } = req.signedCookies;

	try {
		if (accessToken) {
			const payload = verifyJWT(accessToken);
			req.user = payload.user;
			return next();
		}
		const payload = verifyJWT(refreshToken);
		const existingToken = await Token.findOne({
			user: payload.user.userId,
			refreshToken: payload.refreshToken,
		});
		if (!existingToken || !existingToken?.isValid) {
			throw new UnauthenticatedError("Unauthenticated user");
		}
		req.user = payload.user;
		attachCookiesToResponse({
			res,
			user: payload.user,
			refreshToken: existingToken.refreshToken,
		});
		return next();
	} catch (error) {
		throw new UnauthenticatedError("Unauthenticated user");
	}
};

// const authenticateUserOldMethod = (req, res, next) => {
// 	const token = req.signedCookies.token;
// 	if (!token) {
// 		throw new UnauthenticatedError("Unauthenticated user");
// 	}
// 	try {
// 		const { userID } = verifyJWT({ token });
// 		req.user = { userID };
// 		next();
// 	} catch (error) {
// 		throw new UnauthenticatedError("Unauthenticated user");
// 	}
// };

export default authenticateUser;
