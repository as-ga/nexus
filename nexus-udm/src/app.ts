import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import dotenv from "dotenv";
import hpp from "hpp";
import http from "http";
import { logger } from "./utils/logger";
import cookieParser from "cookie-parser";
// Load environment variables from a .env file
dotenv.config();

const app: Application = express();

const stream = {
  write: (message: string) => logger.info(message.trim()),
};

// Apply a rate limiter to API
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again after 15 minutes.",
});
//  middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(morgan("combined", { stream }));
app.use(hpp());
app.use(cookieParser());
app.use("/api", apiLimiter); // Apply limiter only to API routes

app.get("/", (_, res: Response) =>
  res.status(200).json({ message: "Welcome to the Nexus UDM Service" })
);

// Import routes and mount
import vendorroute from "./routes/vendor.route";
app.use("/api/v1/", vendorroute);

const server = http.createServer(app);

export { server, app };
