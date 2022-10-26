if (process.env.USER) require("dotenv").config();
const express = require("express");
const notFound = require("./errors/notFound");

const app = express();

const moviesRouter = require("./movies/movies.router");
// const reviewsRouter = require("./reviews/reviews.router");
// const theatersRouter = require("./theaters/theaters.router");

app.use("/movies", moviesRouter);
// app.use("/reviews", reviewsRouter);
// app.use("/theaters", theatersRouter);
app.use(notFound);

module.exports = app;
