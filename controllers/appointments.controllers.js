const { tryCatchWrapper, endPointResponse } = require("../helpers");
const apptServices = require("../services/appointments.services");
const sBarberServices = require("../services/servicesBarber.services");
const { sendValidatorAppointment } = require("../middlewares/email.middleware.js");
const { User } = require("../database/models");

const postAppointment = tryCatchWrapper(async (req, res, next) => {
  const { barberId } = req.params;
  const { date, hour, servicesId, message } = req.body;
  const serviceBarber = await sBarberServices.findSingleServiceBarber(
    servicesId
  );
  const newAppointment = await apptServices.createAppointment(
    barberId,
    date,
    hour,
    servicesId,
    message,
    req.user.id
  );
    
  const userId = req.user.id;
  const user = await User.findByPk(userId, {
    attributes: { exclude: ["password"] },
  });

  const { email, firstName } = user
  const { name } = serviceBarber
  await sendValidatorAppointment( email, firstName, date, hour, name )

  endPointResponse({
    res,
    code: 201,
    message: "Turno creado",
    body: { newAppointment, serviceBarber },
  });
});

const getAppointmentsByBarber = tryCatchWrapper(async (req, res, next) => {
  const { barberId } = req.params;
  const appointments = await apptServices.findBarberAppointments(barberId);

  endPointResponse({
    res,
    message: "turnos asignados por barbero",
    body: appointments,
  });
});

const getAppointmentsByClient = tryCatchWrapper(async (req, res, next) => {
  const { clientId } = req.params;
  const appointments = await apptServices.findClientAppointments(clientId);

  endPointResponse({
    res,
    message: "turnos asignados por cliente",
    body: appointments,
  });
});

const patchAppointment = tryCatchWrapper(async (req, res, next) => {
  const { appointmentId } = req.params;
  const { newDate, newHour, status } = req.body;
  const response = await apptServices.updateAppointment(
    appointmentId,
    newDate,
    newHour
  );
  endPointResponse({
    res,
    message: "Turno actualizado de manera exitosa",
    body: response,
  });
});

const getMyAppointments = tryCatchWrapper(async (req, res, next) => {
  const clientId = req.user.id;
  const response = await apptServices.findMyAppointments(clientId);

  endPointResponse({ res, message: "turnos asignados", body: response });
});

const cancelAppointment = tryCatchWrapper(async (req, res, next) => {
  const { appointmentId } = req.params;
  const cancelAppointment = await apptServices.findAndCancelAppointment(
    appointmentId
  );

  endPointResponse({
    res,
    message: "Turno cancelado de manera exitosa",
    body: cancelAppointment,
  });
});

module.exports = {
  postAppointment,
  getAppointmentsByBarber,
  getAppointmentsByClient,
  getMyAppointments,
  patchAppointment,
  cancelAppointment,
};
