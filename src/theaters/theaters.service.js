const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

//What you want is to collapse or reduce the theatre
// data and map the movies to an array property on the theatre.
const reduceMovies = reduceProperties("theater_id", {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  rating: ["movies", null, "rating"],
  description: ["movies", null, "description"],
  image_url: ["movies", null, "image_url"],
  is_showing: ["movies", null, "is_showing"],
});

//This route should return all the theaters and,
// the movies playing at each theatre added to the movies key. 
//This means you will need to check the movies_theaters table.
function theatersList() {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .select("*")
    .then(data => reduceMovies(data, null))
}

module.exports = {
  theatersList,
};