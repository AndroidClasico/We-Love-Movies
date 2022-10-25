const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
    critic_id: "critic.critic_id",
    surname: "critic_id.surname"
    

})

function list(is_showing) {
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .select("m.*")
        .where({ is_showing: true})
        .groupBy("m.movie_id")
        .orderBy("m.movie_id");
};

function readMovie(movieId) {
  return knex("movies as m")
  .select("*")
  .where({ movie_id: movieId })
  .first();
}

function readTheaters(movieId) {
    //needs a join
    return knex("theater as t")
        .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
        .select("t.*")
        .where({ movie_id: movieId, is_showing: true })
        .groupBy("t.theater_id")
        .orderBy("t.theater_id")
    }

function readReviews(reviewId) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ review_id: reviewId })
    .then(data => data.map(addCritic))
}

module.exports = {
  list,
  readMovie,
  readTheaters,
  readReviews,
};
