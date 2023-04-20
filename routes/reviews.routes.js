const router = require("express").Router();
const reviewCtrls = require("../controllers/reviews.controllers");
const { authenticateUser, authorizeByRole } = require("../middlewares");

router.post("/:barberId", authenticateUser, reviewCtrls.postReview);

router.get("/:barberId", reviewCtrls.getReviewsBarber);

router.get("/review/:reviewId", reviewCtrls.getSingleReview);

router.delete(
  "/review/:reviewId",
  [authenticateUser, authorizeByRole("admin")],
  reviewCtrls.deleteSingleReview
);

module.exports = router;
