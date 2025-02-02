"use client";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import Image from "next/image";
import { useState } from "react";
//import LoginPopup from "@/components/auth/LoginPopup";
export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const handleClose = () => {
    setIsLoginOpen(false);
  };
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* HEADER */}
      <header className="w-full bg-white fixed top-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-6 py-4 flex justify-between items-center">
          <div className="flex flex-col items-start">
            <h1 className="text-sm sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              AAS INTERNATIONAL
            </h1>
            <p className="text-sm sm:text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              Our Quality is Your Success
            </p>
          </div>
          {/* Button to redirect to the login page */}
          <button
            onClick={() => setIsLoginOpen(true)} // Trigger navigation to /login
            className="bg-blue-600 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-lg hover:bg-blue-700 text-sm sm:text-base"
          >
            Login
          </button>
        </div>
      </header>

      {/* MAIN HERO SECTION */}
      <main className="flex-grow py-12 mt-20 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 justify-between items-center">
          {/* LEFT SIDE: APP INTRODUCTION */}
          <section className="flex flex-col justify-between text-center sm:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 flex-grow">
              Organize Meetings & <br /> Take Notes Easily
            </h2>
            <p className="mt-4 text-lg sm:text-xl text-gray-600 flex-grow">
              A seamless way to manage your meetings, collaborate with teams, and keep track of notes—all in one place.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              {/* Redirect button */}
              <button
                onClick={() => setIsLoginOpen(!isLoginOpen)} // Trigger navigation to /login
                className="bg-blue-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg hover:bg-blue-700 text-sm sm:text-lg"
              >
                Create Meeting
              </button>
              <button
                onClick={() => setIsLoginOpen(!isLoginOpen)} // Trigger navigation to /login
                className="bg-gray-200 text-gray-800 px-6 py-3 sm:px-8 sm:py-4 rounded-lg hover:bg-gray-300 text-sm sm:text-lg"
              >
                View Notes
              </button>
            </div>
          </section>

          {/* RIGHT SIDE: APP VISUAL */}
          <section className="flex justify-center sm:justify-end">
            <div className="relative">
              <Image
                src="/hero-image.jpg"
                alt="Meeting & Notes"
                width={500}
                height={400}
                className="rounded-lg shadow-lg transition-transform duration-700 ease-in-out transform hover:scale-105"
              />
            </div>
          </section>
        </div>
      </main>

       {/* MEETING & NOTES SECTION */}
       <section className="w-full py-12 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 text-center sm:text-left">
            Features
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">

            {/* CREATE MEETING */}
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
              <h4 className="text-xl sm:text-2xl font-semibold text-gray-800">🔗 Create & Join Meetings</h4>
              <p className="mt-2 text-gray-600">Start a meeting instantly or join an existing one.</p>
              <button
                onClick={() => setIsLoginOpen(!isLoginOpen)}
                className="mt-4 bg-blue-600 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-lg hover:bg-blue-700 text-sm sm:text-base"
              >
                Start Meeting
              </button>
            </div>

            {/* TAKE NOTES */}
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
              <h4 className="text-xl sm:text-2xl font-semibold text-gray-800">📝 Take & Save Notes</h4>
              <p className="mt-2 text-gray-600">Record key points & collaborate with  team.</p>
              <button
                onClick={() => setIsLoginOpen(!isLoginOpen)}
                className="mt-4 bg-gray-200 text-gray-800 px-6 py-2 sm:px-8 sm:py-3 rounded-lg hover:bg-gray-300 text-sm sm:text-base"
              >
                View Notes
              </button>
            </div>

            {/* INTEGRATIONS */}
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
              <h4 className="text-xl sm:text-2xl font-semibold text-gray-800">📅 Sync with Calendar</h4>
              <p className="mt-2 text-gray-600">Integrate meetings with your work calendar.</p>
              <button
                onClick={() => setIsLoginOpen(!isLoginOpen)}
                className="mt-4 bg-green-600 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-lg hover:bg-green-700 text-sm sm:text-base"
              >
                Sync Now
              </button>
            </div>

          </div>
        </div>
      </section>
      
      {/* FOOTER */}
      <footer className="w-full py-6 border-t mt-8">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex justify-center gap-6">
          <a className="text-gray-700 hover:underline" href="#" target="_blank">
            AAS
          </a>
          <a className="flex items-center gap-2 text-gray-700 hover:underline" href="https://aasint.com" target="_blank">
            Go to AASInt.com →
          </a>
        </div>
      </footer>

       {/* LOGIN POPUP */}
            {/* <LoginPopup isOpen={isLoginOpen} onClose={handleClose} /> */}
         
    </div>
  );
}
