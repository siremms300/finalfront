import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaMapMarkerAlt, FaUniversity, FaGraduationCap, FaMoneyBillWave, FaGlobeAmericas, FaCalendarAlt, FaComments } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "../components/shared/Navbar";

const Visitor = () => {
  const [activeInstitution, setActiveInstitution] = useState(null);
  const [countryFilter, setCountryFilter] = useState('All');
  const [selectedForComparison, setSelectedForComparison] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [visibleInstitutions, setVisibleInstitutions] = useState(4);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    preferredCourse: "",
    institutionInterest: ""
  });

  const toggleInstitution = (index) => {
    setActiveInstitution(activeInstitution === index ? null : index);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your interest! We'll contact you shortly.");
    setFormData({
      fullName: "",
      email: "",
      phoneNumber: "",
      preferredCourse: "",
      institutionInterest: ""
    });
  };

  const toggleComparison = (institutionId) => {
    setSelectedForComparison(prev => 
      prev.includes(institutionId) 
        ? prev.filter(id => id !== institutionId) 
        : [...prev, institutionId]
    );
  };

  const loadMoreInstitutions = () => {
    setVisibleInstitutions(prev => prev + 4);
  };

  // Slider settings for featured institutions
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  const institutions = [
    {
      id: 1,
      name: "University of Michigan",
      location: "Ann Arbor, Michigan, USA",
      country: "USA",
      logo: "/michigan.png",
      about: "A premier public research university known for its academic excellence, vibrant campus life, and strong alumni network.",
      scholarships: "Merit-based scholarships available for international students ranging from $5,000 to full tuition.",
      programs: "300+ undergraduate and graduate programs across 19 schools and colleges.",
      deadline: "February 1 for fall admission",
      ranking: "#23 in National Universities (U.S. News 2023)",
      hotDeal: true,
      specialOffer: "Application fee waiver for early applicants"
    },
    {
      id: 2,
      name: "University of Toronto",
      location: "Toronto, Ontario, Canada",
      country: "Canada",
      logo: "/michigan.png",
      about: "Canada's leading institution of learning, discovery and knowledge creation with a diverse urban campus.",
      scholarships: "Lester B. Pearson International Scholarship (full tuition + living expenses), President's Scholars awards.",
      programs: "700+ undergraduate and 200+ graduate programs across three campuses.",
      deadline: "January 15 for most programs",
      ranking: "#1 in Canada, #18 globally (Times Higher Education 2023)",
      hotDeal: false
    },
    {
      id: 3,
      name: "University of Melbourne",
      location: "Melbourne, Victoria, Australia",
      country: "Australia",
      logo: "/michigan.png",
      about: "Australia's #1 university with a 160-year history of excellence in teaching and research.",
      scholarships: "International Undergraduate Scholarships (up to $56,000), Graduate Research Scholarships.",
      programs: "Broad range of programs with strong focus on research-led education.",
      deadline: "October 31 for Semester 1 intake",
      ranking: "#1 in Australia, #34 globally (QS 2024)",
      hotDeal: true,
      specialOffer: "Priority visa processing for webinar attendees"
    },
    {
      id: 4,
      name: "University College London",
      location: "London, United Kingdom",
      country: "UK",
      logo: "/michigan.png",
      about: "World-class university in the heart of London with a progressive approach to teaching and research.",
      scholarships: "UCL Global Undergraduate Scholarship, Chevening Scholarships, Commonwealth Scholarships.",
      programs: "400+ undergraduate and 600+ taught graduate programs.",
      deadline: "January 26 for most undergraduate courses",
      ranking: "#9 in the world (QS 2024)",
      hotDeal: false
    },
    {
      id: 5,
      name: "University of Edinburgh",
      location: "Edinburgh, Scotland",
      country: "UK",
      logo: "/michigan.png",
      about: "One of the world's top universities with a rich history dating back to 1583.",
      scholarships: "Edinburgh Global Undergraduate Scholarships, GREAT Scholarships.",
      programs: "500+ undergraduate and 300+ postgraduate programs.",
      deadline: "June 30 for most undergraduate programs",
      ranking: "#22 in the world (QS 2024)",
      hotDeal: true,
      specialOffer: "£2,000 early enrollment bonus"
    },
    {
      id: 6,
      name: "ETH Zurich",
      location: "Zurich, Switzerland",
      country: "Europe",
      logo: "/michigan.png",
      about: "World-leading university in science and technology with 21 Nobel Prize laureates.",
      scholarships: "Excellence Scholarship & Opportunity Programme (ESOP) for master's students.",
      programs: "Strong focus on STEM fields with excellent research facilities.",
      deadline: "December 15 for autumn semester",
      ranking: "#7 in Engineering & Technology (QS 2023)",
      hotDeal: false
    },
    {
      id: 7,
      name: "National University of Singapore",
      location: "Singapore",
      country: "Asia",
      logo: "/michigan.png",
      about: "Asia's top university with a global approach to education and research.",
      scholarships: "NUS Global Merit Scholarship, ASEAN Undergraduate Scholarship.",
      programs: "Diverse programs with strong emphasis on interdisciplinary learning.",
      deadline: "March 3 for most undergraduate programs",
      ranking: "#8 in the world (QS 2024)",
      hotDeal: true,
      specialOffer: "Guaranteed on-campus accommodation"
    },
    {
      id: 8,
      name: "Harvard University",
      location: "Cambridge, Massachusetts, USA",
      country: "USA",
      logo: "/michigan.png",
      about: "Ivy League university renowned for its excellence in teaching, learning, and research.",
      scholarships: "Need-based financial aid for all students, including international students.",
      programs: "50 undergraduate majors and 134 graduate degree programs.",
      deadline: "January 1 for regular decision",
      ranking: "#2 in National Universities (U.S. News 2023)",
      hotDeal: false
    }
  ];

  const filteredInstitutions = countryFilter === 'All' 
    ? institutions 
    : institutions.filter(inst => inst.country === countryFilter);

  const displayedInstitutions = filteredInstitutions.slice(0, visibleInstitutions);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      
      {/* Hero Section with Image Background */}
      <div className="relative">
        <div 
          className="absolute inset-0 bg-[url('/webback.jpg')] bg-cover bg-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 py-8 md:py-12 flex flex-col justify-center items-start text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Find Your Dream University
          </h1>
          <p className="text-xl text-white max-w-2xl">
            Explore our partner institutions and get personalized guidance for your international education journey
          </p>
        </div>
      </div>

      {/* Key Statistics */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "200+", label: "Partner Institutions" },
            { value: "95%", label: "Admission Success" },
            { value: "$50M+", label: "Scholarships Secured" },
            { value: "24h", label: "Response Time" }
          ].map((stat, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow text-center">
              <p className="text-2xl font-bold text-[#2D8CD4]">{stat.value}</p>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Content - Institutions */}
          <div className="lg:w-2/3">
 
          {/* Comparison Tool Explanation */}
          {/* <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-xl font-bold text-[#2D8CD4] mb-4">Compare Institutions</h3>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <p className="text-gray-700">
                  Our comparison tool helps you evaluate different institutions side by side. 
                  Simply click the "Compare" button on any institution card to add it to your comparison list. 
                  You can compare up to 4 institutions at once on key factors like rankings, scholarships, 
                  and application deadlines.
                </p>
              </div>
            </div> */}

 

            {/* Featured Institutions Slider */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-2xl font-bold text-[#2D8CD4] mb-6">Featured Institutions</h2>
              <Slider {...sliderSettings}>
                {institutions.slice(0, 5).map((institution) => (
                  <div key={institution.id} className="px-2">
                    <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center h-full relative">
                      {institution.hotDeal && (
                        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          Special Offer
                        </span>
                      )}
                      <img 
                        src={institution.logo} 
                        alt={institution.name} 
                        className="h-20 object-contain mb-4"
                      />
                      <h3 className="text-lg font-bold text-center mb-2">{institution.name}</h3>
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <FaMapMarkerAlt className="mr-1" />
                        <span>{institution.location}</span>
                      </div>
                      <button 
                        onClick={() => document.getElementById(`institution-${institution.id}`).scrollIntoView({ behavior: 'smooth' })}
                        className="mt-auto bg-[#2D8CD4] hover:bg-[#1A5F8B] text-white py-2 px-4 rounded text-sm transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>

            {/* Country Filters */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-700 mb-3">Filter by Country:</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setCountryFilter('All')}
                  className={`px-4 py-1 rounded-full ${
                    countryFilter === 'All' 
                      ? 'bg-[#2D8CD4] text-white' 
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  All Countries
                </button>
                {['USA', 'Canada', 'UK', 'Australia', 'Europe', 'Asia'].map(country => (
                  <button
                    key={country}
                    onClick={() => setCountryFilter(country)}
                    className={`px-4 py-1 rounded-full ${
                      countryFilter === country 
                        ? 'bg-[#2D8CD4] text-white' 
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {country}
                  </button>
                ))}
              </div>
            </div>

            

            {/* Comparison Tool */}
            {selectedForComparison.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-md mb-8" id="comparison-tool">
                <h3 className="text-xl font-bold text-[#2D8CD4] mb-4">Your Comparison ({selectedForComparison.length}/4)</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="text-left py-2">Criteria</th>
                        {selectedForComparison.map(id => {
                          const uni = institutions.find(u => u.id === id);
                          return (
                            <th key={id} className="text-left py-2">
                              <div className="flex items-center justify-between">
                                {uni.name}
                                <button 
                                  onClick={() => toggleComparison(id)}
                                  className="ml-2 text-red-500"
                                >
                                  ×
                                </button>
                              </div>
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {['ranking', 'scholarships', 'deadline'].map(criteria => (
                        <tr key={criteria} className="border-t">
                          <td className="py-3 capitalize font-medium">{criteria}</td>
                          {selectedForComparison.map(id => {
                            const uni = institutions.find(u => u.id === id);
                            return (
                              <td key={`${id}-${criteria}`} className="py-3">
                                {uni[criteria]}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* All Institutions List */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-[#2D8CD4] mb-6">
                {countryFilter === 'All' ? 'All Partner Institutions' : `${countryFilter} Institutions`}
                <span className="text-sm font-normal text-gray-500 ml-2">
                  (Showing {displayedInstitutions.length} of {filteredInstitutions.length})
                </span>
              </h2> 
              <p className='text-gray-500 pb-10'>Click on a university to view the university details or click the "Compare" button on any institution card to add it to your comparison list. 
                  You can compare up to 4 institutions at once on key factors like rankings, scholarships, 
                  and application deadlines. After clicking, scroll up to view comparison.</p>
              <div className="space-y-4">
                {displayedInstitutions.map((institution, index) => (
                  <div 
                    key={institution.id} 
                    id={`institution-${institution.id}`}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <div 
                      className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 hover:bg-gray-100"
                      onClick={() => toggleInstitution(index)}
                    >
                      <div className="flex items-center">
                        <img 
                          src={institution.logo} 
                          alt={institution.name} 
                          className="h-12 w-12 object-contain mr-4"
                        />
                        <div>
                          <h3 className="font-bold">{institution.name}</h3>
                          <p className="text-sm text-gray-600 flex items-center">
                            <FaMapMarkerAlt className="mr-1" />
                            {institution.location}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleComparison(institution.id);
                          }}
                          className={`mr-4 px-3 py-1 rounded-full text-xs ${
                            selectedForComparison.includes(institution.id)
                              ? 'bg-[#2D8CD4] text-white'
                              : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          {selectedForComparison.includes(institution.id) 
                            ? "View Comparison ↑" 
                            : "Compare"}
                        </button>
                        {activeInstitution === index ? (
                          <FaChevronUp className="text-[#2D8CD4]" />
                        ) : (
                          <FaChevronDown className="text-[#2D8CD4]" />
                        )}
                      </div>
                    </div>
                    {activeInstitution === index && (
                      <div className="p-4 bg-white border-t border-gray-200">
                        {institution.hotDeal && (
                          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4">
                            <p className="font-medium text-yellow-800">Special Offer: {institution.specialOffer}</p>
                          </div>
                        )}
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-bold mb-2 flex items-center">
                              <FaUniversity className="mr-2 text-[#2D8CD4]" />
                              About the University
                            </h4>
                            <p className="text-gray-700 mb-4">{institution.about}</p>
                            
                            <h4 className="font-bold mb-2 flex items-center">
                              <FaGraduationCap className="mr-2 text-[#2D8CD4]" />
                              Programs Offered
                            </h4>
                            <p className="text-gray-700">{institution.programs}</p>
                          </div>
                          <div>
                            <h4 className="font-bold mb-2 flex items-center">
                              <FaMoneyBillWave className="mr-2 text-[#2D8CD4]" />
                              Scholarship Availability
                            </h4>
                            <p className="text-gray-700 mb-4">{institution.scholarships}</p>
                            
                            <h4 className="font-bold mb-2 flex items-center">
                              <FaCalendarAlt className="mr-2 text-[#2D8CD4]" />
                              Application Deadline
                            </h4>
                            <p className="text-gray-700 mb-4">{institution.deadline}</p>
                            
                            <h4 className="font-bold mb-2 flex items-center">
                              <FaGlobeAmericas className="mr-2 text-[#2D8CD4]" />
                              Global Ranking
                            </h4>
                            <p className="text-gray-700">{institution.ranking}</p>
                          </div>
                        </div>
                        <div className="mt-6 flex justify-between items-center">
                          <button
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                institutionInterest: institution.name
                              }));
                              document.getElementById('interest-form').scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="bg-[#2D8CD4] hover:bg-[#1A5F8B] text-white py-2 px-6 rounded transition-colors"
                          >
                            Express Interest
                          </button>
                          {selectedForComparison.includes(institution.id) && (
                            <span className="text-sm text-gray-500">
                              Added to comparison
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {visibleInstitutions < filteredInstitutions.length && (
                <div className="mt-6 text-center">
                  <button
                    onClick={loadMoreInstitutions}
                    className="bg-white border border-[#2D8CD4] text-[#2D8CD4] hover:bg-[#2D8CD4] hover:text-white py-2 px-6 rounded-lg transition-colors"
                  >
                    Show More Institutions
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - Interest Form */}
          <div className="lg:w-1/3" id="interest-form">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
              <h2 className="text-2xl font-bold text-[#2D8CD4] mb-6">Express Your Interest</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Your full name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D8CD4]"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your email address"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D8CD4]"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Your phone number"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D8CD4]"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="preferredCourse" className="block text-gray-700 mb-1">Preferred Course/Program</label>
                  <input
                    type="text"
                    id="preferredCourse"
                    name="preferredCourse"
                    placeholder="e.g. Computer Science, MBA"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D8CD4]"
                    value={formData.preferredCourse}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="institutionInterest" className="block text-gray-700 mb-1">Institution of Interest</label>
                  <select
                    id="institutionInterest"
                    name="institutionInterest"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D8CD4]"
                    value={formData.institutionInterest}
                    onChange={handleChange}
                  >
                    <option value="">Select an institution</option>
                    {institutions.map(institution => (
                      <option key={institution.id} value={institution.name}>
                        {institution.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#2D8CD4] hover:bg-[#1A5F8B] text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Submit Interest Form
                </button>

                <p className="text-sm text-gray-500">
                  By submitting this form, you agree to our privacy policy and consent to being contacted by our counselors.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Live Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => setShowChat(!showChat)}
          className="bg-[#2D8CD4] hover:bg-[#1A5F8B] text-white rounded-full p-4 shadow-lg flex items-center transition-all"
        >
          <FaComments className="text-xl" />
        </button>
        
        {showChat && (
          <div className="absolute bottom-full right-0 mb-4 w-80 bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="bg-[#2D8CD4] text-white p-3">
              <h3 className="font-bold">Chat with our counselors</h3>
            </div>
            <div className="p-4 h-64 overflow-y-auto">
              <div className="bg-gray-100 p-3 rounded-lg mb-2">
                <p>Hello! How can we help you today?</p>
              </div>
              <p className="text-sm text-gray-500 text-center my-4">Chat connected</p>
            </div>
            <div className="p-3 border-t">
              <input 
                type="text" 
                placeholder="Type your message..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D8CD4]"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Visitor;











// import React, { useState } from "react";
// import { FaChevronDown, FaChevronUp, FaMapMarkerAlt, FaUniversity, FaGraduationCap, FaMoneyBillWave, FaGlobeAmericas, FaCalendarAlt, FaComments } from "react-icons/fa";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Navbar from "../components/shared/Navbar";

// const Visitor = () => {
//   const [activeInstitution, setActiveInstitution] = useState(null);
//   const [countryFilter, setCountryFilter] = useState('All');
//   const [selectedForComparison, setSelectedForComparison] = useState([]);
//   const [showChat, setShowChat] = useState(false);
//   const [visibleInstitutions, setVisibleInstitutions] = useState(4);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phoneNumber: "",
//     preferredCourse: "",
//     institutionInterest: ""
//   });

//   const toggleInstitution = (index) => {
//     setActiveInstitution(activeInstitution === index ? null : index);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form submitted:", formData);
//     alert("Thank you for your interest! We'll contact you shortly.");
//     setFormData({
//       fullName: "",
//       email: "",
//       phoneNumber: "",
//       preferredCourse: "",
//       institutionInterest: ""
//     });
//   };

//   const toggleComparison = (institutionId) => {
//     setSelectedForComparison(prev => 
//       prev.includes(institutionId) 
//         ? prev.filter(id => id !== institutionId) 
//         : [...prev, institutionId]
//     );
//   };

//   const loadMoreInstitutions = () => {
//     setVisibleInstitutions(prev => prev + 4);
//   };

//   // Slider settings for featured institutions
//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2
//         }
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 1
//         }
//       }
//     ]
//   };

//   const institutions = [
//     {
//       id: 1,
//       name: "University of Michigan",
//       location: "Ann Arbor, Michigan, USA",
//       country: "USA",
//       logo: "/michigan.png",
//       about: "A premier public research university known for its academic excellence, vibrant campus life, and strong alumni network.",
//       scholarships: "Merit-based scholarships available for international students ranging from $5,000 to full tuition.",
//       programs: "300+ undergraduate and graduate programs across 19 schools and colleges.",
//       deadline: "February 1 for fall admission",
//       ranking: "#23 in National Universities (U.S. News 2023)",
//       hotDeal: true,
//       specialOffer: "Application fee waiver for early applicants"
//     },
//     {
//       id: 2,
//       name: "University of Toronto",
//       location: "Toronto, Ontario, Canada",
//       country: "Canada",
//       logo: "/michigan.png",
//       about: "Canada's leading institution of learning, discovery and knowledge creation with a diverse urban campus.",
//       scholarships: "Lester B. Pearson International Scholarship (full tuition + living expenses), President's Scholars awards.",
//       programs: "700+ undergraduate and 200+ graduate programs across three campuses.",
//       deadline: "January 15 for most programs",
//       ranking: "#1 in Canada, #18 globally (Times Higher Education 2023)",
//       hotDeal: false
//     },
//     {
//       id: 3,
//       name: "University of Melbourne",
//       location: "Melbourne, Victoria, Australia",
//       country: "Australia",
//       logo: "/michigan.png",
//       about: "Australia's #1 university with a 160-year history of excellence in teaching and research.",
//       scholarships: "International Undergraduate Scholarships (up to $56,000), Graduate Research Scholarships.",
//       programs: "Broad range of programs with strong focus on research-led education.",
//       deadline: "October 31 for Semester 1 intake",
//       ranking: "#1 in Australia, #34 globally (QS 2024)",
//       hotDeal: true,
//       specialOffer: "Priority visa processing for webinar attendees"
//     },
//     {
//       id: 4,
//       name: "University College London",
//       location: "London, United Kingdom",
//       country: "UK",
//       logo: "/michigan.png",
//       about: "World-class university in the heart of London with a progressive approach to teaching and research.",
//       scholarships: "UCL Global Undergraduate Scholarship, Chevening Scholarships, Commonwealth Scholarships.",
//       programs: "400+ undergraduate and 600+ taught graduate programs.",
//       deadline: "January 26 for most undergraduate courses",
//       ranking: "#9 in the world (QS 2024)",
//       hotDeal: false
//     },
//     {
//       id: 5,
//       name: "University of Edinburgh",
//       location: "Edinburgh, Scotland",
//       country: "UK",
//       logo: "/michigan.png",
//       about: "One of the world's top universities with a rich history dating back to 1583.",
//       scholarships: "Edinburgh Global Undergraduate Scholarships, GREAT Scholarships.",
//       programs: "500+ undergraduate and 300+ postgraduate programs.",
//       deadline: "June 30 for most undergraduate programs",
//       ranking: "#22 in the world (QS 2024)",
//       hotDeal: true,
//       specialOffer: "£2,000 early enrollment bonus"
//     },
//     {
//       id: 6,
//       name: "ETH Zurich",
//       location: "Zurich, Switzerland",
//       country: "Europe",
//       logo: "/michigan.png",
//       about: "World-leading university in science and technology with 21 Nobel Prize laureates.",
//       scholarships: "Excellence Scholarship & Opportunity Programme (ESOP) for master's students.",
//       programs: "Strong focus on STEM fields with excellent research facilities.",
//       deadline: "December 15 for autumn semester",
//       ranking: "#7 in Engineering & Technology (QS 2023)",
//       hotDeal: false
//     },
//     {
//       id: 7,
//       name: "National University of Singapore",
//       location: "Singapore",
//       country: "Asia",
//       logo: "/michigan.png",
//       about: "Asia's top university with a global approach to education and research.",
//       scholarships: "NUS Global Merit Scholarship, ASEAN Undergraduate Scholarship.",
//       programs: "Diverse programs with strong emphasis on interdisciplinary learning.",
//       deadline: "March 3 for most undergraduate programs",
//       ranking: "#8 in the world (QS 2024)",
//       hotDeal: true,
//       specialOffer: "Guaranteed on-campus accommodation"
//     }
//   ];

//   // const filteredInstitutions = countryFilter === 'All' 
//   //   ? institutions 
//   //   : institutions.filter(inst => inst.country === countryFilter);

//   const filteredInstitutions = countryFilter === 'All' 
//     ? institutions 
//     : institutions.filter(inst => inst.country === countryFilter);

//   const displayedInstitutions = filteredInstitutions.slice(0, visibleInstitutions);

//   return (
//     <div className="min-h-screen bg-gray-50 font-sans">
//       <Navbar />
      
//       {/* Hero Section with Image Background */}
//       <div className="relative">
//         <div 
//           className="absolute inset-0 bg-[url('/webback.jpg')] bg-cover bg-center"
//           style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
//         ></div>
//         <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-16 flex flex-col justify-center items-start text-left">
//           <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
//             Find Your Dream University
//           </h1>
//           <p className="text-xl text-white max-w-2xl">
//             Explore our partner institutions and get personalized guidance for your international education journey
//           </p>
//         </div>
//       </div>

//       {/* Key Statistics */}
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {[
//             { value: "200+", label: "Partner Institutions" },
//             { value: "95%", label: "Admission Success" },
//             { value: "$50M+", label: "Scholarships Secured" },
//             { value: "24h", label: "Response Time" }
//           ].map((stat, index) => (
//             <div key={index} className="bg-white p-4 rounded-lg shadow text-center">
//               <p className="text-2xl font-bold text-[#2D8CD4]">{stat.value}</p>
//               <p className="text-gray-600">{stat.label}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Left Content - Institutions */}
//           <div className="lg:w-2/3">
//             {/* Featured Institutions Slider */}
//             <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//               <h2 className="text-2xl font-bold text-[#2D8CD4] mb-6">Featured Institutions</h2>
//               <Slider {...sliderSettings}>
//                 {institutions.slice(0, 5).map((institution) => (
//                   <div key={institution.id} className="px-2">
//                     <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center h-full relative">
//                       {institution.hotDeal && (
//                         <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
//                           Special Offer
//                         </span>
//                       )}
//                       <img 
//                         src={institution.logo} 
//                         alt={institution.name} 
//                         className="h-20 object-contain mb-4"
//                       />
//                       <h3 className="text-lg font-bold text-center mb-2">{institution.name}</h3>
//                       <div className="flex items-center text-sm text-gray-600 mb-3">
//                         <FaMapMarkerAlt className="mr-1" />
//                         <span>{institution.location}</span>
//                       </div>
//                       <button 
//                         onClick={() => document.getElementById(`institution-${institution.id}`).scrollIntoView({ behavior: 'smooth' })}
//                         className="mt-auto bg-[#2D8CD4] hover:bg-[#1A5F8B] text-white py-2 px-4 rounded text-sm transition-colors"
//                       >
//                         View Details
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </Slider>
//             </div> 



//             {/* Country Filters */}
//             <div className="mb-6">
//               <h3 className="text-lg font-medium text-gray-700 mb-3">Filter by Country:</h3>
//               <div className="flex flex-wrap gap-2">
//                 <button
//                   onClick={() => setCountryFilter('All')}
//                   className={`px-4 py-1 rounded-full ${
//                     countryFilter === 'All' 
//                       ? 'bg-[#2D8CD4] text-white' 
//                       : 'bg-gray-200 text-gray-700'
//                   }`}
//                 >
//                   All Countries
//                 </button>
//                 {['USA', 'Canada', 'UK', 'Australia', 'Europe', 'Asia'].map(country => (
//                   <button
//                     key={country}
//                     onClick={() => setCountryFilter(country)}
//                     className={`px-4 py-1 rounded-full ${
//                       countryFilter === country 
//                         ? 'bg-[#2D8CD4] text-white' 
//                         : 'bg-gray-200 text-gray-700'
//                     }`}
//                   >
//                     {country}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Comparison Tool */}
//             {selectedForComparison.length > 0 && (
//               <div className="bg-white p-6 rounded-lg shadow-md mb-8" id="comparison-tool">
//                 <h3 className="text-xl font-bold text-[#2D8CD4] mb-4">Comparison Tool</h3>
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full">
//                     <thead>
//                       <tr>
//                         <th className="text-left py-2">Criteria</th>
//                         {selectedForComparison.map(id => {
//                           const uni = institutions.find(u => u.id === id);
//                           return (
//                             <th key={id} className="text-left py-2">
//                               <div className="flex items-center justify-between">
//                                 {uni.name}
//                                 <button 
//                                   onClick={() => toggleComparison(id)}
//                                   className="ml-2 text-red-500"
//                                 >
//                                   ×
//                                 </button>
//                               </div>
//                             </th>
//                           );
//                         })}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {['ranking', 'scholarships', 'deadline'].map(criteria => (
//                         <tr key={criteria} className="border-t">
//                           <td className="py-3 capitalize font-medium">{criteria}</td>
//                           {selectedForComparison.map(id => {
//                             const uni = institutions.find(u => u.id === id);
//                             return (
//                               <td key={`${id}-${criteria}`} className="py-3">
//                                 {uni[criteria]}
//                               </td>
//                             );
//                           })}
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             )}

//             {/* All Institutions List */}
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h2 className="text-2xl font-bold text-[#2D8CD4] mb-6">
//                 {countryFilter === 'All' ? 'All Partner Institutions' : `${countryFilter} Institutions`}
//               </h2>
//               <div className="space-y-4">
//                 {filteredInstitutions.map((institution, index) => (
//                   <div 
//                     key={institution.id} 
//                     id={`institution-${institution.id}`}
//                     className="border border-gray-200 rounded-lg overflow-hidden"
//                   >
//                     <div 
//                       className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 hover:bg-gray-100"
//                       onClick={() => toggleInstitution(index)}
//                     >
//                       <div className="flex items-center">
//                         <img 
//                           src={institution.logo} 
//                           alt={institution.name} 
//                           className="h-12 w-12 object-contain mr-4"
//                         />
//                         <div>
//                           <h3 className="font-bold">{institution.name}</h3>
//                           <p className="text-sm text-gray-600 flex items-center">
//                             <FaMapMarkerAlt className="mr-1" />
//                             {institution.location}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="flex items-center">
//                         <button 
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             toggleComparison(institution.id);
//                           }}
//                           className={`mr-4 px-3 py-1 rounded-full text-xs ${
//                             selectedForComparison.includes(institution.id)
//                               ? 'bg-[#2D8CD4] text-white'
//                               : 'bg-gray-200 text-gray-700'
//                           }`}
//                         >
//                           {selectedForComparison.includes(institution.id) 
//                             ? "View Comparison ↑" 
//                             : "Compare"}
//                         </button>
//                         {activeInstitution === index ? (
//                           <FaChevronUp className="text-[#2D8CD4]" />
//                         ) : (
//                           <FaChevronDown className="text-[#2D8CD4]" />
//                         )}
//                       </div>
//                     </div>
//                     {activeInstitution === index && (
//                       <div className="p-4 bg-white border-t border-gray-200">
//                         {institution.hotDeal && (
//                           <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4">
//                             <p className="font-medium text-yellow-800">Special Offer: {institution.specialOffer}</p>
//                           </div>
//                         )}
//                         <div className="grid md:grid-cols-2 gap-6">
//                           <div>
//                             <h4 className="font-bold mb-2 flex items-center">
//                               <FaUniversity className="mr-2 text-[#2D8CD4]" />
//                               About the University
//                             </h4>
//                             <p className="text-gray-700 mb-4">{institution.about}</p>
                            
//                             <h4 className="font-bold mb-2 flex items-center">
//                               <FaGraduationCap className="mr-2 text-[#2D8CD4]" />
//                               Programs Offered
//                             </h4>
//                             <p className="text-gray-700">{institution.programs}</p>
//                           </div>
//                           <div>
//                             <h4 className="font-bold mb-2 flex items-center">
//                               <FaMoneyBillWave className="mr-2 text-[#2D8CD4]" />
//                               Scholarship Availability
//                             </h4>
//                             <p className="text-gray-700 mb-4">{institution.scholarships}</p>
                            
//                             <h4 className="font-bold mb-2 flex items-center">
//                               <FaCalendarAlt className="mr-2 text-[#2D8CD4]" />
//                               Application Deadline
//                             </h4>
//                             <p className="text-gray-700 mb-4">{institution.deadline}</p>
                            
//                             <h4 className="font-bold mb-2 flex items-center">
//                               <FaGlobeAmericas className="mr-2 text-[#2D8CD4]" />
//                               Global Ranking
//                             </h4>
//                             <p className="text-gray-700">{institution.ranking}</p>
//                           </div>
//                         </div>
//                         <div className="mt-6 flex justify-between items-center">
//                           <button
//                             onClick={() => {
//                               setFormData(prev => ({
//                                 ...prev,
//                                 institutionInterest: institution.name
//                               }));
//                               document.getElementById('interest-form').scrollIntoView({ behavior: 'smooth' });
//                             }}
//                             className="bg-[#2D8CD4] hover:bg-[#1A5F8B] text-white py-2 px-6 rounded transition-colors"
//                           >
//                             Express Interest
//                           </button>
//                           {selectedForComparison.includes(institution.id) && (
//                             <span className="text-sm text-gray-500">
//                               Added to comparison
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Right Sidebar - Interest Form */}
//           <div className="lg:w-1/3" id="interest-form">
//             <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
//               <h2 className="text-2xl font-bold text-[#2D8CD4] mb-6">Express Your Interest</h2>
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                   <label htmlFor="fullName" className="block text-gray-700 mb-1">Full Name</label>
//                   <input
//                     type="text"
//                     id="fullName"
//                     name="fullName"
//                     placeholder="Your full name"
//                     className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D8CD4]"
//                     value={formData.fullName}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="email" className="block text-gray-700 mb-1">Email Address</label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     placeholder="Your email address"
//                     className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D8CD4]"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="phoneNumber" className="block text-gray-700 mb-1">Phone Number</label>
//                   <input
//                     type="tel"
//                     id="phoneNumber"
//                     name="phoneNumber"
//                     placeholder="Your phone number"
//                     className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D8CD4]"
//                     value={formData.phoneNumber}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="preferredCourse" className="block text-gray-700 mb-1">Preferred Course/Program</label>
//                   <input
//                     type="text"
//                     id="preferredCourse"
//                     name="preferredCourse"
//                     placeholder="e.g. Computer Science, MBA"
//                     className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D8CD4]"
//                     value={formData.preferredCourse}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="institutionInterest" className="block text-gray-700 mb-1">Institution of Interest</label>
//                   <select
//                     id="institutionInterest"
//                     name="institutionInterest"
//                     className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D8CD4]"
//                     value={formData.institutionInterest}
//                     onChange={handleChange}
//                   >
//                     <option value="">Select an institution</option>
//                     {institutions.map(institution => (
//                       <option key={institution.id} value={institution.name}>
//                         {institution.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full bg-[#2D8CD4] hover:bg-[#1A5F8B] text-white font-medium py-3 px-6 rounded-lg transition-colors"
//                 >
//                   Submit Interest Form
//                 </button>

//                 <p className="text-sm text-gray-500">
//                   By submitting this form, you agree to our privacy policy and consent to being contacted by our counselors.
//                 </p>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Live Chat Button */}
//       <div className="fixed bottom-6 right-6 z-50">
//         <button 
//           onClick={() => setShowChat(!showChat)}
//           className="bg-[#2D8CD4] hover:bg-[#1A5F8B] text-white rounded-full p-4 shadow-lg flex items-center transition-all"
//         >
//           <FaComments className="text-xl" />
//         </button>
        
//         {showChat && (
//           <div className="absolute bottom-full right-0 mb-4 w-80 bg-white rounded-lg shadow-xl overflow-hidden">
//             <div className="bg-[#2D8CD4] text-white p-3">
//               <h3 className="font-bold">Chat with our counselors</h3>
//             </div>
//             <div className="p-4 h-64 overflow-y-auto">
//               <div className="bg-gray-100 p-3 rounded-lg mb-2">
//                 <p>Hello! How can we help you today?</p>
//               </div>
//               <p className="text-sm text-gray-500 text-center my-4">Chat connected</p>
//             </div>
//             <div className="p-3 border-t">
//               <input 
//                 type="text" 
//                 placeholder="Type your message..."
//                 className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D8CD4]"
//               />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Visitor;













// import React, { useState } from "react";
// import { FaChevronDown, FaChevronUp, FaMapMarkerAlt, FaUniversity, FaGraduationCap, FaMoneyBillWave, FaGlobeAmericas, FaCalendarAlt, FaComments } from "react-icons/fa";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Navbar from "../components/shared/Navbar";

// const Visitor = () => {
//   const [activeInstitution, setActiveInstitution] = useState(null);
//   const [countryFilter, setCountryFilter] = useState('All');
//   const [selectedForComparison, setSelectedForComparison] = useState([]);
//   const [showChat, setShowChat] = useState(false);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phoneNumber: "",
//     preferredCourse: "",
//     institutionInterest: ""
//   });

//   const toggleInstitution = (index) => {
//     setActiveInstitution(activeInstitution === index ? null : index);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form submitted:", formData);
//     alert("Thank you for your interest! We'll contact you shortly.");
//     setFormData({
//       fullName: "",
//       email: "",
//       phoneNumber: "",
//       preferredCourse: "",
//       institutionInterest: ""
//     });
//   };

//   const toggleComparison = (institutionId) => {
//     setSelectedForComparison(prev => 
//       prev.includes(institutionId) 
//         ? prev.filter(id => id !== institutionId) 
//         : [...prev, institutionId]
//     );
//   };

//   // Slider settings for featured institutions
//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2
//         }
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 1
//         }
//       }
//     ]
//   };

//   const institutions = [
//     {
//       id: 1,
//       name: "University of Michigan",
//       location: "Ann Arbor, Michigan, USA",
//       country: "USA",
//       logo: "/michigan.png",
//       about: "A premier public research university known for its academic excellence, vibrant campus life, and strong alumni network.",
//       scholarships: "Merit-based scholarships available for international students ranging from $5,000 to full tuition.",
//       programs: "300+ undergraduate and graduate programs across 19 schools and colleges.",
//       deadline: "February 1 for fall admission",
//       ranking: "#23 in National Universities (U.S. News 2023)"
//     },
//     {
//       id: 2,
//       name: "University of Toronto",
//       location: "Toronto, Ontario, Canada",
//       country: "Canada",
//       logo: "/michigan.png",
//       about: "Canada's leading institution of learning, discovery and knowledge creation with a diverse urban campus.",
//       scholarships: "Lester B. Pearson International Scholarship (full tuition + living expenses), President's Scholars awards.",
//       programs: "700+ undergraduate and 200+ graduate programs across three campuses.",
//       deadline: "January 15 for most programs",
//       ranking: "#1 in Canada, #18 globally (Times Higher Education 2023)"
//     },
//     {
//       id: 3,
//       name: "University of Melbourne",
//       location: "Melbourne, Victoria, Australia",
//       country: "Australia",
//       logo: "/michigan.png",
//       about: "Australia's #1 university with a 160-year history of excellence in teaching and research.",
//       scholarships: "International Undergraduate Scholarships (up to $56,000), Graduate Research Scholarships.",
//       programs: "Broad range of programs with strong focus on research-led education.",
//       deadline: "October 31 for Semester 1 intake",
//       ranking: "#1 in Australia, #34 globally (QS 2024)"
//     },
//     {
//       id: 4,
//       name: "University College London",
//       location: "London, United Kingdom",
//       country: "UK",
//       logo: "/michigan.png",
//       about: "World-class university in the heart of London with a progressive approach to teaching and research.",
//       scholarships: "UCL Global Undergraduate Scholarship, Chevening Scholarships, Commonwealth Scholarships.",
//       programs: "400+ undergraduate and 600+ taught graduate programs.",
//       deadline: "January 26 for most undergraduate courses",
//       ranking: "#9 in the world (QS 2024)"
//     },
//     {
//       id: 5,
//       name: "University of Edinburgh",
//       location: "Edinburgh, Scotland",
//       country: "UK",
//       logo: "/michigan.png",
//       about: "One of the world's top universities with a rich history dating back to 1583.",
//       scholarships: "Edinburgh Global Undergraduate Scholarships, GREAT Scholarships.",
//       programs: "500+ undergraduate and 300+ postgraduate programs.",
//       deadline: "June 30 for most undergraduate programs",
//       ranking: "#22 in the world (QS 2024)"
//     },
//     {
//       id: 6,
//       name: "ETH Zurich",
//       location: "Zurich, Switzerland",
//       country: "Europe",
//       logo: "/michigan.png",
//       about: "World-leading university in science and technology with 21 Nobel Prize laureates.",
//       scholarships: "Excellence Scholarship & Opportunity Programme (ESOP) for master's students.",
//       programs: "Strong focus on STEM fields with excellent research facilities.",
//       deadline: "December 15 for autumn semester",
//       ranking: "#7 in Engineering & Technology (QS 2023)"
//     },
//     {
//       id: 7,
//       name: "National University of Singapore",
//       location: "Singapore",
//       country: "Asia",
//       logo: "/michigan.png",
//       about: "Asia's top university with a global approach to education and research.",
//       scholarships: "NUS Global Merit Scholarship, ASEAN Undergraduate Scholarship.",
//       programs: "Diverse programs with strong emphasis on interdisciplinary learning.",
//       deadline: "March 3 for most undergraduate programs",
//       ranking: "#8 in the world (QS 2024)"
//     }
//   ];

//   const filteredInstitutions = countryFilter === 'All' 
//     ? institutions 
//     : institutions.filter(inst => inst.country === countryFilter);

//   return (
//     <div className="min-h-screen bg-gray-50 font-sans">
//       <Navbar />
      
//       {/* Hero Section with Image Background */}
//       <div className="relative">
//         <div 
//           className="absolute inset-0 bg-[url('/webback.jpg')] bg-cover bg-center"
//           style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
//         ></div>
//         <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-16 flex flex-col justify-center items-start text-left">
//           <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
//             Find Your Dream University
//           </h1>
//           <p className="text-xl text-white max-w-2xl">
//             Explore our partner institutions and get personalized guidance for your international education journey
//           </p>
//         </div>
//       </div>

//       {/* Key Statistics */}
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {[
//             { value: "200+", label: "Partner Institutions" },
//             { value: "95%", label: "Admission Success" },
//             { value: "$50M+", label: "Scholarships Secured" },
//             { value: "24h", label: "Response Time" }
//           ].map((stat, index) => (
//             <div key={index} className="bg-white p-4 rounded-lg shadow text-center">
//               <p className="text-2xl font-bold text-[#2D8CD4]">{stat.value}</p>
//               <p className="text-gray-600">{stat.label}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Left Content - Institutions */}
//           <div className="lg:w-2/3">
//             {/* Featured Institutions Slider */}
//             <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//               <h2 className="text-2xl font-bold text-[#2D8CD4] mb-6">Featured Institutions</h2>
//               <Slider {...sliderSettings}>
//                 {institutions.slice(0, 5).map((institution) => (
//                   <div key={institution.id} className="px-2">
//                     <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center h-full">
//                       <img 
//                         src={institution.logo} 
//                         alt={institution.name} 
//                         className="h-20 object-contain mb-4"
//                       />
//                       <h3 className="text-lg font-bold text-center mb-2">{institution.name}</h3>
//                       <div className="flex items-center text-sm text-gray-600 mb-3">
//                         <FaMapMarkerAlt className="mr-1" />
//                         <span>{institution.location}</span>
//                       </div>
//                       <button 
//                         onClick={() => document.getElementById(`institution-${institution.id}`).scrollIntoView({ behavior: 'smooth' })}
//                         className="mt-auto bg-[#2D8CD4] hover:bg-[#1A5F8B] text-white py-2 px-4 rounded text-sm transition-colors"
//                       >
//                         View Details
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </Slider>
//             </div>

//             {/* Country Filters */}
//             <div className="mb-6">
//               <h3 className="text-lg font-medium text-gray-700 mb-3">Filter by Country:</h3>
//               <div className="flex flex-wrap gap-2">
//                 <button
//                   onClick={() => setCountryFilter('All')}
//                   className={`px-4 py-1 rounded-full ${
//                     countryFilter === 'All' 
//                       ? 'bg-[#2D8CD4] text-white' 
//                       : 'bg-gray-200 text-gray-700'
//                   }`}
//                 >
//                   All Countries
//                 </button>
//                 {['USA', 'Canada', 'UK', 'Australia', 'Europe', 'Asia'].map(country => (
//                   <button
//                     key={country}
//                     onClick={() => setCountryFilter(country)}
//                     className={`px-4 py-1 rounded-full ${
//                       countryFilter === country 
//                         ? 'bg-[#2D8CD4] text-white' 
//                         : 'bg-gray-200 text-gray-700'
//                     }`}
//                   >
//                     {country}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Comparison Tool */}
//             {selectedForComparison.length > 0 && (
//               <div className="bg-white p-6 rounded-lg shadow-md mb-8" id="comparison-tool">
//                 <h3 className="text-xl font-bold text-[#2D8CD4] mb-4">Comparison Tool</h3>
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full">
//                     <thead>
//                       <tr>
//                         <th className="text-left py-2">Criteria</th>
//                         {selectedForComparison.map(id => {
//                           const uni = institutions.find(u => u.id === id);
//                           return (
//                             <th key={id} className="text-left py-2">
//                               <div className="flex items-center justify-between">
//                                 {uni.name}
//                                 <button 
//                                   onClick={() => toggleComparison(id)}
//                                   className="ml-2 text-red-500"
//                                 >
//                                   ×
//                                 </button>
//                               </div>
//                             </th>
//                           );
//                         })}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {['ranking', 'scholarships', 'deadline'].map(criteria => (
//                         <tr key={criteria} className="border-t">
//                           <td className="py-3 capitalize font-medium">{criteria}</td>
//                           {selectedForComparison.map(id => {
//                             const uni = institutions.find(u => u.id === id);
//                             return (
//                               <td key={`${id}-${criteria}`} className="py-3">
//                                 {uni[criteria]}
//                               </td>
//                             );
//                           })}
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             )}

//             {/* All Institutions List */}
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h2 className="text-2xl font-bold text-[#2D8CD4] mb-6">
//                 {countryFilter === 'All' ? 'All Partner Institutions' : `${countryFilter} Institutions`}
//               </h2>
//               <div className="space-y-4">
//                 {filteredInstitutions.map((institution, index) => (
//                   <div 
//                     key={institution.id} 
//                     id={`institution-${institution.id}`}
//                     className="border border-gray-200 rounded-lg overflow-hidden"
//                   >
//                     <div 
//                       className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 hover:bg-gray-100"
//                       onClick={() => toggleInstitution(index)}
//                     >
//                       <div className="flex items-center">
//                         <img 
//                           src={institution.logo} 
//                           alt={institution.name} 
//                           className="h-12 w-12 object-contain mr-4"
//                         />
//                         <div>
//                           <h3 className="font-bold">{institution.name}</h3>
//                           <p className="text-sm text-gray-600 flex items-center">
//                             <FaMapMarkerAlt className="mr-1" />
//                             {institution.location}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="flex items-center">
//                         <button 
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             toggleComparison(institution.id);
//                           }}
//                           className={`mr-4 px-3 py-1 rounded-full text-xs ${
//                             selectedForComparison.includes(institution.id)
//                               ? 'bg-[#2D8CD4] text-white'
//                               : 'bg-gray-200 text-gray-700'
//                           }`}
//                         >
//                           {selectedForComparison.includes(institution.id) 
//                             ? "View Comparison ↑" 
//                             : "Compare"}
//                         </button>
//                         {activeInstitution === index ? (
//                           <FaChevronUp className="text-[#2D8CD4]" />
//                         ) : (
//                           <FaChevronDown className="text-[#2D8CD4]" />
//                         )}
//                       </div>
//                     </div>
//                     {activeInstitution === index && (
//                       <div className="p-4 bg-white border-t border-gray-200">
//                         <div className="grid md:grid-cols-2 gap-6">
//                           <div>
//                             <h4 className="font-bold mb-2 flex items-center">
//                               <FaUniversity className="mr-2 text-[#2D8CD4]" />
//                               About the University
//                             </h4>
//                             <p className="text-gray-700 mb-4">{institution.about}</p>
                            
//                             <h4 className="font-bold mb-2 flex items-center">
//                               <FaGraduationCap className="mr-2 text-[#2D8CD4]" />
//                               Programs Offered
//                             </h4>
//                             <p className="text-gray-700">{institution.programs}</p>
//                           </div>
//                           <div>
//                             <h4 className="font-bold mb-2 flex items-center">
//                               <FaMoneyBillWave className="mr-2 text-[#2D8CD4]" />
//                               Scholarship Availability
//                             </h4>
//                             <p className="text-gray-700 mb-4">{institution.scholarships}</p>
                            
//                             <h4 className="font-bold mb-2 flex items-center">
//                               <FaCalendarAlt className="mr-2 text-[#2D8CD4]" />
//                               Application Deadline
//                             </h4>
//                             <p className="text-gray-700 mb-4">{institution.deadline}</p>
                            
//                             <h4 className="font-bold mb-2 flex items-center">
//                               <FaGlobeAmericas className="mr-2 text-[#2D8CD4]" />
//                               Global Ranking
//                             </h4>
//                             <p className="text-gray-700">{institution.ranking}</p>
//                           </div>
//                         </div>
//                         <div className="mt-6 flex justify-between items-center">
//                           <button
//                             onClick={() => {
//                               setFormData(prev => ({
//                                 ...prev,
//                                 institutionInterest: institution.name
//                               }));
//                               document.getElementById('interest-form').scrollIntoView({ behavior: 'smooth' });
//                             }}
//                             className="bg-[#2D8CD4] hover:bg-[#1A5F8B] text-white py-2 px-6 rounded transition-colors"
//                           >
//                             Express Interest
//                           </button>
//                           {selectedForComparison.includes(institution.id) && (
//                             <span className="text-sm text-gray-500">
//                               Added to comparison
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Right Sidebar - Interest Form */}
//           <div className="lg:w-1/3" id="interest-form">
//             <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
//               <h2 className="text-2xl font-bold text-[#2D8CD4] mb-6">Express Your Interest</h2>
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                   <label htmlFor="fullName" className="block text-gray-700 mb-1">Full Name</label>
//                   <input
//                     type="text"
//                     id="fullName"
//                     name="fullName"
//                     placeholder="Your full name"
//                     className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D8CD4]"
//                     value={formData.fullName}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="email" className="block text-gray-700 mb-1">Email Address</label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     placeholder="Your email address"
//                     className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D8CD4]"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="phoneNumber" className="block text-gray-700 mb-1">Phone Number</label>
//                   <input
//                     type="tel"
//                     id="phoneNumber"
//                     name="phoneNumber"
//                     placeholder="Your phone number"
//                     className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D8CD4]"
//                     value={formData.phoneNumber}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="preferredCourse" className="block text-gray-700 mb-1">Preferred Course/Program</label>
//                   <input
//                     type="text"
//                     id="preferredCourse"
//                     name="preferredCourse"
//                     placeholder="e.g. Computer Science, MBA"
//                     className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D8CD4]"
//                     value={formData.preferredCourse}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="institutionInterest" className="block text-gray-700 mb-1">Institution of Interest</label>
//                   <select
//                     id="institutionInterest"
//                     name="institutionInterest"
//                     className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D8CD4]"
//                     value={formData.institutionInterest}
//                     onChange={handleChange}
//                   >
//                     <option value="">Select an institution</option>
//                     {institutions.map(institution => (
//                       <option key={institution.id} value={institution.name}>
//                         {institution.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full bg-[#2D8CD4] hover:bg-[#1A5F8B] text-white font-medium py-3 px-6 rounded-lg transition-colors"
//                 >
//                   Submit Interest Form
//                 </button>

//                 <p className="text-sm text-gray-500">
//                   By submitting this form, you agree to our privacy policy and consent to being contacted by our counselors.
//                 </p>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Live Chat Button */}
//       <div className="fixed bottom-6 right-6 z-50">
//         <button 
//           onClick={() => setShowChat(!showChat)}
//           className="bg-[#2D8CD4] hover:bg-[#1A5F8B] text-white rounded-full p-4 shadow-lg flex items-center transition-all"
//         >
//           <FaComments className="text-xl" />
//         </button>
        
//         {showChat && (
//           <div className="absolute bottom-full right-0 mb-4 w-80 bg-white rounded-lg shadow-xl overflow-hidden">
//             <div className="bg-[#2D8CD4] text-white p-3">
//               <h3 className="font-bold">Chat with our counselors</h3>
//             </div>
//             <div className="p-4 h-64 overflow-y-auto">
//               <div className="bg-gray-100 p-3 rounded-lg mb-2">
//                 <p>Hello! How can we help you today?</p>
//               </div>
//               <p className="text-sm text-gray-500 text-center my-4">Chat connected</p>
//             </div>
//             <div className="p-3 border-t">
//               <input 
//                 type="text" 
//                 placeholder="Type your message..."
//                 className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D8CD4]"
//               />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Visitor;

















// import React, { useState } from "react";
// import { FaChevronDown, FaChevronUp, FaMapMarkerAlt, FaUniversity, FaGraduationCap, FaMoneyBillWave, FaGlobeAmericas, FaCalendarAlt, FaComments } from "react-icons/fa";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Navbar from "../components/shared/Navbar";

// const Visitor = () => {
//   const [activeInstitution, setActiveInstitution] = useState(null);
//   const [countryFilter, setCountryFilter] = useState('All');
//   const [selectedForComparison, setSelectedForComparison] = useState([]);
//   const [showChat, setShowChat] = useState(false);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phoneNumber: "",
//     preferredCourse: "",
//     institutionInterest: ""
//   });

//   const toggleInstitution = (index) => {
//     setActiveInstitution(activeInstitution === index ? null : index);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form submitted:", formData);
//     alert("Thank you for your interest! We'll contact you shortly.");
//     setFormData({
//       fullName: "",
//       email: "",
//       phoneNumber: "",
//       preferredCourse: "",
//       institutionInterest: ""
//     });
//   };

//   const toggleComparison = (institutionId) => {
//     setSelectedForComparison(prev => 
//       prev.includes(institutionId) 
//         ? prev.filter(id => id !== institutionId) 
//         : [...prev, institutionId]
//     );
//   };

//   // Slider settings for featured institutions
//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2
//         }
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 1
//         }
//       }
//     ]
//   };

//   const institutions = [
//     {
//       id: 1,
//       name: "University of Michigan",
//       location: "Ann Arbor, Michigan, USA",
//       country: "USA",
//       logo: "/michigan.png",
//       about: "A premier public research university known for its academic excellence, vibrant campus life, and strong alumni network.",
//       scholarships: "Merit-based scholarships available for international students ranging from $5,000 to full tuition.",
//       programs: "300+ undergraduate and graduate programs across 19 schools and colleges.",
//       deadline: "February 1 for fall admission",
//       ranking: "#23 in National Universities (U.S. News 2023)",
//       hotDeal: true,
//       specialOffer: "Application fee waiver for early applicants"
//     },
//     {
//       id: 2,
//       name: "University of Toronto",
//       location: "Toronto, Ontario, Canada",
//       country: "Canada",
//       logo: "/michigan.png",
//       about: "Canada's leading institution of learning, discovery and knowledge creation with a diverse urban campus.",
//       scholarships: "Lester B. Pearson International Scholarship (full tuition + living expenses), President's Scholars awards.",
//       programs: "700+ undergraduate and 200+ graduate programs across three campuses.",
//       deadline: "January 15 for most programs",
//       ranking: "#1 in Canada, #18 globally (Times Higher Education 2023)",
//       hotDeal: false
//     },
//     {
//       id: 3,
//       name: "University of Melbourne",
//       location: "Melbourne, Victoria, Australia",
//       country: "Australia",
//       logo: "/michigan.png",
//       about: "Australia's #1 university with a 160-year history of excellence in teaching and research.",
//       scholarships: "International Undergraduate Scholarships (up to $56,000), Graduate Research Scholarships.",
//       programs: "Broad range of programs with strong focus on research-led education.",
//       deadline: "October 31 for Semester 1 intake",
//       ranking: "#1 in Australia, #34 globally (QS 2024)",
//       hotDeal: true,
//       specialOffer: "Priority visa processing for webinar attendees"
//     },
//     {
//       id: 4,
//       name: "University College London",
//       location: "London, United Kingdom",
//       country: "UK",
//       logo: "/michigan.png",
//       about: "World-class university in the heart of London with a progressive approach to teaching and research.",
//       scholarships: "UCL Global Undergraduate Scholarship, Chevening Scholarships, Commonwealth Scholarships.",
//       programs: "400+ undergraduate and 600+ taught graduate programs.",
//       deadline: "January 26 for most undergraduate courses",
//       ranking: "#9 in the world (QS 2024)",
//       hotDeal: false
//     },
//     {
//       id: 5,
//       name: "University of Edinburgh",
//       location: "Edinburgh, Scotland",
//       country: "UK",
//       logo: "/michigan.png",
//       about: "One of the world's top universities with a rich history dating back to 1583.",
//       scholarships: "Edinburgh Global Undergraduate Scholarships, GREAT Scholarships.",
//       programs: "500+ undergraduate and 300+ postgraduate programs.",
//       deadline: "June 30 for most undergraduate programs",
//       ranking: "#22 in the world (QS 2024)",
//       hotDeal: true,
//       specialOffer: "£2,000 early enrollment bonus"
//     },
//     {
//       id: 6,
//       name: "ETH Zurich",
//       location: "Zurich, Switzerland",
//       country: "Europe",
//       logo: "/michigan.png",
//       about: "World-leading university in science and technology with 21 Nobel Prize laureates.",
//       scholarships: "Excellence Scholarship & Opportunity Programme (ESOP) for master's students.",
//       programs: "Strong focus on STEM fields with excellent research facilities.",
//       deadline: "December 15 for autumn semester",
//       ranking: "#7 in Engineering & Technology (QS 2023)",
//       hotDeal: false
//     },
//     {
//       id: 7,
//       name: "National University of Singapore",
//       location: "Singapore",
//       country: "Asia",
//       logo: "/michigan.png",
//       about: "Asia's top university with a global approach to education and research.",
//       scholarships: "NUS Global Merit Scholarship, ASEAN Undergraduate Scholarship.",
//       programs: "Diverse programs with strong emphasis on interdisciplinary learning.",
//       deadline: "March 3 for most undergraduate programs",
//       ranking: "#8 in the world (QS 2024)",
//       hotDeal: true,
//       specialOffer: "Guanteed on-campus accommodation"
//     }
//   ];

//   const filteredInstitutions = countryFilter === 'All' 
//     ? institutions 
//     : institutions.filter(inst => inst.country === countryFilter);

//   return (
//     <div className="min-h-screen bg-gray-50 font-sans">
//       <Navbar />
      
//       {/* Hero Section */}
//       <div className="relative bg-[#2D8CD4] py-16 text-white">
//         <div className="max-w-7xl mx-auto px-4 text-center">
//           <h1 className="text-4xl md:text-5xl font-bold mb-4">University Campaigns</h1>
//           <p className="text-xl max-w-3xl mx-auto">
//             Explore our partner institutions and express your interest to receive personalized guidance
//           </p>
//         </div>
//       </div>

//       {/* Key Statistics */}
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {[
//             { value: "200+", label: "Partner Institutions" },
//             { value: "95%", label: "Admission Success" },
//             { value: "$50M+", label: "Scholarships Secured" },
//             { value: "24h", label: "Response Time" }
//           ].map((stat, index) => (
//             <div key={index} className="bg-white p-4 rounded-lg shadow text-center">
//               <p className="text-2xl font-bold text-[#2D8CD4]">{stat.value}</p>
//               <p className="text-gray-600">{stat.label}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Left Content - Institutions */}
//           <div className="lg:w-2/3">
//             {/* Featured Institutions Slider */}
//             <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//               <h2 className="text-2xl font-bold text-[#2D8CD4] mb-6">Featured Institutions</h2>
//               <Slider {...sliderSettings}>
//                 {institutions.slice(0, 5).map((institution) => (
//                   <div key={institution.id} className="px-2">
//                     <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center h-full relative">
//                       {institution.hotDeal && (
//                         <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
//                           Special Offer
//                         </span>
//                       )}
//                       <img 
//                         src={institution.logo} 
//                         alt={institution.name} 
//                         className="h-20 object-contain mb-4"
//                       />
//                       <h3 className="text-lg font-bold text-center mb-2">{institution.name}</h3>
//                       <div className="flex items-center text-sm text-gray-600 mb-3">
//                         <FaMapMarkerAlt className="mr-1" />
//                         <span>{institution.location}</span>
//                       </div>
//                       <button 
//                         onClick={() => document.getElementById(`institution-${institution.id}`).scrollIntoView({ behavior: 'smooth' })}
//                         className="mt-auto bg-[#2D8CD4] hover:bg-[#1A5F8B] text-white py-2 px-4 rounded text-sm transition-colors"
//                       >
//                         View Details
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </Slider>
//             </div>

//             {/* Country Filters */}
//             <div className="mb-6">
//               <h3 className="text-lg font-medium text-gray-700 mb-3">Filter by Country:</h3>
//               <div className="flex flex-wrap gap-2">
//                 <button
//                   onClick={() => setCountryFilter('All')}
//                   className={`px-4 py-1 rounded-full ${
//                     countryFilter === 'All' 
//                       ? 'bg-[#2D8CD4] text-white' 
//                       : 'bg-gray-200 text-gray-700'
//                   }`}
//                 >
//                   All Countries
//                 </button>
//                 {['USA', 'Canada', 'UK', 'Australia', 'Europe', 'Asia'].map(country => (
//                   <button
//                     key={country}
//                     onClick={() => setCountryFilter(country)}
//                     className={`px-4 py-1 rounded-full ${
//                       countryFilter === country 
//                         ? 'bg-[#2D8CD4] text-white' 
//                         : 'bg-gray-200 text-gray-700'
//                     }`}
//                   >
//                     {country}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Comparison Tool */}
//             {selectedForComparison.length > 0 && (
//               <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//                 <h3 className="text-xl font-bold text-[#2D8CD4] mb-4">Comparison Tool</h3>
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full">
//                     <thead>
//                       <tr>
//                         <th className="text-left py-2">Criteria</th>
//                         {selectedForComparison.map(id => {
//                           const uni = institutions.find(u => u.id === id);
//                           return (
//                             <th key={id} className="text-left py-2">
//                               <div className="flex items-center justify-between">
//                                 {uni.name}
//                                 <button 
//                                   onClick={() => toggleComparison(id)}
//                                   className="ml-2 text-red-500"
//                                 >
//                                   ×
//                                 </button>
//                               </div>
//                             </th>
//                           );
//                         })}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {['ranking', 'scholarships', 'deadline'].map(criteria => (
//                         <tr key={criteria} className="border-t">
//                           <td className="py-3 capitalize font-medium">{criteria}</td>
//                           {selectedForComparison.map(id => {
//                             const uni = institutions.find(u => u.id === id);
//                             return (
//                               <td key={`${id}-${criteria}`} className="py-3">
//                                 {uni[criteria]}
//                               </td>
//                             );
//                           })}
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             )}

//             {/* All Institutions List */}
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h2 className="text-2xl font-bold text-[#2D8CD4] mb-6">
//                 {countryFilter === 'All' ? 'All Partner Institutions' : `${countryFilter} Institutions`}
//               </h2>
//               <div className="space-y-4">
//                 {filteredInstitutions.map((institution, index) => (
//                   <div 
//                     key={institution.id} 
//                     id={`institution-${institution.id}`}
//                     className="border border-gray-200 rounded-lg overflow-hidden"
//                   >
//                     <div 
//                       className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 hover:bg-gray-100"
//                       onClick={() => toggleInstitution(index)}
//                     >
//                       <div className="flex items-center">
//                         <img 
//                           src={institution.logo} 
//                           alt={institution.name} 
//                           className="h-12 w-12 object-contain mr-4"
//                         />
//                         <div>
//                           <h3 className="font-bold">{institution.name}</h3>
//                           <p className="text-sm text-gray-600 flex items-center">
//                             <FaMapMarkerAlt className="mr-1" />
//                             {institution.location}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="flex items-center">
//                         <button 
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             toggleComparison(institution.id);
//                           }}
//                           className={`mr-4 px-3 py-1 rounded-full text-xs ${
//                             selectedForComparison.includes(institution.id)
//                               ? 'bg-[#2D8CD4] text-white'
//                               : 'bg-gray-200 text-gray-700'
//                           }`}
//                         >
//                           Compare
//                         </button>
//                         {activeInstitution === index ? (
//                           <FaChevronUp className="text-[#2D8CD4]" />
//                         ) : (
//                           <FaChevronDown className="text-[#2D8CD4]" />
//                         )}
//                       </div>
//                     </div>
//                     {activeInstitution === index && (
//                       <div className="p-4 bg-white border-t border-gray-200">
//                         {institution.hotDeal && (
//                           <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4">
//                             <p className="font-medium text-yellow-800">Special Offer: {institution.specialOffer}</p>
//                           </div>
//                         )}
//                         <div className="grid md:grid-cols-2 gap-6">
//                           <div>
//                             <h4 className="font-bold mb-2 flex items-center">
//                               <FaUniversity className="mr-2 text-[#2D8CD4]" />
//                               About the University
//                             </h4>
//                             <p className="text-gray-700 mb-4">{institution.about}</p>
                            
//                             <h4 className="font-bold mb-2 flex items-center">
//                               <FaGraduationCap className="mr-2 text-[#2D8CD4]" />
//                               Programs Offered
//                             </h4>
//                             <p className="text-gray-700">{institution.programs}</p>
//                           </div>
//                           <div>
//                             <h4 className="font-bold mb-2 flex items-center">
//                               <FaMoneyBillWave className="mr-2 text-[#2D8CD4]" />
//                               Scholarship Availability
//                             </h4>
//                             <p className="text-gray-700 mb-4">{institution.scholarships}</p>
                            
//                             <h4 className="font-bold mb-2 flex items-center">
//                               <FaCalendarAlt className="mr-2 text-[#2D8CD4]" />
//                               Application Deadline
//                             </h4>
//                             <p className="text-gray-700 mb-4">{institution.deadline}</p>
                            
//                             <h4 className="font-bold mb-2 flex items-center">
//                               <FaGlobeAmericas className="mr-2 text-[#2D8CD4]" />
//                               Global Ranking
//                             </h4>
//                             <p className="text-gray-700">{institution.ranking}</p>
//                           </div>
//                         </div>
//                         <div className="mt-6 flex justify-between items-center">
//                           <button
//                             onClick={() => {
//                               setFormData(prev => ({
//                                 ...prev,
//                                 institutionInterest: institution.name
//                               }));
//                               document.getElementById('interest-form').scrollIntoView({ behavior: 'smooth' });
//                             }}
//                             className="bg-[#2D8CD4] hover:bg-[#1A5F8B] text-white py-2 px-6 rounded transition-colors"
//                           >
//                             Express Interest
//                           </button>
//                           {selectedForComparison.includes(institution.id) && (
//                             <span className="text-sm text-gray-500">
//                               Added to comparison
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Right Sidebar - Interest Form */}
//           <div className="lg:w-1/3" id="interest-form">
//             <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
//               <h2 className="text-2xl font-bold text-[#2D8CD4] mb-6">Express Your Interest</h2>
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                   <label htmlFor="fullName" className="block text-gray-700 mb-1">Full Name</label>
//                   <input
//                     type="text"
//                     id="fullName"
//                     name="fullName"
//                     placeholder="Your full name"
//                     className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D8CD4]"
//                     value={formData.fullName}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="email" className="block text-gray-700 mb-1">Email Address</label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     placeholder="Your email address"
//                     className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D8CD4]"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="phoneNumber" className="block text-gray-700 mb-1">Phone Number</label>
//                   <input
//                     type="tel"
//                     id="phoneNumber"
//                     name="phoneNumber"
//                     placeholder="Your phone number"
//                     className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D8CD4]"
//                     value={formData.phoneNumber}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="preferredCourse" className="block text-gray-700 mb-1">Preferred Course/Program</label>
//                   <input
//                     type="text"
//                     id="preferredCourse"
//                     name="preferredCourse"
//                     placeholder="e.g. Computer Science, MBA"
//                     className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D8CD4]"
//                     value={formData.preferredCourse}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="institutionInterest" className="block text-gray-700 mb-1">Institution of Interest</label>
//                   <select
//                     id="institutionInterest"
//                     name="institutionInterest"
//                     className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D8CD4]"
//                     value={formData.institutionInterest}
//                     onChange={handleChange}
//                   >
//                     <option value="">Select an institution</option>
//                     {institutions.map(institution => (
//                       <option key={institution.id} value={institution.name}>
//                         {institution.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full bg-[#2D8CD4] hover:bg-[#1A5F8B] text-white font-medium py-3 px-6 rounded-lg transition-colors"
//                 >
//                   Submit Interest Form
//                 </button>

//                 <p className="text-sm text-gray-500">
//                   By submitting this form, you agree to our privacy policy and consent to being contacted by our counselors.
//                 </p>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Live Chat Button */}
//       <div className="fixed bottom-6 right-6 z-50">
//         <button 
//           onClick={() => setShowChat(!showChat)}
//           className="bg-[#2D8CD4] hover:bg-[#1A5F8B] text-white rounded-full p-4 shadow-lg flex items-center transition-all"
//         >
//           <FaComments className="text-xl" />
//         </button>
        
//         {showChat && (
//           <div className="absolute bottom-full right-0 mb-4 w-80 bg-white rounded-lg shadow-xl overflow-hidden">
//             <div className="bg-[#2D8CD4] text-white p-3">
//               <h3 className="font-bold">Chat with our counselors</h3>
//             </div>
//             <div className="p-4 h-64 overflow-y-auto">
//               <div className="bg-gray-100 p-3 rounded-lg mb-2">
//                 <p>Hello! How can we help you today?</p>
//               </div>
//               <p className="text-sm text-gray-500 text-center my-4">Chat connected</p>
//             </div>
//             <div className="p-3 border-t">
//               <input 
//                 type="text" 
//                 placeholder="Type your message..."
//                 className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D8CD4]"
//               />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Visitor;














// import React, { useState } from "react";
// import { FaChevronDown, FaChevronUp, FaMapMarkerAlt, FaUniversity, FaGraduationCap, FaMoneyBillWave, FaGlobeAmericas, FaCalendarAlt } from "react-icons/fa";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Navbar from "../components/shared/Navbar";

// const Visitor = () => {
//   const [activeInstitution, setActiveInstitution] = useState(null);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phoneNumber: "",
//     preferredCourse: "",
//     institutionInterest: ""
//   });

//   const toggleInstitution = (index) => {
//     setActiveInstitution(activeInstitution === index ? null : index);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission logic here
//     console.log("Form submitted:", formData);
//     alert("Thank you for your interest! We'll contact you shortly.");
//     setFormData({
//       fullName: "",
//       email: "",
//       phoneNumber: "",
//       preferredCourse: "",
//       institutionInterest: ""
//     });
//   };

//   // Slider settings for featured institutions
//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2
//         }
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 1
//         }
//       }
//     ]
//   };

//   const institutions = [
//     {
//       id: 1,
//       name: "University of Michigan",
//       location: "Ann Arbor, Michigan, USA",
//       logo: "/michigan.png",
//       about: "A premier public research university known for its academic excellence, vibrant campus life, and strong alumni network.",
//       scholarships: "Merit-based scholarships available for international students ranging from $5,000 to full tuition.",
//       programs: "300+ undergraduate and graduate programs across 19 schools and colleges.",
//       deadline: "February 1 for fall admission",
//       ranking: "#23 in National Universities (U.S. News 2023)"
//     },
//     {
//       id: 2,
//       name: "University of Toronto",
//       location: "Toronto, Ontario, Canada",
//       logo: "/michigan.png",
//       about: "Canada's leading institution of learning, discovery and knowledge creation with a diverse urban campus.",
//       scholarships: "Lester B. Pearson International Scholarship (full tuition + living expenses), President's Scholars awards.",
//       programs: "700+ undergraduate and 200+ graduate programs across three campuses.",
//       deadline: "January 15 for most programs",
//       ranking: "#1 in Canada, #18 globally (Times Higher Education 2023)"
//     },
//     {
//       id: 3,
//       name: "University of Melbourne",
//       location: "Melbourne, Victoria, Australia",
//       logo: "/michigan.png",
//       about: "Australia's #1 university with a 160-year history of excellence in teaching and research.",
//       scholarships: "International Undergraduate Scholarships (up to $56,000), Graduate Research Scholarships.",
//       programs: "Broad range of programs with strong focus on research-led education.",
//       deadline: "October 31 for Semester 1 intake",
//       ranking: "#1 in Australia, #34 globally (QS 2024)"
//     },
//     {
//       id: 4,
//       name: "University College London",
//       location: "London, United Kingdom",
//       logo: "/michigan.png",
//       about: "World-class university in the heart of London with a progressive approach to teaching and research.",
//       scholarships: "UCL Global Undergraduate Scholarship, Chevening Scholarships, Commonwealth Scholarships.",
//       programs: "400+ undergraduate and 600+ taught graduate programs.",
//       deadline: "January 26 for most undergraduate courses",
//       ranking: "#9 in the world (QS 2024)"
//     },
//     {
//       id: 5,
//       name: "University of Edinburgh",
//       location: "Edinburgh, Scotland",
//       logo: "/michigan.png",
//       about: "One of the world's top universities with a rich history dating back to 1583.",
//       scholarships: "Edinburgh Global Undergraduate Scholarships, GREAT Scholarships.",
//       programs: "500+ undergraduate and 300+ postgraduate programs.",
//       deadline: "June 30 for most undergraduate programs",
//       ranking: "#22 in the world (QS 2024)"
//     },
//     {
//       id: 6,
//       name: "ETH Zurich",
//       location: "Zurich, Switzerland",
//       logo: "/michigan.png",
//       about: "World-leading university in science and technology with 21 Nobel Prize laureates.",
//       scholarships: "Excellence Scholarship & Opportunity Programme (ESOP) for master's students.",
//       programs: "Strong focus on STEM fields with excellent research facilities.",
//       deadline: "December 15 for autumn semester",
//       ranking: "#7 in Engineering & Technology (QS 2023)"
//     },
//     {
//       id: 7,
//       name: "National University of Singapore",
//       location: "Singapore",
//       logo: "/michigan.png",
//       about: "Asia's top university with a global approach to education and research.",
//       scholarships: "NUS Global Merit Scholarship, ASEAN Undergraduate Scholarship.",
//       programs: "Diverse programs with strong emphasis on interdisciplinary learning.",
//       deadline: "March 3 for most undergraduate programs",
//       ranking: "#8 in the world (QS 2024)"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 font-sans">
//       <Navbar />
      
//       {/* Hero Section */}
//       <div className="relative bg-[#2D8CD4] py-16 text-white">
//         <div className="max-w-7xl mx-auto px-4 text-center">
//           <h1 className="text-4xl md:text-5xl font-bold mb-4">University Campaigns</h1>
//           <p className="text-xl max-w-3xl mx-auto">
//             Explore our partner institutions and express your interest to receive personalized guidance
//           </p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 py-12">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Left Content - Institutions */}
//           <div className="lg:w-2/3">
//             {/* Featured Institutions Slider */}
//             <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//               <h2 className="text-2xl font-bold text-[#2D8CD4] mb-6">Featured Institutions</h2>
//               <Slider {...sliderSettings}>
//                 {institutions.slice(0, 5).map((institution) => (
//                   <div key={institution.id} className="px-2">
//                     <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center h-full">
//                       <img 
//                         src={institution.logo} 
//                         alt={institution.name} 
//                         className="h-20 object-contain mb-4"
//                       />
//                       <h3 className="text-lg font-bold text-center mb-2">{institution.name}</h3>
//                       <div className="flex items-center text-sm text-gray-600 mb-3">
//                         <FaMapMarkerAlt className="mr-1" />
//                         <span>{institution.location}</span>
//                       </div>
//                       <button 
//                         onClick={() => document.getElementById(`institution-${institution.id}`).scrollIntoView({ behavior: 'smooth' })}
//                         className="mt-auto bg-[#2D8CD4] hover:bg-[#1A5F8B] text-white py-2 px-4 rounded text-sm transition-colors"
//                       >
//                         View Details
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </Slider>
//             </div>

//             {/* All Institutions List */}
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h2 className="text-2xl font-bold text-[#2D8CD4] mb-6">All Partner Institutions</h2>
//               <div className="space-y-4">
//                 {institutions.map((institution, index) => (
//                   <div 
//                     key={institution.id} 
//                     id={`institution-${institution.id}`}
//                     className="border border-gray-200 rounded-lg overflow-hidden"
//                   >
//                     <div 
//                       className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 hover:bg-gray-100"
//                       onClick={() => toggleInstitution(index)}
//                     >
//                       <div className="flex items-center">
//                         <img 
//                           src={institution.logo} 
//                           alt={institution.name} 
//                           className="h-12 w-12 object-contain mr-4"
//                         />
//                         <div>
//                           <h3 className="font-bold">{institution.name}</h3>
//                           <p className="text-sm text-gray-600 flex items-center">
//                             <FaMapMarkerAlt className="mr-1" />
//                             {institution.location}
//                           </p>
//                         </div>
//                       </div>
//                       {activeInstitution === index ? (
//                         <FaChevronUp className="text-[#2D8CD4]" />
//                       ) : (
//                         <FaChevronDown className="text-[#2D8CD4]" />
//                       )}
//                     </div>
//                     {activeInstitution === index && (
//                       <div className="p-4 bg-white border-t border-gray-200">
//                         <div className="grid md:grid-cols-2 gap-6">
//                           <div>
//                             <h4 className="font-bold mb-2 flex items-center">
//                               <FaUniversity className="mr-2 text-[#2D8CD4]" />
//                               About the University
//                             </h4>
//                             <p className="text-gray-700 mb-4">{institution.about}</p>
                            
//                             <h4 className="font-bold mb-2 flex items-center">
//                               <FaGraduationCap className="mr-2 text-[#2D8CD4]" />
//                               Programs Offered
//                             </h4>
//                             <p className="text-gray-700">{institution.programs}</p>
//                           </div>
//                           <div>
//                             <h4 className="font-bold mb-2 flex items-center">
//                               <FaMoneyBillWave className="mr-2 text-[#2D8CD4]" />
//                               Scholarship Availability
//                             </h4>
//                             <p className="text-gray-700 mb-4">{institution.scholarships}</p>
                            
//                             <h4 className="font-bold mb-2 flex items-center">
//                               <FaCalendarAlt className="mr-2 text-[#2D8CD4]" />
//                               Application Deadline
//                             </h4>
//                             <p className="text-gray-700 mb-4">{institution.deadline}</p>
                            
//                             <h4 className="font-bold mb-2 flex items-center">
//                               <FaGlobeAmericas className="mr-2 text-[#2D8CD4]" />
//                               Global Ranking
//                             </h4>
//                             <p className="text-gray-700">{institution.ranking}</p>
//                           </div>
//                         </div>
//                         <div className="mt-6 flex justify-end">
//                           <button
//                             onClick={() => {
//                               setFormData(prev => ({
//                                 ...prev,
//                                 institutionInterest: institution.name
//                               }));
//                               document.getElementById('interest-form').scrollIntoView({ behavior: 'smooth' });
//                             }}
//                             className="bg-[#2D8CD4] hover:bg-[#1A5F8B] text-white py-2 px-6 rounded transition-colors"
//                           >
//                             Express Interest
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Right Sidebar - Interest Form */}
//           <div className="lg:w-1/3" id="interest-form">
//             <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
//               <h2 className="text-2xl font-bold text-[#2D8CD4] mb-6">Express Your Interest</h2>
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                   <label htmlFor="fullName" className="block text-gray-700 mb-1">Full Name</label>
//                   <input
//                     type="text"
//                     id="fullName"
//                     name="fullName"
//                     placeholder="Your full name"
//                     className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D8CD4]"
//                     value={formData.fullName}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="email" className="block text-gray-700 mb-1">Email Address</label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     placeholder="Your email address"
//                     className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D8CD4]"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="phoneNumber" className="block text-gray-700 mb-1">Phone Number</label>
//                   <input
//                     type="tel"
//                     id="phoneNumber"
//                     name="phoneNumber"
//                     placeholder="Your phone number"
//                     className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D8CD4]"
//                     value={formData.phoneNumber}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="preferredCourse" className="block text-gray-700 mb-1">Preferred Course/Program</label>
//                   <input
//                     type="text"
//                     id="preferredCourse"
//                     name="preferredCourse"
//                     placeholder="e.g. Computer Science, MBA"
//                     className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D8CD4]"
//                     value={formData.preferredCourse}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="institutionInterest" className="block text-gray-700 mb-1">Institution of Interest</label>
//                   <select
//                     id="institutionInterest"
//                     name="institutionInterest"
//                     className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D8CD4]"
//                     value={formData.institutionInterest}
//                     onChange={handleChange}
//                   >
//                     <option value="">Select an institution</option>
//                     {institutions.map(institution => (
//                       <option key={institution.id} value={institution.name}>
//                         {institution.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full bg-[#2D8CD4] hover:bg-[#1A5F8B] text-white font-medium py-3 px-6 rounded-lg transition-colors"
//                 >
//                   Submit Interest Form
//                 </button>

//                 <p className="text-sm text-gray-500">
//                   By submitting this form, you agree to our privacy policy and consent to being contacted by our counselors.
//                 </p>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Visitor;