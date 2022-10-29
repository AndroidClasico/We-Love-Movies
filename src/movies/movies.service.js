const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic_id.surname",
  organization_name: "critic.organization_name",
  created_at: ["critics", null, "created_at"],
  updated_at: ["critics", null, "updated_at"],
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
    .join("movies as m", "r.movie_id", "m.movie_id")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({ "r.movie_id": movieId })
    .then((data) => data.map(addCritic));
}

module.exports = {
  list,
  readMovie,
  readTheaters,
  readReviews,
};
