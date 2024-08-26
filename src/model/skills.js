import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    domain: {
      type: String,
      required: true,
      trim: true,
    },
    skills: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

const Skill = mongoose.models.Skill || mongoose.model("Skill", resumeSchema);

export default Skill;
