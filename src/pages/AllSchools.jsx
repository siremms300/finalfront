import React from "react";
import styled from "styled-components";

import SchoolsListCom from "../components/AllJobsPage/SchoolsListCom";
import SearchAndFilter from "../components/AllJobsPage/SearchAndFilter";
import Navbar from "../components/shared/Navbar";
import PaginationCom from "../components/AllJobsPage/PaginationCom";

const AllSchools = () => {
  return (
    <>
      <Navbar />
      <Wrapper>
        {/* Hero Section */}
        <HeroSection>
          <HeroContent>
            <h1>
              The <span className="highlight">#1 school directory</span> to find
              vetted schools and programs.
            </h1>
            <p>
              Search for top-rated schools with our AI-powered recommendation engine
              built to give you the most suitable institution for you.
            </p>
          </HeroContent>
        </HeroSection>

        {/* Main Content */}
        <MainContent>
          {/* Left Panel: Search Form */}
          <StaticForm>
            <SearchAndFilter />
          </StaticForm>

          {/* Right Panel: Full Results */}
          <FullResults>
            <SchoolsListCom />
            <PaginationCom />
          </FullResults>
        </MainContent>
      </Wrapper>
    </>
  );
};

// Styled Components
const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

// Hero Section
const HeroSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #e3edf7;
  padding: 15px 50px;
  border-radius: 8px;
  margin: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const HeroContent = styled.div`
  h1 {
    font-size: 1.8rem;
    color: #2c374e;
    line-height: 1.4;
  }

  .highlight {
    color: #ff5e3a;
    font-weight: bold;
  }

  p {
    font-size: 1rem;
    color: #555;
    margin-top: 0.5rem;
  }
`;

// Main Content
const MainContent = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// Static Form Section (Sticky and Scrollable)
const StaticForm = styled.aside`
  flex: 1;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 20px; /* Keep the form 20px from the top while scrolling */
  height: 500px; /* Set a height for the form */
  overflow-y: auto; /* Enable scrolling if content overflows */

  @media (max-width: 768px) {
    width: 100%;
    position: relative; /* Remove sticky for smaller screens */
    height: auto; /* Allow the form to expand based on content */
  }
`;

// Full Results Section
const FullResults = styled.main`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 10px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export default AllSchools;
















// import React from "react";
// import styled from "styled-components";

// import SchoolsListCom from "../components/AllJobsPage/SchoolsListCom";
// import SearchAndFilter from "../components/AllJobsPage/SearchAndFilter";
// import Navbar from "../components/shared/Navbar";
// import PaginationCom from "../components/AllJobsPage/PaginationCom";

// const AllSchools = () => {
//   return (
//     <>
//       <Navbar />
//       <Wrapper>
//         {/* Hero Section */}
//         <HeroSection>
//           <HeroContent>
//             <h1>
//               The <span className="highlight">#1 school directory</span> to find
//               vetted schools and programs.
//             </h1>
//             <p>
//               Search for top-rated schools with our AI-powered recommendation engine
//               built to give you the most suitable institution for you.
//             </p>
//           </HeroContent>
//         </HeroSection>

//         {/* Main Content */}
//         <MainContent>
//           {/* Left Panel: Search Form */}
//           <StaticForm>
//             <SearchAndFilter />
//           </StaticForm>

//           {/* Right Panel: Full Results */}
//           <FullResults>
//             <SchoolsListCom />
//             <PaginationCom />
//           </FullResults>
//         </MainContent>
//       </Wrapper>
//     </>
//   );
// };

// // Styled Components
// const Wrapper = styled.div`
//   width: 100%;
//   max-width: 1200px;
//   margin: 0 auto;
//   display: flex;
//   flex-direction: column;
//   gap: 2rem;
// `;

// // Hero Section
// const HeroSection = styled.section`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   background: #e3edf7;
//   padding: 15px 50px;
//   border-radius: 8px;
//   margin: 20px;

//   @media (max-width: 768px) {
//     flex-direction: column;
//     gap: 1rem;
//   }
// `;

// const HeroContent = styled.div`
//   h1 {
//     font-size: 1.8rem;
//     color: #2c374e;
//     line-height: 1.4;
//   }

//   .highlight {
//     color: #ff5e3a;
//     font-weight: bold;
//   }

//   p {
//     font-size: 1rem;
//     color: #555;
//     margin-top: 0.5rem;
//   }
// `;

// // Main Content
// const MainContent = styled.div`
//   display: flex;
//   gap: 2rem;
//   margin-top: 1rem;

//   @media (max-width: 768px) {
//     flex-direction: column;
//   }
// `;

// // Static Form Section
// const StaticForm = styled.aside`
//   flex: 1;
//   background-color: #f9f9f9;
//   padding: 20px;
//   border-radius: 8px;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

//   @media (max-width: 768px) {
//     width: 100%;
//   }
// `;

// // Full Results Section
// const FullResults = styled.main`
//   flex: 2;
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;

//   /* Add padding for better alignment */
//   padding: 0 10px;

//   @media (max-width: 768px) {
//     width: 100%;
//   }
// `;

// export default AllSchools;






















// import React from "react";
// import styled from "styled-components";

// import SchoolsListCom from "../components/AllJobsPage/SchoolsListCom";
// import SearchAndFilter from "../components/AllJobsPage/SearchAndFilter";
// import Navbar from "../components/shared/Navbar";
// import PaginationCom from "../components/AllJobsPage/PaginationCom";

// // import heroImage from "../assets/hero-image.png"; // Replace with your actual image path

// const AllSchools = () => {
//   return (
//     <>
//       <Navbar />
//       <Wrapper>
//         {/* Hero Section */}
//         <HeroSection>
//           <HeroContent>
//             <h1>
//               The <span className="highlight">#1 school directory</span> to find
//               vetted schools and programs.
//             </h1>
//             <p>
//               Search for top-rated schools with our AI powered recommendation engine
//               built to give you the most suitable institution for you. 
//             </p>
//           </HeroContent>
//           {/* <HeroImage>
//             <img src={heroImage} alt="Relaxed student" />
//           </HeroImage> */}
//         </HeroSection>

//         {/* Main Content */}
//         <MainContent>
//           {/* Left Panel: Search Form */}
//           <StaticForm>
//             <SearchAndFilter />
//           </StaticForm>

//           {/* Right Panel: Scrollable Results */}
//           <ScrollableResults>
//             <SchoolsListCom />
//             <PaginationCom />
//           </ScrollableResults>
//         </MainContent>
//       </Wrapper>
//     </>
//   );
// };

// // Styled Components
// const Wrapper = styled.div`
//   width: 100%;
//   max-width: 1200px;
//   margin: 0 auto;
//   display: flex;
//   flex-direction: column;
//   gap: 2rem;
// `;

// // Hero Section
// const HeroSection = styled.section`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   background: #e3edf7;
//   padding: 15px 50px;
//   border-radius: 8px;
//   margin: 20px;
//   position: sticky;
//   top: 0;
//   z-index: 10;

//   @media (max-width: 768px) {
//     flex-direction: column;
//     gap: 1rem;
//   }
// `;

// const HeroContent = styled.div`
//   flex: 1;

//   h1 {
//     font-size: 1.8rem;
//     color: #2c374e;
//     line-height: 1.4;
//   }

//   .highlight {
//     color: #ff5e3a;
//     font-weight: bold;
//   }

//   p {
//     font-size: 1rem;
//     color: #555;
//     margin-top: 0.5rem;
//   }
// `;

// const HeroImage = styled.div`
//   flex: 1;
//   text-align: right;

//   img {
//     max-width: 100%;
//     height: auto;
//     border-radius: 8px;
//   }

//   @media (max-width: 768px) {
//     text-align: center;
//   }
// `;

// // Main Content
// const MainContent = styled.div`
//   display: flex;
//   gap: 2rem;
//   margin-top: 1rem;

//   @media (max-width: 768px) {
//     flex-direction: column;
//   }
// `;

// // Static Form Section
// const StaticForm = styled.aside`
//   flex: 1;
//   position: sticky;
//   top: 150px; /* Adjust based on hero height */
//   align-self: flex-start;
//   background-color: #f9f9f9;
//   padding: 20px;
//   border-radius: 8px;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

//   @media (max-width: 768px) {
//     position: static;
//     width: 100%;
//   }
// `;

// // Scrollable Results Section
// const ScrollableResults = styled.main`
//   flex: 2;
//   overflow-y: auto;
//   max-height: calc(100vh - 200px); /* Adjust height based on hero and padding */
//   padding-right: 10px;

//   /* Add scrollbar styles for better aesthetics */
//   &::-webkit-scrollbar {
//     width: 8px;
//   }

//   &::-webkit-scrollbar-thumb {
//     background: #1a73e8;
//     border-radius: 4px;
//   }

//   &::-webkit-scrollbar-track {
//     background: #f0f4f8;
//   }
// `;

// export default AllSchools;

















// import React from "react";
// import styled from "styled-components";

// import SchoolsListCom from "../components/AllJobsPage/SchoolsListCom";
// import SearchAndFilter from "../components/AllJobsPage/SearchAndFilter";
// import Navbar from "../components/shared/Navbar";
// import PaginationCom from "../components/AllJobsPage/PaginationCom";

// // import heroImage from "../assets/hero-image.png"; // Replace with your actual image path

// const AllSchools = () => {
//   return (
//     <>
//       <Navbar />
//       <Wrapper>
//         {/* Hero Section */}
//         <HeroSection>
//           <HeroContent>
//             <h1>
//               The <span className="highlight">#1 school directory</span> to find
//               vetted schools and programs since 2020.
//             </h1>
//             <ul>
//               <li>✅ 100% verified and high-quality schools</li>
//               <li>✅ Undergraduate to postgraduate programs</li>
//               <li>✅ Advanced school search filters</li>
//               <li>✅ No ads or irrelevant results</li>
//             </ul>
//           </HeroContent>
//           {/* <HeroImage>
//             <img src={heroImage} alt="Relaxed student" />
//           </HeroImage> */}
//         </HeroSection>

//         {/* Stats Section */}
//         <StatsSection>
//           <StatCard>
//             <h2>1000+</h2>
//             <p>Schools Listed</p>
//           </StatCard>
//           <StatCard>
//             <h2>500+</h2>
//             <p>Scholarships Available</p>
//           </StatCard>
//           <StatCard>
//             <h2>10,000+</h2>
//             <p>Students Enrolled</p>
//           </StatCard>
//         </StatsSection>

//         {/* Search and Filter */}
//         <SearchAndFilter />

//         {/* Schools List */}
//         <SchoolsListCom />

//         {/* Pagination */}
//         <PaginationCom />
//       </Wrapper>
//     </>
//   );
// };

// // Styled Components
// const Wrapper = styled.section`
//   padding: 2rem 1.5rem;
//   width: 100%;
//   max-width: 1200px;
//   margin: 0 auto;
//   display: flex;
//   flex-direction: column;
//   gap: 2rem;
// `;

// // Hero Section
// const HeroSection = styled.section`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-between;
//   align-items: center;
//   background: #e3edf7;
//   padding: 20px 40px;
//   border-radius: 8px;
// `;

// const HeroContent = styled.div`
//   max-width: 60%;

//   h1 {
//     font-size: 2rem;
//     color: #2c374e;
//     line-height: 1.4;
//   }

//   .highlight {
//     color: #ff5e3a;
//     font-weight: bold;
//   }

//   ul {
//     list-style: none;
//     padding: 0;
//     margin-top: 20px;

//     li {
//       font-size: 1rem;
//       color: #2c374e;
//       margin-bottom: 10px;
//     }
//   }
// `;

// const HeroImage = styled.div`
//   img {
//     max-width: 100%;
//     height: auto;
//     border-radius: 8px;
//   }
// `;

// // Stats Section
// const StatsSection = styled.div`
//   display: flex;
//   justify-content: space-around;
//   flex-wrap: wrap;
//   gap: 1.5rem;
//   margin-bottom: 2rem;
// `;

// const StatCard = styled.div`
//   text-align: center;
//   padding: 1rem;
//   background-color: #f0f4f8;
//   border-radius: 8px;
//   flex: 1 1 30%;

//   h2 {
//     font-size: 2rem;
//     color: #1a73e8;
//   }

//   p {
//     font-size: 1rem;
//     color: #333;
//   }
// `;
 
// export default AllSchools;

















// import React from "react";
// import styled from "styled-components";

// import SchoolsListCom from "../components/AllJobsPage/SchoolsListCom";
// import SearchAndFilter from "../components/AllJobsPage/SearchAndFilter";

// import Navbar from "../components/shared/Navbar";
// import PaginationCom from "../components/AllJobsPage/PaginationCom";

// const AllSchools = () => {
//     return (
//         <>
//             <Navbar />
//             <Wrapper>
//                 {/* Header Section */}
//                 <HeaderSection>
//                     <h1>Discover Your Dream School</h1>
//                     <p>
//                         Use our powerful search and filtering options to find the perfect school that matches your preferences. 
//                         Start your journey today!
//                     </p>
//                 </HeaderSection>



//                 {/* Stats Section */}
//                 <StatsSection>
//                     <StatCard>
//                         <h2>1000+</h2>
//                         <p>Schools Listed</p>
//                     </StatCard>
//                     <StatCard>
//                         <h2>500+</h2>
//                         <p>Scholarships Available</p>
//                     </StatCard>
//                     <StatCard>
//                         <h2>10,000+</h2>
//                         <p>Students Enrolled</p>
//                     </StatCard>
//                 </StatsSection>

//                 {/* Form Section */}
//                 <SearchAndFilter />

//                 {/* Features Section */}
                
//                 {/* Schools List */}
//                 <SchoolsListCom />

//                 {/* Pagination */}
//                 <PaginationCom />

//             </Wrapper>
//         </>
//     );
// };

// const Wrapper = styled.section`
//     padding: 2rem 1.5rem;
//     width: 100%;
//     max-width: 1200px;
//     margin: 0 auto;
//     display: flex;
//     flex-direction: column;
//     gap: 2rem;
// `;

// // Header Section
// const HeaderSection = styled.div`
//     text-align: center;
//     margin-bottom: 2rem;

//     h1 {
//         font-size: 2.5rem;
//         color: #1a73e8;
//     }

//     p {
//         font-size: 1.2rem;
//         color: #555;
//         margin-top: 0.5rem;
//     }
// `;

// // Stats Section
// const StatsSection = styled.div`
//     display: flex;
//     justify-content: space-around;
//     gap: 1.5rem;
//     margin-bottom: 2rem;
// `;

// const StatCard = styled.div`
//     text-align: center;
//     padding: 1rem;
//     background-color: #f0f4f8;
//     border-radius: 8px;
//     width: 30%;

//     h2 {
//         font-size: 2rem;
//         color: #1a73e8;
//     }

//     p {
//         font-size: 1rem;
//         color: #333;
//     }
// `;

// // Features Section
// const FeaturesSection = styled.div`
//     text-align: center;

//     h2 {
//         font-size: 2rem;
//         margin-bottom: 1.5rem;
//         color: #333;
//     }

//     display: flex;
//     justify-content: space-around;
//     flex-wrap: wrap;
//     gap: 2rem;
// `;

// const FeatureCard = styled.div`
//     width: 30%;
//     text-align: center;
//     padding: 1.5rem;
//     background-color: #f9f9f9;
//     border-radius: 8px;
//     box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

//     img {
//         width: 60px;
//         margin-bottom: 1rem;
//     }

//     h3 {
//         font-size: 1.2rem;
//         color: #1a73e8;
//         margin-bottom: 0.5rem;
//     }

//     p {
//         font-size: 1rem;
//         color: #555;
//     }
// `;

// // Footer Section
// const Footer = styled.footer`
//     margin-top: 3rem;
//     text-align: center;
//     color: #555;

//     p {
//         margin-bottom: 0.5rem;
//     }
// `;

// const FooterLinks = styled.div`
//     display: flex;
//     justify-content: center;
//     gap: 1.5rem;

//     a {
//         text-decoration: none;
//         color: #1a73e8;
//         font-weight: 500;

//         &:hover {
//             text-decoration: underline;
//         }
//     }
// `;

// export default AllSchools;








// import React from "react";
// import styled from "styled-components";

// import SchoolsListCom from "../components/AllJobsPage/SchoolsListCom";
// import SearchAndFilter from "../components/AllJobsPage/SearchAndFilter";

// import Navbar from "../components/shared/Navbar";
// import PaginationCom from "../components/AllJobsPage/PaginationCom";

// const AllSchools = () => {
//     return (
//         <>
//             <Navbar />
//             <Wrapper>
//                 <SearchAndFilter />
//                 <SchoolsListCom />
//                 <PaginationCom />
//             </Wrapper>
//         </>
//     );
// };

// const Wrapper = styled.section`
//     padding: 2rem 1.5rem;
//     width: 100%;
//     max-width: 1200px;
//     margin: 0 auto;
// `;
// export default AllSchools;
