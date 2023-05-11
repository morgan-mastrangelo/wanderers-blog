import sendEmail from "./sendEmail.js";

const sendResetPasswordEmail = ({ name, email, token }) => {
	const origin =
		process.env.NODE_ENV === "production"
			? "https://wanderers-blog.netlify.app"
			: "http://localhost:3000";
	const resetURL = `${origin}/user/reset-password?token=${token}&email=${email}`;
	const message = `<p>PLease reset your password by clicking on the following link : 
	<a href="${resetURL}" target="_blank">Reset Password</a></p>`;

	return sendEmail({
		to: email,
		subject: "Reset Password",
		html: `Hello, ${name}
		${message}`,
	});
};

export default sendResetPasswordEmail;
