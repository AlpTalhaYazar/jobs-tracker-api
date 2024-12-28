import { StatusCodes } from "http-status-codes";
import { Job } from "../models/Job.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { JobCreateDto, JobUpdateDto } from "../dto/job.dto.js";
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
  const updateModel = new JobUpdateDto(
    req.body.company,
    req.body.position,
    req.body.status
  );

  const job = await Job.findById(req.params.id);

  if (!job) {
    const operationResult = await OperationResult.Failure(
      StatusCodes.NOT_FOUND,
      "Job not found"
    );

    const apiResponse = await ApiResponse.ToApiResponse(operationResult);

    res.status(StatusCodes.NOT_FOUND).json(apiResponse);
  }

  if (job.createdBy !== req.user._id) {
    const operationResult = await OperationResult.Failure(
      StatusCodes.UNAUTHORIZED,
      "You are not authorized to update this job"
    );

    const apiResponse = await ApiResponse.ToApiResponse(operationResult);

    res.status(StatusCodes.UNAUTHORIZED).json(apiResponse);
  }

  job.company =
    updateModel?.company?.trim()?.length > 0
      ? updateModel.company
      : job.company;
  job.position =
    updateModel?.position?.trim()?.length > 0
      ? updateModel.position
      : job.position;
  job.status =
    updateModel?.status?.trim()?.length > 0 ? updateModel.status : job.status;

  const operationResult = await OperationResult.Success(job);

  const apiResponse = await ApiResponse.ToApiResponse(operationResult);

  res.status(StatusCodes.OK).json(apiResponse);
};

const deleteJob = async (req, res) => {
  const job = await Job.findByIdAndDelete(req.params.id);

  if (!job) {
    const operationResult = await OperationResult.Failure(
      StatusCodes.NOT_FOUND,
      "Job not found"
    );

    const apiResponse = await ApiResponse.ToApiResponse(operationResult);

    res.status(StatusCodes.NOT_FOUND).json(apiResponse);
  }

  if (job.createdBy !== req.user._id) {
    const operationResult = await OperationResult.Failure(
      StatusCodes.UNAUTHORIZED,
      "You are not authorized to delete this job"
    );

    const apiResponse = await ApiResponse.ToApiResponse(operationResult);

    res.status(StatusCodes.UNAUTHORIZED).json(apiResponse);
  }

  await job.remove();

  const operationResult = await OperationResult.Success(job);

  const apiResponse = await ApiResponse.ToApiResponse(operationResult);

  res.status(StatusCodes.OK).json(apiResponse);
};

export { getAllJobs, getMyJobs, getJobById, createJob, updateJob, deleteJob };
