const { CustomError, checkPermissions } = require("../helpers");
const { User, appointments, ServicesBarber } = require("../database/models");
const { Op } = require("sequelize");

const findBarber = async (barberId) => {
  try {
    const barber = await User.findOne({
      where: {
        [Op.and]: [{ id: barberId }, { role: "barber" }],
      },
    });
    if (!barber) {
      throw new CustomError("No se encontro ningun barbero con ese Id", 404);
    }
    return barber;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const findClient = async (clientId) => {
  try {
    const client = await User.findOne({
      where: {
        [Op.and]: [{ id: clientId }, { role: "client" }],
      },
    });
    if (!client) {
      throw new CustomError("No se encontró ningún cliente con ese Id", 404);
    }
    return client;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const findAppointment = async (appointmentId) => {
  try {
    const appointment = await appointments.findOne({
      where: { id: appointmentId },
      include: {
        model: ServicesBarber,
        attributes: ["name", "cost"],
      },
    });
    if (!appointment) {
      throw new CustomError("No se encontro ningun turno con este Id", 404);
    }
    return appointment;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const createAppointment = async (
  barberId,
  date,
  hour,
  servicesId,
  message,
  clientId
) => {
  try {
    const barber = await findBarber(barberId);

    const [response, created] = await appointments.findOrCreate({
      where: {
        [Op.and]: [
          { appointmentDate: date },
          { appointmentHour: hour },
          { taken: true },
        ],
      },
      defaults: {
        appointmentDate: date,
        appointmentHour: hour,
        servicesId,
        message,
        status: "pending",
        taken: true,
        clientId,
        barberId: barber.id,
      },
    });
    if (!created) {
      throw new CustomError("Este turno ya se encuentra asignado", 400);
    }

    return response;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const findBarberAppointments = async (barberId) => {
  try {
    await findBarber(barberId);

    const response = await appointments.findAll({
      where: { barberId },
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

    return response;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const findClientAppointments = async (clientId) => {
  try {
    await findClient(clientId);

    const response = await appointments.findAll({
      where: { clientId },
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

    return response;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const findMyAppointments = async (clientId) => {
  try {
    const client = await findClient(clientId);
    const appointments = await client.getAppointments({
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
    return appointments;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const updateAppointment = async (appointmentId, newDate, newHour) => {
  try {
    const appointment = await findAppointment(appointmentId);
    const exists = await appointments.findOne({
      where: {
        [Op.and]: [
          { appointmentDate: newDate },
          { appointmentHour: newHour },
          { taken: true },
        ],
      },
    });
    if (exists) {
      throw new CustomError("Este turno ya se encuentra asignado", 400);
    }

    await appointment.update({
      appointmentDate: newDate,
      appointmentHour: newHour,
    });
    await appointment.save();

    return appointment;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const findAndCancelAppointment = async (appointmentId) => {
  try {
    const appointment = await findAppointment(appointmentId);
    await appointment.update({ status: "cancel", taken: "false" });
    await appointment.save();

    return appointment;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const getReminderAppointments = async () => {
  try {
    const now = new Date();
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
    const nowStr = now.toISOString().substring(11, 16);
    const oneHourLaterStr = oneHourLater.toISOString().substring(11, 16);
    // console.log("Hora ahora ", nowStr, " Hora + 1", oneHourLaterStr)
    const reminderAppointments = await appointments.findAll({
      where: {
        [Op.and]: [
          { appointmentDate: now },
          { appointmentHour: { [Op.between]: [nowStr, oneHourLaterStr]}}
        ]
      },
      include: [
        {
          model: ServicesBarber, as: "turno",
          attributes: {
            exclude: ["id", "createdAt", "updatedAt"],
          },
        },
        {
          model: User,
          as: "appBarber",
          attributes: {
            exclude: ["id","profileImage", "password", "description", "verificationToken", "verified", "createdAt", "updatedAt"]
          },
        },
        { 
          model: User,
          as: "appClient",
          attributes: {
            exclude: ["id","profileImage", "password", "description", "verificationToken", "verified", "createdAt", "updatedAt"]
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    // console.log("getreminder", reminderAppointments)
    
    return reminderAppointments;

  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
}

module.exports = {
  createAppointment,
  findBarberAppointments,
  findClientAppointments,
  updateAppointment,
  findMyAppointments,
  findAndCancelAppointment,
  findBarber,
  getReminderAppointments,
};
