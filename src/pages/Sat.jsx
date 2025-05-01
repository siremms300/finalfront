import React, { useState, useEffect } from 'react';
import { useSAT } from "../context/SATContext";
import Navbar from "../components/shared/Navbar";
import { 
  FaCalendarAlt, 
  FaClock, 
  FaMapMarkerAlt, 
  FaCheck, 
  FaTrophy,
  FaSchool, 
  FaUserGraduate,
  FaMedal,
  FaChartLine,
  FaAward,
  FaUsers,
  FaMoneyBillWave
} from 'react-icons/fa';

const Sat = () => {
  const { loading, error, registerForSAT } = useSAT();
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    email: '',
    phoneNumber: '',
    currentClass: 'SSS',
    currentGPA: '4.0',
    isStraightAStudent: false,
    interestInStudyingAbroad: true,
    sponsorAvailability: 'none',
    referralSource: 'Social Media',
    referrerName: '',
    referrerPhone: '',
    referrerEmail: '',
    parentConsent: false
  });

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // School rankings data
  const [leaderboard, setLeaderboard] = useState([
    { rank: 1, school: 'Greenwood High', score: 1540, students: 28 },
    { rank: 2, school: 'Sunrise Academy', score: 1510, students: 32 },
    { rank: 3, school: 'Preston International', score: 1490, students: 24 },
    { rank: 4, school: 'Heritage College', score: 1475, students: 19 },
    { rank: 5, school: 'Maplewood Secondary', score: 1460, students: 22 }
  ]);

  // Next competition date
  const competitionDate = new Date('2025-06-15T08:00:00-07:00');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = competitionDate - now;

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
      await registerForSAT(formData);
      setFormData({
        fullName: '',
        dob: '',
        email: '',
        phoneNumber: '',
        currentClass: 'SSS',
        currentGPA: '4.0',
        isStraightAStudent: false,
        interestInStudyingAbroad: true,
        sponsorAvailability: 'none',
        referralSource: 'Social Media',
        referrerName: '',
        referrerPhone: '',
        referrerEmail: '',
        parentConsent: false
      });
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  // Generate GPA options from 1.0 to 5.0 in 0.1 increments
  const gpaOptions = [];
  for (let i = 5.0; i >= 1.0; i -= 0.1) {
    gpaOptions.push(i.toFixed(1));
  }

  const competitionStats = [
    { icon: <FaSchool className="text-2xl" />, value: "42+", label: "Schools Registered" },
    { icon: <FaUserGraduate className="text-2xl" />, value: "387+", label: "Students Competing" },
    { icon: <FaAward className="text-2xl" />, value: "₦50,000", label: "Total Prize Pool" }
  ];

  const programBenefits = [
    "Standardized mock test for Math and English",
    "Determine your readiness for SAT exams",
    "Win scholarships and cash prizes",
    "Benchmark your performance before the real SAT",
    "Special recognition for top performers",
    "First prize: Up to 80% scholarship with partner institutions",
    "Free application process for first prize winner"
  ];

  const prizes = [
    {
      title: "First Prize",
      icon: <FaTrophy className="text-3xl text-yellow-500" />,
      description: "Best performing student with a minimum of 3.4 GPA stands the chance of securing up to 80% scholarship with our partner institutions in the United States. Plus free application process handled by Scovers Education.",
      additional: "Free live SAT registration for students scoring 1400+ on SAT (T&C apply)"
    },
    {
      title: "Second Prize",
      icon: <FaMoneyBillWave className="text-3xl text-gray-500" />,
      description: "Cash reward of ₦30,000",
      additional: ""
    },
    {
      title: "Third Prize",
      icon: <FaMedal className="text-3xl text-amber-600" />,
      description: "Cash reward of ₦20,000",
      additional: ""
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      
      {/* Hero Section with Image Background */}
      <div className="relative">
        <div 
          className="absolute inset-0 bg-[url('/webback.jpg')] bg-cover bg-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 py-4 md:py-6 flex flex-col md:flex-row justify-between items-center">
          {/* Left text - reduced height */}
          <div className="text-left mb-8 md:mb-0 md:w-1/2">
            <h1 className="text-3xl md:text-4xl font-medium text-white mb-4">
              SAT Preparation Mock Test
            </h1>
            <p className="text-lg text-white max-w-lg">
              A standardized Math and English test to assess your readiness for college admissions
            </p>
          </div>

          {/* Right countdown timer */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center md:w-1/3">
            <h3 className="text-white font-medium mb-4">Next Test Begins In</h3>
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

      {/* Stats Section */}
      <div className="bg-white py-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {competitionStats.map((stat, index) => (
              <div key={index} className="text-center p-4">
                <div className="text-blue-600 flex justify-center mb-2">
                  {stat.icon}
                </div>
                <div className="text-3xl font-medium text-gray-800">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Program Details */}
          <div className="lg:w-2/3 space-y-8">
            {/* About the Test */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-medium text-blue-600 mb-6">About the Test</h2>
              <div className="border-b border-gray-200 pb-6 mb-6">
                <p className="text-gray-600">
                  This is a Math and English standardized mock test designed for students preparing for college admissions.
                  The aim is to determine the adequacy of students preparing to study abroad for the SAT exams.
                </p>
              </div>
              
              <h3 className="text-xl font-medium text-blue-600 mb-4">Program Benefits</h3>
              <ul className="space-y-3">
                {programBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <FaCheck className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Prizes Section */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-medium text-blue-600 mb-6">Prizes</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {prizes.map((prize, index) => (
                  <div key={index} className="border rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                    <div className="flex justify-center mb-4">
                      {prize.icon}
                    </div>
                    <h3 className="text-xl font-medium text-gray-800 mb-2">{prize.title}</h3>
                    <p className="text-gray-600 mb-3">{prize.description}</p>
                    {prize.additional && (
                      <p className="text-sm text-blue-600">{prize.additional}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Test Schedule */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-medium text-blue-600 mb-6">Test Schedule</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <FaCalendarAlt className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Test Date</h3>
                    <p className="text-gray-600">To be announced</p>
                    <p className="text-gray-500 text-sm mt-1">Check back for updates on the test schedule</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <FaClock className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Duration</h3>
                    <p className="text-gray-600">Approximately 3 hours</p>
                    <p className="text-gray-500 text-sm mt-1">Timed sections for Math and English</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <FaTrophy className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Results Announcement</h3>
                    <p className="text-gray-600">Within 2 weeks of test completion</p>
                    <p className="text-gray-500 text-sm mt-1">Detailed score reports will be provided</p>
                  </div>
                </div>
              </div>
            </div>

            {/* School Rankings with Light Blue Background */}
            {/* <div className="bg-blue-50 p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-medium text-blue-600 mb-6 text-left">
                Current School Rankings
              </h2>
              <p className="text-gray-600 mb-4">School rankings are currently being calculated and will be updated soon.</p>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Rank</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">School</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Avg Score</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Students</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {leaderboard.map((school) => (
                      <tr key={school.rank}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {school.rank === 1 ? (
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm">🥇 1st</span>
                          ) : school.rank === 2 ? (
                            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm">🥈 2nd</span>
                          ) : school.rank === 3 ? (
                            <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-sm">🥉 3rd</span>
                          ) : (
                            `#${school.rank}`
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium">{school.school}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{school.score}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{school.students}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div> */} 



            {/* SCHOOOOOOOOOL STAT PENDINGGGGGGGGGGG */}

            {/* School Rankings with Light Blue Background */}
            <div className="bg-blue-50 p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-medium text-blue-600 mb-6 text-left">
                Current School Rankings
              </h2>
              <div className="text-center py-10">
                <div className="inline-block bg-white p-6 rounded-lg shadow-sm">
                  <FaChartLine className="text-4xl text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Rankings Pending</h3>
                  <p className="text-gray-500">School rankings will be available soon.</p>
                </div>
              </div>
            </div>



          </div>

          {/* Registration Form */}
          <div className="lg:w-1/3" id="registration-form">
            <div className="bg-white p-6 rounded-lg shadow-lg sticky top-4">
              <h3 className="text-xl font-medium text-blue-600 mb-6 text-left">Mock Test Registration</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-300"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-300"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-300"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-300"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Current Class</label>
                  <select
                    name="currentClass"
                    className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-300"
                    value={formData.currentClass}
                    onChange={handleChange}
                    required
                  >
                    <option value="JSS">Junior Secondary School</option>
                    <option value="SSS">Senior Secondary School</option>
                    <option value="Grade 11">Grade 11</option>
                    <option value="Grade 12">Grade 12</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Current GPA (5.0 scale)</label>
                  <select
                    name="currentGPA"
                    className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-300"
                    value={formData.currentGPA}
                    onChange={handleChange}
                    required
                  >
                    {gpaOptions.map(gpa => (
                      <option key={gpa} value={gpa}>{gpa}</option>
                    ))}
                  </select>
                  {parseFloat(formData.currentGPA) < 3.4 && (
                    <p className="text-yellow-600 text-xs mt-1">
                      Note: Minimum 3.4 GPA required for scholarship consideration
                    </p>
                  )}
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isStraightAStudent"
                    id="isStraightAStudent"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-300"
                    checked={formData.isStraightAStudent}
                    onChange={handleChange}
                  />
                  <label htmlFor="isStraightAStudent" className="ml-2 text-sm text-gray-600">
                    Are you a straight A student?
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="interestInStudyingAbroad"
                    id="interestInStudyingAbroad"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-300"
                    checked={formData.interestInStudyingAbroad}
                    onChange={handleChange}
                  />
                  <label htmlFor="interestInStudyingAbroad" className="ml-2 text-sm text-gray-600">
                    Interested in studying abroad?
                  </label>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Sponsorship Availability</label>
                  <select
                    name="sponsorAvailability"
                    className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-300"
                    value={formData.sponsorAvailability}
                    onChange={handleChange}
                    required
                  >
                    <option value="none">No sponsor available</option>
                    <option value="5000-7000">$5,000 - $7,000</option>
                    <option value="7000-15000">$7,000 - $15,000</option>
                    <option value="15000-20000">$15,000 - $20,000</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-1">How did you hear about us?</label>
                  <select
                    name="referralSource"
                    className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-300"
                    value={formData.referralSource}
                    onChange={handleChange}
                    required
                  >
                    <option value="Social Media">Social Media</option>
                    <option value="Pocketfriendlydigitals">Pocketfriendlydigitals</option>
                    <option value="Individual Recommendation">Individual Recommendation</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                {formData.referralSource === 'Individual Recommendation' && (
                  <>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Referrer's Name</label>
                      <input
                        type="text"
                        name="referrerName"
                        className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-300"
                        value={formData.referrerName}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Referrer's Phone</label>
                      <input
                        type="tel"
                        name="referrerPhone"
                        className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-300"
                        value={formData.referrerPhone}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Referrer's Email</label>
                      <input
                        type="email"
                        name="referrerEmail"
                        className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-300"
                        value={formData.referrerEmail}
                        onChange={handleChange}
                      />
                    </div>
                  </>
                )}
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="parentConsent"
                    id="parentConsent"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-300"
                    checked={formData.parentConsent}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="parentConsent" className="ml-2 text-sm text-gray-600">
                    I have parent/guardian consent
                  </label>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded transition-colors"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Register for Mock Test'}
                </button>
                
                {error && (
                  <p className="text-red-500 text-sm mt-2">{error}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sat;






























































// import React, { useState, useEffect } from 'react';
// import { useSAT } from "../context/SATContext";
// import Navbar from "../components/shared/Navbar";
// import { 
//   FaCalendarAlt, 
//   FaClock, 
//   FaMapMarkerAlt, 
//   FaCheck, 
//   FaTrophy,
//   FaSchool, 
//   FaUserGraduate,
//   FaMedal,
//   FaChartLine,
//   FaAward,
//   FaUsers
// } from 'react-icons/fa';

// const Sat = () => {
//   const { loading, error, registerForSAT } = useSAT();
//   const [formData, setFormData] = useState({
//     fullName: '',
//     dob: '',
//     email: '',
//     phoneNumber: '',
//     currentClass: 'SSS',
//     currentGPA: '4.0',
//     isStraightAStudent: false,
//     interestInStudyingAbroad: true,
//     sponsorAvailability: 'none',
//     referralSource: 'Social Media',
//     referrerName: '',
//     referrerPhone: '',
//     referrerEmail: '',
//     parentConsent: false
//   });

//   // Countdown timer state
//   const [timeLeft, setTimeLeft] = useState({
//     days: 0,
//     hours: 0,
//     minutes: 0,
//     seconds: 0
//   });

//   // School rankings data
//   const [leaderboard, setLeaderboard] = useState([
//     { rank: 1, school: 'Greenwood High', score: 1540, students: 28 },
//     { rank: 2, school: 'Sunrise Academy', score: 1510, students: 32 },
//     { rank: 3, school: 'Preston International', score: 1490, students: 24 },
//     { rank: 4, school: 'Heritage College', score: 1475, students: 19 },
//     { rank: 5, school: 'Maplewood Secondary', score: 1460, students: 22 }
//   ]);

//   // Next competition date
//   const competitionDate = new Date('2025-06-15T08:00:00-07:00');

//   useEffect(() => {
//     const timer = setInterval(() => {
//       const now = new Date();
//       const difference = competitionDate - now;

//       if (difference <= 0) {
//         clearInterval(timer);
//         return;
//       }

//       const days = Math.floor(difference / (1000 * 60 * 60 * 24));
//       const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//       const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((difference % (1000 * 60)) / 1000);

//       setTimeLeft({ days, hours, minutes, seconds });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({ 
//       ...prev, 
//       [name]: type === 'checkbox' ? checked : value 
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await registerForSAT(formData);
//       setFormData({
//         fullName: '',
//         dob: '',
//         email: '',
//         phoneNumber: '',
//         currentClass: 'SSS',
//         currentGPA: '4.0',
//         isStraightAStudent: false,
//         interestInStudyingAbroad: true,
//         sponsorAvailability: 'none',
//         referralSource: 'Social Media',
//         referrerName: '',
//         referrerPhone: '',
//         referrerEmail: '',
//         parentConsent: false
//       });
//     } catch (err) {
//       console.error("Registration error:", err);
//     }
//   };

//   // Generate GPA options from 1.0 to 5.0 in 0.1 increments
//   const gpaOptions = [];
//   for (let i = 5.0; i >= 1.0; i -= 0.1) {
//     gpaOptions.push(i.toFixed(1));
//   }

//   const competitionStats = [
//     { icon: <FaSchool className="text-2xl" />, value: "42+", label: "Schools Registered" },
//     { icon: <FaUserGraduate className="text-2xl" />, value: "387+", label: "Students Competing" },
//     { icon: <FaAward className="text-2xl" />, value: "$15,000", label: "Total Prize Pool" }
//   ];

//   const programBenefits = [
//     "Compete against top students from across the region",
//     "Win scholarships and academic prizes",
//     "Benchmark your performance before the real SAT",
//     "Gain recognition for your school",
//     "Special awards for top-performing schools",
//     "College admission officers attending",
//     "Networking with high-achieving peers"
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 font-sans">
//       <Navbar />
      
//       {/* Hero Section with Image Background */}
//       <div className="relative">
//         <div 
//           className="absolute inset-0 bg-[url('/webback.jpg')] bg-cover bg-center"
//           style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
//         ></div>
//         <div className="relative max-w-7xl mx-auto px-4 py-4 md:py-6 flex flex-col md:flex-row justify-between items-center">
//           {/* Left text - reduced height */}
//           <div className="text-left mb-8 md:mb-0 md:w-1/2">
//             <h1 className="text-3xl md:text-4xl font-medium text-white mb-4">
//               Annual Inter-School SAT Challenge
//             </h1>
//             <p className="text-lg text-white max-w-lg">
//               Compete with the brightest minds and showcase your academic excellence
//             </p>
//           </div>

//           {/* Right countdown timer */}
//           <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center md:w-1/3">
//             <h3 className="text-white font-medium mb-4">Next Competition Begins In</h3>
//             <div className="grid grid-cols-4 gap-2">
//               <div className="bg-[#2D8CD4]/90 p-3 rounded">
//                 <div className="text-2xl font-medium text-white">{timeLeft.days}</div>
//                 <div className="text-xs text-white/80">DAYS</div>
//               </div>
//               <div className="bg-[#2D8CD4]/90 p-3 rounded">
//                 <div className="text-2xl font-medium text-white">{timeLeft.hours}</div>
//                 <div className="text-xs text-white/80">HOURS</div>
//               </div>
//               <div className="bg-[#2D8CD4]/90 p-3 rounded">
//                 <div className="text-2xl font-medium text-white">{timeLeft.minutes}</div>
//                 <div className="text-xs text-white/80">MINS</div>
//               </div>
//               <div className="bg-[#2D8CD4]/90 p-3 rounded">
//                 <div className="text-2xl font-medium text-white">{timeLeft.seconds}</div>
//                 <div className="text-xs text-white/80">SECS</div>
//               </div>
//             </div>
//             <button 
//               onClick={() => document.getElementById('registration-form').scrollIntoView({ behavior: 'smooth' })}
//               className="mt-4 bg-white text-[#2D8CD4] hover:bg-gray-100 font-medium py-2 px-6 rounded transition-colors"
//             >
//               Register Now
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Stats Section */}
//       <div className="bg-white py-8 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {competitionStats.map((stat, index) => (
//               <div key={index} className="text-center p-4">
//                 <div className="text-blue-600 flex justify-center mb-2">
//                   {stat.icon}
//                 </div>
//                 <div className="text-3xl font-medium text-gray-800">{stat.value}</div>
//                 <div className="text-gray-600">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 py-12">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Program Details */}
//           <div className="lg:w-2/3 space-y-8">
//             {/* About the Competition */}
//             <div className="bg-white p-8 rounded-lg shadow-md">
//               <h2 className="text-2xl font-medium text-blue-600 mb-6">About the Competition</h2>
//               <div className="border-b border-gray-200 pb-6 mb-6">
//                 <p className="text-gray-600">
//                   Our annual inter-school SAT challenge brings together the brightest students from across the region 
//                   to compete in a rigorous academic competition. This event serves as both a mock exam and a 
//                   scholarship competition, with top performers earning recognition and financial awards.
//                 </p>
//               </div>
              
//               <h3 className="text-xl font-medium text-blue-600 mb-4">Program Benefits</h3>
//               <ul className="space-y-3">
//                 {programBenefits.map((benefit, index) => (
//                   <li key={index} className="flex items-start">
//                     <FaCheck className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
//                     <span className="text-gray-600">{benefit}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Competition Schedule */}
//             <div className="bg-white p-8 rounded-lg shadow-md">
//               <h2 className="text-2xl font-medium text-blue-600 mb-6">Event Schedule</h2>
//               <div className="space-y-4">
//                 <div className="flex items-start">
//                   <div className="bg-blue-100 p-2 rounded-full mr-4">
//                     <FaCalendarAlt className="text-blue-600" />
//                   </div>
//                   <div>
//                     <h3 className="font-medium text-gray-800">Day 1: Orientation</h3>
//                     <p className="text-gray-600">June 14, 2025 | 9:00 AM - 12:00 PM</p>
//                     <p className="text-gray-500 text-sm mt-1">Overview of competition rules and structure</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start">
//                   <div className="bg-blue-100 p-2 rounded-full mr-4">
//                     <FaClock className="text-blue-600" />
//                   </div>
//                   <div>
//                     <h3 className="font-medium text-gray-800">Day 2: Main Competition</h3>
//                     <p className="text-gray-600">June 15, 2025 | 8:00 AM - 12:30 PM</p>
//                     <p className="text-gray-500 text-sm mt-1">Full-length SAT exam under competition conditions</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start">
//                   <div className="bg-blue-100 p-2 rounded-full mr-4">
//                     <FaTrophy className="text-blue-600" />
//                   </div>
//                   <div>
//                     <h3 className="font-medium text-gray-800">Day 2: Awards Ceremony</h3>
//                     <p className="text-gray-600">June 15, 2025 | 3:00 PM - 5:00 PM</p>
//                     <p className="text-gray-500 text-sm mt-1">Recognition of top performers and schools</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* School Rankings with Light Blue Background */}
//             <div className="bg-blue-50 p-8 rounded-lg shadow-md">
//               <h2 className="text-2xl font-medium text-blue-600 mb-6 text-left">
//                 Current School Rankings
//               </h2>
//               <div className="overflow-x-auto">
//                 <table className="min-w-full bg-white rounded-lg overflow-hidden">
//                   <thead className="bg-blue-100">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Rank</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">School</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Avg Score</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Students</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200">
//                     {leaderboard.map((school) => (
//                       <tr key={school.rank}>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           {school.rank === 1 ? (
//                             <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm">🥇 1st</span>
//                           ) : school.rank === 2 ? (
//                             <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm">🥈 2nd</span>
//                           ) : school.rank === 3 ? (
//                             <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-sm">🥉 3rd</span>
//                           ) : (
//                             `#${school.rank}`
//                           )}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap font-medium">{school.school}</td>
//                         <td className="px-6 py-4 whitespace-nowrap">{school.score}</td>
//                         <td className="px-6 py-4 whitespace-nowrap">{school.students}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>

//           {/* Registration Form */}
//           <div className="lg:w-1/3" id="registration-form">
//             <div className="bg-white p-6 rounded-lg shadow-lg sticky top-4">
//               <h3 className="text-xl font-medium text-blue-600 mb-6 text-left">SAT Competition Registration</h3>
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                   <label className="block text-sm text-gray-600 mb-1">Full Name</label>
//                   <input
//                     type="text"
//                     name="fullName"
//                     className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-300"
//                     value={formData.fullName}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm text-gray-600 mb-1">Date of Birth</label>
//                   <input
//                     type="date"
//                     name="dob"
//                     className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-300"
//                     value={formData.dob}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm text-gray-600 mb-1">Email Address</label>
//                   <input
//                     type="email"
//                     name="email"
//                     className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-300"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
//                   <input
//                     type="tel"
//                     name="phoneNumber"
//                     className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-300"
//                     value={formData.phoneNumber}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm text-gray-600 mb-1">Current Class</label>
//                   <select
//                     name="currentClass"
//                     className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-300"
//                     value={formData.currentClass}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="JSS">Junior Secondary School</option>
//                     <option value="SSS">Senior Secondary School</option>
//                     <option value="Grade 11">Grade 11</option>
//                     <option value="Grade 12">Grade 12</option>
//                   </select>
//                 </div>
                
//                 <div>
//                   <label className="block text-sm text-gray-600 mb-1">Current GPA (5.0 scale)</label>
//                   <select
//                     name="currentGPA"
//                     className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-300"
//                     value={formData.currentGPA}
//                     onChange={handleChange}
//                     required
//                   >
//                     {gpaOptions.map(gpa => (
//                       <option key={gpa} value={gpa}>{gpa}</option>
//                     ))}
//                   </select>
//                   {parseFloat(formData.currentGPA) < 4.0 && (
//                     <p className="text-yellow-600 text-xs mt-1">
//                       Note: Lower chances of scholarship for GPA below 4.0
//                     </p>
//                   )}
//                 </div>
                
//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     name="isStraightAStudent"
//                     id="isStraightAStudent"
//                     className="h-4 w-4 text-blue-600 focus:ring-blue-300"
//                     checked={formData.isStraightAStudent}
//                     onChange={handleChange}
//                   />
//                   <label htmlFor="isStraightAStudent" className="ml-2 text-sm text-gray-600">
//                     Are you a straight A student?
//                   </label>
//                 </div>
                
//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     name="interestInStudyingAbroad"
//                     id="interestInStudyingAbroad"
//                     className="h-4 w-4 text-blue-600 focus:ring-blue-300"
//                     checked={formData.interestInStudyingAbroad}
//                     onChange={handleChange}
//                   />
//                   <label htmlFor="interestInStudyingAbroad" className="ml-2 text-sm text-gray-600">
//                     Interested in studying abroad?
//                   </label>
//                 </div>
                
//                 <div>
//                   <label className="block text-sm text-gray-600 mb-1">Sponsorship Availability</label>
//                   <select
//                     name="sponsorAvailability"
//                     className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-300"
//                     value={formData.sponsorAvailability}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="none">No sponsor available</option>
//                     <option value="5000-7000">$5,000 - $7,000</option>
//                     <option value="7000-15000">$7,000 - $15,000</option>
//                     <option value="15000-20000">$15,000 - $20,000</option>
//                   </select>
//                 </div>
                
//                 <div>
//                   <label className="block text-sm text-gray-600 mb-1">How did you hear about us?</label>
//                   <select
//                     name="referralSource"
//                     className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-300"
//                     value={formData.referralSource}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="Social Media">Social Media</option>
//                     <option value="Pocketfriendlydigitals">Pocketfriendlydigitals</option>
//                     <option value="Individual Recommendation">Individual Recommendation</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </div>
                
//                 {formData.referralSource === 'Individual Recommendation' && (
//                   <>
//                     <div>
//                       <label className="block text-sm text-gray-600 mb-1">Referrer's Name</label>
//                       <input
//                         type="text"
//                         name="referrerName"
//                         className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-300"
//                         value={formData.referrerName}
//                         onChange={handleChange}
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm text-gray-600 mb-1">Referrer's Phone</label>
//                       <input
//                         type="tel"
//                         name="referrerPhone"
//                         className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-300"
//                         value={formData.referrerPhone}
//                         onChange={handleChange}
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm text-gray-600 mb-1">Referrer's Email</label>
//                       <input
//                         type="email"
//                         name="referrerEmail"
//                         className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-300"
//                         value={formData.referrerEmail}
//                         onChange={handleChange}
//                       />
//                     </div>
//                   </>
//                 )}
                
//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     name="parentConsent"
//                     id="parentConsent"
//                     className="h-4 w-4 text-blue-600 focus:ring-blue-300"
//                     checked={formData.parentConsent}
//                     onChange={handleChange}
//                     required
//                   />
//                   <label htmlFor="parentConsent" className="ml-2 text-sm text-gray-600">
//                     I have parent/guardian consent
//                   </label>
//                 </div>
                
//                 <button
//                   type="submit"
//                   className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded transition-colors"
//                   disabled={loading}
//                 >
//                   {loading ? 'Processing...' : 'Register for Competition'}
//                 </button>
                
//                 {error && (
//                   <p className="text-red-500 text-sm mt-2">{error}</p>
//                 )}
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sat;




