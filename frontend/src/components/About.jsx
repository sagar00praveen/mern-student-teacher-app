
import React from 'react';
import campusImg from '../assets/campus.png'
const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          About Us
        </h2>
        <div className="flex flex-wrap items-center">
          <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              Our Mission
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our mission is to provide high-quality, accessible, and affordable
              education to students everywhere. We believe in the power of
              knowledge to transform lives and build a better future.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We focus on practical skills, innovative teaching methods, and a
              supportive learning environment to help our students succeed.
            </p>
          </div>
          <div className="w-full md:w-1/2 px-4">
            
            
            <img
              src= {campusImg}
              alt="Our Campus"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;