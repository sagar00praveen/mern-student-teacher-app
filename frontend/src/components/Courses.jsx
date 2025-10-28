import React from 'react';
import cseImage from '../assets/cse.png';
import mecImg from '../assets/Mechanical Engineering.jpg';
import aiImg from '../assets/ai.jpg';

const CourseCard = ({ title, description, imgUrl }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:-translate-y-2">
    <img src={imgUrl} alt={title} className="w-full h-48 object-cover" />
    <div className="p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <a href="#" className="text-green-500 font-semibold hover:text-green-600">
        Learn More
      </a>
    </div>
  </div>
);

const Courses = () => {
  const popularCourses = [
    {
      title: "Computer Science",
      description: "Dive into algorithms, data structures, and software development.",
      imgUrl: cseImage,
    },
    {
      title: "Mechanical Engineering",
      description: "Explore thermodynamics, fluid mechanics, and machine design.",
      imgUrl: mecImg,
    },
    {
      title: "Artificial Intelligence",
      description: "Discover machine learning, neural networks, and data science.",
      imgUrl: aiImg,
    },
  ];

  return (
    <section id="courses" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Our Popular Courses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularCourses.map((course, index) => (
            <CourseCard
              key={index}
              title={course.title}
              description={course.description}
              imgUrl={course.imgUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;