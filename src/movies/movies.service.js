const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

function list(is_showing) {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*")
    .where({ is_showing: true })
    .groupBy("m.movie_id")
    .orderBy("m.movie_id");
}

function readMovie(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
}

function readTheaters(movieId) {
  //needs a join
  return knex("movies_theaters as mt")
    .join("theaters as t", "t.theater_id", "mt.theater_id")
    .select("t.*", "mt.*")
    .where({ "mt.movie_id": movieId });
}

function readReviews(movieId) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ movie_id: movieId })
    .then((reviews) => {
      const reviewsWithCritic = [];
      reviews.forEach((review) => {
        const addedCritic = addCritic(review);
        reviewsWithCritic.push(addedCritic);
      });
      return reviewsWithCritic;
    });
}

module.exports = {
  list,
  readMovie,
  readTheaters,
  readReviews,
};
