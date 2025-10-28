import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  optionText: { type: String, required: true },
});

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [optionSchema],
  correctAnswer: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return this.options.some((opt) => opt.optionText === value);
      },
      message: "Correct answer must match one of the provided options.",
    },
  },
});

const examPaperSchema = new mongoose.Schema(
  {
    examTitle: { type: String, default: "Untitled Exam" },
    subject: { type: String, required: true },
    className: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
    questions: [questionSchema],
  },
  { timestamps: true }
);

export default mongoose.model("ExamPaper", examPaperSchema);
