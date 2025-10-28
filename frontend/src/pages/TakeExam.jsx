import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const TakeExam = () => {
  const { examId } = useParams();
  const navigate = useNavigate();

  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null); 

  
  useEffect(() => {
    const fetchExam = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/exams/${examId}`
        );
        setExam(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching exam");
        setLoading(false);
      }
    };
    fetchExam();
  }, [examId]);

  const handleChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const rollNumber = localStorage.getItem("rollNumber");

      
      const formattedAnswers = exam.questions.map(
        (q) => answers[q._id] || ""
      );

      const { data } = await axios.post(
        "http://localhost:5000/api/students/submit-exam",
        {
          rollNumber,
          examId,
          answers: formattedAnswers,
        }
      );

      console.log(" Exam Result:", data);
      setResult(data); 
    } catch (err) {
      console.error(" Error submitting exam:", err);
      alert(err.response?.data?.message || "Error submitting exam");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading exam...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-500 font-semibold">{error}</p>
    );
  if (!exam) return <p className="text-center mt-10">No exam found</p>;


  if (result) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-10">
        <h1 className="text-3xl font-bold mb-4">{exam.subject} Exam Result</h1>
        <p className="text-xl mb-2">
          Total Questions: <strong>{result.totalQuestions}</strong>
        </p>
        <p className="text-xl mb-2">
          Correct Answers: <strong>{result.correctAnswers}</strong>
        </p>
        <p className="text-2xl font-semibold text-green-600">
          Score Percentage: <strong>{result.scorePercentage}%</strong>
        </p>

        <button
          onClick={() => navigate("/student-info")}
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">{exam.subject} Exam</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-3xl space-y-6"
      >
        {exam.questions?.map((q, index) => (
          <div key={q._id} className="space-y-2">
            <p className="font-semibold">
              {index + 1}. {q.questionText}
            </p>

            {q.options?.map((option) => (
              <label key={option._id} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={q._id}
                  value={option.optionText}
                  onChange={(e) => handleChange(q._id, e.target.value)}
                  required
                />
                <span>{option.optionText}</span>
              </label>
            ))}
          </div>
        ))}

        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          Submit Exam
        </button>
      </form>
    </div>
  );
};

export default TakeExam;
