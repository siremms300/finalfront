import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/shared/Navbar";
import { 
  FaCheck, 
  FaCalendarAlt, 
  FaClock, 
  FaMapMarkerAlt, 
  FaUserTie, 
  FaEnvelope, 
  FaBook, 
  FaFileAlt,
  FaGraduationCap,
  FaGlobeAmericas,
  FaAward,
  FaUsers,
  FaRocket,
  FaHeart,
  FaQuoteLeft,
  FaPlayCircle,
  FaStar,
  FaShareAlt,
  FaChevronDown 
} from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const About = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const playVideo = () => {
    setIsVideoPlaying(true);
  };

  const accordionData = [
    {
      question: "Who We Are",
      answer: "Scovers is a leading education platform dedicated to helping students achieve their dreams of studying abroad. We partner with top universities worldwide to provide access to the best educational opportunities.",
      icon: FaUsers
    },
    {
      question: "Our Mission",
      answer: "Our mission is to make studying abroad accessible and stress-free. We provide personalized guidance, from course selection to application submission, ensuring students maximize their potential.",
      icon: FaRocket
    },
    {
      question: "Why Choose Us?",
      answer: "With a network of experienced counselors and partner universities, we offer tailored solutions to meet your educational goals. Our platform simplifies the process, saving you time and effort.",
      icon: FaAward
    },
    {
      question: "Our Vision",
      answer: "To become the most trusted global education platform, transforming lives through accessible international education opportunities and creating a borderless learning community.",
      icon: FaGlobeAmericas
    }
  ];

  // Enhanced slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  const universities = [
    { name: 'University of Michigan', logo: '/michigan.png', rank: '#1 Public University' },
    { name: 'University of Toronto', logo: '/michigan.png', rank: '#1 in Canada' },
    { name: 'University of Melbourne', logo: '/michigan.png', rank: '#1 in Australia' },
    { name: 'University College London', logo: '/michigan.png', rank: 'Top 10 Globally' },
    { name: 'University of Edinburgh', logo: '/michigan.png', rank: 'Top 20 Globally' },
    { name: 'ETH Zurich', logo: '/michigan.png', rank: 'Top STEM University' },
  ];

  const coreValues = [
    {
      icon: FaHeart,
      title: "Student-Centric",
      description: "Your success is our priority. We tailor our services to meet your unique needs and aspirations."
    },
    {
      icon: FaAward,
      title: "Excellence",
      description: "We maintain the highest standards in counseling and university partnerships."
    },
    {
      icon: FaGlobeAmericas,
      title: "Global Reach",
      description: "Access to 200+ institutions across 15 countries worldwide."
    },
    {
      icon: FaUsers,
      title: "Community",
      description: "Join a network of successful alumni and current students for lifelong connections."
    }
  ];

  const teamStats = [
    { number: "12+", label: "Years Experience" },
    { number: "5,000+", label: "Students Helped" },
    { number: "200+", label: "Partner Universities" },
    { number: "15+", label: "Countries" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      university: "University of Toronto",
      text: "Scovers made my dream of studying in Canada a reality. Their guidance was invaluable throughout the entire process.",
      rating: 5
    },
    {
      name: "Michael Chen",
      university: "University of Michigan",
      text: "The personalized counseling and scholarship assistance helped me secure admission with funding. Highly recommended!",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      university: "University College London",
      text: "From application to visa processing, Scovers provided exceptional support every step of the way.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-sans">
      <Navbar />
      
      {/* Enhanced Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-medium">
                <FaGraduationCap className="text-yellow-300" />
                Trusted Since 2012
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Transforming Lives Through 
                <span className="text-yellow-300"> Education</span>
              </h1>
              
              <p className="text-xl text-blue-100 leading-relaxed">
                For over a decade, Scovers has been the trusted partner for students seeking 
                international education opportunities. We bridge dreams with reality through 
                personalized guidance and global university partnerships.
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-6">
                {teamStats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-yellow-300">{stat.number}</div>
                    <div className="text-blue-200 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Mission Highlight */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-center mb-6">Our Commitment</h3>
              <div className="space-y-4">
                <div className="bg-white/20 rounded-xl p-4">
                  <div className="flex items-center gap-3 text-blue-100">
                    <FaAward className="text-lg text-yellow-300" />
                    <span>95% Admission Success Rate</span>
                  </div>
                </div>
                <div className="bg-white/20 rounded-xl p-4">
                  <div className="flex items-center gap-3 text-blue-100">
                    <FaUsers className="text-lg text-yellow-300" />
                    <span>5,000+ Success Stories</span>
                  </div>
                </div>
                <div className="bg-white/20 rounded-xl p-4">
                  <div className="flex items-center gap-3 text-blue-100">
                    <FaGlobeAmericas className="text-lg text-yellow-300" />
                    <span>Global University Network</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Core Values
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            These principles guide everything we do and define who we are as an organization
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <value.icon className="text-4xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Content */}
          <div className="lg:w-2/3 space-y-8">
            {/* Our Story Section */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-3xl font-bold mb-6">Our Journey</h2>
              <div className="space-y-4">
                <p className="text-blue-100 text-lg leading-relaxed">
                  Founded in 2012, Scovers began with a simple yet powerful vision: to make quality international 
                  education accessible to every deserving student. What started as a small counseling service has 
                  grown into a comprehensive education platform serving thousands of students worldwide.
                </p>
                <p className="text-blue-100 text-lg leading-relaxed">
                  Today, we partner with over 200 prestigious institutions across 15 countries, offering 
                  personalized guidance and support throughout the entire educational journey. Our success is 
                  measured by the achievements of our students and the lifelong relationships we build.
                </p>
              </div>
            </motion.div>

            {/* Partner Universities */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Our Partner Universities</h2>
                <div className="text-blue-600 font-semibold">{universities.length}+ Top Institutions</div>
              </div>
              <Slider {...sliderSettings}>
                {universities.map((uni, index) => (
                  <div key={index} className="px-3">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 text-center h-48 flex flex-col items-center justify-center border border-blue-100 hover:border-blue-300 transition-colors">
                      <img src={uni.logo} alt={uni.name} className="h-16 object-contain mb-3" />
                      <p className="font-semibold text-gray-900 mb-1">{uni.name}</p>
                      <p className="text-blue-600 text-sm">{uni.rank}</p>
                    </div>
                  </div>
                ))}
              </Slider>
            </motion.div>

            {/* Team Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Meet Our Team</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FaUserTie className="text-2xl text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Counselors</h3>
                    <p className="text-gray-600">
                      Our team includes education experts with years of experience in international admissions 
                      and a deep understanding of global education systems.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FaBook className="text-2xl text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Alumni Network</h3>
                    <p className="text-gray-600">
                      Connect with our global alumni community for valuable insights, mentorship, 
                      and networking opportunities across various industries.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FaFileAlt className="text-2xl text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Proven Success</h3>
                    <p className="text-gray-600">
                      With over 5,000 successful placements in top universities worldwide, 
                      we have a track record of turning educational dreams into reality.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FaEnvelope className="text-2xl text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Continuous Support</h3>
                    <p className="text-gray-600">
                      We provide ongoing assistance even after admission, helping with accommodation, 
                      visa processing, and cultural adaptation.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Testimonials Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Success Stories</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                    <FaQuoteLeft className="text-blue-600 text-xl mb-4" />
                    <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        <p className="text-blue-600 text-sm">{testimonial.university}</p>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <FaStar key={i} className="text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:w-1/3 space-y-8">
            {/* Quick Facts */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Facts</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FaCalendarAlt className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Founded</h3>
                    <p className="text-gray-600">2012</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FaMapMarkerAlt className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Headquarters</h3>
                    <p className="text-gray-600">Abuja, Nigeria</p>
                    <p className="text-sm text-gray-500">Global operations</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FaClock className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Operating Hours</h3>
                    <p className="text-gray-600">Mon-Fri: 9AM - 6PM</p>
                    <p className="text-sm text-gray-500">Sat: 10AM - 4PM</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Video Section */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Story in Motion</h3>
              <div className="video-container rounded-xl overflow-hidden relative bg-gray-900">
                {!isVideoPlaying ? (
                  <div className="aspect-video flex items-center justify-center cursor-pointer" onClick={playVideo}>
                    <div className="text-center">
                      <FaPlayCircle className="text-6xl text-white mb-4 mx-auto" />
                      <p className="text-white font-semibold">Watch Our Story</p>
                    </div>
                  </div>
                ) : (
                  <video 
                    controls 
                    autoPlay
                    className="w-full aspect-video"
                    poster="/video-poster.jpg"
                  >
                    <source src="/testimony1.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            </motion.div>

            {/* FAQ Accordion */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {accordionData.map((item, index) => (
                  <div 
                    key={index}
                    className={`border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 ${
                      activeAccordion === index ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                  >
                    <div 
                      className="flex justify-between items-center p-4 cursor-pointer"
                      onClick={() => toggleAccordion(index)}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="text-blue-600 text-lg" />
                        <h4 className="font-semibold text-gray-800">{item.question}</h4>
                      </div>
                      <span className={`text-blue-600 text-xl transition-transform duration-300 ${
                        activeAccordion === index ? 'rotate-180' : ''
                      }`}>
                        <FaChevronDown />
                      </span>
                    </div>
                    <AnimatePresence>
                      {activeAccordion === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-4 pb-4"
                        >
                          <p className="text-gray-600">{item.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Contact Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-2xl p-12 my-16 text-white"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-blue-100 text-xl max-w-2xl mx-auto">
              Have questions about studying abroad? Our team is here to help you every step of the way.
            </p>
          </div>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-blue-100 mb-2 font-medium">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white focus:border-white placeholder-blue-200 text-white"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-blue-100 mb-2 font-medium">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white focus:border-white placeholder-blue-200 text-white"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-blue-100 mb-2 font-medium">Your Message</label>
              <textarea 
                id="message" 
                rows="5" 
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white focus:border-white placeholder-blue-200 text-white"
                placeholder="How can we help you achieve your educational goals?"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default About;











































// import React, { useState } from "react";
// import styled from "styled-components";
// import { motion } from "framer-motion";
// import Navbar from "../components/shared/Navbar";
// import { FaCheck, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUserTie, FaEnvelope, FaBook, FaFileAlt } from 'react-icons/fa';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// const About = () => {
//   const [activeAccordion, setActiveAccordion] = useState(null);

//   const toggleAccordion = (index) => {
//     setActiveAccordion(activeAccordion === index ? null : index);
//   };

//   const accordionData = [
//     {
//       question: "Who We Are",
//       answer:
//         "Scovers is a leading education platform dedicated to helping students achieve their dreams of studying abroad. We partner with top universities worldwide to provide access to the best educational opportunities.",
//     },
//     {
//       question: "Our Mission",
//       answer:
//         "Our mission is to make studying abroad accessible and stress-free. We provide personalized guidance, from course selection to application submission, ensuring students maximize their potential.",
//     },
//     {
//       question: "Why Choose Us?",
//       answer:
//         "With a network of experienced counselors and partner universities, we offer tailored solutions to meet your educational goals. Our platform simplifies the process, saving you time and effort.",
//     },
//   ];

//   // Slider settings for universities
//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2000,
//     responsive: [
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 2
//         }
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1
//         }
//       }
//     ]
//   };

//   const universities = [
//     { name: 'University of Michigan', logo: '/michigan.png' },
//     { name: 'University of Toronto', logo: '/michigan.png' },
//     { name: 'University of Melbourne', logo: '/michigan.png' },
//     { name: 'University College London', logo: '/michigan.png' },
//     { name: 'University of Edinburgh', logo: '/michigan.png' },
//   ];

//   const benefits = [
//     "Direct interaction with university representatives",
//     "Detailed information about study programs and admission requirements",
//     "Scholarship and funding opportunities",
//     "Visa and accommodation guidance",
//     "Career prospects after graduation",
//     "Q&A session with our education experts",
//     "Exclusive application fee waivers for attendees",
//     "Personalized counseling sessions available"
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 font-sans">
//       <Navbar />
      
//       {/* Hero Section */} 
//       <div className="relative">
//         <div 
//           className="absolute inset-0 bg-[url('/webback.jpg')] bg-cover bg-center"
//           style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
//         ></div>
//         <div className="relative max-w-7xl mx-auto px-4 py-8 md:py-12 flex flex-col justify-center items-start text-left">
//           <h1 className="text-4xl md:text-5xl font-medium text-white mb-4">
//             About Scovers Education
//           </h1>
//           <p className="text-xl text-white max-w-2xl">
//             Your trusted partner in global education and university admissions
//           </p>
//         </div>
//       </div>
//       {/* <div className="relative">
//         <div 
//           className="absolute inset-0 bg-[url('/webback.jpg')] bg-cover bg-center"
//           style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
//         ></div>
//         <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-16 flex flex-col justify-center items-center text-center">
//           <h1 className="text-4xl md:text-5xl font-medium text-white mb-4">
//             About Scovers Education
//           </h1>
//           <p className="text-xl text-white max-w-2xl">
//             Your trusted partner in global education and university admissions
//           </p>
//         </div>
//       </div> */}

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="flex flex-col md:flex-row gap-8">
//           {/* Left Content */}
//           <div className="md:w-2/3">
//             {/* About Us Section */}
//             <div className="bg-[#2D8CD4] text-white p-6 rounded-lg shadow-md mb-8">
//               <h2 className="text-2xl font-medium mb-6">OUR STORY</h2>
//               <p className="text-white mb-4">
//                 Founded in 2012, Scovers has helped thousands of students achieve their dreams of studying abroad. 
//                 We started with a simple mission: to make quality education accessible to everyone, regardless of 
//                 their background or location.
//               </p>
//               <p className="text-white">
//                 Today, we partner with over 200 institutions across 15 countries, offering personalized 
//                 guidance and support throughout the entire application process.
//               </p>
//             </div>

//             {/* Attending Universities */}
//             <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//               <h2 className="text-2xl font-medium text-[#2D8CD4] mb-6">Partner Universities</h2>
//               <Slider {...sliderSettings}>
//                 {universities.map((uni, index) => (
//                   <div key={index} className="px-2">
//                     <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center h-40 justify-center">
//                       <img src={uni.logo} alt={uni.name} className="h-16 object-contain mb-2" />
//                       <p className="text-center font-medium">{uni.name}</p>
//                     </div>
//                   </div>
//                 ))}
//               </Slider>
//             </div>

//             {/* Our Values */}
//             <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//               <h2 className="text-2xl font-medium text-[#2D8CD4] mb-4">Our Values</h2>
//               <div className="space-y-3">
//                 {benefits.slice(0, 5).map((benefit, index) => (
//                   <div key={index} className="flex items-start gap-3">
//                     <FaCheck className="text-[#2D8CD4] mt-1 flex-shrink-0" />
//                     <p className="text-gray-700">{benefit}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Team Section */}
//             <div className="bg-[#2D8CD4]/10 p-6 rounded-lg shadow-md">
//               <h2 className="text-2xl font-medium text-[#2D8CD4] mb-6">Our Team</h2>
//               <div className="grid md:grid-cols-2 gap-6">
//                 <div className="flex items-start gap-4">
//                   <FaUserTie className="text-[#2D8CD4] mt-1 text-xl" />
//                   <div>
//                     <h3 className="font-medium mb-2 text-lg">Experienced Counselors</h3>
//                     <p className="text-gray-700">Our team includes education experts with years of experience in international admissions.</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-4">
//                   <FaBook className="text-[#2D8CD4] mt-1 text-xl" />
//                   <div>
//                     <h3 className="font-medium mb-2 text-lg">Alumni Network</h3>
//                     <p className="text-gray-700">Connect with our global alumni community for insights and mentorship.</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-4">
//                   <FaFileAlt className="text-[#2D8CD4] mt-1 text-xl" />
//                   <div>
//                     <h3 className="font-medium mb-2 text-lg">Success Stories</h3>
//                     <p className="text-gray-700">Over 5,000 successful placements in top universities worldwide.</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-4">
//                   <FaEnvelope className="text-[#2D8CD4] mt-1 text-xl" />
//                   <div>
//                     <h3 className="font-medium mb-2 text-lg">Continuous Support</h3>
//                     <p className="text-gray-700">We provide ongoing assistance even after you've secured admission.</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Sidebar */}
//           <div className="md:w-1/3">
//             {/* Quick Facts */}
//             <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//               <h3 className="text-2xl font-medium text-[#2D8CD4] mb-6">Quick Facts</h3>
//               <div className="space-y-4">
//                 <div className="flex items-start gap-3">
//                   <FaCalendarAlt className="text-[#2D8CD4] mt-1" />
//                   <div>
//                     <h3 className="text-lg font-medium mb-1">Founded</h3>
//                     <p className="text-gray-700">2012</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <FaMapMarkerAlt className="text-[#2D8CD4] mt-1" />
//                   <div>
//                     <h3 className="text-lg font-medium mb-1">Headquarters</h3>
//                     <p className="text-gray-700">Abuja, Nigeria</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <FaClock className="text-[#2D8CD4] mt-1" />
//                   <div>
//                     <h3 className="text-lg font-medium mb-1">Operating Hours</h3>
//                     <p className="text-gray-700">Mon-Fri: 10AM - 4PM</p>
//                     <p className="text-sm text-gray-500">Sat: 10AM - 4PM</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Video Section */}
//             <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//               <h3 className="text-2xl font-medium text-[#2D8CD4] mb-4">Our Story</h3>
//               <div className="video-container rounded-lg overflow-hidden">
//                 <video 
//                   controls 
//                   className="w-full"
//                   poster="/video-poster.jpg"
//                 >
//                   <source src="/testimony1.mp4" type="video/mp4" />
//                   Your browser does not support the video tag.
//                 </video>
//               </div>
//             </div>

//             {/* FAQ Accordion */}
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-2xl font-medium text-[#2D8CD4] mb-6">FAQs</h3>
//               <div className="space-y-4">
//                 {accordionData.map((item, index) => (
//                   <div 
//                     key={index}
//                     className={`border-b border-gray-200 pb-4 ${activeAccordion === index ? 'active' : ''}`}
//                   >
//                     <div 
//                       className="flex justify-between items-center cursor-pointer"
//                       onClick={() => toggleAccordion(index)}
//                     >
//                       <h4 className="font-medium text-gray-800">{item.question}</h4>
//                       <span className="text-[#2D8CD4] text-xl">
//                         {activeAccordion === index ? '-' : '+'}
//                       </span>
//                     </div>
//                     {activeAccordion === index && (
//                       <motion.p 
//                         className="text-gray-600 mt-2"
//                         initial={{ opacity: 0, height: 0 }}
//                         animate={{ opacity: 1, height: 'auto' }}
//                         transition={{ duration: 0.3 }}
//                       >
//                         {item.answer}
//                       </motion.p>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Contact Section */}
//         <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md my-12">
//           <h2 className="text-3xl font-medium text-[#2D8CD4] text-center mb-6">Contact Us</h2>
//           <p className="text-center text-gray-600 mb-8">
//             Have questions about studying abroad? Our team is here to help you every step of the way.
//           </p>
//           <form className="space-y-6">
//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <label htmlFor="name" className="block text-gray-700 mb-2">Full Name</label>
//                 <input 
//                   type="text" 
//                   id="name" 
//                   className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2D8CD4]"
//                   placeholder="Your name"
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
//                 <input 
//                   type="email" 
//                   id="email" 
//                   className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2D8CD4]"
//                   placeholder="Your email"
//                   required
//                 />
//               </div>
//             </div>
//             <div>
//               <label htmlFor="message" className="block text-gray-700 mb-2">Your Message</label>
//               <textarea 
//                 id="message" 
//                 rows="5" 
//                 className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2D8CD4]"
//                 placeholder="How can we help you?"
//                 required
//               ></textarea>
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-[#2D8CD4] hover:bg-[#1A5F8B] text-white font-medium py-3 px-6 rounded-lg transition-colors"
//             >
//               Send Message
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default About;






















// // import React, { useState } from "react";
// // import styled from "styled-components";
// // import { motion } from "framer-motion";
// // import Navbar from "../components/shared/Navbar";

// // const About = () => {
// //   const [activeAccordion, setActiveAccordion] = useState(null);

// //   const toggleAccordion = (index) => {
// //     setActiveAccordion(activeAccordion === index ? null : index);
// //   };

// //   const accordionData = [
// //     {
// //       question: "Who We Are",
// //       answer:
// //         "Scovers is a leading education platform dedicated to helping students achieve their dreams of studying abroad. We partner with top universities worldwide to provide access to the best educational opportunities.",
// //     },
// //     {
// //       question: "Our Mission",
// //       answer:
// //         "Our mission is to make studying abroad accessible and stress-free. We provide personalized guidance, from course selection to application submission, ensuring students maximize their potential.",
// //     },
// //     {
// //       question: "Why Choose Us?",
// //       answer:
// //         "With a network of experienced counselors and partner universities, we offer tailored solutions to meet your educational goals. Our platform simplifies the process, saving you time and effort.",
// //     },
// //   ];

// //   return (
// //     <>
// //       <Navbar />
// //       <Wrapper>
// //         {/* Image Banner Section */}
// //         <BannerSection>
// //           <div className="banner-content">
// //             {/* <h1>About Us</h1> */}
// //           </div>
// //         </BannerSection>

// //         {/* About Us Text Section */}
// //         <AboutTextSection>
// //           <h2>Welcome to Scovers</h2>
// //           <p>
// //             Scovers is a leading education platform dedicated to helping students achieve their dreams of studying abroad. We partner with top universities worldwide to provide access to the best educational opportunities. Our mission is to make studying abroad accessible and stress-free. We provide personalized guidance, from course selection to application submission, ensuring students maximize their potential.
// //           </p>
// //         </AboutTextSection>

// //         {/* Video Section with iframe */}
// //         <VideoSection>
// //           <div className="video-container">
// //             <iframe
// //               className="video"
// //               src="/testimony1.mp4"
// //               title="Testimonial Video"
// //               frameBorder="0"
// //               allow="autoplay; fullscreen"
// //             ></iframe>
// //           </div>
// //         </VideoSection>

// //         {/* Accordion Section */}
// //         <AccordionSection>
// //           <h2>Frequently Asked Questions</h2>
// //           <div className="accordion">
// //             {accordionData.map((item, index) => (
// //               <div
// //                 key={index}
// //                 className={`accordion-item ${
// //                   activeAccordion === index ? "active" : ""
// //                 }`}
// //                 onClick={() => toggleAccordion(index)}
// //               >
// //                 <div className="accordion-question">
// //                   <h3>{item.question}</h3>
// //                   <span>{activeAccordion === index ? "-" : "+"}</span>
// //                 </div>
// //                 {activeAccordion === index && (
// //                   <motion.div
// //                     className="accordion-answer"
// //                     initial={{ opacity: 0, height: 0 }}
// //                     animate={{ opacity: 1, height: "auto" }}
// //                     transition={{ duration: 0.3 }}
// //                   >
// //                     <p>{item.answer}</p>
// //                   </motion.div>
// //                 )}
// //               </div>
// //             ))}
// //           </div>
// //         </AccordionSection>

// //         {/* Contact Form Section */}
// //         <ContactSection>
// //           <h2>Contact Us</h2>
// //           <p>Have questions? Reach out to us, and we'll be happy to assist you.</p>
// //           <form className="contact-form">
// //             <div className="form-group">
// //               <input type="text" placeholder="Your Name" required />
// //             </div>
// //             <div className="form-group">
// //               <input type="email" placeholder="Your Email" required />
// //             </div>
// //             <div className="form-group">
// //               <textarea placeholder="Your Message" rows="5" required></textarea>
// //             </div>
// //             <button type="submit" className="submit-button">
// //               Send Message
// //             </button>
// //           </form>
// //         </ContactSection>
// //       </Wrapper>
// //     </>
// //   );
// // };

// // // Styled Components
// // const Wrapper = styled.div`
// //   width: 100%;
// //   max-width: 1200px;
// //   margin: 0 auto;
// //   padding: 0 20px;

// //   @media (max-width: 768px) {
// //     padding: 0 10px;
// //   }
// // `;

// // const BannerSection = styled.section`
// //   position: relative;
// //   height: 200px; /* Reduced height */
// //   background-image: url("/about.jpg");
// //   background-size: cover;
// //   background-position: center;
// //   overflow: hidden;
// //   width: 100%; /* Ensure it spans the full width */

// //   &::before {
// //     content: "";
// //     position: absolute;
// //     top: 0;
// //     left: 0;
// //     width: 100%;
// //     height: 100%;
// //     background-color: rgba(0, 0, 0, 0.5); /* Adjust opacity here */
// //   }

// //   .banner-content {
// //     position: absolute;
// //     top: 50%;
// //     left: 50%;
// //     transform: translate(-50%, -50%);
// //     text-align: center;
// //     color: white;
// //     z-index: 1;

// //     h1 {
// //       font-size: 2.5rem; /* Adjusted font size */
// //       margin: 0;
// //     }
// //   }

// //   @media (max-width: 768px) {
// //     height: 150px;

// //     .banner-content h1 {
// //       font-size: 2rem;
// //     }
// //   }
// // `;

// // const AboutTextSection = styled.section`
// //   margin: 40px 0;
// //   text-align: center;

// //   h2 {
// //     font-size: 2rem;
// //     margin-bottom: 20px;
// //   }

// //   p {
// //     font-size: 1rem;
// //     color: #555;
// //     line-height: 1.6;
// //     max-width: 800px;
// //     margin: 0 auto;
// //   }

// //   @media (max-width: 768px) {
// //     margin: 20px 0;

// //     h2 {
// //       font-size: 1.8rem;
// //     }

// //     p {
// //       font-size: 0.9rem;
// //     }
// //   }
// // `;

// // const VideoSection = styled.section`
// //   margin: 40px 0;

// //   .video-container {
// //     max-width: 800px;
// //     margin: 0 auto;
// //     border-radius: 10px;
// //     overflow: hidden;
// //     box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
// //   }

// //   .video {
// //     width: 100%;
// //     height: 450px;
// //   }

// //   @media (max-width: 768px) {
// //     .video {
// //       height: 300px;
// //     }
// //   }
// // `;

// // const AccordionSection = styled.section`
// //   margin: 40px 0;

// //   h2 {
// //     text-align: center;
// //     font-size: 2rem;
// //     margin-bottom: 20px;
// //   }

// //   .accordion {
// //     max-width: 800px;
// //     margin: 0 auto;
// //   }

// //   .accordion-item {
// //     border-bottom: 1px solid #ddd;
// //     padding: 15px 0;
// //     cursor: pointer;
// //   }

// //   .accordion-question {
// //     display: flex;
// //     justify-content: space-between;
// //     align-items: center;

// //     h3 {
// //       font-size: 1.2rem;
// //       margin: 0;
// //     }

// //     span {
// //       font-size: 1.5rem;
// //     }
// //   }

// //   .accordion-answer {
// //     padding-top: 10px;
// //     p {
// //       margin: 0;
// //       color: #555;
// //     }
// //   }

// //   @media (max-width: 768px) {
// //     h2 {
// //       font-size: 1.8rem;
// //     }

// //     .accordion-question h3 {
// //       font-size: 1rem;
// //     }
// //   }
// // `;

// // const ContactSection = styled.section`
// //   margin: 40px 0;

// //   h2 {
// //     text-align: center;
// //     font-size: 2rem;
// //     margin-bottom: 10px;
// //   }

// //   p {
// //     text-align: center;
// //     color: #555;
// //     margin-bottom: 20px;
// //   }

// //   .contact-form {
// //     max-width: 600px;
// //     margin: 0 auto;
// //     padding: 20px;
// //     background: #f9f9f9;
// //     border-radius: 10px;
// //     box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
// //   }

// //   .form-group {
// //     margin-bottom: 15px;

// //     input,
// //     textarea {
// //       width: 100%;
// //       padding: 10px;
// //       border: 1px solid #ddd;
// //       border-radius: 5px;
// //       font-size: 1rem;
// //     }

// //     textarea {
// //       resize: vertical;
// //     }
// //   }

// //   .submit-button {
// //     width: 100%;
// //     padding: 10px;
// //     background: #247bf7;
// //     color: white;
// //     border: none;
// //     border-radius: 5px;
// //     font-size: 1rem;
// //     cursor: pointer;
// //     transition: background 0.3s ease;

// //     &:hover {
// //       background: #1a5bbf;
// //     }
// //   }

// //   @media (max-width: 768px) {
// //     h2 {
// //       font-size: 1.8rem;
// //     }

// //     p {
// //       font-size: 0.9rem;
// //     }

// //     .contact-form {
// //       padding: 15px;
// //     }

// //     .form-group input,
// //     .form-group textarea {
// //       font-size: 0.9rem;
// //     }
// //   }
// // `;

// // export default About;

