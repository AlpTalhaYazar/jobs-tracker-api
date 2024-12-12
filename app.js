import "dotenv/config";
import "express-async-errors";
import express from "express";
import { authRoutes } from "./routes/auth.js";
import { jobRoutes } from "./routes/jobs.js";
import { notFoundMiddleware } from "./middleware/not-found.js";
import { errorHandlerMiddleware } from "./middleware/error-handler.js";

const app = express();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jobs", jobRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("jobs api");
});

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
