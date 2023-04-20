const { Op } = require("sequelize");
const { User, appointments, ServicesBarber } = require("../database/models");
const { CustomError, checkPermissions, createJwt } = require("../helpers");
const { findBarber } = require("./appointments.services");

const findAllUsers = async (roleUser) => {
  try {
    const users = await User.findAndCountAll({
      where: { role: roleUser },
      attributes: { exclude: ["password"] },
    });

    return users;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const updateUser = async (id, newInfo, reqUser) => {
  try {
    const user = await User.findOne({ where: { id } });

    if (!user) {
      throw new CustomError("Usuario no encontrado", 404);
    }

    checkPermissions(reqUser, user.id);

    const { firstName, lastName, email, phone, profileImage, description } =
      newInfo;
    let emailInUse, phoneInUse;

    if (email) {
      emailInUse = await User.findOne({
        where: { email },
      });
    }
    if (phone) {
      phoneInUse = await User.findOne({
        where: { phone },
      });
    }
    if (emailInUse || phoneInUse) {
      throw new CustomError(
        `Este ${emailInUse ? "email" : "telefono"} ya se encuentra registrado`,
        400
      );
    }

    await user.update({
      firstName,
      lastName,
      email,
      phone,
      profileImage,
      attributes: { exclude: ["password"] },
      description: reqUser?.role === "barber" ? description : "",
    });
    await user.save();
    const payload = { id: user.id, role: user.role };
    const token = createJwt({ payload });
    const { password, ...newUserInfo } = user.dataValues;

    return { user: newUserInfo, token };
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const updateUserRole = async (id, role) => {
  try {
    const user = await User.findOne({ where: { id } });

    if (!user) {
      throw new CustomError("Usuario no encontrado", 404);
    }

    await user.update({ role });
    await user.save();
    const payload = { id: user.id, role: user.role };
    const token = createJwt({ payload });
    const { password, ...newUserInfo } = user.dataValues;

    return { user: newUserInfo, token };
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const analyticsBarber = async (barberId, startDate, endDate) => {
  try {
    const barber = await findBarber(barberId);
    const infoBarber = await appointments.findAll({
      where: {
        [Op.and]: [
          { barberId },
          { status: "done" },
          { appointmentDate: { [Op.gte]: startDate } },
          { appointmentDate: { [Op.lte]: endDate } },
        ],
      },
      include: {
        model: ServicesBarber,
        attributes: {
          exclude: ["id", "createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    const allServices = infoBarber.map((item) => item.ServicesBarber);

    const servicesAnalytics = Object.values(
      allServices.reduce((result, service) => {
        if (!result[service.name]) {
          result[service.name] = {
            name: service.name,
            singleCost: service.cost,
            totalCost: service.cost,
            quantity: 1,
            singleTotalBarber: service.cost / 2,
            totalBarber: service.cost / 2,
          };
        } else {
          result[service.name].quantity++;
          result[service.name].totalCost += service.cost;
          result[service.name].totalBarber += service.cost / 2;
        }
        return result;
      }, {})
    );

    const paymentBarber = servicesAnalytics.reduce(
      (acc, curr) => acc + curr.totalBarber,
      0
    );

    return {
      barberInfo: {
        id: barber.id,
        firstName: barber.firstName,
        lastName: barber.lastName,
        profileImage: barber.profileImage,
        email: barber.email,
        phone: barber.phone,
      },
      servicesAnalytics,
      paymentBarber,
    };
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

module.exports = { findAllUsers, updateUser, updateUserRole, analyticsBarber };
