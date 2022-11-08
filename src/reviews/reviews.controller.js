const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function listReviews(req, res, next) {
  reviewsService.list().then((review) => console.log(review));
}
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
  console.log("how is this undefined", req.body);
  console.log("the id", res.locals.review.review_id);
  const reviewId = res.locals.review.review_id // get review id
  const updatedReview = {
    ...req.body,
    review_id: reviewId,
    // params.reviewId
  };
  await reviewsService.update(updatedReview); // update review
  const criticUpdata = await reviewsService.updateCritic(reviewId); // get updated review
  console.log("criticUpdata :", criticUpdata)
   const data = { ...criticUpdata} // create response object
  res.json({ data }); // send response
}

async function destroy(req, res, next) {
  const { review } = res.locals;
  await reviewsService.delete(review.review_id);
  res.sendStatus(204);
}

module.exports = {
  listReviews: [asyncErrorBoundary(listReviews)],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
};
