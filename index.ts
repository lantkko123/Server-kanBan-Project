/** @format */

import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './src/routers/user';
import cors from 'cors';
import { verifyToken } from './src/middlewares/verifyToken';
dotenv.config();

const PORT = process.env.PORT || 3001;
const dbURL = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.fe0yt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', userRouter);

app.use(verifyToken);


const connectDB = async () => {
	try {
		await mongoose.connect(dbURL);

		console.log(`Connect to db successfully!!!`);
	} catch (error) {
		console.log(`Can not connect to db ${error}`);
	}
};

connectDB()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server is stating at http://localhost:${PORT}`);
		});
	})
	.catch((error) => {
		console.log(error);
	});


// 	DATABASE_PASSWORD=S4ouzsZIkIg3flct
// DATABASE_USERNAME=vuhoang20022
// PORT=3001
// SECRET_KEY=vuhoangdeptraisieucapvippro