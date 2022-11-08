const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties")

const addCritic = mapProperties({
  // critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic_id.surname",
  organization_name: "critic.organization_name",
  // created_at: ["critics", null, "created_at"],
  // updated_at: ["critics", null, "updated_at"],
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
    // .then(()=> read(updatedReview.review_id))
    // .update({ score: updatedReview.score, content: updatedReview.content})
    // .then(setCritic)
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
        .then(data => data.map(addCritic))
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
