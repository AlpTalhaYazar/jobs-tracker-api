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
    createdAt: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "CreatedBy is required"],
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "UpdatedBy is required"],
    },
  },
  { timestamps: true }
);

jobSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Job = mongoose.model("Job", jobSchema);

export { Job };
