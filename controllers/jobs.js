import { StatusCodes } from "http-status-codes";
import { Job } from "../models/Job.js";
import { ApiResponse, PaginatedApiResponse } from "../utils/ApiResponse.js";
import { JobCreateDto, JobUpdateDto } from "../dto/job.dto.js";
import {
  OperationResult,
  PaginatedOperationResult,
  PaginationMetaData,
} from "../utils/OperationResult.js";
import { ErrorCode } from "../utils/ErrorCode.js";

const getAllJobs = async (req, res) => {
  var page = parseInt(req.query.page) || 1;
  var pageSize = parseInt(req.query.pageSize) || 10;
  var skip = (page - 1) * pageSize;
  var limit = pageSize;

  const results = await Job.aggregate([
    {
      $facet: {
        jobs: [
          { $sort: { createdAt: -1 } },
          { $skip: skip },
          { $limit: limit },
        ],
        total: [{ $count: "count" }],
      },
    },
    {
      $project: {
        jobs: 1,
        total: { $arrayElemAt: ["$total.count", 0] },
      },
    },
  ]);

  const jobs = results[0].jobs;
  const total = results[0].total;

  const paginatedOperationResult = await PaginatedOperationResult.Success(
    jobs,
    new PaginationMetaData(page, pageSize, total)
  );

  const apiResponse = await PaginatedApiResponse.ToApiResponse(
    paginatedOperationResult
  );

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

  if (!job) {
    const operationResult = await OperationResult.Failure(
      ErrorCode.EntityNotFound,
      "Job not found"
    );

    const apiResponse = await ApiResponse.ToApiResponse(operationResult);

    res.status(StatusCodes.NOT_FOUND).json(apiResponse);
  }

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
      ErrorCode.EntityNotFound,
      "Job not found"
    );

    const apiResponse = await ApiResponse.ToApiResponse(operationResult);

    res.status(StatusCodes.NOT_FOUND).json(apiResponse);
  }

  if (job.createdBy !== req.user._id) {
    const operationResult = await OperationResult.Failure(
      ErrorCode.Unauthorized,
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
      ErrorCode.EntityNotFound,
      "Job not found"
    );

    const apiResponse = await ApiResponse.ToApiResponse(operationResult);

    res.status(StatusCodes.NOT_FOUND).json(apiResponse);
  }

  if (job.createdBy !== req.user._id) {
    const operationResult = await OperationResult.Failure(
      ErrorCode.Unauthorized,
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
