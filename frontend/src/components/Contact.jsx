import React from 'react';

const Contact = () => {
 
  const gmailComposeUrl = "https://mail.google.com/mail/?view=cm&fs=1&to=sagar.y.praveen@gmail.com";

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Get in Touch
        </h2>
        <p className="text-center text-gray-600 max-w-lg mx-auto mb-8">
          Have questions? We'd love to hear from you. Click the button below to
          send us an email.
        </p>
        <div className="text-center">
          <a
            href={gmailComposeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors duration-300 shadow-lg transform hover:-translate-y-1"
          >
            sagar.y.praveen@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;