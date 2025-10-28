
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddStudent = () => {
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    password: "",
    age: "",
    className: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.post(
        "http://localhost:5000/api/teachers/add-student",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(` Student "${data.name}" added successfully!`);
      setFormData({
        name: "",
        rollNumber: "",
        password: "",
        age: "",
        className: "",
      });
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 via-emerald-50 to-white px-4">
      <div className="w-full max-w-lg bg-white p-10 rounded-3xl shadow-2xl border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Add New Student</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none"
          />

          <input
            type="text"
            name="rollNumber"
            placeholder="Roll Number"
            value={formData.rollNumber}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none"
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none"
          />

          <input
            type="text"
            name="className"
            placeholder="Class (e.g., 10A)"
            value={formData.className}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none"
          />

          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition"
          >
            Add Student
          </button>

          <button
            type="button"
            onClick={() => navigate("/teacher-dashboard")}
            className="w-full py-3 bg-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-400 transition"
          >
            ⬅ Back to Dashboard
          </button>
        </form>

        {message && (
          <p className="mt-6 text-center text-gray-700 text-sm">{message}</p>
        )}
      </div>
    </div>
  );
};

export default AddStudent;
