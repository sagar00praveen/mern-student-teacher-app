import mongoose from "mongoose";


const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rollNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    className: { type: String, required: true },
    age: Number,
    exams: [
      {
        examId: { type: mongoose.Schema.Types.ObjectId, ref: "ExamPaper" },
        subject: String,
        status: { type: String, default: "pending" }, // "pending", "completed"
        score: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);


export default mongoose.model("Student", studentSchema);
