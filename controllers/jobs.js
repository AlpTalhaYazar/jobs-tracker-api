import { StatusCodes } from "http-status-codes";
import { Job } from "../models/Job.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { JobCreateDto } from "../dto/job.dto.js";
import { OperationResult } from "../utils/OperationResult.js";

const getAllJobs = async (req, res) => {
  const jobs = await Job.find();

  const operationResult = await OperationResult.Success(jobs);

  const apiResponse = await ApiResponse.ToApiResponse(operationResult);

  res.status(StatusCodes.OK).json(apiResponse);
};

const getMyJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user._id });

  const operationResult = await OperationResult.Success(jobs);

  const apiResponse = await ApiResponse.ToApiResponse(operationResult);

  res.status(StatusCodes.OK).json(apiResponse);
};

const getJobById = async (req, res) => {
  const job = await Job.findById(req.params.id);

  const operationResult = await OperationResult.Success(job);

  const apiResponse = await ApiResponse.ToApiResponse(operationResult);

  res.status(StatusCodes.OK).json(apiResponse);
};

const createJob = async (req, res) => {
  const jobCreateDto = new JobCreateDto(req.body.company, req.body.position);

  const job = await Job.create({
    ...jobCreateDto,
    status: "pending",
    createdBy: req.user._id,
    updatedBy: req.user._id,
  });

  const operationResult = await OperationResult.Success(job);

  const apiResponse = await ApiResponse.ToApiResponse(operationResult);

  res.status(StatusCodes.CREATED).json(apiResponse);
};

const updateJob = async (req, res) => {
  res.send("Update Job ${req.params.id}");
};

const deleteJob = async (req, res) => {
  res.send("Delete Job ${req.params.id}");
};

export { getAllJobs, getMyJobs, getJobById, createJob, updateJob, deleteJob };
