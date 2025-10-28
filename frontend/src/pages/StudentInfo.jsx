import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Access the API URL from the environment variables
const API_URL = import.meta.env.VITE_API_URL;

const StudentInfo = () => {
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      // Basic validation to check if API_URL is defined
      if (!API_URL) {
        setError("Error: VITE_API_URL is not defined in environment variables.");
        return;
      }

      try {
        const rollNumber = localStorage.getItem("rollNumber");

        if (!rollNumber) {
          setError("No student logged in");
          return;
        }

        // Construct the full API endpoint using the environment variable
        const { data } = await axios.get(
          `${API_URL}/students/${rollNumber}`
        );

        if (data && data.student) {
          setStudent(data.student);
        } else {
          setStudent(data);
        }
      } catch (err) {
        // Removed emoji and kept the error message clean
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
    // Uses optional chaining on examId for robustness
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

  // Safely access the exams array
  const allExams = student.exams || [];

  // Filter exams that are pending (case-insensitive and trimmed)
  const pendingExams = allExams.filter(
    (exam) => exam?.status?.trim().toLowerCase() === "pending"
  );

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-gray-50 to-gray-200 px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Student Dashboard
      </h1>

      {/* Student Information Card */}
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-100 space-y-3">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center">
          Student Information
        </h2>

        <p className="text-gray-700">
          <strong className="font-bold">Name:</strong> {student.name}
        </p>
        <p className="text-gray-700">
          <strong className="font-bold">Roll Number:</strong> {student.rollNumber}
        </p>
        <p className="text-gray-700">
          <strong className="font-bold">Class:</strong> {student.className}
        </p>
        <p className="text-gray-700">
          <strong className="font-bold">Age:</strong> {student.age}
        </p>

        <button
          onClick={handleLogout}
          className="w-full mt-6 bg-gray-800 text-white hover:bg-gray-900 py-2 rounded-lg font-semibold transition"
        >
          Logout
        </button>
      </div>

      {/* Pending Exams Card */}
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
                    <strong className="font-medium">Subject:</strong> {exam.subject}
                  </p>
                  <p className="text-sm text-gray-500">
                    Status: <span className="text-orange-500">{exam.status}</span>
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
