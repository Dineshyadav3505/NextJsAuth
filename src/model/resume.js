import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    resumeImage: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Resume = mongoose.models.Resume || mongoose.model("Resume", resumeSchema);

export default Resume;
