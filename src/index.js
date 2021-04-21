//Modules
import ENV from "./app/config/env";
import DATABASE from "./app/config/db";

// express
import chalk from 'chalk';
import express from "express";
import CORS from "./app/middlewares/CORS";
import ExpressPlugins from "./app/middlewares/ExpressPlugins";

// APIS
import routes from "./app/routes";

const app = express();

// Middlewares
app.use(function(req, res, next) { req.start = Date.now(); next(); });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(CORS);
app.use(ExpressPlugins);

// Routes
app.use("/api", routes);

app.use(function (req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});


app.use((err, req, res, next) => {
    if (!err) return res.validSend(201, {});
    if (!err.status) err.status = 500;
    return res.status(err.status).json({ error: err.message });
});


app.listen(process.env["PORT"] || process.env["API_PORT"], (v) => {
    console.log(chalk.gray.bgCyan.bold(' INFO ') + " Server Running... \n");
    console.log(`Local:\t` + chalk.bold(`http://127.0.0.1:${process.env["PORT"] || process.env["API_PORT"]}`));

    setTimeout(() => {
        console.log(chalk.yellowBright('\nUse Ctrl+C to stop the server.\n'));
    }, 2000);
}).on("error", (error) => {
    console.log(error);
});
