
import React from "react";
import { useNavigate } from "react-router-dom";


import Header from "../components/Header"; 
import About from "../components/About";
import Courses from "../components/Courses";
import Trainers from "../components/Trainers";
import Contact from "../components/Contact";

const Home = () => {
  const navigate = useNavigate();
  console.log(import.meta.env.VITE_API_URL)


  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Hero Section */}
      <main
        id="home" 
        className="flex-grow flex flex-col items-center justify-center text-center px-4 pt-32 pb-20 bg-gray-50" // Increased top padding
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 max-w-3xl">
          Learning Today, Leading Tomorrow
        </h1>
        <p className="text-lg text-gray-600 mb-10 max-w-2xl">
          Welcome to our school portal. Please select your login type to access
          your dashboard.
        </p>
        

        
        <div
          id="login" 
          className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <button
            onClick={() => navigate("/student-login")}
            className="px-10 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition transform hover:-translate-y-1"
          >
            Student Login
          </button>
          <button
            onClick={() => navigate("/teacher-login")}
            className="px-10 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition transform hover:-translate-y-1"
          >
            Teacher Login
          </button>
        </div>
      </main>

     
      <About />
      <Courses />
      <Trainers />
      <Contact />

   
      <footer className="w-full bg-gray-800 text-gray-400 py-6 text-center">
        <p>&copy; 2025 NRI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
