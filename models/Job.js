import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company is required"],
      trim: true,
      minLength: [3, "Company must be at least 3 characters"],
      maxLength: [50, "Company must be less than 50 characters"],
    },
    position: {
      type: String,
      required: [true, "Position is required"],
      trim: true,
      minLength: [3, "Position must be at least 3 characters"],
      maxLength: [100, "Position must be less than 100 characters"],
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "CreatedBy is required"],
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "UpdatedBy is required"],
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

export { Job };
