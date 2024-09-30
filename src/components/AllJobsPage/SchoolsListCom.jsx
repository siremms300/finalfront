
import React from "react";
import { useSearchAndFilterContext } from "../../context/SearchAndFilterContext"; // Updated
import LoadingComTwo from "../shared/LoadingComTwo";
import styled from "styled-components";
import SchoolCard from "./SchoolCard";

const SchoolsListCom = () => {
    const { searchLoading, searchResults, hasSearched } = useSearchAndFilterContext(); // Updated

    if (!hasSearched) {
        return (
            <Wrapper>
                <p className="text-lg md:text-3xl text-center font-bold mt-24 text-blue-600">
                    Enter a Query to Find Your Ideal School or Course.
                </p>
            </Wrapper>
        );
    }

    // if (searchLoading) {
    //     return <LoadingComTwo />;
    // }

    if (searchLoading) {
        return <LoadingComTwo onLoadingComplete={() => setLoadingComplete(true)} />;
    }
    

    if (!searchResults?.result?.length) {
        return (
            <Wrapper>
                <h2 className="text-lg md:text-3xl text-center font-bold mt-24 text-red-600">
                    No Schools or Courses Found. Please Search or Filter to Find Schools.
                </h2>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <h5 className="school-count">
                Showing
                <span className="fancy">
                    {searchResults?.result?.length < 10
                        ? `0${searchResults?.result?.length}`
                        : searchResults?.result?.length}
                </span>
                of total
                <span className="fancy">
                    {searchResults?.totalSchools < 10
                        ? `0${searchResults?.totalSchools}`
                        : searchResults?.totalSchools}
                </span>
                Schools
            </h5>

            <div className="list-container">
                {searchResults?.result?.map((school) => (
                    <SchoolCard key={school._id} school={school} />
                ))}
            </div>
        </Wrapper>
    );
};






const Wrapper = styled.div`
  background-color: var(--color-gray);
  width: 100%;
  margin-top: 1.5rem;

  .school-count {
    margin-top: 14px;
    font-size: 11px;
    font-weight: 600;
    color: var(--color-black);
    opacity: 0.8;
  }

  .school-count .fancy {
    color: var(--color-primary);
    margin: 0 5px;
    font-size: 13px;
    opacity: 1;
  }

  .list-container {
    width: 100%;
    margin-top: 1.5rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* Three cards per row */
    justify-content: space-between; /* Spacing between cards */
    grid-gap: 1.5rem;
    align-items: center;
  }

  /* For smaller screens, show one card per row */
  @media (max-width: 1018px) {
    .list-container {
      grid-template-columns: 1fr 1fr; /* Two cards per row */
      grid-gap: 1.5rem;
    }
  }

  @media (max-width: 670px) {
    .list-container {
      grid-template-columns: 1fr; /* One card per row */
      grid-gap: 1.5rem;
    }
  }
`;



export default SchoolsListCom;









