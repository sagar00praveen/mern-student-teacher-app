import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TeacherLogin = () => {
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isRegistering) {
        //  Register new teacher
        const { data } = await axios.post(
          "http://localhost:5000/api/teachers/register",
          { name, rollNumber, password },
          { headers: { "Content-Type": "application/json" } }
        );

        alert("Registration successful! You can now log in.");
        setIsRegistering(false); 
        setName("");
        setPassword("");
        setRollNumber("");
      } else {

        const { data } = await axios.post(
          "http://localhost:5000/api/teachers/login",
          { rollNumber, password },
          { headers: { "Content-Type": "application/json" } }
        );

        localStorage.setItem("token", data.token);
        localStorage.setItem("teacherName", data.name);
        localStorage.setItem("teacherRoll", data.rollNumber);

        navigate("/teacher-dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-200 px-4">
      <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-2xl border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          {isRegistering ? "Teacher Registration" : "Teacher Login"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {isRegistering && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
              required
            />
          )}

          <input
            type="text"
            placeholder="Roll Number"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
            required
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-gray-800 text-white hover:bg-gray-900 rounded-xl transition"
          >
            {isRegistering ? "Register" : "Login"}
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
  {isRegistering ? (
    <>
      Already have an account?{" "}
      <span
        onClick={() => setIsRegistering(false)}
        className="text-blue-500 font-medium cursor-pointer hover:underline"
      >
        Login
      </span>
    </>
  ) : (
    <>
      New teacher?{" "}
      <span
        onClick={() => setIsRegistering(true)}
        className="text-blue-500 font-medium cursor-pointer hover:underline"
      >
        Register
      </span>
    </>
  )}
</p>


          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full py-3 bg-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-400 transition"
          >
            Back to Home
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeacherLogin;
