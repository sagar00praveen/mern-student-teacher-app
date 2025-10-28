// models/teacherModel.js
import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rollNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String },
    subject: { type: String },
    role: { type: String, default: "teacher" },
  },
  { timestamps: true }
);

export default mongoose.model("Teacher", teacherSchema);
