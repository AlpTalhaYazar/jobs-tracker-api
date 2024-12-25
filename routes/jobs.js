import express from "express";
import {
  getAllJobs,
  getMyJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
} from "../controllers/jobs.js";

const router = express.Router();

router.route("/").get(getAllJobs).post(createJob);
router.route("/:id").get(getJobById).patch(updateJob).delete(deleteJob);

router.route("/my-jobs").get(getMyJobs);

export { router as jobRoutes };
