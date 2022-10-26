const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  const foundMovie = await service.readMovie(res.locals.movie.movie_id);
  res.json({ foundUser });

  if (foundMovie) {
    res.locals.movie = foundMovie;
    return next();
  }
  next({
    status: 400,
    message: `Movie id not found`,
  });
}

async function list(req, res) {
  const data = await service.list(req.query.is_showing);
  res.json({ data });
}

async function readMovies(req, res) {
  const data = res.locals.movie;
  res.json({ data });
}

async function readTheaters(req, res) {
  const data = await service.readTheaters(res.locals.movie.movie_id);
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  readTheaters: [asyncErrorBoundary(movieExists), readTheaters],
  readMovies: [asyncErrorBoundary(movieExists), readMovies],
};
