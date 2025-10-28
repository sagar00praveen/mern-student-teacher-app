import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  examId: { type: mongoose.Schema.Types.ObjectId, ref: "Exam" },
  subject: String,
  answers: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
      selectedOption: String,
      isCorrect: Boolean,
    },
  ],
  score: Number,
  submittedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Result", resultSchema);
