const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const movie = await service.readMovie(movieId);

  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({
    status: 404,
    message: `Movie cannot be found`,
  });
}

async function list(req, res) {
  const data = await service.list(req.query.is_showing);
  res.json({ data });
}

async function readMovie(req, res, next) {
  console.log("line 24 controller.js: ", res.locals.movie);
  res.json({ data: res.locals.movie });
}

async function readTheaters(req, res) {
  const data = await service.readTheaters(res.locals.movie.movie_id); //.movieId???
  res.json({ data });
}

async function readReviews(req, res) {
  const movie = res.locals.movie.movie_id;
  res.json({ data: await service.readReviews(movie) });
  console.log('Alexandra', {data: await service.readReviews(movie)})
  // const data = await service.readReviews(res.locals.movie.movie_id);
  // console.log(data)
  // res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  readMovie: [asyncErrorBoundary(movieExists), asyncErrorBoundary(readMovie)],
  readTheaters: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(readTheaters),
  ],
  readReviews: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(readReviews),
  ],
};
