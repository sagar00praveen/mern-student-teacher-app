import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentInfo = () => {
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const rollNumber = localStorage.getItem("rollNumber");

        if (!rollNumber) {
          setError("No student logged in");
          return;
        }

        const { data } = await axios.get(
          `http://localhost:5000/api/students/${rollNumber}`
        );

        if (data && data.student) {
          setStudent(data.student);
        } else {
          setStudent(data);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching student data");
      }
    };

    fetchStudent();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleTakeExam = (examId) => {
    const id = examId?._id || examId;
    navigate(`/exam/${id}`);
  };

  if (error)
    return (
      <p className="text-red-500 text-center mt-10 font-semibold">{error}</p>
    );

  if (!student)
    return (
      <p className="text-gray-600 text-center mt-10 text-lg">Loading...</p>
    );

  const allExams = student.exams || [];

  const pendingExams = allExams.filter(
    (exam) => exam?.status?.trim().toLowerCase() === "pending"
  );

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-gray-50 to-gray-200 px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Student Dashboard
      </h1>

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-100 space-y-3">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center">
          Student Information
        </h2>

        <p className="text-gray-700">
          <strong>Name:</strong> {student.name}
        </p>
        <p className="text-gray-700">
          <strong>Roll Number:</strong> {student.rollNumber}
        </p>
        <p className="text-gray-700">
          <strong>Class:</strong> {student.className}
        </p>
        <p className="text-gray-700">
          <strong>Age:</strong> {student.age}
        </p>

        <button
          onClick={handleLogout}
          className="w-full mt-6 bg-gray-800 text-white hover:bg-gray-900 py-2 rounded-lg font-semibold transition"
        >
          Logout
        </button>
      </div>

      <div className="mt-10 w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-semibold text-green-600 mb-4 text-center">
          Pending Exams
        </h2>

        {pendingExams.length > 0 ? (
          <div className="space-y-4">
            {pendingExams.map((exam, index) => (
              <div
                key={exam._id || index}
                className="flex flex-col md:flex-row justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition"
              >
                <div>
                  <p className="text-gray-800">
                    <strong>Subject:</strong> {exam.subject}
                  </p>
                  <p className="text-sm text-gray-500">
                    Status: {exam.status}
                  </p>
                </div>
                <button
                  onClick={() => handleTakeExam(exam.examId)}
                  className="mt-3 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Take Exam
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 font-medium">
            No pending exams
          </p>
        )}
      </div>
    </div>
  );
};

export default StudentInfo;