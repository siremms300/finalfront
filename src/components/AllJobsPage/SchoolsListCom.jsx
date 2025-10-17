import React, { useState, useEffect } from "react";
import { useSearchAndFilterContext } from "../../context/SearchAndFilterContext";
import styled from "styled-components";
import SchoolCard from "./SchoolCard";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaUniversity, FaGraduationCap } from 'react-icons/fa';

const SchoolsListCom = () => {
    const { searchLoading, searchResults, hasSearched } = useSearchAndFilterContext();
    const [showLoader, setShowLoader] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (searchLoading) {
            setShowLoader(true);
            setProgress(0);

            const interval = setInterval(() => {
                setProgress((prev) => Math.min(prev + 5, 100));
            }, 100);

            return () => {
                clearInterval(interval);
            };
        } else {
            setShowLoader(false);
        }
    }, [searchLoading]);

    if (showLoader) {
        return (
            <FullScreenLoader>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="loader-content"
                >
                    <div className="loader-icon">
                        <FaUniversity className="text-4xl text-blue-600 mb-4" />
                    </div>
                    <div className="loader-text">
                        Finding the perfect schools for you...
                    </div>
                    <div className="progress-container">
                        <div className="progress-bar-container">
                            <div
                                className="progress-bar"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <div className="progress-text">{progress}%</div>
                    </div>
                    <p className="loader-subtext">
                        Scanning through 5,000+ universities worldwide
                    </p>
                </motion.div>
            </FullScreenLoader>
        );
    }

    if (!hasSearched) {
        return (
            <Wrapper>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="empty-state"
                >
                    <FaSearch className="text-6xl text-blue-400 mb-4" />
                    <h3 className="text-2xl font-bold text-gray-700 mb-2">
                        Start Your Search
                    </h3>
                    <p className="text-gray-600 text-lg max-w-md text-center">
                        Fill out the search form to discover universities that match your preferences and academic goals.
                    </p>
                </motion.div>
            </Wrapper>
        );
    }

    if (!searchResults?.result?.length) {
        return (
            <Wrapper>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="empty-state"
                >
                    <FaUniversity className="text-6xl text-red-400 mb-4" />
                    <h3 className="text-2xl font-bold text-red-600 mb-2">
                        No Schools Found
                    </h3>
                    <p className="text-gray-600 text-lg max-w-md text-center">
                        We couldn't find any schools matching your criteria. Try adjusting your filters or search terms.
                    </p>
                    <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                        Reset Filters
                    </button>
                </motion.div>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <div className="results-header">
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
                <div className="sort-options">
                    <select className="sort-select">
                        <option>Sort by: Relevance</option>
                        <option>Sort by: Tuition (Low to High)</option>
                        <option>Sort by: Tuition (High to Low)</option>
                        <option>Sort by: Ranking</option>
                    </select>
                </div>
            </div>

            <div className="list-container">
                <AnimatePresence>
                    {searchResults?.result?.map((school, index) => (
                        <motion.div
                            key={school._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <SchoolCard school={school} />
                        </motion.div>
                    ))}
                </AnimatePresence>
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
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    z-index: 9999;
    text-align: center;

    .loader-content {
        background: white;
        padding: 3rem;
        border-radius: 1rem;
        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        max-width: 400px;
        width: 90%;
    }

    .loader-icon {
        margin-bottom: 1rem;
    }

    .loader-text {
        font-size: 1.25rem;
        color: #2d3748;
        margin-bottom: 1.5rem;
        font-weight: 600;
    }

    .progress-container {
        margin-bottom: 1rem;
    }

    .progress-bar-container {
        width: 100%;
        height: 8px;
        background-color: #e2e8f0;
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 0.5rem;
    }

    .progress-bar {
        height: 100%;
        background: linear-gradient(90deg, #2D8CD4, #1A5F8B);
        transition: width 0.3s ease;
    }

    .progress-text {
        font-size: 0.875rem;
        color: #4a5568;
        text-align: right;
    }

    .loader-subtext {
        font-size: 0.875rem;
        color: #718096;
    }
`;

const Wrapper = styled.div`
    background-color: transparent;
    width: 100%;

    .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 4rem 2rem;
        text-align: center;
    }

    .results-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        padding: 1rem 0;
        border-bottom: 1px solid #e2e8f0;
    }

    .school-count {
        font-size: 0.875rem;
        font-weight: 600;
        color: #4a5568;
    }

    .school-count .fancy {
        color: #2D8CD4;
        margin: 0 5px;
        font-size: 1rem;
        font-weight: 700;
    }

    .sort-select {
        padding: 0.5rem 1rem;
        border: 1px solid #cbd5e0;
        border-radius: 0.375rem;
        background: white;
        font-size: 0.875rem;
        color: #4a5568;
    }

    .list-container {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }
`;

export default SchoolsListCom;






























// import React, { useState, useEffect } from "react";
// import { useSearchAndFilterContext } from "../../context/SearchAndFilterContext";
// import styled from "styled-components";
// import SchoolCard from "./SchoolCard";

// const SchoolsListCom = () => {
//     const { searchLoading, searchResults, hasSearched } = useSearchAndFilterContext();
//     const [showLoader, setShowLoader] = useState(false);
//     const [progress, setProgress] = useState(0);

//     useEffect(() => {
//         if (searchLoading) {
//             setShowLoader(true);
//             setProgress(0);

//             const interval = setInterval(() => {
//                 setProgress((prev) => Math.min(prev + 5, 100)); // Increment progress by 5%
//             }, 100); // Update progress every 100ms

//             return () => {
//                 clearInterval(interval); // Stop the progress updates once the loader disappears
//             };
//         } else {
//             setShowLoader(false);
//         }
//     }, [searchLoading]);

//     if (showLoader) {
//         return (
//             <FullScreenLoader>
//                 <div>
//                     <div className="loader-text">
//                         Scovers is finding the most suitable school for you
//                     </div>
//                     <div className="progress-bar-container">
//                         <div
//                             className="progress-bar"
//                             style={{ width: `${progress}%` }}
//                         ></div>
//                     </div>
//                 </div>
//             </FullScreenLoader>
//         );
//     }

//     if (!hasSearched) {
//         return (
//             <Wrapper>
//                 <p className="text-lg md:text-3xl text-center font-bold mt-24 text-blue-600">
//                     Your results will display here
//                 </p>
//             </Wrapper>
//         );
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
//             <div className="list-container">
//                 <h5 className="school-count">
//                     Showing
//                     <span className="fancy">
//                         {searchResults?.result?.length < 10
//                             ? `0${searchResults?.result?.length}`
//                             : searchResults?.result?.length}
//                     </span>
//                     of total
//                     <span className="fancy">
//                         {searchResults?.totalSchools < 10
//                             ? `0${searchResults?.totalSchools}`
//                             : searchResults?.totalSchools}
//                     </span>
//                     Schools
//                 </h5>

//                 {searchResults?.result?.map((school) => (
//                     <SchoolCard key={school._id} school={school} />
//                 ))}
//             </div>
//         </Wrapper>
//     );
// }; 
 

// const FullScreenLoader = styled.div`
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100vw;
//     height: 100vh;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     background-color: rgba(255, 255, 255, 0.9);
//     z-index: 9999;
//     text-align: center;

//     .loader-text {
//         font-size: 1.5rem;
//         color: #1a73e8;
//         margin-bottom: 1rem;
//     }

//     .progress-bar-container {
//         width: 100%;
//         max-width: 400px;
//         height: 10px;
//         background-color: #e0e0e0;
//         border-radius: 5px;
//         overflow: hidden;
//     }

//     .progress-bar {
//         height: 100%;
//         background-color: #1a73e8;
//         width: 0%; /* Initial width */
//         transition: width 0.1s ease-out; /* Smooth transition */
//     }
// `;

// const Wrapper = styled.div`
//     background-color: var(--color-gray);
//     width: 100%;
//     margin-top: 1.5rem;

//     .school-count {
//         margin-top: 14px;
//         font-size: 11px;
//         font-weight: 600;
//         color: var(--color-black);
//         opacity: 0.8;
//     }

//     .school-count .fancy {
//         color: var(--color-primary);
//         margin: 0 5px;
//         font-size: 13px;
//         opacity: 1;
//     }

//     .list-container {
//         display: flex;
//         flex-direction: column; /* Make cards stack vertically */
//         gap: 24px; /* Add spacing between cards */
//         align-items: center; /* Center cards horizontally */
//     }
// `;

// export default SchoolsListCom;






















// // import React, { useState, useEffect } from "react";
// // import { useSearchAndFilterContext } from "../../context/SearchAndFilterContext";
// // import {useUserContext} from "../../context/UserContext"   //NEW CONTEXT 
// // import styled from "styled-components";
// // import SchoolCard from "./SchoolCard";

// // const SchoolsListCom = () => {
// //     const { searchLoading, searchResults, hasSearched } = useSearchAndFilterContext();
// //     const [showLoader, setShowLoader] = useState(false);
// //     const [progress, setProgress] = useState(0);
// //     const { user, userLoading } = useUserContext(); // Get user and loading state from UserContext

// //     useEffect(() => {
// //         if (searchLoading) {
// //             setShowLoader(true);
// //             setProgress(0);

// //             const interval = setInterval(() => {
// //                 setProgress((prev) => Math.min(prev + 5, 100)); // Increment progress by 5%
// //             }, 100); // Update progress every 100ms

// //             return () => {
// //                 clearInterval(interval); // Stop the progress updates once the loader disappears
// //             };
// //         } else {
// //             setShowLoader(false);
// //         }
// //     }, [searchLoading]);


// //     if (userLoading) {
// //         return (
// //             <Wrapper>
// //                 <p className="text-lg md:text-3xl text-center font-bold mt-24 text-blue-600">
// //                     Checking authentication status...
// //                 </p>
// //             </Wrapper>
// //         );
// //     }

// //     if (!user) {
// //         return (
// //             <Wrapper>
// //                 <p className="text-lg md:text-3xl text-center font-bold mt-24 text-red-600">
// //                     Please login to view results.
// //                 </p>
// //             </Wrapper>
// //         );
// //     }
    

// //     if (showLoader) {
// //         return (
// //             <FullScreenLoader>
// //                 <div>
// //                     <div className="loader-text">
// //                         Scovers is finding the most suitable school for you
// //                     </div>
// //                     <div className="progress-bar-container">
// //                         <div
// //                             className="progress-bar"
// //                             style={{ width: `${progress}%` }}
// //                         ></div>
// //                     </div>
// //                 </div>
// //             </FullScreenLoader>
// //         );
// //     }

// //     if (!hasSearched) {
// //         return (
// //             <Wrapper>
// //                 <p className="text-lg md:text-3xl text-center font-bold mt-24 text-blue-600">
// //                     Your results will display here
// //                 </p>
// //             </Wrapper>
// //         );
// //     }

// //     if (!searchResults?.result?.length) {
// //         return (
// //             <Wrapper>
// //                 <h2 className="text-lg md:text-3xl text-center font-bold mt-24 text-red-600">
// //                     No Schools or Courses Found. Please Search or Filter to Find Schools.
// //                 </h2>
// //             </Wrapper>
// //         );
// //     }

// //     return (
// //         <Wrapper>
// //             <div className="list-container">
// //                 <h5 className="school-count">
// //                     Showing
// //                     <span className="fancy">
// //                         {searchResults?.result?.length < 10
// //                             ? `0${searchResults?.result?.length}`
// //                             : searchResults?.result?.length}
// //                     </span>
// //                     of total
// //                     <span className="fancy">
// //                         {searchResults?.totalSchools < 10
// //                             ? `0${searchResults?.totalSchools}`
// //                             : searchResults?.totalSchools}
// //                     </span>
// //                     Schools
// //                 </h5>

// //                 {searchResults?.result?.map((school) => (
// //                     <SchoolCard key={school._id} school={school} />
// //                 ))}
// //             </div>
// //         </Wrapper>
// //     );
// // };

// // const FullScreenLoader = styled.div`
// //     position: fixed;
// //     top: 0;
// //     left: 0;
// //     width: 100vw;
// //     height: 100vh;
// //     display: flex;
// //     justify-content: center;
// //     align-items: center;
// //     background-color: rgba(255, 255, 255, 0.9);
// //     z-index: 9999;
// //     text-align: center;

// //     .loader-text {
// //         font-size: 1.5rem;
// //         color: #1a73e8;
// //         margin-bottom: 1rem;
// //     }

// //     .progress-bar-container {
// //         width: 100%;
// //         max-width: 400px;
// //         height: 10px;
// //         background-color: #e0e0e0;
// //         border-radius: 5px;
// //         overflow: hidden;
// //     }

// //     .progress-bar {
// //         height: 100%;
// //         background-color: #1a73e8;
// //         width: 0%; /* Initial width */
// //         transition: width 0.1s ease-out; /* Smooth transition */
// //     }
// // `;

// // const Wrapper = styled.div`
// //     background-color: var(--color-gray);
// //     width: 100%;
// //     margin-top: 1.5rem;

// //     .school-count {
// //         margin-top: 14px;
// //         font-size: 11px;
// //         font-weight: 600;
// //         color: var(--color-black);
// //         opacity: 0.8;
// //     }

// //     .school-count .fancy {
// //         color: var(--color-primary);
// //         margin: 0 5px;
// //         font-size: 13px;
// //         opacity: 1;
// //     }

// //     .list-container {
// //         display: flex;
// //         flex-direction: column; /* Make cards stack vertically */
// //         gap: 24px; /* Add spacing between cards */
// //         align-items: center; /* Center cards horizontally */
// //     }
// // `;

// // export default SchoolsListCom;















// // import React from "react";
// // import { useSearchAndFilterContext } from "../../context/SearchAndFilterContext"; // Updated
// // import LoadingComTwo from "../shared/LoadingComTwo";
// // import styled from "styled-components";
// // import SchoolCard from "./SchoolCard";

// // const SchoolsListCom = () => {
// //     const { searchLoading, searchResults, hasSearched } = useSearchAndFilterContext(); // Updated

// //     if (!hasSearched) {
// //         return (
// //             <Wrapper>
// //                 <p className="text-lg md:text-3xl text-center font-bold mt-24 text-blue-600">
// //                     Enter a Query to Find Your Ideal School or Course.
// //                 </p>
// //             </Wrapper>
// //         );
// //     }

// //     // if (searchLoading) {
// //     //     return <LoadingComTwo />;
// //     // }

// //     if (searchLoading) {
// //         return <LoadingComTwo onLoadingComplete={() => setLoadingComplete(true)} />;
// //     }
    

// //     if (!searchResults?.result?.length) {
// //         return (
// //             <Wrapper>
// //                 <h2 className="text-lg md:text-3xl text-center font-bold mt-24 text-red-600">
// //                     No Schools or Courses Found. Please Search or Filter to Find Schools.
// //                 </h2>
// //             </Wrapper>
// //         );
// //     }

// //     return (
// //         <Wrapper>
// //             <h5 className="school-count">
// //                 Showing
// //                 <span className="fancy">
// //                     {searchResults?.result?.length < 10
// //                         ? `0${searchResults?.result?.length}`
// //                         : searchResults?.result?.length}
// //                 </span>
// //                 of total
// //                 <span className="fancy">
// //                     {searchResults?.totalSchools < 10
// //                         ? `0${searchResults?.totalSchools}`
// //                         : searchResults?.totalSchools}
// //                 </span>
// //                 Schools
// //             </h5>

// //             <div className="list-container">
// //                 {searchResults?.result?.map((school) => (
// //                     <SchoolCard key={school._id} school={school} />
// //                 ))}
// //             </div>
// //         </Wrapper>
// //     );
// // };






// // const Wrapper = styled.div`
// //   background-color: var(--color-gray);
// //   width: 100%;
// //   margin-top: 1.5rem;

// //   .school-count {
// //     margin-top: 14px;
// //     font-size: 11px;
// //     font-weight: 600;
// //     color: var(--color-black);
// //     opacity: 0.8;
// //   }

// //   .school-count .fancy {
// //     color: var(--color-primary);
// //     margin: 0 5px;
// //     font-size: 13px;
// //     opacity: 1;
// //   }

// //   .list-container {
// //     width: 100%;
// //     margin-top: 1.5rem;
// //     display: grid;
// //     grid-template-columns: repeat(3, 1fr); /* Three cards per row */
// //     justify-content: space-between; /* Spacing between cards */
// //     grid-gap: 1.5rem;
// //     align-items: center;
// //   }

// //   /* For smaller screens, show one card per row */
// //   @media (max-width: 1018px) {
// //     .list-container {
// //       grid-template-columns: 1fr 1fr; /* Two cards per row */
// //       grid-gap: 1.5rem;
// //     }
// //   }

// //   @media (max-width: 670px) {
// //     .list-container {
// //       grid-template-columns: 1fr; /* One card per row */
// //       grid-gap: 1.5rem;
// //     }
// //   }
// // `;



// // export default SchoolsListCom;









