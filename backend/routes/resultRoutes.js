import express from "express";
import {
  getAllResults,
  getResultByStudent,
  getResultByExam,
} from "../controllers/resultController.js";

const router = express.Router();

// GET /api/results
router.get("/", getAllResults);

// GET /api/results/student/:studentId
router.get("/student/:studentId", getResultByStudent);

// GET /api/results/exam/:examId
router.get("/exam/:examId", getResultByExam);

export default router;
