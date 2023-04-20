const { Op } = require("sequelize");
const { User, appointments, reviews } = require("../database/models");
const { CustomError } = require("../helpers");

// DRY convertir esto en una funcion mas global

const findBarber = async (barberId) => {
  try {
    const barber = await User.findOne({
      where: { [Op.and]: [{ id: barberId }, { role: "barber" }] },
    });
    if (!barber) {
      throw new CustomError("No se encontro ningun barbero con este id", 404);
    }
    return barber;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const createReview = async (barberId, title, rating, comment, reqUser) => {
  try {
    await findBarber(barberId);

    if (reqUser.id === barberId) {
      throw new CustomError(
        "El usuario no puede dejarse reseñas a si mismo",
        400
      );
    }

    const appointment = await appointments.findOne({
      where: {
        [Op.and]: [{ clientId: reqUser.id, barberId }],
      },
    });
    if (!appointment) {
      throw new CustomError("No se puede realizar esta accion", 401);
    }

    const [response, created] = await reviews.findOrCreate({
      where: { [Op.and]: [{ clientId: reqUser.id }, { barberId }] },
      defaults: {
        title,
        rating,
        comment,
        clientId: reqUser.id,
        barberId,
      },
    });
    if (!created) {
      throw new CustomError("No puede dejar mas reviews a este barbero", 400);
    }

    return response;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const findReviewsBarber = async (barberId) => {
  try {
    const barber = await findBarber(barberId);
    const reviews = await barber.getReviews({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    const ratingAverage =
      reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;

    return [reviews, ratingAverage];
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const findReviewById = async (reviewId) => {
  try {
    const review = await reviews.findOne({ where: { id: reviewId } });
    if (!review) {
      throw new CustomError("No se encontro ninguna review con ese Id", 404);
    }

    return review;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const deleteReviewById = async (reviewId) => {
  try {
    const review = await reviews.findOne({ where: { id: reviewId } });
    if (!review) {
      throw new CustomError("No se encontro ninguna review con ese Id", 404);
    }
    await review.destroy();

    return `Review ${reviewId} eliminada de manera exitosa`;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

module.exports = {
  createReview,
  findReviewsBarber,
  findReviewById,
  deleteReviewById,
};
