import { config } from "dotenv";
config({ path: "./.env" });
import "express-async-errors";

import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";

import notFoundError from "./middleware/notFoundError.js";
import errorHandler from "./middleware/errorHandler.js";

import connectDB from "./database/connect.js";

import authRouter from "./routers/authRouter.js";
import userRouter from "./routers/userRouter.js";
import blogRouter from "./routers/blogRouter.js";

const port = process.env.PORT || 3001;
const app = express();

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
});

app.set("trust proxy", 1);
app.disable("x-powered-by");
app.use(limiter);
app.use(helmet());
app.use(
	cors({
		origin:
			process.env.NODE_ENV === "production"
				? "https://wanderers-blog.netlify.app"
				: "http://localhost:3000",
		credentials: true,
	})
);
app.use(morgan("dev"));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(json());
app.use(xss());
app.use(mongoSanitize());

app.get("/", (req, res) => {
	res.status("200").send("Hello");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/blogs", blogRouter);
app.use(notFoundError);
app.use(errorHandler);

const main = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(port, console.log(`Server is listening on ${port}`));
	} catch (error) {
		console.log(error);
	}
};

main();
