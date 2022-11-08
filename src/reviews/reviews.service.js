const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

function readCritic(critic_id) {
    return knex("critics").select("*").where({ critic_id }).first();
}
  

function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

function list(){
    return knex("reviews")
        .select("*")
}

function update(updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update( updatedReview, "*")
}


// {
//   "data": {
//     "review_id": 1,
//     "content": "New content...",
//     "score": 3,
//     "created_at": "2021-02-23T20:48:13.315Z",
//     "updated_at": "2021-02-23T20:48:13.315Z",
//     "critic_id": 1,
//     "movie_id": 1,
//     "critic": {
//       "critic_id": 1,
//       "preferred_name": "Chana",
//       "surname": "Gibson",
//       "organization_name": "Film Frenzy",
//       "created_at": "2021-02-23T20:48:13.308Z",
//       "updated_at": "2021-02-23T20:48:13.308Z"
//     }
//   }
// }


function updateCritic(reviewId) {
    return knex("reviews as r")
        .join("critics as c", "r.critic_id", "c.critic_id")
        .select("*")
        .where({ review_id: reviewId })
        .first()
        .then((result) => {
          const updatedReview = addCritic(result)
          return updatedReview
        })
}


function destroy(reviewId) {
    return knex("reviews").where({ review_id: reviewId }).first().del();
}

module.exports = {
    list, 
    read,
    update,
    updateCritic,
    delete: destroy,
};
