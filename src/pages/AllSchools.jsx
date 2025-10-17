import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import SchoolsListCom from "../components/AllJobsPage/SchoolsListCom";
import SearchAndFilter from "../components/AllJobsPage/SearchAndFilter";
import Navbar from "../components/shared/Navbar";
import PaginationCom from "../components/AllJobsPage/PaginationCom";
import { 
  FaSearch, 
  FaUniversity, 
  FaGraduationCap, 
  FaFilter,
  FaMapMarkerAlt,
  FaStar,
  FaGlobeAmericas,
  FaAward,
  FaUsers
} from 'react-icons/fa';

const AllSchools = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [quickStats, setQuickStats] = useState({
    totalSchools: 5000,
    countries: 50,
    successRate: 95,
    activeStudents: 100000
  });

  // Check screen size for responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      setShowFilters(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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
                <FaUniversity className="text-yellow-300" />
                Global Education Hub
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Find Your Perfect 
                <span className="text-yellow-300"> University</span>
              </h1>
              
              <p className="text-xl text-blue-100 leading-relaxed">
                Discover 5,000+ universities worldwide with our AI-powered matching system. 
                Get personalized recommendations based on your profile and preferences.
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-300">{quickStats.totalSchools.toLocaleString()}+</div>
                  <div className="text-blue-200 text-sm">Universities</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-300">{quickStats.countries}+</div>
                  <div className="text-blue-200 text-sm">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-300">{quickStats.successRate}%</div>
                  <div className="text-blue-200 text-sm">Success Rate</div>
                </div>
              </div>
            </div>

            {/* Right Content - Search Preview */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-center mb-6">Find Your Dream Program</h3>
              <div className="space-y-4">
                <div className="bg-white/20 rounded-xl p-4">
                  <div className="flex items-center gap-3 text-blue-100">
                    <FaSearch className="text-lg" />
                    <span>AI-Powered Matching</span>
                  </div>
                </div>
                <div className="bg-white/20 rounded-xl p-4">
                  <div className="flex items-center gap-3 text-blue-100">
                    <FaAward className="text-lg" />
                    <span>Scholarship Opportunities</span>
                  </div>
                </div>
                <div className="bg-white/20 rounded-xl p-4">
                  <div className="flex items-center gap-3 text-blue-100">
                    <FaGlobeAmericas className="text-lg" />
                    <span>Global University Network</span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => document.getElementById('search-section').scrollIntoView({ behavior: 'smooth' })}
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 mt-6"
              >
                Start Your Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Features */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-blue-100">
            <FaSearch className="text-3xl text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Smart Search</h3>
            <p className="text-gray-600 text-sm">AI-powered matching based on your profile</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-blue-100">
            <FaAward className="text-3xl text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Scholarship Info</h3>
            <p className="text-gray-600 text-sm">Find programs with funding opportunities</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-blue-100">
            <FaMapMarkerAlt className="text-3xl text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Global Reach</h3>
            <p className="text-gray-600 text-sm">Universities across 50+ countries</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-blue-100">
            <FaUsers className="text-3xl text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Expert Support</h3>
            <p className="text-gray-600 text-sm">Personalized counseling available</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div id="search-section" className="max-w-7xl mx-auto px-4 py-8">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <FaFilter />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Panel: Search Form */}
          <AnimatePresence>
            {(showFilters || window.innerWidth >= 1024) && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="lg:w-1/3"
              >
                <div className="bg-white rounded-2xl shadow-xl border border-blue-100 sticky top-4">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      <FaFilter className="text-blue-600" />
                      Find Your Program
                    </h2>
                    <p className="text-gray-600 mt-2">Fill out the form to get personalized matches</p>
                  </div>
                  <SearchAndFilter />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Right Panel: Results */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FaUniversity className="text-2xl text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-900">
                      Matching Schools & Programs
                    </h2>
                  </div>
                  <div className="hidden lg:block text-sm text-gray-600">
                    AI-powered results based on your criteria
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <SchoolsListCom />
                
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <PaginationCom />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need Personalized Guidance?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Our education experts are ready to help you find the perfect university match 
            and navigate the application process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105">
              Book Free Consultation
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-8 rounded-xl transition-colors">
              Contact Admissions
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllSchools;




































// import React from "react";
// import styled from "styled-components";
// import { motion } from "framer-motion";
// import SchoolsListCom from "../components/AllJobsPage/SchoolsListCom";
// import SearchAndFilter from "../components/AllJobsPage/SearchAndFilter";
// import Navbar from "../components/shared/Navbar";
// import PaginationCom from "../components/AllJobsPage/PaginationCom";
// import { FaSearch, FaUniversity, FaGraduationCap } from "react-icons/fa";

// const AllSchools = () => {
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
//           <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
//             The <span className="text-[#2D8CD4]">#1 School Directory</span> for Your Future
//           </h1>
//           <p className="text-xl text-white max-w-2xl">
//             Discover top-rated schools with our AI-powered recommendation engine
//           </p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Left Panel: Search Form */}
//           <div className="lg:w-1/3">
//             <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
//               <h2 className="text-2xl font-bold text-[#2D8CD4] mb-6">
//                 <FaSearch className="inline mr-2" />
//                 Find Your Program
//               </h2>
//               <SearchAndFilter />
//             </div>
//           </div>

//           {/* Right Panel: Results */}
//           <div className="lg:w-2/3">
//             <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//               <div className="flex items-center mb-6">
//                 <FaUniversity className="text-[#2D8CD4] text-2xl mr-3" />
//                 <h2 className="text-2xl font-bold text-gray-800">
//                   Matching Schools & Programs
//                 </h2>
//               </div>
              
//               <SchoolsListCom />
              
//               <div className="mt-8">
//                 <PaginationCom />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllSchools;


























// // import React from "react";
// // import styled from "styled-components";

// // import SchoolsListCom from "../components/AllJobsPage/SchoolsListCom";
// // import SearchAndFilter from "../components/AllJobsPage/SearchAndFilter";
// // import Navbar from "../components/shared/Navbar";
// // import PaginationCom from "../components/AllJobsPage/PaginationCom";

// // const AllSchools = () => {
// //   return (
// //     <>
// //       <Navbar />
// //       <Wrapper>
// //         {/* Hero Section */}
// //         <HeroSection>
// //           <HeroContent>
// //             <h1>
// //               The <span className="highlight">#1 school directory</span> to find
// //               vetted schools and programs.
// //             </h1>
// //             <p>
// //               Search for top-rated schools with our AI-powered recommendation engine
// //               built to give you the most suitable institution for you.
// //             </p>
// //           </HeroContent>
// //         </HeroSection>

// //         {/* Main Content */}
// //         <MainContent>
// //           {/* Left Panel: Search Form */}
// //           <StaticForm>
// //             <SearchAndFilter />
// //           </StaticForm>

// //           {/* Right Panel: Full Results */}
// //           <FullResults>
// //             <SchoolsListCom />
// //             <PaginationCom />
// //           </FullResults>
// //         </MainContent>
// //       </Wrapper>
// //     </>
// //   );
// // };

// // // Styled Components
// // const Wrapper = styled.div`
// //   width: 100%;
// //   max-width: 1200px;
// //   margin: 0 auto;
// //   display: flex;
// //   flex-direction: column;
// //   gap: 2rem;
// // `;

// // // Hero Section
// // const HeroSection = styled.section`
// //   display: flex;
// //   justify-content: space-between;
// //   align-items: center;
// //   background: #e3edf7;
// //   padding: 15px 50px;
// //   border-radius: 8px;
// //   margin: 20px;

// //   @media (max-width: 768px) {
// //     flex-direction: column;
// //     gap: 1rem;
// //   }
// // `;

// // const HeroContent = styled.div`
// //   h1 {
// //     font-size: 1.8rem;
// //     color: #2c374e;
// //     line-height: 1.4;
// //   }

// //   .highlight {
// //     color: #ff5e3a;
// //     font-weight: bold;
// //   }

// //   p {
// //     font-size: 1rem;
// //     color: #555;
// //     margin-top: 0.5rem;
// //   }
// // `;

// // // Main Content
// // const MainContent = styled.div`
// //   display: flex;
// //   gap: 2rem;
// //   margin-top: 1rem;

// //   @media (max-width: 768px) {
// //     flex-direction: column;
// //   }
// // `;

// // // Static Form Section (Sticky and Scrollable)
// // const StaticForm = styled.aside`
// //   flex: 1;
// //   background-color: #f9f9f9;
// //   padding: 20px;
// //   border-radius: 8px;
// //   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
// //   position: sticky;
// //   top: 20px; /* Keep the form 20px from the top while scrolling */
// //   height: 500px; /* Set a height for the form */
// //   overflow-y: auto; /* Enable scrolling if content overflows */

// //   @media (max-width: 768px) {
// //     width: 100%;
// //     position: relative; /* Remove sticky for smaller screens */
// //     height: auto; /* Allow the form to expand based on content */
// //   }
// // `;

// // // Full Results Section
// // const FullResults = styled.main`
// //   flex: 2;
// //   display: flex;
// //   flex-direction: column;
// //   gap: 1rem;
// //   padding: 0 10px;

// //   @media (max-width: 768px) {
// //     width: 100%;
// //   }
// // `;

// // export default AllSchools;













// // import React from "react";
// // import styled from "styled-components";

// // import SchoolsListCom from "../components/AllJobsPage/SchoolsListCom";
// // import SearchAndFilter from "../components/AllJobsPage/SearchAndFilter";

// // import Navbar from "../components/shared/Navbar";
// // import PaginationCom from "../components/AllJobsPage/PaginationCom";

// // const AllSchools = () => {
// //     return (
// //         <>
// //             <Navbar />
// //             <Wrapper>
// //                 <SearchAndFilter />
// //                 <SchoolsListCom />
// //                 <PaginationCom />
// //             </Wrapper>
// //         </>
// //     );
// // };

// // const Wrapper = styled.section`
// //     padding: 2rem 1.5rem;
// //     width: 100%;
// //     max-width: 1200px;
// //     margin: 0 auto;
// // `;
// // export default AllSchools;
