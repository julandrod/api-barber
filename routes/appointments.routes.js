const router = require("express").Router();
const apptCtrls = require("../controllers/appointments.controllers");
const { authenticateUser } = require("../middlewares/auth.middleware");

router
  .route("/myAppointments")
  .get(authenticateUser, apptCtrls.getMyAppointments);

router.patch(
  "/cancel/:appointmentId",
  authenticateUser,
  apptCtrls.cancelAppointment
);

router
  .route("/barber/:barberId")
  .post(authenticateUser, apptCtrls.postAppointment)
  .get(apptCtrls.getAppointmentsByBarber);

router.get(
  "/client/:clientId",
  authenticateUser,
  apptCtrls.getAppointmentsByClient
);

router
  .route("/:appointmentId")
  .patch(authenticateUser, apptCtrls.patchAppointment);

module.exports = router;
