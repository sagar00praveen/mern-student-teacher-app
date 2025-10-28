import Teacher from "../models/teacherModel.js";
import Student from "../models/studentModel.js";
import ExamPaper from "../models/questionModel.js";
import argon2 from "argon2";
import generateToken from "../utils/generateToken.js";


export const registerTeacher = async (req, res) => {
  try {
    const { name, rollNumber, password } = req.body;

    const teacherExists = await Teacher.findOne({ rollNumber });
    if (teacherExists)
      return res.status(400).json({ message: "Teacher already exists" });

    const hashedPassword = await argon2.hash(password);
    const teacher = await Teacher.create({
      name,
      rollNumber,
      password: hashedPassword,
    });

    res.status(201).json({
      _id: teacher._id,
      name: teacher.name,
      rollNumber: teacher.rollNumber,
      token: generateToken(teacher._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const loginTeacher = async (req, res) => {
  try {
    const { rollNumber, password } = req.body;
    const teacher = await Teacher.findOne({ rollNumber });

    if (!teacher) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await argon2.verify(teacher.password, password);
    const sample = await argon2.hash(password);
console.log(" Stored hash:", teacher.password);
console.log(" Input password:", password);
console.log(" Match result:", isMatch);
console.log(" sample hased password:",sample);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      _id: teacher._id,
      name: teacher.name,
      rollNumber: teacher.rollNumber,
      token: generateToken(teacher._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const logoutTeacher = async (req, res) => {
  res.json({ message: "Logout successful" });
};


export const addStudent = async (req, res) => {
  try {
    const { name, rollNumber, password, age, className } = req.body;

    const existingStudent = await Student.findOne({ rollNumber });
    if (existingStudent)
      return res.status(400).json({ message: "Student already exists" });

    const hashedPassword = await argon2.hash(password);
    const student = await Student.create({
      name,
      rollNumber,
      password:hashedPassword,
      age,
      className,
    });

    res.status(201).json({
      message: "Student added successfully",
      student: {
        _id: student._id,
        name: student.name,
        rollNumber: student.rollNumber,
        className: student.className,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const createExamPaper = async (req, res) => {
  try {
    const { subject, className, questions } = req.body;

    const newExam = await ExamPaper.create({ subject, className, questions });

    
    const students = await Student.find({ className });
    console.log('the class name',className)
    for (const student of students) {
      student.exams.push({
        examId: newExam._id,
        subject,
        status: "pending",
        score: 0,
      });
      await student.save();
    }

    res.status(201).json({
      message: `Exam for ${subject} created and assigned to ${className}`,
      exam: newExam,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
