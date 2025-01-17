import "dotenv/config";
import "express-async-errors";
import express from "express";
import { connectDB } from "./db/connect.js";
import { authRoutes } from "./routes/auth.js";
import { jobRoutes } from "./routes/jobs.js";
import { notFoundMiddleware } from "./middleware/not-found.js";
import { errorHandlerMiddleware } from "./middleware/error-handler.js";

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jobs", jobRoutes);

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
