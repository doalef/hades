import dotenv from "dotenv";
import path from "path";
let dotenvPath = "../../../.env.development";
let projectMode = "prod";


process.argv.forEach((val, index, array) => {
	if (val === "development") {
		projectMode = "dev";
		dotenv.config({
			path: path.resolve(__dirname, dotenvPath),
		});
	}
});
process.env.projectMode = projectMode;