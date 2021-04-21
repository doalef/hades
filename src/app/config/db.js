import mongoose from "mongoose";
import chalk from 'chalk';
mongoose.Promise = global.Promise;

import generateSitemap from '../../tools/sitemap';

const mongoOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
};

let uri = process.env.DB_URL;

//CONNECTING TO MONGODB SERVER
mongoose.connect(uri, mongoOptions);
const db = mongoose.connection;

//LOGS
db.on("error", () => {
	console.log('Database: ' + chalk.red.bold(' failed '));
});
db.once("open", () => {
    console.log('Database: ' + chalk.green.bold(' connected '));
});
