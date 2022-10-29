const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// next({ status: 404, message: `Supplier cannot be found.` });
async function reviewExists(req, res, next) {
  reviewsService
    .read(req.params.reviewId)
    .then((review) => {
      if (review) {
        res.locals.review = review;
        return next();
      }
      next({ status: 404, message: `Review cannot be found.` });
    })
    .catch(next);
}

async function update(req, res, next) {
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  reviewsService
    .update(updatedReview)
    .then((data) => res.json({ data }))
    .catch(next);
}

async function destroy(req, res, next) {
  reviewsService
    .delete(res.locals.review.review_id)
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
};
