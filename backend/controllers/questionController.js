import ExamPaper from "../models/questionModel.js";
import Student from "../models/studentModel.js";

export const createExamPaper = async (req, res) => {
  const { subject, questions, className } = req.body; // className: which class the exam is for

  try {
    if (!subject || !questions || questions.length !== 10 || !className) {
      return res.status(400).json({ message: "Provide subject, class, and exactly 10 questions" });
    }

    const examPaper = new ExamPaper({
      subject,
      questions
    });

    await examPaper.save();

    // Add exam reference to all students in that class
    await Student.updateMany(
      { class: className },
      {
        $push: {
          exams: {
            examId: examPaper._id,
            subject: examPaper.subject,
            status: "pending",
            score: 0
          }
        }
      }
    );

    res.status(201).json({
      message: "Exam paper created and assigned to students",
      examPaper
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
