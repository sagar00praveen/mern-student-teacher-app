import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateExam = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [examData, setExamData] = useState({
    examTitle: "",
    subject: "",
    className: "",
    questions: Array.from({ length: 10 }, () => ({
      questionText: "",
      options: [
        { optionText: "" },
        { optionText: "" },
        { optionText: "" },
        { optionText: "" },
      ],
      correctAnswer: "",
    })),
  });

  const [message, setMessage] = useState("");

  const handleExamChange = (e) => {
    setExamData({ ...examData, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...examData.questions];
    newQuestions[index].questionText = value;
    setExamData({ ...examData, questions: newQuestions });
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const newQuestions = [...examData.questions];
    newQuestions[qIndex].options[optIndex].optionText = value;
    if (
      newQuestions[qIndex].correctAnswer ===
      newQuestions[qIndex].options[optIndex].optionText
    ) {
      newQuestions[qIndex].correctAnswer = value;
    }
    setExamData({ ...examData, questions: newQuestions });
  };

  const handleCorrectAnswerSelect = (qIndex, value) => {
    const newQuestions = [...examData.questions];
    newQuestions[qIndex].correctAnswer = value;
    setExamData({ ...examData, questions: newQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        `${API_URL}/teachers/create-exam`,
        examData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(`Exam "${data.examTitle}" created successfully!`);
      setExamData({
        examTitle: "",
        subject: "",
        className: "",
        questions: Array.from({ length: 10 }, () => ({
          questionText: "",
          options: [
            { optionText: "" },
            { optionText: "" },
            { optionText: "" },
            { optionText: "" },
          ],
          correctAnswer: "",
        })),
      });
    } catch (err) {
      setMessage(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-cyan-50 to-white py-10 px-6 overflow-y-auto">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl border border-gray-200 p-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Create New Exam
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-3 gap-6">
            <input
              type="text"
              name="examTitle"
              placeholder="Exam Title"
              value={examData.examTitle}
              onChange={handleExamChange}
              required
              className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-400 outline-none"
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={examData.subject}
              onChange={handleExamChange}
              required
              className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-400 outline-none"
            />

            <input
              type="text"
              name="className"
              placeholder="Class (e.g., 10A)"
              value={examData.className}
              onChange={handleExamChange}
              required
              className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-400 outline-none"
            />
          </div>

          <div className="space-y-10">
            {examData.questions.map((q, qIndex) => (
              <div
                key={qIndex}
                className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-gray-50"
              >
                <h3 className="text-lg font-semibold mb-4 text-gray-700">
                  Question {qIndex + 1}
                </h3>

                <input
                  type="text"
                  placeholder="Enter question text"
                  value={q.questionText}
                  onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                  required
                  className="w-full px-4 py-3 mb-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-400 outline-none"
                />

                <div className="grid grid-cols-2 gap-4 mb-4">
                  {q.options.map((opt, optIndex) => (
                    <label
                      key={optIndex}
                      className="flex items-center gap-2 bg-white p-3 rounded-xl border border-gray-300 shadow-sm hover:bg-cyan-50 transition"
                    >
                      <input
                        type="radio"
                        name={`correctAnswer-${qIndex}`}
                        value={opt.optionText}
                        checked={q.correctAnswer === opt.optionText}
                        onChange={() =>
                          handleCorrectAnswerSelect(qIndex, opt.optionText)
                        }
                      />
                      <input
                        type="text"
                        placeholder={`Option ${optIndex + 1}`}
                        value={opt.optionText}
                        onChange={(e) =>
                          handleOptionChange(qIndex, optIndex, e.target.value)
                        }
                        required
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-cyan-400 outline-none"
                      />
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <button
              type="submit"
              className="w-full md:w-1/2 py-3 bg-cyan-500 text-white font-semibold rounded-xl hover:bg-cyan-600 transition"
            >
              Create Exam
            </button>

            <button
              type="button"
              onClick={() => navigate("/teacher-dashboard")}
              className="w-full md:w-1/2 py-3 bg-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-400 transition"
            >
              Back to Dashboard
            </button>
          </div>

          {message && (
            <p className="text-center mt-6 text-gray-700 text-sm">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateExam;
