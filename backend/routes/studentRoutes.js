import express from "express";
import {
  loginStudent,
  logoutStudent,
  getAssignedExams,
  submitExam,
  getStudentData
} from "../controllers/studentController.js";

const router = express.Router();

router.post("/login", loginStudent);
router.get("/:rollNumber", getStudentData);
router.post("/logout", logoutStudent);
router.get("/:rollNumber/exams", getAssignedExams);
router.post("/submit-exam", submitExam);

export default router;
