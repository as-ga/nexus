/** @format */
import winston from "winston";
import dotenv from "dotenv";

dotenv.config();

const isProduction: boolean = process.env.NODE_ENV === "production";
export const logger = winston.createLogger({
  level: isProduction ? "info" : "debug",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    // In production, also log to files
    ...(isProduction
      ? [
          new winston.transports.File({
            filename: "error.log",
            level: "error",
          }),
          new winston.transports.File({ filename: "combined.log" }),
        ]
      : []),
  ],
});
