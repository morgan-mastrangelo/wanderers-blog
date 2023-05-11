import jsonwebtoken from "jsonwebtoken";
const { sign, verify } = jsonwebtoken;

const createJWT = ({ payload }) => {
	const token = sign(payload, process.env.JWT_SECRET);
	return token;
};

const verifyJWT = (token) => verify(token, process.env.JWT_SECRET);

// const attachSingleCookieToResponse = ({ res, payload }) => {
// 	const token = createJWT({ payload });
// 	const oneDay = 1000 * 60 * 60 * 24;
// 	res.cookie("token", token, {
// 		httpOnly: true,
// 		expires: new Date(Date.now() + oneDay),
// 		secure: process.env.NODE_ENV === "production",
// 		signed: true,
// 		sameSite: false,
// 	});
// };

// Access token: we will just have the user info, will have short expiration time
// Refresh token: we will have user as well as refresh token  string value, will have long expiration time
const attachCookiesToResponse = ({ res, user, refreshToken }) => {
	const accessTokenJWT = createJWT({ payload: { user } });
	const refresTokenJWT = createJWT({ payload: { user, refreshToken } });

	const oneDay = 1000 * 60 * 60 * 24;
	const longerExp = 1000 * 60 * 60 * 24 * 30;

	res.cookie("accessToken", accessTokenJWT, {
		httpOnly: true,
		secure: true,
		signed: true,
		maxAge: new Date(Date.now() + oneDay),
		sameSite: "none",
	});

	res.cookie("refreshToken", refresTokenJWT, {
		httpOnly: true,
		expires: new Date(Date.now() + longerExp),
		secure: true,
		signed: true,
		sameSite: "none",
	});
};

export { createJWT, verifyJWT, attachCookiesToResponse };
