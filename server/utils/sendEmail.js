import nodemailer from "nodemailer";
import { config } from "dotenv";
config({ path: "./.env" });

const nodemailerConfig = {
	service: "gmail",
	auth: {
		user: process.env.MAIL,
		pass: process.env.APP_PASSWORD,
	},
};

const sendEmail = async ({ to, subject, html }) => {
	const transporter = nodemailer.createTransport(nodemailerConfig);

	const mailOptions = {
		from: process.env.MAIL,
		to,
		subject,
		html,
	};
	return transporter.sendMail(mailOptions, (err, data) => {
		if (err) {
			console.log(err);
		} else {
			console.log("Email Sent!!");
		}
	});
};

export default sendEmail;
