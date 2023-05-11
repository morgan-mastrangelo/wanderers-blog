import sendEmail from "./sendEmail.js";

const sendVerificationEmail = async ({ name, email, verificationToken }) => {
	const origin =
		process.env.NODE_ENV === "production"
			? "https://wanderers-blog.netlify.app"
			: "http://localhost:3000";
	const verificationLink = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`;
	const message = `<p>PLease confirm your email by clicking on the following link : 
	<a href="${verificationLink}" target="_blank">Verify Email</a></p>`;

	return sendEmail({
		to: email,
		subject: "Email Confirmation",
		html: `<h4>Hello, ${name}</h4>
        ${message}
        `,
	});
};

export default sendVerificationEmail;
