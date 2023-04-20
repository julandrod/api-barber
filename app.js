const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const db = require("./database/models");
const routes = require("./routes");
const { enviarAlertas } = require("./middlewares/email.middleware");


//Documentacion con swagger
const { swaggerDocs: V1SwaggerDocs } = require("./swagger.js");

const expressListEndpoints = require("express-list-endpoints");

const { notFoundMiddleware, errorMiddleware } = require("./middlewares");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(morgan("dev", { skip: (req, res) => process.env.NODE_ENV === "test" }));

app.get("/", (req, res) => {
  res.send("Backend Barberia");
});
app.use("/api/v1", routes);

//Documentacion con swagger
V1SwaggerDocs(app, port);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const startApi = async () => {
  console.log("Testing the database connection...");
  try {
    await db.sequelize.authenticate();
    console.log("Database authentication successfully");
    await db.sequelize.sync({ alter: true, logging: false });
    console.log("Database synchronized");
    if (process.env.NODE_ENV !== "test") {
      app.listen(port, () => console.log(`Server start on port ${port}`));
    }
  } catch (error) {
    console.log("Unable to connect to the database \n", error);
  }
};

// // Programar el envío de alertas de correo electrónico una vez cada hora
setInterval(enviarAlertas, 60 * 60 * 1000);

// // Programar el envío de alertas de correo electrónico una vez cada 30 segundos
//setInterval(enviarAlertas, 30 * 1000);

// console.log(expressListEndpoints(app));

startApi();
