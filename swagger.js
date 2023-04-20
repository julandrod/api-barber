const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "The Boss Barbershop API",
      description: "API para la gestion de turnos de una barberia.",
      version: "1.0.0",
    },
  },
  apis: ["./documentation/*.yaml", "./documentation/paths/*.yaml", "./documentation/schemas/*.yaml"]
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Function to setup our docs
const swaggerDocs = (app, port) => {
  // Route-Handler to visit our docs
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // Make our docs in JSON format available
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  console.log(`Version 1 Docs are available on http://localhost:${port}/docs`);
};

module.exports = { swaggerDocs };
