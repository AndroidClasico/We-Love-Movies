if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();

const moviesRouter = require("./movies/movies.router");
// const reviewsRouter = require("./reviews/reviews.router");
// const theatersRouter = require("./theaters/theaters.router");

app.use("/movies", moviesRouter);
// app.use("/reviews", reviewsRouter);
// app.use("/theaters", theatersRouter);

// If a request is made to a route that does not exist, 
// the server returns a 404 error.

// If a request is made to a route that exists, 
// but the HTTP method is wrong, a 405 error is returned.

module.exports = app;
