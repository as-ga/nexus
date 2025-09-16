import { server } from "./app";
import dbConnect from "./db/index";

import dotenv from "dotenv";
import { logger } from "./utils/logger";
import { generateAndSaveData } from "./TestData";
dotenv.config({
  path: process.env.NODE_ENV === "production" ? ".env" : ".env.development",
});
const PORT: number = parseInt(process.env.PORT || "8080", 10);
const isProduction: boolean = process.env.NODE_ENV === "production";
const majorNodeVersion = +process.version.split(".")[0] || 0;
const gracefulShutdown = (signal: string) => {
  process.on(signal, () => {
    logger.warn(`${signal} signal received: closing HTTP server.`);
    server.close(() => {
      logger.info("HTTP server closed.");
      process.exit(0);
    });
  });
};

// Listen for termination signals
gracefulShutdown("SIGTERM");
gracefulShutdown("SIGINT");

// Handle critical process errors
process.on("unhandledRejection", (reason: Error) => {
  logger.error("Unhandled Rejection at:", reason.stack || reason);
  // It's recommended to restart the process after such an error
  server.close(() => process.exit(1));
});

process.on("uncaughtException", (err: Error) => {
  logger.error("Uncaught Exception thrown:", err.stack || err);
  // It's recommended to restart the process after such an error
  server.close(() => process.exit(1));
});
const startServer = () => {
  server.listen(PORT, () => {
    logger.info(
      `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
    );
  });
};

if (majorNodeVersion >= 14) {
  (async () => {
    try {
      // First, connect to the database
      await dbConnect();
      logger.info("Database connected successfully.");
      // await generateAndSaveData(); // Uncomment if you want to generate test data on startup if your node version is 14 or above
      startServer();
    } catch (err) {
      logger.error("Failed to initialize the server:", err);
    }
  })();
} else {
  dbConnect()
    .then(() => {
      logger.info("Database connected successfully.");
      // return generateAndSaveData(); // Uncomment if you want to generate test data on startup if your node version is less than 14
    })
    .then(() => {
      startServer();
    })
    .catch((err) => {
      logger.error("Failed to initialize the server:", err);
    });
}
