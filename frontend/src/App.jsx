import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StudentLogin from "./pages/StudentLogin";
import StudentInfo from "./pages/StudentInfo";
import TakeExam from "./pages/TakeExam";
import TeacherLogin from "./pages/TeacherLogin";
import TeacherInfo from "./pages/TeacherInfo";
import AddStudent from "./pages/AddStudent";
import CreateExam from "./pages/CreateExam";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/student-login" element={<StudentLogin />} />
      <Route path="/student-info" element={<StudentInfo/>}/>
      <Route path="/exam/:examId" element={<TakeExam />} />
      <Route path="/teacher-Login" element={<TeacherLogin />} />
      <Route path="/teacher-dashboard" element={<TeacherInfo />} />
      <Route path="/add-student" element={<AddStudent />} />
      <Route path="/create-exam" element={<CreateExam />} />
    </Routes>
  );
};

export default App;
