import React, { useState, useEffect } from "react";
import { useSearchAndFilterContext } from "../../context/SearchAndFilterContext";
import {useUserContext} from "../../context/UserContext"   //NEW CONTEXT 
import styled from "styled-components";
import SchoolCard from "./SchoolCard";

const SchoolsListCom = () => {
    const { searchLoading, searchResults, hasSearched } = useSearchAndFilterContext();
    const [showLoader, setShowLoader] = useState(false);
    const [progress, setProgress] = useState(0);
    const { user, userLoading } = useUserContext(); // Get user and loading state from UserContext

    useEffect(() => {
        if (searchLoading) {
            setShowLoader(true);
            setProgress(0);

            const interval = setInterval(() => {
                setProgress((prev) => Math.min(prev + 5, 100)); // Increment progress by 5%
            }, 100); // Update progress every 100ms

            return () => {
                clearInterval(interval); // Stop the progress updates once the loader disappears
            };
        } else {
            setShowLoader(false);
        }
    }, [searchLoading]);


    if (userLoading) {
        return (
            <Wrapper>
                <p className="text-lg md:text-3xl text-center font-bold mt-24 text-blue-600">
                    Checking authentication status...
                </p>
            </Wrapper>
        );
    }

    if (!user) {
        return (
            <Wrapper>
                <p className="text-lg md:text-3xl text-center font-bold mt-24 text-red-600">
                    Please login to view results.
                </p>
            </Wrapper>
        );
    }
    

    if (showLoader) {
        return (
            <FullScreenLoader>
                <div>
                    <div className="loader-text">
                        Scovers is finding the most suitable school for you
                    </div>
                    <div className="progress-bar-container">
                        <div
                            className="progress-bar"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            </FullScreenLoader>
        );
    }

    if (!hasSearched) {
        return (
            <Wrapper>
                <p className="text-lg md:text-3xl text-center font-bold mt-24 text-blue-600">
                    Your results will display here
                </p>
            </Wrapper>
        );
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
            <div className="list-container">
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

                {searchResults?.result?.map((school) => (
                    <SchoolCard key={school._id} school={school} />
                ))}
            </div>
        </Wrapper>
    );
};

const FullScreenLoader = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.9);
    z-index: 9999;
    text-align: center;

    .loader-text {
        font-size: 1.5rem;
        color: #1a73e8;
        margin-bottom: 1rem;
    }

    .progress-bar-container {
        width: 100%;
        max-width: 400px;
        height: 10px;
        background-color: #e0e0e0;
        border-radius: 5px;
        overflow: hidden;
    }

    .progress-bar {
        height: 100%;
        background-color: #1a73e8;
        width: 0%; /* Initial width */
        transition: width 0.1s ease-out; /* Smooth transition */
    }
`;

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
        display: flex;
        flex-direction: column; /* Make cards stack vertically */
        gap: 24px; /* Add spacing between cards */
        align-items: center; /* Center cards horizontally */
    }
`;

export default SchoolsListCom;















// import React from "react";
// import { useSearchAndFilterContext } from "../../context/SearchAndFilterContext"; // Updated
// import LoadingComTwo from "../shared/LoadingComTwo";
// import styled from "styled-components";
// import SchoolCard from "./SchoolCard";

// const SchoolsListCom = () => {
//     const { searchLoading, searchResults, hasSearched } = useSearchAndFilterContext(); // Updated

//     if (!hasSearched) {
//         return (
//             <Wrapper>
//                 <p className="text-lg md:text-3xl text-center font-bold mt-24 text-blue-600">
//                     Enter a Query to Find Your Ideal School or Course.
//                 </p>
//             </Wrapper>
//         );
//     }

//     // if (searchLoading) {
//     //     return <LoadingComTwo />;
//     // }

//     if (searchLoading) {
//         return <LoadingComTwo onLoadingComplete={() => setLoadingComplete(true)} />;
//     }
    

//     if (!searchResults?.result?.length) {
//         return (
//             <Wrapper>
//                 <h2 className="text-lg md:text-3xl text-center font-bold mt-24 text-red-600">
//                     No Schools or Courses Found. Please Search or Filter to Find Schools.
//                 </h2>
//             </Wrapper>
//         );
//     }

//     return (
//         <Wrapper>
//             <h5 className="school-count">
//                 Showing
//                 <span className="fancy">
//                     {searchResults?.result?.length < 10
//                         ? `0${searchResults?.result?.length}`
//                         : searchResults?.result?.length}
//                 </span>
//                 of total
//                 <span className="fancy">
//                     {searchResults?.totalSchools < 10
//                         ? `0${searchResults?.totalSchools}`
//                         : searchResults?.totalSchools}
//                 </span>
//                 Schools
//             </h5>

//             <div className="list-container">
//                 {searchResults?.result?.map((school) => (
//                     <SchoolCard key={school._id} school={school} />
//                 ))}
//             </div>
//         </Wrapper>
//     );
// };






// const Wrapper = styled.div`
//   background-color: var(--color-gray);
//   width: 100%;
//   margin-top: 1.5rem;

//   .school-count {
//     margin-top: 14px;
//     font-size: 11px;
//     font-weight: 600;
//     color: var(--color-black);
//     opacity: 0.8;
//   }

//   .school-count .fancy {
//     color: var(--color-primary);
//     margin: 0 5px;
//     font-size: 13px;
//     opacity: 1;
//   }

//   .list-container {
//     width: 100%;
//     margin-top: 1.5rem;
//     display: grid;
//     grid-template-columns: repeat(3, 1fr); /* Three cards per row */
//     justify-content: space-between; /* Spacing between cards */
//     grid-gap: 1.5rem;
//     align-items: center;
//   }

//   /* For smaller screens, show one card per row */
//   @media (max-width: 1018px) {
//     .list-container {
//       grid-template-columns: 1fr 1fr; /* Two cards per row */
//       grid-gap: 1.5rem;
//     }
//   }

//   @media (max-width: 670px) {
//     .list-container {
//       grid-template-columns: 1fr; /* One card per row */
//       grid-gap: 1.5rem;
//     }
//   }
// `;



// export default SchoolsListCom;









