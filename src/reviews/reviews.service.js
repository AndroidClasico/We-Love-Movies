const knex = require("../db/connection");

function readCritic(critic_id) {
    return knex("critics").select("*").where({ critic_id }).first();
}
  
async function setCritic(review) {
    review.critic = await readCritic(review.critic_id);
    return review;
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
    .update({ score: updatedReview.score, content: updatedReview.content})
    .then(()=> read(updatedReview.review_id))
    .then(setCritic)
}

function destroy(reviewId) {
    return knex("reviews").where({ review_id: reviewId }).first().del();
}

// function updateCritic(reviewId) {
//   return knex().join().select().where({}).then();
// }

module.exports = {
    list, 
    read,
    update,
    delete: destroy,
};
