import express from "express";
import ExamPaper from "../models/questionModel.js";

const router = express.Router();

// Get all exams
router.get("/", async (req, res) => {
  try {
    const exams = await ExamPaper.find().populate("createdBy", "name rollNumber");
    res.json(exams);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get exam by ID
router.get("/:id", async (req, res) => {
  try {
    const exam = await ExamPaper.findById(req.params.id);
    if (!exam) return res.status(404).json({ message: "Exam not found" });
    res.json(exam);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
