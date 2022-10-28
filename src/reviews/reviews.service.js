const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
    preferred_name:"critic.preferred_name",
    surname: "critic_id.surname",
    organization_name: "critic.organization_name",
})

function update(updatedReview) {
    return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*")
}

function updateCritic(reviewId) {
    return knex()
    .join()
    .select()
    .where({})
    .then()
}

function destroy(review_id) {
    return knex("reviews").where({ review_id }).del();
  }

module.exports = {
    delete: destroy,
    update
}