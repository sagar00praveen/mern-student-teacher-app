
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TeacherInfo = () => {
  const [teacher, setTeacher] = useState({ name: "", rollNumber: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem("teacherName");
    const rollNumber = localStorage.getItem("teacherRoll");

    if (!name || !rollNumber) {
      navigate("/teacher-login");
    } else {
      setTeacher({ name, rollNumber });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-gray-50 to-gray-200 px-4 py-10">
      
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Teacher Dashboard
      </h1>

      
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-100 space-y-3">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center">
          Teacher Information
        </h2>

        <p className="text-gray-700">
          <strong>Name:</strong> {teacher.name}
        </p>
        <p className="text-gray-700">
          <strong>Roll Number:</strong> {teacher.rollNumber}
        </p>

        <button
          onClick={handleLogout}
          className="w-full mt-6 bg-gray-800 text-white hover:bg-gray-900 py-2 rounded-lg font-semibold transition"
        >
          Logout
        </button>
      </div>

      
      <div className="mt-10 w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-semibold text-green-600 mb-6 text-center">
          Manage Classroom
        </h2>

        <div className="flex flex-col md:flex-row justify-center gap-6">
          <button
            onClick={() => navigate("/add-student")}
            className="w-full md:w-auto bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
          >
             Add Student
          </button>

          <button
            onClick={() => navigate("/create-exam")}
            className="w-full md:w-auto bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-600 transition"
          >
             Create Exam
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherInfo;
