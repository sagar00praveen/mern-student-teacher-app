import Student from "../models/studentModel.js";
import ExamPaper from "../models/questionModel.js";

import generateToken from "../utils/generateToken.js";
import argon2 from "argon2";


export const loginStudent = async (req, res) => {
  try {
    const { rollNumber, password } = req.body;
    const student = await Student.findOne({ rollNumber });

    if (!student) return res.status(400).json({ message: "student not found" });

    const isMatch = await argon2.verify(student.password,password);
    if (!isMatch) return res.status(400).json({ message: "worng password" });
    console.log("Received login:", req.body);


    res.json({
      _id: student._id,
      name: student.name,
      rollNumber: student.rollNumber,
      className: student.className,
      token: generateToken(student._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentData = async (req, res) => {
  try {
    const { rollNumber } = req.params;

    const student = await Student.findOne({ rollNumber });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    console.log(" Found Student:", student); 

    
    res.json(student);
  } catch (error) {
    console.error(" Error fetching student:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};



export const logoutStudent = async (req, res) => {
  res.json({ message: "Logout successful" });
};


export const getAssignedExams = async (req, res) => {
  const { rollNumber } = req.params;

  try {
    const student = await Student.findOne({ rollNumber }).populate("exams.examId");
    if (!student) return res.status(404).json({ message: "Student not found" });

    res.status(200).json({
      message: "Assigned exams fetched successfully",
      exams: student.exams,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const submitExam = async (req, res) => {
  const { rollNumber, examId, answers } = req.body;

  try {
    const student = await Student.findOne({ rollNumber });
    const examPaper = await ExamPaper.findById(examId);

    if (!student || !examPaper)
      return res.status(404).json({ message: "Student or exam not found" });

    
    const studentExam = student.exams.find(
      (exam) => exam.examId?.toString() === examId
    );

    if (!studentExam)
      return res.status(400).json({ message: "Exam not assigned to this student" });

   
    if (studentExam.status === "completed")
      return res.status(400).json({ message: "Exam already submitted" });

   
    let score = 0;
    examPaper.questions.forEach((q, index) => {
      if (
        answers[index] &&
        answers[index].trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()
      ) {
        score++;
      }
    });

    
    studentExam.status = "completed";
    studentExam.score = score;
    studentExam.submittedAt = new Date();

    await student.save();

    res.status(200).json({
      message: "Exam submitted successfully",
      totalQuestions: examPaper.questions.length,
      correctAnswers: score,
      scorePercentage: ((score / examPaper.questions.length) * 100).toFixed(2),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

