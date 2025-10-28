import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
});

const examPaperSchema = new mongoose.Schema(
  {
    subject: { type: String, required: true },
    questions: [questionSchema],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const ExamPaper = mongoose.model("ExamPaper", examPaperSchema);
export default ExamPaper;
