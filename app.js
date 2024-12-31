import "dotenv/config";
import "express-async-errors";
import xss from "xss-clean";
import cors from "cors";
import helmet from "helmet";
import express from "express";
import rateLimiter from "express-rate-limit";

import { connectDB } from "./db/connect.js";
import { jobRoutes } from "./routes/jobs.js";
import { ErrorCode } from "./utils/ErrorCode.js";
import { authRoutes } from "./routes/auth.js";
import { ApiResponse } from "./utils/ApiResponse.js";
import { OperationResult } from "./utils/OperationResult.js";
import { notFoundMiddleware } from "./middleware/not-found.js";
import { errorHandlerMiddleware } from "./middleware/error-handler.js";
import { authenticationMiddleware } from "./middleware/authentication.js";

const app = express();

app.use(
  rateLimiter({
    windowMs: 60 * 1000,
    max: 10,
    message: await ApiResponse.ToApiResponse(
      await OperationResult.Failure(
        ErrorCode.ServiceUnavailable,
        "Too many requests"
      )
    ),
  })
);
app.use(express.json());
app.use(helmet());
app.use(xss());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jobs", authenticationMiddleware, jobRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// routes
app.get("/", (req, res) => {
  res.send("jobs api");
});

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
      .then(() => console.log("Connected to the database"))
      .catch((error) => console.error(error));

    app.listen(port, console.log(`Server is running on port ${port}`));
  } catch (error) {
    console.error(error);
  }
};

start();
