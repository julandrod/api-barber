const { tryCatchWrapper, endPointResponse } = require("../helpers");
const reviewServices = require("../services/reviews.services");

const postReview = tryCatchWrapper(async (req, res, next) => {
  const { barberId } = req.params;
  const { title, rating, comment } = req.body;
  const response = await reviewServices.createReview(
    barberId,
    title,
    rating,
    comment,
    req.user
  );

  endPointResponse({
    res,
    code: 201,
    message: "Reseña creada de manera exitosa",
    body: response,
  });
});

const getReviewsBarber = tryCatchWrapper(async (req, res, next) => {
  const { barberId } = req.params;
  const [reviews, ratingAverage] = await reviewServices.findReviewsBarber(
    barberId
  );

  endPointResponse({
    res,
    message: "Reviews listadas de manera exitosa",
    body: { reviews, ratingAverage },
  });
});

const getSingleReview = tryCatchWrapper(async (req, res, next) => {
  const { reviewId } = req.params;
  const review = await reviewServices.findReviewById(reviewId);

  endPointResponse({
    res,
    message: "Reseña listada de manera exitosa",
    body: review,
  });
});

const deleteSingleReview = tryCatchWrapper(async (req, res, next) => {
  const { reviewId } = req.params;
  const response = await reviewServices.deleteReviewById(reviewId);

  endPointResponse({ res, message: response });
});

module.exports = {
  postReview,
  getReviewsBarber,
  getSingleReview,
  deleteSingleReview,
};
