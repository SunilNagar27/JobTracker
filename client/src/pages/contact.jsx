import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import contact from '../assets/contact.svg'

const ContactForm = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log(result.text);
          alert('Message sent successfully!');
        },
        (error) => {
          console.log(error.text);
          alert('An error occurred, please try again.');
        }
      );

    e.target.reset();
  };

  return (
    <div className="flex min-h-screen px-8">
      {/* Left Section - Contact Form */}
      <form
        ref={form}
        onSubmit={sendEmail}
        className="w-full max-w-lg bg-zinc-900 rounded-xl shadow-lg p-8 my-auto"
      >
        <h2 className="text-3xl text-center text-teal-400 font-semibold mb-6">
          Get In Touch !!
        </h2>
        <div className="flex flex-col gap-5">
          <input
            className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="Full Name"
            type="text"
            name="user_name"
            required
          />
          <input
            className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-400"
            type="email"
            placeholder="Enter your email"
            name="user_email"
            required
          />
          <textarea
            className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-400"
            placeholder="Type your message"
            name="message"
            rows="5"
            required
          />
          <button
            className="w-full px-4 py-2 bg-teal-500 text-gray-900 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-400 transition-all"
            type="submit"
          >
            Send
          </button>
        </div>
      </form>

      {/* Right Section - Reserved for SVG */}
      <div className="hidden md:flex flex-grow items-center justify-center">
        <img
          src={contact}
          alt="Contact illustration"
          className="w-4/6 h-auto max-h-[400px] object-contain"
        />
      </div>
    </div>
  );
};

export default ContactForm;
