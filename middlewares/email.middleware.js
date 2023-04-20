const transporter = require("../helpers/notifactions/gmail/config.js");
const gmailOptions = require("../helpers/notifactions/gmail/emailSender.js");
const emailNewUser = require("../helpers/notifactions/templates/newUserEmail.js");
const remAppointment = require("../helpers/notifactions/templates/reminderAppointment.js");
const appointmentAcept = require("../helpers/notifactions/templates/alertNotificaction.js");
const { getReminderAppointments } = require("../services/appointments.services.js");

/**
 * Middleware para el envío de mails a usuarios nuevos.
 * @param {String} email email de usario nuevo
 * @param {String} userName nombre del usuario nuevo
 * @param {String} lastName apellido del usuario nuevo
 *
 * @example
 * await sendNewUser(email, firstName, lastName)
 */

async function sendNewUser(
  email,
  userName,
  lastName,
  verificationToken,
  origin
) {
  try {
    const htmlTemplate = emailNewUser(
      userName,
      lastName,
      email,
      verificationToken,
      origin
    );
    const emailSubject = "Cuenta Nueva";
    await transporter.sendMail(gmailOptions(email, emailSubject, htmlTemplate));
  } catch (err) {
    console.log("Error al leer el archivo HTML: ", err);
  }
}

// Función para enviar alertas de correo electrónico
async function enviarAlertas() {
  try {

    const citas = await getReminderAppointments();

    if( citas ) {
      citas.forEach(async (cita) => {
        const { appClient, appointmentDate, appointmentHour, turno } = cita;
        const { email, firstName, lastName } = appClient;

        const emailSubject = `Recordatorio turno para ${turno.name}`;

        const htmlTemplate = remAppointment(firstName, lastName, turno.name, appointmentDate, appointmentHour)
        try {
          const info = await transporter.sendMail(gmailOptions(email, emailSubject, htmlTemplate));
          console.log(`Correo electrónico enviado a ${email}: ${info.messageId}`);
        } catch (error) {
          console.error(`Error al enviar el correo electrónico a ${email}: ${error}`);
        }
      });
    }

    return;
  } catch (error) {
    console.error(error);
  }
}

async function sendValidatorAppointment(
  email,
  userName,
  date,
  hour,
  serviceName
) {
  try {
    const htmlTemplate = appointmentAcept(
      userName,
      date,
      hour,
      serviceName
    );
    const emailSubject = "Nuevo Servicio Registrado";
    await transporter.sendMail(gmailOptions(email, emailSubject, htmlTemplate));
  } catch (err) {
    console.log("Error al leer el archivo HTML: ", err);
  }
}

module.exports = { sendNewUser, enviarAlertas, sendValidatorAppointment };
