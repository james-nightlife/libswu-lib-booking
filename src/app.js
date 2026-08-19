import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";

import { corsOptions } from "./config/corsConfig.js";
import errorHandler from "./middlewares/errorHandler.js";

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import validateRoutes from "./routes/validateRoutes.js";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use("/user/", userRoutes);
app.use("/auth/", authRoutes);
app.use('/validate', validateRoutes);
app.use(errorHandler);

export default app;
