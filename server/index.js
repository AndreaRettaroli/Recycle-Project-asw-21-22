const io = require("socket.io");
const { socketHandler } = require("./middleware/socket");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

const mongoose = require("mongoose");
const mongoHost = "127.0.0.1"; // MONGO_HOST in env ? env.MONGO_HOST : "127.0.0.1";
const mongoPort = 27017; // MONGO_PORT in env ? env.MONGO_PORT : 27017;
const mongoConnection = `mongodb://${mongoHost}:${mongoPort}/recycle-database`;

mongoose
  .connect(mongoConnection)
  .then(() => console.log("Connected to MongoDB."))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const express = require("express");
const server = express();
server.use(cors());
server.use(express.json());
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const userRoutes = require("./routes/userRoute");
const basketRoutes = require("./routes/basketRoute");
const acquisitionRoutes = require("./routes/acquisitionRoute");
const priceRoutes = require("./routes/priceRoute");
const withdrawalRoutes = require("./routes/withdrawalRoute");
const authRoutes = require("./routes/authRoute");

authRoutes(server);
userRoutes(server);
basketRoutes(server);
acquisitionRoutes(server);
priceRoutes(server);
withdrawalRoutes(server);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Recycle Project Express API with Swagger",
      version: "0.1.0",
      description:
        "This Recycle Project APIs application made with Express and documented with Swagger",
      contact: {
        name: "Andrea Rettaroli",
        url: "",
        email: "rettaroli.andrea2597@gmail.com",
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
server.use("/", swaggerUi.serve, swaggerUi.setup(specs));
server.use(
  cors({
    origin: "*",
  })
);
const httpServer = server.listen(process.env.PORT, () => {
  console.log(`Listening on http://localhost:${process.env.PORT}`);
});

const socket = io(httpServer, {
  cors: {
    origin: "*",
  },
});
socketHandler(socket);

module.exports = server;
