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
