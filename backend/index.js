const express = require("express");
const server = express();

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const routesUser = require("./routes/userRoute.js");
routesUser(server);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Recycle Project Express API with Swagger",
      version: "0.1.0",
      description:
        "This Recycle Project APIs application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Andrea Rettaroli",
        url: "",
        email: "rettaroli.andrea2597@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
server.use("/", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

server.listen(3000, () => {
  console.log("Listening on http://localhost:3000/");
});