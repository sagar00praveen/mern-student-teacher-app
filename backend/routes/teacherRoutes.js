import express from "express";
import {
  registerTeacher,
  loginTeacher,
  logoutTeacher,
  addStudent,
  createExamPaper,
} from "../controllers/teacherController.js";

const router = express.Router();

router.post("/register", registerTeacher);
router.post("/login", loginTeacher);
router.post("/logout", logoutTeacher);
router.post("/add-student", addStudent);
router.post("/create-exam", createExamPaper);

export default router;
