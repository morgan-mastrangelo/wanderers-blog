import mongoose from "mongoose";
const { connect } = mongoose;

const connectDB = (url) => {
	return connect(url);
};

export default connectDB;
