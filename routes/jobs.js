import express from "express";
import { validate } from "../validation/validation.js";
import { jobCreateDtoSchema } from "../validation/job/validationSchemas.js";
import {
  getAllJobs,
  getMyJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
} from "../controllers/jobs.js";

const router = express.Router();

router.route("/").get(getAllJobs).post(validate(jobCreateDtoSchema), createJob);
router.route("/my-jobs").get(getMyJobs);
router.route("/:id").get(getJobById).patch(updateJob).delete(deleteJob);

export { router as jobRoutes };
