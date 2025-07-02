import React, { useState, useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useUniversityWebinar } from "../context/UniversityWebinarContext";
import Navbar from "../components/shared/Navbar";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaCheck, FaFileAlt, FaEnvelope, FaUserTie, FaBook } from 'react-icons/fa';

const UniversityWebinar = () => {
  const { loading, error, registerForUniversityWebinar } = useUniversityWebinar();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    universityName: '',
    annualFair: false,
    biweeklyFair: false,
    partnership: false,
    promotionMaterial: false,
  });

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Webinar date: July 7, 2025 8:00 PM (WAT - West Africa Time)
  const webinarDate = new Date('2025-07-07T20:00:00+01:00');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = webinarDate - now;

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerForUniversityWebinar(formData);
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        universityName: '',
        annualFair: false,
        biweeklyFair: false,
        partnership: false,
        promotionMaterial: false,
      });
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  const highlights = [
    "Presentation by the U.S. Embassy",
    "Real success stories from students and families",
    "Insights into Scovers Education's capabilities and future plans",
    "About the fair and activities leading to that day"
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      
      {/* Hero Section with countdown timer */}
      <div className="relative">
        <div 
          className="absolute inset-0 bg-[url('/webback.jpg')] bg-cover bg-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 py-4 md:py-6 flex flex-col md:flex-row justify-between items-center">
          {/* Left text */}
          <div className="text-left mb-8 md:mb-0 md:w-1/2">
            <h1 className="text-3xl md:text-4xl font-medium text-white mb-4">
              Scovers Education Webinar / Pre-Educational Fair Introduction
            </h1>
            <p className="text-lg text-white max-w-lg">
              Discover our success in international student recruitment, hear inspiring stories,
              and learn about our major Education Fair coming this November.
            </p>
          </div>

          {/* Right countdown timer */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center md:w-1/3">
            <h3 className="text-white font-medium mb-4 text-xl">Webinar Starts In</h3>
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-[#2D8CD4]/90 p-3 rounded">
                <div className="text-2xl font-medium text-white">{timeLeft.days}</div>
                <div className="text-xs text-white/80">DAYS</div>
              </div>
              <div className="bg-[#2D8CD4]/90 p-3 rounded">
                <div className="text-2xl font-medium text-white">{timeLeft.hours}</div>
                <div className="text-xs text-white/80">HOURS</div>
              </div>
              <div className="bg-[#2D8CD4]/90 p-3 rounded">
                <div className="text-2xl font-medium text-white">{timeLeft.minutes}</div>
                <div className="text-xs text-white/80">MINS</div>
              </div>
              <div className="bg-[#2D8CD4]/90 p-3 rounded">
                <div className="text-2xl font-medium text-white">{timeLeft.seconds}</div>
                <div className="text-xs text-white/80">SECS</div>
              </div>
            </div>
            <button 
              onClick={() => document.getElementById('registration-form').scrollIntoView({ behavior: 'smooth' })}
              className="mt-4 bg-white text-[#2D8CD4] hover:bg-gray-100 font-medium py-2 px-6 rounded transition-colors"
            >
              Register Now
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Content */}
          <div className="md:w-2/3">
            {/* Event Details with icons */}
            <div className="bg-[#2D8CD4] text-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-2xl font-medium mb-6">EVENT DETAILS</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <FaCalendarAlt className="text-xl mt-1" />
                  <div>
                    <h3 className="text-lg font-medium mb-2">DATE</h3>
                    <p className="text-white">7th July 2025</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaClock className="text-xl mt-1" />
                  <div>
                    <h3 className="text-lg font-medium mb-2">TIME</h3>
                    <p className="text-white">8:00 PM</p>
                    <p className="text-sm text-white opacity-80">West Africa Time (WAT)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-xl mt-1" />
                  <div>
                    <h3 className="text-lg font-medium mb-2">VENUE</h3>
                    <p className="text-white">Zoom</p>
                    <p className="text-sm text-white opacity-80">(Link will be provided after registration)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-2xl font-medium text-[#2D8CD4] mb-4">Highlights</h2>
              <div className="space-y-3">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <FaCheck className="text-[#2D8CD4] mt-1 flex-shrink-0" />
                    <p className="text-gray-700">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* About the Fair */}
            <div className="bg-[#2D8CD4]/10 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-medium text-[#2D8CD4] mb-4">About Our November Education Fair</h2>
              <p className="text-gray-700 mb-4">
                This webinar serves as a pre-introduction to our major Education Fair coming up in November 2025. 
                Learn about what to expect, how to prepare, and the opportunities available for both students and institutions.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="flex items-start gap-4">
                  <FaUserTie className="text-[#2D8CD4] mt-1 text-xl" />
                  <div>
                    <h3 className="font-medium mb-2 text-lg">Networking Opportunities</h3>
                    <p className="text-gray-700">Connect with education experts and university representatives.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <FaBook className="text-[#2D8CD4] mt-1 text-xl" />
                  <div>
                    <h3 className="font-medium mb-2 text-lg">Admission Guidance</h3>
                    <p className="text-gray-700">Get expert advice on application processes and requirements.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <div className="md:w-1/3" id="registration-form">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
              <h3 className="text-2xl font-medium text-[#2D8CD4] mb-6">Register Now</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  className="border p-3 rounded w-full"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="border p-3 rounded w-full"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  className="border p-3 rounded w-full"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  name="universityName"
                  placeholder="Name of University/Institution"
                  className="border p-3 rounded w-full"
                  value={formData.universityName}
                  onChange={handleChange}
                />

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="annualFair"
                    id="annualFair"
                    className="mr-2"
                    checked={formData.annualFair}
                    onChange={handleChange}
                  />
                  <label htmlFor="annualFair">Would you consider attending our fair in November?</label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="biweeklyFair"
                    id="biweeklyFair"
                    className="mr-2"
                    checked={formData.biweeklyFair}
                    onChange={handleChange}
                  />
                  <label htmlFor="biweeklyFair">Would you consider attending our bi-weekly webinars?</label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="partnership"
                    id="partnership"
                    className="mr-2"
                    checked={formData.partnership}
                    onChange={handleChange}
                  />
                  <label htmlFor="partnership">Would you like to partner with Scovers for lead generation?</label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="promotionMaterial"
                    id="promotionMaterial"
                    className="mr-2"
                    checked={formData.promotionMaterial}
                    onChange={handleChange}
                  />
                  <label htmlFor="promotionMaterial">Do you have promotional materials to share?</label>
                </div>

                <button
                  type="submit"
                  className="bg-[#2D8CD4] hover:bg-[#1A5F8B] text-white py-3 px-6 rounded w-full transition-colors"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Register Now'}
                </button>

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityWebinar;